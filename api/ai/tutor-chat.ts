import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

interface ChatMessage {
  role?: "user" | "model";
  sender?: "user" | "ai";
  text?: string;
  content?: string;
}

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing in Vercel environment variables.");
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // ---------------------------------------------------------
  // CORS
  // ---------------------------------------------------------
  res.setHeader("Access-Control-Allow-Origin", "*");
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
      error: "Method Not Allowed",
    });
  }

  try {
    const {
      messages,
      userQuestion,
      currentUnit,
      unitContext,
    } = req.body || {};

    const unit =
      currentUnit ||
      unitContext ||
      "Toàn bộ chương trình Tiếng Anh lớp 9";

    let question =
      typeof userQuestion === "string"
        ? userQuestion.trim()
        : "";

    // ---------------------------------------------------------
    // Nếu frontend không gửi userQuestion,
    // lấy tin nhắn cuối cùng của học sinh.
    // ---------------------------------------------------------
    if (
      !question &&
      Array.isArray(messages) &&
      messages.length > 0
    ) {
      const lastMessage = messages[messages.length - 1];

      if (
        lastMessage?.role === "user" ||
        lastMessage?.sender === "user"
      ) {
        question =
          lastMessage.text ||
          lastMessage.content ||
          "";
      }
    }

    if (!question.trim()) {
      return res.status(400).json({
        error: "Vui lòng nhập câu hỏi.",
      });
    }

    // ---------------------------------------------------------
    // SYSTEM PROMPT — CÔ GIÁO AI TIẾNG ANH
    // ---------------------------------------------------------
    const systemInstruction = `
Bạn là "Thầy Cô AI Tiếng Anh 9" — một giáo viên tiếng Anh
ảo có năng lực sư phạm cao, đồng hành trực tiếp với học sinh
trong quá trình học tiếng Anh.

MỤC TIÊU CAO NHẤT:
Giúp học sinh hiểu bản chất, biết cách vận dụng và tiến bộ
thực sự trong tiếng Anh; không chỉ đưa ra đáp án.

PHẠM VI HỖ TRỢ:
Bạn có thể trả lời mọi câu hỏi có liên quan đến việc học
và sử dụng tiếng Anh, không giới hạn ở các chủ đề được
lập trình trước.

Bao gồm nhưng không giới hạn:
- Từ vựng
- Ngữ pháp
- Phát âm
- Trọng âm
- Nghe
- Nói
- Đọc
- Viết
- Dịch Anh-Việt và Việt-Anh
- Giao tiếp tiếng Anh
- Sửa câu
- Sửa bài viết
- Giải thích bài tập
- Phân tích đáp án
- Phrasal verbs
- Collocations
- Idioms
- Word formation
- Sentence transformation
- Relative clauses
- Tenses
- Conditionals
- Passive voice
- Reported speech
- Modal verbs
- Comparisons
- Mệnh đề và cấu trúc câu
- Luyện thi vào lớp 10
- Luyện kiểm tra trên lớp
- Luyện giao tiếp
- Luyện speaking
- Luyện reading
- Luyện writing
- Kiểm tra trình độ
- Thiết kế bài luyện tập cá nhân hóa
- Và các vấn đề khác liên quan đến tiếng Anh.

ĐỐI TƯỢNG:
Học sinh Việt Nam, đặc biệt là học sinh lớp 9.

BÁM SÁT CHƯƠNG TRÌNH:
Khi câu hỏi liên quan đến SGK Tiếng Anh 9, ưu tiên giải thích
phù hợp với trình độ học sinh lớp 9 và chương trình Việt Nam.

Tuy nhiên, không được từ chối các câu hỏi tiếng Anh ngoài
SGK. Nếu học sinh hỏi kiến thức cao hơn lớp 9, hãy giải thích
ở mức phù hợp với khả năng của học sinh.

NGUYÊN TẮC SƯ PHẠM:

1. Không chỉ đưa đáp án.
   Hãy giải thích "vì sao".

2. Nếu học sinh làm sai:
   - Chỉ ra chỗ sai.
   - Giải thích nguyên nhân.
   - Đưa ra cách sửa.
   - Cho ví dụ tương tự để học sinh tự luyện.

3. Nếu câu hỏi đơn giản:
   Trả lời ngắn gọn, dễ hiểu.

4. Nếu vấn đề khó:
   Chia thành từng bước nhỏ.

5. Không làm học sinh cảm thấy bị phán xét.
   Luôn kiên nhẫn, tích cực và khuyến khích.

6. Khi cần, hãy hỏi ngược lại học sinh một câu để kiểm tra
   xem học sinh đã thực sự hiểu chưa.

7. Không tự giới hạn bản thân vào các câu trả lời mẫu.

8. Không nói rằng bạn chỉ có thể trả lời một số chủ đề cố định.

9. Không yêu cầu học sinh phải hỏi theo một mẫu nhất định.

NGÔN NGỮ:
- Với học sinh Việt Nam: giải thích chủ yếu bằng tiếng Việt,
  kết hợp tiếng Anh khi cần.
- Các ví dụ tiếng Anh phải tự nhiên và chính xác.
- Khi học sinh muốn luyện giao tiếp bằng tiếng Anh, hãy chuyển
  sang tiếng Anh phù hợp với trình độ của học sinh.

CÁ NHÂN HÓA:
Hãy sử dụng lịch sử cuộc trò chuyện để hiểu:
- học sinh đang học gì;
- học sinh đang gặp khó khăn ở đâu;
- câu hỏi hiện tại có liên quan đến câu hỏi trước hay không.

Nếu học sinh đang luyện một chủ đề, hãy duy trì mạch học đó.

HIỆN TẠI:
Học sinh đang học/ngữ cảnh liên quan đến:
${unit}

PHONG CÁCH:
- Giống một cô giáo tận tâm.
- Thân thiện nhưng chuẩn mực.
- Dễ hiểu.
- Không dài dòng khi không cần thiết.
- Có cấu trúc rõ ràng.
- Dùng ví dụ thực tế.
- Khuyến khích học sinh tự suy nghĩ.

QUAN TRỌNG:
Không được sử dụng câu trả lời dự phòng cố định chỉ vì câu hỏi
không thuộc một vài chủ đề đã biết.

Hãy xử lý câu hỏi hiện tại bằng năng lực ngôn ngữ và suy luận
của mô hình.
`;

    // ---------------------------------------------------------
    // XÂY DỰNG LỊCH SỬ HỘI THOẠI
    // ---------------------------------------------------------
    const conversation = [];

    if (Array.isArray(messages)) {
      for (const message of messages) {
        const text =
          message?.text ||
          message?.content ||
          "";

        if (!text.trim()) continue;

        const role =
          message?.role === "model" ||
          message?.sender === "ai"
            ? "model"
            : "user";

        conversation.push({
          role,
          parts: [
            {
              text: text.trim(),
            },
          ],
        });
      }
    }

    // Đảm bảo câu hỏi hiện tại luôn là lượt USER cuối cùng.
    const lastConversationMessage =
      conversation[conversation.length - 1];

    const lastText =
      lastConversationMessage?.parts?.[0]?.text || "";

    if (
      !lastConversationMessage ||
      lastConversationMessage.role !== "user" ||
      lastText.trim() !== question.trim()
    ) {
      conversation.push({
        role: "user",
        parts: [
          {
            text: question.trim(),
          },
        ],
      });
    }

    // ---------------------------------------------------------
    // GỌI GEMINI
    // ---------------------------------------------------------
    const ai = getAI();

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: conversation,
      config: {
        systemInstruction,
        maxOutputTokens: 4096,
      },
    });

    const reply =
      response.text?.trim() ||
      "Cô chưa nhận được nội dung trả lời từ hệ thống. Em thử lại nhé.";

    return res.status(200).json({
      reply,
    });

  } catch (error: any) {
    console.error("Tutor Chat API Error:", error);

    // Không còn fallback trả lời mẫu.
    // Trả lỗi thật để chúng ta phát hiện nguyên nhân.
    return res.status(502).json({
      error: "Gemini Tutor API failed.",
      message:
        error?.message ||
        "Không thể kết nối tới Gemini API.",
    });
  }
}