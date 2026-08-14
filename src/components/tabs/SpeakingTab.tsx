import React, { useState, useEffect } from 'react';
import { SpeakingPrompt, AISpeakingEval } from '../../types';
import { Mic, MicOff, Volume2, Sparkles, CheckCircle2, AlertCircle, RefreshCw, Trophy, Bot, ChevronRight } from 'lucide-react';
import { speakEnglish, playSoundEffect, stopSpeaking } from '../../utils/audioHelpers';

interface SpeakingTabProps {
  speakingPrompts: SpeakingPrompt[];
  onSkillComplete: () => void;
}

export const SpeakingTab: React.FC<SpeakingTabProps> = ({ speakingPrompts, onSkillComplete }) => {
  const [activePromptIndex, setActivePromptIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingNative, setIsPlayingNative] = useState(false);
  const [userTranscript, setUserTranscript] = useState('');
  const [evalResult, setEvalResult] = useState<AISpeakingEval | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentPrompt = speakingPrompts[activePromptIndex] || speakingPrompts[0];

  const handlePlayNativeAudio = () => {
    if (isPlayingNative) {
      stopSpeaking();
      setIsPlayingNative(false);
    } else {
      setIsPlayingNative(true);
      speakEnglish(currentPrompt.targetSentence, 0.85, () => {
        setIsPlayingNative(false);
      });
    }
  };

  // Speech recognition instance setup
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      try {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onresult = (event: any) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript + ' ';
          }
          if (transcript.trim()) {
            setUserTranscript(transcript.trim());
          }
        };

        rec.onerror = (e: any) => {
          console.warn('Speech recognition error:', e);
          if (e.error === 'no-speech' || e.error === 'aborted') {
            // Ignore benign non-fatal noise or manual stop
            return;
          }
          setIsRecording(false);
          if (e.error === 'not-allowed') {
            setErrorMessage('Microphone chưa được cấp quyền trên trình duyệt hoặc bị chặn bởi khung xem trước. Bạn có thể tự gõ/sửa câu bên dưới để AI chấm điểm!');
          } else if (e.error === 'audio-capture') {
            setErrorMessage('Không tìm thấy thiết bị micro. Vui lòng cắm micro và kiểm tra lại.');
          } else {
            setErrorMessage('Micro ngắt kết nối. Bạn có thể bấm nói lại hoặc tự nhập câu phát âm bên dưới.');
          }
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        setRecognition(rec);
      } catch (err) {
        console.warn('Failed to construct SpeechRecognition:', err);
      }
    }
  }, []);

  const handleStartRecording = () => {
    setErrorMessage('');
    setEvalResult(null);

    if (!recognition) {
      setErrorMessage('Trình duyệt của bạn không hỗ trợ Web Speech Recognition hoặc micro bị giới hạn. Bạn có thể nhập câu bên dưới để AI chấm phát âm!');
      setUserTranscript(currentPrompt.targetSentence);
      return;
    }

    setUserTranscript('');
    setIsRecording(true);
    try {
      recognition.start();
    } catch (e) {
      console.warn('Recognition start exception, retrying:', e);
      try {
        recognition.stop();
        setTimeout(() => {
          recognition.start();
        }, 200);
      } catch (err) {
        setIsRecording(false);
        setErrorMessage('Không thể bật micro. Vui lòng kiểm tra quyền truy cập micro trên trình duyệt.');
      }
    }
  };

  const handleStopRecording = () => {
    if (recognition && isRecording) {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const handleEvaluateSpeaking = async (transcriptToEvaluate?: string) => {
    const textToEvaluate = transcriptToEvaluate || userTranscript;
    if (!textToEvaluate.trim()) {
      setErrorMessage('Vui lòng nói hoặc bật mic để nhận diện giọng nói trước khi chấm.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

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
      {/* Target Prompt Navigation Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-xl">
        <div>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center space-x-1 mb-1">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Trợ Lý AI Chấm Phát Âm Chuẩn SGK 9</span>
          </span>
          <h3 className="text-lg font-bold text-white">
            Luyện Nói Mẫu Câu {activePromptIndex + 1}/{speakingPrompts.length}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2 max-w-full sm:max-w-xl justify-start sm:justify-end">
          <button
            onClick={() => {
              if (activePromptIndex > 0) {
                setActivePromptIndex(activePromptIndex - 1);
                setUserTranscript('');
                setEvalResult(null);
                setErrorMessage('');
              }
            }}
            disabled={activePromptIndex === 0}
            className="px-2.5 py-1.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Câu trước"
          >
            ◀ Trở lại
          </button>

          <div className="flex flex-wrap items-center gap-1 max-h-24 overflow-y-auto p-1 bg-slate-950/50 rounded-2xl border border-slate-800">
            {speakingPrompts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePromptIndex(idx);
                  setUserTranscript('');
                  setEvalResult(null);
                  setErrorMessage('');
                }}
                className={`w-7 h-7 rounded-lg font-bold text-xs transition-all flex items-center justify-center ${
                  activePromptIndex === idx
                    ? 'bg-blue-600 text-white shadow-md scale-105'
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
                setActivePromptIndex(activePromptIndex + 1);
                setUserTranscript('');
                setEvalResult(null);
                setErrorMessage('');
              }
            }}
            disabled={activePromptIndex === speakingPrompts.length - 1}
            className="px-2.5 py-1.5 rounded-xl font-bold text-xs bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            title="Câu kế tiếp"
          >
            Kế tiếp ▶
          </button>
        </div>
      </div>

      {/* Target Sentence Display Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">
              Mẫu câu cần luyện phát âm
            </span>
            <button
              onClick={handlePlayNativeAudio}
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-xl shadow-sm transition-all ${
                isPlayingNative
                  ? 'bg-amber-500 text-slate-900 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingNative ? 'animate-bounce' : ''}`} />
              <span>{isPlayingNative ? 'Đang Phát Audio...' : 'Nghe Mẫu Bản Ngữ'}</span>
            </button>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            "{currentPrompt.targetSentence}"
          </h2>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <span className="font-mono text-indigo-700 bg-white px-3 py-1 rounded-lg border border-blue-200 font-semibold">
              {currentPrompt.ipa}
            </span>
            <span className="text-slate-600 italic">Dịch: "{currentPrompt.vietnameseMeaning}"</span>
          </div>

          <div className="pt-2 text-xs text-indigo-900 bg-white/80 p-3 rounded-xl border border-indigo-100">
            <strong>🎯 Trọng tâm phát âm:</strong> {currentPrompt.keyPhonicsFocus}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="relative">
            {isRecording && (
              <div className="absolute -inset-3 bg-rose-500/20 rounded-full animate-ping" />
            )}
            <button
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition-all ${
                isRecording
                  ? 'bg-rose-600 text-white scale-105'
                  : 'bg-blue-600 hover:bg-blue-500 text-white hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
            </button>
          </div>

          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-slate-800">
              {isRecording ? 'Đang lắng nghe bạn nói...' : 'Nhấn vào Micro để bắt đầu luyện nói'}
            </p>
            <p className="text-xs text-slate-500">
              Hãy đọc to rõ ràng mẫu câu trên để AI chấm phát âm
            </p>
          </div>

          {/* User Speech Transcription Display & Manual Edit */}
          <div className="w-full max-w-lg p-4 rounded-xl bg-white border border-slate-300 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Câu bạn vừa nói / Nhập văn bản:</span>
              <button
                onClick={() => {
                  const sampleText = currentPrompt.targetSentence;
                  setUserTranscript(sampleText);
                }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                + Điền mẫu chuẩn
              </button>
            </div>
            <input
              type="text"
              value={userTranscript}
              onChange={(e) => setUserTranscript(e.target.value)}
              placeholder="Nội dung giọng nói của bạn sẽ hiện ở đây, hoặc gõ vào đây..."
              className="w-full px-3 py-2 text-sm font-semibold text-blue-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {errorMessage && (
            <p className="text-xs text-rose-600 font-semibold flex items-center space-x-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </p>
          )}

          {/* Evaluate Action Button */}
          {userTranscript && (
            <button
              onClick={() => handleEvaluateSpeaking()}
              disabled={isLoading}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>AI Đang Phân Tích Giọng Nói...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>AI Chấm Phát Âm Chi Tiết</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* AI Speaking Feedback Results */}
      {evalResult && (
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold">Kết Quả Chấm Phát Âm Từ AI</h3>
            </div>
            <span className="text-xs text-slate-400">Model: Gemini 3.6 Flash AI Coach</span>
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
