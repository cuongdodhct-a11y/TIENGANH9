import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * ============================================================
 * TIENGANH9 - PRODUCTION TTS
 * ============================================================
 *
 * Cô Emily  -> female -> Gemini Kore
 * Thầy David -> male   -> Gemini Charon
 *
 * API:
 *
 * /api/tts?text=Hello&voice=female
 * /api/tts?text=Hello&voice=male
 *
 * Gemini:
 *
 * gemini-3.1-flash-tts-preview
 *
 * REST endpoint:
 *
 * /v1beta/models/gemini-3.1-flash-tts-preview:generateContent
 *
 * Output:
 *
 * PCM 24 kHz
 * mono
 * 16-bit
 *
 * Backend converts PCM -> WAV.
 *
 * Browser targets:
 *
 * Safari
 * Chrome
 * Cốc Cốc
 * Android Chrome
 * Windows Chrome
 *
 * KHÔNG dùng browser SpeechSynthesis
 * làm TTS chính.
 *
 * ============================================================
 */

/* ============================================================
   CONFIG
   ============================================================ */

const TTS_MODEL =
  "gemini-3.1-flash-tts-preview";

const GEMINI_GENERATE_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent`;

const MAX_TTS_CHARS = 1600;

/* ============================================================
   TYPES
   ============================================================ */

type VoiceProfile =
  | "female"
  | "male";

type GeminiVoice =
  | "Kore"
  | "Charon";

/* ============================================================
   VOICE MAPPING
   ============================================================ */

/**
 * Cô Emily  -> Kore
 * Thầy David -> Charon
 */
function getGeminiVoice(
  voice: VoiceProfile
): GeminiVoice {

  if (voice === "male") {
    return "Charon";
  }

  return "Kore";
}

/* ============================================================
   NORMALIZE VOICE
   ============================================================ */

function normalizeVoice(
  value: unknown
): VoiceProfile {

  const voice =
    String(value ?? "")
      .trim()
      .toLowerCase();

  /*
   * THẦY DAVID
   */
  if (
    voice === "male" ||
    voice === "man" ||
    voice === "david" ||
    voice === "charon" ||
    voice === "thay david" ||
    voice === "thầy david"
  ) {
    return "male";
  }

  /*
   * CÔ EMILY
   *
   * Default = female
   */
  return "female";
}

/* ============================================================
   SANITIZE TEXT
   ============================================================ */

function sanitizeText(
  value: unknown
): string {

  let text =
    String(value ?? "");

  /*
   * Remove markdown links:
   *
   * [text](url)
   */
  text =
    text.replace(
      /\[[^\]]*\]\([^)]*\)/g,
      " "
    );

  /*
   * Remove markdown emphasis.
   */
  text =
    text.replace(
      /[*_`~]/g,
      " "
    );

  /*
   * Remove HTML.
   */
  text =
    text.replace(
      /<[^>]*>/g,
      " "
    );

  /*
   * Normalize whitespace.
   */
  text =
    text
      .replace(/\s+/g, " ")
      .trim();

  /*
   * Limit TTS request.
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
 * Gemini TTS returns raw PCM:
 *
 * 24000 Hz
 * mono
 * 16-bit
 *
 * Safari/Chrome/Cốc Cốc
 * can directly play the resulting WAV.
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
   * PCM
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
   GEMINI TTS
   ============================================================ */

async function generateTTS(
  text: string,
  voice: VoiceProfile
): Promise<Buffer> {

  const apiKey =
    getApiKey();

  const geminiVoice =
    getGeminiVoice(
      voice
    );

  /*
   * ==========================================================
   * IMPORTANT
   * ==========================================================
   *
   * Gemini Generate Content TTS schema.
   *
   * This is NOT the Interactions API.
   *
   * Official structure:
   *
   * generationConfig
   *   responseModalities
   *   speechConfig
   *     voiceConfig
   *       prebuiltVoiceConfig
   *         voiceName
   *
   * See official Gemini TTS documentation.
   */

  const payload = {

    contents: [
      {
        parts: [
          {
            text:
              "Read the following English learning text " +
              "naturally, clearly and accurately. " +
              "Use one consistent speaker. " +
              "Do not add words. " +
              "Do not remove words. " +
              "Do not translate. " +
              "Do not paraphrase. " +
              "Do not explain. " +
              "Do not repeat words. " +
              "Speak at a clear and natural English-learning pace.\n\n" +
              text,
          },
        ],
      },
    ],

    generationConfig: {

      /*
       * IMPORTANT:
       *
       * Generate AUDIO only.
       */
      responseModalities: [
        "AUDIO",
      ],

      /*
       * IMPORTANT:
       *
       * Correct Generate Content
       * speech configuration.
       */
      speechConfig: {

        voiceConfig: {

          prebuiltVoiceConfig: {

            voiceName:
              geminiVoice,

          },
        },
      },
    },
  };

  console.log(
    "[TTS] Gemini GenerateContent request",
    {
      model:
        TTS_MODEL,

      requestedVoice:
        voice,

      geminiVoice,

      textLength:
        text.length,
    }
  );

  /* ==========================================================
     REQUEST GEMINI
     ========================================================== */

  const response =
    await fetch(
      GEMINI_GENERATE_URL,
      {
        method: "POST",

        headers: {

          "Content-Type":
            "application/json",

          "x-goog-api-key":
            apiKey,

        },

        body:
          JSON.stringify(
            payload
          ),
      }
    );

  /* ==========================================================
     READ RESPONSE
     ========================================================== */

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
      new Error(
        message
      );

    error.status =
      response.status;

    error.retryAfter =
      Number(
        response.headers.get(
          "retry-after"
        ) || 0
      );

    console.error(
      "[TTS] Gemini error",
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

  const audioBase64 =
    body
      ?.candidates?.[0]
      ?.content?.parts?.find(
        (part: any) =>
          part?.inlineData?.data
      )
      ?.inlineData?.data;

  if (
    !audioBase64 ||
    typeof audioBase64 !==
      "string"
  ) {

    console.error(
      "[TTS] Gemini returned no audio",
      {
        voice,

        geminiVoice,

        candidates:
          body?.candidates,

        responseKeys:
          Object.keys(
            body || {}
          ),
      }
    );

    const error: any =
      new Error(
        "Gemini TTS did not return audio data."
      );

    error.status = 502;

    throw error;
  }

  /* ==========================================================
     BASE64 -> PCM
     ========================================================== */

  const pcm =
    Buffer.from(
      audioBase64,
      "base64"
    );

  if (
    !pcm.length
  ) {

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

  /* ==========================================================
     PCM -> WAV
     ========================================================== */

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
       AUDIO HEADERS
       ======================================================== */

    res.setHeader(
      "Content-Type",
      "audio/wav"
    );

    res.setHeader(
      "Content-Length",
      String(
        audio.length
      )
    );

    res.setHeader(
      "Content-Disposition",
      "inline"
    );

    res.setHeader(
      "Accept-Ranges",
      "bytes"
    );

    res.setHeader(
      "X-Content-Type-Options",
      "nosniff"
    );

    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=3600"
    );

    /*
     * Debug headers.
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
      "generateContent-rest"
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
       INVALID ARGUMENT
       ======================================================== */

    if (
      status === 400
    ) {

      return res
        .status(400)
        .json({

          error:
            "Gemini TTS từ chối yêu cầu.",

          voice,

          geminiVoice,

          details:
            error?.message ||
            String(error),

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