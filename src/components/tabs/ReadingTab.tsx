import React, { useState } from 'react';
import { ReadingSection } from '../../types';
import { BookOpen, CheckCircle2, HelpCircle, Trophy, Sparkles, Volume2, Play, Pause } from 'lucide-react';
import { playSoundEffect, speakEnglish, stopSpeaking } from '../../utils/audioHelpers';

interface ReadingTabProps {
  readingSection: ReadingSection;
  onSkillComplete: () => void;
}

export const ReadingTab: React.FC<ReadingTabProps> = ({ readingSection, onSkillComplete }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isReadingAudio, setIsReadingAudio] = useState(false);

  const [activeSpeakingVocab, setActiveSpeakingVocab] = useState<string | null>(null);

  const handleSpeakVocab = (word: string) => {
    if (activeSpeakingVocab === word) {
      stopSpeaking();
      setActiveSpeakingVocab(null);
    } else {
      setActiveSpeakingVocab(word);
      speakEnglish(word, 0.9, () => {
        setActiveSpeakingVocab(null);
      });
    }
  };

  const handleTogglePassageAudio = () => {
    if (isReadingAudio) {
      stopSpeaking();
      setIsReadingAudio(false);
    } else {
      setIsReadingAudio(true);
      speakEnglish(readingSection.passageText, 0.85, () => {
        setIsReadingAudio(false);
      });
    }
  };

  const handleSubmitReading = () => {
    let correctCount = 0;
    readingSection.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    playSoundEffect('correct');
    onSkillComplete();
  };

  return (
    <div className="space-y-8">
      {/* Passage Display Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Chủ đề: {readingSection.topic}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
              {readingSection.title}
            </h3>
          </div>

          <button
            onClick={handleTogglePassageAudio}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all shrink-0 ${
              isReadingAudio
                ? 'bg-amber-500 text-slate-900 hover:bg-amber-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isReadingAudio ? <Pause className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isReadingAudio ? 'Dừng Đọc Audio' : 'Nghe Đọc Bài Văn (Audio)'}</span>
          </button>
        </div>

        {/* Reading Passage Text */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base leading-relaxed space-y-3 font-serif">
          {readingSection.passageText.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Key Vocabulary Highlights Drawer */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Từ Vựng Quan Trọng Trong Bài Đọc:</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {readingSection.keyVocabularyHighlights.map((v, idx) => {
              const isSpeaking = activeSpeakingVocab === v.word;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-xs flex items-center justify-between space-x-2"
                >
                  <div>
                    <p className="font-extrabold text-blue-900">{v.word}</p>
                    <p className="text-blue-700 font-medium">{v.meaning}</p>
                  </div>
                  <button
                    onClick={() => handleSpeakVocab(v.word)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isSpeaking
                        ? 'bg-amber-500 text-slate-900 font-bold animate-pulse'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                    title="Nghe phát âm từ này"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reading Comprehension Questions */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Câu Hỏi Đọc Hiểu</h4>
            <p className="text-xs text-slate-500">
              Chọn đáp án chính xác nhất dựa trên thông tin bài đọc
            </p>
          </div>
          {submitted && (
            <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-xl">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span>
                Đúng {score}/{readingSection.questions.length} câu
              </span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {readingSection.questions.map((q, qIdx) => {
            const isUserCorrect = userAnswers[q.id] === q.correctAnswerIndex;

            return (
              <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 shadow-sm">
                <p className="text-sm font-bold text-slate-800">
                  {qIdx + 1}. {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctAnswerIndex;

                    let style = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200';
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
                      <span>Giải thích chi tiết:</span>
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action */}
        <div className="pt-2 flex justify-end">
          {!submitted ? (
            <button
              onClick={handleSubmitReading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Nộp Bài Đọc Hiểu
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(false);
                setUserAnswers({});
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all"
            >
              Làm Lại Bài Đọc
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
