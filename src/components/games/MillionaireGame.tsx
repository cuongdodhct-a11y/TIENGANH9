import React, { useState } from 'react';
import { MillionaireQuestion } from '../../types';
import { MILLIONAIRE_QUESTIONS } from '../../data/millionaireQuestions';
import { Trophy, Users, PhoneCall, HelpCircle, RefreshCw, Award, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { playSoundEffect, speakEnglish } from '../../utils/audioHelpers';

export const MillionaireGame: React.FC<{ onAddPoints: (pts: number) => void }> = ({ onAddPoints }) => {
  const [currentLevelIdx, setCurrentLevelIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [wonGrandPrize, setWonGrandPrize] = useState(false);

  // Lifelines state
  const [used5050, setUsed5050] = useState(false);
  const [usedAudience, setUsedAudience] = useState(false);
  const [usedCall, setUsedCall] = useState(false);

  // Active lifeline modal output
  const [lifelineOutput, setLifelineOutput] = useState<string | null>(null);
  const [disabledOptions, setDisabledOptions] = useState<number[]>([]);

  const currentQ = MILLIONAIRE_QUESTIONS[currentLevelIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerLocked || disabledOptions.includes(idx)) return;
    setSelectedOpt(idx);
    playSoundEffect('click');
  };

  const handleConfirmAnswer = () => {
    if (selectedOpt === null || isAnswerLocked) return;
    setIsAnswerLocked(true);

    setTimeout(() => {
      if (selectedOpt === currentQ.correctIndex) {
        playSoundEffect('correct');

        if (currentLevelIdx + 1 < MILLIONAIRE_QUESTIONS.length) {
          setTimeout(() => {
            setCurrentLevelIdx((prev) => prev + 1);
            setSelectedOpt(null);
            setIsAnswerLocked(false);
            setDisabledOptions([]);
            setLifelineOutput(null);
          }, 1500);
        } else {
          setWonGrandPrize(true);
          setGameOver(true);
          onAddPoints(1000);
          playSoundEffect('win');
        }
      } else {
        playSoundEffect('wrong');
        setGameOver(true);
      }
    }, 1200);
  };

  // Lifeline 1: 50:50
  const handleUse5050 = () => {
    if (used5050 || isAnswerLocked) return;
    setUsed5050(true);

    const wrongIndexes = [0, 1, 2, 3].filter((i) => i !== currentQ.correctIndex);
    // Shuffle and pick 2 to disable
    const toDisable = wrongIndexes.sort(() => Math.random() - 0.5).slice(0, 2);
    setDisabledOptions(toDisable);
    playSoundEffect('click');
  };

  // Lifeline 2: AI Audience
  const handleUseAudience = () => {
    if (usedAudience || isAnswerLocked) return;
    setUsedAudience(true);

    const correctPct = Math.floor(Math.random() * 25) + 65; // 65-90%
    const remaining = 100 - correctPct;
    setLifelineOutput(`📊 Ý kiến Khán Giả AI Studio: ${currentQ.options[currentQ.correctIndex].slice(0, 1)} chiếm ${correctPct}% bình chọn!`);
    playSoundEffect('click');
  };

  // Lifeline 3: Call AI Expert
  const handleUseCall = () => {
    if (usedCall || isAnswerLocked) return;
    setUsedCall(true);

    setLifelineOutput(`📞 Thầy Cô AI Giáo Viên Tiếng Anh 9: "Theo thầy/cô, đáp án chính xác nhất là ${currentQ.options[currentQ.correctIndex]} vì ${currentQ.explanation}"`);
    playSoundEffect('click');
  };

  const restartGame = () => {
    setCurrentLevelIdx(0);
    setSelectedOpt(null);
    setIsAnswerLocked(false);
    setGameOver(false);
    setWonGrandPrize(false);
    setUsed5050(false);
    setUsedAudience(false);
    setUsedCall(false);
    setDisabledOptions([]);
    setLifelineOutput(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* TV Studio Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 rounded-3xl p-6 sm:p-8 text-white border border-indigo-900 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex items-center space-x-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Trò Chơi Trắc Nghiệm Tiếng Anh 9</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            Ai Là Triệu Phú Tiếng Anh 9
          </h2>
          <p className="text-xs text-slate-300 max-w-lg">
            Chinh phục 15 câu hỏi trắc nghiệm từ vựng & ngữ pháp SGK Tiếng Anh 9 để giành phần thưởng 150.000.000 VNĐ điểm tích lũy!
          </p>
        </div>

        {/* Lifelines Bar */}
        <div className="flex items-center space-x-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <button
            onClick={handleUse5050}
            disabled={used5050 || isAnswerLocked || gameOver}
            className={`flex flex-col items-center p-2.5 rounded-xl text-xs font-bold transition-all ${
              used5050
                ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
            }`}
            title="Trợ giúp 50:50"
          >
            <HelpCircle className="w-5 h-5 mb-0.5" />
            <span>50:50</span>
          </button>

          <button
            onClick={handleUseAudience}
            disabled={usedAudience || isAnswerLocked || gameOver}
            className={`flex flex-col items-center p-2.5 rounded-xl text-xs font-bold transition-all ${
              usedAudience
                ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
            }`}
            title="Khán giả AI"
          >
            <Users className="w-5 h-5 mb-0.5" />
            <span>Khán Giả</span>
          </button>

          <button
            onClick={handleUseCall}
            disabled={usedCall || isAnswerLocked || gameOver}
            className={`flex flex-col items-center p-2.5 rounded-xl text-xs font-bold transition-all ${
              usedCall
                ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
            }`}
            title="Gọi chuyên gia AI"
          >
            <PhoneCall className="w-5 h-5 mb-0.5" />
            <span>Chuyên Gia</span>
          </button>
        </div>
      </div>

      {/* Lifeline Output Box */}
      {lifelineOutput && (
        <div className="p-4 rounded-2xl bg-indigo-950/90 border border-indigo-700 text-amber-200 text-xs sm:text-sm font-semibold shadow-lg animate-fade-in">
          {lifelineOutput}
        </div>
      )}

      {/* Main Game Interface Layout */}
      {!gameOver ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question & Options Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Host Question Box */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white border-2 border-indigo-600/80 shadow-2xl text-center space-y-4 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest bg-blue-900/80 px-3.5 py-1 rounded-full border border-blue-700">
                  Câu Hỏi Số {currentQ.level}: {currentQ.prize}
                </span>
                <button
                  onClick={() => speakEnglish(currentQ.question)}
                  className="p-2 rounded-xl bg-indigo-900/80 text-amber-300 hover:bg-indigo-800 border border-indigo-700 transition-colors"
                  title="Nghe MC đọc câu hỏi"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-amber-200 leading-relaxed">
                "{currentQ.question}"
              </h3>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQ.options.map((opt, idx) => {
                const isDisabled = disabledOptions.includes(idx);
                const isSelected = selectedOpt === idx;
                const isCorrect = idx === currentQ.correctIndex;

                let style =
                  'bg-slate-900 text-slate-100 hover:bg-slate-800 border-slate-700 shadow-md';
                if (isDisabled) {
                  style = 'opacity-20 bg-slate-900 text-slate-600 border-slate-800 cursor-not-allowed';
                } else if (isAnswerLocked) {
                  if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-400 font-bold animate-pulse';
                  else if (isSelected) style = 'bg-rose-600 text-white border-rose-400';
                } else if (isSelected) {
                  style = 'bg-amber-500 text-slate-950 border-amber-300 font-black shadow-lg';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isDisabled || isAnswerLocked}
                    className={`p-5 rounded-2xl text-sm sm:text-base border-2 transition-all text-left font-semibold flex items-center justify-between ${style}`}
                  >
                    <span>{opt}</span>
                    {isAnswerLocked && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>

            {/* Confirm Answer Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOpt === null || isAnswerLocked}
                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-40 text-slate-950 font-black text-sm rounded-2xl shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
              >
                Chốt Đáp Án Này!
              </button>
            </div>
          </div>

          {/* Money Prize Ladder Sidebar */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 shadow-xl space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-800 pb-2">
              Thang Mức Thưởng
            </h4>
            <div className="space-y-1 text-xs">
              {[...MILLIONAIRE_QUESTIONS].reverse().map((q) => {
                const isCurrent = q.level === currentQ.level;
                const isPassed = q.level < currentQ.level;
                const isMilestone = q.level % 5 === 0;

                let rowStyle = 'text-slate-400 bg-slate-800/40';
                if (isCurrent) rowStyle = 'bg-amber-500 text-slate-950 font-black rounded-xl shadow-md';
                else if (isPassed) rowStyle = 'text-emerald-400 font-bold bg-emerald-950/40';
                else if (isMilestone) rowStyle = 'text-amber-300 font-extrabold';

                return (
                  <div
                    key={q.level}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg transition-all ${rowStyle}`}
                  >
                    <span>{q.level}</span>
                    <span>{q.prize}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Game Over / Win Result screen */
        <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border-2 border-amber-500 shadow-2xl">
          <Award className="w-20 h-20 text-amber-400 mx-auto animate-bounce" />
          <h3 className="text-3xl font-black">
            {wonGrandPrize ? 'Chúc Mừng! Bạn Đã Trở Thành Triệu Phú Tiếng Anh 9!' : 'Rất Tiếc! Cuộc Chơi Kết Thúc!'}
          </h3>
          <p className="text-base text-slate-300 max-w-lg mx-auto">
            {wonGrandPrize
              ? 'Bạn đã trả lời xuất sắc 15/15 câu hỏi SGK Tiếng Anh 9 và giành giải thưởng 150.000.000 VNĐ!'
              : `Bạn dừng cuộc chơi ở Câu ${currentQ.level} với mức tiền thưởng đạt được: ${
                  currentQ.level > 1 ? MILLIONAIRE_QUESTIONS[currentQ.level - 2].prize : '0 VNĐ'
                }`}
          </p>

          <button
            onClick={restartGame}
            className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm rounded-2xl shadow-xl transition-all"
          >
            Chơi Lại Từ Đầu
          </button>
        </div>
      )}
    </div>
  );
};
