import React, { useState } from 'react';
import { UnitData, UserProgressState } from '../types';
import { VocabularyTab } from './tabs/VocabularyTab';
import { GrammarTab } from './tabs/GrammarTab';
import { ListeningTab } from './tabs/ListeningTab';
import { SpeakingTab } from './tabs/SpeakingTab';
import { ReadingTab } from './tabs/ReadingTab';
import { WritingTab } from './tabs/WritingTab';
import {
  ArrowLeft,
  BookOpen,
  BookMarked,
  Headphones,
  Mic,
  FileText,
  PenTool,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface UnitDetailViewProps {
  unit: UnitData;
  onBack: () => void;
  userProgress: UserProgressState;
  onToggleMasterWord: (wordId: string) => void;
  onSkillComplete: (skill: string) => void;
}

type TabType = 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading' | 'writing';

export const UnitDetailView: React.FC<UnitDetailViewProps> = ({
  unit,
  onBack,
  userProgress,
  onToggleMasterWord,
  onSkillComplete,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('vocabulary');

  const tabs = [
    { id: 'vocabulary', label: 'Từ vựng', icon: BookOpen },
    { id: 'grammar', label: 'Ngữ pháp', icon: BookMarked },
    { id: 'listening', label: 'Listening', icon: Headphones },
    { id: 'speaking', label: 'Speaking', icon: Mic },
    { id: 'reading', label: 'Reading', icon: FileText },
    { id: 'writing', label: 'Writing', icon: PenTool },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Back Button & Header Banner */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-4">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700 transition-all hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Danh sách 12 Unit</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400 bg-blue-900/60 border border-blue-700/60 px-3 py-1 rounded-full">
              {unit.title.split(':')[0]} • {unit.theme}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2">
              {unit.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">{unit.description}</p>
          </div>

          <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-xs space-y-1">
            <span className="text-slate-400 font-semibold block">Trọng tâm phát âm SGK:</span>
            <span className="text-amber-300 font-bold">{unit.pronunciationFocus}</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCompleted = userProgress.completedSkills[`unit-${unit.id}-${tab.id}`];

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {isCompleted && (
                <CheckCircle2
                  className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-emerald-500'}`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[400px]">
        {activeTab === 'vocabulary' && (
          <VocabularyTab
            vocabularyList={unit.vocabulary}
            masteredWordIds={userProgress.vocabularyMastered}
            onToggleMasterWord={onToggleMasterWord}
            onSkillComplete={() => onSkillComplete('vocabulary')}
          />
        )}

        {activeTab === 'grammar' && (
          <GrammarTab
            grammarSection={unit.grammar}
            onSkillComplete={() => onSkillComplete('grammar')}
          />
        )}

        {activeTab === 'listening' && (
          <ListeningTab
            listeningSection={unit.listening}
            onSkillComplete={() => onSkillComplete('listening')}
          />
        )}

        {activeTab === 'speaking' && (
          <SpeakingTab
            speakingPrompts={unit.speakingPrompts}
            onSkillComplete={() => onSkillComplete('speaking')}
          />
        )}

        {activeTab === 'reading' && (
          <ReadingTab
            readingSection={unit.reading}
            onSkillComplete={() => onSkillComplete('reading')}
          />
        )}

        {activeTab === 'writing' && (
          <WritingTab
            writingPrompt={unit.writing}
            writingPrompts={unit.writingPrompts}
            onSkillComplete={() => onSkillComplete('writing')}
          />
        )}
      </div>
    </div>
  );
};
