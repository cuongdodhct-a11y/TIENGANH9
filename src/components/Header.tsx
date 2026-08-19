import React from 'react';
import { BookOpen, Gamepad2, Sparkles, Bot, Flame, Trophy, Route, SlidersHorizontal } from 'lucide-react';
import { UserProgressState } from '../types';
import { VoiceSelector } from './common/VoiceSelector';

interface HeaderProps {
  currentTab: 'units' | 'games' | 'route' | 'ai-quiz';
  setCurrentTab: (tab: 'units' | 'games' | 'route' | 'ai-quiz') => void;
  userProgress: UserProgressState;
  onOpenTutor: () => void;
  onOpenRouteModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  userProgress,
  onOpenTutor,
  onOpenRouteModal,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentTab('units')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300">
                  Tiếng Anh 9
                </span>
                <span className="bg-blue-900/80 text-blue-300 border border-blue-700/50 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  SGK Bộ GD&ĐT
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Tự học toàn diện 4 kỹ năng & AI hỗ trợ</p>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              id="nav-units-btn"
              onClick={() => setCurrentTab('units')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'units'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>12 Unit SGK</span>
            </button>

            <button
              id="nav-games-btn"
              onClick={() => setCurrentTab('games')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'games'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Trò Chơi (Games)</span>
            </button>

            <button
              id="nav-route-btn"
              onClick={onOpenRouteModal}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'route'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Route className="w-4 h-4 text-amber-300" />
              <span>Lộ Trình AI</span>
            </button>

            <button
              id="nav-ai-quiz-btn"
              onClick={() => setCurrentTab('ai-quiz')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTab === 'ai-quiz'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-purple-300" />
              <span>Tạo Đề AI</span>
            </button>
          </nav>

          {/* User Stats & Global Voice Selector & AI Assistant Trigger */}
          <div className="flex items-center space-x-2.5">
            {/* Global Voice Quick Selector */}
            <div className="hidden xl:block">
              <VoiceSelector compact />
            </div>

            {/* Streak Counter */}
            <div
              className="flex items-center space-x-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-amber-400 font-semibold text-xs sm:text-sm cursor-pointer hover:bg-amber-500/20 transition-colors"
              title="Chuỗi ngày tự học liên tục"
            >
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{userProgress.streakDays} Ngày</span>
            </div>

            {/* Points */}
            <div
              className="hidden sm:flex items-center space-x-1.5 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-400 font-semibold text-xs sm:text-sm"
              title="Điểm tích lũy bài tập"
            >
              <Trophy className="w-4 h-4 text-emerald-400" />
              <span>{userProgress.totalPoints} đ</span>
            </div>

            {/* AI Tutor Chatbot Trigger */}
            <button
              id="ai-tutor-trigger-btn"
              onClick={onOpenTutor}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-lg shadow-purple-900/30 transition-all hover:scale-105 active:scale-95"
            >
              <Bot className="w-4 h-4 text-cyan-200 animate-bounce" />
              <span className="hidden lg:inline">Thầy Cô AI 24/7</span>
              <span className="lg:hidden">Hỏi AI</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Header with Voice Selector */}
        <div className="xl:hidden flex items-center justify-center py-1.5 border-t border-slate-800/80 bg-slate-950/40">
          <VoiceSelector compact />
        </div>

        {/* Mobile Navigation Tabs */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800 text-xs font-medium">
          <button
            onClick={() => setCurrentTab('units')}
            className={`flex flex-col items-center py-1 ${
              currentTab === 'units' ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
          >
            <BookOpen className="w-4 h-4 mb-0.5" />
            <span>12 Unit SGK</span>
          </button>
          <button
            onClick={() => setCurrentTab('games')}
            className={`flex flex-col items-center py-1 ${
              currentTab === 'games' ? 'text-emerald-400 font-bold' : 'text-slate-400'
            }`}
          >
            <Gamepad2 className="w-4 h-4 mb-0.5" />
            <span>Trò Chơi</span>
          </button>
          <button
            onClick={onOpenRouteModal}
            className="flex flex-col items-center py-1 text-amber-400"
          >
            <Route className="w-4 h-4 mb-0.5" />
            <span>Lộ Trình</span>
          </button>
          <button
            onClick={() => setCurrentTab('ai-quiz')}
            className={`flex flex-col items-center py-1 ${
              currentTab === 'ai-quiz' ? 'text-purple-400 font-bold' : 'text-slate-400'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4 mb-0.5" />
            <span>Tạo Đề</span>
          </button>
        </div>
      </div>
    </header>
  );
};
