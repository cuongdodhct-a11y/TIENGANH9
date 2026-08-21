import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  ListeningDialogueLine,
  ListeningSection,
} from '../../types';

import {
  Volume2,
  Play,
  Pause,
  FileText,
  CheckCircle2,
  HelpCircle,
  Trophy,
  Users,
  Square,
} from 'lucide-react';

import {
  playSoundEffect,
  speakEnglish,
  speakDialogue,
  stopSpeaking,
  unlockBrowserSpeech,
  getPreferredVoice,
  VoiceProfile,
  DialoguePlaybackLine,
} from '../../utils/audioHelpers';

// ============================================================================
// PROPS
// ============================================================================

interface ListeningTabProps {
  listeningSection: ListeningSection;
  onSkillComplete: () => void;
}

// ============================================================================
// SPEAKER RESOLUTION
// ============================================================================

const resolveSpeakerVoice = (
  speaker: string
): VoiceProfile => {
  const normalized =
    speaker
      .toLowerCase()
      .trim();

  // Explicit male markers.
  const malePatterns = [
    'mr.',
    'mr ',
    'mister',
    'teacher',
    'dad',
    'father',
    'boy',
    'man',
    'david',
    'quang',
    'nam',
    'minh',
    'tom',
    'john',
    'jack',
  ];

  // Explicit female markers.
  const femalePatterns = [
    'ms.',
    'ms ',
    'mrs.',
    'mrs ',
    'miss',
    'mother',
    'mom',
    'girl',
    'woman',
    'emily',
    'mi',
    'lan',
    'anna',
    'mary',
  ];

  if (
    malePatterns.some(
      (pattern) =>
        normalized.includes(
          pattern
        )
    )
  ) {
    return 'male';
  }

  if (
    femalePatterns.some(
      (pattern) =>
        normalized.includes(
          pattern
        )
    )
  ) {
    return 'female';
  }

  // Default is female because Emily is the default teacher voice.
  return 'female';
};

// ============================================================================
// PARSE LEGACY TRANSCRIPT
// ============================================================================

const parseLegacyTranscript =
  (
    transcript: string
  ): DialoguePlaybackLine[] => {
    const lines =
      transcript
        .split(/\r?\n/)
        .map(
          (line) =>
            line.trim()
        )
        .filter(Boolean);

    const result: DialoguePlaybackLine[] =
      [];

    lines.forEach(
      (
        line,
        index
      ) => {
        const match =
          line.match(
            /^([^:]{1,60}):\s*(.+)$/
          );

        if (match) {
          const speaker =
            match[1].trim();

          const text =
            match[2].trim();

          result.push({
            id: `legacy-${index}`,
            speaker,
            voice:
              resolveSpeakerVoice(
                speaker
              ),
            text,
          });

          return;
        }

        // If no speaker label exists,
        // preserve the line and use the default voice.
        result.push({
          id: `line-${index}`,
          speaker: 'Narrator',
          voice: 'female',
          text: line,
        });
      }
    );

    return result;
  };

// ============================================================================
// BUILD DIALOGUE
// ============================================================================

const buildDialogue =
  (
    section: ListeningSection
  ): DialoguePlaybackLine[] => {
    if (
      section.dialogue &&
      section.dialogue.length
    ) {
      return section.dialogue
        .filter(
          (line) =>
            Boolean(
              line.text?.trim()
            )
        )
        .map(
          (line) => ({
            id: line.id,
            speaker:
              line.speaker,
            voice:
              line.voice,
            text:
              line.text,
          })
        );
    }

    return parseLegacyTranscript(
      section.transcriptText
    );
  };

// ============================================================================
// SPEAKER LABEL
// ============================================================================

const voiceLabel = (
  voice: VoiceProfile
): string =>
  voice === 'female'
    ? 'Cô Emily'
    : 'Thầy David';

const voiceIcon = (
  voice: VoiceProfile
): string =>
  voice === 'female'
    ? '👩‍🏫'
    : '👨‍🏫';

// ============================================================================
// COMPONENT
// ============================================================================

export const ListeningTab: React.FC<
  ListeningTabProps
> = ({
  listeningSection,
  onSkillComplete,
}) => {
  const [
    isPlayingDialogue,
    setIsPlayingDialogue,
  ] = useState(false);

  const [
    activeLineIndex,
    setActiveLineIndex,
  ] = useState(-1);

  const [
    activeSpeakingText,
    setActiveSpeakingText,
  ] = useState<string | null>(
    null
  );

  const [
    activeSpeakingVoice,
    setActiveSpeakingVoice,
  ] = useState<VoiceProfile | null>(
    null
  );

  const [
    showTranscript,
    setShowTranscript,
  ] = useState(false);

  const [
    showVietnamese,
    setShowVietnamese,
  ] = useState(false);

  const [
    userAnswers,
    setUserAnswers,
  ] = useState<
    Record<string, number>
  >({});

  const [
    fillAnswers,
    setFillAnswers,
  ] = useState<
    Record<string, string>
  >({});

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  const [
    score,
    setScore,
  ] = useState(0);

  // ========================================================================
  // DIALOGUE DATA
  // ========================================================================

  const dialogue =
    useMemo(
      () =>
        buildDialogue(
          listeningSection
        ),
      [listeningSection]
    );

  // ========================================================================
  // CLEANUP
  // ========================================================================

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // ========================================================================
  // PLAY SINGLE TEXT
  // ========================================================================

  const handleSpeakText = (
    text: string,
    voice?: VoiceProfile
  ) => {
    // Prime SpeechSynthesis synchronously inside the user's click/tap.
    // This improves fallback reliability in Cốc Cốc/Chromium.
    unlockBrowserSpeech();

    const voiceToUse =
      voice ||
      getPreferredVoice();

    playSoundEffect('click');

    if (
      activeSpeakingText === text &&
      activeSpeakingVoice ===
        voiceToUse
    ) {
      stopSpeaking();

      setActiveSpeakingText(
        null
      );

      setActiveSpeakingVoice(
        null
      );

      return;
    }

    setActiveSpeakingText(text);
    setActiveSpeakingVoice(
      voiceToUse
    );

    void speakEnglish(
      text,
      0.88,
      () => {
        setActiveSpeakingText(
          null
        );

        setActiveSpeakingVoice(
          null
        );
      },
      voiceToUse
    );
  };

  // ========================================================================
  // PLAY WHOLE DIALOGUE
  // ========================================================================

  const handlePlayDialogue =
    () => {
      // Prime SpeechSynthesis synchronously inside the user's click/tap.
      unlockBrowserSpeech();

      if (!dialogue.length) {
        return;
      }

      playSoundEffect('click');

      if (isPlayingDialogue) {
        stopSpeaking();

        setIsPlayingDialogue(
          false
        );

        setActiveLineIndex(
          -1
        );

        setActiveSpeakingText(
          null
        );

        setActiveSpeakingVoice(
          null
        );

        return;
      }

      setIsPlayingDialogue(
        true
      );

      setActiveLineIndex(0);

      void speakDialogue(
        dialogue,
        0.88,
        {
          onLineStart: (
            line,
            index
          ) => {
            setActiveLineIndex(
              index
            );

            setActiveSpeakingText(
              line.text
            );

            setActiveSpeakingVoice(
              line.voice
            );
          },

          onLineEnd: (
            _line,
            _index
          ) => {
            // The next line will update the UI.
          },

          onEnd: () => {
            setIsPlayingDialogue(
              false
            );

            setActiveLineIndex(
              -1
            );

            setActiveSpeakingText(
              null
            );

            setActiveSpeakingVoice(
              null
            );
          },
        }
      );
    };

  // ========================================================================
  // PLAY FULL TEXT WITH ONE VOICE
  // ========================================================================

  const handlePlayFullVoice = (
    voice: VoiceProfile
  ) => {
    // Prime SpeechSynthesis synchronously inside the user's click/tap.
    unlockBrowserSpeech();

    playSoundEffect('click');

    setActiveSpeakingText(
      listeningSection.transcriptText
    );

    setActiveSpeakingVoice(
      voice
    );

    void speakEnglish(
      listeningSection.transcriptText,
      0.88,
      () => {
        setActiveSpeakingText(
          null
        );

        setActiveSpeakingVoice(
          null
        );
      },
      voice
    );
  };

  // ========================================================================
  // SUBMIT
  // ========================================================================

  const handleSubmitListening =
    () => {
      let totalCorrect = 0;

      listeningSection.questions.forEach(
        (question) => {
          if (
            userAnswers[
              question.id
            ] ===
            question.correctAnswerIndex
          ) {
            totalCorrect += 1;
          }
        }
      );

      listeningSection.fillInBlankExercises?.forEach(
        (exercise) => {
          const answer =
            fillAnswers[
              exercise.id
            ];

          if (
            answer &&
            answer
              .trim()
              .toLowerCase() ===
              exercise.correctWord
                .trim()
                .toLowerCase()
          ) {
            totalCorrect += 1;
          }
        }
      );

      setScore(
        totalCorrect
      );

      setSubmitted(true);

      playSoundEffect(
        'correct'
      );

      onSkillComplete();
    };

  // ========================================================================
  // COUNTERS
  // ========================================================================

  const totalQuestions =
    listeningSection.questions
      .length +
    (
      listeningSection
        .fillInBlankExercises
        ?.length || 0
    );

  // ========================================================================
  // RENDER
  // ========================================================================

  return (
    <div className="space-y-8">

      {/* ================================================================
          AUDIO HEADER
      ================================================================ */}

      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">

              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-black">
                BÀI NGHE SGK TIẾNG ANH 9
              </span>

              <span className="text-xs text-slate-400">
                {listeningSection.audioDuration}
              </span>

            </div>

            <h3 className="text-2xl font-black">
              {listeningSection.audioTitle}
            </h3>

            <p className="text-sm text-slate-400 mt-2">
              {listeningSection.audioScriptSpeaker}
            </p>

          </div>

          {/* ============================================================
              MAIN CONTROLS
          ============================================================ */}

          <div className="flex flex-wrap gap-2">

            <button
              onClick={
                handlePlayDialogue
              }
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs transition-all ${
                isPlayingDialogue
                  ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-300/30'
                  : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:scale-105'
              }`}
            >
              {isPlayingDialogue ? (
                <>
                  <Pause className="w-4 h-4" />
                  Dừng hội thoại
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  ▶ Phát hội thoại
                </>
              )}
            </button>

            <button
              onClick={() =>
                handlePlayFullVoice(
                  'female'
                )
              }
              className="px-4 py-3 rounded-2xl bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs font-bold hover:bg-rose-500/25"
            >
              👩‍🏫 Cô Emily
            </button>

            <button
              onClick={() =>
                handlePlayFullVoice(
                  'male'
                )
              }
              className="px-4 py-3 rounded-2xl bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold hover:bg-blue-500/25"
            >
              👨‍🏫 Thầy David
            </button>

          </div>
        </div>

        {/* ================================================================
            STATUS
        ================================================================ */}

        <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl border border-slate-800">

          <div className="flex items-center gap-3">

            <div
              className={`p-3 rounded-xl ${
                isPlayingDialogue
                  ? 'bg-cyan-500 text-white animate-pulse'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {isPlayingDialogue ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <Square className="w-5 h-5" />
              )}
            </div>

            <div>
              <p className="text-xs font-bold text-slate-300">

                {isPlayingDialogue
                  ? activeLineIndex >=
                      0 &&
                    dialogue[
                      activeLineIndex
                    ]
                    ? `${voiceIcon(
                        dialogue[
                          activeLineIndex
                        ].voice
                      )} ${
                        dialogue[
                          activeLineIndex
                        ].speaker
                      } đang nói`
                    : 'Đang chuẩn bị...'
                  : 'Sẵn sàng phát bài nghe'}

              </p>

              <p className="text-[11px] text-slate-500">
                Hệ thống đọc tuần tự từng lượt thoại, không chồng âm.
              </p>
            </div>

          </div>

          <div className="hidden sm:flex items-center gap-1 h-6">

            {[
              30,
              65,
              45,
              85,
              55,
              75,
              40,
              90,
            ].map(
              (height, index) => (
                <div
                  key={index}
                  className={`w-1 rounded-full ${
                    isPlayingDialogue
                      ? 'bg-cyan-400 animate-pulse'
                      : 'bg-slate-700'
                  }`}
                  style={{
                    height: `${height}%`,
                  }}
                />
              )
            )}

          </div>

        </div>

        {/* ================================================================
            TRANSCRIPT BUTTON
        ================================================================ */}

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-800 pt-4">

          <button
            onClick={() =>
              setShowTranscript(
                (value) => !value
              )
            }
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-cyan-300 text-xs font-bold"
          >
            <FileText className="w-4 h-4" />

            {showTranscript
              ? 'Ẩn lời bài nghe'
              : 'Hiện lời bài nghe'}
          </button>

          {showTranscript && (
            <button
              onClick={() =>
                setShowVietnamese(
                  (value) => !value
                )
              }
              className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold"
            >
              {showVietnamese
                ? 'Ẩn dịch tiếng Việt'
                : 'Xem dịch tiếng Việt'}
            </button>
          )}

        </div>

        {/* ================================================================
            DIALOGUE TRANSCRIPT
        ================================================================ */}

        {showTranscript && (
          <div className="space-y-3">

            {dialogue.map(
              (
                line,
                index
              ) => {
                const active =
                  index ===
                  activeLineIndex;

                return (
                  <div
                    key={line.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      active
                        ? 'bg-slate-800 border-cyan-400 shadow-lg'
                        : 'bg-slate-950/50 border-slate-800'
                    }`}
                  >

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">

                      <div className="flex-1">

                        <div className="flex items-center gap-2 mb-2">

                          <span
                            className={`px-2 py-1 rounded-lg text-[10px] font-black ${
                              line.voice ===
                              'female'
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-blue-500/20 text-blue-300'
                            }`}
                          >
                            {voiceIcon(
                              line.voice
                            )}{' '}
                            {line.speaker}
                          </span>

                          {active && (
                            <span className="text-[10px] text-cyan-300 font-bold animate-pulse">
                              ĐANG PHÁT
                            </span>
                          )}

                        </div>

                        <p className="text-sm leading-relaxed text-slate-100">
                          {line.text}
                        </p>

                      </div>

                      <div className="flex gap-1 shrink-0">

                        <button
                          onClick={() =>
                            handleSpeakText(
                              line.text,
                              'female'
                            )
                          }
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                            activeSpeakingText ===
                              line.text &&
                            activeSpeakingVoice ===
                              'female'
                              ? 'bg-rose-500 text-white'
                              : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                          }`}
                        >
                          👩‍🏫
                        </button>

                        <button
                          onClick={() =>
                            handleSpeakText(
                              line.text,
                              'male'
                            )
                          }
                          className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                            activeSpeakingText ===
                              line.text &&
                            activeSpeakingVoice ===
                              'male'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                          }`}
                        >
                          👨‍🏫
                        </button>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

            {showVietnamese && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-sm leading-relaxed">

                <div className="font-black text-amber-300 mb-2">
                  Bản dịch tiếng Việt
                </div>

                <div className="whitespace-pre-line">
                  {
                    listeningSection.vietnameseTranslation
                  }
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* ================================================================
          EXERCISES
      ================================================================ */}

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">

        <div className="flex items-center justify-between border-b border-slate-100 pb-4">

          <div>
            <h4 className="text-lg font-black text-slate-900">
              Bài tập nghe hiểu
            </h4>

            <p className="text-xs text-slate-500 mt-1">
              Nghe câu hỏi, chọn đáp án và kiểm tra kết quả.
            </p>
          </div>

          {submitted && (
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-2 rounded-xl text-xs font-black">
              <Trophy className="w-4 h-4" />
              Đúng {score}/
              {totalQuestions}
            </div>
          )}

        </div>

        {/* ================================================================
            MULTIPLE CHOICE
        ================================================================ */}

        <div className="space-y-5">

          {listeningSection.questions.map(
            (
              question,
              questionIndex
            ) => {
              const selected =
                userAnswers[
                  question.id
                ];

              const correct =
                selected ===
                question.correctAnswerIndex;

              return (
                <div
                  key={question.id}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">

                    <p className="text-sm font-bold text-slate-800">
                      <span className="text-blue-600 mr-1">
                        Câu{' '}
                        {questionIndex +
                          1}
                        :
                      </span>

                      {question.question}
                    </p>

                    <div className="flex gap-1 shrink-0">

                      <button
                        onClick={() =>
                          handleSpeakText(
                            question.question,
                            'female'
                          )
                        }
                        className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold"
                      >
                        👩‍🏫
                      </button>

                      <button
                        onClick={() =>
                          handleSpeakText(
                            question.question,
                            'male'
                          )
                        }
                        className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold"
                      >
                        👨‍🏫
                      </button>

                    </div>

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                    {question.options.map(
                      (
                        option,
                        optionIndex
                      ) => {
                        const isSelected =
                          selected ===
                          optionIndex;

                        const isCorrect =
                          optionIndex ===
                          question.correctAnswerIndex;

                        let style =
                          'bg-white text-slate-700 border-slate-200 hover:bg-slate-100';

                        if (
                          submitted
                        ) {
                          if (
                            isCorrect
                          ) {
                            style =
                              'bg-emerald-600 text-white border-emerald-700';
                          } else if (
                            isSelected
                          ) {
                            style =
                              'bg-rose-600 text-white border-rose-700';
                          }
                        } else if (
                          isSelected
                        ) {
                          style =
                            'bg-blue-600 text-white border-blue-700';
                        }

                        return (
                          <div
                            key={
                              optionIndex
                            }
                            className={`p-3 rounded-xl border text-sm font-semibold flex items-center justify-between gap-2 cursor-pointer ${style}`}
                            onClick={() => {
                              if (
                                !submitted
                              ) {
                                setUserAnswers(
                                  (
                                    previous
                                  ) => ({
                                    ...previous,
                                    [question.id]:
                                      optionIndex,
                                  })
                                );
                              }
                            }}
                          >

                            <span>
                              {option}
                            </span>

                            <div className="flex gap-1 shrink-0">

                              <button
                                onClick={(
                                  event
                                ) => {
                                  event.stopPropagation();

                                  handleSpeakText(
                                    option,
                                    'female'
                                  );
                                }}
                                className="px-1.5 py-1 rounded-md bg-rose-50 text-rose-700"
                              >
                                👩‍🏫
                              </button>

                              <button
                                onClick={(
                                  event
                                ) => {
                                  event.stopPropagation();

                                  handleSpeakText(
                                    option,
                                    'male'
                                  );
                                }}
                                className="px-1.5 py-1 rounded-md bg-blue-50 text-blue-700"
                              >
                                👨‍🏫
                              </button>

                              {submitted &&
                                isCorrect && (
                                  <CheckCircle2 className="w-4 h-4 text-white" />
                                )}

                            </div>

                          </div>
                        );
                      }
                    )}

                  </div>

                  {submitted && (
                    <div
                      className={`p-4 rounded-xl text-xs ${
                        correct
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >

                      <div className="flex items-center justify-between gap-3">

                        <div>
                          <div className="font-black flex items-center gap-1">
                            <HelpCircle className="w-4 h-4" />
                            Giải thích
                          </div>

                          <p className="mt-2 leading-relaxed">
                            {
                              question.explanation
                            }
                          </p>
                        </div>

                        <div className="flex gap-1 shrink-0">

                          <button
                            onClick={() =>
                              handleSpeakText(
                                question.explanation,
                                'female'
                              )
                            }
                            className="px-2 py-1 rounded bg-white border border-rose-200 text-rose-700 font-bold"
                          >
                            👩‍🏫
                          </button>

                          <button
                            onClick={() =>
                              handleSpeakText(
                                question.explanation,
                                'male'
                              )
                            }
                            className="px-2 py-1 rounded bg-white border border-blue-200 text-blue-700 font-bold"
                          >
                            👨‍🏫
                          </button>

                        </div>

                      </div>

                    </div>
                  )}

                </div>
              );
            }
          )}

        </div>

        {/* ================================================================
            FILL IN BLANK
        ================================================================ */}

        {listeningSection.fillInBlankExercises?.map(
          (
            exercise,
            index
          ) => (
            <div
              key={exercise.id}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
            >

              <div className="flex items-center justify-between gap-3">

                <p className="text-sm font-black text-slate-800">
                  Điền từ thích hợp (
                  {index + 1}
                  )
                </p>

                <div className="flex gap-1">

                  <button
                    onClick={() =>
                      handleSpeakText(
                        exercise.sentenceWithBlank,
                        'female'
                      )
                    }
                    className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold"
                  >
                    👩‍🏫
                  </button>

                  <button
                    onClick={() =>
                      handleSpeakText(
                        exercise.sentenceWithBlank,
                        'male'
                      )
                    }
                    className="px-2 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold"
                  >
                    👨‍🏫
                  </button>

                </div>

              </div>

              <p className="p-4 bg-white rounded-xl border border-slate-200 text-sm font-medium">
                {
                  exercise.sentenceWithBlank
                }
              </p>

              <div className="flex flex-col sm:flex-row gap-3">

                <input
                  type="text"
                  value={
                    fillAnswers[
                      exercise.id
                    ] || ''
                  }
                  disabled={submitted}
                  onChange={(event) =>
                    setFillAnswers(
                      (
                        previous
                      ) => ({
                        ...previous,
                        [exercise.id]:
                          event.target.value,
                      })
                    )
                  }
                  placeholder="Nhập từ cần điền..."
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <span className="text-xs text-slate-500 self-center">
                  Gợi ý: {exercise.hint}
                </span>

              </div>

              {submitted && (
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs flex items-center justify-between gap-3">

                  <span>
                    Đáp án đúng:{' '}
                    <strong>
                      {
                        exercise.correctWord
                      }
                    </strong>
                  </span>

                  <div className="flex gap-1">

                    <button
                      onClick={() =>
                        handleSpeakText(
                          exercise.correctWord,
                          'female'
                        )
                      }
                      className="px-2 py-1 bg-white rounded border border-rose-200 text-rose-700"
                    >
                      👩‍🏫
                    </button>

                    <button
                      onClick={() =>
                        handleSpeakText(
                          exercise.correctWord,
                          'male'
                        )
                      }
                      className="px-2 py-1 bg-white rounded border border-blue-200 text-blue-700"
                    >
                      👨‍🏫
                    </button>

                  </div>

                </div>
              )}

            </div>
          )
        )}

        {/* ================================================================
            SUBMIT
        ================================================================ */}

        <div className="flex justify-end pt-2">

          {!submitted ? (
            <button
              onClick={
                handleSubmitListening
              }
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm"
            >
              Nộp bài luyện nghe
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(
                  false
                );

                setUserAnswers(
                  {}
                );

                setFillAnswers(
                  {}
                );

                setScore(0);
              }}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-sm"
            >
              Làm lại bài nghe
            </button>
          )}

        </div>

      </div>
    </div>
  );
};