import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

/*
 * ============================================================
 * TIENGANH9 - SERVER
 * ============================================================
 *
 * Mục tiêu của bản này:
 * 1. Giữ nguyên toàn bộ API AI hiện có.
 * 2. TTS dùng Gemini Interactions REST API chính thức cho
 *    gemini-3.1-flash-tts-preview.
 * 3. Một text + một voice = một audio request.
 * 4. Cache audio trong RAM.
 * 5. Các request giống nhau đồng thời dùng chung Promise.
 * 6. Không tự động gọi lại Gemini khi gặp 429.
 * 7. Emily = Kore; David = Charon.
 * 8. PCM 24 kHz / mono / 16-bit -> WAV.
 * 9. Giữ browserFallback để frontend cũ vẫn tương thích.
 * 10. Dùng Api-Revision 2026-05-20 theo schema Interactions hiện hành.
 *
 * LƯU Ý QUAN TRỌNG:
 * TTS không dùng ai.models.generateContent() trong bản này.
 * TTS gọi trực tiếp Interactions REST API để tránh phụ thuộc
 * vào khác biệt phiên bản SDK @google/genai và tránh lỗi
 * INVALID_ARGUMENT do schema TTS thay đổi giữa các API.
 * ============================================================
 */

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT || 3000);

  app.use(
    express.json({
      limit: "15mb",
    }),
  );

  /* ============================================================
   * GOOGLE AI CLIENT - dùng cho các API AI thông thường.
   * TTS bên dưới dùng REST Interactions API riêng.
   * ============================================================ */

  const getAI = (): GoogleGenAI => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is missing. Please set it in Settings > Secrets.",
      );
    }

    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  const getApiKey = (): string => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "GEMINI_API_KEY is missing. Please set it in Settings > Secrets.",
      );
    }
    return apiKey;
  };

  /* ============================================================
   * 0. HEALTH CHECK
   * ============================================================ */

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      service: "TIENGANH9",
    });
  });

  /* ============================================================
   * 1. AI WRITING EVALUATION
   * ============================================================ */

  app.post("/api/ai/writing-feedback", async (req, res) => {
    try {
      const { promptTopic, studentText, wordLimit } = req.body;

      if (!studentText || String(studentText).trim().length === 0) {
        return res.status(400).json({
          error: "Vui lòng nhập bài viết của bạn.",
        });
      }

      const ai = getAI();
      const prompt = `
Bạn là giám khảo chấm thi Tiếng Anh lớp 9 SGK Bộ Giáo Dục Việt Nam.

Hãy đánh giá bài viết của học sinh theo các tiêu chí phù hợp với học sinh lớp 9.

Đề bài:
${promptTopic || "Bài viết tự do chủ đề Tiếng Anh lớp 9"}

Giới hạn từ khuyến nghị:
${wordLimit || "60-80 từ"}

Bài làm của học sinh:
"${String(studentText).trim()}"

Hãy trả về JSON đúng cấu trúc:
{
  "overallScore": 0,
  "scores": {
    "grammar": 0,
    "vocabulary": 0,
    "coherence": 0,
    "taskFulfillment": 0
  },
  "generalFeedback": "",
  "corrections": [
    { "original": "", "corrected": "", "reason": "" }
  ],
  "improvedVersion": "",
  "keyVocabularyUsed": [],
  "grade10ExamTips": ""
}

Yêu cầu:
- Điểm từ 0 đến 10.
- Nhận xét bằng tiếng Việt.
- Thân thiện, sư phạm.
- Không bịa lỗi.
- Chỉ sửa những lỗi thực sự tồn tại.
- Bản improvedVersion phải giữ nguyên ý chính của học sinh.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      let data: any = {};
      try {
        data = JSON.parse(response.text || "{}");
      } catch {
        data = {};
      }

      return res.json(data);
    } catch (err: any) {
      console.error("Writing feedback error:", err);
      return res.status(500).json({
        error:
          "Không thể chấm bài viết lúc này. " +
          (err?.message || "Vui lòng thử lại sau."),
      });
    }
  });

  /* ============================================================
   * 2. AI SPEAKING / PRONUNCIATION EVALUATION
   * ============================================================ */

  app.post("/api/ai/speaking-eval", async (req, res) => {
    try {
      const { targetText, transcriptText, audioBase64, audioMimeType } = req.body;

      if (!targetText || !String(targetText).trim()) {
        return res.status(400).json({
          error: "Thiếu câu chuẩn cần luyện phát âm.",
        });
      }

      if (!audioBase64 || !String(audioBase64).trim()) {
        return res.status(400).json({
          error:
            "Chưa có bản ghi âm thật. Hãy bấm Micro, đọc câu, sau đó bấm dừng rồi chấm lại.",
        });
      }

      const normalizedMime =
        typeof audioMimeType === "string" &&
        audioMimeType.toLowerCase().startsWith("audio/")
          ? audioMimeType.toLowerCase()
          : "audio/wav";

      const ai = getAI();
      const prompt = `
Bạn là CHUYÊN GIA ĐÁNH GIÁ PHÁT ÂM TIẾNG ANH CHO HỌC SINH LỚP 9.

CÂU CHUẨN:
"${String(targetText).trim()}"

BẢN NHẬN DIỆN GIỌNG NÓI CỦA TRÌNH DUYỆT:
"${String(transcriptText || "").trim()}"

FILE ÂM THANH THẬT của học sinh được gửi trong request này.

Hãy nghe file âm thanh thật trước khi kết luận.
Audio là bằng chứng chính. Transcript chỉ là bằng chứng phụ.
Không được suy ra học sinh phát âm sai chỉ vì speech-to-text nhận diện sai.

Hãy đánh giá:
1. Đúng câu / wording
2. Phát âm
3. Độ lưu loát
4. Trọng âm
5. Trọng âm câu
6. Nối âm
7. Ngữ điệu
8. Độ rõ
9. Tốc độ nói

Đặc biệt chú ý:
- nguyên âm;
- phụ âm đầu/cuối;
- /θ/ và /ð/;
- /ʃ/, /ʒ/, /tʃ/, /dʒ/;
- /r/; /l/; /v/ và /w/;
- /f/ và /p/;
- /s/ và /z/;
- âm cuối; phụ âm cụm; trọng âm; nối âm; ngữ điệu.

QUY TẮC:
- Không chấm phát âm từ transcript đơn thuần.
- Không phạt học sinh vì ASR sai.
- Nếu audio không đủ rõ, dùng "uncertain".
- Không bịa lỗi.
- Chỉ dùng "needs_work" khi có bằng chứng âm thanh.
- "missed" chỉ khi học sinh thực sự bỏ từ.
- Phân biệt wordingError và pronunciationError.
- Nếu học sinh đọc tốt, cho điểm cao.

confidence:
0.90-1.00 = bằng chứng rất rõ.
0.75-0.89 = khá rõ.
0.60-0.74 = chỉ cảnh báo nhẹ.
Dưới 0.60 = không tạo correction.

Trả về JSON đúng cấu trúc.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: normalizedMime,
                  data: String(audioBase64),
                },
              },
            ],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallScore: { type: Type.NUMBER },
              pronunciationScore: { type: Type.NUMBER },
              wordingScore: { type: Type.NUMBER },
              fluencyScore: { type: Type.NUMBER },
              targetText: { type: Type.STRING },
              heardTranscript: { type: Type.STRING },
              overallFeedback: { type: Type.STRING },
              strengths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              pronunciationCorrections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    word: { type: Type.STRING },
                    phoneme: { type: Type.STRING },
                    ipa: { type: Type.STRING },
                    status: {
                      type: Type.STRING,
                      enum: ["correct", "needs_work", "uncertain"],
                    },
                    severity: { type: Type.STRING },
                    confidence: { type: Type.NUMBER },
                    observedProblem: { type: Type.STRING },
                    correctTarget: { type: Type.STRING },
                    mouthTip: { type: Type.STRING },
                    practiceTip: { type: Type.STRING },
                    practiceSequence: { type: Type.STRING },
                    example: { type: Type.STRING },
                  },
                  required: [
                    "word",
                    "phoneme",
                    "ipa",
                    "status",
                    "severity",
                    "confidence",
                    "observedProblem",
                    "correctTarget",
                    "mouthTip",
                    "practiceTip",
                    "practiceSequence",
                    "example",
                  ],
                },
              },
              wordFeedback: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    targetWord: { type: Type.STRING },
                    heardAs: { type: Type.STRING },
                    status: {
                      type: Type.STRING,
                      enum: ["correct", "needs_work", "missed", "uncertain"],
                    },
                    pronunciationNote: { type: Type.STRING },
                    ipa: { type: Type.STRING },
                  },
                  required: [
                    "targetWord",
                    "heardAs",
                    "status",
                    "pronunciationNote",
                    "ipa",
                  ],
                },
              },
              wordingCorrections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    targetWord: { type: Type.STRING },
                    heardAs: { type: Type.STRING },
                    issue: { type: Type.STRING },
                    correction: { type: Type.STRING },
                  },
                  required: ["targetWord", "heardAs", "issue", "correction"],
                },
              },
              prosodyFeedback: {
                type: Type.OBJECT,
                properties: {
                  wordStress: { type: Type.STRING },
                  sentenceStress: { type: Type.STRING },
                  linking: { type: Type.STRING },
                  intonation: { type: Type.STRING },
                },
                required: ["wordStress", "sentenceStress", "linking", "intonation"],
              },
              practicePlan: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              modelPracticePhrase: { type: Type.STRING },
              improvements: { type: Type.STRING },
              encouragement: { type: Type.STRING },
            },
            required: [
              "overallScore",
              "pronunciationScore",
              "wordingScore",
              "fluencyScore",
              "targetText",
              "heardTranscript",
              "overallFeedback",
              "strengths",
              "pronunciationCorrections",
              "wordFeedback",
              "wordingCorrections",
              "prosodyFeedback",
              "practicePlan",
              "modelPracticePhrase",
              "improvements",
              "encouragement",
            ],
          },
        },
      });

      let data: any = {};
      try {
        data = JSON.parse(response.text || "{}");
      } catch {
        data = {};
      }

      const clamp = (value: unknown): number => {
        const n = Number(value);
        if (!Number.isFinite(n)) return 0;
        return Math.max(0, Math.min(100, Math.round(n)));
      };

      data.overallScore = clamp(data.overallScore);
      data.pronunciationScore = clamp(data.pronunciationScore);
      data.wordingScore = clamp(data.wordingScore);
      data.fluencyScore = clamp(data.fluencyScore);

      if (!Array.isArray(data.strengths)) data.strengths = [];
      if (!Array.isArray(data.pronunciationCorrections)) data.pronunciationCorrections = [];
      if (!Array.isArray(data.wordFeedback)) data.wordFeedback = [];
      if (!Array.isArray(data.wordingCorrections)) data.wordingCorrections = [];
      if (!Array.isArray(data.practicePlan)) data.practicePlan = [];
      if (!data.prosodyFeedback) {
        data.prosodyFeedback = {
          wordStress: "",
          sentenceStress: "",
          linking: "",
          intonation: "",
        };
      }

      return res.json(data);
    } catch (err: any) {
      console.error("Speaking evaluation error:", err);
      return res.status(500).json({
        error:
          "Không thể chấm phát âm lúc này. " +
          (err?.message || "Vui lòng thử lại."),
      });
    }
  });

  /* ============================================================
   * 3. AI DIAGNOSTIC & PERSONALIZED ROUTE
   * ============================================================ */

  app.post("/api/ai/diagnostic-route", async (req, res) => {
    try {
      const { userAnswers, targetGoal } = req.body;
      const ai = getAI();

      const prompt = `
Học sinh lớp 9 vừa hoàn thành bài kiểm tra chẩn đoán trình độ Tiếng Anh 9 SGK.

Mục tiêu học tập:
${targetGoal || "Đạt điểm cao thi vào 10 và làm chủ 4 kỹ năng"}

Dữ liệu kết quả test:
${JSON.stringify(userAnswers)}

Hãy xây dựng lộ trình học cá nhân hóa dưới dạng JSON:
{
  "assessedLevel": "Yếu",
  "levelDescription": "",
  "weaknessSkills": [],
  "recommendedUnits": [
    { "unitId": 1, "title": "", "priorityReason": "" }
  ],
  "dailyTarget": {
    "vocabularyCount": 10,
    "minutesPerDay": 30,
    "weeklyGoal": ""
  },
  "studyTips": []
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      let data: any = {};
      try {
        data = JSON.parse(response.text || "{}");
      } catch {
        data = {};
      }

      return res.json(data);
    } catch (err: any) {
      console.error("Diagnostic route error:", err);
      return res.status(500).json({
        error: "Không thể tạo lộ trình cá nhân hóa.",
      });
    }
  });

  /* ============================================================
   * 4. AI EXERCISE GENERATOR
   * ============================================================ */

  app.post("/api/ai/generate-quiz", async (req, res) => {
    try {
      const { unitTitle, difficulty, questionCount = 5, topicType } = req.body;
      const ai = getAI();

      const safeQuestionCount = Math.max(
        1,
        Math.min(20, Number(questionCount) || 5),
      );

      const prompt = `
Tạo bài tập trắc nghiệm Tiếng Anh lớp 9 SGK Bộ Giáo Dục.

Chủ đề Unit:
${unitTitle || "Unit 1: Local Community"}

Trình độ:
${difficulty || "Trung bình"}

Dạng bài:
${topicType || "Từ vựng và Ngữ pháp tổng hợp"}

Số câu:
${safeQuestionCount}

Trả về JSON:
{
  "quizTitle": "",
  "questions": [
    {
      "id": 1,
      "question": "",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "explanation": ""
    }
  ]
}

Giải thích bằng tiếng Việt.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      let data: any = {};
      try {
        data = JSON.parse(response.text || "{}");
      } catch {
        data = {};
      }

      return res.json(data);
    } catch (err: any) {
      console.error("Quiz generator error:", err);
      return res.status(500).json({
        error: "Không thể tạo bài tập AI lúc này.",
      });
    }
  });

  /* ============================================================
   * 5. AI TUTOR CHAT
   * ============================================================ */

  app.post("/api/ai/tutor-chat", async (req, res) => {
    try {
      const { messages, userQuestion, currentUnit, unitContext } = req.body;
      const unit =
        currentUnit || unitContext || "Tổng hợp Tiếng Anh Lớp 9";

      let question = userQuestion || "";

      if (!question && Array.isArray(messages) && messages.length > 0) {
        const lastMsg = messages[messages.length - 1];
        question = lastMsg?.text || lastMsg?.content || "";
      }

      if (!String(question).trim()) {
        return res.status(400).json({
          error: "Thiếu nội dung câu hỏi.",
        });
      }

      try {
        const ai = getAI();
        const systemInstruction = `
Bạn là "Thầy Cô AI Tiếng Anh 9" - Gia sư thông minh bám sát chương trình SGK Tiếng Anh Lớp 9 của Bộ Giáo Dục & Đào Tạo Việt Nam.

Nhiệm vụ:
1. Giải đáp bài tập, từ vựng, ngữ pháp và phát âm.
2. Trả lời bằng Tiếng Việt dễ hiểu.
3. Kết hợp Tiếng Anh chuẩn khi cần.
4. Giải thích cặn kẽ.
5. Lịch sự, ân cần và có tính sư phạm.
6. Không bịa thông tin.

Học sinh hiện đang học:
${unit}
`;

        let formattedMessages = "";

        if (Array.isArray(messages) && messages.length > 0) {
          formattedMessages = messages
            .map((m: any) => {
              const role =
                m?.role === "user" || m?.sender === "user"
                  ? "Học sinh"
                  : "Thầy Cô AI";
              return `${role}: ${m?.text || m?.content || ""}`;
            })
            .join("\n\n");
        } else {
          formattedMessages = `Học sinh: ${question}`;
        }

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: `${formattedMessages}\n\nThầy Cô AI:`,
          config: {
            systemInstruction,
          },
        });

        return res.json({
          reply: response.text || "Thầy cô chưa có câu trả lời.",
        });
      } catch (geminiErr: any) {
        console.warn(
          "Gemini API error in tutor chat:",
          geminiErr?.message,
        );

        return res.json({
          reply:
            `Chào em! Cô đã nhận được câu hỏi về "${question}". ` +
            "Hãy gửi câu hỏi hoặc bài tập cụ thể để cô hướng dẫn nhé! 😊",
        });
      }
    } catch (err: any) {
      console.error("Tutor chat error:", err);
      return res.status(500).json({
        error: "Thầy Cô AI chưa thể phản hồi lúc này.",
      });
    }
  });

  /* ============================================================
   * 6. APPLICATION-WIDE GEMINI TTS ENGINE
   * ============================================================
   *
   * Gemini 3.1 Flash TTS hiện hỗ trợ Interactions API với:
   *   response_format: { type: "audio" }
   *   generation_config.speech_config: [{ voice: "Kore" }]
   *
   * Bản cũ dùng models.generateContent(). Về tài liệu hiện hành,
   * generateContent vẫn có thể dùng cho TTS, nhưng Interactions API
   * là API TTS hiện hành và còn hỗ trợ trực tiếp multi-speaker.
   * Bản này dùng REST Interactions để loại bỏ rủi ro SDK/schema mismatch.
   * ============================================================ */

  const TTS_MODEL = "gemini-3.1-flash-tts-preview";
  const TTS_INTERACTIONS_URL =
    "https://generativelanguage.googleapis.com/v1beta/interactions";

  const MAX_TTS_CHARS = 1600;
  const MAX_TTS_CACHE = 300;
  const TTS_QUOTA_COOLDOWN_MS = 10 * 60_000;

  const ttsCache = new Map<string, Buffer>();
  const ttsInflight = new Map<string, Promise<Buffer>>();
  let ttsQuotaBlockedUntil = 0;

  let ttsStats = {
    requests: 0,
    cacheHits: 0,
    generated: 0,
    quotaErrors: 0,
    otherErrors: 0,
    invalidArgumentErrors: 0,
  };

  /* ============================================================
   * PCM -> WAV
   * Gemini TTS returns raw PCM: 24 kHz / mono / 16-bit.
   * ============================================================ */

  const pcmToWav = (pcm: Buffer, sampleRate = 24000): Buffer => {
    const channels = 1;
    const bitsPerSample = 16;
    const header = Buffer.alloc(44);
    const byteRate = sampleRate * channels * (bitsPerSample / 8);
    const blockAlign = channels * (bitsPerSample / 8);

    header.write("RIFF", 0);
    header.writeUInt32LE(36 + pcm.length, 4);
    header.write("WAVE", 8);
    header.write("fmt ", 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write("data", 36);
    header.writeUInt32LE(pcm.length, 40);

    return Buffer.concat([header, pcm]);
  };

  /* ============================================================
   * VOICE NORMALIZATION
   * ============================================================ */

  const getTtsVoice = (rawVoice: unknown): "Kore" | "Charon" => {
    const voice = String(rawVoice || "female").trim().toLowerCase();

    if (
      voice === "male" ||
      voice === "david" ||
      voice === "thay-david" ||
      voice === "thầy-david" ||
      voice === "teacher-male" ||
      voice === "thay" ||
      voice === "thầy" ||
      voice === "charon"
    ) {
      return "Charon";
    }

    return "Kore";
  };

  /* ============================================================
   * ERROR HELPERS
   * ============================================================ */

  const getErrorStatus = (err: any): number => {
    return Number(
      err?.status ||
        err?.code ||
        err?.response?.status ||
        err?.statusCode ||
        0,
    );
  };

  const getErrorMessage = (err: any): string => {
    return String(
      err?.message ||
        err?.error?.message ||
        err?.response?.error?.message ||
        "",
    );
  };

  const isQuotaError = (err: any): boolean => {
    const status = getErrorStatus(err);
    const message = getErrorMessage(err).toLowerCase();

    return (
      status === 429 ||
      message.includes("resource_exhausted") ||
      message.includes("quota") ||
      message.includes("rate limit") ||
      message.includes("too many requests") ||
      message.includes("exceeded your current quota")
    );
  };

  const isInvalidArgumentError = (err: any): boolean => {
    const status = getErrorStatus(err);
    const message = getErrorMessage(err).toLowerCase();

    return (
      status === 400 ||
      message.includes("invalid_argument") ||
      message.includes("invalid argument")
    );
  };

  /* ============================================================
   * BROWSER FALLBACK SIGNAL
   * ============================================================
   * Quy ước ổn định cho frontend:
   * - browserFallback=true: frontend phải đọc bằng SpeechSynthesis.
   * - Không retry Gemini TTS trong cùng request.
   * ============================================================ */

  const sendTtsFallback = (
    res: any,
    params: {
      status: number;
      error: string;
      retryAfter?: number;
      voice: TtsVoice;
      details?: string;
    },
  ) => {
    const retryAfter = Math.max(0, Number(params.retryAfter || 0));

    res.setHeader("X-TTS-Browser-Fallback", "true");
    res.setHeader("X-TTS-Fallback-Engine", "SpeechSynthesis");

    if (retryAfter > 0) {
      res.setHeader("Retry-After", String(retryAfter));
    }

    return res.status(params.status).json({
      ok: false,
      error: params.error,
      browserFallback: true,
      fallbackEngine: "SpeechSynthesis",
      retryAfter,
      voice: params.voice,
      details: params.details || undefined,
    });
  };

  /* ============================================================
   * CACHE
   * ============================================================ */

  const saveTtsCache = (key: string, wav: Buffer) => {
    if (ttsCache.size >= MAX_TTS_CACHE) {
      const oldestKey = ttsCache.keys().next().value as string | undefined;
      if (oldestKey) ttsCache.delete(oldestKey);
    }
    ttsCache.set(key, wav);
  };

  /* ============================================================
   * RAW INTERACTIONS API REQUEST
   * ============================================================ */

  type TtsVoice = "Kore" | "Charon";

  const requestGeminiTts = async (
    text: string,
    voiceName: TtsVoice,
  ): Promise<Buffer> => {
    const apiKey = getApiKey();

    const payload = {
      model: TTS_MODEL,
      input:
        "Read the following English learning text naturally and clearly. " +
        "Use exactly one speaker and one clean voice. " +
        "Do not add, remove, translate, paraphrase, explain, or repeat any words. " +
        "Do not create echo, doubling, chorus, reverb, or overlapping speech. " +
        "Read the text exactly once.\n\n" +
        text,
      response_format: {
        type: "audio",
      },
      generation_config: {
        speech_config: [
          {
            voice: voiceName,
          },
        ],
      },
    };

    const response = await fetch(TTS_INTERACTIONS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
        "Api-Revision": "2026-05-20",
      },
      body: JSON.stringify(payload),
    });

    const rawText = await response.text();
    let body: any = {};

    try {
      body = rawText ? JSON.parse(rawText) : {};
    } catch {
      body = { raw: rawText };
    }

    if (!response.ok) {
      const error: any = new Error(
        body?.error?.message ||
          body?.message ||
          `Gemini Interactions TTS HTTP ${response.status}`,
      );
      error.status = response.status;
      error.code = response.status;
      error.details = body;
      error.retryAfter = Number(response.headers.get("retry-after") || 0);
      throw error;
    }

    const audioBase64 = body?.output_audio?.data;

    if (!audioBase64 || typeof audioBase64 !== "string") {
      const error: any = new Error(
        "Gemini TTS không trả về output_audio.data.",
      );
      error.status = 502;
      error.details = body;
      throw error;
    }

    const pcm = Buffer.from(audioBase64, "base64");

    if (pcm.length < 4) {
      const error: any = new Error(
        "Gemini TTS trả về audio rỗng hoặc không hợp lệ.",
      );
      error.status = 502;
      throw error;
    }

    return pcmToWav(pcm, 24000);
  };

  /* ============================================================
   * GENERATE TTS WITH CACHE + INFLIGHT + CIRCUIT BREAKER
   * ============================================================ */

  const generateTts = async (
    text: string,
    voiceName: TtsVoice,
  ): Promise<Buffer> => {
    const key = `${voiceName}::${text}`;

    const cached = ttsCache.get(key);
    if (cached) {
      ttsStats.cacheHits += 1;
      return cached;
    }

    const running = ttsInflight.get(key);
    if (running) return running;

    if (Date.now() < ttsQuotaBlockedUntil) {
      const retryAfter = Math.max(
        1,
        Math.ceil((ttsQuotaBlockedUntil - Date.now()) / 1000),
      );
      const error: any = new Error(
        `Gemini TTS đang tạm thời hết quota. Thử lại sau khoảng ${retryAfter} giây.`,
      );
      error.status = 429;
      error.retryAfter = retryAfter;
      error.browserFallback = true;
      throw error;
    }

    const promise = (async () => {
      try {
        ttsStats.requests += 1;
        const wav = await requestGeminiTts(text, voiceName);

        saveTtsCache(key, wav);
        ttsStats.generated += 1;
        ttsQuotaBlockedUntil = 0;

        return wav;
      } catch (err: any) {
        if (isQuotaError(err)) {
          ttsStats.quotaErrors += 1;
          ttsQuotaBlockedUntil =
            Date.now() + TTS_QUOTA_COOLDOWN_MS;
          err.status = 429;
          err.browserFallback = true;
        } else if (isInvalidArgumentError(err)) {
          ttsStats.invalidArgumentErrors += 1;
        } else {
          ttsStats.otherErrors += 1;
        }

        throw err;
      }
    })();

    ttsInflight.set(key, promise);

    try {
      return await promise;
    } finally {
      ttsInflight.delete(key);
    }
  };

  /* ============================================================
   * 6A. TTS STATUS
   * ============================================================ */

  app.get("/api/tts/status", (_req, res) => {
    const now = Date.now();
    const blocked = now < ttsQuotaBlockedUntil;
    const retryAfter = blocked
      ? Math.max(1, Math.ceil((ttsQuotaBlockedUntil - now) / 1000))
      : 0;

    return res.json({
      ok: true,
      available: !blocked && Boolean(process.env.GEMINI_API_KEY),
      browserFallback: blocked,
      retryAfter,
      model: TTS_MODEL,
      api: "interactions-rest",
      voices: {
        female: "Kore",
        male: "Charon",
      },
      format: {
        container: "wav",
        sampleRate: 24000,
        channels: 1,
        bitsPerSample: 16,
      },
      cacheSize: ttsCache.size,
      inflight: ttsInflight.size,
      stats: { ...ttsStats },
    });
  });

  /* ============================================================
   * 6B. MAIN TTS ENDPOINT
   * GET /api/tts?text=Hello&voice=female
   * GET /api/tts?text=Hello&voice=male
   * ============================================================ */

  app.get("/api/tts", async (req, res) => {
    try {
      const text = String(req.query.text || "")
        .replace(/\s+/g, " ")
        .trim();

      if (!text) {
        return res.status(400).json({
          error: "Text parameter is required.",
          browserFallback: false,
        });
      }

      if (text.length > MAX_TTS_CHARS) {
        return res.status(413).json({
          error:
            `Văn bản quá dài cho một lần đọc (${MAX_TTS_CHARS} ký tự). Hãy chia theo câu hoặc lượt thoại.`,
          browserFallback: true,
        });
      }

      const voiceName = getTtsVoice(req.query.voice);
      const cacheKey = `${voiceName}::${text}`;
      const wasCached = ttsCache.has(cacheKey);
      const wav = await generateTts(text, voiceName);

      res.status(200);
      res.setHeader("Content-Type", "audio/wav");
      res.setHeader("Content-Length", wav.length.toString());
      res.setHeader(
        "Cache-Control",
        "public, max-age=31536000, immutable",
      );
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("X-TTS-Voice", voiceName);
      res.setHeader("X-TTS-Model", TTS_MODEL);
      res.setHeader("X-TTS-API", "interactions-rest");
      res.setHeader("X-TTS-Cache", wasCached ? "HIT" : "MISS");
      res.setHeader("X-TTS-Browser-Fallback", "false");

      return res.send(wav);
    } catch (err: any) {
      console.error("Gemini TTS error:", err);

      if (isQuotaError(err)) {
        const retryAfter = Math.max(
          1,
          Number(err?.retryAfter) ||
            Math.ceil((ttsQuotaBlockedUntil - Date.now()) / 1000),
        );

        res.setHeader("X-TTS-Quota", "exhausted");

        return sendTtsFallback(res, {
          status: 429,
          error: "Gemini TTS đang hết quota. Chuyển sang SpeechSynthesis.",
          retryAfter,
          voice: getTtsVoice(req.query.voice),
          details:
            "Frontend phải dùng window.speechSynthesis và không gọi lại Gemini TTS ngay.",
        });
      }

      if (isInvalidArgumentError(err)) {
        return sendTtsFallback(res, {
          status: 400,
          error: "Gemini TTS từ chối tham số của request.",
          voice: getTtsVoice(req.query.voice),
          details: err?.message || "INVALID_ARGUMENT",
        });
      }

      return sendTtsFallback(res, {
        status: 502,
        error: "Không thể tạo giọng đọc AI lúc này. Chuyển sang SpeechSynthesis.",
        voice: getTtsVoice(req.query.voice),
        details: err?.message || "TTS generation failed.",
      });
    }
  });

  /* ============================================================
   * 6C. TTS PRELOAD
   * ============================================================ */

  app.get("/api/tts/preload", async (req, res) => {
    try {
      const text = String(req.query.text || "")
        .replace(/\s+/g, " ")
        .trim();

      if (!text) {
        return res.status(400).json({
          ok: false,
          error: "Missing text",
        });
      }

      if (text.length > MAX_TTS_CHARS) {
        return res.status(413).json({
          ok: false,
          error: `Text exceeds ${MAX_TTS_CHARS} characters`,
          browserFallback: true,
        });
      }

      const voiceName = getTtsVoice(req.query.voice);
      const cacheKey = `${voiceName}::${text}`;
      const cached = ttsCache.has(cacheKey);

      if (cached) {
        return res.json({
          ok: true,
          cached: true,
          generated: false,
          voice: voiceName,
          model: TTS_MODEL,
          api: "interactions-rest",
        });
      }

      const shouldGenerate =
        String(req.query.generate || "").toLowerCase() === "true";

      if (!shouldGenerate) {
        return res.json({
          ok: true,
          cached: false,
          generated: false,
          voice: voiceName,
          model: TTS_MODEL,
          api: "interactions-rest",
          message:
            "Audio chưa có trong cache. Không gọi Gemini để tránh tiêu quota.",
        });
      }

      await generateTts(text, voiceName);

      return res.json({
        ok: true,
        cached: false,
        generated: true,
        voice: voiceName,
        model: TTS_MODEL,
        api: "interactions-rest",
      });
    } catch (err: any) {
      console.error("Gemini TTS preload error:", err);

      if (isQuotaError(err)) {
        const retryAfter = Math.max(
          1,
          Number(err?.retryAfter) ||
            Math.ceil((ttsQuotaBlockedUntil - Date.now()) / 1000),
        );

        res.setHeader("Retry-After", String(retryAfter));

        return res.status(429).json({
          ok: false,
          error: "Gemini TTS quota exhausted",
          retryAfter,
          browserFallback: true,
        });
      }

      return res.status(502).json({
        ok: false,
        error: err?.message || "TTS preload failed",
        browserFallback: true,
      });
    }
  });

  /* ============================================================
   * 7. VITE DEVELOPMENT / PRODUCTION
   * ============================================================ */

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
      },
      appType: "spa",
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");

    app.use(express.static(distPath));

    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  /* ============================================================
   * 8. START SERVER
   * ============================================================ */

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
    console.log(`TTS model: ${TTS_MODEL}`);
    console.log("TTS API: Gemini Interactions REST API (2026-05-20)");
    console.log("TTS voices: Emily=Kore, David=Charon");
  });
}

/* ============================================================
 * START
 * ============================================================ */

startServer().catch((error) => {
  console.error("Fatal server startup error:", error);
  process.exit(1);
});