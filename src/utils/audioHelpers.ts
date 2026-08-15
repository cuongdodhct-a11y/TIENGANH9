// Speech Synthesis & Web Audio Helpers
// Audio engine for TIENGANH9
//
// TTS strategy:
// - Single English word  -> Vercel /api/tts -> Youdao
// - Sentence / paragraph -> Browser SpeechSynthesis
// - If server TTS fails for a single word -> Browser SpeechSynthesis fallback

let activeAudioElement: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;

let isAudioActive = false;
let speechFallbackActive = false;

export const isSpeakingActive = () => isAudioActive;

/**
 * Stop every currently playing speech/audio.
 */
export const stopSpeaking = () => {
  isAudioActive = false;
  speechFallbackActive = false;

  if (typeof window === "undefined") return;

  // Stop browser SpeechSynthesis
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore browser-specific errors
    }
  }

  activeUtterance = null;

  // Stop server audio
  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement.removeAttribute("src");
      activeAudioElement.load();
    } catch {
      // Ignore
    }

    activeAudioElement = null;
  }
};

/**
 * Clean text before speech.
 */
const cleanSpeechText = (text: string): string => {
  return text
    .replace(/[*_~`#]/g, "")
    .replace(/\[(.*?)\]\(.*?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
};

/**
 * Determine whether the text is a single English word.
 *
 * Examples:
 *   beautiful      -> true
 *   environment    -> true
 *   student's      -> true
 *   well-known     -> true
 *
 *   Hello world.   -> false
 *   This is good.  -> false
 */
const isSingleEnglishWord = (text: string): boolean => {
  const cleanText = cleanSpeechText(text);

  return /^[A-Za-z]+(?:[-'][A-Za-z]+)*$/.test(cleanText);
};

/**
 * Split long sentences into natural speech chunks.
 *
 * We avoid sending sentences to Youdao.
 * These chunks are only used by Browser SpeechSynthesis.
 */
const splitTextIntoChunks = (
  text: string,
  maxLength = 220
): string[] => {
  const cleanText = cleanSpeechText(text);

  if (!cleanText) return [];

  if (cleanText.length <= maxLength) {
    return [cleanText];
  }

  const sentences = cleanText.split(/(?<=[.!?])\s+/);

  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const candidate = current
      ? `${current} ${sentence}`
      : sentence;

    if (candidate.length <= maxLength) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current.trim());
      current = "";
    }

    if (sentence.length <= maxLength) {
      current = sentence;
      continue;
    }

    // Sentence is too long.
    // Split at commas / semicolons / colons.
    const parts = sentence.split(/(?<=[,;:])\s+/);

    for (const part of parts) {
      const cleanPart = part.trim();

      if (!cleanPart) continue;

      if (
        current &&
        `${current} ${cleanPart}`.length <= maxLength
      ) {
        current = `${current} ${cleanPart}`;
      } else if (cleanPart.length <= maxLength) {
        if (current) {
          chunks.push(current.trim());
        }

        current = cleanPart;
      } else {
        // Last-resort split for very long text.
        if (current) {
          chunks.push(current.trim());
          current = "";
        }

        for (let i = 0; i < cleanPart.length; i += maxLength) {
          chunks.push(
            cleanPart.slice(i, i + maxLength).trim()
          );
        }
      }
    }
  }

  if (current) {
    chunks.push(current.trim());
  }

  return chunks.filter(Boolean);
};

/**
 * Find the best English voice available in the browser.
 */
const getEnglishVoice = (): SpeechSynthesisVoice | null => {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window)
  ) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();

  if (!voices.length) {
    return null;
  }

  // Prefer US English.
  const usVoice = voices.find((voice) =>
    /^en-US$/i.test(voice.lang)
  );

  if (usVoice) return usVoice;

  // Then UK English.
  const gbVoice = voices.find((voice) =>
    /^en-GB$/i.test(voice.lang)
  );

  if (gbVoice) return gbVoice;

  // Then any English voice.
  const englishVoice = voices.find((voice) =>
    /^en-/i.test(voice.lang)
  );

  return englishVoice || null;
};

/**
 * Browser SpeechSynthesis engine.
 */
const speakWithBrowser = (
  chunks: string[],
  rate: number,
  onEnd?: () => void
) => {
  if (
    typeof window === "undefined" ||
    !("speechSynthesis" in window) ||
    chunks.length === 0
  ) {
    isAudioActive = false;

    if (onEnd) {
      onEnd();
    }

    return;
  }

  speechFallbackActive = true;

  let index = 0;

  const finish = () => {
    speechFallbackActive = false;
    isAudioActive = false;
    activeUtterance = null;

    if (onEnd) {
      onEnd();
    }
  };

  const speakNext = () => {
    if (
      !isAudioActive ||
      !speechFallbackActive ||
      index >= chunks.length
    ) {
      finish();
      return;
    }

    const text = chunks[index++];

    const utterance =
      new SpeechSynthesisUtterance(text);

    activeUtterance = utterance;

    // English pronunciation
    utterance.lang = "en-US";

    // Keep the rate within a natural range.
    utterance.rate = Math.min(
      1.15,
      Math.max(0.65, rate)
    );

    // Natural neutral pitch.
    utterance.pitch = 1;

    // Full volume.
    utterance.volume = 1;

    const voice = getEnglishVoice();

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onend = () => {
      if (activeUtterance !== utterance) {
        return;
      }

      activeUtterance = null;

      if (
        isAudioActive &&
        speechFallbackActive
      ) {
        // Small pause between chunks.
        window.setTimeout(speakNext, 80);
      }
    };

    utterance.onerror = () => {
      if (activeUtterance !== utterance) {
        return;
      }

      activeUtterance = null;

      finish();
    };

    try {
      window.speechSynthesis.speak(
        utterance
      );
    } catch {
      finish();
    }
  };

  /**
   * Some browsers load voices asynchronously.
   */
  const voices =
    window.speechSynthesis.getVoices();

  if (voices.length === 0) {
    const handleVoicesChanged = () => {
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      if (
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
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        handleVoicesChanged
      );

      if (
        isAudioActive &&
        speechFallbackActive &&
        !activeUtterance
      ) {
        speakNext();
      }
    }, 700);
  } else {
    speakNext();
  }
};

/**
 * Play audio returned by /api/tts.
 */
const playServerAudio = (
  url: string,
  onSuccessEnd: () => void,
  onFailure: () => void
) => {
  try {
    const audio = new Audio();

    activeAudioElement = audio;

    audio.preload = "auto";

    let finished = false;

    const fail = () => {
      if (finished) {
        return;
      }

      finished = true;

      if (activeAudioElement === audio) {
        activeAudioElement = null;
      }

      try {
        audio.pause();
        audio.removeAttribute("src");
        audio.load();
      } catch {
        // Ignore
      }

      onFailure();
    };

    audio.onended = () => {
      if (finished) {
        return;
      }

      finished = true;

      if (activeAudioElement === audio) {
        activeAudioElement = null;
      }

      onSuccessEnd();
    };

    audio.onerror = fail;

    audio.src = url;

    const playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.catch(fail);
    }
  } catch {
    onFailure();
  }
};

/**
 * Main English speech function.
 *
 * IMPORTANT:
 *
 * Single word:
 *     /api/tts -> Youdao
 *
 * Sentence / paragraph:
 *     Browser SpeechSynthesis
 *
 * This prevents Youdao from receiving full sentences,
 * which was causing the 500 error observed in testing.
 */
export const speakEnglish = (
  text: string,
  rate: number = 0.9,
  onEnd?: () => void
) => {
  if (typeof window === "undefined") {
    return;
  }

  stopSpeaking();

  const cleanText = cleanSpeechText(text);

  if (!cleanText) {
    if (onEnd) {
      onEnd();
    }

    return;
  }

  isAudioActive = true;

  /**
   * CASE 1:
   * Single English word -> Youdao.
   */
  if (isSingleEnglishWord(cleanText)) {
    const encoded =
      encodeURIComponent(cleanText);

    const serverProxyUrl =
      `/api/tts?text=${encoded}`;

    playServerAudio(
      serverProxyUrl,

      // Server TTS success
      () => {
        isAudioActive = false;

        if (onEnd) {
          onEnd();
        }
      },

      // Server TTS failure
      () => {
        if (!isAudioActive) {
          return;
        }

        // Fallback to browser speech.
        speakWithBrowser(
          [cleanText],
          rate,
          onEnd
        );
      }
    );

    return;
  }

  /**
   * CASE 2:
   * Sentence / paragraph -> Browser SpeechSynthesis.
   */
  const chunks =
    splitTextIntoChunks(
      cleanText,
      220
    );

  if (chunks.length === 0) {
    isAudioActive = false;

    if (onEnd) {
      onEnd();
    }

    return;
  }

  speakWithBrowser(
    chunks,
    rate,
    onEnd
  );
};

/**
 * Sound effects used by the application.
 */
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
    const AudioContextClass =
      window.AudioContext ||
      (window as any).webkitAudioContext;

    if (!AudioContextClass) {
      return;
    }

    const ctx =
      new AudioContextClass();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const osc =
      ctx.createOscillator();

    const gain =
      ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now =
      ctx.currentTime;

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
        0.2,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.35
      );

      osc.start(now);
      osc.stop(now + 0.35);
    }

    else if (type === "wrong") {
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
        0.2,
        now
      );

      gain.gain.exponentialRampToValueAtTime(
        0.01,
        now + 0.3
      );

      osc.start(now);
      osc.stop(now + 0.3);
    }

    else if (type === "win") {
      const notes = [
        523.25,
        659.25,
        783.99,
        1046.5,
      ];

      notes.forEach(
        (freq, idx) => {
          const noteOsc =
            ctx.createOscillator();

          const noteGain =
            ctx.createGain();

          noteOsc.connect(noteGain);
          noteGain.connect(
            ctx.destination
          );

          noteOsc.type = "triangle";

          noteOsc.frequency.setValueAtTime(
            freq,
            now + idx * 0.1
          );

          noteGain.gain.setValueAtTime(
            0.2,
            now + idx * 0.1
          );

          noteGain.gain.exponentialRampToValueAtTime(
            0.01,
            now + idx * 0.1 + 0.3
          );

          noteOsc.start(
            now + idx * 0.1
          );

          noteOsc.stop(
            now + idx * 0.1 + 0.3
          );
        }
      );
    }

    else if (type === "click") {
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
      osc.stop(now + 0.06);
    }

    else if (type === "applause") {
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
      osc.stop(now + 0.2);
    }

    else if (type === "chime") {
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
      osc.stop(now + 0.3);
    }

    window.setTimeout(() => {
      try {
        ctx.close();
      } catch {
        // Ignore
      }
    }, 500);
  } catch {
    // Ignore audio context or permission errors.
  }
};