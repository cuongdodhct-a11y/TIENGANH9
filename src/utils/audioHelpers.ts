// Speech Synthesis & Web Audio Helpers
// Audio engine for TIENGANH9
// Priority: Vercel /api/tts -> browser SpeechSynthesis fallback

let activeAudioElement: HTMLAudioElement | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let isAudioActive = false;
let speechFallbackActive = false;

export const isSpeakingActive = () => isAudioActive;

export const stopSpeaking = () => {
  isAudioActive = false;
  speechFallbackActive = false;

  if (typeof window === 'undefined') return;

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // ignore browser-specific errors
    }
  }
  activeUtterance = null;

  if (activeAudioElement) {
    try {
      activeAudioElement.pause();
      activeAudioElement.currentTime = 0;
      activeAudioElement.removeAttribute('src');
      activeAudioElement.load();
    } catch {
      // ignore
    }
    activeAudioElement = null;
  }
};

const splitTextIntoChunks = (text: string, maxLength = 180): string[] => {
  const cleanText = text
    .replace(/[\*_~`#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanText) return [];
  if (cleanText.length <= maxLength) return [cleanText];

  const sentences = cleanText.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    const candidate = current ? `${current} ${sentence}` : sentence;

    if (candidate.length <= maxLength) {
      current = candidate;
      continue;
    }

    if (current) {
      chunks.push(current.trim());
      current = '';
    }

    if (sentence.length <= maxLength) {
      current = sentence;
      continue;
    }

    const parts = sentence.split(/,\s+/);
    for (const part of parts) {
      if (!part.trim()) continue;

      if (part.length <= maxLength) {
        if (current && `${current} ${part}`.length <= maxLength) {
          current = `${current} ${part}`;
        } else {
          if (current) chunks.push(current.trim());
          current = part;
        }
      } else {
        if (current) {
          chunks.push(current.trim());
          current = '';
        }

        for (let i = 0; i < part.length; i += maxLength) {
          chunks.push(part.slice(i, i + maxLength).trim());
        }
      }
    }
  }

  if (current) chunks.push(current.trim());
  return chunks.filter(Boolean);
};

const getEnglishVoice = (): SpeechSynthesisVoice | null => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }

  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  return (
    voices.find((voice) => /^en-US$/i.test(voice.lang)) ||
    voices.find((voice) => /^en-GB$/i.test(voice.lang)) ||
    voices.find((voice) => /^en-/i.test(voice.lang)) ||
    null
  );
};

const speakWithBrowser = (
  chunks: string[],
  rate: number,
  onEnd?: () => void
) => {
  if (
    typeof window === 'undefined' ||
    !('speechSynthesis' in window) ||
    chunks.length === 0
  ) {
    isAudioActive = false;
    if (onEnd) onEnd();
    return;
  }

  speechFallbackActive = true;
  let index = 0;

  const speakNext = () => {
    if (!isAudioActive || !speechFallbackActive || index >= chunks.length) {
      speechFallbackActive = false;
      isAudioActive = false;
      activeUtterance = null;
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunks[index++]);
    activeUtterance = utterance;

    utterance.lang = 'en-US';
    utterance.rate = Math.min(1.2, Math.max(0.6, rate));
    utterance.pitch = 1;
    utterance.volume = 1;

    const voice = getEnglishVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => {
      if (activeUtterance !== utterance) return;
      activeUtterance = null;
      if (isAudioActive && speechFallbackActive) {
        window.setTimeout(speakNext, 30);
      }
    };

    utterance.onerror = () => {
      if (activeUtterance !== utterance) return;
      activeUtterance = null;
      speechFallbackActive = false;
      isAudioActive = false;
      if (onEnd) onEnd();
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      speechFallbackActive = false;
      isAudioActive = false;
      activeUtterance = null;
      if (onEnd) onEnd();
    }
  };

  if (window.speechSynthesis.getVoices().length === 0) {
    const handleVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      if (isAudioActive && speechFallbackActive) speakNext();
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    window.setTimeout(() => {
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      if (isAudioActive && speechFallbackActive && !activeUtterance) {
        speakNext();
      }
    }, 500);
  } else {
    speakNext();
  }
};

const playServerAudio = (
  url: string,
  onSuccessEnd: () => void,
  onFailure: () => void
) => {
  try {
    const audio = new Audio();
    activeAudioElement = audio;
    audio.preload = 'auto';

    let finished = false;

    const fail = () => {
      if (finished) return;
      finished = true;

      if (activeAudioElement === audio) activeAudioElement = null;

      try {
        audio.pause();
        audio.removeAttribute('src');
        audio.load();
      } catch {
        // ignore
      }

      onFailure();
    };

    audio.onended = () => {
      if (finished) return;
      finished = true;

      if (activeAudioElement === audio) activeAudioElement = null;

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

export const speakEnglish = (
  text: string,
  rate: number = 0.9,
  onEnd?: () => void
) => {
  if (typeof window === 'undefined') return;

  stopSpeaking();

  const chunks = splitTextIntoChunks(text, 180);

  if (chunks.length === 0) {
    if (onEnd) onEnd();
    return;
  }

  isAudioActive = true;

  let chunkIndex = 0;
  let serverFailed = false;

  const startBrowserFallback = () => {
    if (!isAudioActive) return;
    serverFailed = true;
    speakWithBrowser(chunks, rate, onEnd);
  };

  const playNextServerChunk = () => {
    if (!isAudioActive) return;

    if (chunkIndex >= chunks.length) {
      isAudioActive = false;
      if (onEnd) onEnd();
      return;
    }

    const chunk = chunks[chunkIndex++];
    const encoded = encodeURIComponent(chunk);
    const serverProxyUrl = `/api/tts?text=${encoded}`;

    playServerAudio(
      serverProxyUrl,
      () => {
        if (isAudioActive) {
          window.setTimeout(playNextServerChunk, 20);
        }
      },
      () => {
        if (serverFailed) return;
        startBrowserFallback();
      }
    );
  };

  playNextServerChunk();
};

export const playSoundEffect = (
  type: 'correct' | 'wrong' | 'win' | 'click' | 'applause' | 'chime'
) => {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'win') {
      const notes = [523.25, 659.25, 783.99, 1046.5];

      notes.forEach((freq, idx) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();

        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);

        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.1);
        noteGain.gain.setValueAtTime(0.2, now + idx * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(
          0.01,
          now + idx * 0.1 + 0.3
        );

        noteOsc.start(now + idx * 0.1);
        noteOsc.stop(now + idx * 0.1 + 0.3);
      });
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'applause') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }

    window.setTimeout(() => {
      try {
        ctx.close();
      } catch {
        // ignore
      }
    }, 500);
  } catch {
    // Ignore context or permission errors.
  }
};