import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    // Chỉ cho phép GET
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "Method Not Allowed",
      });
    }

    // Lấy nội dung cần đọc
    const text = String(req.query.text || "").trim();

    if (!text) {
      return res.status(400).json({
        error: "Missing text parameter",
      });
    }

    // Giới hạn độ dài để tránh request bất thường
    const cleanText = text.slice(0, 500);

    // Youdao TTS
    const url =
      `https://dict.youdao.com/dictvoice?type=0&audio=${encodeURIComponent(
        cleanText
      )}`;

    console.log("TTS request:", {
      textLength: cleanText.length,
      provider: "Youdao",
    });

    // Gọi Youdao
    const response = await fetch(url);

    // Nếu Youdao trả lỗi HTTP
    if (!response.ok) {
      console.error("Youdao TTS failed:", {
        status: response.status,
        statusText: response.statusText,
      });

      return res.status(502).json({
        error: "TTS provider unavailable",
        providerStatus: response.status,
        providerStatusText: response.statusText,
      });
    }

    // Nhận dữ liệu âm thanh
    const audioBuffer = await response.arrayBuffer();

    console.log("Youdao TTS success:", {
      bytes: audioBuffer.byteLength,
    });

    // Trả audio về trình duyệt
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Content-Length", audioBuffer.byteLength.toString());

    return res.status(200).send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error("TTS error:", error);

    return res.status(500).json({
      error: "TTS service failed",
      details: error instanceof Error ? error.message : String(error),
    });
  }
}