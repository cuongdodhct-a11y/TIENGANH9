import React, { useState, useEffect, useRef } from 'react';
import { SpeakingPrompt, AISpeakingEval } from '../../types';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Trophy, Bot, VolumeX, Send, ArrowRight } from 'lucide-react';
import { speakEnglish, playSoundEffect, stopSpeaking, getPreferredVoice, VoiceProfile } from '../../utils/audioHelpers';
import { VoiceSelector } from '../common/VoiceSelector';

interface SpeakingTabProps {
  speakingPrompts: SpeakingPrompt[];
  onSkillComplete: () => void;
}

export const SpeakingTab: React.FC<SpeakingTabProps> = ({ speakingPrompts, onSkillComplete }) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [activePlayingVoice, setActivePlayingVoice] = useState<VoiceProfile | null>(null);
  const [userTranscript, setUserTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [evalResult, setEvalResult] = useState<AISpeakingEval | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef<any>(null);
  const animFrameRef = useRef<number | null>(null);

  const currentPrompt = speakingPrompts[activePromptIndex] || speakingPrompts[0];

  // Direct Teacher Audio Playback with 0ms Delay
  const handlePlayNativeAudio = (forcedVoice?: VoiceProfile) => {
    playSoundEffect('click');
    const voiceToPlay = forcedVoice || getPreferredVoice();
    if (isPlayingNative && activePlayingVoice === voiceToPlay) {
      stopSpeaking();
      setIsPlayingNative(false);
      setActivePlayingVoice(null);
    } else {
      setIsPlayingNative(true);
      setActivePlayingVoice(voiceToPlay);
      speakEnglish(
        currentPrompt.targetSentence,
        0.88,
        () => {
          setIsPlayingNative(false);
          setActivePlayingVoice(null);
        },
        voiceToPlay
      );
    }
  };

  // Setup Speech Recognition with Maximum Sensitivity
  const initAndStartRecognition = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage(
        'Trình duyệt chưa hỗ trợ Web Speech API trực tiếp. Bạn có thể bấm "Điền câu mẫu" hoặc nhập câu bên dưới để AI chấm điểm!'
      );
      setUserTranscript(currentPrompt.targetSentence);
      return;
    }

    // Stop existing instance if any
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // ignore
      }
    }

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';
      rec.maxAlternatives = 3;

      rec.onstart = () => {
        setIsRecording(true);
        setErrorMessage('');
        playSoundEffect('chime');
      };

      rec.onresult = (event: any) => {
        let finalStr = '';
        let interimStr = '';

        for (let i = 0; i < event.results.length; i++) {
          const res = event.results[i];
          if (res.isFinal) {
            finalStr += res[0].transcript + ' ';
          } else {
            interimStr += res[0].transcript;
          }
        }

        if (finalStr.trim()) {
          setUserTranscript((prev) => {
            const combined = (prev ? prev + ' ' : '') + finalStr.trim();
            // deduplicate spaces
            return combined.replace(/\s+/g, ' ');
          });
        }
        setInterimTranscript(interimStr);
      };

      rec.onerror = (event: any) => {
        console.warn('Speech Recognition Event:', event.error);
        if (event.error === 'no-speech' || event.error === 'aborted') {
          return;
        }
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setErrorMessage(
            'Quyền truy cập Micro bị chặn trên trình duyệt. Vui lòng cho phép Microphone hoặc nhập câu bên dưới để AI chấm điểm.'
          );
        } else {
          setErrorMessage('Đã dừng thu âm. Bạn có thể bấm Micro để nói lại hoặc sửa câu bên dưới.');
        }
      };

      rec.onend = () => {
        setIsRecording(false);
        setInterimTranscript('');
      };

      recognitionRef.current = rec;
      rec.start();
    } catch (err: any) {
      console.warn('Failed to start speech recognition:', err);
      setIsRecording(false);
      setErrorMessage('Không thể khởi tạo micro. Bạn có thể nhập câu bên dưới để AI chấm phát âm!');
    }
  };

  const handleToggleRecording = () => {
    playSoundEffect('click');
    setErrorMessage('');

    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {
          // ignore
        }
      }
      setIsRecording(false);
      setInterimTranscript('');
    } else {
      setUserTranscript('');
      setInterimTranscript('');
      setEvalResult(null);
      initAndStartRecognition();
    }
  };

  // Audio wave pulsing effect
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 80 + 20);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isRecording]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
      stopSpeaking();
    };
  }, []);

  const handleEvaluateSpeaking = async (transcriptToEvaluate?: string) => {
    const textToEvaluate = transcriptToEvaluate || (userTranscript + ' ' + interimTranscript).trim();
    if (!textToEvaluate.trim()) {
      setErrorMessage('Vui lòng nói vào micro hoặc nhập câu trước khi chấm điểm.');
      return;
    }

    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
      setIsRecording(false);
    }

    setIsLoading(true);
    setErrorMessage('');
    playSoundEffect('click');

    try {
      const res = await fetch('/api/ai/speaking-eval', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetText: currentPrompt.targetSentence,
          transcriptText: textToEvaluate,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Lỗi khi chấm phát âm.');
      }

      const data: AISpeakingEval = await res.json();
      setEvalResult(data);
      playSoundEffect('win');
      onSkillComplete();
    } catch (err: any) {
      console.error('Speaking eval error:', err);
      setErrorMessage(err.message || 'Chưa thể kết nối với AI chấm phát âm. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & Sentence Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-black text-cyan-400 uppercase tracking-widest flex items-center space-x-1.5 mb-1">
            <Bot className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>AI Chấm Phát Âm SGK Tiếng Anh 9</span>
          </span>
          <h3 className="text-xl font-black text-white">
            Mẫu Câu Luyện Nói {activePromptIndex + 1}/{speakingPrompts.length}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 max-w-full sm:max-w-xl justify-start sm:justify-end">
          <button
            onClick={() => {
              if (activePromptIndex > 0) {
                playSoundEffect('click');
                setActivePromptIndex(activePromptIndex - 1);
                setUserTranscript('');
                setInterimTranscript('');
                setEvalResult(null);
                setErrorMessage('');
              }
            }}
            disabled={activePromptIndex === 0}
            className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Câu trước"
          >
            ◀ Câu trước
          </button>

          <div className="flex flex-wrap items-center gap-1 max-h-24 overflow-y-auto p-1 bg-slate-950/50 rounded-2xl border border-slate-800">
            {speakingPrompts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playSoundEffect('click');
                  setActivePromptIndex(idx);
                  setUserTranscript('');
                  setInterimTranscript('');
                  setEvalResult(null);
                  setErrorMessage('');
                }}
                className={`w-7 h-7 rounded-lg font-black text-xs transition-all flex items-center justify-center ${
                  activePromptIndex === idx
                    ? 'bg-blue-600 text-white shadow-md scale-105 ring-2 ring-blue-400'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (activePromptIndex < speakingPrompts.length - 1) {
                playSoundEffect('click');
                setActivePromptIndex(activePromptIndex + 1);
                setUserTranscript('');
                setInterimTranscript('');
                setEvalResult(null);
                setErrorMessage('');
              }
            }}
            disabled={activePromptIndex === speakingPrompts.length - 1}
            className="px-3 py-2 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Câu kế tiếp"
          >
            Câu tiếp ▶
          </button>
        </div>
      </div>

      {/* Prominent Dedicated Dual-Voice Selector Bar */}
      <VoiceSelector showTestButton />

      {/* Target Sentence Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 border border-blue-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-black uppercase text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-xl self-start">
              Mẫu câu cần luyện phát âm
            </span>

            {/* Individual Teacher Pronunciation Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handlePlayNativeAudio('female')}
                className={`flex items-center space-x-2 px-4 py-2 text-xs font-black rounded-2xl shadow-sm transition-all ${
                  isPlayingNative && activePlayingVoice === 'female'
                    ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-300 scale-105'
                    : 'bg-white hover:bg-rose-50 text-rose-700 border-2 border-rose-300'
                }`}
                title="Nghe Cô Emily đọc mẫu câu này"
              >
                <span className="text-base">👩‍🏫</span>
                <span>{isPlayingNative && activePlayingVoice === 'female' ? 'Cô Emily đang đọc...' : 'Cô Emily Đọc'}</span>
                <Volume2 className={`w-4 h-4 ${isPlayingNative && activePlayingVoice === 'female' ? 'animate-bounce' : ''}`} />
              </button>

              <button
                onClick={() => handlePlayNativeAudio('male')}
                className={`flex items-center space-x-2 px-4 py-2 text-xs font-black rounded-2xl shadow-sm transition-all ${
                  isPlayingNative && activePlayingVoice === 'male'
                    ? 'bg-blue-600 text-white animate-pulse ring-4 ring-blue-300 scale-105'
                    : 'bg-white hover:bg-blue-50 text-blue-700 border-2 border-blue-300'
                }`}
                title="Nghe Thầy David đọc mẫu câu này"
              >
                <span className="text-base">👨‍🏫</span>
                <span>{isPlayingNative && activePlayingVoice === 'male' ? 'Thầy David đang đọc...' : 'Thầy David Đọc'}</span>
                <Volume2 className={`w-4 h-4 ${isPlayingNative && activePlayingVoice === 'male' ? 'animate-bounce' : ''}`} />
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-snug">
            "{currentPrompt.targetSentence}"
          </h2>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm">
            <span className="font-mono text-indigo-700 bg-white px-3 py-1.5 rounded-xl border border-blue-200 font-bold">
              {currentPrompt.ipa}
            </span>
            <span className="text-slate-600 italic font-semibold">Dịch: "{currentPrompt.vietnameseMeaning}"</span>
          </div>

          <div className="pt-2 text-xs sm:text-sm text-indigo-900 bg-white/95 p-4 rounded-2xl border border-indigo-100">
            <strong>🎯 Trọng tâm phát âm:</strong> {currentPrompt.keyPhonicsFocus}
          </div>
        </div>

        {/* Recording Section with Ultra-Responsive Live Micro */}
        <div className="flex flex-col items-center justify-center py-8 px-4 space-y-5 bg-slate-50 rounded-3xl border border-slate-200">
          <div className="relative">
            {isRecording && (
              <div
                className="absolute -inset-4 bg-rose-500/30 rounded-full animate-ping pointer-events-none"
                style={{ transform: `scale(${1 + audioLevel / 100})` }}
              />
            )}
            <button
              onClick={handleToggleRecording}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 text-white scale-110 ring-4 ring-rose-300'
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105 ring-4 ring-blue-200'
              }`}
              title={isRecording ? 'Bấm để dừng thu âm' : 'Bấm vào Micro để luyện nói'}
            >
              {isRecording ? <MicOff className="w-10 h-10 animate-pulse" /> : <Mic className="w-10 h-10" />}
            </button>
          </div>

          {/* Real-time Audio Wave Visualizer */}
          {isRecording && (
            <div className="flex items-center space-x-1 h-8">
              {[40, 70, 90, 60, 100, 50, 80, 60, 95, 45].map((h, i) => (
                <div
                  key={i}
                  className="w-1.5 bg-rose-500 rounded-full animate-pulse transition-all"
                  style={{
                    height: `${Math.max(8, (h * audioLevel) / 100)}px`,
                    animationDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div className="text-center space-y-1">
            <p className="text-base font-black text-slate-800">
              {isRecording ? '🔴 Đang lắng nghe... Hãy đọc câu trên!' : 'Nhấn Micro để bắt đầu luyện nói'}
            </p>
            <p className="text-xs text-slate-500">
              Phát âm to, rõ ràng từng từ trong mẫu câu để AI phân tích chuẩn xác
            </p>
          </div>

          {/* User Transcript Display & Quick Insertion */}
          <div className="w-full max-w-xl p-4 sm:p-5 rounded-2xl bg-white border border-slate-300 space-y-3 shadow-inner">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">
                {isRecording ? 'Đang nhận diện trực tiếp:' : 'Câu bạn vừa phát âm:'}
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    playSoundEffect('click');
                    setUserTranscript(currentPrompt.targetSentence);
                    setInterimTranscript('');
                  }}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 underline bg-blue-50 px-2.5 py-1 rounded-lg"
                >
                  + Điền câu mẫu chuẩn
                </button>
                {(userTranscript || interimTranscript) && (
                  <button
                    onClick={() => {
                      playSoundEffect('click');
                      setUserTranscript('');
                      setInterimTranscript('');
                      setEvalResult(null);
                    }}
                    className="text-xs font-bold text-rose-500 hover:underline bg-rose-50 px-2 py-1 rounded-lg"
                  >
                    Xóa
                  </button>
                )}
              </div>
            </div>

            <div className="min-h-[50px] p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center">
              {userTranscript || interimTranscript ? (
                <p className="text-sm sm:text-base font-bold text-slate-900">
                  <span>{userTranscript}</span>
                  {interimTranscript && (
                    <span className="text-blue-500 italic ml-1.5 opacity-80">{interimTranscript}</span>
                  )}
                </p>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Chưa có âm thanh. Nhấn Micro ở trên hoặc bấm "+ Điền câu mẫu chuẩn"...
                </p>
              )}
            </div>

            {/* Manual Edit Input */}
            <input
              type="text"
              value={userTranscript}
              onChange={(e) => setUserTranscript(e.target.value)}
              placeholder="Bạn cũng có thể gõ hoặc chỉnh sửa câu trực tiếp tại đây..."
              className="w-full px-3.5 py-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errorMessage && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 font-semibold flex items-center space-x-2 max-w-xl">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Trigger */}
          {(userTranscript || interimTranscript) && (
            <button
              onClick={() => handleEvaluateSpeaking()}
              disabled={isLoading}
              className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm sm:text-base rounded-2xl shadow-xl transition-all flex items-center space-x-2.5 hover:scale-105"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI Đang Phân Tích Giọng Nói...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span>AI Chấm Điểm Phát Âm Chi Tiết</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* AI Speaking Feedback Results */}
      {evalResult && (
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-amber-400 animate-bounce" />
              <h3 className="text-xl font-bold">Kết Quả Chấm Phát Âm Từ AI</h3>
            </div>
            <span className="text-xs text-slate-400">Gemini 3.6 Flash Voice Coach</span>
          </div>

          {/* Scores Overview Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Độ Chính Xác Từ (Accuracy)</span>
                <p className="text-3xl font-black text-emerald-400">{evalResult.accuracyScore}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center border border-emerald-500/40">
                🎯
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase">Trôi Chảy & Ngữ Điệu (Fluency)</span>
                <p className="text-3xl font-black text-cyan-400">{evalResult.fluencyScore}%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center border border-cyan-500/40">
                🗣️
              </div>
            </div>
          </div>

          {/* Word Phoneme Breakdown */}
          {evalResult.phonemeFeedback && evalResult.phonemeFeedback.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                Chi Tiết Từng Từ Trong Câu:
              </h4>
              <div className="flex flex-wrap gap-2">
                {evalResult.phonemeFeedback.map((item, idx) => {
                  let badgeBg = 'bg-emerald-950/80 border-emerald-600 text-emerald-300';
                  if (item.status === 'needs_work') badgeBg = 'bg-amber-950/80 border-amber-600 text-amber-300';
                  if (item.status === 'missed') badgeBg = 'bg-rose-950/80 border-rose-600 text-rose-300';

                  return (
                    <div
                      key={idx}
                      className={`p-2.5 rounded-xl border text-xs space-y-0.5 ${badgeBg}`}
                      title={item.tip}
                    >
                      <p className="font-extrabold text-sm">{item.word}</p>
                      <p className="font-mono text-[10px] opacity-80">{item.ipa}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 space-y-1">
              <p className="font-bold text-emerald-400 flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ưu điểm phát âm:</span>
              </p>
              <p className="text-slate-300">{evalResult.strengths}</p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 space-y-1">
              <p className="font-bold text-amber-300 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>Cần chú ý cải thiện:</span>
              </p>
              <p className="text-slate-300">{evalResult.improvements}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-950/50 border border-blue-800 text-xs text-blue-200 italic">
            💬 {evalResult.encouragement}
          </div>
        </div>
      )}
    </div>
  );
};
