// ============================================================================
// TIENGANH9 – APPLICATION AUDIO ENGINE
// ============================================================================
//
// Mục tiêu:
//
// 1. Một audio engine dùng chung toàn ứng dụng.
// 2. Gemini TTS là đường phát ƯU TIÊN.
// 3. Nếu Gemini hoạt động -> dùng giọng Gemini.
// 4. Nếu Gemini hết quota / 429 / lỗi mạng -> FALLBACK Browser Speech.
// 5. Browser Speech là phương án miễn phí, không tiêu tốn Gemini quota.
// 6. Cô Emily  = female.
// 7. Thầy David = male.
// 8. Một thời điểm chỉ có MỘT audio.
// 9. Bấm nút mới sẽ dừng audio cũ.
// 10. Cache audio Gemini đã tải.
// 11. Hạn chế gọi Gemini lặp lại khi gặp 429.
// 12. Hỗ trợ đọc hội thoại tuần tự theo vai.
// 13. Không để ứng dụng bị "câm" khi Gemini hết quota.
//
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

// Khi Gemini trả 429, không gọi lại liên tục.
// Sau khoảng thời gian này mới thử Gemini lại.
const GEMINI_COOLDOWN_MS = 45_000;

// ============================================================================
// VOICE PREFERENCE
// ============================================================================

let currentPreferredVoice: VoiceProfile =
  'female';

const geminiUnavailableUntil: Record<
  VoiceProfile,
  number
> = {
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
      // Ignore storage errors.
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
  if (!rawText) {
    return '';
  }

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

  // Remove markdown.
  text = text.replace(
    /[*_~`#>]/g,
    ' '
  );

  // Remove list markers.
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

    if (!s) {
      continue;
    }

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
      context.state === 'suspended'
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

// ============================================================================
// BROWSER SPEECH ENGINE
// ============================================================================
//
// Đây là phương án FALLBACK miễn phí.
//
// Khi Gemini TTS:
// - hết quota
// - trả 429
// - lỗi mạng
// - không trả audio
//
// ứng dụng sẽ tự động dùng SpeechSynthesis của trình duyệt.
//
// Không tiêu tốn Gemini API quota.
//
// ============================================================================

type BrowserVoice =
  SpeechSynthesisVoice;

let browserVoices: BrowserVoice[] = [];

let browserSpeechActive = false;

// -----------------------------------------------------------------------------
// LOAD / REFRESH BROWSER VOICES
// -----------------------------------------------------------------------------

const refreshBrowserVoices =
  (): BrowserVoice[] => {
    if (
      typeof window === 'undefined' ||
      !('speechSynthesis' in window)
    ) {
      return [];
    }

    try {
      browserVoices =
        window.speechSynthesis
          .getVoices() || [];
    } catch {
      browserVoices = [];
    }

    return browserVoices;
  };

// Browser có thể tải voice bất đồng bộ.
if (
  typeof window !== 'undefined' &&
  'speechSynthesis' in window
) {
  refreshBrowserVoices();

  window.speechSynthesis.addEventListener(
    'voiceschanged',
    () => {
      refreshBrowserVoices();
    }
  );
}

// -----------------------------------------------------------------------------
// FIND BEST ENGLISH VOICE
// -----------------------------------------------------------------------------

const getEnglishVoice = (
  profile: VoiceProfile
): BrowserVoice | null => {
  const voices =
    refreshBrowserVoices();

  if (!voices.length) {
    return null;
  }

  // Chỉ ưu tiên giọng tiếng Anh.
  const englishVoices =
    voices.filter((voice) =>
      /^en[-_]/i.test(
        voice.lang || ''
      )
    );

  const candidates =
    englishVoices.length
      ? englishVoices
      : voices;

  // Tên thường gặp cho giọng nữ.
  const femaleHints = [
    'samantha',
    'ava',
    'victoria',
    'karen',
    'moira',
    'tessa',
    'allison',
    'zira',
    'susan',
    'female',
  ];

  // Tên thường gặp cho giọng nam.
  const maleHints = [
    'david',
    'alex',
    'daniel',
    'fred',
    'tom',
    'george',
    'mark',
    'james',
    'male',
  ];

  const hints =
    profile === 'female'
      ? femaleHints
      : maleHints;

  const matched =
    candidates.find(
      (voice) => {
        const name =
          String(
            voice.name || ''
          ).toLowerCase();

        return hints.some(
          (hint) =>
            name.includes(hint)
        );
      }
    );

  return (
    matched ||
    candidates[0] ||
    null
  );
};

// -----------------------------------------------------------------------------
// BROWSER SPEECH
// -----------------------------------------------------------------------------

const speakWithBrowser = (
  text: string,
  voice: VoiceProfile,
  rate: number,
  session: number
): Promise<boolean> =>
  new Promise(
    (resolve) => {
      if (
        typeof window ===
          'undefined' ||
        !(
          'speechSynthesis' in
          window
        )
      ) {
        resolve(false);
        return;
      }

      if (
        session !==
        playbackSession
      ) {
        resolve(false);
        return;
      }

      try {
        const synth =
          window.speechSynthesis;

        // Dừng mọi câu Browser Speech cũ.
        synth.cancel();

        const utterance =
          new SpeechSynthesisUtterance(
            text
          );

        const selectedVoice =
          getEnglishVoice(
            voice
          );

        if (selectedVoice) {
          utterance.voice =
            selectedVoice;

          utterance.lang =
            selectedVoice.lang ||
            'en-US';
        } else {
          // Nếu trình duyệt chưa có
          // voice cụ thể, vẫn yêu cầu
          // tiếng Anh.
          utterance.lang =
            'en-US';
        }

        utterance.rate =
          Math.max(
            0.75,
            Math.min(
              rate,
              1.05
            )
          );

        utterance.pitch =
          voice === 'female'
            ? 1.05
            : 0.92;

        utterance.volume = 1;

        let settled = false;

        const finish = (
          success: boolean
        ) => {
          if (settled) {
            return;
          }

          settled = true;

          utterance.onend =
            null;

          utterance.onerror =
            null;

          utterance.onpause =
            null;

          utterance.onresume =
            null;

          browserSpeechActive =
            false;

          resolve(success);
        };

        utterance.onend =
          () => {
            finish(true);
          };

        utterance.onerror =
          () => {
            finish(false);
          };

        browserSpeechActive =
          true;

        synth.speak(
          utterance
        );
      } catch {
        browserSpeechActive =
          false;

        resolve(false);
      }
    }
  );

// -----------------------------------------------------------------------------
// BACKWARD-COMPATIBLE UNLOCK
// -----------------------------------------------------------------------------
//
// Một số component cũ có thể vẫn import hàm này.
// Giữ export để không gây lỗi build.
//
// -----------------------------------------------------------------------------

export const unlockBrowserSpeech =
  (): void => {
    try {
      if (
        typeof window ===
          'undefined' ||
        !(
          'speechSynthesis' in
          window
        )
      ) {
        return;
      }

      refreshBrowserVoices();

      // Không đọc ở đây.
      // Chỉ chuẩn bị Browser Speech.
      window.speechSynthesis
        .cancel();
    } catch {
      // Ignore.
    }
  };

// ============================================================================
// GLOBAL PLAYBACK STATE
// ============================================================================

let activeAudio:
  | HTMLAudioElement
  | null = null;

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
  )}&text=${encodeURIComponent(
    text
  )}`;

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

  clientAudioCache.delete(
    key
  );

  clientAudioCache.set(
    key,
    url
  );

  while (
    clientAudioCache.size >
    CLIENT_CACHE_LIMIT
  ) {
    const oldestKey =
      clientAudioCache
        .keys()
        .next()
        .value as
        | string
        | undefined;

    if (!oldestKey) {
      break;
    }

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
    // Tăng session để mọi audio
    // đang chờ phải dừng.
    playbackSession += 1;

    audioCurrentlyPlaying =
      false;

    // Dừng Browser Speech.
    if (
      typeof window !==
        'undefined' &&
      'speechSynthesis' in
        window
    ) {
      try {
        window.speechSynthesis
          .cancel();
      } catch {
        // Ignore.
      }
    }

    browserSpeechActive =
      false;

    // Dừng Gemini HTMLAudio.
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

// ============================================================================
// ENGINE STATUS
// ============================================================================

export const isTeacherVoiceEngineAvailable =
  (
    voice: VoiceProfile =
      currentPreferredVoice
  ): boolean =>
    Date.now() >=
    geminiUnavailableUntil[
      voice
    ];

// ============================================================================
// FETCH / CACHE ONE GEMINI AUDIO
// ============================================================================

const loadAudioUrl = async (
  text: string,
  voice: VoiceProfile
): Promise<string | null> => {
  const cleanText =
    sanitizeTextForTTS(
      text
    );

  if (!cleanText) {
    return null;
  }

  const key =
    cacheKey(
      cleanText,
      voice
    );

  // --------------------------------------------------------------------------
  // CACHE HIT
  // --------------------------------------------------------------------------

  const cached =
    clientAudioCache.get(
      key
    );

  if (cached) {
    return cached;
  }

  // --------------------------------------------------------------------------
  // EXISTING REQUEST
  // --------------------------------------------------------------------------

  const existing =
    clientPreloadPromises.get(
      key
    );

  if (existing) {
    return await existing;
  }

  // --------------------------------------------------------------------------
  // CREATE REQUEST
  // --------------------------------------------------------------------------

  const promise =
    (async () => {
      try {
        // Nếu Gemini vừa trả 429,
        // không tiếp tục spam API.
        if (
          Date.now() <
          geminiUnavailableUntil[
            voice
          ]
        ) {
          return null;
        }

        console.log(
          `[TTS] Request Gemini for ${voice} voice`
        );

        const response =
          await fetch(
            buildTtsUrl(
              cleanText,
              voice
            ),
            {
              method: 'GET',

              // Không để browser cache
              // response lỗi.
              cache: 'no-store',
            }
          );

        // --------------------------------------------------------------------
        // GEMINI ERROR
        // --------------------------------------------------------------------

        if (!response.ok) {
          let serverMessage =
            '';

          try {
            const body =
              await response
                .clone()
                .json();

            serverMessage =
              String(
                body?.error ||
                ''
              );
          } catch {
            // Response may not be JSON.
          }

          console.warn(
            `[TTS] Gemini unavailable (${response.status}).`,
            serverMessage ||
              'Using Browser Speech fallback.'
          );

          // Với 429 hoặc lỗi server,
          // cooldown Gemini.
          if (
            response.status ===
              429 ||
            response.status >=
              500
          ) {
            geminiUnavailableUntil[
              voice
            ] =
              Date.now() +
              GEMINI_COOLDOWN_MS;
          }

          return null;
        }

        // --------------------------------------------------------------------
        // AUDIO BLOB
        // --------------------------------------------------------------------

        const blob =
          await response.blob();

        if (!blob.size) {
          console.warn(
            '[TTS] Gemini returned empty audio. ' +
            'Using Browser Speech fallback.'
          );

          geminiUnavailableUntil[
            voice
          ] =
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

        console.log(
          `[TTS] Gemini audio ready (${voice})`
        );

        return url;
      } catch (error) {
        console.warn(
          '[TTS] Gemini network error. ' +
          'Using Browser Speech fallback.',
          error
        );

        geminiUnavailableUntil[
          voice
        ] =
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
//
// Gemini còn quota:
//   -> preload audio.
//
// Gemini hết quota:
//   -> không coi đó là lỗi nghiêm trọng.
//   -> Browser Speech không cần preload.
//   -> trả true để UI không báo lỗi.
// ============================================================================

export const preloadSpeech =
  async (
    text: string,
    customVoice?: VoiceProfile
  ): Promise<boolean> => {
    const cleanText =
      sanitizeTextForTTS(
        text
      );

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
        // Gemini unavailable.
        //
        // Browser Speech không cần
        // preload audio.
        //
        // Vì vậy coi preload là thành công
        // ở cấp độ ứng dụng.
        return true;
      }
    }

    return true;
  };

// ============================================================================
// PLAY GEMINI AUDIO ONE CHUNK
// ============================================================================

const playGeminiChunk = (
  url: string,
  rate: number,
  session: number
): Promise<boolean> =>
  new Promise(
    (resolve) => {
      if (
        typeof window ===
          'undefined' ||
        session !==
          playbackSession
      ) {
        resolve(false);
        return;
      }

      const audio =
        new Audio();

      audio.preload =
        'auto';

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

      activeAudio =
        audio;

      let settled = false;

      const finish = (
        success: boolean
      ) => {
        if (settled) {
          return;
        }

        settled = true;

        audio.onended =
          null;

        audio.onerror =
          null;

        audio.onabort =
          null;

        if (
          activeAudio ===
          audio
        ) {
          activeAudio =
            null;
        }

        resolve(success);
      };

      audio.onended =
        () => {
          finish(true);
        };

      audio.onerror =
        () => {
          finish(false);
        };

      audio.onabort =
        () => {
          finish(false);
        };

      try {
        const playPromise =
          audio.play();

        if (
          playPromise &&
          typeof playPromise
            .catch ===
            'function'
        ) {
          playPromise.catch(
            () => {
              finish(false);
            }
          );
        }
      } catch {
        finish(false);
      }
    }
  );

// ============================================================================
// PLAY ONE CHUNK
// ============================================================================
//
// Chiến lược:
//
// 1. Thử Gemini.
// 2. Nếu Gemini có audio -> phát Gemini.
// 3. Nếu Gemini 429/quota/error -> Browser Speech.
// 4. Nếu Browser Speech cũng lỗi -> false.
//
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
        typeof window ===
          'undefined' ||
        session !==
          playbackSession
      ) {
        resolve(false);
        return;
      }

      const cleanText =
        sanitizeTextForTTS(
          text
        );

      if (!cleanText) {
        resolve(true);
        return;
      }

      // ----------------------------------------------------------------------
      // TRY GEMINI
      // ----------------------------------------------------------------------

      const url =
        await loadAudioUrl(
          cleanText,
          voice
        );

      // ----------------------------------------------------------------------
      // GEMINI UNAVAILABLE
      // -> FREE BROWSER FALLBACK
      // ----------------------------------------------------------------------

      if (!url) {
        console.warn(
          `[TTS] Gemini unavailable -> Browser Speech fallback (${voice})`
        );

        const browserOk =
          await speakWithBrowser(
            cleanText,
            voice,
            rate,
            session
          );

        resolve(
          browserOk
        );

        return;
      }

      // Session có thể đã bị thay đổi
      // trong lúc chờ fetch.
      if (
        session !==
        playbackSession
      ) {
        resolve(false);
        return;
      }

      // ----------------------------------------------------------------------
      // PLAY GEMINI AUDIO
      // ----------------------------------------------------------------------

      const geminiOk =
        await playGeminiChunk(
          url,
          rate,
          session
        );

      if (geminiOk) {
        resolve(true);
        return;
      }

      // ----------------------------------------------------------------------
      // GEMINI AUDIO PLAY FAILED
      // -> FALLBACK BROWSER
      // ----------------------------------------------------------------------

      console.warn(
        '[TTS] Gemini audio playback failed -> Browser Speech fallback.'
      );

      if (
        session !==
        playbackSession
      ) {
        resolve(false);
        return;
      }

      const browserOk =
        await speakWithBrowser(
          cleanText,
          voice,
          rate,
          session
        );

      resolve(
        browserOk
      );
    }
  );

// ============================================================================
// PLAY INTERNAL TEXT
// ============================================================================

const playTextInternal =
  async (
    text: string,
    voice: VoiceProfile,
    rate: number,
    session: number
  ): Promise<boolean> => {
    const chunks =
      splitTextIntoChunks(
        sanitizeTextForTTS(
          text
        )
      );

    if (!chunks.length) {
      return true;
    }

    for (
      let index = 0;
      index <
      chunks.length;
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

      // Khoảng nghỉ nhỏ giữa các chunk.
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
      sanitizeTextForTTS(
        text
      );

    if (!cleanText) {
      onEnd?.();
      return;
    }

    // Dừng audio trước.
    stopSpeaking();

    // Mở khóa audio.
    unlockAudio();

    // Chuẩn bị Browser Speech.
    unlockBrowserSpeech();

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

        activeAudio =
          null;

        browserSpeechActive =
          false;

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

    if (
      !validLines.length
    ) {
      callbacks?.onEnd?.();
      return;
    }

    // Dừng audio cũ.
    stopSpeaking();

    // Mở khóa audio.
    unlockAudio();

    // Chuẩn bị Browser Speech.
    unlockBrowserSpeech();

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

        // Khoảng nghỉ giữa hai người nói.
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

        activeAudio =
          null;

        browserSpeechActive =
          false;

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

      // ----------------------------------------------------------------------
      // CLICK
      // ----------------------------------------------------------------------

      if (
        type === 'click'
      ) {
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

      // ----------------------------------------------------------------------
      // CORRECT
      // ----------------------------------------------------------------------

      if (
        type === 'correct'
      ) {
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

      // ----------------------------------------------------------------------
      // WRONG
      // ----------------------------------------------------------------------

      if (
        type === 'wrong'
      ) {
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

      // ----------------------------------------------------------------------
      // WIN
      // ----------------------------------------------------------------------

      if (
        type === 'win'
      ) {
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

      // ----------------------------------------------------------------------
      // APPLAUSE / SUCCESS
      // ----------------------------------------------------------------------

      if (
        type ===
        'applause'
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

      // ----------------------------------------------------------------------
      // CHIME
      // ----------------------------------------------------------------------

      if (
        type === 'chime'
      ) {
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

        return;
      }
    } catch {
      // Sound effects are non-critical.
    }
  };

// ============================================================================
// END OF AUDIO ENGINE
// ============================================================================