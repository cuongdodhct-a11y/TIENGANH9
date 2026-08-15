import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing.');
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Chỉ chấp nhận POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method Not Allowed',
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
      'Tổng hợp Tiếng Anh Lớp 9';

    let question = userQuestion || '';

    // Nếu không có userQuestion thì lấy tin nhắn cuối cùng
    if (
      !question &&
      Array.isArray(messages) &&
      messages.length > 0
    ) {
      const lastMsg = messages[messages.length - 1];

      question =
        lastMsg?.text ||
        lastMsg?.content ||
        '';
    }

    if (!question || !question.trim()) {
      return res.status(400).json({
        error: 'Thiếu nội dung câu hỏi.',
      });
    }

    const systemInstruction = `
Bạn là "Thầy Cô AI Tiếng Anh 9" - Gia sư thông minh
bám sát chương trình SGK Tiếng Anh Lớp 9 của
Bộ Giáo dục và Đào tạo Việt Nam.

Nhiệm vụ của bạn:

1. Giải đáp thắc mắc về bài tập, từ vựng, ngữ pháp,
   phát âm và các bài tập SGK Tiếng Anh lớp 9.

2. Trả lời bằng Tiếng Việt dễ hiểu, kết hợp Tiếng Anh
   chuẩn khi cần thiết.

3. Dùng ví dụ minh họa sinh động, phù hợp với học sinh lớp 9.

4. Luôn lịch sự, ân cần và có tính sư phạm.

5. Khi giải thích ngữ pháp:
   - Nêu quy tắc.
   - Giải thích cách dùng.
   - Cho ví dụ.
   - Chỉ ra lỗi thường gặp.
   - Nếu phù hợp, đưa ra mẹo làm bài thi vào lớp 10.

6. Khi học sinh hỏi bài tập:
   - Phân tích yêu cầu.
   - Hướng dẫn cách làm.
   - Giải thích đáp án.
   - Không chỉ đưa ra đáp án một cách máy móc.

Hiện tại học sinh đang học:
${unit}
`;

    let formattedMessages = '';

    if (
      Array.isArray(messages) &&
      messages.length > 0
    ) {
      formattedMessages = messages
        .map((m: any) => {
          const role =
            m?.role === 'user' ||
            m?.sender === 'user'
              ? 'Học sinh'
              : 'Thầy Cô AI';

          const content =
            m?.text ||
            m?.content ||
            '';

          return `${role}: ${content}`;
        })
        .join('\n\n');
    } else {
      formattedMessages = `Học sinh: ${question}`;
    }

    const ai = getAI();

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${formattedMessages}\n\nThầy Cô AI:`,
      config: {
        systemInstruction,
        temperature: 0.6,
      },
    });

    const reply =
      response.text ||
      'Cô chưa có câu trả lời phù hợp. Em thử hỏi lại cụ thể hơn nhé!';

    return res.status(200).json({
      reply,
    });

  } catch (error: any) {
    console.error(
      'Tutor chat Vercel Function error:',
      error
    );

    // Fallback thông minh nếu Gemini gặp lỗi
    try {
      const {
        userQuestion,
      } = req.body || {};

      const question =
        userQuestion ||
        'câu hỏi của em';

      const qLower =
        String(question).toLowerCase();

      let fallbackReply = '';

      if (
        qLower.includes('phrasal verb') ||
        qLower.includes('cụm động từ')
      ) {
        fallbackReply = `📚 **Cụm động từ (Phrasal Verbs)**

Phrasal Verb thường gồm:
**Động từ + giới từ/trạng từ** và có thể tạo thành một nghĩa mới.

Một số cụm quan trọng:

1. **pass down** → truyền lại
2. **set up** → thành lập
3. **look forward to + V-ing** → mong đợi
4. **cut down on** → cắt giảm
5. **get on with** → hòa thuận, ăn ý

💡 Lưu ý:
**look forward to + V-ing**

Ví dụ:
**I look forward to meeting you.**

Không dùng:
❌ I look forward to meet you.`;

      } else if (
        qLower.includes('quan hệ') ||
        qLower.includes('relative clause')
      ) {
        fallbackReply = `📚 **Mệnh đề quan hệ (Relative Clauses)**

- **who**: dùng cho người.
- **which**: dùng cho vật.
- **that**: dùng cho người hoặc vật trong mệnh đề quan hệ xác định.
- **where**: dùng cho nơi chốn.

Ví dụ:

**The girl who sits next to me is Mai.**

**The book which I bought yesterday is interesting.**

⚠️ Lưu ý:
Không dùng **that** trong mệnh đề quan hệ không xác định sau dấu phẩy.`;

      } else if (
        qLower.includes('ed') ||
        qLower.includes('phát âm')
      ) {
        fallbackReply = `🎯 **Quy tắc phát âm đuôi -ED**

Có 3 cách phát âm chính:

1. **/ɪd/**
   Sau âm **/t/** hoặc **/d/**:
   - wanted
   - needed

2. **/t/**
   Sau các âm vô thanh như:
   **/p/, /k/, /f/, /s/, /ʃ/, /tʃ/**
   - stopped
   - looked
   - washed
   - watched

3. **/d/**
   Các trường hợp còn lại:
   - played
   - cleaned

💡 Khi làm bài thi, hãy xét **âm cuối của từ**, không chỉ nhìn chữ cái cuối.`;

      } else {
        fallbackReply = `Chào em! Cô đã nhận được câu hỏi:

"${question}"

Em hãy thử hỏi cụ thể hơn về:
- Từ vựng
- Ngữ pháp
- Phát âm
- Cụm động từ
- Mệnh đề quan hệ
- Bài tập SGK
- Kỹ năng làm bài thi vào lớp 10

Cô sẽ hướng dẫn từng bước cho em nhé! 😊`;
      }

      return res.status(200).json({
        reply: fallbackReply,
        fallback: true,
      });

    } catch (fallbackError) {
      console.error(
        'Tutor fallback error:',
        fallbackError
      );

      return res.status(500).json({
        error:
          'Thầy Cô AI chưa thể phản hồi lúc này.',
      });
    }
  }
}