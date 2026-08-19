import React, { useState, useEffect } from 'react';
import { SPEED_REFLEX_QUESTIONS } from '../../data/speedReflexQuestions';
import { Zap, Timer, Trophy, RefreshCw, Flame, CheckCircle2, Volume2 } from 'lucide-react';
import { playSoundEffect, speakEnglish, getPreferredVoice, VoiceProfile } from '../../utils/audioHelpers';

export const SpeedReflexGame: React.FC<{ onAddPoints: (pts: number) => void }> = ({ onAddPoints }) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const currentQ = SPEED_REFLEX_QUESTIONS[questionIdx % SPEED_REFLEX_QUESTIONS.length];

  useEffect(() => {
    let timer: any;
    if (gameStarted && !gameOver && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameOver(true);
            onAddPoints(score);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStarted, gameOver, timeLeft, score, onAddPoints]);

  const handleStartGame = () => {
    setGameStarted(true);
    setTimeLeft(45);
    setScore(0);
    setStreak(0);
    setQuestionIdx(0);
    setSelectedOpt(null);
    setGameOver(false);
  };

  const handleSelectAnswer = (opt: string) => {
    if (selectedOpt !== null || gameOver) return;
    setSelectedOpt(opt);

    if (opt === currentQ.correctAnswer) {
      playSoundEffect('correct');
      const ptsToAdd = 10 + streak * 2;
      setScore((prev) => prev + ptsToAdd);
      setStreak((prev) => prev + 1);
    } else {
      playSoundEffect('wrong');
      setStreak(0);
    }

    setTimeout(() => {
      setSelectedOpt(null);
      setQuestionIdx((prev) => prev + 1);
    }, 400);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center space-x-1 bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
            <Zap className="w-4 h-4 text-amber-200" />
            <span>Thử Thách Tốc Độ 45s</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mt-2">Trò Chơi Phản Xạ Nhanh</h2>
          <p className="text-xs text-amber-100">Trả lời thật nhanh để tích lũy điểm thưởng và giữ chuỗi Combo!</p>
        </div>

        {gameStarted && !gameOver && (
          <div className="flex items-center space-x-4 bg-slate-900/80 p-3.5 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-1.5 font-mono text-xl font-black text-amber-300">
              <Timer className="w-5 h-5 text-amber-400 animate-pulse" />
              <span>{timeLeft}s</span>
            </div>
            <div className="flex items-center space-x-1 text-sm font-bold text-emerald-300">
              <Trophy className="w-4 h-4" />
              <span>{score}đ</span>
            </div>
          </div>
        )}
      </div>

      {!gameStarted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center space-y-6 border border-slate-200 shadow-sm">
          <Zap className="w-16 h-16 text-amber-500 mx-auto animate-bounce" />
          <h3 className="text-2xl font-black text-slate-900">Bạn Đã Sẵn Sàng Thử Thách?</h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Mỗi câu hỏi chỉ có thời gian rất ngắn. Chọn nhanh và đúng để gia tăng chuỗi Combo nhân đôi điểm thưởng!
          </p>
          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all hover:scale-105"
          >
            Bắt Đầu Ngay (45 Giây)
          </button>
        </div>
      ) : !gameOver ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          {/* Combo Indicator */}
          <div className="flex items-center justify-between text-xs font-bold border-b border-slate-100 pb-3">
            <span className="text-slate-400">Câu số {questionIdx + 1}</span>
            {streak > 1 && (
              <span className="flex items-center space-x-1 text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full animate-bounce">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Combo {streak}x! (+{streak * 2}đ)</span>
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="py-6 px-4 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Câu hỏi:</span>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => speakEnglish(currentQ.prompt, 0.9, undefined, 'female')}
                  className="px-2 py-1 rounded-lg bg-pink-100 text-pink-700 hover:bg-pink-200 text-xs font-bold transition-colors"
                  title="Cô Emily đọc câu hỏi"
                >
                  👩‍🏫 Cô Emily
                </button>
                <button
                  onClick={() => speakEnglish(currentQ.prompt, 0.9, undefined, 'male')}
                  className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs font-bold transition-colors"
                  title="Thầy David đọc câu hỏi"
                >
                  👨‍🏫 Thầy David
                </button>
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              "{currentQ.prompt}"
            </h3>
          </div>

          {/* 4 Choices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOpt === opt;
              const isCorrect = opt === currentQ.correctAnswer;

              let style = 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200';
              if (selectedOpt !== null) {
                if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-700 font-bold';
                else if (isSelected) style = 'bg-rose-600 text-white border-rose-700';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectAnswer(opt)}
                  disabled={selectedOpt !== null}
                  className={`p-4 rounded-2xl text-sm font-bold border transition-all text-left flex items-center justify-between ${style}`}
                >
                  <span>{opt}</span>
                  {selectedOpt !== null && isCorrect && <CheckCircle2 className="w-5 h-5 text-white" />}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Game Over Modal */
        <div className="bg-white rounded-3xl p-8 text-center space-y-6 border border-slate-200 shadow-xl">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
          <h3 className="text-2xl font-black text-slate-900">Hết Giờ! Hoàn Thành Thử Thách Phản Xạ!</h3>
          <p className="text-base text-slate-600">
            Tổng điểm đạt được: <strong className="text-amber-600 text-2xl">{score} điểm</strong>
          </p>

          <button
            onClick={handleStartGame}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg transition-all"
          >
            Thử Lại Lần Nữa
          </button>
        </div>
      )}
    </div>
  );
};
