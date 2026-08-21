import { GoogleGenAI, Modality } from "@google/genai";

 

/**

 * Gemini Live Voice Engine v3

 *

 * Luồng:

 *

 * Microphone

 *    ↓

 * Web Audio API

 *    ↓

 * PCM 16-bit / 16kHz / Mono

 *    ↓

 * Gemini Live API

 *    ↓

 * PCM 16-bit / 24kHz / Mono

 *    ↓

 * Web Audio API

 *    ↓

 * Speaker

 *

 * Browser:

 * - Safari

 * - Chrome

 * - Cốc Cốc

 *

 * Authentication:

 * - Ephemeral token từ /api/live-token

 */

 

export interface GeminiLiveCallbacks {

  onConnected?: () => void;

 

  onDisconnected?: () => void;

 

  onError?: (err: string) => void;

 

  onAudioStart?: () => void;

 

  onAudioEnd?: () => void;

 

  /**

   * Text tổng quát từ Gemini.

   */

  onText?: (text: string) => void;

 

  /**

   * Transcript lời người học.

   */

  onUserTranscript?: (text: string) => void;

 

  /**

   * Transcript lời Gemini.

   */

  onModelTranscript?: (text: string) => void;

 

  /**

   * Khi Gemini bắt đầu trả lời.

   */

  onModelStartSpeaking?: () => void;

 

  /**

   * Khi Gemini hoàn thành một lượt trả lời.

   */

  onModelTurnComplete?: () => void;

 

  /**

   * Khi người dùng bắt đầu nói.

   */

  onUserStartSpeaking?: () => void;

 

  /**

   * Khi người dùng ngừng nói.

   */

  onUserStopSpeaking?: () => void;

}

 

// -----------------------------------------------------------------------------

// CONSTANTS

// -----------------------------------------------------------------------------

 

const MODEL = "gemini-3.1-flash-live-preview";

 

const INPUT_SAMPLE_RATE = 16000;

 

const OUTPUT_SAMPLE_RATE = 24000;

 

const INPUT_CHANNELS = 1;

 

/**

 * Gemini khuyến nghị audio realtime theo các chunk nhỏ.

 * 1600 samples @ 16kHz = 100ms.

 */

const INPUT_CHUNK_SAMPLES = 1600;

 

// -----------------------------------------------------------------------------

// TYPES

// -----------------------------------------------------------------------------

 

interface GeminiLiveSession {

  sendRealtimeInput?: (input: any) => void;

  sendClientContent?: (input: any) => void;

  close?: () => void;

}

 

// -----------------------------------------------------------------------------

// GLOBAL STATE

// -----------------------------------------------------------------------------

 

let liveSession: GeminiLiveSession | null = null;

 

let isConnected = false;

 

let registeredCallbacks: GeminiLiveCallbacks = {};

 

let audioContext: AudioContext | null = null;

 

let microphoneStream: MediaStream | null = null;

 

let microphoneSource: MediaStreamAudioSourceNode | null = null;

 

let microphoneProcessor: ScriptProcessorNode | null = null;

 

let microphoneGain: GainNode | null = null;

 

let inputSampleRate = 48000;

 

/**

 * Bộ đệm PCM float sau khi resample về 16kHz.

 */

let inputPcmBuffer = new Float32Array(0);

 

/**

 * Output audio scheduler.

 */

let nextPlayTime = 0;

 

let activeSources: AudioBufferSourceNode[] = [];

 

/**

 * Trạng thái audio model.

 */

let modelIsSpeaking = false;

 

/**

 * Tránh callback trùng lặp.

 */

let userSpeechStarted = false;

 

// -----------------------------------------------------------------------------

// AUDIO CONTEXT

// -----------------------------------------------------------------------------

 

function getOrCreateAudioContext(): AudioContext {

  if (!audioContext || audioContext.state === "closed") {

    const AudioContextClass =

      window.AudioContext ||

      (window as any).webkitAudioContext;

 

    if (!AudioContextClass) {

      throw new Error(

        "Trình duyệt không hỗ trợ Web Audio API."

      );

    }

 

    audioContext = new AudioContextClass();

 

    inputSampleRate = audioContext.sampleRate;

 

    console.log(

      `[GeminiLive] AudioContext sample rate: ${inputSampleRate}Hz`

    );

  }

 

  return audioContext;

}

 

// -----------------------------------------------------------------------------

// BASE64

// -----------------------------------------------------------------------------

 

function bytesToBase64(bytes: Uint8Array): string {

  let binary = "";

 

  const chunkSize = 0x8000;

 

  for (let i = 0; i < bytes.length; i += chunkSize) {

    const chunk = bytes.subarray(

      i,

      Math.min(i + chunkSize, bytes.length)

    );

 

    binary += String.fromCharCode(...chunk);

  }

 

  return btoa(binary);

}

 

// -----------------------------------------------------------------------------

// PCM CONVERSION

// -----------------------------------------------------------------------------

 

/**

 * Float32 [-1,1] → PCM16 little-endian.

 */

function float32ToPCM16(float32: Float32Array): Uint8Array {

  const output = new Uint8Array(float32.length * 2);

 

  const view = new DataView(output.buffer);

 

  for (let i = 0; i < float32.length; i++) {

    let sample = float32[i];

 

    if (sample > 1) {

      sample = 1;

    }

 

    if (sample < -1) {

      sample = -1;

    }

 

    const value =

      sample < 0

        ? sample * 32768

        : sample * 32767;

 

    view.setInt16(i * 2, value, true);

  }

 

  return output;

}

 

/**

 * PCM16 little-endian → Float32.

 */

export function base64ToInt16(base64: string): Int16Array {

  const binary = atob(base64);

 

  const bytes = new Uint8Array(binary.length);

 

  for (let i = 0; i < binary.length; i++) {

    bytes[i] = binary.charCodeAt(i);

  }

 

  return new Int16Array(bytes.buffer);

}

 

export function pcm16ToFloat32(

  pcm16: Int16Array

): Float32Array {

  const float32 = new Float32Array(pcm16.length);

 

  for (let i = 0; i < pcm16.length; i++) {

    float32[i] =

      pcm16[i] < 0

        ? pcm16[i] / 32768

        : pcm16[i] / 32767;

  }

 

  return float32;

}

 

// -----------------------------------------------------------------------------

// RESAMPLING

// -----------------------------------------------------------------------------

 

/**

 * Resample Float32 audio về 16kHz.

 *

 * Browser thường chạy microphone ở:

 * - 44100Hz

 * - 48000Hz

 *

 * Gemini Live nhận native 16kHz.

 */

function downsampleTo16k(

  input: Float32Array,

  sourceRate: number

): Float32Array {

  if (sourceRate === INPUT_SAMPLE_RATE) {

    return input;

  }

 

  const ratio = sourceRate / INPUT_SAMPLE_RATE;

 

  const outputLength = Math.floor(

    input.length / ratio

  );

 

  const output = new Float32Array(outputLength);

 

  let outputOffset = 0;

 

  let inputOffset = 0;

 

  while (outputOffset < output.length) {

    const nextInputOffset = Math.min(

      Math.round((outputOffset + 1) * ratio),

      input.length

    );

 

    const start = Math.floor(inputOffset);

 

    const end = Math.max(

      start + 1,

      nextInputOffset

    );

 

    let sum = 0;

 

    let count = 0;

 

    for (

      let i = start;

      i < end && i < input.length;

      i++

    ) {

      sum += input[i];

 

      count++;

    }

 

    output[outputOffset] =

      count > 0 ? sum / count : 0;

 

    outputOffset++;

 

    inputOffset = nextInputOffset;

  }

 

  return output;

}

 

// -----------------------------------------------------------------------------

// INPUT BUFFER

// -----------------------------------------------------------------------------

 

function appendInputBuffer(

  data: Float32Array

): void {

  if (data.length === 0) {

    return;

  }

 

  const combined = new Float32Array(

    inputPcmBuffer.length + data.length

  );

 

  combined.set(inputPcmBuffer, 0);

 

  combined.set(data, inputPcmBuffer.length);

 

  inputPcmBuffer = combined;

}

 

/**

 * Lấy từng chunk 100ms rồi gửi Gemini.

 */

function flushInputChunks(): void {

  if (!liveSession || !isConnected) {

    return;

  }

 

  while (

    inputPcmBuffer.length >=

    INPUT_CHUNK_SAMPLES

  ) {

    const chunk =

      inputPcmBuffer.slice(

        0,

        INPUT_CHUNK_SAMPLES

      );

 

    inputPcmBuffer =

      inputPcmBuffer.slice(

        INPUT_CHUNK_SAMPLES

      );

 

    sendPCMChunkToGemini(chunk);

  }

}

 

// -----------------------------------------------------------------------------

// SEND AUDIO TO GEMINI

// -----------------------------------------------------------------------------

 

function sendPCMChunkToGemini(

  chunk: Float32Array

): void {

  if (!liveSession || !isConnected) {

    return;

  }

 

  try {

    const pcm16 = float32ToPCM16(chunk);

 

    const base64 = bytesToBase64(pcm16);

 

    liveSession.sendRealtimeInput?.({

      audio: {

        data: base64,

 

        mimeType:

          "audio/pcm;rate=16000",

      },

    });

  } catch (error: any) {

    console.error(

      "[GeminiLive] send audio error:",

      error

    );

 

    registeredCallbacks.onError?.(

      error?.message ||

        "Không thể gửi âm thanh tới Gemini Live."

    );

  }

}

 

// -----------------------------------------------------------------------------

// MICROPHONE

// -----------------------------------------------------------------------------

 

async function startMicrophoneInternal(): Promise<boolean> {

  if (!isConnected || !liveSession) {

    registeredCallbacks.onError?.(

      "Gemini Live chưa kết nối."

    );

 

    return false;

  }

 

  if (microphoneStream) {

    return true;

  }

 

  if (

    !navigator.mediaDevices ||

    !navigator.mediaDevices.getUserMedia

  ) {

    registeredCallbacks.onError?.(

      "Trình duyệt không hỗ trợ microphone."

    );

 

    return false;

  }

 

  try {

    const ctx =

      getOrCreateAudioContext();

 

    if (ctx.state === "suspended") {

      await ctx.resume();

    }

 

    microphoneStream =

      await navigator.mediaDevices.getUserMedia(

        {

          audio: {

            channelCount: INPUT_CHANNELS,

 

            echoCancellation: true,

 

            noiseSuppression: true,

 

            autoGainControl: true,

          },

 

          video: false,

        }

      );

 

    microphoneSource =

      ctx.createMediaStreamSource(

        microphoneStream

      );

 

    /**

     * ScriptProcessorNode được dùng ở đây để giữ

     * toàn bộ engine trong một file.

     *

     * Điều này giúp Thầy chỉ cần thay một file,

     * đồng thời tương thích tốt với Safari hiện tại.

     */

    microphoneProcessor =

      ctx.createScriptProcessor(

        4096,

        1,

        1

      );

 

    microphoneGain =

      ctx.createGain();

 

    /**

     * Không phát lại microphone ra loa.

     */

    microphoneGain.gain.value = 0;

 

    microphoneSource.connect(

      microphoneProcessor

    );

 

    microphoneProcessor.connect(

      microphoneGain

    );

 

    microphoneGain.connect(

      ctx.destination

    );

 

    inputSampleRate =

      ctx.sampleRate;

 

    inputPcmBuffer =

      new Float32Array(0);

 

    microphoneProcessor.onaudioprocess =

      (event: AudioProcessingEvent) => {

        if (

          !isConnected ||

          !liveSession

        ) {

          return;

        }

 

        const input =

          event.inputBuffer.getChannelData(

            0

          );

 

        if (!input || input.length === 0) {

          return;

        }

 

        const copied =

          new Float32Array(

            input.length

          );

 

        copied.set(input);

 

        const resampled =

          downsampleTo16k(

            copied,

            inputSampleRate

          );

 

        appendInputBuffer(

          resampled

        );

 

        flushInputChunks();

      };

 

    registeredCallbacks

      .onUserStartSpeaking?.();

 

    userSpeechStarted = true;

 

    console.log(

      `[GeminiLive] Microphone started. Browser rate=${inputSampleRate}Hz → Gemini=16000Hz`

    );

 

    return true;

  } catch (error: any) {

    console.error(

      "[GeminiLive] microphone error:",

      error

    );

 

    stopMicrophoneInternal();

 

    const message =

      error?.name ===

      "NotAllowedError"

        ? "Microphone bị từ chối. Hãy cấp quyền Microphone cho localhost trong Safari/Cốc Cốc."

        : error?.message ||

          "Không thể kết nối microphone.";

 

    registeredCallbacks.onError?.(

      message

    );

 

    return false;

  }

}

 

function stopMicrophoneInternal(): void {

  if (microphoneProcessor) {

    microphoneProcessor.onaudioprocess =

      null;

 

    try {

      microphoneProcessor.disconnect();

    } catch {

      // ignore

    }

 

    microphoneProcessor =

      null;

  }

 

  if (microphoneSource) {

    try {

      microphoneSource.disconnect();

    } catch {

      // ignore

    }

 

    microphoneSource = null;

  }

 

  if (microphoneGain) {

    try {

      microphoneGain.disconnect();

    } catch {

      // ignore

    }

 

    microphoneGain = null;

  }

 

  if (microphoneStream) {

    for (const track of microphoneStream.getTracks()) {

      track.stop();

    }

 

    microphoneStream = null;

  }

 

  inputPcmBuffer =

    new Float32Array(0);

 

  if (userSpeechStarted) {

    registeredCallbacks

      .onUserStopSpeaking?.();

 

    userSpeechStarted = false;

  }

 

  console.log(

    "[GeminiLive] Microphone stopped."

  );

}

 

// -----------------------------------------------------------------------------

// OUTPUT AUDIO

// -----------------------------------------------------------------------------

 

async function scheduleAudioChunk(

  float32Data: Float32Array

): Promise<void> {

  if (!float32Data.length) {

    return;

  }

 

  const ctx =

    getOrCreateAudioContext();

 

  if (ctx.state === "suspended") {

    await ctx.resume();

  }

 

  /**

   * Gemini output:

   * PCM16 / 24kHz / Mono

   */

  const buffer =

    ctx.createBuffer(

      1,

      float32Data.length,

      OUTPUT_SAMPLE_RATE

    );

 

  // Create a fresh ArrayBuffer-backed Float32Array.

  // This avoids the TypeScript SharedArrayBuffer/ArrayBufferLike mismatch

  // introduced by newer TypeScript DOM typings.

  const audioData = new Float32Array(

    new ArrayBuffer(float32Data.length * Float32Array.BYTES_PER_ELEMENT)

  );

  audioData.set(float32Data);

 

  buffer.copyToChannel(

    audioData,

    0

  );

 

  const source =

    ctx.createBufferSource();

 

  source.buffer = buffer;

 

  source.connect(

    ctx.destination

  );

 

  const now =

    ctx.currentTime;

 

  /**

   * Không để queue audio lùi về quá khứ.

   */

  const startTime =

    Math.max(

      nextPlayTime,

      now + 0.01

    );

 

  source.start(startTime);

 

  nextPlayTime =

    startTime + buffer.duration;

 

  activeSources.push(source);

 

  if (!modelIsSpeaking) {

    modelIsSpeaking = true;

 

    registeredCallbacks

      .onModelStartSpeaking?.();

 

    registeredCallbacks

      .onAudioStart?.();

  }

 

  source.onended = () => {

    const index =

      activeSources.indexOf(

        source

      );

 

    if (index !== -1) {

      activeSources.splice(

        index,

        1

      );

    }

 

    if (

      activeSources.length === 0

    ) {

      modelIsSpeaking = false;

 

      registeredCallbacks

        .onAudioEnd?.();

    }

  };

}

 

// -----------------------------------------------------------------------------

// STOP OUTPUT AUDIO

// -----------------------------------------------------------------------------

 

export function stopGeminiLiveAudio(): void {

  for (const source of activeSources) {

    try {

      source.stop();

    } catch {

      // already stopped

    }

 

    try {

      source.disconnect();

    } catch {

      // ignore

    }

  }

 

  activeSources = [];

 

  if (audioContext) {

    nextPlayTime =

      audioContext.currentTime;

  } else {

    nextPlayTime = 0;

  }

 

  if (modelIsSpeaking) {

    modelIsSpeaking = false;

 

    registeredCallbacks

      .onAudioEnd?.();

  }

}

 

// -----------------------------------------------------------------------------

// CONNECT GEMINI LIVE

// -----------------------------------------------------------------------------

 

export async function connectGeminiLive(

  callbacks?: GeminiLiveCallbacks

): Promise<boolean> {

  if (callbacks) {

    registeredCallbacks = {

      ...registeredCallbacks,

      ...callbacks,

    };

  }

 

  /**

   * Nếu đã kết nối thì không mở session thứ hai.

   */

  if (liveSession && isConnected) {

    registeredCallbacks

      .onConnected?.();

 

    return true;

  }

 

  try {

    registeredCallbacks

      .onError?.("");

 

    // -------------------------------------------------------------------------

    // 1. GET EPHEMERAL TOKEN

    // -------------------------------------------------------------------------

 

    const tokenResponse =

      await fetch(

        "/api/live-token",

        {

          method: "GET",

          headers: {

            Accept:

              "application/json",

          },

        }

      );

 

    if (!tokenResponse.ok) {

      const errorData =

        await tokenResponse

          .json()

          .catch(() => ({}));

 

      const message =

        errorData?.error ||

        `Không lấy được Live token. HTTP ${tokenResponse.status}`;

 

      registeredCallbacks

        .onError?.(message);

 

      return false;

    }

 

    const tokenData =

      await tokenResponse.json();

 

    const token =

      tokenData?.token ||

      tokenData?.name ||

      tokenData?.token?.name;

 

    if (!token) {

      registeredCallbacks

        .onError?.(

          "Server không trả về ephemeral token."

        );

 

      return false;

    }

 

    // -------------------------------------------------------------------------

    // 2. GOOGLE GENAI CLIENT

    // -------------------------------------------------------------------------

 

    /**

     * Ephemeral token cho Gemini Live hiện dùng

     * Live API v1beta.

     */

    const ai =

      new GoogleGenAI({

        apiKey: token,

 

        httpOptions: {

          apiVersion:

            "v1beta",

        },

      });

 

    // -------------------------------------------------------------------------

    // 3. LIVE CONFIG

    // -------------------------------------------------------------------------

 

    const config: any = {

      responseModalities: [

        Modality.AUDIO,

      ],

 

      /**

       * Cho phép nhận transcript đầu vào.

       */

      inputAudioTranscription: {},

 

      /**

       * Cho phép nhận transcript câu trả lời của AI.

       */

      outputAudioTranscription: {},

 

      /**

       * Hướng dẫn vai trò của AI.

       */

      systemInstruction: {

        parts: [

          {

            text: `

You are a friendly English conversation coach for Vietnamese Grade 9 students.

 

Your job is to help the student practice spoken English in a natural, encouraging and interactive way.

 

Rules:

- Speak naturally and clearly.

- Use short sentences appropriate for a Grade 9 Vietnamese learner.

- Ask one question at a time.

- Encourage the student to answer in English.

- If the student makes a mistake, do not interrupt unnecessarily.

- Give brief corrections after the student finishes speaking.

- Prefer conversation over long explanations.

- Keep the interaction lively and supportive.

- Use simple English unless Vietnamese explanation is genuinely necessary.

- Do not produce long monologues.

            `.trim(),

          },

        ],

      },

 

      realtimeInputConfig: {

        automaticActivityDetection: {

          disabled: false,

        },

      },

    };

 

    // -------------------------------------------------------------------------

    // 4. CONNECT

    // -------------------------------------------------------------------------

 

    liveSession =

      await ai.live.connect({

        model: MODEL,

 

        config,

 

        callbacks: {

          onopen: () => {

            isConnected = true;

 

            console.log(

              "[GeminiLive] Connected."

            );

 

            registeredCallbacks

              .onConnected?.();

          },

 

          onmessage: (

            message: any

          ) => {

            handleLiveMessage(

              message

            );

          },

 

          onerror: (

            errorEvent: any

          ) => {

            console.error(

              "[GeminiLive] Error:",

              errorEvent

            );

 

            const message =

              errorEvent?.error

                ?.message ||

              errorEvent?.message ||

              "Gemini Live connection failed.";

 

            registeredCallbacks

              .onError?.(message);

          },

 

          onclose: (

            closeEvent: any

          ) => {

            console.warn(

              "[GeminiLive] Closed:",

              closeEvent

            );

 

            isConnected = false;

 

            stopMicrophoneInternal();

 

            liveSession = null;

 

            registeredCallbacks

              .onDisconnected?.();

          },

        },

      });

 

    return true;

  } catch (error: any) {

    console.error(

      "[GeminiLive] Connect error:",

      error

    );

 

    isConnected = false;

 

    liveSession = null;

 

    registeredCallbacks

      .onError?.(

        error?.message ||

          "Không thể kết nối Gemini Live."

      );

 

    return false;

  }

}

 

// -----------------------------------------------------------------------------

// HANDLE LIVE MESSAGE

// -----------------------------------------------------------------------------

 

function handleLiveMessage(

  message: any

): void {

  try {

    const serverContent =

      message?.serverContent;

 

    if (!serverContent) {

      /**

       * Một số phiên bản SDK có thể đưa text

       * ở tầng message.

       */

      if (message?.text) {

        registeredCallbacks

          .onText?.(

            message.text

          );

 

        registeredCallbacks

          .onModelTranscript?.(

            message.text

          );

      }

 

      return;

    }

 

    // -------------------------------------------------------------------------

    // INTERRUPTION

    // -------------------------------------------------------------------------

 

    if (

      serverContent.interrupted

    ) {

      console.log(

        "[GeminiLive] Model interrupted."

      );

 

      stopGeminiLiveAudio();

 

      return;

    }

 

    // -------------------------------------------------------------------------

    // USER TRANSCRIPTION

    // -------------------------------------------------------------------------

 

    const inputTranscription =

      serverContent

        .inputTranscription;

 

    if (

      inputTranscription?.text

    ) {

      const text =

        inputTranscription.text;

 

      registeredCallbacks

        .onUserTranscript?.(

          text

        );

 

      registeredCallbacks

        .onText?.(text);

    }

 

    // -------------------------------------------------------------------------

    // MODEL TRANSCRIPTION

    // -------------------------------------------------------------------------

 

    const outputTranscription =

      serverContent

        .outputTranscription;

 

    if (

      outputTranscription?.text

    ) {

      const text =

        outputTranscription.text;

 

      registeredCallbacks

        .onModelTranscript?.(

          text

        );

 

      registeredCallbacks

        .onText?.(text);

    }

 

    // -------------------------------------------------------------------------

    // MODEL TURN

    // -------------------------------------------------------------------------

 

    const parts =

      serverContent

        .modelTurn

        ?.parts;

 

    if (

      Array.isArray(parts)

    ) {

      for (const part of parts) {

        // Text part

        if (part?.text) {

          registeredCallbacks

            .onModelTranscript?.(

              part.text

            );

 

          registeredCallbacks

            .onText?.(

              part.text

            );

        }

 

        // Audio part

        const inlineData =

          part?.inlineData;

 

        if (

          inlineData?.data &&

          typeof inlineData.data ===

            "string"

        ) {

          const mime =

            inlineData.mimeType ||

            "";

 

          /**

           * Live API audio output is PCM.

           */

          if (

            mime.includes(

              "audio/pcm"

            ) ||

            mime.startsWith(

              "audio/"

            ) ||

            mime === ""

          ) {

            const pcm16 =

              base64ToInt16(

                inlineData.data

              );

 

            const float32 =

              pcm16ToFloat32(

                pcm16

              );

 

            void scheduleAudioChunk(

              float32

            );

          }

        }

      }

    }

 

    // -------------------------------------------------------------------------

    // TURN COMPLETE

    // -------------------------------------------------------------------------

 

    if (

      serverContent.turnComplete

    ) {

      registeredCallbacks

        .onModelTurnComplete?.();

    }

  } catch (error) {

    console.error(

      "[GeminiLive] Message handling error:",

      error

    );

  }

}

 

// -----------------------------------------------------------------------------

// START MICROPHONE

// -----------------------------------------------------------------------------

 

export async function startGeminiLiveMicrophone(): Promise<boolean> {

  return startMicrophoneInternal();

}

 

// -----------------------------------------------------------------------------

// STOP MICROPHONE

// -----------------------------------------------------------------------------

 

export function stopGeminiLiveMicrophone(): void {

  stopMicrophoneInternal();

}

 

// -----------------------------------------------------------------------------

// SEND TEXT

// -----------------------------------------------------------------------------

 

/**

 * Text vẫn được giữ lại để test nhanh.

 *

 * Luồng hội thoại chính vẫn là microphone →

 * sendRealtimeInput().

 */

export async function sendTextToGemini(

  text: string

): Promise<boolean> {

  if (

    !liveSession ||

    !isConnected

  ) {

    registeredCallbacks

      .onError?.(

        "Chưa kết nối tới Gemini Live."

      );

 

    return false;

  }

 

  const cleanText =

    text.trim();

 

  if (!cleanText) {

    return false;

  }

 

  try {

    /**

     * SDK Live API hiện hỗ trợ realtime text input.

     */

    liveSession.sendRealtimeInput?.({

      text: cleanText,

    });

 

    return true;

  } catch (error: any) {

    registeredCallbacks

      .onError?.(

        error?.message ||

          "Không thể gửi text tới Gemini Live."

      );

 

    return false;

  }

}

 

// -----------------------------------------------------------------------------

// DISCONNECT

// -----------------------------------------------------------------------------

 

export function disconnectGeminiLive(): void {

  stopMicrophoneInternal();

 

  stopGeminiLiveAudio();

 

  if (liveSession) {

    try {

      liveSession.close?.();

    } catch {

      // ignore

    }

  }

 

  liveSession = null;

 

  isConnected = false;

 

  registeredCallbacks

    .onDisconnected?.();

}

 

// -----------------------------------------------------------------------------

// STATE

// -----------------------------------------------------------------------------

 

export function isGeminiLiveConnected(): boolean {

  return (

    isConnected &&

    liveSession !== null

  );

}

 

export function isGeminiLiveMicrophoneActive(): boolean {

  return microphoneStream !== null;

}

 

export function isGeminiLiveSpeaking(): boolean {

  return modelIsSpeaking;

}

 

// -----------------------------------------------------------------------------

// CALLBACKS

// -----------------------------------------------------------------------------

 

export function updateGeminiLiveCallbacks(

  callbacks: GeminiLiveCallbacks

): void {

  registeredCallbacks = {

    ...registeredCallbacks,

    ...callbacks,

  };

}

 

// -----------------------------------------------------------------------------

// DEBUG

// -----------------------------------------------------------------------------

 

export function getGeminiLiveDebugState() {

  return {

    isConnected,

 

    microphoneActive:

      microphoneStream !== null,

 

    modelSpeaking:

      modelIsSpeaking,

 

    audioContextState:

      audioContext?.state ||

      "none",

 

    browserSampleRate:

      inputSampleRate,

 

    inputTargetSampleRate:

      INPUT_SAMPLE_RATE,

 

    outputSampleRate:

      OUTPUT_SAMPLE_RATE,

 

    activeAudioSources:

      activeSources.length,

  };

}