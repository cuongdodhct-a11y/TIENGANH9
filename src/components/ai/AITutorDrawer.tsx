import React, { useState } from 'react';
import { Bot, Send, X, Sparkles, User, RefreshCw, BookOpen } from 'lucide-react';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeUnitTitle?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({ isOpen, onClose, activeUnitTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Xin chào em! Cô là Trợ Lý Thầy Cô AI Tiếng Anh Lớp 9. Em có thắc mắc gì về Ngữ pháp, Từ vựng, Bài tập SGK hay Mẹo ôn thi tuyển sinh vào lớp 10 không? Hãy hỏi cô nhé! 😊',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    const updatedMessages = [...messages, userMsg];

    try {
      const res = await fetch('/api/ai/tutor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuestion: textToSend,
          unitContext: activeUnitTitle || 'Toàn bộ 12 Unit SGK Tiếng Anh 9',
          messages: updatedMessages.map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            content: m.text,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error('Lỗi khi phản hồi từ AI Tutor.');
      }

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.reply || 'Cô chưa hiểu rõ câu hỏi, em hỏi lại ngắn gọn hơn nhé!',
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: 'Rất tiếc cô chưa thể trả lời ngay do sự cố kết nối. Em thử lại lần nữa nhé!',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    'Giải thích cách dùng Cụm động từ (Phrasal verbs) Unit 1?',
    'Phân biệt Mệnh đề quan hệ xác định và không xác định?',
    'Gợi ý cấu trúc viết bài văn Unit 2 City life?',
    'Mẹo làm bài phát âm đuôi -ed và -s trong đề thi vào 10?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="bg-slate-900 border-l border-slate-800 text-white w-full max-w-lg h-full flex flex-col shadow-2xl relative">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-900/40">
              <Bot className="w-6 h-6 text-cyan-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">Thầy Cô AI Tiếng Anh 9</h3>
              <p className="text-xs text-slate-400">Hỗ trợ tự học SGK 24/7 • Giải đáp chi tiết</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Area */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto font-sans text-xs sm:text-sm">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-cyan-300'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`p-3.5 rounded-2xl max-w-[82%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white font-medium'
                    : 'bg-slate-800 border border-slate-700 text-slate-100 whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center space-x-2 text-xs text-slate-400 p-2">
              <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
              <span>Thầy cô AI đang soạn câu trả lời...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/60 space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Gợi ý câu hỏi nhanh:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p)}
                className="text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/80 transition-colors text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Input Bar */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center space-x-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Hỏi thầy cô AI về từ vựng, ngữ pháp, bài tập SGK..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputQuery.trim() || isLoading}
            className="p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl shadow-md disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
