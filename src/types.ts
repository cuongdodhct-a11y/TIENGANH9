// ============================================================================
// TIENGANH9 – GLOBAL TYPE DEFINITIONS
// ============================================================================

export type SkillType =
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'speaking'
  | 'reading'
  | 'writing';

// ============================================================================
// VOCABULARY
// ============================================================================

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech:
    | 'noun'
    | 'verb'
    | 'adjective'
    | 'adverb'
    | 'phrasal verb'
    | 'idiom'
    | 'phrase';
  vietnameseMeaning: string;
  englishExample: string;
  vietnameseExample: string;
  imagePrompt?: string;
  audioKey?: string;
}

// ============================================================================
// GRAMMAR
// ============================================================================

export interface GrammarExercise {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
}

export interface GrammarSection {
  title: string;
  summary: string;
  formulaBox?: string[];
  usagePoints: {
    title: string;
    detail: string;
    example: string;
  }[];
  exercises: GrammarExercise[];
}

// ============================================================================
// LISTENING
// ============================================================================

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

/**
 * Một lượt thoại trong bài nghe.
 *
 * Đây là cấu trúc mới quan trọng nhất cho Listening.
 *
 * speaker:
 *   Tên nhân vật thật trong bài nghe.
 *
 * voice:
 *   female -> Cô Emily
 *   male   -> Thầy David
 */
export interface ListeningDialogueLine {
  id: string;
  speaker: string;
  voice: 'female' | 'male';
  text: string;
}

/**
 * ListeningSection vẫn giữ toàn bộ cấu trúc cũ để tương thích
 * với dữ liệu 12 Unit hiện tại.
 *
 * dialogue là trường MỚI và optional.
 *
 * Nếu dữ liệu Unit chưa có dialogue,
 * ListeningTab sẽ tự phân tích transcriptText để tạo lượt thoại.
 */
export interface ListeningSection {
  audioTitle: string;
  audioDuration: string;

  /**
   * Có thể dùng cho các phiên bản dữ liệu mới.
   */
  title?: string;

  /**
   * Có thể dùng cho mô tả bài nghe nếu dữ liệu có.
   */
  audioDescription?: string;

  transcriptText: string;
  vietnameseTranslation: string;
  audioScriptSpeaker: string;

  /**
   * Cấu trúc hội thoại chuẩn.
   */
  dialogue?: ListeningDialogueLine[];

  questions: ListeningQuestion[];

  fillInBlankExercises?: {
    id: string;
    sentenceWithBlank: string;
    correctWord: string;
    hint: string;
  }[];
}

// ============================================================================
// SPEAKING
// ============================================================================

export interface SpeakingPrompt {
  id: string;
  targetSentence: string;
  ipa: string;
  vietnameseMeaning: string;
  contextSituation: string;
  keyPhonicsFocus: string;
  sampleAudioText: string;
}

// ============================================================================
// READING
// ============================================================================

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
  keyVocabularyHighlights: {
    word: string;
    meaning: string;
  }[];
  questions: ReadingQuestion[];
}

// ============================================================================
// WRITING
// ============================================================================

export interface WritingPrompt {
  id: string;
  title: string;
  description: string;
  suggestedOutline: string[];
  usefulPhrases: string[];
  wordLimit: string;
  sampleGrade10Response: string;
}

// ============================================================================
// UNIT
// ============================================================================

export interface UnitData {
  id: number;
  title: string;
  theme: string;
  description: string;
  pronunciationFocus: string;
  badgeIconName: string;

  vocabulary: VocabularyItem[];
  grammar: GrammarSection;
  listening: ListeningSection;
  speakingPrompts: SpeakingPrompt[];
  reading: ReadingSection;
  writing: WritingPrompt;

  writingPrompts?: WritingPrompt[];
}

// ============================================================================
// DIAGNOSTIC
// ============================================================================

export interface DiagnosticQuestion {
  id: number;
  category:
    | 'Grammar'
    | 'Vocabulary'
    | 'Reading'
    | 'Listening';
  question: string;
  options: string[];
  correctIndex: number;
}

// ============================================================================
// PERSONALIZED ROUTE
// ============================================================================

export interface UserPersonalizedRoute {
  assessedLevel:
    | 'Yếu'
    | 'Trung bình'
    | 'Khá'
    | 'Giỏi';

  levelDescription: string;

  weaknessSkills: string[];

  recommendedUnits: {
    unitId: number;
    title: string;
    priorityReason: string;
  }[];

  dailyTarget: {
    vocabularyCount: number;
    minutesPerDay: number;
    weeklyGoal: string;
  };

  studyTips: string[];

  updatedAt: string;
}

// ============================================================================
// GAMES
// ============================================================================

export interface MillionaireQuestion {
  id: number;
  level: number;
  prize: string;
  question: string;

  options: [
    string,
    string,
    string,
    string
  ];

  correctIndex: number;

  explanation: string;

  category:
    | 'Vocabulary'
    | 'Grammar'
    | 'SGK Culture';
}

export interface SpeedReflexQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
  timeLimitSec: number;
}

export interface SentenceScrambleItem {
  id: string;
  scrambledWords: string[];
  correctSentence: string;
  vietnameseMeaning: string;
  grammarTip: string;
}

// ============================================================================
// USER PROGRESS
// ============================================================================

export interface UserProgressState {
  completedUnits: number[];

  completedSkills: Record<
    string,
    boolean
  >;

  totalPoints: number;

  streakDays: number;

  lastStudyDate: string;

  vocabularyMastered: string[];

  personalizedRoute?: UserPersonalizedRoute;

  testHistory: {
    date: string;
    unitId: number;
    scorePercent: number;
  }[];
}

// ============================================================================
// AI WRITING
// ============================================================================

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

// ============================================================================
// AI SPEAKING
// ============================================================================

export interface AISpeakingEval {
  accuracyScore: number;
  fluencyScore: number;

  phonemeFeedback: {
    word: string;
    status:
      | 'correct'
      | 'needs_work'
      | 'missed';
    ipa: string;
    tip: string;
  }[];

  strengths: string;

  improvements: string;

  encouragement: string;
}