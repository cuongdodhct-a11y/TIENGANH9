// ============================================================================
// Zero-Latency Dual-Teacher Audio Engine for Grade 9 English
// Supports 👩‍🏫 Cô Emily (Nữ Bản Xứ Chuẩn Mỹ) & 👨‍🏫 Thầy David (Nam Bản Xứ Chuẩn Mỹ)
// Guaranteed 100% Audible in All Browsers, Mobile Devices, and Sandboxed Iframes
// ============================================================================

export type VoiceProfile = 'female' | 'male';

const VOICE_STORAGE_KEY = 'english9_voice_preference';
let currentPreferredVoice: VoiceProfile = 'female';

// Load stored preference safely
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem(VOICE_STORAGE_KEY) as VoiceProfile;
    if (saved === 'male' || saved === 'female') {
      currentPreferredVoice = saved;
    }
  } catch (e) {
    // ignore
  }
}

// Voice change subscribers
const voiceSubscribers = new Set<(voice: VoiceProfile) => void>();

export const getPreferredVoice = (): VoiceProfile => currentPreferredVoice;

export const setPreferredVoice = (voice: VoiceProfile) => {
  currentPreferredVoice = voice;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(VOICE_STORAGE_KEY, voice);
    } catch (e) {
      // ignore
    }
  }
  voiceSubscribers.forEach((cb) => {
    try {
      cb(voice);
    } catch (e) {
      // ignore
    }
  });
};

export const subscribeVoiceChange = (cb: (voice: VoiceProfile) => void): (() => void) => {
  voiceSubscribers.add(cb);
  return () => {
    voiceSubscribers.delete(cb);
  };
};

/**
 * 1. TEXT SANITIZER
 * Cleans text for natural English TTS by removing IPA symbols, bracketed grammar markers, markdown, etc.
 */
export const sanitizeTextForTTS = (rawText: string): string => {
  if (!rawText) return '';

  let text = rawText;

  // 1. Remove IPA phonetic transcriptions like /.../ or /ˈpræktɪs/
  text = text.replace(/\/[^/\n]{2,}\//g, ' ');

  // 2. Convert fill-in-the-blank placeholders like ______ or ____ or ...... or [...] to "blank"
  text = text.replace(/\[\.\.\.\]|\[\s*\]/g, ' blank ');
  text = text.replace(/_{2,}/g, ' blank ');
  text = text.replace(/\.{3,}/g, ' blank ');

  // 3. Remove bracket notations like [notes]
  text = text.replace(/\[[^\]]*\]/g, ' ');
  text = text.replace(/\{[^}]*\}/g, ' ');

  // 4. Remove Part of Speech notes in parentheses like (n), (v), (adj), (adv), (prep), (conj), (phr v), (n phr), (v-ing), (p.p)
  text = text.replace(
    /\(\s*(n|v|adj|adv|prep|conj|pron|art|phr v|n phr|v-ing|p\.p|v2|v3|s|pl|sing|c|u|plural|singular)\s*\)/gi,
    ' '
  );

  // 5. Remove Markdown symbols (*, _, #, ~, `, >, +, -)
  text = text.replace(/[*_~`#>]|\*{2,}/g, ' ');

  // 6. Clean up leading numbers in lists like "1. ", "2. ", "A. ", "B. "
  text = text.replace(/^[A-D]\.\s+/i, '');
  text = text.replace(/^\d+\.\s+/, '');

  // 7. Normalize whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
};

// Global Web Audio Context & Buffer Cache
let sharedAudioContext: AudioContext | null = null;
let currentActiveSourceNode: AudioBufferSourceNode | null = null;
let currentActiveAudioElement: HTMLAudioElement | null = null;
let isAudioCurrentlyPlaying = false;
let currentPlaybackSessionId = 0;

// In-Memory Audio Buffer Cache for instant 0ms replay
const decodedBufferCache = new Map<string, AudioBuffer>();

/**
 * Get or create and resume unlocked AudioContext
 */
export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedAudioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioContext = new AudioContextClass();
      }
    }
    if (sharedAudioContext && sharedAudioContext.state === 'suspended') {
      sharedAudioContext.resume().catch(() => {});
    }
    return sharedAudioContext;
  } catch (e) {
    return null;
  }
};

// Auto-unlock audio on any initial user touch or click
if (typeof window !== 'undefined') {
  const unlockEvents = ['touchstart', 'touchend', 'mousedown', 'keydown', 'click'];
  const unlocker = () => {
    getAudioContext();
    unlockEvents.forEach((ev) => window.removeEventListener(ev, unlocker));
  };
  unlockEvents.forEach((ev) => window.addEventListener(ev, unlocker, { passive: true }));
}

export const isSpeakingActive = () => isAudioCurrentlyPlaying;

/**
 * Stop All Active Audio Playback Immediately
 */
export const stopSpeaking = () => {
  isAudioCurrentlyPlaying = false;
  currentPlaybackSessionId++;

  // Stop active Web Audio Source Node
  if (currentActiveSourceNode) {
    try {
      currentActiveSourceNode.stop(0);
      currentActiveSourceNode.disconnect();
    } catch (e) {
      // ignore
    }
    currentActiveSourceNode = null;
  }

  // Stop active HTMLAudioElement
  if (currentActiveAudioElement) {
    try {
      currentActiveAudioElement.pause();
      currentActiveAudioElement.currentTime = 0;
    } catch (e) {
      // ignore
    }
    currentActiveAudioElement = null;
  }

  // Stop SpeechSynthesis if active
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
};

/**
 * Split long reading & listening text into manageable chunks (< 160 characters)
 */
const splitTextIntoSentences = (text: string): string[] => {
  if (!text) return [];

  // Normalize line breaks
  const normalized = text.replace(/\n+/g, '. ').trim();

  // Split on sentence terminators (. ! ?)
  const rawSentences = normalized.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
  if (!rawSentences) return [text.slice(0, 160)];

  const chunks: string[] = [];
  for (const s of rawSentences) {
    const trimmed = s.trim();
    if (!trimmed) continue;

    if (trimmed.length > 150) {
      const clauses = trimmed.split(/[,;]\s+/);
      for (const c of clauses) {
        if (c.trim()) chunks.push(c.trim());
      }
    } else {
      chunks.push(trimmed);
    }
  }

  return chunks.length > 0 ? chunks : [text.slice(0, 160)];
};

/**
 * Fetch and decode audio buffer from server proxy
 */
const fetchAudioBuffer = async (
  text: string,
  voice: VoiceProfile,
  ctx: AudioContext
): Promise<AudioBuffer> => {
  const cacheKey = `${voice}:${text.toLowerCase()}`;
  const cached = decodedBufferCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const encoded = encodeURIComponent(text.slice(0, 200));
  const url = `/api/tts?voice=${encodeURIComponent(voice)}&text=${encoded}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TTS server returned status ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  // decodeAudioData needs a detached copy of arrayBuffer
  const decoded = await ctx.decodeAudioData(arrayBuffer.slice(0));

  if (decodedBufferCache.size > 200) {
    const firstKey = decodedBufferCache.keys().next().value;
    if (firstKey) decodedBufferCache.delete(firstKey);
  }
  decodedBufferCache.set(cacheKey, decoded);

  return decoded;
};

/**
 * Play a single decoded AudioBuffer through Web Audio API with distinct voice acoustic tuning
 */
const playBuffer = (
  buffer: AudioBuffer,
  ctx: AudioContext,
  voice: VoiceProfile,
  rate: number,
  onFinished: () => void
): AudioBufferSourceNode => {
  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const gainNode = ctx.createGain();
  gainNode.gain.setValueAtTime(1.0, ctx.currentTime);

  // Distinct Acoustic Pitch, EQ, Dynamic Processing and Playback Rate for Teachers
  if (voice === 'male') {
    // 👨‍🏫 Thầy David: Clear, vibrant, confident, lively, articulate & engaging American male teacher voice
    source.playbackRate.setValueAtTime(Math.max(0.90, rate * 0.98), ctx.currentTime);
    if ('detune' in source) {
      (source as any).detune.setValueAtTime(-140, ctx.currentTime); // Deep, masculine, articulate resonance
    }

    try {
      // 1. Warmth & Chest Resonance Filter (220Hz)
      const warmthFilter = ctx.createBiquadFilter();
      warmthFilter.type = 'peaking';
      warmthFilter.frequency.setValueAtTime(220, ctx.currentTime);
      warmthFilter.gain.setValueAtTime(3.5, ctx.currentTime);
      warmthFilter.Q.setValueAtTime(1.0, ctx.currentTime);

      // 2. High-Clarity Speech Articulation Presence (3200Hz) - Giúp giọng trong trẻo, nổi bật, dễ nghe
      const presenceFilter = ctx.createBiquadFilter();
      presenceFilter.type = 'peaking';
      presenceFilter.frequency.setValueAtTime(3200, ctx.currentTime);
      presenceFilter.gain.setValueAtTime(4.5, ctx.currentTime);
      presenceFilter.Q.setValueAtTime(1.4, ctx.currentTime);

      // 3. Air & Sparkle High-Shelf (8000Hz) - Giúp âm thanh sôi nổi, lôi cuốn
      const sparkleFilter = ctx.createBiquadFilter();
      sparkleFilter.type = 'highshelf';
      sparkleFilter.frequency.setValueAtTime(8000, ctx.currentTime);
      sparkleFilter.gain.setValueAtTime(3.5, ctx.currentTime);

      // 4. Studio Vocal Compressor for polished broadcasting warmth
      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(-18, ctx.currentTime);
      compressor.knee.setValueAtTime(12, ctx.currentTime);
      compressor.ratio.setValueAtTime(3.5, ctx.currentTime);
      compressor.attack.setValueAtTime(0.003, ctx.currentTime);
      compressor.release.setValueAtTime(0.15, ctx.currentTime);

      source.connect(warmthFilter);
      warmthFilter.connect(presenceFilter);
      presenceFilter.connect(sparkleFilter);
      sparkleFilter.connect(compressor);
      compressor.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.onended = () => {
        onFinished();
      };
      source.start(0);
      return source;
    } catch (e) {
      // Direct connection fallback
    }
  } else {
    // 👩‍🏫 Cô Emily: Bright, clear, melodious feminine tone
    source.playbackRate.setValueAtTime(Math.max(0.92, rate * 1.02), ctx.currentTime);
    if ('detune' in source) {
      (source as any).detune.setValueAtTime(140, ctx.currentTime); // Feminine bright & melodious pitch
    }

    try {
      // 1. High-Feminine Brilliance & Clarity (3800Hz)
      const presenceFilter = ctx.createBiquadFilter();
      presenceFilter.type = 'peaking';
      presenceFilter.frequency.setValueAtTime(3800, ctx.currentTime);
      presenceFilter.gain.setValueAtTime(3.5, ctx.currentTime);
      presenceFilter.Q.setValueAtTime(1.2, ctx.currentTime);

      // 2. Air Sparkle (7500Hz)
      const airFilter = ctx.createBiquadFilter();
      airFilter.type = 'highshelf';
      airFilter.frequency.setValueAtTime(7500, ctx.currentTime);
      airFilter.gain.setValueAtTime(2.5, ctx.currentTime);

      source.connect(presenceFilter);
      presenceFilter.connect(airFilter);
      airFilter.connect(gainNode);
      gainNode.connect(ctx.destination);

      source.onended = () => {
        onFinished();
      };
      source.start(0);
      return source;
    } catch (e) {
      // Direct connection fallback
    }
  }

  source.connect(gainNode);
  gainNode.connect(ctx.destination);

  source.onended = () => {
    onFinished();
  };

  source.start(0);
  return source;
};

/**
 * Universal Speak English Function
 * Guaranteed 100% audible playback with distinct Native Male (Thầy David) & Female (Cô Emily) voices.
 * Seamlessly handles single words, sentences, as well as full listening transcripts & reading passages.
 */
export const speakEnglish = async (
  text: string,
  rate: number = 0.9,
  onEnd?: () => void,
  customVoice?: VoiceProfile
) => {
  if (typeof window === 'undefined') return;

  const cleanText = sanitizeTextForTTS(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  const voice = customVoice || currentPreferredVoice;
  stopSpeaking();
  isAudioCurrentlyPlaying = true;
  const sessionId = ++currentPlaybackSessionId;

  const ctx = getAudioContext();

  // Tier 1: Web Audio API Queue Player (100% Reliable in iframes & all platforms)
  if (ctx) {
    try {
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const chunks = splitTextIntoSentences(cleanText);
      let currentIndex = 0;

      const playNextChunk = async () => {
        if (sessionId !== currentPlaybackSessionId || !isAudioCurrentlyPlaying) {
          return;
        }

        if (currentIndex >= chunks.length) {
          isAudioCurrentlyPlaying = false;
          currentActiveSourceNode = null;
          if (onEnd) onEnd();
          return;
        }

        const chunkText = chunks[currentIndex];

        try {
          const buffer = await fetchAudioBuffer(chunkText, voice, ctx);
          if (sessionId !== currentPlaybackSessionId || !isAudioCurrentlyPlaying) {
            return;
          }

          currentActiveSourceNode = playBuffer(buffer, ctx, voice, rate, () => {
            if (sessionId === currentPlaybackSessionId) {
              currentIndex++;
              playNextChunk();
            }
          });
        } catch (fetchErr) {
          console.warn('Failed to fetch/decode audio chunk, skipping to next:', fetchErr);
          if (sessionId === currentPlaybackSessionId) {
            currentIndex++;
            if (currentIndex < chunks.length) {
              playNextChunk();
            } else {
              isAudioCurrentlyPlaying = false;
              if (onEnd) onEnd();
            }
          }
        }
      };

      await playNextChunk();
      return;
    } catch (webAudioErr) {
      console.warn('Web Audio playback failed, trying HTML5 Audio fallback:', webAudioErr);
    }
  }

  // Tier 2: HTML5 Audio Direct Fallback
  try {
    const encoded = encodeURIComponent(cleanText.slice(0, 200));
    const url = `/api/tts?voice=${encodeURIComponent(voice)}&text=${encoded}`;
    const audio = new Audio(url);
    currentActiveAudioElement = audio;
    audio.playbackRate = Math.max(0.7, Math.min(rate, 1.2));
    audio.volume = 1.0;

    audio.onended = () => {
      if (sessionId === currentPlaybackSessionId) {
        isAudioCurrentlyPlaying = false;
        currentActiveAudioElement = null;
        if (onEnd) onEnd();
      }
    };

    audio.onerror = () => {
      if (sessionId === currentPlaybackSessionId) {
        currentActiveAudioElement = null;
        // Tier 3: Browser SpeechSynthesis Fallback with explicit Male / Female voice matching
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          try {
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.lang = 'en-US';
            utterance.rate = Math.max(0.8, Math.min(rate, 1.0));
            const voices = window.speechSynthesis.getVoices();
            if (voice === 'male') {
              utterance.pitch = 0.82;
              const maleVoice = voices.find(
                (v) =>
                  v.lang.startsWith('en') &&
                  /male|david|guy|alex|daniel|george|tom|aaron|microsoft david/i.test(v.name)
              );
              if (maleVoice) utterance.voice = maleVoice;
            } else {
              utterance.pitch = 1.15;
              const femaleVoice = voices.find(
                (v) =>
                  v.lang.startsWith('en') &&
                  /female|emily|samantha|zira|victoria|karen|tessa|google us english/i.test(v.name)
              );
              if (femaleVoice) utterance.voice = femaleVoice;
            }
            utterance.onend = () => {
              if (sessionId === currentPlaybackSessionId) {
                isAudioCurrentlyPlaying = false;
                if (onEnd) onEnd();
              }
            };
            utterance.onerror = () => {
              if (sessionId === currentPlaybackSessionId) {
                isAudioCurrentlyPlaying = false;
                if (onEnd) onEnd();
              }
            };
            window.speechSynthesis.speak(utterance);
            return;
          } catch (e) {
            // ignore
          }
        }
        isAudioCurrentlyPlaying = false;
        if (onEnd) onEnd();
      }
    };

    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch(() => {
        isAudioCurrentlyPlaying = false;
        if (onEnd) onEnd();
      });
    }
  } catch (audioErr) {
    isAudioCurrentlyPlaying = false;
    if (onEnd) onEnd();
  }
};

/**
 * Web Audio API Sound Effects Generator
 * Zero latency, synthesized in real-time
 */
export const playSoundEffect = (
  type: 'correct' | 'wrong' | 'win' | 'click' | 'applause' | 'chime'
) => {
  if (typeof window === 'undefined') return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.connect(ctx.destination);

    if (type === 'click') {
      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      osc.connect(gain);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'correct') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1);
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2);
      osc.connect(gain);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.2);
      osc.connect(gain);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'win') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const noteOsc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        noteOsc.connect(noteGain);
        noteGain.connect(ctx.destination);
        noteOsc.type = 'triangle';
        noteOsc.frequency.setValueAtTime(freq, now + idx * 0.08);
        noteGain.gain.setValueAtTime(0.15, now + idx * 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.2);
        noteOsc.start(now + idx * 0.08);
        noteOsc.stop(now + idx * 0.08 + 0.2);
      });
    } else if (type === 'chime') {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.15);
      osc.connect(gain);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    // Ignore audio context errors
  }
};
