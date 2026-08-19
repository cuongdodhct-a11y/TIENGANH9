import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI, Modality } from "@google/genai";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // CORS configuration
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  // Strictly allow only GET method
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is missing on the server.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        apiVersion: "v1alpha",
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const now = Date.now();
    const expireTime = new Date(now + 30 * 60 * 1000).toISOString();
    const newSessionExpireTime = new Date(now + 60 * 1000).toISOString();

    const token = await ai.authTokens.create({
      config: {
        uses: 1,
        expireTime,
        newSessionExpireTime,
        liveConnectConstraints: {
          model: "models/gemini-3.1-flash-live-preview",
          config: {
            responseModalities: [Modality.AUDIO],
            sessionResumption: {
              transparent: true,
            },
          },
        },
      },
    });

    if (!token?.name) {
      return res.status(500).json({
        error: "Failed to generate Live API token.",
      });
    }

    return res.status(200).json({
      token: token.name,
    });
  } catch (error: any) {
    // Log error message safely without logging any tokens or secrets
    console.error("Live Token Error:", error?.message || "Unknown error");

    return res.status(500).json({
      error: error?.message || "Failed to create Live API token.",
    });
  }
}
