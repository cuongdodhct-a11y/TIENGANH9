import React, { useState, useEffect } from "react";
import {
  connectGeminiLive,
  sendTextToGemini,
  stopGeminiLiveAudio,
  disconnectGeminiLive,
  isGeminiLiveConnected,
} from "../../utils/geminiLiveAudio";

type ConnectionStatus =
  | "Chưa kết nối"
  | "Đang kết nối"
  | "Đã kết nối"
  | "Đang phát âm thanh"
  | "Đã dừng"
  | "Lỗi";

export const GeminiLiveAudioTest: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>("Chưa kết nối");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [receivedText, setReceivedText] = useState<string>("");

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      disconnectGeminiLive();
    };
  }, []);

  const handleConnect = async () => {
    setStatus("Đang kết nối");
    setErrorMessage("");
    setReceivedText("");

    const success = await connectGeminiLive({
      onConnected: () => {
        setStatus("Đã kết nối");
      },
      onAudioStart: () => {
        setStatus("Đang phát âm thanh");
      },
      onAudioEnd: () => {
        if (isGeminiLiveConnected()) {
          setStatus("Đã kết nối");
        } else {
          setStatus("Đã dừng");
        }
      },
      onError: (err) => {
        setStatus("Lỗi");
        setErrorMessage(err);
      },
      onDisconnected: () => {
        setStatus("Chưa kết nối");
      },
      onText: (text) => {
        setReceivedText((prev) => prev + text);
      },
    });

    if (!success && status !== "Lỗi") {
      setStatus("Lỗi");
      if (!errorMessage) {
        setErrorMessage("Gemini Live connection failed.");
      }
    }
  };

  const handleSpeakSample = async () => {
    if (!isGeminiLiveConnected()) {
      setStatus("Lỗi");
      setErrorMessage("Vui lòng kết nối Gemini Live trước khi thử âm thanh.");
      return;
    }

    setReceivedText("");
    const samplePrompt =
      "Hello! My name is David. I am your English teacher. How are you today?";
    await sendTextToGemini(samplePrompt);
  };

  const handleStop = () => {
    stopGeminiLiveAudio();
    setStatus("Đã dừng");
  };

  const getStatusColor = () => {
    switch (status) {
      case "Đã kết nối":
        return "bg-emerald-500 text-white";
      case "Đang phát âm thanh":
        return "bg-blue-500 text-white animate-pulse";
      case "Đang kết nối":
        return "bg-amber-500 text-white animate-pulse";
      case "Lỗi":
        return "bg-red-500 text-white";
      case "Đã dừng":
        return "bg-slate-600 text-white";
      default:
        return "bg-slate-300 text-slate-700";
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 space-y-6 font-sans">
      <div className="border-b pb-3">
        <h2 className="text-xl font-black text-slate-800 flex items-center space-x-2">
          <span>⚡ Gemini Live Audio Engine v2 Test</span>
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Giai đoạn 2A: Kiểm tra đường truyền Text → Gemini Live API → PCM 24kHz → Web Audio API.
        </p>
      </div>

      {/* Trạng thái */}
      <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Trạng thái:</span>
        <span className={`text-xs font-black px-3 py-1 rounded-full ${getStatusColor()}`}>
          {status}
        </span>
      </div>

      {/* Lỗi nếu có */}
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs space-y-1">
          <p className="font-bold">⚠️ Thông báo lỗi:</p>
          <p className="break-words">{errorMessage}</p>
        </div>
      )}

      {/* Text stream received */}
      {receivedText && (
        <div className="p-3.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl text-xs space-y-1">
          <p className="font-bold text-indigo-700">📝 Văn bản nhận từ Live API:</p>
          <p className="italic leading-relaxed">"{receivedText}"</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={handleConnect}
          disabled={status === "Đang kết nối"}
          className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
        >
          <span>🔗 Kết nối Gemini Live</span>
        </button>

        <button
          onClick={handleSpeakSample}
          disabled={!isGeminiLiveConnected() && status !== "Đang phát âm thanh"}
          className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
        >
          <span>🔊 AI nói thử</span>
        </button>

        <button
          onClick={handleStop}
          className="px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
        >
          <span>⏹ Dừng</span>
        </button>
      </div>

      <div className="text-[11px] text-slate-400 text-center border-t pt-3">
        Engine output: PCM 16-bit 24kHz Mono • Web Audio API Scheduler
      </div>
    </div>
  );
};
