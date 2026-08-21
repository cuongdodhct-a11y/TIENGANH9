import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Mic,
  MicOff,
  Volume2,
  Bot,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trophy,
  Sparkles,
  ArrowRight,
  Target,
  CircleAlert,
  BookOpen,
  PlayCircle,
} from "lucide-react";

import {
  SpeakingPrompt,
  AISpeakingEval,
} from "../../types";

import {
  speakEnglish,
  playSoundEffect,
  stopSpeaking,
  getPreferredVoice,
  VoiceProfile,
} from "../../utils/audioHelpers";

import { VoiceSelector } from "../common/VoiceSelector";

interface SpeakingTabProps {
  speakingPrompts: SpeakingPrompt[];
  onSkillComplete: () => void;
}

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onstart: ((event: Event) => void) | null;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionConstructor =
  new () => SpeechRecognitionInstance;

type EvalResult = AISpeakingEval & {
  overallScore?: number;
  pronunciationScore?: number;
  wordingScore?: number;
  fluencyScore?: number;
  targetText?: string;
  heardTranscript?: string;
  overallFeedback?: string;
  strengths?: string[];
  pronunciationCorrections?: Array<{
    word: string;
    phoneme: string;
    ipa: string;
    status: string;
    severity: string;
    confidence: number;
    observedProblem: string;
    correctTarget: string;
    mouthTip: string;
    practiceTip: string;
    practiceSequence: string;
    example: string;
  }>;
  wordFeedback?: Array<{
    targetWord: string;
    heardAs: string;
    status: string;
    pronunciationNote: string;
    ipa: string;
  }>;
  wordingCorrections?: Array<{
    targetWord: string;
    heardAs: string;
    issue: string;
    correction: string;
  }>;
  prosodyFeedback?: {
    wordStress?: string;
    sentenceStress?: string;
    linking?: string;
    intonation?: string;
  };
  practicePlan?: string[];
  modelPracticePhrase?: string;
  improvements?: string;
  encouragement?: string;
};

export const SpeakingTab: React.FC<
  SpeakingTabProps
> = ({
  speakingPrompts,
  onSkillComplete,
}) => {
  const [activePromptIndex, setActivePromptIndex] =
    useState(0);

  const [isRecording, setIsRecording] =
    useState(false);

  const [isPlayingNative, setIsPlayingNative] =
    useState(false);

  const [
    activePlayingVoice,
    setActivePlayingVoice,
  ] = useState<VoiceProfile | null>(null);

  const [userTranscript, setUserTranscript] =
    useState("");

  const [interimTranscript, setInterimTranscript] =
    useState("");

  const [evalResult, setEvalResult] =
    useState<EvalResult | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [audioLevel, setAudioLevel] =
    useState(0);

  const [
    recordedAudio,
    setRecordedAudio,
  ] = useState<Blob | null>(null);

  const recognitionRef =
    useRef<SpeechRecognitionInstance | null>(
      null
    );

  const mediaStreamRef =
    useRef<MediaStream | null>(null);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const analyserRef =
    useRef<AnalyserNode | null>(null);

  const processorRef =
    useRef<ScriptProcessorNode | null>(null);

  const silentGainRef =
    useRef<GainNode | null>(null);

  const audioChunksRef =
    useRef<Float32Array[]>([]);

  const isCapturingAudioRef =
    useRef(false);

  const audioSampleRateRef =
    useRef(16000);

  const audioLevelFrameRef =
    useRef<number | null>(null);

  const shouldKeepListeningRef =
    useRef(false);

  const restartTimerRef =
    useRef<number | null>(null);

  const currentPrompt =
    speakingPrompts[activePromptIndex] ||
    speakingPrompts[0];

  // ============================================================
  // HELPERS
  // ============================================================

  const stopRecognition = () => {
    shouldKeepListeningRef.current = false;

    if (
      restartTimerRef.current !== null
    ) {
      window.clearTimeout(
        restartTimerRef.current
      );
      restartTimerRef.current = null;
    }

    const recognition =
      recognitionRef.current;

    if (recognition) {
      try {
        recognition.stop();
      } catch {
        // Ignore browser shutdown errors.
      }
    }

    recognitionRef.current = null;
  };

  const abortRecognition = () => {
    shouldKeepListeningRef.current = false;

    if (
      restartTimerRef.current !== null
    ) {
      window.clearTimeout(
        restartTimerRef.current
      );
      restartTimerRef.current = null;
    }

    const recognition =
      recognitionRef.current;

    if (recognition) {
      try {
        recognition.abort();
      } catch {
        // Ignore browser shutdown errors.
      }
    }

    recognitionRef.current = null;
  };

  /**
   * Downsample microphone PCM to 16 kHz.
   * Gemini's audio understanding pipeline works well with
   * speech at this rate and it keeps the request compact.
   */
  const downsampleBuffer = (
    buffer: Float32Array,
    inputSampleRate: number,
    outputSampleRate: number
  ): Float32Array => {
    if (
      outputSampleRate >= inputSampleRate
    ) {
      return buffer;
    }

    const ratio =
      inputSampleRate /
      outputSampleRate;

    const newLength =
      Math.round(
        buffer.length / ratio
      );

    const result =
      new Float32Array(newLength);

    let offsetResult = 0;
    let offsetBuffer = 0;

    while (
      offsetResult < result.length
    ) {
      const nextOffsetBuffer =
        Math.round(
          (offsetResult + 1) *
            ratio
        );

      let accum = 0;
      let count = 0;

      for (
        let i = offsetBuffer;
        i < nextOffsetBuffer &&
        i < buffer.length;
        i += 1
      ) {
        accum += buffer[i];
        count += 1;
      }

      result[offsetResult] =
        count > 0
          ? accum / count
          : 0;

      offsetResult += 1;
      offsetBuffer =
        nextOffsetBuffer;
    }

    return result;
  };

  const encodeWav16 = (
    samples: Float32Array,
    sampleRate: number
  ): Blob => {
    const bytesPerSample = 2;
    const dataLength =
      samples.length *
      bytesPerSample;

    const buffer =
      new ArrayBuffer(
        44 + dataLength
      );

    const view =
      new DataView(buffer);

    const writeString = (
      offset: number,
      value: string
    ) => {
      for (
        let i = 0;
        i < value.length;
        i += 1
      ) {
        view.setUint8(
          offset + i,
          value.charCodeAt(i)
        );
      }
    };

    writeString(0, "RIFF");

    view.setUint32(
      4,
      36 + dataLength,
      true
    );

    writeString(8, "WAVE");

    writeString(12, "fmt ");

    view.setUint32(
      16,
      16,
      true
    );

    view.setUint16(
      20,
      1,
      true
    );

    view.setUint16(
      22,
      1,
      true
    );

    view.setUint32(
      24,
      sampleRate,
      true
    );

    view.setUint32(
      28,
      sampleRate *
        bytesPerSample,
      true
    );

    view.setUint16(
      32,
      bytesPerSample,
      true
    );

    view.setUint16(
      34,
      16,
      true
    );

    writeString(36, "data");

    view.setUint32(
      40,
      dataLength,
      true
    );

    let offset = 44;

    for (
      let i = 0;
      i < samples.length;
      i += 1
    ) {
      const sample =
        Math.max(
          -1,
          Math.min(
            1,
            samples[i]
          )
        );

      const int16 =
        sample < 0
          ? sample * 0x8000
          : sample * 0x7fff;

      view.setInt16(
        offset,
        int16,
        true
      );

      offset += 2;
    }

    return new Blob(
      [buffer],
      {
        type: "audio/wav",
      }
    );
  };

  /**
   * Finalize the PCM recording BEFORE closing AudioContext.
   */
  const finalizeAudioRecording =
    async (): Promise<Blob | null> => {
      isCapturingAudioRef.current =
        false;

      const chunks =
        audioChunksRef.current;

      if (
        !chunks.length
      ) {
        return null;
      }

      let totalLength = 0;

      for (const chunk of chunks) {
        totalLength +=
          chunk.length;
      }

      const merged =
        new Float32Array(
          totalLength
        );

      let offset = 0;

      for (const chunk of chunks) {
        merged.set(
          chunk,
          offset
        );
        offset +=
          chunk.length;
      }

      const inputRate =
        audioSampleRateRef.current ||
        48000;

      const downsampled =
        downsampleBuffer(
          merged,
          inputRate,
          16000
        );

      const wav =
        encodeWav16(
          downsampled,
          16000
        );

      audioChunksRef.current = [];

      setRecordedAudio(wav);

      return wav;
    };

  const stopMicrophoneStream =
    () => {
      if (
        audioLevelFrameRef.current !==
        null
      ) {
        window.cancelAnimationFrame(
          audioLevelFrameRef.current
        );

        audioLevelFrameRef.current =
          null;
      }

      isCapturingAudioRef.current =
        false;

      if (
        processorRef.current
      ) {
        try {
          processorRef.current.disconnect();
        } catch {
          // Ignore.
        }

        processorRef.current =
          null;
      }

      if (
        silentGainRef.current
      ) {
        try {
          silentGainRef.current.disconnect();
        } catch {
          // Ignore.
        }

        silentGainRef.current =
          null;
      }

      if (
        mediaStreamRef.current
      ) {
        mediaStreamRef.current
          .getTracks()
          .forEach(
            (
              track: MediaStreamTrack
            ) => {
              try {
                track.stop();
              } catch {
                // Ignore.
              }
            }
          );

        mediaStreamRef.current =
          null;
      }

      analyserRef.current =
        null;

      if (
        audioContextRef.current
      ) {
        try {
          void audioContextRef.current.close();
        } catch {
          // Ignore.
        }

        audioContextRef.current =
          null;
      }

      setAudioLevel(0);
    };

  // ============================================================
  // MICROPHONE
  // ============================================================

  const startMicrophoneStream =
    async (): Promise<boolean> => {
      if (
        typeof navigator ===
          "undefined" ||
        !navigator.mediaDevices?.getUserMedia
      ) {
        setErrorMessage(
          "Trình duyệt không cung cấp Microphone API. Hãy dùng Safari hoặc Cốc Cốc/Chrome trên localhost."
        );

        return false;
      }

      try {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
                channelCount: 1,
              },
              video: false,
            }
          );

        mediaStreamRef.current =
          stream;

        audioChunksRef.current =
          [];

        setRecordedAudio(null);

        const AudioContextConstructor =
          (window as any)
            .AudioContext ||
          (window as any)
            .webkitAudioContext;

        if (
          !AudioContextConstructor
        ) {
          setErrorMessage(
            "Trình duyệt đã mở Micro nhưng không hỗ trợ AudioContext để ghi âm chấm phát âm."
          );

          stopMicrophoneStream();

          return false;
        }

        const audioContext: AudioContext =
          new AudioContextConstructor();

        audioContextRef.current =
          audioContext;

        audioSampleRateRef.current =
          audioContext.sampleRate;

        if (
          audioContext.state ===
          "suspended"
        ) {
          await audioContext.resume();
        }

        const source =
          audioContext.createMediaStreamSource(
            stream
          );

        const analyser =
          audioContext.createAnalyser();

        analyser.fftSize =
          512;

        analyser.smoothingTimeConstant =
          0.75;

        source.connect(
          analyser
        );

        analyserRef.current =
          analyser;

        /*
         * ScriptProcessorNode is used intentionally here because it is
         * supported by Safari, Chrome/Cốc Cốc and does not require
         * shipping a separate AudioWorklet file.
         */
        const processor =
          audioContext.createScriptProcessor(
            4096,
            1,
            1
          );

        processor.onaudioprocess =
          (event) => {
            if (
              !isCapturingAudioRef.current
            ) {
              return;
            }

            const input =
              event.inputBuffer.getChannelData(
                0
              );

            audioChunksRef.current.push(
              new Float32Array(
                input
              )
            );
          };

        const silentGain =
          audioContext.createGain();

        silentGain.gain.value =
          0;

        source.connect(
          processor
        );

        processor.connect(
          silentGain
        );

        silentGain.connect(
          audioContext.destination
        );

        processorRef.current =
          processor;

        silentGainRef.current =
          silentGain;

        const data =
          new Uint8Array(
            analyser.fftSize
          );

        const updateLevel =
          () => {
            if (
              !analyserRef.current
            ) {
              return;
            }

            analyser.getByteTimeDomainData(
              data
            );

            let sum = 0;

            for (
              let i = 0;
              i < data.length;
              i += 1
            ) {
              const normalized =
                (data[i] - 128) /
                128;

              sum +=
                normalized *
                normalized;
            }

            const rms =
              Math.sqrt(
                sum /
                  data.length
              );

            const level =
              Math.min(
                100,
                Math.max(
                  0,
                  rms * 420
                )
              );

            setAudioLevel(
              level
            );

            audioLevelFrameRef.current =
              window.requestAnimationFrame(
                updateLevel
              );
          };

        updateLevel();

        isCapturingAudioRef.current =
          true;

        return true;
      } catch (error: any) {
        console.error(
          "Microphone error:",
          error
        );

        const name =
          error?.name ||
          "";

        if (
          name ===
            "NotAllowedError" ||
          name ===
            "PermissionDeniedError"
        ) {
          setErrorMessage(
            "Microphone chưa được cấp quyền. Hãy cho phép Microphone cho localhost rồi thử lại."
          );
        } else if (
          name ===
            "NotFoundError" ||
          name ===
            "DevicesNotFoundError"
        ) {
          setErrorMessage(
            "Không tìm thấy Microphone trên máy."
          );
        } else if (
          name ===
            "NotReadableError" ||
          name ===
            "TrackStartError"
        ) {
          setErrorMessage(
            "Microphone đang được ứng dụng khác sử dụng hoặc hệ thống không thể mở thiết bị."
          );
        } else {
          setErrorMessage(
            "Không thể mở Microphone. Hãy kiểm tra quyền Microphone của trình duyệt."
          );
        }

        return false;
      }
    };

  // ============================================================
  // TEACHER AUDIO
  // ============================================================

  const handlePlayNativeAudio =
    (
      forcedVoice?: VoiceProfile
    ) => {
      if (
        !currentPrompt?.targetSentence
      ) {
        return;
      }

      playSoundEffect(
        "click"
      );

      const voiceToPlay =
        forcedVoice ||
        getPreferredVoice();

      if (
        isPlayingNative &&
        activePlayingVoice ===
          voiceToPlay
      ) {
        stopSpeaking();

        setIsPlayingNative(
          false
        );

        setActivePlayingVoice(
          null
        );

        return;
      }

      stopSpeaking();

      setIsPlayingNative(
        true
      );

      setActivePlayingVoice(
        voiceToPlay
      );

      speakEnglish(
        currentPrompt.targetSentence,
        0.88,
        () => {
          setIsPlayingNative(
            false
          );

          setActivePlayingVoice(
            null
          );
        },
        voiceToPlay
      );
    };

  // ============================================================
  // SPEECH RECOGNITION
  // ============================================================

  const applyRecognitionResults =
    (results: any) => {
      if (!results) {
        return;
      }

      const finalParts: string[] =
        [];

      const interimParts: string[] =
        [];

      for (
        let i = 0;
        i < results.length;
        i += 1
      ) {
        const result =
          results[i];

        if (!result) {
          continue;
        }

        const transcript =
          result?.[0]
            ?.transcript
            ?.trim() || "";

        if (!transcript) {
          continue;
        }

        if (
          result.isFinal
        ) {
          finalParts.push(
            transcript
          );
        } else {
          interimParts.push(
            transcript
          );
        }
      }

      const finalText =
        finalParts
          .join(" ")
          .replace(
            /\s+/g,
            " "
          )
          .trim();

      const liveInterim =
        interimParts
          .join(" ")
          .replace(
            /\s+/g,
            " "
          )
          .trim();

      if (finalText) {
        setUserTranscript(
          finalText
        );
      }

      setInterimTranscript(
        liveInterim
      );
    };

  const startSpeechRecognition =
    () => {
      if (
        typeof window ===
        "undefined"
      ) {
        return false;
      }

      const SpeechRecognition =
        (window as any)
          .SpeechRecognition ||
        (window as any)
          .webkitSpeechRecognition;

      if (
        !SpeechRecognition
      ) {
        setErrorMessage(
          "Trình duyệt không hỗ trợ Speech Recognition. Micro vẫn được ghi âm thật để AI chấm phát âm; phần transcript có thể không hiển thị."
        );

        return false;
      }

      try {
        const recognition =
          new SpeechRecognition();

        recognition.continuous =
          true;

        recognition.interimResults =
          true;

        recognition.lang =
          "en-US";

        recognition.maxAlternatives =
          1;

        recognition.onstart =
          () => {
            setIsRecording(
              true
            );

            setErrorMessage(
              ""
            );

            playSoundEffect(
              "chime"
            );
          };

        recognition.onresult =
          (event: any) => {
            applyRecognitionResults(
              event?.results
            );
          };

        recognition.onerror =
          (event: any) => {
            const error =
              event?.error ||
              "";

            console.warn(
              "Speech Recognition:",
              error
            );

            if (
              error ===
                "no-speech" ||
              error ===
                "aborted"
            ) {
              return;
            }

            if (
              error ===
              "not-allowed"
            ) {
              setErrorMessage(
                "Nhận diện giọng nói bị trình duyệt từ chối. Bản ghi âm thật vẫn có thể tiếp tục hoạt động."
              );
            } else if (
              error ===
              "network"
            ) {
              setErrorMessage(
                "Transcript của trình duyệt đang gặp lỗi mạng. Bản ghi âm thật vẫn được giữ để AI chấm phát âm."
              );
            }
          };

        recognition.onend =
          () => {
            recognitionRef.current =
              null;

            if (
              shouldKeepListeningRef.current &&
              mediaStreamRef.current
            ) {
              if (
                restartTimerRef.current !==
                null
              ) {
                window.clearTimeout(
                  restartTimerRef.current
                );
              }

              restartTimerRef.current =
                window.setTimeout(
                  () => {
                    restartTimerRef.current =
                      null;

                    if (
                      !shouldKeepListeningRef.current ||
                      !mediaStreamRef.current
                    ) {
                      return;
                    }

                    try {
                      const restart =
                        new SpeechRecognition();

                      restart.continuous =
                        true;

                      restart.interimResults =
                        true;

                      restart.lang =
                        "en-US";

                      restart.maxAlternatives =
                        1;

                      restart.onstart =
                        () => {
                          setIsRecording(
                            true
                          );
                        };

                      restart.onresult =
                        (
                          event: any
                        ) => {
                          applyRecognitionResults(
                            event?.results
                          );
                        };

                      restart.onerror =
                        () => {};

                      restart.onend =
                        () => {
                          recognitionRef.current =
                            null;
                        };

                      recognitionRef.current =
                        restart;

                      restart.start();
                    } catch {
                      // Browser may reject rapid restart.
                    }
                  },
                  150
                );
            }
          };

        recognitionRef.current =
          recognition;

        recognition.start();

        return true;
      } catch (error) {
        console.error(
          "Speech Recognition start failed:",
          error
        );

        recognitionRef.current =
          null;

        return false;
      }
    };

  const initAndStartRecording =
    async () => {
      abortRecognition();
      stopMicrophoneStream();

      setUserTranscript(
        ""
      );

      setInterimTranscript(
        ""
      );

      setEvalResult(
        null
      );

      setRecordedAudio(
        null
      );

      setErrorMessage(
        ""
      );

      const microphoneOpened =
        await startMicrophoneStream();

      if (
        !microphoneOpened
      ) {
        setIsRecording(
          false
        );

        return;
      }

      shouldKeepListeningRef.current =
        true;

      const recognitionStarted =
        startSpeechRecognition();

      if (
        !recognitionStarted
      ) {
        /*
         * The real microphone recorder remains active even when
         * browser SpeechRecognition is unavailable.
         */
        setIsRecording(
          true
        );
      }
    };

  // ============================================================
  // STOP RECORDING
  // ============================================================

  const stopAndSaveRecording =
    async () => {
      shouldKeepListeningRef.current =
        false;

      stopRecognition();

      const audio =
        await finalizeAudioRecording();

      stopMicrophoneStream();

      setIsRecording(
        false
      );

      setInterimTranscript(
        ""
      );

      if (!audio) {
        setErrorMessage(
          "Không thu được dữ liệu âm thanh. Hãy thử bấm Micro và đọc lại câu."
        );

        return null;
      }

      return audio;
    };

  const handleToggleRecording =
    async () => {
      playSoundEffect(
        "click"
      );

      setErrorMessage(
        ""
      );

      if (
        isRecording ||
        mediaStreamRef.current
      ) {
        await stopAndSaveRecording();

        return;
      }

      await initAndStartRecording();
    };

  // ============================================================
  // EVALUATE
  // ============================================================

  const blobToBase64 =
    (
      blob: Blob
    ): Promise<string> =>
      new Promise(
        (
          resolve,
          reject
        ) => {
          const reader =
            new FileReader();

          reader.onloadend =
            () => {
              const result =
                String(
                  reader.result ||
                    ""
                );

              const comma =
                result.indexOf(
                  ","
                );

              resolve(
                comma >= 0
                  ? result.slice(
                      comma + 1
                    )
                  : result
              );
            };

          reader.onerror =
            () => {
              reject(
                new Error(
                  "Không thể đọc bản ghi âm."
                )
              );
            };

          reader.readAsDataURL(
            blob
          );
        }
      );

  const handleEvaluateSpeaking =
    async () => {
      let audio =
        recordedAudio;

      /*
       * If the user presses "AI Chấm Phát Âm" while still recording,
       * finalize the current recording first.
       */
      if (
        isRecording ||
        mediaStreamRef.current
      ) {
        audio =
          await stopAndSaveRecording();
      }

      const textToEvaluate =
        userTranscript.trim();

      if (!audio) {
        setErrorMessage(
          "Chưa có bản ghi âm. Hãy bấm Micro, đọc trọn câu, bấm dừng rồi chấm phát âm."
        );

        return;
      }

      if (
        !textToEvaluate
      ) {
        setErrorMessage(
          "Chưa có transcript. Nếu trình duyệt không nhận diện được chữ, Thầy vẫn có thể chấm bằng bản ghi âm thật; hãy bấm Chấm lại một lần nữa."
        );
      }

      setIsLoading(
        true
      );

      setErrorMessage(
        ""
      );

      playSoundEffect(
        "click"
      );

      try {
        const audioBase64 =
          await blobToBase64(
            audio
          );

        const response =
          await fetch(
            "/api/ai/speaking-eval",
            {
              method: "POST",
              headers: {
                "Content-Type":
                  "application/json",
              },
              body: JSON.stringify(
                {
                  targetText:
                    currentPrompt.targetSentence,

                  transcriptText:
                    textToEvaluate,

                  audioBase64,

                  audioMimeType:
                    "audio/wav",
                }
              ),
            }
          );

        if (!response.ok) {
          let message =
            "Lỗi khi chấm phát âm.";

          try {
            const errorData =
              await response.json();

            if (
              errorData?.error
            ) {
              message =
                errorData.error;
            }
          } catch {
            // Ignore invalid JSON.
          }

          throw new Error(
            message
          );
        }

        const data =
          (await response.json()) as EvalResult;

        setEvalResult(
          data
        );

        playSoundEffect(
          "win"
        );

        onSkillComplete();
      } catch (error: any) {
        console.error(
          "Speaking evaluation error:",
          error
        );

        setErrorMessage(
          error?.message ||
            "Chưa thể kết nối với AI chấm phát âm. Vui lòng thử lại."
        );
      } finally {
        setIsLoading(
          false
        );
      }
    };

  // ============================================================
  // RESET / CHANGE PROMPT
  // ============================================================

  const resetCurrentExercise =
    () => {
      playSoundEffect(
        "click"
      );

      abortRecognition();

      stopMicrophoneStream();

      setIsRecording(
        false
      );

      setUserTranscript(
        ""
      );

      setInterimTranscript(
        ""
      );

      setRecordedAudio(
        null
      );

      setEvalResult(
        null
      );

      setErrorMessage(
        ""
      );
    };

  const changePrompt =
    (index: number) => {
      if (
        index < 0 ||
        index >=
          speakingPrompts.length
      ) {
        return;
      }

      playSoundEffect(
        "click"
      );

      abortRecognition();

      stopMicrophoneStream();

      setIsRecording(
        false
      );

      setActivePromptIndex(
        index
      );

      setUserTranscript(
        ""
      );

      setInterimTranscript(
        ""
      );

      setRecordedAudio(
        null
      );

      setEvalResult(
        null
      );

      setErrorMessage(
        ""
      );
    };

  // ============================================================
  // PLAY PRACTICE PHRASE
  // ============================================================

  const handlePlayPracticePhrase =
    () => {
      const phrase =
        evalResult?.modelPracticePhrase?.trim();

      if (!phrase) {
        return;
      }

      playSoundEffect(
        "click"
      );

      speakEnglish(
        phrase,
        0.78
      );
    };

  // ============================================================
  // CLEANUP
  // ============================================================

  useEffect(() => {
    return () => {
      shouldKeepListeningRef.current =
        false;

      if (
        restartTimerRef.current !==
        null
      ) {
        window.clearTimeout(
          restartTimerRef.current
        );
      }

      const recognition =
        recognitionRef.current;

      if (recognition) {
        try {
          recognition.abort();
        } catch {
          // Ignore.
        }
      }

      recognitionRef.current =
        null;

      stopMicrophoneStream();

      stopSpeaking();
    };
  }, []);

  // ============================================================
  // SAFETY
  // ============================================================

  if (
    !speakingPrompts ||
    speakingPrompts.length ===
      0 ||
    !currentPrompt
  ) {
    return (
      <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center">
        <AlertCircle className="w-10 h-10 mx-auto mb-3 text-amber-500" />

        <p className="font-bold text-slate-700">
          Chưa có dữ liệu luyện nói.
        </p>
      </div>
    );
  }

  const corrections =
    evalResult
      ?.pronunciationCorrections ||
    [];

  const wordFeedback =
    evalResult?.wordFeedback ||
    [];

  const wordingCorrections =
    evalResult?.wordingCorrections ||
    [];

  const prosody =
    evalResult?.prosodyFeedback;

  const scoreColor =
    (
      score: number
    ) => {
      if (
        score >= 85
      ) {
        return "text-emerald-500";
      }

      if (
        score >= 70
      ) {
        return "text-blue-500";
      }

      if (
        score >= 50
      ) {
        return "text-amber-500";
      }

      return "text-rose-500";
    };

  const statusLabel =
    (
      status: string
    ) => {
      if (
        status ===
        "correct"
      ) {
        return "Đúng";
      }

      if (
        status ===
        "missed"
      ) {
        return "Thiếu";
      }

      if (
        status ===
        "uncertain"
      ) {
        return "Chưa chắc";
      }

      return "Cần sửa";
    };

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center space-x-1.5 mb-1">
            <Bot className="w-4 h-4 animate-pulse" />
            <span>
              AI Chấm Phát Âm SGK Tiếng Anh 9
            </span>
          </span>

          <h3 className="text-xl font-black text-white">
            Mẫu Câu Luyện Nói{" "}
            {activePromptIndex + 1}/
            {speakingPrompts.length}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 max-w-full sm:max-w-xl justify-start sm:justify-end">
          <button
            onClick={() =>
              changePrompt(
                activePromptIndex -
                  1
              )
            }
            disabled={
              activePromptIndex ===
              0
            }
            className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            ◀ Câu trước
          </button>

          <div className="flex flex-wrap items-center gap-1 max-h-24 overflow-y-auto p-1 bg-slate-950/50 rounded-2xl border border-slate-800">
            {speakingPrompts.map(
              (
                _,
                index
              ) => (
                <button
                  key={index}
                  onClick={() =>
                    changePrompt(
                      index
                    )
                  }
                  className={`w-7 h-7 rounded-lg font-black text-xs transition-all flex items-center justify-center ${
                    activePromptIndex ===
                    index
                      ? "bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-400"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>

          <button
            onClick={() =>
              changePrompt(
                activePromptIndex +
                  1
              )
            }
            disabled={
              activePromptIndex ===
              speakingPrompts.length -
                1
            }
            className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Câu tiếp ▶
          </button>
        </div>
      </div>

      <VoiceSelector showTestButton />

      {/* TARGET */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border border-blue-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-black uppercase text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-xl self-start">
              Mẫu câu cần luyện phát âm
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  handlePlayNativeAudio(
                    "female"
                  )
                }
                className={`flex items-center space-x-2 px-4 py-2 text-xs font-black rounded-2xl shadow-sm transition-all ${
                  isPlayingNative &&
                  activePlayingVoice ===
                    "female"
                    ? "bg-rose-600 text-white animate-pulse ring-4 ring-rose-300 scale-105"
                    : "bg-white hover:bg-rose-50 text-rose-700 border-2 border-rose-300"
                }`}
              >
                <span className="text-base">
                  👩‍🏫
                </span>

                <span>
                  {isPlayingNative &&
                  activePlayingVoice ===
                    "female"
                    ? "Cô Emily đang đọc..."
                    : "Cô Emily Đọc"}
                </span>

                <Volume2 className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  handlePlayNativeAudio(
                    "male"
                  )
                }
                className={`flex items-center space-x-2 px-4 py-2 text-xs font-black rounded-2xl shadow-sm transition-all ${
                  isPlayingNative &&
                  activePlayingVoice ===
                    "male"
                    ? "bg-blue-600 text-white animate-pulse ring-4 ring-blue-300 scale-105"
                    : "bg-white hover:bg-blue-50 text-blue-700 border-2 border-blue-300"
                }`}
              >
                <span className="text-base">
                  👨‍🏫
                </span>

                <span>
                  {isPlayingNative &&
                  activePlayingVoice ===
                    "male"
                    ? "Thầy David đang đọc..."
                    : "Thầy David Đọc"}
                </span>

                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
            "{currentPrompt.targetSentence}"
          </h2>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm">
            <span className="font-mono text-indigo-700 bg-white px-3 py-1.5 rounded-xl border border-blue-200 font-bold">
              {currentPrompt.ipa}
            </span>

            <span className="text-slate-600 italic font-semibold">
              Dịch: "
              {
                currentPrompt.vietnameseMeaning
              }
              "
            </span>
          </div>

          <div className="pt-2 text-xs sm:text-sm text-indigo-900 bg-white/95 p-4 rounded-2xl border border-indigo-100">
            <strong>
              🎯 Trọng tâm phát âm:
            </strong>{" "}
            {
              currentPrompt.keyPhonicsFocus
            }
          </div>
        </div>

        {/* MICROPHONE */}
        <div className="flex flex-col items-center justify-center py-8 px-4 space-y-5 bg-slate-50 rounded-3xl border border-slate-200">
          <div className="relative">
            {isRecording && (
              <div
                className="absolute -inset-4 bg-rose-500/30 rounded-full animate-ping pointer-events-none"
                style={{
                  transform: `scale(${
                    1 +
                    audioLevel /
                      100
                  })`,
                }}
              />
            )}

            <button
              onClick={
                handleToggleRecording
              }
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                isRecording
                  ? "bg-rose-600 hover:bg-rose-700 text-white scale-110 ring-4 ring-rose-300"
                  : "bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 ring-4 ring-blue-200"
              }`}
              title={
                isRecording
                  ? "Bấm để dừng thu âm"
                  : "Bấm vào Micro để luyện nói"
              }
            >
              {isRecording ? (
                <MicOff className="w-10 h-10 animate-pulse" />
              ) : (
                <Mic className="w-10 h-10" />
              )}
            </button>
          </div>

          {isRecording && (
            <div className="flex items-center space-x-1 h-8">
              {[
                40,
                70,
                90,
                60,
                100,
                50,
                80,
                60,
                95,
                45,
              ].map(
                (
                  height,
                  index
                ) => (
                  <div
                    key={index}
                    className="w-1.5 bg-rose-500 rounded-full animate-pulse transition-all"
                    style={{
                      height: `${Math.max(
                        8,
                        (height *
                          audioLevel) /
                          100
                      )}px`,
                      animationDelay: `${index * 0.08}s`,
                    }}
                  />
                )
              )}
            </div>
          )}

          <div className="text-center space-y-1">
            <p className="text-base font-black text-slate-800">
              {isRecording
                ? "🔴 Đang ghi âm thật... Hãy đọc câu trên!"
                : recordedAudio
                ? "✅ Đã lưu bản ghi âm — sẵn sàng chấm"
                : "Nhấn Micro để bắt đầu luyện nói"}
            </p>

            <p className="text-xs text-slate-500">
              {isRecording
                ? audioLevel > 8
                  ? "🎙 Micro đang nhận âm thanh thật"
                  : "🎙 Micro đã mở — hãy bắt đầu nói"
                : "AI sẽ nghe bản ghi âm thật để sửa phát âm, không chỉ nhìn transcript"}
            </p>
          </div>

          {/* TRANSCRIPT */}
          <div className="w-full max-w-xl p-4 sm:p-5 rounded-2xl bg-white border border-slate-300 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isRecording
                  ? "Đang nhận diện trực tiếp:"
                  : "Câu bạn vừa phát âm:"}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    playSoundEffect(
                      "click"
                    );

                    setUserTranscript(
                      currentPrompt.targetSentence
                    );

                    setInterimTranscript(
                      ""
                    );
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 underline bg-blue-50 px-2.5 py-1 rounded-lg"
                >
                  + Điền câu mẫu chuẩn
                </button>

                {(userTranscript ||
                  interimTranscript ||
                  recordedAudio) && (
                  <button
                    onClick={() => {
                      resetCurrentExercise();
                    }}
                    className="text-xs font-bold text-slate-500 hover:text-rose-600"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-[70px] p-4 rounded-xl bg-slate-50 border border-slate-200">
              {userTranscript ? (
                <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed">
                  {userTranscript}
                </p>
              ) : (
                <p className="text-sm text-slate-400 italic">
                  Chưa có câu trả lời...
                </p>
              )}

              {interimTranscript && (
                <p className="mt-2 text-base sm:text-lg text-slate-400 italic leading-relaxed">
                  {interimTranscript}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={
              handleEvaluateSpeaking
            }
            disabled={
              isLoading ||
              !recordedAudio
            }
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                AI đang nghe và chấm...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                AI Chấm & Sửa Phát Âm
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          {errorMessage && (
            <div className="w-full max-w-xl flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-semibold">
                {errorMessage}
              </p>
            </div>
          )}
        </div>

        {/* RESULTS */}
        {evalResult && (
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50 p-6 sm:p-8 space-y-7">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                <Trophy className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Kết quả chấm & sửa phát âm
                </h3>

                <p className="text-sm text-slate-500">
                  AI đã phân tích bản ghi âm thật của học sinh.
                </p>
              </div>
            </div>

            {/* SCORES */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                [
                  "Tổng thể",
                  evalResult.overallScore ??
                    0,
                ],
                [
                  "Phát âm",
                  evalResult.pronunciationScore ??
                    evalResult.accuracyScore ??
                    0,
                ],
                [
                  "Đúng câu",
                  evalResult.wordingScore ??
                    0,
                ],
                [
                  "Lưu loát",
                  evalResult.fluencyScore ??
                    0,
                ],
              ].map(
                (
                  item
                ) => (
                  <div
                    key={item[0] as string}
                    className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center"
                  >
                    <p className="text-[11px] font-black uppercase text-slate-500 mb-1">
                      {item[0] as string}
                    </p>

                    <p
                      className={`text-3xl font-black ${scoreColor(
                        Number(
                          item[1]
                        )
                      )}`}
                    >
                      {Number(
                        item[1]
                      )}
                      %
                    </p>
                  </div>
                )
              )}
            </div>

            {/* OVERALL FEEDBACK */}
            {evalResult.overallFeedback && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />

                  <h4 className="font-black text-slate-800">
                    Nhận xét tổng quát
                  </h4>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  {
                    evalResult.overallFeedback
                  }
                </p>
              </div>
            )}

            {/* STRENGTHS */}
            {(
              evalResult.strengths ||
              []
            ).length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-emerald-100">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5 text-emerald-500" />

                  <h4 className="font-black text-slate-800">
                    Em đã làm tốt
                  </h4>
                </div>

                <ul className="space-y-2">
                  {(
                    evalResult.strengths ||
                    []
                  ).map(
                    (
                      strength,
                      index
                    ) => (
                      <li
                        key={index}
                        className="flex gap-2 text-slate-700"
                      >
                        <span className="text-emerald-500 font-black">
                          ✓
                        </span>

                        <span>
                          {strength}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}

            {/* PRONUNCIATION CORRECTIONS */}
            <div className="bg-white rounded-2xl p-5 border border-rose-100">
              <div className="flex items-center gap-2 mb-4">
                <CircleAlert className="w-5 h-5 text-rose-500" />

                <div>
                  <h4 className="font-black text-slate-800">
                    Sửa lỗi phát âm
                  </h4>

                  <p className="text-xs text-slate-500">
                    Chỉ hiển thị những lỗi có bằng chứng âm thanh đủ rõ.
                  </p>
                </div>
              </div>

              {corrections.length ===
              0 ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800">
                  <strong>
                    🎉 Không phát hiện lỗi phát âm rõ ràng.
                  </strong>{" "}
                  Hãy tiếp tục luyện trọng âm, nối âm và ngữ điệu để tự nhiên hơn.
                </div>
              ) : (
                <div className="space-y-4">
                  {corrections.map(
                    (
                      correction,
                      index
                    ) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100"
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-black text-slate-900 text-lg">
                            {correction.word}
                          </span>

                          <span className="font-mono text-indigo-700 bg-white px-2 py-1 rounded-lg border border-indigo-100">
                            {correction.ipa}
                          </span>

                          <span className="font-mono text-rose-700 bg-white px-2 py-1 rounded-lg border border-rose-100">
                            {correction.phoneme}
                          </span>

                          <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-amber-100 text-amber-800">
                            {correction.severity}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm">
                          <p>
                            <strong>
                              🔎 Đang mắc:
                            </strong>{" "}
                            {
                              correction.observedProblem
                            }
                          </p>

                          <p>
                            <strong>
                              🎯 Âm chuẩn:
                            </strong>{" "}
                            {
                              correction.correctTarget
                            }
                          </p>

                          <p>
                            <strong>
                              👄 Cách đặt miệng:
                            </strong>{" "}
                            {
                              correction.mouthTip
                            }
                          </p>

                          <p>
                            <strong>
                              🏋️ Cách luyện:
                            </strong>{" "}
                            {
                              correction.practiceTip
                            }
                          </p>

                          <p>
                            <strong>
                              🔁 Chuỗi luyện:
                            </strong>{" "}
                            <span className="font-mono">
                              {
                                correction.practiceSequence
                              }
                            </span>
                          </p>

                          <p>
                            <strong>
                              Ví dụ:
                            </strong>{" "}
                            {
                              correction.example
                            }
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* WORD-BY-WORD */}
            {wordFeedback.length >
              0 && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-blue-500" />

                  <h4 className="font-black text-slate-800">
                    Phân tích từng từ
                  </h4>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-2 pr-3">
                          Từ chuẩn
                        </th>
                        <th className="text-left py-2 pr-3">
                          AI nghe
                        </th>
                        <th className="text-left py-2 pr-3">
                          IPA
                        </th>
                        <th className="text-left py-2">
                          Trạng thái
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {wordFeedback.map(
                        (
                          word,
                          index
                        ) => (
                          <tr
                            key={index}
                            className="border-b border-slate-100 last:border-0"
                          >
                            <td className="py-3 pr-3 font-bold">
                              {
                                word.targetWord
                              }
                            </td>

                            <td className="py-3 pr-3 text-slate-600">
                              {
                                word.heardAs
                              }
                            </td>

                            <td className="py-3 pr-3 font-mono text-indigo-600">
                              {word.ipa}
                            </td>

                            <td className="py-3">
                              <span
                                className={`inline-flex px-2 py-1 rounded-lg text-xs font-bold ${
                                  word.status ===
                                  "correct"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : word.status ===
                                      "missed"
                                    ? "bg-rose-100 text-rose-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {statusLabel(
                                  word.status
                                )}
                              </span>

                              <p className="mt-1 text-xs text-slate-500">
                                {
                                  word.pronunciationNote
                                }
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* WORDING */}
            {wordingCorrections.length >
              0 && (
              <div className="bg-white rounded-2xl p-5 border border-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-amber-500" />

                  <h4 className="font-black text-slate-800">
                    Lỗi từ/câu cần sửa
                  </h4>
                </div>

                <div className="space-y-3">
                  {wordingCorrections.map(
                    (
                      item,
                      index
                    ) => (
                      <div
                        key={index}
                        className="p-3 rounded-xl bg-amber-50 border border-amber-100"
                      >
                        <p className="font-bold">
                          {
                            item.targetWord
                          }{" "}
                          →{" "}
                          {
                            item.correction
                          }
                        </p>

                        <p className="text-sm text-slate-600 mt-1">
                          AI nhận diện:{" "}
                          {
                            item.heardAs
                          }
                        </p>

                        <p className="text-sm text-slate-700 mt-1">
                          {item.issue}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* PROSODY */}
            {prosody && (
              <div className="bg-white rounded-2xl p-5 border border-cyan-100">
                <div className="flex items-center gap-2 mb-4">
                  <Volume2 className="w-5 h-5 text-cyan-500" />

                  <h4 className="font-black text-slate-800">
                    Trọng âm – nối âm – ngữ điệu
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    [
                      "Trọng âm từ",
                      prosody.wordStress,
                    ],
                    [
                      "Trọng âm câu",
                      prosody.sentenceStress,
                    ],
                    [
                      "Nối âm",
                      prosody.linking,
                    ],
                    [
                      "Ngữ điệu",
                      prosody.intonation,
                    ],
                  ].map(
                    (
                      item
                    ) => (
                      <div
                        key={item[0] as string}
                        className="p-4 rounded-xl bg-cyan-50 border border-cyan-100"
                      >
                        <p className="font-bold text-cyan-900 mb-1">
                          {item[0] as string}
                        </p>

                        <p className="text-sm text-slate-700">
                          {
                            item[1] as string
                          }
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* PRACTICE PLAN */}
            <div className="bg-white rounded-2xl p-5 border border-indigo-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-indigo-500" />

                  <h4 className="font-black text-slate-800">
                    Bài tập sửa phát âm ngay
                  </h4>
                </div>

                {evalResult.modelPracticePhrase && (
                  <button
                    onClick={
                      handlePlayPracticePhrase
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700"
                  >
                    <Volume2 className="w-4 h-4" />
                    Nghe mẫu luyện âm
                  </button>
                )}
              </div>

              {evalResult.modelPracticePhrase && (
                <div className="mb-4 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                  <p className="text-xs font-black uppercase text-indigo-500 mb-1">
                    Cụm từ cần đọc lại
                  </p>

                  <p className="text-lg font-black text-indigo-900">
                    {evalResult.modelPracticePhrase}
                  </p>
                </div>
              )}

              {(
                evalResult.practicePlan ||
                []
              ).length > 0 && (
                <ol className="space-y-2 list-decimal list-inside">
                  {(
                    evalResult.practicePlan ||
                    []
                  ).map(
                    (
                      step,
                      index
                    ) => (
                      <li
                        key={index}
                        className="text-slate-700"
                      >
                        {step}
                      </li>
                    )
                  )}
                </ol>
              )}
            </div>

            {/* IMPROVEMENTS */}
            {evalResult.improvements && (
              <div className="bg-white rounded-2xl p-5 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-500" />

                  <h4 className="font-black text-slate-800">
                    Ưu tiên sửa ở lần đọc tiếp theo
                  </h4>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  {
                    evalResult.improvements
                  }
                </p>
              </div>
            )}

            {evalResult.encouragement && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-100 text-emerald-900 font-semibold">
                🌟{" "}
                {
                  evalResult.encouragement
                }
              </div>
            )}

            <button
              onClick={
                resetCurrentExercise
              }
              className="mx-auto flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Luyện lại câu này
            </button>
          </div>
        )}
      </div>
    </div>
  );
};