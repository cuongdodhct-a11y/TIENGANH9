import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== "GET") {
      return res.status(405).json({
        error: "Method Not Allowed",
      });
    }

    const text = String(req.query.text || "").trim();

    if (!text) {
      return res.status(400).json({
        error: "Missing text parameter",
      });
    }

    // Giới hạn để tránh request bất thường
    const cleanText = text.slice(0, 500);

    const url =
      `https://dict.youdao.com/dictvoice?type=0&audio=${encodeURIComponent(
        cleanText
      )}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(502).json({
        error: "TTS provider unavailable",
        status: response.status,
      });
    }

    const audioBuffer = await response.arrayBuffer();

    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.setHeader("Content-Length", audioBuffer.byteLength.toString());

    return res.status(200).send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error("TTS error:", error);

    return res.status(500).json({
      error: "TTS service failed",
    });
  }
}