// Speech Synthesis & Web Audio Helpers

let activeAudioElement: HTMLAudioElement | null = null;
let isAudioActive = false;

export const isSpeakingActive = () => isAudioActive;

export const stopSpeaking = () => {
  isAudioActive = false;

  if (typeof window !== 'undefined') {
    // 1. Cancel SpeechSynthesis if running
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }

    // 2. Stop and destroy HTML Audio Element
    if (activeAudioElement) {
      try {
        activeAudioElement.pause();
        activeAudioElement.currentTime = 0;
        activeAudioElement.src = '';
      } catch (e) {
        // ignore
      }
      activeAudioElement = null;
    }
  }
};

/**
 * Single-stream HTML5 Audio Player
 * Ensures strictly ONE audio stream is playing at any given moment.
 */
const playAudioStream = (urls: string[], onEnd?: () => void) => {
  if (!isAudioActive) return;

  const tryPlayUrl = (idx: number) => {
    if (!isAudioActive || idx >= urls.length) {
      isAudioActive = false;
      if (onEnd) onEnd();
      return;
    }

    try {
      if (activeAudioElement) {
        try {
          activeAudioElement.pause();
          activeAudioElement.currentTime = 0;
        } catch (e) {
          // ignore
        }
      }

      const audio = new Audio(urls[idx]);
      activeAudioElement = audio;

      audio.onended = () => {
        if (activeAudioElement === audio) {
          activeAudioElement = null;
        }
        if (onEnd) onEnd();
      };

      audio.onerror = () => {
        if (activeAudioElement === audio) {
          activeAudioElement = null;
        }
        // Try next fallback URL
        tryPlayUrl(idx + 1);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (activeAudioElement === audio) {
            activeAudioElement = null;
          }
          // If browser blocked autoplay or network failed, try next fallback
          tryPlayUrl(idx + 1);
        });
      }
    } catch (e) {
      activeAudioElement = null;
      tryPlayUrl(idx + 1);
    }
  };

  tryPlayUrl(0);
};

/**
 * Universal Speak English function
 * Supports words, phrases, sentences, and full reading passages.
 * Eliminates echo completely by strictly enforcing single-channel audio playback via server TTS stream.
 */
export const speakEnglish = (
  text: string,
  rate: number = 0.9,
  onEnd?: () => void
) => {
  if (typeof window === 'undefined') return;

  // Always stop existing audio first to prevent overlap / echo
  stopSpeaking();

  const cleanText = text.replace(/[*_~`#]/g, '').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  isAudioActive = true;

  // Break text into logical chunks (< 180 characters) for smooth, natural audio streaming
  const maxChunkLength = 180;
  let textChunks: string[] = [];

  if (cleanText.length > maxChunkLength) {
    const rawSentences = cleanText.split(/(?<=[.!?])\s+|\n+/);
    let current = '';
    for (const sentence of rawSentences) {
      if ((current + ' ' + sentence).length <= maxChunkLength) {
        current = current ? `${current} ${sentence}` : sentence;
      } else {
        if (current) textChunks.push(current);
        if (sentence.length > maxChunkLength) {
          const parts = sentence.split(/,\s+/);
          for (const p of parts) {
            if (p.trim()) textChunks.push(p.trim());
          }
          current = '';
        } else {
          current = sentence;
        }
      }
    }
    if (current) textChunks.push(current);
  } else {
    textChunks = [cleanText];
  }

  let chunkIdx = 0;

  const playNextChunk = () => {
    if (!isAudioActive || chunkIdx >= textChunks.length) {
      isAudioActive = false;
      if (onEnd) onEnd();
      return;
    }

    const chunk = textChunks[chunkIdx++];
    const encoded = encodeURIComponent(chunk);

    // Audio URLs in order of preference:
    // 1. Same-Origin Express Proxy (/api/tts)
    // 2. Youdao Dictionary English Voice
    // 3. Google Translate TTS
    const serverProxyUrl = `/api/tts?text=${encoded}`;
    const youdaoUrl = `https://dict.youdao.com/dictvoice?type=0&audio=${encoded}`;
    const googleUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encoded}`;

    playAudioStream([serverProxyUrl, youdaoUrl, googleUrl], () => {
      if (isAudioActive) {
        playNextChunk();
      }
    });
  };

  playNextChunk();
};

// Web Audio API Sound Effects Generator
export const playSoundEffect = (
  type: 'correct' | 'wrong' | 'win' | 'click' | 'applause' | 'chime'
) => {
  if (typeof window === 'undefined') return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
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
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.15); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.3); // G5
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
        noteGain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.1 + 0.3);
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
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.2);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    // Ignore context or permission errors
  }
};
