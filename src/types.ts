export type SkillType = 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading' | 'writing';

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string; // IPA e.g. /ˈhandikraːft/
  partOfSpeech: 'noun' | 'verb' | 'adjective' | 'adverb' | 'phrasal verb' | 'idiom';
  vietnameseMeaning: string;
  englishExample: string;
  vietnameseExample: string;
  imagePrompt?: string;
  audioKey?: string;
}

export interface GrammarExercise {
  id: string;
  question: string; // e.g. "She wishes she _____ (have) more time for handicrafts."
  options?: string[];
  correctAnswer: string;
  explanation: string; // Vietnamese explanation
}

export interface GrammarSection {
  title: string;
  summary: string;
  formulaBox?: string[];
  usagePoints: { title: string; detail: string; example: string }[];
  exercises: GrammarExercise[];
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ListeningSection {
  audioTitle: string;
  audioDuration: string;
  transcriptText: string; // English transcript with Vietnamese translation toggles
  vietnameseTranslation: string;
  audioScriptSpeaker: string;
  questions: ListeningQuestion[];
  fillInBlankExercises?: {
    id: string;
    sentenceWithBlank: string; // "The local craftsmen use _____ techniques passed down..."
    correctWord: string;
    hint: string;
  }[];
}

export interface SpeakingPrompt {
  id: string;
  targetSentence: string;
  ipa: string;
  vietnameseMeaning: string;
  contextSituation: string;
  keyPhonicsFocus: string; // e.g. "Phát âm chuẩn âm /f/ và /v/"
  sampleAudioText: string;
}

export interface ReadingQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ReadingSection {
  title: string;
  topic: string;
  passageText: string;
  keyVocabularyHighlights: { word: string; meaning: string }[];
  questions: ReadingQuestion[];
}

export interface WritingPrompt {
  id: string;
  title: string;
  description: string;
  suggestedOutline: string[];
  usefulPhrases: string[];
  wordLimit: string;
  sampleGrade10Response: string;
}

export interface UnitData {
  id: number; // 1 to 12
  title: string; // e.g. "Unit 1: Local Community"
  theme: string; // "Cộng đồng địa phương & Làng nghề"
  description: string;
  pronunciationFocus: string; // e.g. "Âm /f/ và /v/"
  badgeIconName: string;
  vocabulary: VocabularyItem[];
  grammar: GrammarSection;
  listening: ListeningSection;
  speakingPrompts: SpeakingPrompt[];
  reading: ReadingSection;
  writing: WritingPrompt;
  writingPrompts?: WritingPrompt[];
}

export interface DiagnosticQuestion {
  id: number;
  category: 'Grammar' | 'Vocabulary' | 'Reading' | 'Listening';
  question: string;
  options: string[];
  correctIndex: number;
}

export interface UserPersonalizedRoute {
  assessedLevel: 'Yếu' | 'Trung bình' | 'Khá' | 'Giỏi';
  levelDescription: string;
  weaknessSkills: string[];
  recommendedUnits: { unitId: number; title: string; priorityReason: string }[];
  dailyTarget: {
    vocabularyCount: number;
    minutesPerDay: number;
    weeklyGoal: string;
  };
  studyTips: string[];
  updatedAt: string;
}

export interface MillionaireQuestion {
  id: number;
  level: number; // 1 to 15
  prize: string;
  question: string;
  options: [string, string, string, string]; // A, B, C, D
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  category: 'Vocabulary' | 'Grammar' | 'SGK Culture';
}

export interface SpeedReflexQuestion {
  id: string;
  prompt: string; // "Nghĩa của 'craftsman' là gì?"
  options: string[];
  correctAnswer: string;
  timeLimitSec: number;
}

export interface SentenceScrambleItem {
  id: string;
  scrambledWords: string[]; // ["vouchers", "discount", "offer", "They", "us"]
  correctSentence: string; // "They offer us discount vouchers."
  vietnameseMeaning: string;
  grammarTip: string;
}

export interface UserProgressState {
  completedUnits: number[]; // Unit IDs completed
  completedSkills: Record<string, boolean>; // e.g. "unit-1-vocabulary": true
  totalPoints: number;
  streakDays: number;
  lastStudyDate: string;
  vocabularyMastered: string[]; // List of mastered word IDs
  personalizedRoute?: UserPersonalizedRoute;
  testHistory: {
    date: string;
    unitId: number;
    scorePercent: number;
  }[];
}

export interface AIWritingCorrection {
  overallScore: number;
  scores: {
    grammar: number;
    vocabulary: number;
    coherence: number;
    taskFulfillment: number;
  };
  generalFeedback: string;
  corrections: {
    original: string;
    corrected: string;
    reason: string;
  }[];
  improvedVersion: string;
  keyVocabularyUsed: string[];
  grade10ExamTips: string;
}

export interface AISpeakingEval {
  accuracyScore: number;
  fluencyScore: number;
  phonemeFeedback: {
    word: string;
    status: 'correct' | 'needs_work' | 'missed';
    ipa: string;
    tip: string;
  }[];
  strengths: string;
  improvements: string;
  encouragement: string;
}
