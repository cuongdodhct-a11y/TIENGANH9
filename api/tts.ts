import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * TIENGANH9 - Production TTS
 *
 * Cô Emily  -> female -> Gemini Kore
 * Thầy David -> male   -> Gemini Charon
 *
 * Endpoint:
 *   /api/tts?text=Hello&voice=female
 *   /api/tts?text=Hello&voice=male
 *
 * Gemini:
 *   gemini-3.1-flash-tts-preview
 *
 * Output:
 *   WAV 24 kHz / mono / 16-bit PCM
 *
 * Browser:
 *   Safari
 *   Chrome
 *   Cốc Cốc
 *   Android Chrome
 *   Windows Chrome
 *
 * Không dùng SpeechSynthesis làm TTS chính.
 */

/* ============================================================
   CONFIG
   ============================================================ */

const TTS_MODEL = "gemini-3.1-flash-tts-preview";

const GEMINI_API_URL =
  `https://generativelanguage.googleapis.com/v1beta/models/${TTS_MODEL}:generateContent`;

const MAX_TTS_CHARS = 1600;

type VoiceProfile = "female" | "male";
type GeminiVoice = "Kore" | "Charon";

/* ============================================================
   VOICE MAPPING
   ============================================================ */

const getGeminiVoice = (
  voice: VoiceProfile
): GeminiVoice => {
  return voice === "male" ? "Charon" : "Kore";
};

/* ============================================================
   NORMALIZE VOICE
   ============================================================ */

const normalizeVoice = (
  value: unknown
): VoiceProfile => {
  const voice = String(value ?? "")
    .trim()
    .toLowerCase();

  /*
   * FEMALE
   */
  if (
    voice === "" ||
    voice === "female" ||
    voice === "emily" ||
    voice === "kore"
  ) {
    return "female";
  }

  /*
   * MALE
   */
  if (
    voice === "male" ||
    voice === "david" ||
    voice === "charon"
  ) {
    return "male";
  }

  /*
   * Không cho phép voice lạ tự động
   * làm sai mapping.
   *
   * Giữ female làm fallback tương thích
   * với frontend cũ.
   */
  console.warn(
    "Unknown TTS voice, fallback to female:",
    value
  );

  return "female";
};

/* ============================================================
   CLEAN TEXT
   ============================================================ */

const sanitizeText = (
  value: unknown
): string => {
  let text = String(value ?? "");

  /*
   * Loại bỏ markdown code/link đơn giản.
   */
  text = text
    .replace(/\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\{[^}]*\}/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.slice(0, MAX_TTS_CHARS);
};

/* ============================================================
   API KEY
   ============================================================ */

const getApiKey = (): string => {
  const apiKey =
    process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    const error: any = new Error(
      "GEMINI_API_KEY is missing."
    );

    error.status = 500;

    throw error;
  }

  return apiKey;
};

/* ============================================================
   PCM -> WAV
   ============================================================ */

const pcmToWav = (
  pcm: Buffer,
  sampleRate = 24000
): Buffer => {
  const channels = 1;
  const bitsPerSample = 16;

  const blockAlign =
    channels * (bitsPerSample / 8);

  const byteRate =
    sampleRate * blockAlign;

  /*
   * PCM 16-bit phải có số byte chẵn.
   */
  if (pcm.length % 2 !== 0) {
    throw new Error(
      "Invalid PCM audio: odd byte length."
    );
  }

  const header = Buffer.alloc(44);

  header.write("RIFF", 0);

  header.writeUInt32LE(
    36 + pcm.length,
    4
  );

  header.write("WAVE", 8);

  header.write("fmt ", 12);

  header.writeUInt32LE(
    16,
    16
  );

  /*
   * AudioFormat = 1 = PCM
   */
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

  header.write("data", 36);

  header.writeUInt32LE(
    pcm.length,
    40
  );

  return Buffer.concat([
    header,
    pcm,
  ]);
};

/* ============================================================
   EXTRACT GEMINI AUDIO
   ============================================================ */

const extractAudioBase64 = (
  body: any
): string | null => {
  /*
   * Gemini REST thường trả:
   *
   * candidates[0]
   *   .content
   *   .parts[]
   *   .inlineData
   *   .data
   *
   * Hỗ trợ thêm inline_data để an toàn
   * với các biến thể response.
   */

  const parts =
    body?.candidates?.[0]?.content?.parts;

  if (!Array.isArray(parts)) {
    return null;
  }

  for (const part of parts) {
    const data =
      part?.inlineData?.data ??
      part?.inline_data?.data;

    if (
      typeof data === "string" &&
      data.length > 0
    ) {
      return data;
    }
  }

  return null;
};

/* ============================================================
   GEMINI TTS
   ============================================================ */

const generateTTS = async (
  text: string,
  voice: VoiceProfile
): Promise<Buffer> => {
  const apiKey = getApiKey();

  const geminiVoice =
    getGeminiVoice(voice);

  /*
   * Dùng generateContent REST chính thức
   * thay cho Interactions REST.
   *
   * Đây là cấu trúc Gemini TTS hiện hành.
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
              "Do not create echo, doubling, chorus, reverb, or overlapping speech.\n\n" +
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
    "Gemini TTS request:",
    {
      model: TTS_MODEL,
      requestedVoice: voice,
      geminiVoice,
      textLength: text.length,
    }
  );

  const response =
    await fetch(
      GEMINI_API_URL,
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

  const rawText =
    await response.text();

  let body: any = null;

  try {
    body =
      JSON.parse(rawText);
  } catch {
    body = null;
  }

  /* ----------------------------------------------------------
     GEMINI ERROR
     ---------------------------------------------------------- */

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
      "Gemini TTS failed:",
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

  /* ----------------------------------------------------------
     EXTRACT AUDIO
     ---------------------------------------------------------- */

  const audioBase64 =
    extractAudioBase64(body);

  if (!audioBase64) {
    console.error(
      "Gemini TTS response has no audio:",
      body
    );

    const error: any =
      new Error(
        "Gemini TTS did not return audio data."
      );

    error.status = 502;

    throw error;
  }

  /* ----------------------------------------------------------
     BASE64 -> PCM
     ---------------------------------------------------------- */

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

  console.log(
    "Gemini TTS audio received:",
    {
      voice,
      geminiVoice,
      pcmBytes: pcm.length,
      sampleRate: 24000,
      channels: 1,
      bitsPerSample: 16,
    }
  );

  /* ----------------------------------------------------------
     PCM -> WAV
     ---------------------------------------------------------- */

  return pcmToWav(
    pcm,
    24000
  );
};

/* ============================================================
   HTTP HANDLER
   ============================================================ */

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  /* ----------------------------------------------------------
     METHOD
     ---------------------------------------------------------- */

  if (req.method !== "GET") {
    res.setHeader(
      "Allow",
      "GET"
    );

    return res
      .status(405)
      .json({
        error:
          "Method Not Allowed",
      });
  }

  /* ----------------------------------------------------------
     TEXT
     ---------------------------------------------------------- */

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

  /* ----------------------------------------------------------
     VOICE
     ---------------------------------------------------------- */

  const voice =
    normalizeVoice(
      req.query.voice
    );

  const geminiVoice =
    getGeminiVoice(
      voice
    );

  /* ----------------------------------------------------------
     GENERATE
     ---------------------------------------------------------- */

  try {
    const audio =
      await generateTTS(
        text,
        voice
      );

    /* --------------------------------------------------------
       AUDIO RESPONSE
       -------------------------------------------------------- */

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
     * Cache cùng câu + cùng giọng.
     */
    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, stale-while-revalidate=3600"
    );

    /*
     * CORS an toàn cho cùng ứng dụng
     * và các trường hợp frontend audio fetch.
     */
    res.setHeader(
      "Access-Control-Allow-Origin",
      "*"
    );

    /* --------------------------------------------------------
       DEBUG HEADERS
       -------------------------------------------------------- */

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

  } catch (error: any) {
    const status =
      Number(
        error?.status
      ) || 502;

    console.error(
      "Production TTS error:",
      {
        status,

        voice,

        geminiVoice,

        message:
          error?.message ||
          String(error),
      }
    );

    /* --------------------------------------------------------
       QUOTA
       -------------------------------------------------------- */

    if (status === 429) {
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

    /* --------------------------------------------------------
       BAD REQUEST FROM GEMINI
       -------------------------------------------------------- */

    if (status === 400) {
      return res
        .status(502)
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

    /* --------------------------------------------------------
       GENERAL ERROR
       -------------------------------------------------------- */

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