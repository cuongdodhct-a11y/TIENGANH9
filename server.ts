import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // Helper for Gemini AI client
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing. Please set it in Settings > Secrets.");
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

  // Health check API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // 1. AI WRITING EVALUATION API (Chấm bài viết Tiếng Anh lớp 9)
  app.post("/api/ai/writing-feedback", async (req, res) => {
    try {
      const { promptTopic, studentText, wordLimit } = req.body;
      if (!studentText || studentText.trim().length === 0) {
        return res.status(400).json({ error: "Vui lòng nhập bài viết của bạn." });
      }

      const ai = getAI();
      const prompt = `Bạn là giám khảo chấm thi Tiếng Anh lớp 9 SGK Bộ Giáo Dục Việt Nam.
Hãy đánh giá bài viết của học sinh theo các tiêu chí chuẩn lớp 9.

Đề bài: ${promptTopic || "Bài viết tự do chủ đề Tiếng Anh lớp 9"}
Giới hạn từ khuyến nghị: ${wordLimit || "60-80 từ"}
Bài làm của học sinh:
"${studentText}"

Yêu cầu trả về định dạng JSON đúng cấu trúc:
{
  "overallScore": số từ 0.0 đến 10.0,
  "scores": {
    "grammar": số 0-10,
    "vocabulary": số 0-10,
    "coherence": số 0-10,
    "taskFulfillment": số 0-10
  },
  "generalFeedback": "Nhận xét tổng quát bằng Tiếng Việt thân thiện, động viên học sinh.",
  "corrections": [
    {
      "original": "cụm từ sai trong bài",
      "corrected": "cụm từ đúng sửa lại",
      "reason": "Giải thích lỗi sai bằng Tiếng Việt ngắn gọn (ví dụ: chia sai thì, dùng sai giới từ, thiếu s/es...)"
    }
  ],
  "improvedVersion": "Đoạn văn hoàn chỉnh đã được sửa lỗi và nâng cấp từ vựng/ngữ pháp chuẩn Tiếng Anh 9.",
  "keyVocabularyUsed": ["danh sách các từ vựng SGK lớp 9 học sinh đã dùng tốt"],
  "grade10ExamTips": "1-2 lời khuyên hữu ích cho kỳ thi tuyển sinh vào lớp 10."
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const responseText = response.text || "{}";
      const data = JSON.parse(responseText);
      res.json(data);
    } catch (err: any) {
      console.error("Writing feedback error:", err);
      res.status(500).json({
        error: "Không thể chấm bài viết lúc này. " + (err.message || "Vui lòng thử lại sau."),
      });
    }
  });

  // 2. AI SPEAKING EVALUATION API (Chấm phát âm và phát triển phản xạ nói)
  app.post("/api/ai/speaking-eval", async (req, res) => {
    try {
      const { targetText, transcriptText } = req.body;
      if (!transcriptText) {
        return res.status(400).json({ error: "Chưa nhận diện được giọng nói học sinh." });
      }

      const ai = getAI();
      const prompt = `Bạn là trợ lý chấm phát âm Tiếng Anh 9 chuyên nghiệp.
Câu chuẩn SGK: "${targetText}"
Học sinh phát âm/nói được (qua nhận diện): "${transcriptText}"

Hãy phân tích kỹ lưỡng độ chính xác phát âm, ngữ điệu, từ chưa phát âm chuẩn và đưa ra nhận xét chi tiết dạng JSON:
{
  "accuracyScore": số từ 0 đến 100,
  "fluencyScore": số từ 0 đến 100,
  "phonemeFeedback": [
    {
      "word": "từ trong câu",
      "status": "correct" hoặc "needs_work" hoặc "missed",
      "ipa": "phiên âm IPA",
      "tip": "Mẹo phát âm cụ thể bằng Tiếng Việt nếu chưa chuẩn"
    }
  ],
  "strengths": "Điểm tốt trong câu phát âm",
  "improvements": "Những điều cần chú ý khi phát âm lại câu này",
  "encouragement": "Lời động viên vui vẻ"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Speaking eval error:", err);
      res.status(500).json({
        error: "Không thể chấm phát âm lúc này. " + (err.message || "Vui lòng thử lại."),
      });
    }
  });

  // 3. AI DIAGNOSTIC & PERSONALIZED ROUTE (Cá nhân hóa lộ trình học)
  app.post("/api/ai/diagnostic-route", async (req, res) => {
    try {
      const { userAnswers, targetGoal } = req.body;
      const ai = getAI();

      const prompt = `Học sinh lớp 9 vừa hoàn thành bài kiểm tra chẩn đoán trình độ Tiếng Anh 9 SGK.
Mục tiêu học tập: ${targetGoal || "Đạt điểm cao thi vào 10 và làm chủ 4 kỹ năng"}
Dữ liệu kết quả test: ${JSON.stringify(userAnswers)}

Hãy xây dựng lộ trình học cá nhân hóa cho SGK Tiếng Anh 9 dưới dạng JSON:
{
  "assessedLevel": "Yếu" | "Trung bình" | "Khá" | "Giỏi",
  "levelDescription": "Đánh giá chi tiết năng lực hiện tại của học sinh theo chương trình lớp 9.",
  "weaknessSkills": ["Kỹ năng/mảng kiến thức cần cải thiện gấp (ví dụ: Ngữ pháp thì, Phát âm /f/ & /v/, Viết đoạn văn)"],
  "recommendedUnits": [
    {
      "unitId": 1 đến 12,
      "title": "Tên bài học SGK 9",
      "priorityReason": "Lý do học sinh nên tập trung học bài này"
    }
  ],
  "dailyTarget": {
    "vocabularyCount": số từ/ngày (10-20 từ),
    "minutesPerDay": số phút (20-45 phút),
    "weeklyGoal": "Mục tiêu cụ thể trong tuần đầu tiên"
  },
  "studyTips": ["3-4 lời khuyên phương pháp tự học Tiếng Anh 9 hiệu quả"]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Diagnostic route error:", err);
      res.status(500).json({ error: "Không thể tạo lộ trình cá nhân hóa." });
    }
  });

  // 4. AI EXERCISE GENERATOR (Tạo bài tập theo trình độ bám sát SGK 9)
  app.post("/api/ai/generate-quiz", async (req, res) => {
    try {
      const { unitTitle, difficulty, questionCount = 5, topicType } = req.body;
      const ai = getAI();

      const prompt = `Tạo bài tập trắc nghiệm Tiếng Anh lớp 9 SGK Bộ Giáo Dục.
Chủ đề Unit: ${unitTitle || "Unit 1: Local Community"}
Trình độ: ${difficulty || "Trung bình"}
Dạng bài tập: ${topicType || "Từ vựng và Ngữ pháp tổng hợp"}
Số câu hỏi: ${questionCount}

Yêu cầu trả về dạng JSON:
{
  "quizTitle": "Tiêu đề bài tập ngắn gọn",
  "questions": [
    {
      "id": 1,
      "question": "Nội dung câu hỏi Tiếng Anh",
      "options": ["A. Đáp án 1", "B. Đáp án 2", "C. Đáp án 3", "D. Đáp án 4"],
      "correctIndex": số từ 0 đến 3 (chỉ số đáp án đúng),
      "explanation": "Giải thích chi tiết bằng Tiếng Việt tại sao đáp án này đúng và liên hệ kiến thức SGK 9."
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const data = JSON.parse(response.text || "{}");
      res.json(data);
    } catch (err: any) {
      console.error("Quiz generator error:", err);
      res.status(500).json({ error: "Không thể tạo bài tập AI lúc này." });
    }
  });

  // 5. AI TUTOR CHAT API (Gia sư Tiếng Anh 9 24/7)
  app.post("/api/ai/tutor-chat", async (req, res) => {
    try {
      const { messages, userQuestion, currentUnit, unitContext } = req.body;
      const unit = currentUnit || unitContext || "Tổng hợp Tiếng Anh Lớp 9";
      let question = userQuestion || "";

      if (!question && Array.isArray(messages) && messages.length > 0) {
        const lastMsg = messages[messages.length - 1];
        question = lastMsg.text || lastMsg.content || "";
      }

      if (!question.trim()) {
        return res.status(400).json({ error: "Thiếu nội dung câu hỏi." });
      }

      try {
        const ai = getAI();
        const systemInstruction = `Bạn là "Thầy Cô AI Tiếng Anh 9" - Gia sư thông minh bám sát chương trình SGK Tiếng Anh Lớp 9 của Bộ Giáo Dục & Đào Tạo Việt Nam.
Nhiệm vụ của bạn:
1. Giải đáp thắc mắc bài tập, từ vựng, ngữ pháp, phát âm, bài tập SGK lớp 9.
2. Trả lời bằng Tiếng Việt dễ hiểu, kết hợp Tiếng Anh chuẩn. Dùng ví dụ minh họa sinh động.
3. Luôn lịch sự, ân cần, giải thích cặn kẽ công thức ngữ pháp, phân tích đáp án bài tập SGK.
Hiện tại học sinh đang hỏi về: ${unit}.`;

        let formattedMessages = "";
        if (Array.isArray(messages) && messages.length > 0) {
          formattedMessages = messages
            .map((m: any) => `${m.role === "user" || m.sender === "user" ? "Học sinh" : "Thầy Cô AI"}: ${m.text || m.content}`)
            .join("\n\n");
        } else {
          formattedMessages = `Học sinh: ${question}`;
        }

        const response = await ai.models.generateContent({
          model: "gemini-3.6-flash",
          contents: `${formattedMessages}\n\nThầy Cô AI:`,
          config: {
            systemInstruction,
            temperature: 0.6,
          },
        });

        res.json({ reply: response.text });
      } catch (geminiErr: any) {
        console.warn("Gemini API error in tutor chat, returning smart SGK guidance:", geminiErr.message);

        // Smart educational response fallback for Grade 9 curriculum
        const qLower = question.toLowerCase();
        let fallbackReply = "";

        if (qLower.includes("phrasal verb") || qLower.includes("cụm động từ")) {
          fallbackReply = `📚 **Giải thích Cụm động từ (Phrasal Verbs) SGK Tiếng Anh 9:**\n\n- **Định nghĩa:** Phrasal Verb = Động từ + Giới từ / Trạng từ (mang nghĩa hoàn toàn mới).\n- **Các cụm từ trọng tâm lớp 9:**\n  1. *pass down*: truyền lại (qua các thế hệ)\n  2. *set up*: thành lập, khởi nghiệp\n  3. *look forward to + V-ing*: trông mong, chờ đợi\n  4. *cut down on*: cắt giảm\n  5. *get on with*: ăn ý, hòa thuận với ai\n\n💡 **Mẹo thi lớp 10:** Luôn chú ý dạng động từ đi sau phrasal verb (ví dụ: *look forward to meeting you*).`;
        } else if (qLower.includes("quan hệ") || qLower.includes("relative clause")) {
          fallbackReply = `📚 **Mệnh đề quan hệ (Relative Clauses) Tiếng Anh 9:**\n\n1. **Who**: Thay cho người (Chủ ngữ/Tân ngữ) -> *The girl who sits next to me is Mai.*\n2. **Which**: Thay cho vật -> *The book which I bought yesterday is interesting.*\n3. **That**: Thay cho cả người và vật (Dùng trong mệnh đề xác định).\n4. **Where**: Thay cho nơi chốn -> *The village where I was born.*\n\n⚠️ **Lưu ý quan trọng:** Không dùng "that" sau dấu phẩy (mệnh đề không xác định) hoặc sau giới từ!`;
        } else if (qLower.includes("ed") || qLower.includes("phát âm")) {
          fallbackReply = `🎯 **Mẹo nhớ quy tắc phát âm đuôi -ED thi vào 10:**\n\n1. **/id/**: Tận cùng bằng **t, d** (Ví dụ: *wanted, needed* -> "thôi đi").\n2. **/t/**: Tận cùng bằng âm vô thanh **/p, k, f, s, ʃ, tʃ/** (Ví dụ: *stopped, looked, washed, watched* -> "phải kính phục sang sông thắp...").\n3. **/d/**: Các trường hợp còn lại (Ví dụ: *played, cleaned*).`;
        } else {
          fallbackReply = `Chào em! Cô đã nhận được câu hỏi về "${question}".\n\n💡 **Tóm tắt kiến thức SGK Tiếng Anh Lớp 9:**\n- **Trọng tâm Ngữ pháp:** Cụm động từ (Phrasal verbs), Mệnh đề quan hệ, Thì Quá khứ đơn / Quá khứ tiếp diễn, Câu so sánh nâng cao.\n- **Trọng tâm Kỹ năng:** Luyện nghe ghi chú từ khóa, phát âm nối âm / trọng âm từ, viết đoạn văn 60-80 từ có từ nối (However, Therefore, Although).\n\nEm có thể chọn một câu hỏi gợi ý bên dưới hoặc nhờ cô hướng dẫn chi tiết bài tập cụ thể nhé! 😊`;
        }

        res.json({ reply: fallbackReply });
      }
    } catch (err: any) {
      console.error("Tutor chat error:", err);
      res.status(500).json({ error: "Thầy Cô AI chưa thể phản hồi lúc này." });
    }
  });

  // In-memory TTS Cache for ultra-fast response
  const ttsCache = new Map<string, { buffer: Buffer; contentType: string }>();

  // 6. TTS AUDIO PROXY API (Phát âm chuẩn Tiếng Anh - Cô Emily & Thầy David)
  function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1, bitDepth = 16): Buffer {
    const dataSize = pcmBuffer.length;
    const header = Buffer.alloc(44);

    // "RIFF" chunk descriptor
    header.write("RIFF", 0);
    header.writeUInt32LE(36 + dataSize, 4);
    header.write("WAVE", 8);

    // "fmt " sub-chunk
    header.write("fmt ", 12);
    header.writeUInt32LE(16, 16); // Subchunk1Size
    header.writeUInt16LE(1, 20); // AudioFormat (PCM = 1)
    header.writeUInt16LE(numChannels, 22); // NumChannels
    header.writeUInt32LE(sampleRate, 24); // SampleRate
    header.writeUInt32LE(sampleRate * numChannels * (bitDepth / 8), 28); // ByteRate
    header.writeUInt16LE(numChannels * (bitDepth / 8), 32); // BlockAlign
    header.writeUInt16LE(bitDepth, 34); // BitsPerSample

    // "data" sub-chunk
    header.write("data", 36);
    header.writeUInt32LE(dataSize, 40);

    return Buffer.concat([header, pcmBuffer]);
  }

  app.get("/api/tts", async (req, res) => {
    try {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

      const rawText = (req.query.text as string) || "";
      const voiceParam = ((req.query.voice as string) || "female").toLowerCase();
      const isMale = voiceParam === "male" || voiceParam === "david" || voiceParam === "man";
      const normalizedVoiceKey = isMale ? "male" : "female";

      if (!rawText.trim()) {
        return res.status(400).send("Text parameter is required");
      }

      // Backend text sanitization
      let cleanText = rawText
        .replace(/\/[^/\n]{2,}\//g, " ")
        .replace(/\[\.\.\.\]|\[\s*\]|_{2,}|\.{3,}/g, " blank ")
        .replace(/\[[^\]]*\]|\{[^}]*\}/g, " ")
        .replace(/\(\s*(n|v|adj|adv|prep|conj|pron|art|phr v|n phr|v-ing|p\.p|v2|v3|s|pl|sing|c|u|plural|singular)\s*\)/gi, " ")
        .replace(/[*_~`#>]|\*{2,}/g, " ")
        .replace(/^[A-D]\.\s+/i, "")
        .replace(/^\d+\.\s+/, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!cleanText) {
        cleanText = rawText.slice(0, 100);
      }

      const cacheKey = `${normalizedVoiceKey}:${cleanText.toLowerCase()}`;
      const cached = ttsCache.get(cacheKey);
      if (cached) {
        res.setHeader("Content-Type", cached.contentType);
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.send(cached.buffer);
      }

      const sendAndCache = (buf: Buffer, type: string) => {
        if (ttsCache.size > 2000) {
          const firstKey = ttsCache.keys().next().value;
          if (firstKey) ttsCache.delete(firstKey);
        }
        ttsCache.set(cacheKey, { buffer: buf, contentType: type });
        res.setHeader("Content-Type", type);
        res.setHeader("Cache-Control", "public, max-age=86400");
        return res.send(buf);
      };

      // 1. TIER 1: Native Gemini TTS Speech Synthesis (Genuine Male: Puck / Female: Aoede)
      try {
        const ai = getAI();
        const voiceName = isMale ? "Puck" : "Aoede";

        const ttsPromise = ai.models.generateContent({
          model: "gemini-3.1-flash-tts-preview",
          contents: [{ parts: [{ text: cleanText.slice(0, 350) }] }],
          config: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName },
              },
            },
          },
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("TTS timeout")), 2500)
        );

        const ttsResponse: any = await Promise.race([ttsPromise, timeoutPromise]);
        const base64Audio = ttsResponse?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
        if (base64Audio) {
          const pcmBuffer = Buffer.from(base64Audio, "base64");
          const wavBuffer = pcmToWav(pcmBuffer, 24000, 1, 16);
          return sendAndCache(wavBuffer, "audio/wav");
        }
      } catch (geminiTtsErr: any) {
        // Fallback to high-speed stream
      }

      // 2. TIER 2: Fast Dictionary Audio Stream
      const encoded = encodeURIComponent(cleanText.slice(0, 300));
      const youdaoType = isMale ? "2" : "1"; // type 2 = US English, type 1 = UK English
      const youdaoUrl = `https://dict.youdao.com/dictvoice?type=${youdaoType}&audio=${encoded}`;
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        const youdaoRes = await fetch(youdaoUrl, {
          signal: controller.signal,
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });
        clearTimeout(timeoutId);

        if (youdaoRes.ok) {
          const arrayBuffer = await youdaoRes.arrayBuffer();
          const buf = Buffer.from(arrayBuffer);
          if (buf.length > 500) {
            return sendAndCache(buf, "audio/mpeg");
          }
        }
      } catch (e) {
        // Fallback to Google Translate
      }

      // 3. TIER 3: Google Translate TTS Fallback
      const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en-US&client=tw-ob&q=${encoded}`;
      const googleRes = await fetch(googleUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Referer: "https://translate.google.com/",
        },
      });

      if (!googleRes.ok) {
        return res.status(500).send("TTS audio service unavailable");
      }

      const arrayBuffer = await googleRes.arrayBuffer();
      const buf = Buffer.from(arrayBuffer);
      return sendAndCache(buf, "audio/mpeg");
    } catch (err: any) {
      console.error("TTS proxy error:", err);
      res.status(500).send("TTS proxy error");
    }
  });

  // Vite middleware in development or static serve in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
