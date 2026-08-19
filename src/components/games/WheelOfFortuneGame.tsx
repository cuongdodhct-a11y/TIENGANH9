import React, { useState, useEffect, useRef, useMemo } from 'react';
import { WHEEL_PUZZLES, WheelPuzzle } from '../../data/wheelOfFortunePuzzles';
import {
  Sparkles,
  Trophy,
  RotateCw,
  HelpCircle,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Flame,
  Gift,
  ShieldAlert,
  Zap,
  Filter,
  VolumeX,
  Star,
  Award,
  RefreshCw,
} from 'lucide-react';
import {
  playSoundEffect,
  speakEnglish,
  stopSpeaking,
  getPreferredVoice,
  VoiceProfile,
} from '../../utils/audioHelpers';

interface WheelSegment {
  label: string;
  type: 'points' | 'double' | 'gift' | 'lose_turn' | 'extra_spin' | 'jackpot';
  value: number;
  color: string;
  textColor: string;
}

const WHEEL_SEGMENTS: WheelSegment[] = [
  { label: '500 PTS', type: 'points', value: 500, color: '#f59e0b', textColor: '#000000' },
  { label: '200 PTS', type: 'points', value: 200, color: '#3b82f6', textColor: '#ffffff' },
  { label: '🎁 HỘP QUÀ', type: 'gift', value: 400, color: '#ec4899', textColor: '#ffffff' },
  { label: '300 PTS', type: 'points', value: 300, color: '#10b981', textColor: '#ffffff' },
  { label: '🚫 MẤT LƯỢT', type: 'lose_turn', value: 0, color: '#ef4444', textColor: '#ffffff' },
  { label: '👑 JACKPOT', type: 'jackpot', value: 1000, color: '#8b5cf6', textColor: '#ffffff' },
  { label: '100 PTS', type: 'points', value: 100, color: '#06b6d4', textColor: '#ffffff' },
  { label: '⚡ NHÂN ĐÔI', type: 'double', value: 2, color: '#eab308', textColor: '#000000' },
  { label: '400 PTS', type: 'points', value: 400, color: '#6366f1', textColor: '#ffffff' },
  { label: '⭐ +1 LƯỢT', type: 'extra_spin', value: 0, color: '#14b8a6', textColor: '#ffffff' },
  { label: '150 PTS', type: 'points', value: 150, color: '#f97316', textColor: '#ffffff' },
  { label: '350 PTS', type: 'points', value: 350, color: '#84cc16', textColor: '#000000' },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const VOWELS = ['A', 'E', 'I', 'O', 'U'];

export const WheelOfFortuneGame: React.FC<{ onAddPoints: (pts: number) => void }> = ({
  onAddPoints,
}) => {
  const [selectedUnitFilter, setSelectedUnitFilter] = useState<number>(0); // 0 = All Units
  const [puzzleFilteredIndex, setPuzzleFilteredIndex] = useState(0);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [gameScore, setGameScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [turnsLeft, setTurnsLeft] = useState(6);
  const [streakCount, setStreakCount] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [currentSegment, setCurrentSegment] = useState<WheelSegment | null>(null);
  const [spinMessage, setSpinMessage] = useState<string>(
    'Chào mừng bạn đến với Chiếc Nón Kỳ Diệu! Hãy bấm "QUAY NÓN" để bắt đầu.'
  );
  const [mustGuessLetter, setMustGuessLetter] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [showSolveModal, setShowSolveModal] = useState(false);
  const [solveInputText, setSolveInputText] = useState('');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [speakingVoice, setSpeakingVoice] = useState<VoiceProfile | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter puzzles based on selected unit
  const activePuzzles = useMemo(() => {
    if (selectedUnitFilter === 0) return WHEEL_PUZZLES;
    return WHEEL_PUZZLES.filter((p) => p.unitNumber === selectedUnitFilter);
  }, [selectedUnitFilter]);

  const currentPuzzle: WheelPuzzle =
    activePuzzles[puzzleFilteredIndex] || activePuzzles[0] || WHEEL_PUZZLES[0];

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Draw the wheel onto HTML5 canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 8;
    const numSegments = WHEEL_SEGMENTS.length;
    const segmentAngle = (2 * Math.PI) / numSegments;

    ctx.clearRect(0, 0, width, height);

    // Draw Wheel Segments
    WHEEL_SEGMENTS.forEach((seg, i) => {
      const angle = i * segmentAngle;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + segmentAngle);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // Draw Segment Label
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + segmentAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = seg.textColor;
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(seg.label, radius - 14, 4);
      ctx.restore();
    });

    // Outer rim border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();

    // Center circle hub
    ctx.beginPath();
    ctx.arc(centerX, centerY, 34, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#f59e0b';
    ctx.stroke();

    // Center star icon / text
    ctx.fillStyle = '#fef08a';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NÓN KỲ DIỆU', centerX, centerY);
  }, []);

  // Check if puzzle is completely revealed
  useEffect(() => {
    if (!currentPuzzle) return;
    const lettersInPhrase = currentPuzzle.phrase
      .replace(/[^A-Z]/g, '')
      .split('');

    const allRevealed = lettersInPhrase.every((char) => guessedLetters.has(char));
    if (allRevealed && !isSolved && lettersInPhrase.length > 0) {
      handlePuzzleSolvedSuccess();
    }
  }, [guessedLetters, currentPuzzle]);

  const handlePuzzleSolvedSuccess = () => {
    setIsSolved(true);
    setMustGuessLetter(false);
    playSoundEffect('win');
    const bonus = 400 + streakCount * 50;
    const totalWon = roundScore + bonus;
    setGameScore((prev) => prev + totalWon);
    setStreakCount((prev) => prev + 1);
    onAddPoints(totalWon);
    setSpinMessage(
      `🎉 CHÚC MỪNG BẠN ĐÃ GIẢI XONG Ô CHỮ: "${currentPuzzle.phrase}"! (+${totalWon} điểm)`
    );

    // Speak English phrase automatically with Teacher David's vibrant voice
    speakEnglish(currentPuzzle.phrase, 0.9, undefined, 'male');
  };

  const handleSpinWheel = () => {
    if (isSpinning || mustGuessLetter || isSolved || turnsLeft <= 0) return;

    stopSpeaking();
    setIsSpinning(true);
    playSoundEffect('click');
    setSpinMessage('Vòng quay đang quay với tốc độ cao... Chúc bạn nhận điểm tối đa!');

    const randomRotations = 5 + Math.floor(Math.random() * 4); // 5-8 full spins
    const randomSegmentIndex = Math.floor(Math.random() * WHEEL_SEGMENTS.length);
    const segmentAngleDeg = 360 / WHEEL_SEGMENTS.length;

    // Pointer is at Top (270 degrees in standard circle or 90 offset)
    const targetDegree =
      wheelRotation +
      randomRotations * 360 +
      (360 - (randomSegmentIndex * segmentAngleDeg + segmentAngleDeg / 2));

    setWheelRotation(targetDegree);

    // Wheel tick sounds during spin
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      tickCount++;
      playSoundEffect('click');
      if (tickCount > 18) clearInterval(tickInterval);
    }, 160);

    setTimeout(() => {
      setIsSpinning(false);
      const landedSegment = WHEEL_SEGMENTS[randomSegmentIndex];
      setCurrentSegment(landedSegment);

      if (landedSegment.type === 'lose_turn') {
        playSoundEffect('wrong');
        setTurnsLeft((prev) => Math.max(0, prev - 1));
        setStreakCount(0);
        setSpinMessage('😢 RẤT TIẾC! Bạn quay vào ô "MẤT LƯỢT". Bị trừ 1 lượt quay!');
        setMustGuessLetter(false);
      } else if (landedSegment.type === 'extra_spin') {
        playSoundEffect('correct');
        setTurnsLeft((prev) => prev + 1);
        setSpinMessage('⭐ TUYỆT VỜI! Bạn nhận được thêm +1 LƯỢT QUAY! Hãy quay tiếp hoặc đoán ô chữ.');
        setMustGuessLetter(false);
      } else if (landedSegment.type === 'gift') {
        playSoundEffect('win');
        setRoundScore((prev) => prev + 400);
        setSpinMessage('🎁 HỘP QUÀ MAY MẮN! Nhận ngay +400 điểm thưởng. Hãy chọn 1 chữ cái!');
        setMustGuessLetter(true);
      } else if (landedSegment.type === 'jackpot') {
        playSoundEffect('win');
        setRoundScore((prev) => prev + 1000);
        setSpinMessage('👑 TRÚNG JACKPOT 1000 ĐIỂM! Hãy chọn 1 chữ cái để mở ô chữ!');
        setMustGuessLetter(true);
      } else if (landedSegment.type === 'double') {
        playSoundEffect('correct');
        setRoundScore((prev) => (prev > 0 ? prev * 2 : 300));
        setSpinMessage('⚡ NHÂN ĐÔI ĐIỂM SỐ! Hãy đoán 1 chữ cái để nhân đôi toàn bộ điểm số vòng này!');
        setMustGuessLetter(true);
      } else {
        playSoundEffect('chime');
        setSpinMessage(
          `🎯 Bạn quay vào ô "${landedSegment.label}"! Hãy chọn 1 chữ cái (A-Z) để lật các ô trùng khớp.`
        );
        setMustGuessLetter(true);
      }
    }, 3200);
  };

  const handleGuessLetter = (letter: string) => {
    if (!mustGuessLetter || guessedLetters.has(letter) || isSolved) return;

    playSoundEffect('click');
    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    const occurrences = currentPuzzle.phrase
      .split('')
      .filter((char) => char.toUpperCase() === letter).length;

    if (occurrences > 0) {
      playSoundEffect('correct');
      const segmentValue = currentSegment?.type === 'points' ? currentSegment.value : 200;
      const pointsEarned = segmentValue * occurrences;
      setRoundScore((prev) => prev + pointsEarned);
      setSpinMessage(
        `✨ CHÍNH XÁC! Có ${occurrences} chữ "${letter}" trong ô chữ (+${pointsEarned} điểm). Bạn có thể quay nón tiếp!`
      );
      setMustGuessLetter(false);

      // Pronounce letter phonetically
      speakEnglish(letter, 1.0, undefined, 'male');
    } else {
      playSoundEffect('wrong');
      setTurnsLeft((prev) => Math.max(0, prev - 1));
      setStreakCount(0);
      setSpinMessage(`❌ Không có chữ "${letter}" trong ô chữ! Bị trừ 1 lượt quay.`);
      setMustGuessLetter(false);
    }
  };

  const handleSolvePuzzleSubmit = () => {
    const cleanInput = solveInputText.trim().toUpperCase().replace(/[^A-Z]/g, '');
    const cleanTarget = currentPuzzle.phrase.trim().toUpperCase().replace(/[^A-Z]/g, '');

    setShowSolveModal(false);
    setSolveInputText('');

    if (cleanInput === cleanTarget) {
      // Reveal all letters
      const allLetters = new Set(ALPHABET);
      setGuessedLetters(allLetters);
      handlePuzzleSolvedSuccess();
    } else {
      playSoundEffect('wrong');
      setTurnsLeft((prev) => Math.max(0, prev - 2));
      setStreakCount(0);
      setSpinMessage(`❌ Đáp án "${solveInputText}" chưa chính xác! Bị trừ 2 lượt quay.`);
    }
  };

  const handleNextPuzzle = () => {
    playSoundEffect('click');
    stopSpeaking();
    const nextIdx = (puzzleFilteredIndex + 1) % activePuzzles.length;
    setPuzzleFilteredIndex(nextIdx);
    setGuessedLetters(new Set());
    setRoundScore(0);
    setTurnsLeft(6);
    setIsSolved(false);
    setMustGuessLetter(false);
    setCurrentSegment(null);
    setSpinMessage('Hãy bấm "QUAY NÓN" để nhận điểm và mở ô chữ mới!');
  };

  const handlePlayVoice = (text: string, voice: VoiceProfile) => {
    playSoundEffect('click');
    if (speakingText === text && speakingVoice === voice) {
      stopSpeaking();
      setSpeakingText(null);
      setSpeakingVoice(null);
    } else {
      setSpeakingText(text);
      setSpeakingVoice(voice);
      speakEnglish(
        text,
        0.9,
        () => {
          setSpeakingText(null);
          setSpeakingVoice(null);
        },
        voice
      );
    }
  };

  const handleUnitFilterChange = (unitNum: number) => {
    setSelectedUnitFilter(unitNum);
    setPuzzleFilteredIndex(0);
    setGuessedLetters(new Set());
    setRoundScore(0);
    setTurnsLeft(6);
    setIsSolved(false);
    setMustGuessLetter(false);
    setCurrentSegment(null);
    setSpinMessage(`Đã chuyển sang ${unitNum === 0 ? 'Tất cả 12 Units' : `Unit ${unitNum}`}. Hãy bấm "QUAY NÓN"!`);
  };

  // Render puzzle phrase letters split into words
  const words = currentPuzzle.phrase.split(' ');

  return (
    <div className="space-y-6">
      {/* Game Header Bar */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 bg-slate-900/40 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Trò Chơi Giáo Dục SGK Tiếng Anh 9</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
            🎡 Chiếc Nón Kỳ Diệu (Wheel of Words)
          </h2>
          <p className="text-xs sm:text-sm text-orange-100 font-medium">
            Quay nón, tích điểm thưởng, luyện phát âm cùng Thầy David & giải mã ô chữ 12 bài học
          </p>
        </div>

        {/* Stats Counters */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-300/30 text-center">
            <span className="text-[10px] uppercase font-bold text-amber-300 block">Tổng Điểm</span>
            <span className="text-xl font-black text-white">{gameScore} pts</span>
          </div>

          <div className="bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-300/30 text-center">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block">Vòng Này</span>
            <span className="text-xl font-black text-emerald-400">+{roundScore}</span>
          </div>

          <div className="bg-slate-950/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-amber-300/30 text-center">
            <span className="text-[10px] uppercase font-bold text-rose-300 block">Lượt Còn</span>
            <span className="text-xl font-black text-rose-400">❤️ {turnsLeft}</span>
          </div>

          {streakCount > 1 && (
            <div className="bg-amber-950/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-amber-500/50 text-center animate-pulse">
              <span className="text-[10px] uppercase font-bold text-amber-300 flex items-center justify-center space-x-1">
                <Flame className="w-3 h-3 text-orange-400" />
                <span>Streak</span>
              </span>
              <span className="text-lg font-black text-amber-300">{streakCount}x</span>
            </div>
          )}
        </div>
      </div>

      {/* Unit Filter Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs">
        <div className="flex items-center space-x-2 text-slate-300 font-bold">
          <Filter className="w-4 h-4 text-amber-400" />
          <span>Lọc Chủ Đề Ô Chữ Theo Unit:</span>
        </div>

        <div className="flex items-center space-x-1.5 flex-wrap gap-1">
          <button
            onClick={() => handleUnitFilterChange(0)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
              selectedUnitFilter === 0
                ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tất Cả (36 Ô Chữ)
          </button>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((u) => (
            <button
              key={u}
              onClick={() => handleUnitFilterChange(u)}
              className={`px-2.5 py-1.5 rounded-xl font-bold transition-all ${
                selectedUnitFilter === u
                  ? 'bg-blue-600 text-white shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`}
            >
              U{u}
            </button>
          ))}
        </div>
      </div>

      {/* Main Game Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: The Rotating Wheel Display (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col items-center justify-between space-y-4">
          <div className="w-full flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
            <span className="font-bold text-amber-400 flex items-center space-x-1.5">
              <Zap className="w-4 h-4" />
              <span>Vòng Quay May Mắn</span>
            </span>
            <span className="text-slate-400 font-mono">
              Ô chữ {puzzleFilteredIndex + 1}/{activePuzzles.length}
            </span>
          </div>

          {/* Wheel Container with Pointer */}
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center my-2">
            {/* Top Pointer Arrow */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-x-[14px] border-x-transparent border-t-[26px] border-t-amber-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)]" />

            {/* Canvas Wheel */}
            <canvas
              ref={canvasRef}
              width={320}
              height={320}
              style={{
                transform: `rotate(${wheelRotation}deg)`,
                transition: isSpinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none',
              }}
              className="rounded-full shadow-2xl border-4 border-amber-400"
            />
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-2.5 pt-2">
            <button
              onClick={handleSpinWheel}
              disabled={isSpinning || mustGuessLetter || isSolved || turnsLeft <= 0}
              className={`w-full py-3.5 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl transition-all ${
                mustGuessLetter
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/40 animate-pulse'
                  : isSolved
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : turnsLeft <= 0
                  ? 'bg-rose-900/60 text-rose-300 border border-rose-700/50'
                  : 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 active:scale-95 shadow-amber-500/25'
              }`}
            >
              <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
              <span>
                {isSpinning
                  ? 'Đang Quay Nón...'
                  : mustGuessLetter
                  ? '👉 Hãy Chọn 1 Chữ Cái Phía Dưới'
                  : isSolved
                  ? 'Ô Chữ Đã Giải Xong'
                  : turnsLeft <= 0
                  ? 'Hết Lượt Quay'
                  : 'QUAY NÓN KỲ DIỆU'}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowSolveModal(true)}
                disabled={isSolved || turnsLeft <= 0}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-blue-600/80 text-blue-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors disabled:opacity-40"
              >
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                <span>Đoán Cả Ô Chữ</span>
              </button>

              <button
                onClick={handleNextPuzzle}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Câu Tiếp Theo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: The Word Puzzle Board & Guessing Letters (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900/90 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col justify-between space-y-5">
          {/* Category & Clue Header */}
          <div className="space-y-3 bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold uppercase">
                {currentPuzzle.category} - {currentPuzzle.unitTitle}
              </span>

              {/* Teacher Pronunciation Buttons for Clue */}
              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handlePlayVoice(currentPuzzle.phrase, 'male')}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                    speakingText === currentPuzzle.phrase && speakingVoice === 'male'
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-800 text-cyan-300 hover:bg-slate-700 border border-cyan-500/30'
                  }`}
                  title="Nghe Thầy David phát âm mẫu câu"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>👨‍🏫 Thầy David</span>
                </button>
                <button
                  onClick={() => handlePlayVoice(currentPuzzle.phrase, 'female')}
                  className={`px-3 py-1 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 ${
                    speakingText === currentPuzzle.phrase && speakingVoice === 'female'
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-slate-800 text-rose-300 hover:bg-slate-700 border border-rose-500/30'
                  }`}
                  title="Nghe Cô Emily phát âm mẫu câu"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>👩‍🏫 Cô Emily</span>
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                Gợi Ý Ô Chữ Tiếng Việt:
              </p>
              <p className="text-sm sm:text-base text-amber-200 font-medium leading-snug">
                💡 "{currentPuzzle.hintVietnamese}"
              </p>
            </div>
          </div>

          {/* The Big Puzzle Board Tiles */}
          <div className="p-6 rounded-3xl bg-slate-950 border-2 border-slate-800 flex flex-wrap items-center justify-center gap-y-3.5 gap-x-5 min-h-[140px]">
            {words.map((word, wIdx) => (
              <div key={wIdx} className="flex items-center space-x-1.5">
                {word.split('').map((char, cIdx) => {
                  const isRevealed = guessedLetters.has(char) || isSolved;
                  return (
                    <div
                      key={cIdx}
                      className={`w-9 h-11 sm:w-11 sm:h-13 rounded-xl font-black text-lg sm:text-xl flex items-center justify-center transition-all duration-300 shadow-md ${
                        isRevealed
                          ? 'bg-gradient-to-t from-blue-600 to-cyan-400 text-white ring-2 ring-cyan-300 scale-105'
                          : 'bg-slate-800/90 text-transparent border-2 border-slate-700'
                      }`}
                    >
                      {isRevealed ? char : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Status Message Box */}
          <div
            className={`p-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-center border transition-all ${
              isSolved
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/50'
                : mustGuessLetter
                ? 'bg-amber-950/60 text-amber-200 border-amber-500/50 animate-pulse'
                : 'bg-slate-800/80 text-slate-300 border-slate-700'
            }`}
          >
            {spinMessage}
          </div>

          {/* Alphabet Keyboard for Guessing */}
          <div className="space-y-2 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase pb-1">
              <span>Bàn Phím Chữ Cái (A-Z)</span>
              <span className="text-amber-400 font-mono">
                {mustGuessLetter ? '👉 Đang đợi bạn chọn 1 chữ' : 'Cần quay nón trước'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {ALPHABET.map((letter) => {
                const isGuessed = guessedLetters.has(letter);
                const isVowel = VOWELS.includes(letter);

                return (
                  <button
                    key={letter}
                    onClick={() => handleGuessLetter(letter)}
                    disabled={!mustGuessLetter || isGuessed || isSolved}
                    className={`w-7 h-8 sm:w-8 sm:h-9 rounded-lg font-black text-xs sm:text-sm transition-all flex items-center justify-center ${
                      isGuessed
                        ? 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-800 opacity-30'
                        : mustGuessLetter
                        ? isVowel
                          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md active:scale-95'
                          : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md active:scale-95'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                    }`}
                  >
                    {letter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Solved Explanation Box */}
          {isSolved && (
            <div className="p-4 rounded-2xl bg-blue-950/70 border border-blue-500/40 text-xs sm:text-sm space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-black text-cyan-300 flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Giải Thích Từ Vựng & Mẫu Câu SGK:</span>
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => handlePlayVoice(currentPuzzle.exampleSentence, 'male')}
                    className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition-colors flex items-center space-x-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>👨‍🏫 Thầy David</span>
                  </button>
                  <button
                    onClick={() => handlePlayVoice(currentPuzzle.exampleSentence, 'female')}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs hover:bg-rose-500 transition-colors flex items-center space-x-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>👩‍🏫 Cô Emily</span>
                  </button>
                </div>
              </div>

              <p className="text-slate-200 leading-relaxed font-sans">{currentPuzzle.detailedExplanation}</p>
              <p className="text-amber-300 italic font-mono bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                👉 Ví dụ SGK: "{currentPuzzle.exampleSentence}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Đoán Toàn Bộ Ô Chữ */}
      {showSolveModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl text-white">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-black text-amber-400 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5" />
                <span>Đoán Toàn Bộ Ô Chữ</span>
              </h3>
              <button
                onClick={() => setShowSolveModal(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                ✕ Đóng
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Nhập toàn bộ cụm từ tiếng Anh. Nếu đoán đúng bạn sẽ nhận ngay{' '}
              <strong className="text-emerald-400">+400 điểm thưởng</strong>! Nếu sai sẽ bị trừ 2 lượt quay.
            </p>

            <input
              type="text"
              value={solveInputText}
              onChange={(e) => setSolveInputText(e.target.value)}
              placeholder="Nhập cụm từ tiếng Anh..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white font-black text-base uppercase focus:outline-none focus:ring-2 focus:ring-amber-400"
              autoFocus
            />

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowSolveModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-bold"
              >
                Hủy Bỏ
              </button>
              <button
                onClick={handleSolvePuzzleSubmit}
                disabled={!solveInputText.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs uppercase shadow-md disabled:opacity-40"
              >
                Xác Nhận Đáp Án
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
