import React, { useState } from 'react';
import { WritingPrompt, AIWritingCorrection } from '../../types';
import { PenTool, Sparkles, RefreshCw, Trophy, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, Bot, BookOpen } from 'lucide-react';
import { playSoundEffect } from '../../utils/audioHelpers';

interface WritingTabProps {
  writingPrompt: WritingPrompt;
  onSkillComplete: () => void;
}

export const WritingTab: React.FC<WritingTabProps> = ({ writingPrompt, onSkillComplete }) => {
  const [studentText, setStudentText] = useState('');
  const [showOutline, setShowOutline] = useState(true);
  const [showSample, setShowSample] = useState(false);
  const [correctionResult, setCorrectionResult] = useState<AIWritingCorrection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const wordCount = studentText.trim() === '' ? 0 : studentText.trim().split(/\s+/).length;

  const handleGradeWriting = async () => {
    if (wordCount < 10) {
      setErrorMessage('Bài viết quá ngắn. Vui lòng viết ít nhất 15-20 từ để AI có thể chấm điểm chi tiết.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/ai/writing-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          promptTopic: writingPrompt.title,
          studentText,
          wordLimit: writingPrompt.wordLimit,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Lỗi khi kết nối tới AI chấm bài viết.');
      }

      const data: AIWritingCorrection = await res.json();
      setCorrectionResult(data);
      playSoundEffect('win');
      onSkillComplete();
    } catch (err: any) {
      console.error('Writing grading error:', err);
      setErrorMessage(err.message || 'Chưa thể chấm bài viết lúc này. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseSampleText = () => {
    setStudentText(writingPrompt.sampleGrade10Response);
  };

  return (
    <div className="space-y-8">
      {/* Prompt Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-start space-x-3 border-b border-slate-100 pb-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl shrink-0">
            <PenTool className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-md">
              Đề bài viết SGK 9 (Giới hạn: {writingPrompt.wordLimit})
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
              {writingPrompt.title}
            </h3>
            <p className="text-xs text-slate-500">{writingPrompt.description}</p>
          </div>
        </div>

        {/* Suggested Outline Accordion */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
          <button
            onClick={() => setShowOutline(!showOutline)}
            className="w-full px-5 py-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <span className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Gợi Ý Dàn Bài & Cụm Từ Hữu Ích</span>
            </span>
            {showOutline ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showOutline && (
            <div className="p-5 border-t border-slate-200 bg-white space-y-4 text-xs">
              <div className="space-y-1">
                <p className="font-bold text-purple-900">1. Dàn ý gợi ý:</p>
                <ul className="list-disc list-inside text-slate-600 space-y-0.5 pl-2">
                  {writingPrompt.suggestedOutline.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1 pt-2">
                <p className="font-bold text-purple-900">2. Cụm từ hay nên dùng:</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {writingPrompt.usefulPhrases.map((phrase, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-50 text-purple-800 border border-purple-200 px-2.5 py-1 rounded-lg font-medium"
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Text Area Editor */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Bài viết của em (Tiếng Anh):</span>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleUseSampleText}
                className="px-3 py-1 bg-purple-100 hover:bg-purple-200 text-purple-900 font-extrabold text-xs rounded-lg border border-purple-300 shadow-xs transition-all flex items-center space-x-1.5 cursor-pointer"
                title="Chép bài mẫu thử nghiệm để AI chấm điểm"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-700" />
                <span>Chép bài mẫu thử nghiệm</span>
              </button>
              <span className={wordCount > 90 ? 'text-amber-600' : 'text-slate-500'}>
                Số từ: <strong>{wordCount}</strong> từ
              </span>
            </div>
          </div>

          <textarea
            value={studentText}
            onChange={(e) => setStudentText(e.target.value)}
            rows={7}
            placeholder="Viết đoạn văn Tiếng Anh của em ở đây (ví dụ: Van Phuc Silk Village is a famous craft village...)"
            className="w-full p-4 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-sans leading-relaxed bg-slate-50/50"
          />

          {errorMessage && (
            <p className="text-xs text-rose-600 font-semibold flex items-center space-x-1 pt-1">
              <AlertCircle className="w-4 h-4" />
              <span>{errorMessage}</span>
            </p>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setShowSample(!showSample)}
            className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>{showSample ? 'Ẩn Bài Viết Mẫu Lớp 10' : 'Tham Khảo Bài Viết Mẫu Lớp 10'}</span>
          </button>

          <button
            onClick={handleGradeWriting}
            disabled={isLoading || wordCount === 0}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-lg shadow-purple-600/30 transition-all flex items-center space-x-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Đang Chấm Bài Viết...</span>
              </>
            ) : (
              <>
                <Bot className="w-4 h-4 text-cyan-300" />
                <span>AI Chấm & Sửa Lỗi Bài Viết</span>
              </>
            )}
          </button>
        </div>

        {/* Sample Essay Drawer */}
        {showSample && (
          <div className="p-5 rounded-2xl bg-purple-50/80 border border-purple-200 text-xs sm:text-sm space-y-2 text-purple-950">
            <p className="font-extrabold text-purple-900 flex items-center space-x-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Bài Viết Mẫu Chuẩn Kỳ Thi Tuyển Sinh Vào 10:</span>
            </p>
            <p className="leading-relaxed italic bg-white p-4 rounded-xl border border-purple-200">
              "{writingPrompt.sampleGrade10Response}"
            </p>
          </div>
        )}
      </div>

      {/* AI Writing Feedback Report */}
      {correctionResult && (
        <div className="bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center space-x-2">
              <Trophy className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold">Báo Cáo Chấm Bài Viết Chi Tiết Từ AI</h3>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-amber-300">
                {correctionResult.overallScore}
              </span>
              <span className="text-xs text-slate-400">/10 ĐIỂM</span>
            </div>
          </div>

          {/* Sub Scores Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Ngữ pháp (Grammar)</span>
              <p className="text-xl font-black text-blue-400">{correctionResult.scores.grammar}/10</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Từ vựng (Vocab)</span>
              <p className="text-xl font-black text-emerald-400">{correctionResult.scores.vocabulary}/10</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Mạch lạc (Coherence)</span>
              <p className="text-xl font-black text-purple-400">{correctionResult.scores.coherence}/10</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[11px] text-slate-400 font-bold uppercase">Yêu cầu đề (Task)</span>
              <p className="text-xl font-black text-amber-400">{correctionResult.scores.taskFulfillment}/10</p>
            </div>
          </div>

          {/* General Feedback */}
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-slate-200 leading-relaxed">
            <strong className="text-cyan-300 font-bold block mb-1">💬 Nhận xét tổng quát:</strong>
            {correctionResult.generalFeedback}
          </div>

          {/* Detailed Line-by-Line Redline Corrections */}
          {correctionResult.corrections && correctionResult.corrections.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                Các Lỗi Sửa Chi Tiết (Redline Edits):
              </h4>
              <div className="space-y-2.5">
                {correctionResult.corrections.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded font-mono line-through">
                        {item.original}
                      </span>
                      <span className="text-slate-400">➔</span>
                      <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                        {item.corrected}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs pt-1">
                      💡 <strong>Lý do sửa:</strong> {item.reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Upgraded Model Version */}
          <div className="space-y-2 pt-2">
            <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1">
              <Sparkles className="w-4 h-4" />
              <span>Đoạn Văn Sửa Hoàn Chỉnh Nâng Cấp Chuẩn Thi 10:</span>
            </h4>
            <p className="p-5 rounded-2xl bg-indigo-950/80 border border-indigo-700/80 text-sm text-indigo-100 font-sans leading-relaxed italic">
              "{correctionResult.improvedVersion}"
            </p>
          </div>

          {/* Grade 10 Exam Tip */}
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 text-xs text-amber-200">
            <strong>🌟 Lời khuyên ôn thi tuyển sinh vào lớp 10:</strong> {correctionResult.grade10ExamTips}
          </div>
        </div>
      )}
    </div>
  );
};
