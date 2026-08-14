import React, { useState } from 'react';
import { UserPersonalizedRoute } from '../../types';
import { Route, Sparkles, X, RefreshCw, CheckCircle2, Zap, Trophy, Target, Calendar } from 'lucide-react';

interface PersonalizedPathModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveRoute: (route: UserPersonalizedRoute) => void;
}

export const PersonalizedPathModal: React.FC<PersonalizedPathModalProps> = ({
  isOpen,
  onClose,
  onSaveRoute,
}) => {
  const [currentLevel, setCurrentLevel] = useState<'yau' | 'trung_binh' | 'kha' | 'gioi'>('trung_binh');
  const [weakSkill, setWeakSkill] = useState<'listening' | 'speaking' | 'reading' | 'writing' | 'grammar'>('speaking');
  const [targetGoal, setTargetGoal] = useState<'thi_vao_10' | 'gioi_sgk' | 'giao_tiep'>('thi_vao_10');

  const [generatedRoute, setGeneratedRoute] = useState<UserPersonalizedRoute | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleGenerateRoute = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/diagnostic-route', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentLevel,
          weakSkills: [weakSkill],
          targetGoal,
        }),
      });

      if (!res.ok) {
        throw new Error('Lỗi khi tạo lộ trình AI');
      }

      const data: UserPersonalizedRoute = await res.json();
      setGeneratedRoute(data);
      onSaveRoute(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 text-white w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8 space-y-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="flex items-center space-x-3 border-b border-slate-800 pb-4">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
            <Route className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white">Chẩn Đoán Trình Độ & Lập Lộ Trình AI</h3>
            <p className="text-xs text-slate-400">AI Gemini sẽ xây dựng kế hoạch tự học cá nhân hóa bám sát SGK 9</p>
          </div>
        </div>

        {!generatedRoute ? (
          /* Form options */
          <div className="space-y-6 text-xs sm:text-sm">
            {/* Level selector */}
            <div className="space-y-2">
              <label className="font-bold text-slate-200 block">1. Trình độ hiện tại của học sinh:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'yau', label: 'Cần Lấy Gốc (Yếu)' },
                  { id: 'trung_binh', label: 'Trung Bình' },
                  { id: 'kha', label: 'Khá' },
                  { id: 'gioi', label: 'Giỏi (Mục tiêu 9+)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentLevel(item.id as any)}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      currentLevel === item.id
                        ? 'bg-blue-600 border-blue-400 text-white shadow-md'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Weak Skill */}
            <div className="space-y-2">
              <label className="font-bold text-slate-200 block">2. Kỹ năng cảm thấy yếu nhất cần cải thiện:</label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'speaking', label: 'Nói (Speaking)' },
                  { id: 'writing', label: 'Viết (Writing)' },
                  { id: 'listening', label: 'Nghe (Listening)' },
                  { id: 'reading', label: 'Đọc (Reading)' },
                  { id: 'grammar', label: 'Ngữ Pháp' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setWeakSkill(item.id as any)}
                    className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                      weakSkill === item.id
                        ? 'bg-purple-600 border-purple-400 text-white shadow-md'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <label className="font-bold text-slate-200 block">3. Mục tiêu học tập cá nhân:</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'thi_vao_10', label: '🏆 Ôn Thi Tuyển Sinh Vào 10 (Đạt 8-9+)' },
                  { id: 'gioi_sgk', label: '📚 Đạt Điểm Giỏi Môn Tiếng Anh SGK Lớp 9' },
                  { id: 'giao_tiep', label: '🗣️ Tự Tin Giao Tiếp Cả 4 Kỹ Năng' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTargetGoal(item.id as any)}
                    className={`p-3 rounded-xl border text-left font-bold transition-all ${
                      targetGoal === item.id
                        ? 'bg-amber-600 border-amber-400 text-white shadow-md'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateRoute}
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>AI Đang Phân Tích & Lập Lộ Trình Học Cá Nhân...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-slate-950" />
                  <span>Tạo Lộ Trình Học Cá Nhân Hóa Bằng AI</span>
                </>
              )}
            </button>
          </div>
        ) : (
          /* Route Generated Display */
          <div className="space-y-6 text-xs sm:text-sm">
            <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-amber-300 font-bold">
                <span className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>Mức độ: {generatedRoute.levelAssessed}</span>
                </span>
                <span>Mục tiêu: {generatedRoute.targetGoalTitle}</span>
              </div>
              <p className="text-slate-300">{generatedRoute.customSummary}</p>
            </div>

            {/* Recommended Units list */}
            <div className="space-y-2">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider">
                1. Trọng Tâm Unit SGK Cần Học Trước:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {generatedRoute.recommendedUnitOrder.map((u, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-800 border border-slate-700 font-semibold">
                    Unit {u.unitId}: {u.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Schedule */}
            <div className="space-y-2">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>2. Kế Hoạch Tự Học 4 Tuần Cá Nhân Hóa:</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {generatedRoute.weeklyPlan.map((week, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
                    <p className="font-bold text-blue-400">{week.weekTitle}</p>
                    <p className="text-slate-300 text-xs">{week.focusSkill}</p>
                    <p className="text-slate-400 italic text-[11px]">Gợi ý: {week.actionTask}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setGeneratedRoute(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
              >
                Tạo Lại Lộ Trình Khác
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg"
              >
                Lưu & Bắt Đầu Học Lộ Trình
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
