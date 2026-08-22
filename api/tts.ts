import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * TIENGANH9 - Production TTS
 *
 * Cô Emily  -> female -> Gemini Kore
 * Thầy David -> male -> Gemini Charon
 *
 * Browser
 *    ↓
 * /api/tts?text=Hello&voice=female
 * /api/tts?text=Hello&voice=male
 *    ↓
 * Gemini Interactions API
 *    ↓
 * gemini-3.1-flash-tts-preview
 *    ↓
 * PCM 24 kHz / mono / 16-bit
 *    ↓
 * WAV
 *
 * Mục tiêu:
 * - Safari
 * - Chrome
 * - Cốc Cốc
 * - Android Chrome
 * - Windows Chrome
 *
 * KHÔNG dùng SpeechSynthesis làm TTS chính.
 */

/* ============================================================
   CONFIGURATION
   ============================================================ */

const TTS_MODEL = "gemini-3.1-flash-tts-preview";

const TTS_INTERACTIONS_URL =
  "https://generativelanguage.googleapis.com/v1beta/interactions";

const TTS_API_REVISION = "2026-05-20";

const MAX_TTS_CHARS = 1600;

/* ============================================================
   TYPES
   ============================================================ */

type VoiceProfile = "female" | "male";

type GeminiVoice = "Kore" | "Charon";

/* ============================================================
   VOICE MAPPING
   ============================================================ */

/**
 * Cô Emily  = Kore
 * Thầy David = Charon
 *
 * Đây là mapping duy nhất của hệ thống.
 */
function getGeminiVoice(
  voice: VoiceProfile
): GeminiVoice {
  return voice === "male"
    ? "Charon"
    : "Kore";
}

/* ============================================================
   NORMALIZE VOICE
   ============================================================ */

function normalizeVoice(
  value: unknown
): VoiceProfile {
  const voice = String(value ?? "")
    .trim()
    .toLowerCase();

  /*
   * Male / Thầy David
   */
  if (
    voice === "male" ||
    voice === "man" ||
    voice === "david" ||
    voice === "thay david" ||
    voice === "thầy david" ||
    voice === "charon"
  ) {
    return "male";
  }

  /*
   * Female / Cô Emily
   *
   * Mặc định female để tránh
   * request không xác định.
   */
  return "female";
}

/* ============================================================
   CLEAN TEXT
   ============================================================ */

function sanitizeText(
  value: unknown
): string {
  let text = String(value ?? "");

  /*
   * Remove markdown links:
   * [text](url)
   */
  text = text.replace(
    /\[[^\]]*\]\([^)]*\)/g,
    " "
  );

  /*
   * Remove markdown emphasis.
   */
  text = text.replace(
    /[*_`~]/g,
    " "
  );

  /*
   * Remove HTML.
   */
  text = text.replace(
    /<[^>]*>/g,
    " "
  );

  /*
   * Normalize whitespace.
   */
  text = text
    .replace(/\s+/g, " ")
    .trim();

  /*
   * Prevent excessively large TTS requests.
   */
  return text.slice(
    0,
    MAX_TTS_CHARS
  );
}

/* ============================================================
   API KEY
   ============================================================ */

function getApiKey(): string {
  const apiKey =
    process.env.GEMINI_API_KEY;

  if (!apiKey) {
    const error: any =
      new Error(
        "GEMINI_API_KEY is missing."
      );

    error.status = 500;

    throw error;
  }

  return apiKey;
}

/* ============================================================
   PCM -> WAV
   ============================================================ */

/**
 * Gemini TTS returns:
 *
 * PCM
 * 24 kHz
 * mono
 * 16-bit
 *
 * Safari / Chrome / Cốc Cốc
 * can play the resulting WAV.
 */
function pcmToWav(
  pcm: Buffer,
  sampleRate = 24000
): Buffer {
  const channels = 1;
  const bitsPerSample = 16;

  const blockAlign =
    channels *
    (bitsPerSample / 8);

  const byteRate =
    sampleRate *
    blockAlign;

  const header =
    Buffer.alloc(44);

  /*
   * RIFF
   */
  header.write(
    "RIFF",
    0
  );

  header.writeUInt32LE(
    36 + pcm.length,
    4
  );

  /*
   * WAVE
   */
  header.write(
    "WAVE",
    8
  );

  /*
   * fmt
   */
  header.write(
    "fmt ",
    12
  );

  header.writeUInt32LE(
    16,
    16
  );

  /*
   * PCM format
   */
  header.writeUInt16LE(
    1,
    20
  );

  /*
   * Mono
   */
  header.writeUInt16LE(
    channels,
    22
  );

  /*
   * Sample rate
   */
  header.writeUInt32LE(
    sampleRate,
    24
  );

  /*
   * Byte rate
   */
  header.writeUInt32LE(
    byteRate,
    28
  );

  /*
   * Block align
   */
  header.writeUInt16LE(
    blockAlign,
    32
  );

  /*
   * 16-bit
   */
  header.writeUInt16LE(
    bitsPerSample,
    34
  );

  /*
   * data
   */
  header.write(
    "data",
    36
  );

  header.writeUInt32LE(
    pcm.length,
    40
  );

  return Buffer.concat([
    header,
    pcm,
  ]);
}

/* ============================================================
   GEMINI TTS - INTERACTIONS API
   ============================================================ */

async function generateTTS(
  text: string,
  voice: VoiceProfile
): Promise<Buffer> {

  const apiKey =
    getApiKey();

  const geminiVoice =
    getGeminiVoice(voice);

  /*
   * IMPORTANT
   *
   * Use Gemini Interactions API.
   *
   * This is the current Gemini TTS
   * REST structure.
   */
  const payload = {
    model: TTS_MODEL,

    /*
     * TTS input.
     *
     * Keep one speaker only.
     */
    input:
      "Read the following English learning text naturally, clearly, and accurately. " +
      "Use exactly one speaker and one consistent voice. " +
      "Do not add words. " +
      "Do not remove words. " +
      "Do not translate. " +
      "Do not paraphrase. " +
      "Do not explain. " +
      "Do not repeat words. " +
      "Speak at a clear, natural English-learning pace.\n\n" +
      text,

    /*
     * IMPORTANT:
     *
     * Current Interactions API TTS schema.
     */
    response_format: {
      type: "audio",
    },

    /*
     * EXACTLY ONE VOICE.
     *
     * female -> Kore
     * male   -> Charon
     */
    generation_config: {
      speech_config: [
        {
          voice: geminiVoice,
        },
      ],
    },
  };

  console.log(
    "[TTS] Gemini Interactions request",
    {
      model: TTS_MODEL,
      requestedVoice: voice,
      geminiVoice,
      textLength: text.length,
    }
  );

  const response =
    await fetch(
      TTS_INTERACTIONS_URL,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "x-goog-api-key":
            apiKey,

          /*
           * Required for the current
           * Interactions schema migration.
           */
          "Api-Revision":
            TTS_API_REVISION,
        },

        body:
          JSON.stringify(
            payload
          ),
      }
    );

  const rawText =
    await response.text();

  let body: any = {};

  try {
    body =
      JSON.parse(
        rawText
      );
  } catch {
    body = {};
  }

  /* ==========================================================
     GEMINI ERROR
     ========================================================== */

  if (!response.ok) {

    const message =
      body?.error?.message ||
      body?.message ||
      `Gemini TTS HTTP ${response.status}`;

    const error: any =
      new Error(message);

    error.status =
      response.status;

    error.retryAfter =
      Number(
        response.headers.get(
          "retry-after"
        ) || 0
      );

    console.error(
      "[TTS] Gemini Interactions error",
      {
        status:
          response.status,

        voice,

        geminiVoice,

        message,

        details:
          body?.error ||
          body,
      }
    );

    throw error;
  }

  /* ==========================================================
     EXTRACT AUDIO
     ========================================================== */

  /*
   * Current Interactions API:
   *
   * body.output_audio.data
   */
  const audioBase64 =
    body?.output_audio?.data;

  /*
   * Defensive fallback:
   *
   * Some API responses may expose
   * the audio through an output array.
   */
  let finalAudioBase64 =
    audioBase64;

  if (
    !finalAudioBase64 &&
    Array.isArray(
      body?.outputs
    )
  ) {

    for (
      const output of body.outputs
    ) {

      const candidate =
        output?.audio?.data ||
        output?.output_audio?.data ||
        output?.data;

      if (
        typeof candidate ===
        "string"
      ) {
        finalAudioBase64 =
          candidate;

        break;
      }
    }
  }

  if (
    !finalAudioBase64 ||
    typeof finalAudioBase64 !==
      "string"
  ) {

    console.error(
      "[TTS] Gemini returned no audio",
      {
        voice,
        geminiVoice,
        responseKeys:
          Object.keys(
            body || {}
          ),
      }
    );

    const error: any =
      new Error(
        "Gemini TTS did not return output_audio.data."
      );

    error.status = 502;

    throw error;
  }

  /* ==========================================================
     BASE64 -> PCM
     ========================================================== */

  const pcm =
    Buffer.from(
      finalAudioBase64,
      "base64"
    );

  if (!pcm.length) {

    const error: any =
      new Error(
        "Gemini TTS returned empty audio."
      );

    error.status = 502;

    throw error;
  }

  console.log(
    "[TTS] Audio generated successfully",
    {
      voice,
      geminiVoice,
      pcmBytes:
        pcm.length,
    }
  );

  /*
   * Gemini TTS audio:
   *
   * 24 kHz
   * mono
   * 16-bit PCM
   */
  return pcmToWav(
    pcm,
    24000
  );
}

/* ============================================================
   HTTP HANDLER
   ============================================================ */

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  /* ==========================================================
     METHOD
     ========================================================== */

  if (
    req.method !== "GET"
  ) {

    return res
      .status(405)
      .json({
        error:
          "Method Not Allowed",
      });
  }

  /* ==========================================================
     TEXT
     ========================================================== */

  const text =
    sanitizeText(
      req.query.text
    );

  if (!text) {

    return res
      .status(400)
      .json({
        error:
          "Missing text parameter",
      });
  }

  /* ==========================================================
     VOICE
     ========================================================== */

  const voice =
    normalizeVoice(
      req.query.voice
    );

  const geminiVoice =
    getGeminiVoice(
      voice
    );

  /* ==========================================================
     GENERATE
     ========================================================== */

  try {

    const audio =
      await generateTTS(
        text,
        voice
      );

    /* ========================================================
       AUDIO RESPONSE
       ======================================================== */

    res.setHeader(
      "Content-Type",
      "audio/wav"
    );

    res.setHeader(
      "Content-Length",
      String(audio.length)
    );

    res.setHeader(
      "Content-Disposition",
      "inline"
    );

    /*
     * Safari / Chrome compatibility.
     */
    res.setHeader(
      "Accept-Ranges",
      "bytes"
    );

    /*
     * Prevent MIME sniffing.
     */
    res.setHeader(
      "X-Content-Type-Options",
      "nosniff"
    );

    /*
     * CORS.
     *
     * Same-origin app does not strictly
     * require this, but it makes the
     * endpoint more robust.
     */
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    /*
     * Cache audio by full URL.
     *
     * IMPORTANT:
     *
     * /api/tts?voice=female&text=Hello
     *
     * and
     *
     * /api/tts?voice=male&text=Hello
     *
     * are different URLs, therefore
     * different cached responses.
     */
    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=3600"
    );

    /*
     * DEBUG HEADERS
     *
     * These allow us to verify
     * the exact voice used.
     */
    res.setHeader(
      "X-TTS-Voice",
      voice
    );

    res.setHeader(
      "X-TTS-Gemini-Voice",
      geminiVoice
    );

    res.setHeader(
      "X-TTS-Model",
      TTS_MODEL
    );

    res.setHeader(
      "X-TTS-API",
      "interactions-rest"
    );

    return res
      .status(200)
      .send(audio);

  } catch (
    error: any
  ) {

    const status =
      Number(
        error?.status
      ) || 502;

    console.error(
      "[TTS] Production error",
      {
        status,

        voice,

        geminiVoice,

        message:
          error?.message ||
          String(error),
      }
    );

    /* ========================================================
       QUOTA
       ======================================================== */

    if (
      status === 429
    ) {

      return res
        .status(429)
        .json({
          error:
            "Gemini TTS đang hết quota.",

          voice,

          geminiVoice,

          retryAfter:
            error?.retryAfter ||
            undefined,
        });
    }

    /* ========================================================
       GENERAL ERROR
       ======================================================== */

    return res
      .status(
        status >= 400 &&
        status <= 599
          ? status
          : 502
      )
      .json({

        error:
          "Không thể tạo âm thanh TTS lúc này.",

        voice,

        geminiVoice,

        details:
          error?.message ||
          String(error),

      });
  }
}