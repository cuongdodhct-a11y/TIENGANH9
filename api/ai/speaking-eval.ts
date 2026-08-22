import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

interface SpeakingEvalRequest {
  targetText?: string;
  transcriptText?: string;
  audioBase64?: string;
  audioMimeType?: string;
}

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing in Vercel environment variables."
    );
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "tienganh9-speaking-eval",
      },
    },
  });
}

function cleanJsonText(text: string): string {
  let value = text.trim();

  // Remove markdown code fences if Gemini returns them.
  value = value.replace(/^```json\s*/i, "");
  value = value.replace(/^```\s*/i, "");
  value = value.replace(/\s*```$/i, "");

  return value.trim();
}

function safeNumber(
  value: unknown,
  fallback = 0
): number {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return fallback;
  }

  return Math.max(
    0,
    Math.min(100, Math.round(number))
  );
}

function safeString(
  value: unknown,
  fallback = ""
): string {
  return typeof value === "string"
    ? value.trim()
    : fallback;
}

function safeStringArray(
  value: unknown
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

function safeCorrections(
  value: unknown
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        item &&
        typeof item === "object"
    )
    .map((item: any) => ({
      word: safeString(item.word),
      phoneme: safeString(item.phoneme),
      ipa: safeString(item.ipa),
      status: safeString(
        item.status,
        "needs_correction"
      ),
      severity: safeString(
        item.severity,
        "medium"
      ),
      confidence: safeNumber(
        item.confidence,
        70
      ),
      observedProblem: safeString(
        item.observedProblem
      ),
      correctTarget: safeString(
        item.correctTarget
      ),
      mouthTip: safeString(
        item.mouthTip
      ),
      practiceTip: safeString(
        item.practiceTip
      ),
      practiceSequence: safeString(
        item.practiceSequence
      ),
      example: safeString(
        item.example
      ),
    }));
}

function safeWordFeedback(
  value: unknown
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        item &&
        typeof item === "object"
    )
    .map((item: any) => ({
      targetWord: safeString(
        item.targetWord
      ),
      heardAs: safeString(
        item.heardAs
      ),
      status: safeString(
        item.status,
        "uncertain"
      ),
      pronunciationNote:
        safeString(
          item.pronunciationNote
        ),
      ipa: safeString(item.ipa),
    }));
}

function safeWordingCorrections(
  value: unknown
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(
      (item) =>
        item &&
        typeof item === "object"
    )
    .map((item: any) => ({
      targetWord: safeString(
        item.targetWord
      ),
      heardAs: safeString(
        item.heardAs
      ),
      issue: safeString(
        item.issue
      ),
      correction: safeString(
        item.correction
      ),
    }));
}

function safeProsody(
  value: unknown
) {
  if (
    !value ||
    typeof value !== "object"
  ) {
    return undefined;
  }

  const item = value as any;

  return {
    wordStress: safeString(
      item.wordStress
    ),
    sentenceStress: safeString(
      item.sentenceStress
    ),
    linking: safeString(
      item.linking
    ),
    intonation: safeString(
      item.intonation
    ),
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // =========================================================
  // CORS
  // =========================================================

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error:
        "Method Not Allowed. Speaking evaluation requires POST.",
    });
  }

  try {
    // =======================================================
    // READ REQUEST
    // =======================================================

    const body =
      (req.body || {}) as SpeakingEvalRequest;

    const targetText =
      safeString(body.targetText);

    const transcriptText =
      safeString(body.transcriptText);

    const audioBase64 =
      safeString(body.audioBase64);

    const audioMimeType =
      safeString(
        body.audioMimeType,
        "audio/wav"
      );

    if (!targetText) {
      return res.status(400).json({
        error:
          "Thiếu câu mẫu cần chấm phát âm.",
      });
    }

    if (!audioBase64) {
      return res.status(400).json({
        error:
          "Chưa nhận được bản ghi âm.",
      });
    }

    // Prevent unexpectedly large requests.
    // The frontend normally sends a short 16 kHz mono WAV.
    if (audioBase64.length > 4_000_000) {
      return res.status(413).json({
        error:
          "Bản ghi âm quá lớn. Hãy đọc câu ngắn hơn và thử lại.",
      });
    }

    // =======================================================
    // GEMINI PROMPT
    // =======================================================

    const systemInstruction = `
Bạn là chuyên gia đánh giá phát âm tiếng Anh cho học sinh Việt Nam lớp 9.

NHIỆM VỤ:
Phân tích BẢN GHI ÂM THẬT của học sinh và so sánh với câu mẫu.

Câu mẫu:
"${targetText}"

Transcript do trình duyệt nhận dạng:
"${transcriptText || "(không có transcript đáng tin cậy)"}"

QUY TẮC QUAN TRỌNG:

1. Âm thanh là nguồn bằng chứng chính.
2. Không được chỉ dựa vào transcript.
3. Nếu transcript khác âm thanh thì ưu tiên âm thanh.
4. Không được bịa lỗi phát âm nếu âm thanh không đủ rõ.
5. Chỉ đưa lỗi phát âm khi có bằng chứng tương đối rõ.
6. Đánh giá phù hợp với học sinh lớp 9 Việt Nam.
7. Tập trung vào:
   - độ chính xác phát âm;
   - phụ âm;
   - nguyên âm;
   - âm cuối;
   - trọng âm từ;
   - trọng âm câu;
   - nối âm;
   - ngữ điệu;
   - độ lưu loát.
8. Không phạt học sinh quá nặng chỉ vì accent Việt Nam.
9. Nếu học sinh phát âm tốt, phải ghi nhận rõ.
10. Các điểm số phải nằm trong khoảng 0-100.
11. Không được trả về Markdown.
12. Chỉ trả về MỘT JSON object hợp lệ.

CẤU TRÚC JSON BẮT BUỘC:

{
  "overallScore": number,
  "pronunciationScore": number,
  "wordingScore": number,
  "fluencyScore": number,
  "targetText": string,
  "heardTranscript": string,
  "overallFeedback": string,
  "strengths": string[],
  "pronunciationCorrections": [
    {
      "word": string,
      "phoneme": string,
      "ipa": string,
      "status": string,
      "severity": string,
      "confidence": number,
      "observedProblem": string,
      "correctTarget": string,
      "mouthTip": string,
      "practiceTip": string,
      "practiceSequence": string,
      "example": string
    }
  ],
  "wordFeedback": [
    {
      "targetWord": string,
      "heardAs": string,
      "status": string,
      "pronunciationNote": string,
      "ipa": string
    }
  ],
  "wordingCorrections": [
    {
      "targetWord": string,
      "heardAs": string,
      "issue": string,
      "correction": string
    }
  ],
  "prosodyFeedback": {
    "wordStress": string,
    "sentenceStress": string,
    "linking": string,
    "intonation": string
  },
  "practicePlan": string[],
  "modelPracticePhrase": string,
  "improvements": string,
  "encouragement": string
}

ĐẶC BIỆT:
- pronunciationCorrections chỉ chứa lỗi phát âm có bằng chứng.
- confidence là mức tin cậy 0-100.
- status có thể là:
  "correct", "needs_correction", "uncertain".
- severity có thể là:
  "low", "medium", "high".
- Nếu không có lỗi rõ ràng, pronunciationCorrections phải là [].
- Nếu không chắc chắn về một âm, dùng "uncertain" thay vì khẳng định học sinh sai.
`;

    // =======================================================
    // CALL GEMINI
    // =======================================================

    const ai = getAI();

    /*
     * Gemini 2.5 Flash is used deliberately:
     *
     * - It supports audio input.
     * - It is available on the Gemini API Free Tier.
     * - This endpoint is NOT Gemini TTS.
     * - Therefore TTS quota exhaustion does not directly break
     *   pronunciation evaluation.
     */

    const response =
      await ai.models.generateContent({
        model: "gemini-2.5-flash",

        contents: [
          {
            role: "user",
            parts: [
              {
                text: systemInstruction,
              },
              {
                inlineData: {
                  mimeType: audioMimeType,
                  data: audioBase64,
                },
              },
            ],
          },
        ],

        config: {
          temperature: 0.15,
          maxOutputTokens: 4096,

          responseMimeType:
            "application/json",
        },
      });

    // =======================================================
    // READ GEMINI RESPONSE
    // =======================================================

    const rawText =
      response.text?.trim() || "";

    if (!rawText) {
      throw new Error(
        "Gemini không trả về kết quả chấm phát âm."
      );
    }

    const cleaned =
      cleanJsonText(rawText);

    let parsed: any;

    try {
      parsed = JSON.parse(cleaned);
    } catch (parseError) {
      console.error(
        "[SpeakingEval] JSON parse error:",
        parseError
      );

      console.error(
        "[SpeakingEval] Raw Gemini response:",
        rawText
      );

      throw new Error(
        "AI trả về kết quả không đúng định dạng. Vui lòng thử chấm lại."
      );
    }

    // =======================================================
    // NORMALIZE RESPONSE
    // =======================================================

    const result = {
      overallScore: safeNumber(
        parsed.overallScore
      ),

      pronunciationScore:
        safeNumber(
          parsed.pronunciationScore
        ),

      wordingScore:
        safeNumber(
          parsed.wordingScore
        ),

      fluencyScore:
        safeNumber(
          parsed.fluencyScore
        ),

      targetText:
        safeString(
          parsed.targetText,
          targetText
        ),

      heardTranscript:
        safeString(
          parsed.heardTranscript,
          transcriptText
        ),

      overallFeedback:
        safeString(
          parsed.overallFeedback,
          "AI đã phân tích bản ghi âm của em."
        ),

      strengths:
        safeStringArray(
          parsed.strengths
        ),

      pronunciationCorrections:
        safeCorrections(
          parsed.pronunciationCorrections
        ),

      wordFeedback:
        safeWordFeedback(
          parsed.wordFeedback
        ),

      wordingCorrections:
        safeWordingCorrections(
          parsed.wordingCorrections
        ),

      prosodyFeedback:
        safeProsody(
          parsed.prosodyFeedback
        ),

      practicePlan:
        safeStringArray(
          parsed.practicePlan
        ),

      modelPracticePhrase:
        safeString(
          parsed.modelPracticePhrase,
          targetText
        ),

      improvements:
        safeString(
          parsed.improvements,
          "Tiếp tục luyện lại câu mẫu và chú ý các âm được đánh dấu."
        ),

      encouragement:
        safeString(
          parsed.encouragement,
          "Em hãy tiếp tục luyện từng câu ngắn, chậm và rõ."
        ),
    };

    // =======================================================
    // RETURN RESULT
    // =======================================================

    return res.status(200).json(
      result
    );

  } catch (error: any) {
    console.error(
      "[SpeakingEval] Production error:",
      error
    );

    const status =
      Number(error?.status) ||
      Number(
        error?.response?.status
      );

    const message =
      String(
        error?.message || ""
      );

    // -------------------------------------------------------
    // FREE-TIER QUOTA
    // -------------------------------------------------------

    if (
      status === 429 ||
      message.includes(
        "RESOURCE_EXHAUSTED"
      ) ||
      message.includes(
        "quota"
      ) ||
      message.includes(
        "Quota exceeded"
      )
    ) {
      return res.status(429).json({
        error:
          "AI chấm phát âm đang tạm hết lượt miễn phí. Hãy chờ một lúc rồi thử lại.",
        code:
          "FREE_TIER_QUOTA_EXCEEDED",
      });
    }

    // -------------------------------------------------------
    // API KEY
    // -------------------------------------------------------

    if (
      message.includes(
        "GEMINI_API_KEY"
      )
    ) {
      return res.status(500).json({
        error:
          "Chưa cấu hình GEMINI_API_KEY trên Vercel.",
        code:
          "MISSING_GEMINI_API_KEY",
      });
    }

    // -------------------------------------------------------
    // GENERIC ERROR
    // -------------------------------------------------------

    return res.status(502).json({
      error:
        message ||
        "Không thể kết nối tới AI chấm phát âm.",
      code:
        "SPEAKING_EVAL_FAILED",
    });
  }
}