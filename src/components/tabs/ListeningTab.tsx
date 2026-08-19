import React, { useState, useEffect } from 'react';
import { ListeningSection } from '../../types';
import { Volume2, Play, Pause, FileText, CheckCircle2, HelpCircle, Trophy } from 'lucide-react';
import { playSoundEffect, speakEnglish, stopSpeaking, getPreferredVoice, VoiceProfile } from '../../utils/audioHelpers';

interface ListeningTabProps {
  listeningSection: ListeningSection;
  onSkillComplete: () => void;
}

export const ListeningTab: React.FC<ListeningTabProps> = ({ listeningSection, onSkillComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVoice, setActiveVoice] = useState<VoiceProfile | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(false);

  // Granular speech state
  const [activeSpeakingText, setActiveSpeakingText] = useState<string | null>(null);
  const [activeSpeakingVoice, setActiveSpeakingVoice] = useState<VoiceProfile | null>(null);

  // Exercise state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Stop audio on unmount or tab switch
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleSpeakGranular = (text: string, forcedVoice?: VoiceProfile) => {
    playSoundEffect('click');
    const voiceToUse = forcedVoice || getPreferredVoice();

    if (activeSpeakingText === text && activeSpeakingVoice === voiceToUse) {
      stopSpeaking();
      setActiveSpeakingText(null);
      setActiveSpeakingVoice(null);
    } else {
      setActiveSpeakingText(text);
      setActiveSpeakingVoice(voiceToUse);
      speakEnglish(
        text,
        0.9,
        () => {
          setActiveSpeakingText(null);
          setActiveSpeakingVoice(null);
        },
        voiceToUse
      );
    }
  };

  const handlePlayFullAudio = (forcedVoice?: VoiceProfile) => {
    playSoundEffect('click');
    const voiceToPlay = forcedVoice || getPreferredVoice();
    if (isPlaying && activeVoice === voiceToPlay) {
      stopSpeaking();
      setIsPlaying(false);
      setActiveVoice(null);
    } else {
      setIsPlaying(true);
      setActiveVoice(voiceToPlay);
      speakEnglish(
        listeningSection.transcriptText,
        0.88,
        () => {
          setIsPlaying(false);
          setActiveVoice(null);
        },
        voiceToPlay
      );
    }
  };

  const handleSubmitListening = () => {
    let totalCorrect = 0;

    // Grade MC questions
    listeningSection.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        totalCorrect++;
      }
    });

    // Grade fill questions
    if (listeningSection.fillInBlankExercises) {
      listeningSection.fillInBlankExercises.forEach((f) => {
        if (
          fillAnswers[f.id] &&
          fillAnswers[f.id].trim().toLowerCase() === f.correctWord.toLowerCase()
        ) {
          totalCorrect++;
        }
      });
    }

    setScore(totalCorrect);
    setSubmitted(true);
    playSoundEffect('correct');
    onSkillComplete();
  };

  const totalQuestions =
    listeningSection.questions.length + (listeningSection.fillInBlankExercises?.length || 0);

  // Helper to extract lines from transcript
  const getTranscriptLines = () => {
    return listeningSection.transcriptText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  };

  return (
    <div className="space-y-8">
      {/* Audio Player Header Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-black uppercase tracking-wider">
                Bài Nghe SGK Tiếng Anh 9
              </span>
              <span className="text-xs text-slate-400 font-medium">Thời lượng: ~2-3 phút</span>
            </div>
            <h3 className="text-2xl font-black text-white">{listeningSection.title}</h3>
            <p className="text-sm text-slate-300 max-w-xl">{listeningSection.audioDescription}</p>
          </div>

          {/* Teacher Voice Buttons for Full Audio */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={() => handlePlayFullAudio('female')}
              className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl font-black text-xs shadow-lg transition-all ${
                isPlaying && activeVoice === 'female'
                  ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white ring-4 ring-rose-400/50 animate-pulse scale-105'
                  : 'bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/40'
              }`}
              title="Nghe Cô Emily đọc toàn bộ bài nghe"
            >
              <span className="text-base">👩‍🏫</span>
              <span>{isPlaying && activeVoice === 'female' ? 'Cô Emily đang đọc...' : 'Cô Emily đọc toàn bài'}</span>
              {isPlaying && activeVoice === 'female' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>

            <button
              onClick={() => handlePlayFullAudio('male')}
              className={`flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl font-black text-xs shadow-lg transition-all ${
                isPlaying && activeVoice === 'male'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white ring-4 ring-cyan-400/50 animate-pulse scale-105'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40'
              }`}
              title="Nghe Thầy David đọc toàn bộ bài nghe"
            >
              <span className="text-base">👨‍🏫</span>
              <span>{isPlaying && activeVoice === 'male' ? 'Thầy David đang đọc...' : 'Thầy David đọc toàn bài'}</span>
              {isPlaying && activeVoice === 'male' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
          </div>
        </div>

        {/* Audio Wave & Status Indicator */}
        <div className="flex items-center justify-between bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center space-x-3">
            <div
              className={`p-3 rounded-xl ${
                isPlaying ? 'bg-cyan-500 text-white animate-pulse' : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-300">
                {isPlaying
                  ? `Đang phát âm thanh (${activeVoice === 'female' ? '👩‍🏫 Cô Emily' : '👨‍🏫 Thầy David'})`
                  : 'Sẵn sàng phát âm thanh (Chất lượng bản ngữ US Native)'}
              </p>
              <p className="text-[11px] text-slate-500">Bấm từng câu bên dưới để nghe phát âm chi tiết</p>
            </div>
          </div>

          {/* Equalizer Visualizer */}
          <div className="flex items-end space-x-1 h-6">
            {[40, 70, 30, 90, 60, 80, 45, 95, 50, 75].map((height, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-150 ${
                  isPlaying ? 'bg-gradient-to-t from-cyan-500 to-blue-400 animate-pulse' : 'bg-slate-800'
                }`}
                style={{
                  height: isPlaying ? `${(height * (i % 2 === 0 ? 0.9 : 1.1)) % 100}%` : '20%',
                }}
              />
            ))}
          </div>
        </div>

        {/* Transcript Toggle */}
        <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center space-x-1.5 text-xs font-bold text-blue-300 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 transition-colors"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>{showTranscript ? 'Ẩn Lời Bài Nghe (Transcript)' : 'Hiện Lời Bài Nghe (Transcript)'}</span>
          </button>

          {showTranscript && (
            <button
              onClick={() => setShowVietnamese(!showVietnamese)}
              className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg"
            >
              {showVietnamese ? 'Tắt Dịch Tiếng Việt' : 'Xem Dịch Tiếng Việt'}
            </button>
          )}
        </div>

        {/* Transcript Box with Sentence-by-Sentence Audio */}
        {showTranscript && (
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm leading-relaxed space-y-3 font-sans">
            <div className="space-y-2">
              {getTranscriptLines().map((line, lIdx) => {
                const isLineActive = activeSpeakingText === line;
                return (
                  <div
                    key={lIdx}
                    className={`p-2.5 rounded-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                      isLineActive ? 'bg-slate-900 border border-cyan-500 shadow-md' : 'hover:bg-slate-700/60'
                    }`}
                  >
                    <p className="text-slate-100 font-medium italic">{line}</p>
                    <div className="flex items-center space-x-1 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleSpeakGranular(line, 'female')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          isLineActive && activeSpeakingVoice === 'female'
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-700 hover:bg-rose-900/50 text-rose-300 border border-rose-500/30'
                        }`}
                        title="Cô Emily đọc câu này"
                      >
                        👩‍🏫 Cô Emily
                      </button>
                      <button
                        onClick={() => handleSpeakGranular(line, 'male')}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                          isLineActive && activeSpeakingVoice === 'male'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 hover:bg-blue-900/50 text-cyan-300 border border-cyan-500/30'
                        }`}
                        title="Thầy David đọc câu này"
                      >
                        👨‍🏫 Thầy David
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {showVietnamese && (
              <div className="pt-3 border-t border-slate-700/80 text-amber-200 text-xs leading-relaxed">
                <p className="font-bold text-amber-300 mb-1">Bản Dịch Tiếng Việt:</p>
                <p className="whitespace-pre-line">{listeningSection.vietnameseTranslation}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Listening Comprehension Exercises */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Bài Tập Đọc Hiểu - Nghe SGK 9</h4>
            <p className="text-xs text-slate-500">Nghe phát âm từng câu hỏi và trả lời các bài tập bên dưới</p>
          </div>
          {submitted && (
            <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-xl">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span>
                Đúng {score}/{totalQuestions} câu
              </span>
            </div>
          )}
        </div>

        {/* Multiple Choice Questions with Granular Audio */}
        <div className="space-y-6">
          {listeningSection.questions.map((q, qIdx) => {
            const isUserCorrect = userAnswers[q.id] === q.correctAnswerIndex;
            const isQuestionSpeaking = activeSpeakingText === q.question;

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-sm">
                {/* Question Row with Dual Teacher Audio Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
                  <p className="text-sm font-bold text-slate-800 leading-snug">
                    <span className="text-blue-600 font-black mr-1">Câu {qIdx + 1}:</span> {q.question}
                  </p>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => handleSpeakGranular(q.question, 'female')}
                      className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        isQuestionSpeaking && activeSpeakingVoice === 'female'
                          ? 'bg-rose-500 text-white ring-2 ring-rose-300 animate-pulse'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      }`}
                      title="Cô Emily đọc câu hỏi này"
                    >
                      <span>👩‍🏫</span>
                      <span>{isQuestionSpeaking && activeSpeakingVoice === 'female' ? 'Đang đọc...' : 'Cô Emily'}</span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleSpeakGranular(q.question, 'male')}
                      className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        isQuestionSpeaking && activeSpeakingVoice === 'male'
                          ? 'bg-blue-600 text-white ring-2 ring-blue-300 animate-pulse'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                      }`}
                      title="Thầy David đọc câu hỏi này"
                    >
                      <span>👨‍🏫</span>
                      <span>{isQuestionSpeaking && activeSpeakingVoice === 'male' ? 'Đang đọc...' : 'Thầy David'}</span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Options with Option-level Audio Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctAnswerIndex;
                    const isOptSpeaking = activeSpeakingText === opt;

                    let style = 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200';
                    if (submitted) {
                      if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-700';
                      else if (isSelected) style = 'bg-rose-600 text-white border-rose-700';
                    } else if (isSelected) {
                      style = 'bg-blue-600 text-white border-blue-700 shadow-sm';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() =>
                          !submitted && setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                        }
                        className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border text-left flex items-center justify-between transition-all cursor-pointer ${style}`}
                      >
                        <span className="pr-2">{opt}</span>

                        <div className="flex items-center space-x-1 shrink-0">
                          {/* Option Audio Listen Buttons */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakGranular(opt, 'female');
                            }}
                            className={`p-1 rounded-md text-[10px] transition-all ${
                              isOptSpeaking && activeSpeakingVoice === 'female'
                                ? 'bg-rose-500 text-white'
                                : isSelected && !submitted
                                ? 'bg-blue-700 text-white hover:bg-blue-800'
                                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                            }`}
                            title="Nghe Cô Emily phát âm phương án này"
                          >
                            👩‍🏫
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakGranular(opt, 'male');
                            }}
                            className={`p-1 rounded-md text-[10px] transition-all ${
                              isOptSpeaking && activeSpeakingVoice === 'male'
                                ? 'bg-blue-600 text-white'
                                : isSelected && !submitted
                                ? 'bg-blue-700 text-white hover:bg-blue-800'
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                            }`}
                            title="Nghe Thầy David phát âm phương án này"
                          >
                            👨‍🏫
                          </button>

                          {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-white ml-1" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                      isUserCorrect
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold flex items-center space-x-1">
                        <HelpCircle className="w-4 h-4" />
                        <span>Giải thích:</span>
                      </p>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleSpeakGranular(q.explanation, 'female')}
                          className="px-2 py-0.5 rounded bg-white text-rose-700 border border-rose-200 text-[10px] font-bold"
                          title="Cô Emily đọc giải thích"
                        >
                          👩‍🏫 Nghe giải thích
                        </button>
                        <button
                          onClick={() => handleSpeakGranular(q.explanation, 'male')}
                          className="px-2 py-0.5 rounded bg-white text-blue-700 border border-blue-200 text-[10px] font-bold"
                          title="Thầy David đọc giải thích"
                        >
                          👨‍🏫 Nghe giải thích
                        </button>
                      </div>
                    </div>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Fill in Blank Exercises with Granular Audio */}
          {listeningSection.fillInBlankExercises &&
            listeningSection.fillInBlankExercises.map((fillEx, fIdx) => {
              const isSentSpeaking = activeSpeakingText === fillEx.sentenceWithBlank;
              return (
                <div key={fillEx.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-800">
                      Điền từ thích hợp vào chỗ trống ({fIdx + 1}):
                    </p>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleSpeakGranular(fillEx.sentenceWithBlank, 'female')}
                        className={`flex items-center space-x-1 px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                          isSentSpeaking && activeSpeakingVoice === 'female'
                            ? 'bg-rose-500 text-white'
                            : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                        }`}
                        title="Cô Emily đọc câu này"
                      >
                        <span>👩‍🏫 Cô Emily</span>
                        <Volume2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleSpeakGranular(fillEx.sentenceWithBlank, 'male')}
                        className={`flex items-center space-x-1 px-2 py-0.5 rounded-lg text-xs font-bold transition-all ${
                          isSentSpeaking && activeSpeakingVoice === 'male'
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'
                        }`}
                        title="Thầy David đọc câu này"
                      >
                        <span>👨‍🏫 Thầy David</span>
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm font-medium text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                    {fillEx.sentenceWithBlank}
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <input
                      type="text"
                      value={fillAnswers[fillEx.id] || ''}
                      onChange={(e) =>
                        !submitted &&
                        setFillAnswers((prev) => ({ ...prev, [fillEx.id]: e.target.value }))
                      }
                      placeholder="Gõ từ cần điền..."
                      disabled={submitted}
                      className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                    <span className="text-xs text-slate-400 italic">Gợi ý: {fillEx.hint}</span>
                  </div>

                  {submitted && (
                    <div className="p-3 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs flex items-center justify-between">
                      <div>
                        Đáp án đúng: <strong className="text-blue-700 text-sm">{fillEx.correctWord}</strong>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleSpeakGranular(fillEx.correctWord, 'female')}
                          className="px-2 py-1 rounded bg-white text-rose-700 border border-rose-200 font-bold text-[10px]"
                          title="Cô Emily phát âm từ này"
                        >
                          👩‍🏫 {fillEx.correctWord}
                        </button>
                        <button
                          onClick={() => handleSpeakGranular(fillEx.correctWord, 'male')}
                          className="px-2 py-1 rounded bg-white text-blue-700 border border-blue-200 font-bold text-[10px]"
                          title="Thầy David phát âm từ này"
                        >
                          👨‍🏫 {fillEx.correctWord}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          {!submitted ? (
            <button
              onClick={handleSubmitListening}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Nộp Bài Luyện Nghe
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(false);
                setUserAnswers({});
                setFillAnswers({});
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all"
            >
              Làm Lại Bài Nghe
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
