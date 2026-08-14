import React, { useState } from 'react';
import { VocabularyItem } from '../../types';
import { Volume2, CheckCircle2, RotateCw, Sparkles, Trophy, BookOpen, Layers } from 'lucide-react';
import { speakEnglish, playSoundEffect, stopSpeaking } from '../../utils/audioHelpers';

interface VocabularyTabProps {
  vocabularyList: VocabularyItem[];
  masteredWordIds: string[];
  onToggleMasterWord: (wordId: string) => void;
  onSkillComplete: () => void;
}

export const VocabularyTab: React.FC<VocabularyTabProps> = ({
  vocabularyList,
  masteredWordIds,
  onToggleMasterWord,
  onSkillComplete,
}) => {
  const [viewMode, setViewMode] = useState<'flashcard' | 'list'>('flashcard');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mini quiz state
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [activeSpeakingWord, setActiveSpeakingWord] = useState<string | null>(null);

  const handleSpeakWord = (wordText: string) => {
    if (activeSpeakingWord === wordText) {
      stopSpeaking();
      setActiveSpeakingWord(null);
    } else {
      setActiveSpeakingWord(wordText);
      speakEnglish(wordText, 0.9, () => {
        setActiveSpeakingWord(null);
      });
    }
  };

  const currentCard = vocabularyList[currentIndex] || vocabularyList[0];

  const handleNextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % vocabularyList.length);
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + vocabularyList.length) % vocabularyList.length);
  };

  const handleQuizAnswer = (optionIdx: number, correctWord: string, options: string[]) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIdx);

    if (options[optionIdx] === correctWord) {
      playSoundEffect('correct');
      setQuizScore((prev) => prev + 1);
    } else {
      playSoundEffect('wrong');
    }

    setTimeout(() => {
      setSelectedOption(null);
      if (quizIndex + 1 < vocabularyList.length) {
        setQuizIndex((prev) => prev + 1);
      } else {
        setQuizFinished(true);
        onSkillComplete();
      }
    }, 1200);
  };

  // Generate options for current quiz question
  const currentQuizWord = vocabularyList[quizIndex];
  const generateQuizOptions = (correctWordObj: VocabularyItem) => {
    const wrongOptions = vocabularyList
      .filter((w) => w.id !== correctWordObj.id)
      .map((w) => w.vietnameseMeaning)
      .slice(0, 3);
    const options = [correctWordObj.vietnameseMeaning, ...wrongOptions].sort(() => Math.random() - 0.5);
    return options;
  };

  const quizOptions = currentQuizWord ? generateQuizOptions(currentQuizWord) : [];

  return (
    <div className="space-y-8">
      {/* View Mode Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Từ Vựng Bài Học ({vocabularyList.length} từ)
          </h3>
          <p className="text-xs text-slate-500">
            Đã thuộc {masteredWordIds.filter((id) => vocabularyList.some((v) => v.id === id)).length}/
            {vocabularyList.length} từ
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button
            onClick={() => setViewMode('flashcard')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'flashcard'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Thẻ Từ (Flashcards)</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'list'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Danh Sách Từ</span>
          </button>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' && currentCard && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="relative perspective-1000">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className={`min-h-[280px] sm:min-h-[320px] w-full rounded-3xl p-6 sm:p-8 border-2 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-xl ${
                isFlipped
                  ? 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border-indigo-500 text-white'
                  : 'bg-white border-slate-200 hover:border-blue-300 text-slate-900'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {currentCard.partOfSpeech}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakWord(currentCard.word);
                    }}
                    className={`p-2 rounded-full transition-all ${
                      activeSpeakingWord === currentCard.word
                        ? 'bg-amber-500 text-slate-900 animate-pulse'
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                    title="Nghe phát âm"
                  >
                    <Volume2 className={`w-5 h-5 ${activeSpeakingWord === currentCard.word ? 'animate-bounce' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleMasterWord(currentCard.id);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      masteredWordIds.includes(currentCard.id)
                        ? 'bg-emerald-100 text-emerald-600'
                        : 'bg-slate-100 text-slate-400 hover:text-emerald-500'
                    }`}
                    title="Đánh dấu đã thuộc"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Card Center Content */}
              <div className="my-auto text-center space-y-3 py-4">
                {!isFlipped ? (
                  <>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                      {currentCard.word}
                    </h2>
                    <p className="text-base text-blue-600 font-mono font-medium">
                      {currentCard.phonetic}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center justify-center space-x-1 pt-2">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Nhấn vào thẻ để xem nghĩa Tiếng Việt</span>
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                      {currentCard.vietnameseMeaning}
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm text-slate-300 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 mt-2 text-left">
                      <p className="font-semibold text-blue-300">Ví dụ:</p>
                      <p className="italic">{currentCard.englishExample}</p>
                      <p className="text-slate-400">"{currentCard.vietnameseExample}"</p>
                    </div>
                  </>
                )}
              </div>

              {/* Card Footer Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <span>
                  Từ {currentIndex + 1} / {vocabularyList.length}
                </span>
                <span>{isFlipped ? 'Mặt sau' : 'Mặt trước'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
            >
              ← Từ trước
            </button>
            <button
              onClick={() => speakEnglish(currentCard.word)}
              className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl flex items-center space-x-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>Phát âm</span>
            </button>
            <button
              onClick={handleNextCard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
            >
              Từ tiếp theo →
            </button>
          </div>
        </div>
      )}

      {/* LIST MODE */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vocabularyList.map((item) => {
            const isMastered = masteredWordIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isMastered
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-extrabold text-slate-900">{item.word}</h4>
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {item.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-blue-600 font-medium">{item.phonetic}</p>
                    <p className="text-sm font-bold text-emerald-700">{item.vietnameseMeaning}</p>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleSpeakWord(item.word)}
                      className={`p-2 rounded-xl transition-all ${
                        activeSpeakingWord === item.word
                          ? 'bg-amber-500 text-slate-900 animate-pulse'
                          : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                      }`}
                    >
                      <Volume2 className={`w-4 h-4 ${activeSpeakingWord === item.word ? 'animate-bounce' : ''}`} />
                    </button>
                    <button
                      onClick={() => onToggleMasterWord(item.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        isMastered ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-0.5 border border-slate-100">
                  <p className="font-medium text-slate-800">{item.englishExample}</p>
                  <p className="text-slate-500 italic">"{item.vietnameseExample}"</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* INTERACTIVE VOCABULARY MEMORY QUIZ */}
      <div className="mt-12 bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-xl border border-slate-800">
        <div className="flex items-center justify-between border-b border-blue-800/80 pb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-lg font-bold">Bài Tập Kiểm Tra Từ Vựng Nhanh</h3>
          </div>
          <span className="text-xs font-semibold bg-blue-800/80 px-3 py-1 rounded-full text-blue-200">
            Câu {quizIndex + 1}/{vocabularyList.length}
          </span>
        </div>

        {!quizFinished && currentQuizWord ? (
          <div className="space-y-6">
            <div className="text-center py-4 bg-slate-800/60 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs text-blue-300 uppercase tracking-widest font-bold">
                Nghĩa Tiếng Việt của từ này là gì?
              </span>
              <h4 className="text-3xl font-black text-white">{currentQuizWord.word}</h4>
              <p className="text-xs font-mono text-blue-300">{currentQuizWord.phonetic}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizOptions.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = opt === currentQuizWord.vietnameseMeaning;

                let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700';
                if (selectedOption !== null) {
                  if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-500';
                  else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-500';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(idx, currentQuizWord.vietnameseMeaning, quizOptions)}
                    disabled={selectedOption !== null}
                    className={`p-4 rounded-2xl text-sm font-bold border transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOption !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <Trophy className="w-16 h-16 text-amber-300 mx-auto animate-bounce" />
            <h4 className="text-2xl font-black">Hoàn Thành Bài Kiểm Tra Từ Vựng!</h4>
            <p className="text-sm text-blue-200">
              Bạn trả lời đúng <strong className="text-amber-300 text-lg">{quizScore}</strong>/
              {vocabularyList.length} từ vựng!
            </p>
            <button
              onClick={() => {
                setQuizIndex(0);
                setQuizScore(0);
                setQuizFinished(false);
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-lg"
            >
              Luyện Tập Lại Bài Quizz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
