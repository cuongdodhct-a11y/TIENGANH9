import React from 'react';
import { UnitData, UserProgressState } from '../types';
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Headphones,
  Mic,
  FileText,
  PenTool,
  Sparkles,
  Zap,
  Globe,
  Home,
  Building2,
  HeartPulse,
  History,
  Compass,
  Lightbulb,
  Luggage,
  Languages,
  Leaf,
  Smartphone,
  Briefcase
} from 'lucide-react';

interface UnitOverviewProps {
  units: UnitData[];
  onSelectUnit: (unitId: number) => void;
  userProgress: UserProgressState;
  onStartDiagnostic: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Home,
  Building2,
  HeartPulse,
  History,
  Compass,
  Lightbulb,
  Globe,
  Luggage,
  Languages,
  Leaf,
  Smartphone,
  Briefcase
};

export const UnitOverview: React.FC<UnitOverviewProps> = ({
  units,
  onSelectUnit,
  userProgress,
  onStartDiagnostic,
}) => {
  const calculateUnitProgress = (unitId: number) => {
    const skills = ['vocabulary', 'grammar', 'listening', 'speaking', 'reading', 'writing'];
    let completedCount = 0;
    skills.forEach(skill => {
      if (userProgress.completedSkills[`unit-${unitId}-${skill}`]) {
        completedCount++;
      }
    });
    return Math.round((completedCount / skills.length) * 100);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 md:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Chương Trình Chuẩn SGK Bộ Giáo Dục & Đào Tạo</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            Tự Học Tiếng Anh 9 Lớp 9 <br className="hidden sm:inline" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-teal-300 to-amber-300">
              Phát Triển Toàn Diện 4 Kỹ Năng Với AI
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Học chuẩn 12 Unit SGK Tiếng Anh 9. AI chấm phát âm chuẩn giọng bản ngữ, sửa bài viết chi tiết, 
            tạo bài tập cá nhân hóa và ôn luyện qua các trò chơi trắc nghiệm hấp dẫn!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              id="hero-diagnostic-btn"
              onClick={onStartDiagnostic}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>Kiểm Tra Chẩn Đoán & Lập Lộ Trình AI</span>
            </button>
            <div className="text-xs text-slate-400 bg-slate-800/80 border border-slate-700/60 px-3.5 py-2.5 rounded-xl">
              🎯 Mục tiêu: Đạt điểm giỏi môn Tiếng Anh & Thi vào 10 thành công
            </div>
          </div>
        </div>
      </div>

      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span>Danh Sách 12 Unit SGK Tiếng Anh 9</span>
          </h2>
          <p className="text-sm text-slate-500">Chọn bài học bên dưới để luyện Từ vựng, Ngữ pháp, Nghe, Nói, Đọc, Viết</p>
        </div>
        <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 self-start sm:self-auto">
          Đã hoàn thành {userProgress.completedUnits.length}/12 Bài học
        </div>
      </div>

      {/* Units Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {units.map((unit) => {
          const progressPercent = calculateUnitProgress(unit.id);
          const IconComponent = ICON_MAP[unit.badgeIconName] || BookOpen;

          return (
            <div
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              {/* Card Top Banner */}
              <div className="p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                        {unit.title.split(':')[0]}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1 line-clamp-1">
                        {unit.title.split(':')[1] || unit.title}
                      </h3>
                    </div>
                  </div>
                  {progressPercent === 100 && (
                    <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                      Xong
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {unit.description}
                </p>

                {/* Pronunciation focus pill */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-2 text-[11px] text-slate-700 font-medium">
                  🗣️ {unit.pronunciationFocus}
                </div>

                {/* Skill Badges Checklist */}
                <div className="grid grid-cols-3 gap-1.5 pt-1 text-[10px] font-semibold">
                  <span
                    className={`flex items-center justify-center py-1 px-1.5 rounded-md border ${
                      userProgress.completedSkills[`unit-${unit.id}-vocabulary`]
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    Từ vựng
                  </span>
                  <span
                    className={`flex items-center justify-center py-1 px-1.5 rounded-md border ${
                      userProgress.completedSkills[`unit-${unit.id}-grammar`]
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    Ngữ pháp
                  </span>
                  <span
                    className={`flex items-center justify-center py-1 px-1.5 rounded-md border ${
                      userProgress.completedSkills[`unit-${unit.id}-listening`]
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    Listening
                  </span>
                  <span
                    className={`flex items-center justify-center py-1 px-1.5 rounded-md border ${
                      userProgress.completedSkills[`unit-${unit.id}-speaking`]
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    Speaking
                  </span>
                  <span
                    className={`flex items-center justify-center py-1 px-1.5 rounded-md border ${
                      userProgress.completedSkills[`unit-${unit.id}-reading`]
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    Reading
                  </span>
                  <span
                    className={`flex items-center justify-center py-1 px-1.5 rounded-md border ${
                      userProgress.completedSkills[`unit-${unit.id}-writing`]
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    Writing
                  </span>
                </div>
              </div>

              {/* Card Footer Progress & Action */}
              <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                <div className="w-2/3 pr-3">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 mb-1">
                    <span>Tiến độ</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <button className="flex items-center space-x-1 text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>Học ngay</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
