import React, { useState } from 'react';
import { SCRAMBLE_SENTENCES } from '../../data/scrambleSentences';
import { Sparkles, CheckCircle2, RotateCw, Trophy, ArrowRight, HelpCircle, Volume2 } from 'lucide-react';
import { playSoundEffect, speakEnglish, getPreferredVoice, VoiceProfile } from '../../utils/audioHelpers';
import { VoiceSelector } from '../common/VoiceSelector';

export const SentenceScrambleGame: React.FC<{ onAddPoints: (pts: number) => void }> = ({ onAddPoints }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [availableWords, setAvailableWords] = useState<string[]>(
    [...SCRAMBLE_SENTENCES[0].scrambledWords].sort(() => Math.random() - 0.5)
  );
  const [assembledWords, setAssembledWords] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const currentItem = SCRAMBLE_SENTENCES[currentIdx];

  const handleAddWord = (word: string, indexInAvailable: number) => {
    if (isChecked) return;
    setAssembledWords([...assembledWords, word]);
    setAvailableWords(availableWords.filter((_, idx) => idx !== indexInAvailable));
    playSoundEffect('click');
  };

  const handleRemoveWord = (word: string, indexInAssembled: number) => {
    if (isChecked) return;
    setAvailableWords([...availableWords, word]);
    setAssembledWords(assembledWords.filter((_, idx) => idx !== indexInAssembled));
    playSoundEffect('click');
  };

  const handleCheckSentence = () => {
    const userSentence = assembledWords.join(' ').trim().toLowerCase().replace(/[.,!]/g, '');
    const targetSentence = currentItem.correctSentence.trim().toLowerCase().replace(/[.,!]/g, '');

    setIsChecked(true);

    if (userSentence === targetSentence) {
      setIsCorrect(true);
      playSoundEffect('correct');
      speakEnglish(currentItem.correctSentence);
      onAddPoints(20);
    } else {
      setIsCorrect(false);
      playSoundEffect('wrong');
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < SCRAMBLE_SENTENCES.length) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      setAvailableWords([...SCRAMBLE_SENTENCES[nextIdx].scrambledWords].sort(() => Math.random() - 0.5));
      setAssembledWords([]);
      setIsChecked(false);
      setIsCorrect(false);
      setShowTip(false);
    } else {
      // Completed all
      setCurrentIdx(0);
      setAvailableWords([...SCRAMBLE_SENTENCES[0].scrambledWords].sort(() => Math.random() - 0.5));
      setAssembledWords([]);
      setIsChecked(false);
      setIsCorrect(false);
      setShowTip(false);
    }
  };

  const handleSpeakSample = (forcedVoice?: VoiceProfile) => {
    speakEnglish(currentItem.correctSentence, 0.85, undefined, forcedVoice || getPreferredVoice());
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Sắp Xếp Từ Thành Câu Đúng</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">Ghép Câu Hoàn Chỉnh SGK 9</h2>
          <p className="text-xs text-teal-100">Luyện cấu trúc ngữ pháp và trật tự từ trong tiếng Anh</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 max-w-full justify-start md:justify-end">
          <button
            onClick={() => {
              if (currentIdx > 0) {
                const prevIdx = currentIdx - 1;
                setCurrentIdx(prevIdx);
                setAvailableWords([...SCRAMBLE_SENTENCES[prevIdx].scrambledWords].sort(() => Math.random() - 0.5));
                setAssembledWords([]);
                setIsChecked(false);
                setIsCorrect(false);
                setShowTip(false);
              }
            }}
            disabled={currentIdx === 0}
            className="px-2.5 py-1.5 rounded-xl font-bold text-xs bg-teal-900/80 text-teal-100 hover:bg-teal-800 disabled:opacity-40 border border-teal-600 transition-all"
            title="Câu trước"
          >
            ◀
          </button>

          <div className="flex flex-wrap items-center gap-1 max-h-16 overflow-y-auto p-1 bg-teal-950/60 rounded-xl border border-teal-600">
            {SCRAMBLE_SENTENCES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIdx(idx);
                  setAvailableWords([...SCRAMBLE_SENTENCES[idx].scrambledWords].sort(() => Math.random() - 0.5));
                  setAssembledWords([]);
                  setIsChecked(false);
                  setIsCorrect(false);
                  setShowTip(false);
                }}
                className={`w-6 h-6 rounded-md font-bold text-[11px] transition-all flex items-center justify-center ${
                  currentIdx === idx
                    ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                    : 'bg-teal-900/90 text-teal-200 hover:bg-teal-800'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (currentIdx < SCRAMBLE_SENTENCES.length - 1) {
                const nextIdx = currentIdx + 1;
                setCurrentIdx(nextIdx);
                setAvailableWords([...SCRAMBLE_SENTENCES[nextIdx].scrambledWords].sort(() => Math.random() - 0.5));
                setAssembledWords([]);
                setIsChecked(false);
                setIsCorrect(false);
                setShowTip(false);
              }
            }}
            disabled={currentIdx === SCRAMBLE_SENTENCES.length - 1}
            className="px-2.5 py-1.5 rounded-xl font-bold text-xs bg-teal-900/80 text-teal-100 hover:bg-teal-800 disabled:opacity-40 border border-teal-600 transition-all"
            title="Câu kế tiếp"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Main Scramble Playfield */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Vietnamese Meaning Prompt */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <span className="text-xs font-bold text-slate-400 uppercase">Dịch sang Tiếng Anh câu sau:</span>
            <p className="text-lg font-bold text-slate-900">"{currentItem.vietnameseMeaning}"</p>
          </div>
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => handleSpeakSample('female')}
              className="px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors font-bold text-xs flex items-center space-x-1"
              title="Cô Emily đọc câu mẫu"
            >
              <span>👩‍🏫 Cô Emily</span>
            </button>
            <button
              onClick={() => handleSpeakSample('male')}
              className="px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 transition-colors font-bold text-xs flex items-center space-x-1"
              title="Thầy David đọc câu mẫu"
            >
              <span>👨‍🏫 Thầy David</span>
            </button>
          </div>
        </div>

        {/* Assembled Words Box (Drop Target) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Câu của bạn:</span>
          <div className="min-h-[90px] p-4 rounded-2xl bg-blue-50/50 border-2 border-dashed border-blue-300 flex flex-wrap gap-2 items-center">
            {assembledWords.length === 0 ? (
              <p className="text-xs text-slate-400 italic">Nhấn vào các từ bên dưới để ghép thành câu...</p>
            ) : (
              assembledWords.map((word, idx) => (
                <button
                  key={idx}
                  onClick={() => handleRemoveWord(word, idx)}
                  disabled={isChecked}
                  className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-rose-600 transition-colors"
                >
                  {word}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Available Scrambled Words (Bank) */}
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-500 uppercase">Ngân hàng từ:</span>
          <div className="flex flex-wrap gap-2">
            {availableWords.map((word, idx) => (
              <button
                key={idx}
                onClick={() => handleAddWord(word, idx)}
                disabled={isChecked}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-800 font-bold text-sm border border-slate-200 transition-all hover:scale-105"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Validation Result Box */}
        {isChecked && (
          <div
            className={`p-5 rounded-2xl border text-xs sm:text-sm space-y-2 ${
              isCorrect
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <p className="font-extrabold flex items-center space-x-1">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Chính Xác! Câu Hoàn Chỉnh:</span>
                  </>
                ) : (
                  <>
                    <HelpCircle className="w-5 h-5 text-rose-600" />
                    <span>Rất Tiếc! Đáp Án Đúng Là:</span>
                  </>
                )}
              </p>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => handleSpeakSample('female')}
                  className="px-2 py-1 rounded bg-rose-100 text-rose-800 text-xs font-bold"
                  title="Cô Emily đọc đáp án"
                >
                  👩‍🏫
                </button>
                <button
                  onClick={() => handleSpeakSample('male')}
                  className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold"
                  title="Thầy David đọc đáp án"
                >
                  👨‍🏫
                </button>
              </div>
            </div>
            <p className="text-base font-bold text-slate-900 font-sans">"{currentItem.correctSentence}"</p>
            <p className="text-xs text-slate-600 italic pt-1">💡 Mẹo ngữ pháp: {currentItem.grammarTip}</p>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              setAvailableWords([...currentItem.scrambledWords].sort(() => Math.random() - 0.5));
              setAssembledWords([]);
              setIsChecked(false);
            }}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
          >
            <RotateCw className="w-4 h-4" />
            <span>Xếp Lại Từ Đầu</span>
          </button>

          {!isChecked ? (
            <button
              onClick={handleCheckSentence}
              disabled={assembledWords.length === 0}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Kiểm Tra
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <span>Câu Tiếp Theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
