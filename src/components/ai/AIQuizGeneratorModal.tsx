import React, { useState } from 'react';
import { SlidersHorizontal, Sparkles, RefreshCw, Trophy, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { GRADE_9_UNITS } from '../../data/grade9Units';
import { playSoundEffect } from '../../utils/audioHelpers';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const AIQuizGeneratorModal: React.FC<{ onAddPoints: (pts: number) => void }> = ({ onAddPoints }) => {
  const [selectedUnitId, setSelectedUnitId] = useState<number>(1);
  const [difficulty, setDifficulty] = useState<'co_ban' | 'trung_binh' | 'thi_vao_10'>('thi_vao_10');
  const [numQuestions, setNumQuestions] = useState<number>(5);

  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Quiz play state
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleGenerateQuiz = async () => {
    setIsLoading(true);
    setQuestions(null);
    setUserAnswers({});
    setSubmitted(false);

    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId: selectedUnitId,
          difficulty,
          questionCount: numQuestions,
        }),
      });

      if (!res.ok) throw new Error('Lỗi khi tạo đề bài tập AI');

      const data = await res.json();
      setQuestions(data.questions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitQuiz = () => {
    if (!questions) return;
    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    playSoundEffect('correct');
    onAddPoints(correctCount * 10);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl space-y-3">
        <div className="inline-flex items-center space-x-2 bg-purple-500/20 text-purple-300 border border-purple-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Tạo Bài Tập & Đề Thi Thử Tự Động Bằng AI</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black">Tạo Đề Luyện Tập Cá Nhân Hóa SGK 9</h2>
        <p className="text-xs sm:text-sm text-slate-300">
          Tùy chỉnh Unit, mức độ khó và số lượng câu hỏi để AI sinh ra bộ bài tập độc quyền sát với cấu trúc thi thật!
        </p>
      </div>

      {!questions ? (
        /* Setup options form */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 text-xs sm:text-sm">
          {/* Select Unit */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 block">1. Chọn Unit SGK Tiếng Anh 9:</label>
            <select
              value={selectedUnitId}
              onChange={(e) => setSelectedUnitId(Number(e.target.value))}
              className="w-full p-3.5 rounded-2xl border border-slate-300 font-bold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {GRADE_9_UNITS.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.title} ({u.theme})
                </option>
              ))}
            </select>
          </div>

          {/* Select Difficulty */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 block">2. Mức độ khó của đề:</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'co_ban', label: '🟢 Cơ Bản (Bám sát lý thuyết SGK)' },
                { id: 'trung_binh', label: '🟡 Khá - Vận Dụng Đa Dạng' },
                { id: 'thi_vao_10', label: '🔴 Chuẩn Cấu Trúc Thi Tuyển Sinh Vào 10' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDifficulty(item.id as any)}
                  className={`p-3.5 rounded-2xl border text-left font-bold transition-all ${
                    difficulty === item.id
                      ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 block">3. Số lượng câu hỏi:</label>
            <div className="flex items-center space-x-3">
              {[3, 5, 10].map((num) => (
                <button
                  key={num}
                  onClick={() => setNumQuestions(num)}
                  className={`px-5 py-2.5 rounded-xl border font-bold transition-all ${
                    numQuestions === num
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {num} Câu hỏi
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateQuiz}
            disabled={isLoading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>AI Đang Soạn Đề Bài Tập Mô Phỏng...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Tạo Đề Luyện Tập Ngay</span>
              </>
            )}
          </button>
        </div>
      ) : (
        /* Generated Quiz Player */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Đề Thi Luyện Tập AI - Unit {selectedUnitId}
              </h3>
              <p className="text-xs text-slate-500">Mức độ: {difficulty.toUpperCase()}</p>
            </div>
            {submitted && (
              <div className="flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 font-bold text-xs px-3.5 py-1.5 rounded-xl">
                <Trophy className="w-4 h-4 text-emerald-600" />
                <span>
                  Đạt {score}/{questions.length} điểm
                </span>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {questions.map((q, qIdx) => {
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
                        style = 'bg-purple-600 text-white border-purple-700';
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
                        <span>Giải thích từ AI:</span>
                      </p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setQuestions(null)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
            >
              Tạo Đề Khác
            </button>

            {!submitted ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(userAnswers).length === 0}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all"
              >
                Nộp Bài Làm
              </button>
            ) : (
              <button
                onClick={() => {
                  setSubmitted(false);
                  setUserAnswers({});
                }}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all"
              >
                Làm Lại Đề Này
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
