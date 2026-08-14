import React, { useState } from 'react';
import { GrammarSection } from '../../types';
import { CheckCircle2, HelpCircle, Sparkles, Trophy, BookMarked, Volume2 } from 'lucide-react';
import { playSoundEffect, speakEnglish, stopSpeaking } from '../../utils/audioHelpers';

interface GrammarTabProps {
  grammarSection: GrammarSection;
  onSkillComplete: () => void;
}

export const GrammarTab: React.FC<GrammarTabProps> = ({ grammarSection, onSkillComplete }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const [activeSpeakingExample, setActiveSpeakingExample] = useState<string | null>(null);

  const handleSpeakText = (text: string) => {
    if (activeSpeakingExample === text) {
      stopSpeaking();
      setActiveSpeakingExample(null);
    } else {
      setActiveSpeakingExample(text);
      speakEnglish(text, 0.85, () => {
        setActiveSpeakingExample(null);
      });
    }
  };

  const handleSelectOption = (exerciseId: string, option: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [exerciseId]: option }));
  };

  const handleSubmitExercises = () => {
    let correctCount = 0;
    grammarSection.exercises.forEach((ex) => {
      if (userAnswers[ex.id] === ex.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    if (correctCount === grammarSection.exercises.length) {
      playSoundEffect('win');
    } else {
      playSoundEffect('correct');
    }
    onSkillComplete();
  };

  return (
    <div className="space-y-8">
      {/* Grammar Theory Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <BookMarked className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">{grammarSection.title}</h3>
            <p className="text-xs text-slate-500">{grammarSection.summary}</p>
          </div>
        </div>

        {/* Formula Box */}
        {grammarSection.formulaBox && grammarSection.formulaBox.length > 0 && (
          <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5 rounded-2xl space-y-2 border border-slate-800 shadow-lg">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Công Thức Ngữ Pháp Chuẩn SGK Lớp 9</span>
            </span>
            <div className="space-y-1.5 font-mono text-xs sm:text-sm text-blue-200 pt-1">
              {grammarSection.formulaBox.map((formula, idx) => (
                <div key={idx} className="bg-slate-800/80 p-2.5 rounded-xl border border-slate-700">
                  {formula}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Usage Points */}
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider text-indigo-600">
            CHI TIẾT CÁCH DÙNG & VÍ DỤ MINH HỌA:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {grammarSection.usagePoints.map((point, idx) => {
              const isSpeaking = activeSpeakingExample === point.example;
              return (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h5 className="text-sm font-bold text-slate-900">{point.title}</h5>
                  <p className="text-xs text-slate-600 leading-relaxed">{point.detail}</p>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-indigo-900 italic flex items-center justify-between">
                    <span>👉 "{point.example}"</span>
                    <button
                      onClick={() => handleSpeakText(point.example)}
                      className={`p-1.5 rounded-lg transition-colors flex items-center space-x-1 ${
                        isSpeaking
                          ? 'bg-amber-500 text-slate-900 font-bold animate-pulse'
                          : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                      }`}
                      title="Nghe phát âm ví dụ"
                    >
                      <Volume2 className={`w-4 h-4 ${isSpeaking ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Grammar Practice Exercises */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Bài Tập Thực Hành Ngữ Pháp SGK</h4>
            <p className="text-xs text-slate-500">
              Chọn đáp án đúng cho các câu dưới đây để kiểm tra mức độ ghi nhớ
            </p>
          </div>
          {submitted && (
            <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-xl">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span>
                Đạt {score}/{grammarSection.exercises.length} điểm
              </span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {grammarSection.exercises.map((ex, exIdx) => {
            const isUserCorrect = userAnswers[ex.id] === ex.correctAnswer;
            const isSpeakingEx = activeSpeakingExample === ex.question;

            return (
              <div
                key={ex.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm"
              >
                <div className="flex items-start justify-between space-x-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {exIdx + 1}
                    </span>
                    <p className="text-sm sm:text-base font-bold text-slate-800">{ex.question}</p>
                  </div>
                  <button
                    onClick={() => handleSpeakText(ex.question)}
                    className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isSpeakingEx
                        ? 'bg-amber-500 text-slate-900 font-bold animate-pulse'
                        : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                    }`}
                    title="Nghe câu hỏi"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {ex.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pl-9">
                    {ex.options.map((opt, optIdx) => {
                      const isSelected = userAnswers[ex.id] === opt;
                      const isCorrectOpt = opt === ex.correctAnswer;

                      let btnStyle =
                        'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700';
                      if (submitted) {
                        if (isCorrectOpt) btnStyle = 'bg-emerald-500 text-white border-emerald-600';
                        else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600';
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600 text-white border-indigo-700';
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectOption(ex.id, opt)}
                          disabled={submitted}
                          className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border transition-all text-left flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {submitted && isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Explanation Output */}
                {submitted && (
                  <div className="pl-9 pt-2">
                    <div
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        isUserCorrect
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      <p className="font-bold flex items-center space-x-1">
                        <HelpCircle className="w-4 h-4" />
                        <span>Giải thích đáp án: {ex.correctAnswer}</span>
                      </p>
                      <p>{ex.explanation}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Action */}
        <div className="pt-2 flex justify-end">
          {!submitted ? (
            <button
              onClick={handleSubmitExercises}
              disabled={Object.keys(userAnswers).length === 0}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Nộp Bài Giải Ngữ Pháp
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(false);
                setUserAnswers({});
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all"
            >
              Làm Lại Bài Tập
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
