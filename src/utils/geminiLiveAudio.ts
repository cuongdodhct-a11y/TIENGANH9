import { GoogleGenAI, Modality } from "@google/genai";

export interface GeminiLiveCallbacks {
  onConnected?: () => void;
  onAudioStart?: () => void;
  onAudioEnd?: () => void;
  onError?: (err: string) => void;
  onDisconnected?: () => void;
  onText?: (text: string) => void;
}

// ---------------------------------------------------------------------
// STATE & AUDIO CONTEXT
// ---------------------------------------------------------------------
let liveSession: any = null;
let audioContext: AudioContext | null = null;
let nextPlayTime = 0;
let activeSources: AudioBufferSourceNode[] = [];
let registeredCallbacks: GeminiLiveCallbacks = {};
let isConnected = false;

/**
 * Convert Base64 string of raw PCM 16-bit little-endian samples to Int16Array
 */
export function base64ToInt16(base64: string): Int16Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Int16Array(bytes.buffer);
}

/**
 * Convert Int16Array (-32768 to 32767) to Float32Array (-1.0 to 1.0)
 */
export function pcm16ToFloat32(pcm16: Int16Array): Float32Array {
  const float32 = new Float32Array(pcm16.length);
  for (let i = 0; i < pcm16.length; i++) {
    const val = pcm16[i];
    float32[i] = val < 0 ? val / 32768 : val / 32767;
  }
  return float32;
}

/**
 * Initialize or get the Web Audio API AudioContext at 24000Hz
 */
function getOrCreateAudioContext(): AudioContext {
  if (!audioContext || audioContext.state === "closed") {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    try {
      audioContext = new AudioCtx({ sampleRate: 24000 });
    } catch {
      // Fallback if browser/device strictly mandates standard device sample rate
      audioContext = new AudioCtx();
    }
  }
  return audioContext;
}

/**
 * Enqueue and schedule PCM Float32 audio chunk to play smoothly without gaps
 */
async function scheduleAudioChunk(float32Data: Float32Array): Promise<void> {
  const ctx = getOrCreateAudioContext();

  if (ctx.state === "suspended") {
    await ctx.resume();
  }

  // Raw Gemini Live PCM audio is 24000 Hz Mono
  const buffer = ctx.createBuffer(1, float32Data.length, 24000);
  buffer.copyToChannel(float32Data, 0);

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);

  const currentTime = ctx.currentTime;
  const startTime = Math.max(nextPlayTime, currentTime);
  source.start(startTime);

  const duration = buffer.duration;
  nextPlayTime = startTime + duration;

  activeSources.push(source);
  registeredCallbacks.onAudioStart?.();

  source.onended = () => {
    const idx = activeSources.indexOf(source);
    if (idx !== -1) {
      activeSources.splice(idx, 1);
    }
    if (activeSources.length === 0 && (!audioContext || audioContext.currentTime >= nextPlayTime - 0.05)) {
      registeredCallbacks.onAudioEnd?.();
    }
  };
}

/**
 * Stop currently playing audio, clear audio queue, reset nextPlayTime
 */
export function stopGeminiLiveAudio(): void {
  for (const src of activeSources) {
    try {
      src.stop();
      src.disconnect();
    } catch {
      // Ignore if already stopped
    }
  }
  activeSources = [];
  if (audioContext) {
    nextPlayTime = audioContext.currentTime;
  } else {
    nextPlayTime = 0;
  }
  registeredCallbacks.onAudioEnd?.();
}

/**
 * Connect to Gemini Live API via ephemeral token from GET /api/live-token
 */
export async function connectGeminiLive(callbacks?: GeminiLiveCallbacks): Promise<boolean> {
  if (callbacks) {
    registeredCallbacks = { ...registeredCallbacks, ...callbacks };
  }

  try {
    // 1. Fetch ephemeral token from backend
    const tokenRes = await fetch("/api/live-token");
    if (!tokenRes.ok) {
      const errData = await tokenRes.json().catch(() => ({}));
      const msg = errData.error || `HTTP ${tokenRes.status} khi lấy live token`;
      registeredCallbacks.onError?.(msg);
      return false;
    }

    const { token } = await tokenRes.json();
    if (!token) {
      registeredCallbacks.onError?.("Không nhận được ephemeral token từ server.");
      return false;
    }

    // 2. Initialize GoogleGenAI client with the ephemeral token
    const ai = new GoogleGenAI({
      apiKey: token,
      httpOptions: {
        apiVersion: "v1alpha",
      },
    });

    // 3. Connect to Gemini Live session
    liveSession = await ai.live.connect({
      model: "gemini-3.1-flash-live-preview",
      config: {
        responseModalities: [Modality.AUDIO],
      },
      callbacks: {
        onopen: () => {
          isConnected = true;
          registeredCallbacks.onConnected?.();
        },
        onmessage: (message: any) => {
          // Handle interruption signal from model
          if (message.serverContent?.interrupted) {
            stopGeminiLiveAudio();
            return;
          }

          // Handle text parts if available
          if (message.text) {
            registeredCallbacks.onText?.(message.text);
          }

          // Process all modelTurn content parts
          const parts = message.serverContent?.modelTurn?.parts;
          if (Array.isArray(parts)) {
            for (const part of parts) {
              if (part.text) {
                registeredCallbacks.onText?.(part.text);
              }

              // Check for PCM 24kHz audio inline data
              const inlineData = part.inlineData;
              if (inlineData?.data && typeof inlineData.data === "string") {
                const mime = inlineData.mimeType || "";
                if (mime.includes("audio/pcm") || mime === "" || mime.startsWith("audio/")) {
                  try {
                    const pcm16 = base64ToInt16(inlineData.data);
                    const float32 = pcm16ToFloat32(pcm16);
                    scheduleAudioChunk(float32);
                  } catch (decodeErr) {
                    console.error("PCM decoding error:", decodeErr);
                  }
                }
              }
            }
          }
        },
        onerror: (errorEvent: any) => {
          const errMessage = errorEvent?.error?.message || errorEvent?.message || "Gemini Live connection failed.";
          registeredCallbacks.onError?.(errMessage);
        },
        onclose: () => {
          isConnected = false;
          liveSession = null;
          registeredCallbacks.onDisconnected?.();
        },
      },
    });

    return true;
  } catch (err: any) {
    const errorText = err?.message || "Gemini Live connection failed.";
    registeredCallbacks.onError?.(errorText);
    isConnected = false;
    liveSession = null;
    return false;
  }
}

/**
 * Send text prompt to the active Gemini Live session
 */
export async function sendTextToGemini(text: string): Promise<boolean> {
  if (!liveSession || !isConnected) {
    registeredCallbacks.onError?.("Chưa kết nối tới Gemini Live.");
    return false;
  }

  try {
    const ctx = getOrCreateAudioContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    liveSession.sendClientContent({
      turns: [
        {
          role: "user",
          parts: [{ text: text.trim() }],
        },
      ],
      turnComplete: true,
    });

    return true;
  } catch (err: any) {
    registeredCallbacks.onError?.(err?.message || "Lỗi khi gửi văn bản tới Gemini Live.");
    return false;
  }
}

/**
 * Disconnect Gemini Live session
 */
export function disconnectGeminiLive(): void {
  stopGeminiLiveAudio();
  if (liveSession) {
    try {
      liveSession.close();
    } catch {
      // Ignore close errors
    }
    liveSession = null;
  }
  isConnected = false;
  registeredCallbacks.onDisconnected?.();
}

/**
 * Check if Gemini Live session is currently active
 */
export function isGeminiLiveConnected(): boolean {
  return isConnected && liveSession !== null;
}
