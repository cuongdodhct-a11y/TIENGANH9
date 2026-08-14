import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UnitOverview } from './components/UnitOverview';
import { UnitDetailView } from './components/UnitDetailView';
import { MillionaireGame } from './components/games/MillionaireGame';
import { SpeedReflexGame } from './components/games/SpeedReflexGame';
import { SentenceScrambleGame } from './components/games/SentenceScrambleGame';
import { PersonalizedPathModal } from './components/ai/PersonalizedPathModal';
import { AITutorDrawer } from './components/ai/AITutorDrawer';
import { AIQuizGeneratorModal } from './components/ai/AIQuizGeneratorModal';

import { GRADE_9_UNITS } from './data/grade9Units';
import { UserProgressState, UserPersonalizedRoute } from './types';
import { Trophy, Gamepad2, Sparkles, BookOpen, Route, Flame } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<'units' | 'games' | 'route' | 'ai-quiz'>('units');
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [selectedGame, setSelectedGame] = useState<'millionaire' | 'speed_reflex' | 'scramble'>('millionaire');

  // AI Drawers and Modals
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [isRouteModalOpen, setIsRouteModalOpen] = useState(false);
  const [savedRoute, setSavedRoute] = useState<UserPersonalizedRoute | null>(null);

  // User Progress Persistence in localStorage
  const [userProgress, setUserProgress] = useState<UserProgressState>(() => {
    try {
      const saved = localStorage.getItem('eng9_user_progress');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore fallback
    }
    return {
      streakDays: 5,
      totalPoints: 1250,
      completedUnits: [1],
      completedSkills: {
        'unit-1-vocabulary': true,
        'unit-1-grammar': true,
      },
      vocabularyMastered: ['u1-v1', 'u1-v2'],
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('eng9_user_progress', JSON.stringify(userProgress));
    } catch (e) {
      // Ignore
    }
  }, [userProgress]);

  const handleAddPoints = (points: number) => {
    setUserProgress((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
    }));
  };

  const handleToggleMasterWord = (wordId: string) => {
    setUserProgress((prev) => {
      const isAlready = prev.vocabularyMastered.includes(wordId);
      const updatedList = isAlready
        ? prev.vocabularyMastered.filter((id) => id !== wordId)
        : [...prev.vocabularyMastered, wordId];
      return { ...prev, vocabularyMastered: updatedList };
    });
  };

  const handleSkillComplete = (skill: string) => {
    if (!selectedUnitId) return;
    const key = `unit-${selectedUnitId}-${skill}`;
    setUserProgress((prev) => ({
      ...prev,
      completedSkills: {
        ...prev.completedSkills,
        [key]: true,
      },
      totalPoints: prev.totalPoints + 15,
    }));
  };

  const activeUnit = GRADE_9_UNITS.find((u) => u.id === selectedUnitId);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* App Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'units') setSelectedUnitId(null);
        }}
        userProgress={userProgress}
        onOpenTutor={() => setIsTutorOpen(true)}
        onOpenRouteModal={() => setIsRouteModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        {/* TAB 1: UNITS SGK */}
        {currentTab === 'units' && (
          <>
            {selectedUnitId === null ? (
              <UnitOverview
                units={GRADE_9_UNITS}
                onSelectUnit={(id) => setSelectedUnitId(id)}
                userProgress={userProgress}
                onStartDiagnostic={() => setIsRouteModalOpen(true)}
              />
            ) : activeUnit ? (
              <UnitDetailView
                unit={activeUnit}
                onBack={() => setSelectedUnitId(null)}
                userProgress={userProgress}
                onToggleMasterWord={handleToggleMasterWord}
                onSkillComplete={handleSkillComplete}
              />
            ) : null}
          </>
        )}

        {/* TAB 2: TRÒ CHƠI (GAMES) */}
        {currentTab === 'games' && (
          <div className="space-y-8">
            {/* Game Selector Tabs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-800/80 p-4 rounded-3xl border border-slate-700/80">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                  <Gamepad2 className="w-6 h-6 text-emerald-400" />
                  <span>Trò Chơi Ôn Luyện Tiếng Anh 9</span>
                </h2>
                <p className="text-xs text-slate-400">Vừa chơi vừa tích điểm thưởng và củng cố kiến thức SGK</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setSelectedGame('millionaire')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedGame === 'millionaire'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🏆 Ai Là Triệu Phú
                </button>
                <button
                  onClick={() => setSelectedGame('speed_reflex')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedGame === 'speed_reflex'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  ⚡ Phản Xạ Nhanh
                </button>
                <button
                  onClick={() => setSelectedGame('scramble')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedGame === 'scramble'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🧩 Ghép Câu Đúng
                </button>
              </div>
            </div>

            {/* Active Game */}
            {selectedGame === 'millionaire' && <MillionaireGame onAddPoints={handleAddPoints} />}
            {selectedGame === 'speed_reflex' && <SpeedReflexGame onAddPoints={handleAddPoints} />}
            {selectedGame === 'scramble' && <SentenceScrambleGame onAddPoints={handleAddPoints} />}
          </div>
        )}

        {/* TAB 3: TẠO BÀI TẬP AI */}
        {currentTab === 'ai-quiz' && <AIQuizGeneratorModal onAddPoints={handleAddPoints} />}
      </main>

      {/* AI Tutor Chatbot Drawer */}
      <AITutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        activeUnitTitle={activeUnit ? activeUnit.title : undefined}
      />

      {/* AI Diagnostic Route Modal */}
      <PersonalizedPathModal
        isOpen={isRouteModalOpen}
        onClose={() => setIsRouteModalOpen(false)}
        onSaveRoute={(route) => setSavedRoute(route)}
      />

      {/* App Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 text-center text-xs text-slate-400 space-y-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-semibold text-slate-300">
            © Tiếng Anh 9 SGK - Bộ Giáo Dục & Đào Tạo • Phát triển với AI Gemini
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsRouteModalOpen(true)}
              className="text-amber-400 hover:underline font-bold"
            >
              Lộ trình học AI
            </button>
            <button
              onClick={() => setIsTutorOpen(true)}
              className="text-purple-400 hover:underline font-bold"
            >
              Hỏi Thầy Cô AI
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
