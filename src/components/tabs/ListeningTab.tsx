import React, { useState } from 'react';
import { ListeningSection } from '../../types';
import { Headphones, Play, Pause, FileText, CheckCircle2, HelpCircle, Trophy } from 'lucide-react';
import { speakEnglish, playSoundEffect, stopSpeaking } from '../../utils/audioHelpers';

interface ListeningTabProps {
  listeningSection: ListeningSection;
  onSkillComplete: () => void;
}

export const ListeningTab: React.FC<ListeningTabProps> = ({ listeningSection, onSkillComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showVietnamese, setShowVietnamese] = useState(false);

  // Exercise state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handlePlayAudio = () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakEnglish(listeningSection.transcriptText, 0.85, () => {
        setIsPlaying(false);
      });
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

  return (
    <div className="space-y-8">
      {/* Audio Player Card */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/30">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">{listeningSection.audioTitle}</h3>
              <p className="text-xs text-blue-300">
                Người nói: {listeningSection.audioScriptSpeaker} • Thời lượng: {listeningSection.audioDuration}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePlayAudio}
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-900'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/40'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isPlaying ? 'Tạm Dừng Audio' : 'Phát Nghe Tiếng Anh'}</span>
            </button>
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

        {/* Transcript Box */}
        {showTranscript && (
          <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 text-sm leading-relaxed space-y-3 font-sans">
            <p className="text-slate-100 italic whitespace-pre-line">{listeningSection.transcriptText}</p>
            {showVietnamese && (
              <div className="pt-3 border-t border-slate-700/80 text-amber-200 text-xs leading-relaxed">
                <p className="font-bold text-amber-300 mb-1">Bản Dịch Tiếng Việt:</p>
                <p>{listeningSection.vietnameseTranslation}</p>
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
            <p className="text-xs text-slate-500">Nghe đoạn hội thoại trên và trả lời các câu hỏi bên dưới</p>
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

        {/* Multiple Choice Questions */}
        <div className="space-y-6">
          {listeningSection.questions.map((q, qIdx) => {
            const isUserCorrect = userAnswers[q.id] === q.correctAnswerIndex;

            return (
              <div key={q.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-sm font-bold text-slate-800">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctAnswerIndex;

                    let style = 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200';
                    if (submitted) {
                      if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-700';
                      else if (isSelected) style = 'bg-rose-600 text-white border-rose-700';
                    } else if (isSelected) {
                      style = 'bg-blue-600 text-white border-blue-700';
                    }

                    return (
                      <button
                        key={optIdx}
                        onClick={() =>
                          !submitted && setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                        }
                        disabled={submitted}
                        className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border text-left flex items-center justify-between transition-all ${style}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      isUserCorrect
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    <p className="font-bold flex items-center space-x-1">
                      <HelpCircle className="w-4 h-4" />
                      <span>Giải thích:</span>
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Fill in Blank Exercises */}
          {listeningSection.fillInBlankExercises &&
            listeningSection.fillInBlankExercises.map((fillEx, fIdx) => (
              <div key={fillEx.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="text-sm font-bold text-slate-800">
                  Điền từ thích hợp vào chỗ trống ({fIdx + 1}):
                </p>
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
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-900 border border-blue-200 text-xs">
                    Đáp án đúng: <strong className="text-blue-700">{fillEx.correctWord}</strong>
                  </div>
                )}
              </div>
            ))}
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
