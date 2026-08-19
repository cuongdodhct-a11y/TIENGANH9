import React, { useState } from 'react';
import { VocabularyItem } from '../../types';
import { Volume2, CheckCircle2, RotateCw, Sparkles, Trophy, BookOpen, Layers, Check } from 'lucide-react';
import { speakEnglish, playSoundEffect, stopSpeaking, getPreferredVoice, VoiceProfile } from '../../utils/audioHelpers';
import { VoiceSelector } from '../common/VoiceSelector';

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
  const [activeVoiceUsed, setActiveVoiceUsed] = useState<VoiceProfile | null>(null);

  // Stop audio on unmount or tab switch
  React.useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleSpeakWord = (wordText: string, forcedVoice?: VoiceProfile) => {
    playSoundEffect('click');
    const voiceToUse = forcedVoice || getPreferredVoice();
    if (activeSpeakingWord === wordText && activeVoiceUsed === voiceToUse) {
      stopSpeaking();
      setActiveSpeakingWord(null);
      setActiveVoiceUsed(null);
    } else {
      setActiveSpeakingWord(wordText);
      setActiveVoiceUsed(voiceToUse);
      speakEnglish(
        wordText,
        0.9,
        () => {
          setActiveSpeakingWord(null);
          setActiveVoiceUsed(null);
        },
        voiceToUse
      );
    }
  };

  const currentCard = vocabularyList[currentIndex] || vocabularyList[0];

  const handleNextCard = () => {
    playSoundEffect('click');
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % vocabularyList.length);
  };

  const handlePrevCard = () => {
    playSoundEffect('click');
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
    }, 1000);
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
      {/* Voice Selector and View Mode Bar */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 text-white p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-md">
        <div>
          <h3 className="text-base font-black text-white">
            Từ Vựng Bài Học ({vocabularyList.length} từ chuẩn SGK)
          </h3>
          <p className="text-xs text-slate-400">
            Đã thuộc {masteredWordIds.filter((id) => vocabularyList.some((v) => v.id === id)).length}/
            {vocabularyList.length} từ
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Dual Voice Selector */}
          <VoiceSelector compact />

          <div className="flex items-center space-x-1.5 bg-slate-800 p-1 rounded-2xl border border-slate-700">
            <button
              onClick={() => {
                playSoundEffect('click');
                setViewMode('flashcard');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'flashcard'
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Thẻ Từ</span>
            </button>
            <button
              onClick={() => {
                playSoundEffect('click');
                setViewMode('list');
              }}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-400'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Danh Sách</span>
            </button>
          </div>
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcard' && currentCard && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="relative perspective-1000">
            <div
              onClick={() => {
                playSoundEffect('click');
                setIsFlipped(!isFlipped);
              }}
              className={`min-h-[280px] sm:min-h-[320px] w-full rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-xl ${
                isFlipped
                  ? 'bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-900 border-indigo-500 text-white'
                  : 'bg-white border-slate-200 hover:border-blue-300 text-slate-900'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {currentCard.partOfSpeech}
                </span>

                <div className="flex items-center space-x-2">
                  {/* Distinct Teacher Play Buttons */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakWord(currentCard.word, 'female');
                    }}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      activeSpeakingWord === currentCard.word && activeVoiceUsed === 'female'
                        ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-400'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                    }`}
                    title="Nghe Cô Emily đọc"
                  >
                    <span>👩‍🏫 Cô Emily</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakWord(currentCard.word, 'male');
                    }}
                    className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                      activeSpeakingWord === currentCard.word && activeVoiceUsed === 'male'
                        ? 'bg-blue-600 text-white animate-pulse ring-2 ring-blue-400'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                    }`}
                    title="Nghe Thầy David đọc"
                  >
                    <span>👨‍🏫 Thầy David</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSoundEffect('click');
                      onToggleMasterWord(currentCard.id);
                    }}
                    className={`p-2 rounded-full transition-colors ${
                      masteredWordIds.includes(currentCard.id)
                        ? 'bg-emerald-100 text-emerald-600 ring-2 ring-emerald-400'
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
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900">
                      {currentCard.word}
                    </h2>
                    <p className="text-lg text-blue-600 font-mono font-bold">
                      {currentCard.phonetic}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center justify-center space-x-1 pt-2 font-medium">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Nhấn vào thẻ để lật xem nghĩa Tiếng Việt</span>
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl sm:text-4xl font-black text-amber-300">
                      {currentCard.vietnameseMeaning}
                    </h3>
                    <div className="space-y-1 text-xs sm:text-sm text-slate-200 bg-slate-800/80 p-4 rounded-2xl border border-slate-700 mt-2 text-left">
                      <p className="font-bold text-blue-300">Ví dụ câu:</p>
                      <p className="italic font-semibold">{currentCard.englishExample}</p>
                      <p className="text-slate-300">"{currentCard.vietnameseExample}"</p>
                    </div>
                  </>
                )}
              </div>

              {/* Card Footer Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 font-bold">
                <span>
                  Từ {currentIndex + 1} / {vocabularyList.length}
                </span>
                <span>{isFlipped ? 'Mặt sau (Nghĩa)' : 'Mặt trước (Tiếng Anh)'}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black rounded-2xl transition-colors"
            >
              ← Từ trước
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleSpeakWord(currentCard.word, 'female')}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-black rounded-2xl flex items-center space-x-1 border border-rose-200 transition-all active:scale-95"
                title="Cô Emily đọc"
              >
                <span>👩‍🏫 Cô Emily</span>
              </button>
              <button
                onClick={() => handleSpeakWord(currentCard.word, 'male')}
                className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-black rounded-2xl flex items-center space-x-1 border border-blue-200 transition-all active:scale-95"
                title="Thầy David đọc"
              >
                <span>👨‍🏫 Thầy David</span>
              </button>
            </div>

            <button
              onClick={handleNextCard}
              className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-2xl shadow-md transition-colors"
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
                className={`p-4 sm:p-5 rounded-3xl border transition-all ${
                  isMastered
                    ? 'bg-emerald-50/60 border-emerald-300 ring-1 ring-emerald-200'
                    : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="text-lg font-black text-slate-900">{item.word}</h4>
                      <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-blue-600 font-bold">{item.phonetic}</p>
                    <p className="text-sm font-black text-emerald-700">{item.vietnameseMeaning}</p>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <button
                      onClick={() => handleSpeakWord(item.word, 'female')}
                      className="px-2 py-1.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-black border border-rose-200 active:scale-95"
                      title="Cô Emily phát âm"
                    >
                      👩‍🏫 Nữ
                    </button>
                    <button
                      onClick={() => handleSpeakWord(item.word, 'male')}
                      className="px-2 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-black border border-blue-200 active:scale-95"
                      title="Thầy David phát âm"
                    >
                      👨‍🏫 Nam
                    </button>
                    <button
                      onClick={() => {
                        playSoundEffect('click');
                        onToggleMasterWord(item.id);
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        isMastered ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'
                      }`}
                      title={isMastered ? 'Đã thuộc từ này' : 'Bấm để đánh dấu đã thuộc'}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-2xl bg-slate-50 text-xs text-slate-700 space-y-0.5 border border-slate-100">
                  <p className="font-semibold text-slate-900">{item.englishExample}</p>
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
              <div className="flex items-center justify-center space-x-3">
                <h4 className="text-3xl font-black text-white">{currentQuizWord.word}</h4>
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handleSpeakWord(currentQuizWord.word, 'female')}
                    className="px-2.5 py-1 bg-rose-600/80 hover:bg-rose-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                    title="Cô Emily đọc"
                  >
                    <span>👩‍🏫</span>
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleSpeakWord(currentQuizWord.word, 'male')}
                    className="px-2.5 py-1 bg-blue-600/80 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center space-x-1"
                    title="Thầy David đọc"
                  >
                    <span>👨‍🏫</span>
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs font-mono text-blue-300">{currentQuizWord.phonetic}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizOptions.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = opt === currentQuizWord.vietnameseMeaning;

                let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700';
                if (selectedOption !== null) {
                  if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-300';
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
                playSoundEffect('click');
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
