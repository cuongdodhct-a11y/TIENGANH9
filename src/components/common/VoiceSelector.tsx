import React, { useState, useEffect } from 'react';
import { getPreferredVoice, setPreferredVoice, subscribeVoiceChange, VoiceProfile, speakEnglish, playSoundEffect } from '../../utils/audioHelpers';
import { Volume2, Sparkles, Check } from 'lucide-react';

interface VoiceSelectorProps {
  compact?: boolean;
  showTestButton?: boolean;
  className?: string;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  compact = false,
  showTestButton = false,
  className = '',
}) => {
  const [currentVoice, setCurrentVoice] = useState<VoiceProfile>(getPreferredVoice());
  const [playingTestVoice, setPlayingTestVoice] = useState<VoiceProfile | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeVoiceChange((v) => {
      setCurrentVoice(v);
    });
    return unsubscribe;
  }, []);

  const handleSelectVoice = (voice: VoiceProfile) => {
    playSoundEffect('click');
    setPreferredVoice(voice);
    setCurrentVoice(voice);
  };

  const handleTestAudio = (e: React.MouseEvent, voiceToTest: VoiceProfile) => {
    e.stopPropagation();
    playSoundEffect('click');
    setPlayingTestVoice(voiceToTest);
    const testText =
      voiceToTest === 'female'
        ? "Hello! I am teacher Emily. Nice to meet you!"
        : "Hello! I am teacher David. Let's master English together!";
    speakEnglish(
      testText,
      0.9,
      () => {
        setPlayingTestVoice(null);
      },
      voiceToTest
    );
  };

  if (compact) {
    return (
      <div className={`inline-flex items-center p-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-inner ${className}`}>
        {/* Cô Emily Button */}
        <button
          onClick={() => handleSelectVoice('female')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
            currentVoice === 'female'
              ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-md shadow-rose-500/40 ring-2 ring-rose-400'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Chọn Cô Emily (Giọng Nữ Bản Xứ Chuẩn Mỹ)"
        >
          <span className="text-sm">👩‍🏫</span>
          <span>Cô Emily</span>
          {currentVoice === 'female' && <Check className="w-3 h-3 text-white ml-0.5" />}
        </button>

        {/* Thầy David Button */}
        <button
          onClick={() => handleSelectVoice('male')}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
            currentVoice === 'male'
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md shadow-blue-500/40 ring-2 ring-cyan-400'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Chọn Thầy David (Giọng Nam Bản Xứ Chuẩn Mỹ)"
        >
          <span className="text-sm">👨‍🏫</span>
          <span>Thầy David</span>
          {currentVoice === 'male' && <Check className="w-3 h-3 text-white ml-0.5" />}
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/95 p-3 sm:p-4 rounded-3xl border border-slate-800 shadow-xl ${className}`}>
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Chọn Giáo Viên Phát Âm Bản Ngữ (US Native)
          </h4>
          <p className="text-[11px] text-slate-400">
            {currentVoice === 'female'
              ? 'Đang chọn: 👩‍🏫 Cô Emily (Giọng Nữ trong trẻo, tự nhiên)'
              : 'Đang chọn: 👨‍🏫 Thầy David (Giọng Nam trầm ấm, nội lực)'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {/* Cô Emily Box */}
        <div className="flex items-center">
          <button
            onClick={() => handleSelectVoice('female')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              currentVoice === 'female'
                ? 'bg-gradient-to-r from-pink-600 to-rose-500 text-white shadow-lg shadow-rose-500/30 ring-2 ring-rose-300 scale-[1.02]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span className="text-base">👩‍🏫</span>
            <div className="text-left">
              <p className="leading-none">Cô Emily</p>
              <p className="text-[10px] font-normal opacity-90">Giọng Nữ Mỹ</p>
            </div>
            {currentVoice === 'female' && <Check className="w-3.5 h-3.5 ml-1 text-white" />}
          </button>

          <button
            onClick={(e) => handleTestAudio(e, 'female')}
            className={`ml-1.5 p-2 rounded-xl border transition-all ${
              playingTestVoice === 'female'
                ? 'bg-rose-500 text-white animate-pulse border-rose-400'
                : 'bg-slate-800 text-slate-400 hover:text-rose-300 hover:bg-slate-700 border-slate-700'
            }`}
            title="Bấm để nghe thử giọng Cô Emily"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        {/* Thầy David Box */}
        <div className="flex items-center">
          <button
            onClick={() => handleSelectVoice('male')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs font-black transition-all ${
              currentVoice === 'male'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-cyan-300 scale-[1.02]'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            <span className="text-base">👨‍🏫</span>
            <div className="text-left">
              <p className="leading-none">Thầy David</p>
              <p className="text-[10px] font-normal opacity-90">Giọng Nam Mỹ</p>
            </div>
            {currentVoice === 'male' && <Check className="w-3.5 h-3.5 ml-1 text-white" />}
          </button>

          <button
            onClick={(e) => handleTestAudio(e, 'male')}
            className={`ml-1.5 p-2 rounded-xl border transition-all ${
              playingTestVoice === 'male'
                ? 'bg-cyan-500 text-white animate-pulse border-cyan-400'
                : 'bg-slate-800 text-slate-400 hover:text-blue-300 hover:bg-slate-700 border-slate-700'
            }`}
            title="Bấm để nghe thử giọng Thầy David"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
