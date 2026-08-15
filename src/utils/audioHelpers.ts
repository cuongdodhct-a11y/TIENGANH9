// ============================================================
// TIENGANH9 - AUDIO ENGINE
// ============================================================
// Architecture:
//
// English text
//      ↓
// /api/tts
//      ↓
// MP3 / ArrayBuffer
//      ↓
// AudioContext.decodeAudioData()
//      ↓
// AudioBufferSourceNode
//      ↓
// Speaker
//
// Browser SpeechSynthesis is ONLY used as a fallback.
//
// Important:
// - Cốc Cốc does NOT use Browser SpeechSynthesis as the primary TTS.
// - Safari does NOT use HTMLAudioElement as the primary playback engine.
// - Both browsers use the same server TTS audio pipeline.
// - Audio chunks are played sequentially.
// - Only stopSpeaking() calls speechSynthesis.cancel().
// ============================================================

let audioContext: AudioContext | null = null;
let activeSource: AudioBufferSourceNode | null = null;

let activeUtterance: SpeechSynthesisUtterance | null = null;

let isAudioActive = false;
let speechFallbackActive = false;

let playbackGeneration = 0;

// ============================================================
// PUBLIC STATE
// ============================================================

export const isSpeakingActive = () => isAudioActive;

// ============================================================
// AUDIO CONTEXT
// ============================================================

const getAudioContext = (): AudioContext | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    if (!audioContext) {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & {
          webkitAudioContext?: typeof AudioContext;
        }).webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      audioContext = new AudioContextClass();
    }

    return audioContext;
  } catch (error) {
    console.warn("AudioContext initialization failed:", error);
    return null;
  }
};

// ============================================================
// RESUME AUDIO CONTEXT
// ============================================================

const resumeAudioContext = async (): Promise<boolean> => {
  const ctx = getAudioContext();

  if (!ctx) {
    return false;
  }

  try {
    if (ctx.state === "suspended") {
      await ctx.resume();
    }

    return ctx.state === "running";
  } catch (error) {
    console.warn("AudioContext resume failed:", error);
    return false;
  }
};

// ============================================================
// STOP CURRENT AUDIO SOURCE
// ============================================================

const stopActiveSource = () => {
  if (!activeSource) {
    return;
  }

  try {
    activeSource.onended = null;
    activeSource.stop();
  } catch {
    // Source may already have stopped.
  }

  try {
    activeSource.disconnect();
  } catch {
    // Ignore.
  }

  activeSource = null;
};

// ============================================================
// STOP ALL SPEECH
// ============================================================

export const stopSpeaking = () => {
  // Invalidate every currently running playback chain.
  playbackGeneration += 1;

  isAudioActive = false;
  speechFallbackActive = false;

  // Stop Web Audio.
  stopActiveSource();

  // Stop browser SpeechSynthesis fallback.
  if (
    typeof window !== "undefined" &&
    "speechSynthesis" in window
  ) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore browser-specific errors.
    }
  }

  activeUtterance = null;
};

// ============================================================
// TEXT CLEANING
// ============================================================

const cleanText = (text: string): string => {
  return text
    .replace(/[\*_~`#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

// ============================================================
// TEXT CHUNKING
// ============================================================
//
// Keep chunks reasonably short.
// This prevents very long MP3 requests and keeps playback stable.
//

const splitTextIntoChunks = (
  text: string,
  maxLength = 180
): string[] => {
  const clean = cleanText(text);

  if (!clean) {
    return [];
  }

  if (clean.length <= maxLength) {
    return [clean];
  }

  const sentences = clean.split(
    /(?<=[.!?])\s+/
  );

  const chunks: string[] = [];

  let current = "";

  for (const sentence of sentences) {
    const trimmedSentence = sentence.trim();

    if (!trimmedSentence) {
      continue;
    }

    const candidate = current
      ? `${current} ${trimmedSentence}`
      : trimmedSentence;

    if (candidate.length <= maxLength) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current);
      current = "";
    }

    if (trimmedSentence.length <= maxLength) {
      current = trimmedSentence;
      continue;
    }

    // Long sentence:
    // split at commas first.
    const commaParts = trimmedSentence.split(/,\s+/);

    for (const part of commaParts) {
      const trimmedPart = part.trim();

      if (!trimmedPart) {
        continue;
      }

      if (trimmedPart.length <= maxLength) {
        const candidatePart = current
          ? `${current} ${trimmedPart}`
          : trimmedPart;

        if (candidatePart.length <= maxLength) {
          current = candidatePart;
        } else {
          if (current) {
            chunks.push(current);
          }

          current = trimmedPart;
        }

        continue;
      }

      // Hard split if still too long.
      if (current) {
        chunks.push(current);
        current = "";
      }

      for (
        let i = 0;
        i < trimmedPart.length;
        i += maxLength
      ) {
        const piece = trimmedPart
          .slice(i, i + maxLength)
          .trim();

        if (piece) {
          chunks.push(piece);
        }
      }
    }
  }

  if (current) {
    chunks.push(current);
  }

  return chunks.filter(Boolean);
};

// ============================================================
// SERVER TTS URL
// ============================================================

const buildTTSUrl = (text: string): string => {
  return `/api/tts?text=${encodeURIComponent(text)}`;
};

// ============================================================
// FETCH SERVER TTS AUDIO
// ============================================================

const fetchTTSAudio = async (
  text: string
): Promise<AudioBuffer | null> => {
  const ctx = getAudioContext();

  if (!ctx) {
    return null;
  }

  try {
    const response = await fetch(
      buildTTSUrl(text),
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "audio/mpeg,audio/*,*/*",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `TTS request failed: ${response.status}`
      );
    }

    const arrayBuffer =
      await response.arrayBuffer();

    if (!arrayBuffer.byteLength) {
      throw new Error("TTS returned empty audio.");
    }

    // Decode MP3 into raw PCM/audio buffer.
    const audioBuffer =
      await ctx.decodeAudioData(arrayBuffer);

    return audioBuffer;
  } catch (error) {
    console.warn(
      "Server TTS audio decoding failed:",
      error
    );

    return null;
  }
};

// ============================================================
// PLAY ONE AUDIO BUFFER
// ============================================================

const playAudioBuffer = (
  buffer: AudioBuffer,
  generation: number
): Promise<boolean> => {
  return new Promise((resolve) => {
    const ctx = getAudioContext();

    if (!ctx) {
      resolve(false);
      return;
    }

    if (
      generation !== playbackGeneration ||
      !isAudioActive
    ) {
      resolve(false);
      return;
    }

    try {
      const source =
        ctx.createBufferSource();

      source.buffer = buffer;

      // Small gain stage.
      const gain = ctx.createGain();

      gain.gain.value = 1;

      source.connect(gain);
      gain.connect(ctx.destination);

      activeSource = source;

      let resolved = false;

      const finish = (success: boolean) => {
        if (resolved) {
          return;
        }

        resolved = true;

        if (activeSource === source) {
          activeSource = null;
        }

        try {
          source.disconnect();
        } catch {
          // Ignore.
        }

        try {
          gain.disconnect();
        } catch {
          // Ignore.
        }

        resolve(success);
      };

      source.onended = () => {
        finish(
          generation === playbackGeneration &&
            isAudioActive
        );
      };

      source.start(0);
    } catch (error) {
      console.warn(
        "AudioBuffer playback failed:",
        error
      );

      resolve(false);
    }
  });
};

// ============================================================
// ENGLISH BROWSER VOICE
// ============================================================

const getEnglishVoice =
  (): SpeechSynthesisVoice | null => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      return null;
    }

    const voices =
      window.speechSynthesis.getVoices();

    if (!voices.length) {
      return null;
    }

    // Prefer US English.
    const usVoice = voices.find(
      (voice) =>
        /^en-US$/i.test(voice.lang)
    );

    if (usVoice) {
      return usVoice;
    }

    // Then UK English.
    const ukVoice = voices.find(
      (voice) =>
        /^en-GB$/i.test(voice.lang)
    );

    if (ukVoice) {
      return ukVoice;
    }

    // Then any English voice.
    const englishVoice = voices.find(
      (voice) =>
        /^en(-|_)/i.test(voice.lang)
    );

    return englishVoice || null;
  };

// ============================================================
// BROWSER SPEECH SYNTHESIS FALLBACK
// ============================================================
//
// This function is NOT the primary engine.
// It is used only when /api/tts cannot be loaded.
//

const speakWithBrowserFallback = (
  chunks: string[],
  rate: number,
  onEnd?: () => void,
  generation?: number
): void => {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    chunks.length === 0
  ) {
    isAudioActive = false;
    speechFallbackActive = false;

    if (onEnd) {
      onEnd();
    }

    return;
  }

  const currentGeneration =
    generation ?? playbackGeneration;

  speechFallbackActive = true;

  let index = 0;
  let finished = false;

  const finish = () => {
    if (finished) {
      return;
    }

    finished = true;

    speechFallbackActive = false;
    isAudioActive = false;
    activeUtterance = null;

    if (onEnd) {
      onEnd();
    }
  };

  const speakNext = () => {
    if (
      finished ||
      currentGeneration !== playbackGeneration ||
      !isAudioActive ||
      !speechFallbackActive
    ) {
      finish();
      return;
    }

    if (index >= chunks.length) {
      finish();
      return;
    }

    const text = chunks[index++].trim();

    if (!text) {
      window.setTimeout(
        speakNext,
        120
      );

      return;
    }

    const utterance =
      new SpeechSynthesisUtterance(text);

    activeUtterance = utterance;

    // IMPORTANT:
    // Force English.
    utterance.lang = "en-US";

    // Natural English speaking speed.
    utterance.rate = Math.min(
      1.05,
      Math.max(0.72, rate)
    );

    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = getEnglishVoice();

    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }

    utterance.onstart = () => {
      if (
        currentGeneration !== playbackGeneration ||
        activeUtterance !== utterance
      ) {
        return;
      }

      try {
        window.speechSynthesis.resume();
      } catch {
        // Ignore.
      }
    };

    utterance.onend = () => {
      if (
        currentGeneration !== playbackGeneration ||
        activeUtterance !== utterance
      ) {
        return;
      }

      activeUtterance = null;

      if (index >= chunks.length) {
        finish();
        return;
      }

      // Delay prevents Chromium/Cốc Cốc
      // SpeechSynthesis queue instability.
      window.setTimeout(
        speakNext,
        160
      );
    };

    utterance.onerror = (event) => {
      if (
        currentGeneration !== playbackGeneration ||
        activeUtterance !== utterance
      ) {
        return;
      }

      console.warn(
        "Browser SpeechSynthesis error:",
        event.error
      );

      activeUtterance = null;

      finish();
    };

    try {
      window.speechSynthesis.resume();

      window.speechSynthesis.speak(
        utterance
      );
    } catch (error) {
      console.warn(
        "SpeechSynthesis fallback failed:",
        error
      );

      activeUtterance = null;

      finish();
    }
  };

  const voices =
    window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    let handled = false;

    const handleVoicesChanged = () => {
      if (handled) {
        return;
      }

      handled = true;

      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      if (
        currentGeneration === playbackGeneration &&
        isAudioActive &&
        speechFallbackActive
      ) {
        speakNext();
      }
    };

    window.speechSynthesis.addEventListener(
      "voiceschanged",
      handleVoicesChanged
    );

    window.setTimeout(() => {
      if (handled) {
        return;
      }

      handled = true;

      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      if (
        currentGeneration === playbackGeneration &&
        isAudioActive &&
        speechFallbackActive
      ) {
        speakNext();
      }
    }, 800);
  } else {
    window.setTimeout(
      speakNext,
      30
    );
  }
};

// ============================================================
// PLAY SERVER TTS SEQUENTIALLY
// ============================================================

const speakWithServerTTS = async (
  chunks: string[],
  rate: number,
  onEnd: (() => void) | undefined,
  generation: number
): Promise<boolean> => {
  const ctx = getAudioContext();

  if (!ctx) {
    return false;
  }

  // Make sure AudioContext is active.
  const contextReady =
    await resumeAudioContext();

  if (!contextReady) {
    return false;
  }

  // Small safety delay.
  // This helps Chromium-based browsers after
  // a user click/tap starts the audio pipeline.
  await new Promise<void>((resolve) => {
    window.setTimeout(
      resolve,
      20
    );
  });

  for (
    let index = 0;
    index < chunks.length;
    index++
  ) {
    if (
      generation !== playbackGeneration ||
      !isAudioActive
    ) {
      return true;
    }

    const text = chunks[index];

    if (!text) {
      continue;
    }

    const buffer =
      await fetchTTSAudio(text);

    if (!buffer) {
      return false;
    }

    if (
      generation !== playbackGeneration ||
      !isAudioActive
    ) {
      return true;
    }

    const success =
      await playAudioBuffer(
        buffer,
        generation
      );

    if (!success) {
      return false;
    }

    // Very small gap between chunks.
    // This avoids clicks / overlapping buffers.
    if (index < chunks.length - 1) {
      await new Promise<void>((resolve) => {
        window.setTimeout(
          resolve,
          25
        );
      });
    }
  }

  if (
    generation === playbackGeneration &&
    isAudioActive
  ) {
    isAudioActive = false;
    speechFallbackActive = false;

    if (onEnd) {
      onEnd();
    }
  }

  return true;
};

// ============================================================
// MAIN ENGLISH TTS
// ============================================================

export const speakEnglish = (
  text: string,
  rate: number = 0.9,
  onEnd?: () => void
) => {
  if (typeof window === "undefined") {
    return;
  }

  const clean = cleanText(text);

  if (!clean) {
    if (onEnd) {
      onEnd();
    }

    return;
  }

  // Stop previous speech.
  stopSpeaking();

  // New playback generation.
  const generation =
    playbackGeneration;

  const chunks =
    splitTextIntoChunks(
      clean,
      180
    );

  if (chunks.length === 0) {
    if (onEnd) {
      onEnd();
    }

    return;
  }

  isAudioActive = true;
  speechFallbackActive = false;

  // Start the server TTS pipeline.
  //
  // IMPORTANT:
  // We deliberately do NOT detect Cốc Cốc here.
  // Cốc Cốc and Safari use the same decoded-audio path.
  //
  // This eliminates:
  // Cốc Cốc → Vietnamese SpeechSynthesis
  // Safari → MP3
  //
  // and replaces it with:
  // Both browsers → /api/tts → AudioContext.
  void speakWithServerTTS(
    chunks,
    rate,
    onEnd,
    generation
  ).then((success) => {
    if (success) {
      return;
    }

    // Server TTS failed.
    //
    // Use browser SpeechSynthesis as
    // a final fallback.
    if (
      generation !== playbackGeneration ||
      !isAudioActive
    ) {
      return;
    }

    console.warn(
      "Server TTS failed. Using browser SpeechSynthesis fallback."
    );

    speechFallbackActive = false;

    speakWithBrowserFallback(
      chunks,
      rate,
      onEnd,
      generation
    );
  });
};

// ============================================================
// SOUND EFFECTS
// ============================================================

export const playSoundEffect = (
  type:
    | "correct"
    | "wrong"
    | "win"
    | "click"
    | "applause"
    | "chime"
) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const ctx =
      getAudioContext();

    if (!ctx) {
      return;
    }

    void resumeAudioContext();

    const now =
      ctx.currentTime;

    if (type === "win") {
      const notes = [
        523.25,
        659.25,
        783.99,
        1046.5,
      ];

      notes.forEach(
        (frequency, index) => {
          const osc =
            ctx.createOscillator();

          const gain =
            ctx.createGain();

          osc.type = "triangle";

          osc.frequency.setValueAtTime(
            frequency,
            now + index * 0.1
          );

          gain.gain.setValueAtTime(
            0.18,
            now + index * 0.1
          );

          gain.gain.exponentialRampToValueAtTime(
            0.001,
            now +
              index * 0.1 +
              0.3
          );

          osc.connect(gain);
          gain.connect(
            ctx.destination
          );

          osc.start(
            now + index * 0.1
          );

          osc.stop(
            now +
              index * 0.1 +
              0.3
          );
        }
      );

      return;
    }

    const osc =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    osc.connect(gain);
    gain.connect(
      ctx.destination
    );

    if (type === "correct") {
      osc.type = "sine";

      osc.frequency.setValueAtTime(
        523.25,
        now
      );

      osc.frequency.exponentialRampToValueAtTime(
        659.25,
        now + 0.15
      );

      osc.frequency.exponentialRampToValueAtTime(
        783.99,
        now + 0.3
      );

      gain.gain.setValueAtTime(
        0.18,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.35
      );

      osc.start(now);
      osc.stop(
        now + 0.35
      );

      return;
    }

    if (type === "wrong") {
      osc.type = "sawtooth";

      osc.frequency.setValueAtTime(
        260,
        now
      );

      osc.frequency.exponentialRampToValueAtTime(
        150,
        now + 0.25
      );

      gain.gain.setValueAtTime(
        0.15,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.3
      );

      osc.start(now);
      osc.stop(
        now + 0.3
      );

      return;
    }

    if (type === "click") {
      osc.type = "triangle";

      osc.frequency.setValueAtTime(
        450,
        now
      );

      gain.gain.setValueAtTime(
        0.08,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.06
      );

      osc.start(now);
      osc.stop(
        now + 0.06
      );

      return;
    }

    if (type === "applause") {
      osc.type = "triangle";

      osc.frequency.setValueAtTime(
        600,
        now
      );

      osc.frequency.exponentialRampToValueAtTime(
        900,
        now + 0.12
      );

      gain.gain.setValueAtTime(
        0.08,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.2
      );

      osc.start(now);
      osc.stop(
        now + 0.2
      );

      return;
    }

    if (type === "chime") {
      osc.type = "sine";

      osc.frequency.setValueAtTime(
        880,
        now
      );

      osc.frequency.exponentialRampToValueAtTime(
        1760,
        now + 0.2
      );

      gain.gain.setValueAtTime(
        0.1,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.3
      );

      osc.start(now);
      osc.stop(
        now + 0.3
      );
    }
  } catch (error) {
    console.warn(
      "Sound effect failed:",
      error
    );
  }
};