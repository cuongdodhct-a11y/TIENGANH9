// ============================================================================
// TIENGANH9 – APPLICATION AUDIO ENGINE
// ============================================================================
// Mục tiêu:
//
// 1. Một audio engine dùng chung toàn ứng dụng.
// 2. Gemini TTS là đường phát chính.
// 3. Cô Emily  = female
// 4. Thầy David = male
// 5. Một thời điểm chỉ có MỘT audio.
// 6. Bấm nút mới sẽ dừng audio cũ.
// 7. Cache audio đã tải.
// 8. Gemini TTS lỗi/quota -> báo lỗi có kiểm soát; KHÔNG fallback SpeechSynthesis cho giọng giáo viên.
// 9. Hỗ trợ đọc hội thoại tuần tự theo vai.
// 10. Hạn chế gọi Gemini lặp lại khi gặp 429.
// ============================================================================

export type VoiceProfile =
  | 'female'
  | 'male';

// ============================================================================
// CONFIG
// ============================================================================

const VOICE_STORAGE_KEY =
  'english9_voice_preference';

const MAX_TTS_CHARS = 1600;

const CLIENT_CACHE_LIMIT = 100;

const GEMINI_COOLDOWN_MS = 45_000;

// ============================================================================
// VOICE PREFERENCE
// ============================================================================

let currentPreferredVoice: VoiceProfile =
  'female';

const geminiUnavailableUntil: Record<VoiceProfile, number> = {
  female: 0,
  male: 0,
};

if (typeof window !== 'undefined') {
  try {
    const saved =
      localStorage.getItem(
        VOICE_STORAGE_KEY
      );

    if (
      saved === 'female' ||
      saved === 'male'
    ) {
      currentPreferredVoice = saved;
    }
  } catch {
    // Ignore storage errors.
  }
}

const voiceSubscribers =
  new Set<
    (voice: VoiceProfile) => void
  >();

export const getPreferredVoice =
  (): VoiceProfile =>
    currentPreferredVoice;

export const setPreferredVoice = (
  voice: VoiceProfile
): void => {
  currentPreferredVoice = voice;

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(
        VOICE_STORAGE_KEY,
        voice
      );
    } catch {
      // Ignore.
    }
  }

  voiceSubscribers.forEach(
    (callback) => {
      try {
        callback(voice);
      } catch {
        // Ignore subscriber errors.
      }
    }
  );
};

export const subscribeVoiceChange = (
  callback: (
    voice: VoiceProfile
  ) => void
): (() => void) => {
  voiceSubscribers.add(callback);

  return () =>
    voiceSubscribers.delete(callback);
};

// ============================================================================
// TEXT SANITIZATION
// ============================================================================

export const sanitizeTextForTTS = (
  rawText: string
): string => {
  if (!rawText) return '';

  let text = String(rawText);

  // Remove IPA.
  text = text.replace(
    /\/[^/\n]{2,}\//g,
    ' '
  );

  // Remove bracket notes.
  text = text.replace(
    /\[[^\]]*\]/g,
    ' '
  );

  text = text.replace(
    /\{[^}]*\}/g,
    ' '
  );

  // Markdown.
  text = text.replace(
    /[*_~`#>]/g,
    ' '
  );

  // List markers.
  text = text.replace(
    /^[A-D]\.\s+/i,
    ''
  );

  text = text.replace(
    /^\d+\.\s+/,
    ''
  );

  // Blank placeholders.
  text = text.replace(
    /_{2,}/g,
    ' blank '
  );

  text = text.replace(
    /\.{3,}/g,
    ' blank '
  );

  return text
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, MAX_TTS_CHARS);
};

// ============================================================================
// TEXT CHUNKING
// ============================================================================

const splitTextIntoChunks = (
  text: string,
  maxLength = 180
): string[] => {
  const normalized =
    text
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

  if (!normalized) {
    return [];
  }

  const sentences =
    normalized.match(
      /[^.!?]+[.!?]+|[^.!?]+$/g
    ) || [normalized];

  const chunks: string[] = [];

  for (const sentence of sentences) {
    const s = sentence.trim();

    if (!s) continue;

    if (s.length <= maxLength) {
      chunks.push(s);
      continue;
    }

    const clauses =
      s.split(
        /(?<=[,;:])\s+/
      );

    let current = '';

    for (const clause of clauses) {
      const candidate = current
        ? `${current} ${clause}`
        : clause;

      if (
        candidate.length <= maxLength
      ) {
        current = candidate;
      } else {
        if (current) {
          chunks.push(current);
        }

        current = clause;
      }
    }

    if (current) {
      chunks.push(current);
    }
  }

  return chunks;
};

// ============================================================================
// AUDIO CONTEXT
// ============================================================================

let sharedAudioContext:
  | AudioContext
  | null = null;

export const getAudioContext =
  (): AudioContext | null => {
    if (
      typeof window === 'undefined'
    ) {
      return null;
    }

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as any)
          .webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      if (!sharedAudioContext) {
        sharedAudioContext =
          new AudioContextClass();
      }

      return sharedAudioContext;
    } catch {
      return null;
    }
  };

export const unlockAudio = (): void => {
  try {
    const context =
      getAudioContext();

    if (
      context &&
      context.state ===
        'suspended'
    ) {
      void context
        .resume()
        .catch(() => undefined);
    }
  } catch {
    // Ignore.
  }
};

if (typeof window !== 'undefined') {
  const unlocker = () => {
    unlockAudio();

    window.removeEventListener(
      'pointerdown',
      unlocker
    );

    window.removeEventListener(
      'touchstart',
      unlocker
    );

    window.removeEventListener(
      'keydown',
      unlocker
    );
  };

  window.addEventListener(
    'pointerdown',
    unlocker,
    { passive: true }
  );

  window.addEventListener(
    'touchstart',
    unlocker,
    { passive: true }
  );

  window.addEventListener(
    'keydown',
    unlocker
  );
}

/**
 * Backward-compatible no-op.
 *
 * Teacher voices are Gemini-only now. Older components still import this
 * symbol to unlock browser audio after a user gesture; keeping the export
 * avoids a build break without re-enabling browser SpeechSynthesis.
 */
export const unlockBrowserSpeech = (): void => {
  // Intentionally empty. Gemini audio is played through HTMLAudioElement.
};

// ============================================================================
// GLOBAL PLAYBACK STATE
// ============================================================================

let activeAudio:
  | HTMLAudioElement
  | null = null;

let browserSpeechActive = false;

let playbackSession = 0;

let audioCurrentlyPlaying =
  false;

// ============================================================================
// CACHE
// ============================================================================

const clientAudioCache =
  new Map<string, string>();

const clientPreloadPromises =
  new Map<
    string,
    Promise<string | null>
  >();

const cacheKey = (
  text: string,
  voice: VoiceProfile
): string =>
  `${voice}::${text}`;

const buildTtsUrl = (
  text: string,
  voice: VoiceProfile
): string =>
  `/api/tts?voice=${encodeURIComponent(
    voice
  )}&text=${encodeURIComponent(text)}`;

const rememberBlobUrl = (
  key: string,
  url: string
): void => {
  const oldUrl =
    clientAudioCache.get(key);

  if (
    oldUrl &&
    oldUrl !== url
  ) {
    try {
      URL.revokeObjectURL(
        oldUrl
      );
    } catch {
      // Ignore.
    }
  }

  clientAudioCache.delete(key);
  clientAudioCache.set(key, url);

  while (
    clientAudioCache.size >
    CLIENT_CACHE_LIMIT
  ) {
    const oldestKey =
      clientAudioCache.keys()
        .next()
        .value as
        | string
        | undefined;

    if (!oldestKey) break;

    const oldestUrl =
      clientAudioCache.get(
        oldestKey
      );

    clientAudioCache.delete(
      oldestKey
    );

    if (oldestUrl) {
      try {
        URL.revokeObjectURL(
          oldestUrl
        );
      } catch {
        // Ignore.
      }
    }
  }
};

// ============================================================================
// STOP
// ============================================================================

export const stopSpeaking =
  (): void => {
    playbackSession += 1;

    audioCurrentlyPlaying =
      false;

    // Stop any browser SpeechSynthesis fallback immediately.
    if (
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore browser speech errors.
      }
    }

    browserSpeechActive = false;

    if (activeAudio) {
      try {
        activeAudio.onended =
          null;

        activeAudio.onerror =
          null;

        activeAudio.onabort =
          null;

        activeAudio.pause();

        activeAudio.removeAttribute(
          'src'
        );

        activeAudio.load();
      } catch {
        // Ignore.
      }
    }

    activeAudio = null;
  };

export const isSpeakingActive =
  (): boolean =>
    audioCurrentlyPlaying;

/**
 * Teacher voices are intentionally Gemini-only. This flag is informational
 * and does not select or synthesize a browser voice.
 */
export const isTeacherVoiceEngineAvailable = (voice: VoiceProfile = currentPreferredVoice): boolean =>
  Date.now() >= geminiUnavailableUntil[voice];

// ============================================================================
// FETCH / CACHE ONE AUDIO
// ============================================================================

const loadAudioUrl = async (
  text: string,
  voice: VoiceProfile
): Promise<string | null> => {
  const cleanText =
    sanitizeTextForTTS(text);

  if (!cleanText) {
    return null;
  }

  const key = cacheKey(
    cleanText,
    voice
  );

  const cached =
    clientAudioCache.get(key);

  if (cached) {
    return cached;
  }

  const existing =
    clientPreloadPromises.get(key);

  if (existing) {
    return await existing;
  }

  const promise =
    (async () => {
      try {
        // When Gemini has already failed recently, do not keep hitting the endpoint.
        // The caller will fail closed rather than changing the teacher voice.
        if (
          Date.now() <
          geminiUnavailableUntil[voice]
        ) {
          return null;
        }

        const response =
          await fetch(
            buildTtsUrl(
              cleanText,
              voice
            ),
            {
              method: 'GET',
              cache: 'no-store',
            }
          );

        if (!response.ok) {
          geminiUnavailableUntil[voice] =
            Date.now() +
            GEMINI_COOLDOWN_MS;

          let serverMessage = '';
          try {
            const body = await response.clone().json();
            serverMessage = String(body?.error || '');
          } catch {
            // Response may not be JSON.
          }

          console.warn(
            `Gemini TTS unavailable (${response.status}). ` +
            (serverMessage || 'Teacher voice audio is unavailable.')
          );

          return null;
        }

        const blob =
          await response.blob();

        if (!blob.size) {
          console.warn(
            'Gemini TTS returned an empty audio response. ' +
            'Teacher voice audio is unavailable.'
          );

          geminiUnavailableUntil[voice] =
            Date.now() +
            GEMINI_COOLDOWN_MS;

          return null;
        }

        const url =
          URL.createObjectURL(
            blob
          );

        rememberBlobUrl(
          key,
          url
        );

        return url;
      } catch (error) {
        console.warn(
          'TTS network error. Teacher voice audio is unavailable:',
          error
        );

        geminiUnavailableUntil[voice] =
          Date.now() +
          GEMINI_COOLDOWN_MS;

        return null;
      } finally {
        clientPreloadPromises.delete(
          key
        );
      }
    })();

  clientPreloadPromises.set(
    key,
    promise
  );

  return await promise;
};
// ============================================================================
// PRELOAD
// ============================================================================

export const preloadSpeech =
  async (
    text: string,
    customVoice?: VoiceProfile
  ): Promise<boolean> => {
    const cleanText =
      sanitizeTextForTTS(text);

    if (!cleanText) {
      return false;
    }

    const voice =
      customVoice ||
      currentPreferredVoice;

    const chunks =
      splitTextIntoChunks(
        cleanText
      );

    if (!chunks.length) {
      return false;
    }

    for (const chunk of chunks) {
      const url =
        await loadAudioUrl(
          chunk,
          voice
        );

      if (!url) {
        return false;
      }
    }

    return true;
  };

// ============================================================================
// GEMINI TEACHER TTS ONLY
// ============================================================================
// Do not use SpeechSynthesis for teacher voices. Browser engines cannot
// guarantee the requested speaker identity (Emily/David).
// ============================================================================

// ============================================================================
// PLAY ONE CHUNK
// ============================================================================

const playOneChunk = (
  text: string,
  voice: VoiceProfile,
  rate: number,
  session: number
): Promise<boolean> =>
  new Promise(
    async (resolve) => {
      if (
        typeof window === 'undefined' ||
        session !== playbackSession
      ) {
        resolve(false);
        return;
      }

      const cleanText =
        sanitizeTextForTTS(text);

      if (!cleanText) {
        resolve(true);
        return;
      }

      const url =
        await loadAudioUrl(
          cleanText,
          voice
        );

      // Teacher voices are Gemini-only. Never fall back to the browser
      // SpeechSynthesis engine because it cannot guarantee the requested
      // male/female identity. A failed Gemini request must fail closed.
      if (!url) {
        console.warn(
          `Teacher TTS unavailable for ${voice} voice; refusing browser fallback.`
        );
        resolve(false);
        return;
      }

      if (
        session !== playbackSession
      ) {
        resolve(false);
        return;
      }

      const audio =
        new Audio();

      audio.preload = 'auto';

      audio.setAttribute(
        'playsinline',
        'true'
      );

      audio.setAttribute(
        'webkit-playsinline',
        'true'
      );

      audio.volume = 1;

      audio.playbackRate =
        Math.max(
          0.75,
          Math.min(
            rate,
            1.08
          )
        );

      audio.src = url;

      activeAudio = audio;

      let settled = false;

      const finish = (
        success: boolean
      ) => {
        if (settled) return;

        settled = true;

        audio.onended = null;
        audio.onerror = null;
        audio.onabort = null;

        if (
          activeAudio === audio
        ) {
          activeAudio = null;
        }

        resolve(success);
      };

      audio.onended = () =>
        finish(true);

      audio.onerror = () =>
        finish(false);

      audio.onabort = () =>
        finish(false);

      try {
        const playPromise =
          audio.play();

        if (
          playPromise &&
          typeof playPromise.catch === 'function'
        ) {
          playPromise.catch(
            () => finish(false)
          );
        }
      } catch {
        finish(false);
      }
    }
  );


// ============================================================================
// PLAY INTERNAL TEXT
// ============================================================================

const playTextInternal = async (
  text: string,
  voice: VoiceProfile,
  rate: number,
  session: number
): Promise<boolean> => {
  const chunks =
    splitTextIntoChunks(
      sanitizeTextForTTS(text)
    );

  if (!chunks.length) {
    return true;
  }

  for (
    let index = 0;
    index < chunks.length;
    index += 1
  ) {
    if (
      session !==
      playbackSession
    ) {
      return false;
    }

    const ok =
      await playOneChunk(
        chunks[index],
        voice,
        rate,
        session
      );

    if (!ok) {
      return false;
    }

    // Small gap prevents accidental acoustic overlap
    // between consecutive HTMLAudio elements.
    if (
      index <
      chunks.length - 1
    ) {
      await new Promise(
        (resolve) =>
          window.setTimeout(
            resolve,
            60
          )
      );
    }
  }

  return true;
};

// ============================================================================
// PUBLIC SINGLE SPEECH
// ============================================================================

export const speakEnglish =
  async (
    text: string,
    rate = 0.9,
    onEnd?: () => void,
    customVoice?: VoiceProfile
  ): Promise<void> => {
    if (
      typeof window ===
      'undefined'
    ) {
      onEnd?.();
      return;
    }

    const cleanText =
      sanitizeTextForTTS(text);

    if (!cleanText) {
      onEnd?.();
      return;
    }

    stopSpeaking();

    unlockAudio();

    const voice =
      customVoice ||
      currentPreferredVoice;

    const session =
      playbackSession;

    audioCurrentlyPlaying =
      true;

    try {
      await playTextInternal(
        cleanText,
        voice,
        rate,
        session
      );
    } finally {
      if (
        session ===
        playbackSession
      ) {
        audioCurrentlyPlaying =
          false;

        activeAudio = null;

        onEnd?.();
      }
    }
  };

// ============================================================================
// DIALOGUE PLAYBACK
// ============================================================================

export interface DialoguePlaybackLine {
  id: string;
  speaker: string;
  voice: VoiceProfile;
  text: string;
}

export interface DialoguePlaybackCallbacks {
  onLineStart?: (
    line: DialoguePlaybackLine,
    index: number
  ) => void;

  onLineEnd?: (
    line: DialoguePlaybackLine,
    index: number
  ) => void;

  onEnd?: () => void;
}

export const speakDialogue =
  async (
    lines: DialoguePlaybackLine[],
    rate = 0.9,
    callbacks?: DialoguePlaybackCallbacks
  ): Promise<void> => {
    if (
      typeof window ===
      'undefined'
    ) {
      callbacks?.onEnd?.();
      return;
    }

    const validLines =
      lines.filter(
        (line) =>
          Boolean(
            line.text?.trim()
          )
      );

    if (!validLines.length) {
      callbacks?.onEnd?.();
      return;
    }

    stopSpeaking();

    unlockAudio();

    const session =
      playbackSession;

    audioCurrentlyPlaying =
      true;

    try {
      for (
        let index = 0;
        index <
        validLines.length;
        index += 1
      ) {
        if (
          session !==
          playbackSession
        ) {
          return;
        }

        const line =
          validLines[index];

        callbacks?.onLineStart?.(
          line,
          index
        );

        const ok =
          await playTextInternal(
            line.text,
            line.voice,
            rate,
            session
          );

        if (
          !ok ||
          session !==
            playbackSession
        ) {
          return;
        }

        callbacks?.onLineEnd?.(
          line,
          index
        );

        // Deliberate micro-gap between speakers.
        await new Promise(
          (resolve) =>
            window.setTimeout(
              resolve,
              90
            )
        );
      }
    } finally {
      if (
        session ===
        playbackSession
      ) {
        audioCurrentlyPlaying =
          false;

        activeAudio = null;

        callbacks?.onEnd?.();
      }
    }
  };

// ============================================================================
// SOUND EFFECTS
// ============================================================================

export const playSoundEffect =
  (
    type:
      | 'correct'
      | 'wrong'
      | 'win'
      | 'click'
      | 'applause'
      | 'chime'
  ): void => {
    if (
      typeof window ===
      'undefined'
    ) {
      return;
    }

    try {
      const context =
        getAudioContext();

      if (!context) {
        return;
      }

      if (
        context.state ===
        'suspended'
      ) {
        void context
          .resume()
          .catch(
            () => undefined
          );
      }

      const now =
        context.currentTime;

      const gain =
        context.createGain();

      gain.connect(
        context.destination
      );

      if (type === 'click') {
        const oscillator =
          context.createOscillator();

        oscillator.type =
          'triangle';

        oscillator.frequency.setValueAtTime(
          600,
          now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          300,
          now + 0.04
        );

        oscillator.connect(
          gain
        );

        gain.gain.setValueAtTime(
          0.08,
          now
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.04
        );

        oscillator.start(now);
        oscillator.stop(
          now + 0.04
        );

        return;
      }

      if (type === 'correct') {
        const oscillator =
          context.createOscillator();

        oscillator.type =
          'sine';

        oscillator.frequency.setValueAtTime(
          523.25,
          now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          659.25,
          now + 0.1
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          783.99,
          now + 0.2
        );

        oscillator.connect(
          gain
        );

        gain.gain.setValueAtTime(
          0.18,
          now
        );

        gain.gain.exponentialRampToValueAtTime(
          0.01,
          now + 0.25
        );

        oscillator.start(now);
        oscillator.stop(
          now + 0.25
        );

        return;
      }

      if (type === 'wrong') {
        const oscillator =
          context.createOscillator();

        oscillator.type =
          'sawtooth';

        oscillator.frequency.setValueAtTime(
          280,
          now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          140,
          now + 0.2
        );

        oscillator.connect(
          gain
        );

        gain.gain.setValueAtTime(
          0.15,
          now
        );

        gain.gain.exponentialRampToValueAtTime(
          0.01,
          now + 0.22
        );

        oscillator.start(now);
        oscillator.stop(
          now + 0.22
        );

        return;
      }

      if (type === 'win') {
        [
          523.25,
          659.25,
          783.99,
          1046.5,
        ].forEach(
          (
            frequency,
            index
          ) => {
            const oscillator =
              context.createOscillator();

            const noteGain =
              context.createGain();

            const start =
              now +
              index * 0.08;

            oscillator.type =
              'triangle';

            oscillator.frequency.setValueAtTime(
              frequency,
              start
            );

            oscillator.connect(
              noteGain
            );

            noteGain.connect(
              context.destination
            );

            noteGain.gain.setValueAtTime(
              0.15,
              start
            );

            noteGain.gain.exponentialRampToValueAtTime(
              0.01,
              start + 0.2
            );

            oscillator.start(
              start
            );

            oscillator.stop(
              start + 0.2
            );
          }
        );

        return;
      }

      if (
        type === 'applause'
      ) {
        const oscillator =
          context.createOscillator();

        oscillator.type =
          'triangle';

        oscillator.frequency.setValueAtTime(
          740,
          now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          980,
          now + 0.12
        );

        oscillator.connect(
          gain
        );

        gain.gain.setValueAtTime(
          0.08,
          now
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.16
        );

        oscillator.start(now);

        oscillator.stop(
          now + 0.16
        );

        return;
      }

      if (type === 'chime') {
        const oscillator =
          context.createOscillator();

        oscillator.type =
          'sine';

        oscillator.frequency.setValueAtTime(
          880,
          now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          1760,
          now + 0.15
        );

        oscillator.connect(
          gain
        );

        gain.gain.setValueAtTime(
          0.1,
          now
        );

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.2
        );

        oscillator.start(now);

        oscillator.stop(
          now + 0.2
        );
      }
    } catch {
      // Sound effects are non-critical.
    }
  };