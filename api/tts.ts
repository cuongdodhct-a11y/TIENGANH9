import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * TIENGANH9 - Production TTS
 *
 * Cô Emily  -> female -> Kore
 * Thầy David -> male   -> Charon
 *
 * Kiến trúc:
 * Browser
 *    ↓
 * /api/tts
 *    ↓
 * Gemini 3.1 Flash TTS
 *    ↓
 * PCM 24kHz / mono / 16-bit
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
 * Không dùng SpeechSynthesis làm TTS chính.
 */

const TTS_MODEL = "gemini-3.1-flash-tts-preview";

const MAX_TTS_CHARS = 1600;

type VoiceProfile = "female" | "male";

type GeminiVoice = "Kore" | "Charon";

/* ============================================================
   VOICE MAPPING
   ============================================================ */

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

  return "female";
}

/* ============================================================
   CLEAN TEXT
   ============================================================ */

function sanitizeText(
  value: unknown
): string {

  let text = String(value ?? "");

  text = text
    // Remove markdown links
    .replace(/\[[^\]]*\]\([^)]*\)/g, " ")

    // Remove markdown emphasis
    .replace(/[*_`~]/g, " ")

    // Remove HTML tags
    .replace(/<[^>]*>/g, " ")

    // Normalize whitespace
    .replace(/\s+/g, " ")

    .trim();

  return text.slice(0, MAX_TTS_CHARS);
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

function pcmToWav(
  pcm: Buffer,
  sampleRate = 24000
): Buffer {

  const channels = 1;
  const bitsPerSample = 16;

  const blockAlign =
    channels * (bitsPerSample / 8);

  const byteRate =
    sampleRate * blockAlign;

  const header =
    Buffer.alloc(44);

  header.write(
    "RIFF",
    0
  );

  header.writeUInt32LE(
    36 + pcm.length,
    4
  );

  header.write(
    "WAVE",
    8
  );

  header.write(
    "fmt ",
    12
  );

  header.writeUInt32LE(
    16,
    16
  );

  // PCM
  header.writeUInt16LE(
    1,
    20
  );

  header.writeUInt16LE(
    channels,
    22
  );

  header.writeUInt32LE(
    sampleRate,
    24
  );

  header.writeUInt32LE(
    byteRate,
    28
  );

  header.writeUInt16LE(
    blockAlign,
    32
  );

  header.writeUInt16LE(
    bitsPerSample,
    34
  );

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
    getGeminiVoice(voice);

  /*
   * IMPORTANT:
   *
   * Use Gemini generateContent REST API.
   *
   * This avoids the invalid-argument problem currently
   * occurring with the Interactions endpoint.
   */

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent`;

  /*
   * Official Gemini TTS structure:
   *
   * generationConfig
   *   responseModalities: ["AUDIO"]
   *   speechConfig
   *     voiceConfig
   *       prebuiltVoiceConfig
   *         voiceName
   */

  const payload = {

    contents: [
      {
        parts: [
          {
            text:
              "Read the following English learning text naturally, clearly and accurately. " +
              "Use exactly one speaker and one consistent voice. " +
              "Do not add words. " +
              "Do not remove words. " +
              "Do not translate. " +
              "Do not paraphrase. " +
              "Do not explain. " +
              "Do not repeat words. " +
              "Speak clearly at a natural English-learning pace.\n\n" +
              text,
          },
        ],
      },
    ],

    generationConfig: {

      responseModalities: [
        "AUDIO",
      ],

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
    "[TTS] Gemini request",
    {
      model: TTS_MODEL,
      requestedVoice: voice,
      geminiVoice,
      textLength: text.length,
    }
  );

  const response =
    await fetch(
      url,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "x-goog-api-key":
            apiKey,
        },

        body:
          JSON.stringify(payload),
      }
    );

  const rawText =
    await response.text();

  let body: any = {};

  try {
    body =
      JSON.parse(rawText);
  } catch {
    body = {};
  }

  /* ========================================================
     GEMINI ERROR
     ======================================================== */

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

  /* ========================================================
     EXTRACT AUDIO
     ======================================================== */

  const parts =
    body
      ?.candidates?.[0]
      ?.content
      ?.parts;

  if (
    !Array.isArray(parts)
  ) {

    const error: any =
      new Error(
        "Gemini TTS returned no content parts."
      );

    error.status = 502;

    throw error;
  }

  /*
   * Gemini TTS returns audio in:
   *
   * inlineData.data
   *
   * MIME type is normally audio/L16.
   */

  const audioPart =
    parts.find(
      (part: any) =>
        part?.inlineData?.data
    );

  const audioBase64 =
    audioPart
      ?.inlineData
      ?.data;

  if (
    !audioBase64 ||
    typeof audioBase64 !== "string"
  ) {

    console.error(
      "[TTS] No audio returned",
      {
        voice,
        geminiVoice,
        parts,
      }
    );

    const error: any =
      new Error(
        "Gemini TTS did not return audio data."
      );

    error.status = 502;

    throw error;
  }

  const pcm =
    Buffer.from(
      audioBase64,
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

  /*
   * Gemini TTS audio:
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

  /* ========================================================
     METHOD
     ======================================================== */

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

  /* ========================================================
     TEXT
     ======================================================== */

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

  /* ========================================================
     VOICE
     ======================================================== */

  const voice =
    normalizeVoice(
      req.query.voice
    );

  const geminiVoice =
    getGeminiVoice(
      voice
    );

  /* ========================================================
     GENERATE
     ======================================================== */

  try {

    const audio =
      await generateTTS(
        text,
        voice
      );

    /* ======================================================
       AUDIO RESPONSE
       ====================================================== */

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

    res.setHeader(
      "Accept-Ranges",
      "bytes"
    );

    /*
     * Cache:
     *
     * Same sentence + same voice
     * can be reused.
     */

    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=3600"
    );

    /* ======================================================
       DEBUG HEADERS
       ====================================================== */

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

    /* ======================================================
       QUOTA
       ====================================================== */

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

    /* ======================================================
       GENERAL ERROR
       ====================================================== */

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