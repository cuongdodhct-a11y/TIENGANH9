import React, { useState, useEffect } from 'react';
import { ReadingSection } from '../../types';
import { CheckCircle2, HelpCircle, Trophy, Sparkles, Volume2, Play, Pause } from 'lucide-react';
import { playSoundEffect, speakEnglish, stopSpeaking, getPreferredVoice, VoiceProfile } from '../../utils/audioHelpers';

interface ReadingTabProps {
  readingSection: ReadingSection;
  onSkillComplete: () => void;
}

export const ReadingTab: React.FC<ReadingTabProps> = ({ readingSection, onSkillComplete }) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isReadingAudio, setIsReadingAudio] = useState(false);
  const [activeVoice, setActiveVoice] = useState<VoiceProfile | null>(null);
  const [activeSpeakingText, setActiveSpeakingText] = useState<string | null>(null);
  const [activeSpeakingVoice, setActiveSpeakingVoice] = useState<VoiceProfile | null>(null);

  // Stop audio on unmount or tab switch
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleSpeakText = (text: string, forcedVoice?: VoiceProfile) => {
    playSoundEffect('click');
    const voiceToUse = forcedVoice || getPreferredVoice();

    if (activeSpeakingText === text && activeSpeakingVoice === voiceToUse) {
      stopSpeaking();
      setActiveSpeakingText(null);
      setActiveSpeakingVoice(null);
    } else {
      setActiveSpeakingText(text);
      setActiveSpeakingVoice(voiceToUse);
      speakEnglish(
        text,
        0.9,
        () => {
          setActiveSpeakingText(null);
          setActiveSpeakingVoice(null);
        },
        voiceToUse
      );
    }
  };

  const handleTogglePassageAudio = (forcedVoice?: VoiceProfile) => {
    playSoundEffect('click');
    const voiceToPlay = forcedVoice || getPreferredVoice();
    if (isReadingAudio && activeVoice === voiceToPlay) {
      stopSpeaking();
      setIsReadingAudio(false);
      setActiveVoice(null);
    } else {
      setIsReadingAudio(true);
      setActiveVoice(voiceToPlay);
      speakEnglish(
        readingSection.passageText,
        0.88,
        () => {
          setIsReadingAudio(false);
          setActiveVoice(null);
        },
        voiceToPlay
      );
    }
  };

  const handleSubmitReading = () => {
    let correctCount = 0;
    readingSection.questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);
    playSoundEffect('correct');
    onSkillComplete();
  };

  // Helper to split passage into sentences for granular listening
  const getSentencesFromParagraph = (paragraph: string) => {
    const raw = paragraph.match(/[^.!?]+[.!?]+|[^.!?]+$/g);
    return raw ? raw.map((s) => s.trim()).filter((s) => s.length > 0) : [paragraph];
  };

  return (
    <div className="space-y-8">
      {/* Passage Display Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Chủ đề: {readingSection.topic}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
              {readingSection.title}
            </h3>
          </div>

          {/* Teacher Audio Buttons for Full Passage */}
          <div className="flex items-center space-x-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-200 shrink-0">
            <button
              onClick={() => handleTogglePassageAudio('female')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm transition-all ${
                isReadingAudio && activeVoice === 'female'
                  ? 'bg-rose-500 text-white ring-2 ring-rose-300 animate-pulse'
                  : 'bg-white hover:bg-rose-50 text-rose-700 border border-rose-200'
              }`}
              title="Nghe Cô Emily đọc toàn bộ bài đọc"
            >
              <span>👩‍🏫</span>
              <span>{isReadingAudio && activeVoice === 'female' ? 'Cô Emily đang đọc...' : 'Cô Emily đọc hết bài'}</span>
              {isReadingAudio && activeVoice === 'female' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            <button
              onClick={() => handleTogglePassageAudio('male')}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl font-bold text-xs shadow-sm transition-all ${
                isReadingAudio && activeVoice === 'male'
                  ? 'bg-blue-600 text-white ring-2 ring-blue-300 animate-pulse'
                  : 'bg-white hover:bg-blue-50 text-blue-700 border border-blue-200'
              }`}
              title="Nghe Thầy David đọc toàn bộ bài đọc"
            >
              <span>👨‍🏫</span>
              <span>{isReadingAudio && activeVoice === 'male' ? 'Thầy David đang đọc...' : 'Thầy David đọc hết bài'}</span>
              {isReadingAudio && activeVoice === 'male' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
          </div>
        </div>

        {/* Reading Passage Text - Sentence by Sentence Audio Enabled */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 font-serif">
          {readingSection.passageText.split('\n\n').map((paragraph, pIdx) => {
            const sentences = getSentencesFromParagraph(paragraph);
            return (
              <div key={pIdx} className="space-y-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  {sentences.map((sent, sIdx) => {
                    const isSentenceActive = activeSpeakingText === sent;
                    return (
                      <span
                        key={sIdx}
                        className={`inline-flex items-center rounded-lg px-1.5 py-0.5 transition-all group relative ${
                          isSentenceActive
                            ? 'bg-amber-200 text-slate-950 font-bold ring-2 ring-amber-400'
                            : 'hover:bg-blue-50 hover:text-blue-900'
                        }`}
                      >
                        <span>{sent}</span>
                        <span className="inline-flex items-center space-x-0.5 ml-1.5 not-sr-only">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakText(sent, 'female');
                            }}
                            className={`p-1 rounded-md text-[10px] transition-all ${
                              isSentenceActive && activeSpeakingVoice === 'female'
                                ? 'bg-rose-500 text-white scale-110'
                                : 'bg-rose-100 hover:bg-rose-200 text-rose-700 opacity-80 group-hover:opacity-100'
                            }`}
                            title="Nghe Cô Emily đọc câu này"
                          >
                            👩‍🏫
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakText(sent, 'male');
                            }}
                            className={`p-1 rounded-md text-[10px] transition-all ${
                              isSentenceActive && activeSpeakingVoice === 'male'
                                ? 'bg-blue-600 text-white scale-110'
                                : 'bg-blue-100 hover:bg-blue-200 text-blue-700 opacity-80 group-hover:opacity-100'
                            }`}
                            title="Nghe Thầy David đọc câu này"
                          >
                            👨‍🏫
                          </button>
                        </span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Key Vocabulary Highlights Drawer */}
        <div className="space-y-3 pt-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Từ Vựng Quan Trọng Trong Bài Đọc:</span>
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {readingSection.keyVocabularyHighlights.map((v, idx) => {
              const isSpeaking = activeSpeakingText === v.word;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-xs flex items-center justify-between space-x-2 transition-all ${
                    isSpeaking ? 'bg-amber-100 border-amber-400' : 'bg-blue-50/80 border-blue-200'
                  }`}
                >
                  <div>
                    <p className="font-extrabold text-blue-900">{v.word}</p>
                    <p className="text-blue-700 font-medium">{v.meaning}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => handleSpeakText(v.word, 'female')}
                      className={`p-1 rounded text-[10px] font-bold transition-all ${
                        isSpeaking && activeSpeakingVoice === 'female'
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                      }`}
                      title="Cô Emily phát âm"
                    >
                      👩‍🏫
                    </button>
                    <button
                      onClick={() => handleSpeakText(v.word, 'male')}
                      className={`p-1 rounded text-[10px] font-bold transition-all ${
                        isSpeaking && activeSpeakingVoice === 'male'
                          ? 'bg-blue-600 text-white animate-pulse'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                      title="Thầy David phát âm"
                    >
                      👨‍🏫
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reading Comprehension Questions */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div>
            <h4 className="text-lg font-bold text-slate-900">Câu Hỏi Đọc Hiểu</h4>
            <p className="text-xs text-slate-500">
              Nghe phát âm từng câu hỏi và lựa chọn đáp án chính xác nhất
            </p>
          </div>
          {submitted && (
            <div className="flex items-center space-x-2 bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1.5 rounded-xl">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span>
                Đúng {score}/{readingSection.questions.length} câu
              </span>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {readingSection.questions.map((q, qIdx) => {
            const isUserCorrect = userAnswers[q.id] === q.correctAnswerIndex;
            const isQuestionSpeaking = activeSpeakingText === q.question;

            return (
              <div key={q.id} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4 shadow-sm">
                {/* Question Sentence with Dual Teacher Audio Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <p className="text-sm font-bold text-slate-800 leading-snug">
                    <span className="text-blue-600 font-black mr-1">Câu {qIdx + 1}:</span> {q.question}
                  </p>

                  <div className="flex items-center space-x-1.5 shrink-0">
                    <button
                      onClick={() => handleSpeakText(q.question, 'female')}
                      className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        isQuestionSpeaking && activeSpeakingVoice === 'female'
                          ? 'bg-rose-500 text-white ring-2 ring-rose-300 animate-pulse'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      }`}
                      title="Cô Emily đọc câu hỏi này"
                    >
                      <span>👩‍🏫</span>
                      <span>{isQuestionSpeaking && activeSpeakingVoice === 'female' ? 'Đang đọc...' : 'Cô Emily'}</span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleSpeakText(q.question, 'male')}
                      className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        isQuestionSpeaking && activeSpeakingVoice === 'male'
                          ? 'bg-blue-600 text-white ring-2 ring-blue-300 animate-pulse'
                          : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                      }`}
                      title="Thầy David đọc câu hỏi này"
                    >
                      <span>👨‍🏫</span>
                      <span>{isQuestionSpeaking && activeSpeakingVoice === 'male' ? 'Đang đọc...' : 'Thầy David'}</span>
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Options with Inline Audio Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[q.id] === optIdx;
                    const isCorrect = optIdx === q.correctAnswerIndex;
                    const isOptSpeaking = activeSpeakingText === opt;

                    let style = 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200';
                    if (submitted) {
                      if (isCorrect) style = 'bg-emerald-600 text-white border-emerald-700';
                      else if (isSelected) style = 'bg-rose-600 text-white border-rose-700';
                    } else if (isSelected) {
                      style = 'bg-blue-600 text-white border-blue-700 shadow-sm';
                    }

                    return (
                      <div
                        key={optIdx}
                        onClick={() =>
                          !submitted && setUserAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                        }
                        className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border text-left flex items-center justify-between transition-all cursor-pointer ${style}`}
                      >
                        <span className="pr-2">{opt}</span>

                        <div className="flex items-center space-x-1 shrink-0">
                          {/* Option Audio Listen Buttons */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakText(opt, 'female');
                            }}
                            className={`p-1 rounded-md text-[10px] transition-all ${
                              isOptSpeaking && activeSpeakingVoice === 'female'
                                ? 'bg-rose-500 text-white'
                                : isSelected && !submitted
                                ? 'bg-blue-700 text-white hover:bg-blue-800'
                                : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                            }`}
                            title="Nghe Cô Emily phát âm phương án này"
                          >
                            👩‍🏫
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSpeakText(opt, 'male');
                            }}
                            className={`p-1 rounded-md text-[10px] transition-all ${
                              isOptSpeaking && activeSpeakingVoice === 'male'
                                ? 'bg-blue-600 text-white'
                                : isSelected && !submitted
                                ? 'bg-blue-700 text-white hover:bg-blue-800'
                                : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200'
                            }`}
                            title="Nghe Thầy David phát âm phương án này"
                          >
                            👨‍🏫
                          </button>

                          {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-white ml-1" />}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <div
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 ${
                      isUserCorrect
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold flex items-center space-x-1">
                        <HelpCircle className="w-4 h-4" />
                        <span>Giải thích chi tiết:</span>
                      </p>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleSpeakText(q.explanation, 'female')}
                          className="px-2 py-0.5 rounded bg-white text-rose-700 border border-rose-200 text-[10px] font-bold"
                          title="Cô Emily đọc giải thích"
                        >
                          👩‍🏫 Nghe giải thích
                        </button>
                        <button
                          onClick={() => handleSpeakText(q.explanation, 'male')}
                          className="px-2 py-0.5 rounded bg-white text-blue-700 border border-blue-200 text-[10px] font-bold"
                          title="Thầy David đọc giải thích"
                        >
                          👨‍🏫 Nghe giải thích
                        </button>
                      </div>
                    </div>
                    <p className="leading-relaxed">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Action */}
        <div className="pt-2 flex justify-end">
          {!submitted ? (
            <button
              onClick={handleSubmitReading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl shadow-md transition-all"
            >
              Nộp Bài Đọc Hiểu
            </button>
          ) : (
            <button
              onClick={() => {
                setSubmitted(false);
                setUserAnswers({});
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all"
            >
              Làm Lại Bài Đọc
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
