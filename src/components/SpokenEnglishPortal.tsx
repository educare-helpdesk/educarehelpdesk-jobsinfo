import React, { useState, useEffect, useRef } from 'react';
import {
  INSTRUCTOR_PROFILE,
  SPOKEN_LESSONS,
  INSTRUCTOR_STUDY_NOTES,
  GRAMMAR_RULES,
  DIALOGUE_SCENARIOS,
  SPOKEN_ENGLISH_QUIZ,
  SpokenLesson,
  StudyNote,
  GrammarRule,
  DialogueScenario
} from '../data/spokenEnglishData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import {
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  BookOpen,
  Sparkles,
  Award,
  CheckCircle2,
  Phone,
  MessageCircle,
  RotateCcw,
  Send,
  HelpCircle,
  FileText,
  Printer,
  ChevronRight,
  GraduationCap,
  MessageSquare,
  Compass,
  AlertCircle,
  Check,
  Copy,
  Languages,
  Play,
  Pause,
  ExternalLink,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface SpokenEnglishPortalProps {
  onNavigateTab?: (tab: string) => void;
  onOpenInquiry?: () => void;
}

export const SpokenEnglishPortal: React.FC<SpokenEnglishPortalProps> = ({
  onNavigateTab,
  onOpenInquiry
}) => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'notes' | 'grammar' | 'practice' | 'quiz'>('lessons');

  // Lesson State
  const [selectedLessonId, setSelectedLessonId] = useState<string>(SPOKEN_LESSONS[0].id);
  const [lessonFilterLevel, setLessonFilterLevel] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');

  // Notes State
  const [selectedNoteId, setSelectedNoteId] = useState<string>(INSTRUCTOR_STUDY_NOTES[0].id);
  const [copiedSentenceIndex, setCopiedSentenceIndex] = useState<number | null>(null);

  // Grammar Rules State
  const [selectedGrammarId, setSelectedGrammarId] = useState<string>(GRAMMAR_RULES[0].id);
  const [grammarCategory, setGrammarCategory] = useState<string>('All');

  // Interactive Dialogue State
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(DIALOGUE_SCENARIOS[0].id);
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState<number>(0);
  const [userSpokenText, setUserSpokenText] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [micSupported, setMicSupported] = useState<boolean>(true);
  const [dialogueFeedback, setDialogueFeedback] = useState<string | null>(null);

  // AI English Coach State
  const [aiInputText, setAiInputText] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiCoachResult, setAiCoachResult] = useState<any | null>(null);

  // Speech Synthesis Audio States
  const [speechRate, setSpeechRate] = useState<number>(0.9); // 0.8 to 1.1 for clarity
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentlySpeakingText, setCurrentlySpeakingText] = useState<string>('');

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [isQuizAnswerSubmitted, setIsQuizAnswerSubmitted] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState<boolean>(false);

  // Speech Recognition ref
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserSpokenText(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setMicSupported(false);
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Text-To-Speech helper
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    window.speechSynthesis.cancel();

    if (currentlySpeakingText === text && isPlayingAudio) {
      setIsPlayingAudio(false);
      setCurrentlySpeakingText('');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1;
    utterance.lang = 'en-US';

    utterance.onstart = () => {
      setIsPlayingAudio(true);
      setCurrentlySpeakingText(text);
    };

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setCurrentlySpeakingText('');
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setCurrentlySpeakingText('');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Stop speaking
  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      setCurrentlySpeakingText('');
    }
  };

  // Mic recording toggle
  const handleToggleMic = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your sentence in the practice box.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      setUserSpokenText('');
      setDialogueFeedback(null);
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.warn('Could not start speech recognition:', err);
        setIsRecording(false);
      }
    }
  };

  // Submit sentence to AI Coach
  const handleAskAiCoach = async (sentenceToTest?: string) => {
    const textToSubmit = sentenceToTest || aiInputText || userSpokenText;
    if (!textToSubmit || !textToSubmit.trim()) return;

    setIsAiLoading(true);
    setAiCoachResult(null);

    try {
      const response = await fetch('/api/ai/english-coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userSentence: textToSubmit,
          currentTopic: 'Spoken English & Communication Practice',
          targetLevel: 'Intermediate'
        })
      });

      const data = await response.json();
      if (data && data.success && data.data) {
        setAiCoachResult(data.data);
      }
    } catch (err) {
      console.error('Error fetching AI coach feedback:', err);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Handle Copy
  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSentenceIndex(index);
    setTimeout(() => setCopiedSentenceIndex(null), 2000);
  };

  // WhatsApp Url
  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
    `Hello Instructor Nusrat Waqar (03451291610), I am studying the Spoken English & Grammar lessons on Educare Help Desk and need personal guidance.`
  )}`;

  // Filtered Lessons
  const filteredLessons = SPOKEN_LESSONS.filter(
    (l) => lessonFilterLevel === 'All' || l.level === lessonFilterLevel
  );

  const currentLesson = SPOKEN_LESSONS.find((l) => l.id === selectedLessonId) || SPOKEN_LESSONS[0];
  const currentNote = INSTRUCTOR_STUDY_NOTES.find((n) => n.id === selectedNoteId) || INSTRUCTOR_STUDY_NOTES[0];
  const currentGrammarRule = GRAMMAR_RULES.find((g) => g.id === selectedGrammarId) || GRAMMAR_RULES[0];
  const currentScenario = DIALOGUE_SCENARIOS.find((s) => s.id === selectedScenarioId) || DIALOGUE_SCENARIOS[0];
  const currentQuiz = SPOKEN_ENGLISH_QUIZ[currentQuizIndex];

  // Grammar Categories
  const grammarCategories = ['All', 'Tenses', 'Modal Verbs', 'Sentence Structure', 'Prepositions', 'Articles'];
  const filteredGrammarRules = GRAMMAR_RULES.filter(
    (g) => grammarCategory === 'All' || g.category === grammarCategory
  );

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto">
      {/* Hero & Instructor Profile Banner */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-600 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black tracking-wider uppercase shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>Official Educare Language Academy • Instructor Nusrat Waqar</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Spoken English & Grammar Mastery
            </h1>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              Conquer hesitation and speak fluent, natural English with clear pronunciation, real-life dialogue practice, and practical grammar rules. Taught by <strong>{INSTRUCTOR_PROFILE.name}</strong>.
            </p>

            {/* Instructor Welcome Quote */}
            <div className="bg-slate-950/60 border-l-4 border-amber-400 p-4 rounded-r-2xl max-w-2xl">
              <p className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                “{INSTRUCTOR_PROFILE.welcomeMessage}”
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-amber-300 font-bold">
                <span>— {INSTRUCTOR_PROFILE.name}</span>
                <span className="text-slate-400">Helpline: {HELPDESK_PHONE}</span>
              </div>
            </div>

            {/* Fast Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${HELPDESK_PHONE}`}
                className="min-h-[44px] bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all border border-amber-500"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call Helpline: {HELPDESK_PHONE}</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all border border-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>Ask Instructor Nusrat (WhatsApp)</span>
              </a>

              <button
                onClick={() => {
                  setActiveTab('practice');
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="min-h-[44px] bg-slate-800 hover:bg-slate-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 border border-slate-600 transition-all"
              >
                <Mic className="w-4 h-4 text-amber-400" />
                <span>Try Voice Practice Arena</span>
              </button>
            </div>
          </div>

          {/* Instructor Profile Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-full bg-white text-slate-900 rounded-3xl p-5 border-2 border-amber-400 shadow-2xl space-y-4">
              <div className="flex items-center gap-3.5 border-b border-slate-100 pb-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950 text-amber-400 flex items-center justify-center font-bold text-xl border-2 border-amber-400 shadow-md">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 font-serif leading-tight">
                    {INSTRUCTOR_PROFILE.name}
                  </h3>
                  <p className="text-xs text-emerald-800 font-bold mt-0.5">
                    {INSTRUCTOR_PROFILE.title}
                  </p>
                  <p className="text-[11px] text-slate-600">
                    {INSTRUCTOR_PROFILE.experience}
                  </p>
                </div>
              </div>

              {/* Audio Controls Bar */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                    Audio Speed:
                  </span>
                  <div className="flex items-center gap-1">
                    {[0.8, 0.9, 1.0, 1.1].map((rate) => (
                      <button
                        key={rate}
                        onClick={() => setSpeechRate(rate)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold transition-colors ${
                          speechRate === rate
                            ? 'bg-emerald-800 text-white'
                            : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                        }`}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() =>
                      handleSpeak(
                        "Welcome to our Spoken English and Grammar portal! I am Instructor Nusrat Waqar. Practice every day with me and build your fluency."
                      )
                    }
                    className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                  >
                    {isPlayingAudio ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-amber-300" />
                        <span>Stop Voice Sample</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-amber-300" />
                        <span>Listen to Intro (Pronunciation)</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* 5 Golden Rules preview */}
              <div className="space-y-1.5 text-[11px] text-slate-700 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
                <span className="font-extrabold text-amber-950 block text-xs">
                  Instructor Nusrat's Speaking Mantras:
                </span>
                <p>• Simple sentences spoken clearly are best.</p>
                <p>• Never fear making mistakes while learning.</p>
                <p>• Read dialogues out loud for 10 minutes daily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Tab Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`min-h-[46px] px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'lessons'
                ? 'bg-emerald-850 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Spoken Lessons</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`min-h-[46px] px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'notes'
                ? 'bg-emerald-850 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Instructor Notes</span>
          </button>

          <button
            onClick={() => setActiveTab('grammar')}
            className={`min-h-[46px] px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'grammar'
                ? 'bg-emerald-850 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Grammar Rules</span>
          </button>

          <button
            onClick={() => setActiveTab('practice')}
            className={`min-h-[46px] px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'practice'
                ? 'bg-emerald-850 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Mic className="w-4 h-4 text-amber-500" />
            <span>Practice Arena & AI</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`min-h-[46px] px-3 py-2 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all col-span-2 sm:col-span-1 ${
              activeTab === 'quiz'
                ? 'bg-emerald-850 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Fluency Quiz</span>
          </button>
        </div>
      </div>

      {/* ================= TAB 1: SPOKEN ENGLISH LESSONS ================= */}
      {activeTab === 'lessons' && (
        <div className="space-y-6">
          {/* Level Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>Filter By Level:</span>
              {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLessonFilterLevel(lvl)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    lessonFilterLevel === lvl
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Showing {filteredLessons.length} of {SPOKEN_LESSONS.length} Structured Modules
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Lesson Selector */}
            <div className="lg:col-span-4 space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
              {filteredLessons.map((lesson) => {
                const isSelected = lesson.id === selectedLessonId;
                return (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-2 ${
                      isSelected
                        ? 'bg-emerald-950 text-white border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={`font-black uppercase tracking-wider text-[10px] px-2 py-0.5 rounded ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Lesson {lesson.lessonNumber} • {lesson.level}
                      </span>
                      <span className="text-[11px] opacity-80">{lesson.durationMinutes} mins</span>
                    </div>

                    <h4 className="text-sm font-bold font-serif leading-snug">
                      {lesson.title}
                    </h4>

                    <p
                      className={`text-xs line-clamp-1 ${
                        isSelected ? 'text-emerald-200' : 'text-slate-600'
                      }`}
                    >
                      {lesson.urduSummary}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Main Lesson Content Area */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                    Lesson {currentLesson.lessonNumber} • Level: {currentLesson.level} • {currentLesson.durationMinutes} Minutes
                  </span>
                  <button
                    onClick={() => handleSpeak(currentLesson.title + '. ' + currentLesson.subtitle)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 hover:bg-emerald-100 transition-colors"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-700" />
                    <span>Listen Lesson Title</span>
                  </button>
                </div>

                <h2 className="text-xl sm:text-3xl font-extrabold font-serif text-slate-950">
                  {currentLesson.title}
                </h2>
                <p className="text-sm text-slate-600 font-medium">
                  {currentLesson.subtitle}
                </p>
                <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-xs sm:text-sm font-semibold text-emerald-950">
                  اردو خلاصہ: {currentLesson.urduSummary}
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="space-y-2.5">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Learning Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 font-medium">
                  {currentLesson.objectives.map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vocabulary & Pronunciation Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Essential Vocabulary & Pronunciation Guide</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">Tap audio icon to listen</span>
                </div>

                <div className="space-y-2.5">
                  {currentLesson.keyVocabulary.map((vocab, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:border-emerald-400 transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-950">
                            {vocab.wordOrPhrase}
                          </span>
                          <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                            /{vocab.pronunciation}/
                          </span>
                        </div>
                        <p className="text-xs text-emerald-850 font-bold">
                          {vocab.urduMeaning}
                        </p>
                        <p className="text-xs text-slate-600 italic">
                          "{vocab.exampleSentence}"
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          handleSpeak(vocab.wordOrPhrase + '. Example: ' + vocab.exampleSentence)
                        }
                        className="self-start sm:self-center min-h-[38px] px-3 py-1.5 bg-white hover:bg-emerald-600 hover:text-white text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                        title="Listen to pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Listen</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversational Dialogue Script */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-indigo-600" />
                      <span>Real-Life Dialogue: {currentLesson.dialogue.scenario}</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => {
                      const allLines = currentLesson.dialogue.turns
                        .map((t) => `${t.speaker} says: ${t.line}`)
                        .join('. ');
                      handleSpeak(allLines);
                    }}
                    className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-200 hover:bg-indigo-100 transition-colors flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Play Entire Dialogue</span>
                  </button>
                </div>

                <div className="bg-slate-950 text-white p-4 sm:p-6 rounded-2xl space-y-4">
                  {currentLesson.dialogue.turns.map((turn, tIdx) => {
                    const isA = turn.speaker === currentLesson.dialogue.speakerA;
                    return (
                      <div
                        key={tIdx}
                        className={`p-3.5 rounded-xl border space-y-1 ${
                          isA
                            ? 'bg-slate-900 border-slate-700 ml-0 mr-4'
                            : 'bg-emerald-950 border-emerald-700 ml-4 mr-0'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`font-black text-[11px] ${
                              isA ? 'text-amber-300' : 'text-emerald-300'
                            }`}
                          >
                            {turn.speaker}
                          </span>
                          <button
                            onClick={() => handleSpeak(turn.line)}
                            className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px]"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Audio</span>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm font-medium leading-relaxed">
                          "{turn.line}"
                        </p>
                        <p className="text-[11px] text-slate-400 italic">
                          اردو ترجمہ: {turn.urduTranslation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Common Mistakes to Avoid */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Common Blunders to Avoid (Wrong vs. Right)</span>
                </h3>

                <div className="space-y-2">
                  {currentLesson.commonMistakes.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-rose-50/50 p-3.5 rounded-2xl border border-rose-200 space-y-1 text-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="text-rose-700 font-bold line-through">
                          ❌ {m.wrong}
                        </span>
                        <span className="hidden sm:inline text-slate-400">➔</span>
                        <span className="text-emerald-800 font-extrabold">
                          ✅ {m.correct}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 pt-0.5">
                        <strong>Reason:</strong> {m.reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructor Nusrat's Golden Tip & Daily Speaking Challenge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 space-y-1.5">
                  <span className="text-xs font-black uppercase text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Instructor Nusrat's Speaking Tip</span>
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {currentLesson.nusratTip}
                  </p>
                </div>

                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-300 space-y-1.5">
                  <span className="text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Daily Speaking Challenge</span>
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {currentLesson.speakingChallenge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: INSTRUCTOR STUDY NOTES ================= */}
      {activeTab === 'notes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Note Selector Sidebar */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="bg-emerald-950 text-white p-4 rounded-2xl space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                  Authored by {INSTRUCTOR_PROFILE.name}
                </span>
                <h3 className="text-sm font-bold font-serif">
                  Printable Spoken English Handouts
                </h3>
                <p className="text-xs text-emerald-200">
                  Essential cheat sheets, 100 spoken sentences, and pronunciation rules.
                </p>
              </div>

              {INSTRUCTOR_STUDY_NOTES.map((note) => {
                const isSelected = note.id === selectedNoteId;
                return (
                  <div
                    key={note.id}
                    onClick={() => setSelectedNoteId(note.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 ${
                      isSelected
                        ? 'bg-emerald-900 text-white border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                        isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {note.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold font-serif leading-snug">
                      {note.title}
                    </h4>
                    <p
                      className={`text-[11px] line-clamp-2 ${
                        isSelected ? 'text-emerald-100' : 'text-slate-600'
                      }`}
                    >
                      {note.summary}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Selected Note Content */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                    {currentNote.category} • Study Guide by {currentNote.author}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold font-serif text-slate-950 mt-1">
                    {currentNote.title}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">{currentNote.summary}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={() => window.print()}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Handout</span>
                  </button>
                  <ShareButton
                    title={currentNote.title}
                    text={`Check out this Spoken English study handout by Instructor Nusrat Waqar!`}
                  />
                </div>
              </div>

              {/* Instructor Coaching Note */}
              <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 rounded-r-2xl">
                <span className="text-xs font-bold text-emerald-950 block">
                  Advice from Instructor Nusrat Waqar:
                </span>
                <p className="text-xs sm:text-sm text-slate-800 mt-0.5 leading-relaxed font-medium">
                  “{currentNote.instructorNote}”
                </p>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {currentNote.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-emerald-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                          {item.english}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-800 font-bold">
                        اردو: {item.urdu}
                      </p>
                      {item.contextOrPronunciation && (
                        <p className="text-[11px] text-slate-500 italic">
                          Note: {item.contextOrPronunciation}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <button
                        onClick={() => handleSpeak(item.english)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-emerald-800 hover:bg-emerald-50 text-xs transition-colors"
                        title="Listen"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCopyText(item.english, idx)}
                        className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs transition-colors"
                        title="Copy text"
                      >
                        {copiedSentenceIndex === idx ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: GRAMMAR RULES ================= */}
      {activeTab === 'grammar' && (
        <div className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-700">
              <span>Category:</span>
              {grammarCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGrammarCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    grammarCategory === cat
                      ? 'bg-emerald-800 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-xs text-slate-500">
              Showing {filteredGrammarRules.length} Core Rules
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Rule Selector Sidebar */}
            <div className="lg:col-span-4 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
              {filteredGrammarRules.map((rule) => {
                const isSelected = rule.id === selectedGrammarId;
                return (
                  <div
                    key={rule.id}
                    onClick={() => setSelectedGrammarId(rule.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer text-left space-y-1.5 ${
                      isSelected
                        ? 'bg-emerald-950 text-white border-amber-400 shadow-md ring-1 ring-amber-400'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span
                        className={`font-black uppercase px-2 py-0.5 rounded ${
                          isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {rule.category}
                      </span>
                      <span
                        className={
                          rule.importance === 'Essential'
                            ? 'text-amber-400 font-bold'
                            : 'text-emerald-400'
                        }
                      >
                        {rule.importance}
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold font-serif leading-snug">
                      {rule.title}
                    </h4>

                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isSelected ? 'text-emerald-200' : 'text-slate-600'
                      }`}
                    >
                      {rule.urduExplanation}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Main Grammar Rule Content Area */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                    {currentGrammarRule.category} • Importance: {currentGrammarRule.importance}
                  </span>
                  <button
                    onClick={() => handleSpeak(currentGrammarRule.title + '. ' + currentGrammarRule.coreExplanation)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold font-serif text-slate-950">
                  {currentGrammarRule.title}
                </h2>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-950">
                  اردو مفہوم: {currentGrammarRule.urduExplanation}
                </div>
              </div>

              {/* Formula Card */}
              <div className="bg-slate-950 text-white p-4 sm:p-5 rounded-2xl space-y-1.5 border border-slate-800">
                <span className="text-[11px] font-black uppercase text-amber-400 tracking-wider">
                  The Golden Formula
                </span>
                <p className="text-xs sm:text-sm font-mono font-bold text-emerald-200">
                  {currentGrammarRule.ruleFormula}
                </p>
              </div>

              {/* Core Explanation */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  How and When to Use This in Speaking
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {currentGrammarRule.coreExplanation}
                </p>
              </div>

              {/* Examples Structure */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Spoken Sentence Patterns (Positive, Negative & Question)
                </h3>

                <div className="space-y-3">
                  {currentGrammarRule.examples.map((ex, exIdx) => (
                    <div
                      key={exIdx}
                      className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                        <div className="bg-white p-2.5 rounded-xl border border-emerald-200">
                          <span className="text-[10px] font-black uppercase text-emerald-700 block">
                            Positive (+)
                          </span>
                          <span className="font-bold text-slate-900">{ex.positive}</span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-rose-200">
                          <span className="text-[10px] font-black uppercase text-rose-700 block">
                            Negative (-)
                          </span>
                          <span className="font-bold text-slate-900">{ex.negative}</span>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-blue-200">
                          <span className="text-[10px] font-black uppercase text-blue-700 block">
                            Question (?)
                          </span>
                          <span className="font-bold text-slate-900">{ex.question}</span>
                        </div>
                      </div>

                      <p className="text-xs text-emerald-900 font-bold pt-1">
                        اردو ترجمہ: {ex.urduMeaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Trap & Nusrat Note */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200 space-y-1">
                  <span className="text-xs font-black uppercase text-rose-900 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    <span>Watch Out for This Trap</span>
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {currentGrammarRule.commonTrap}
                  </p>
                </div>

                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 space-y-1">
                  <span className="text-xs font-black uppercase text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Instructor Nusrat's Insight</span>
                  </span>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {currentGrammarRule.nusratNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: PRACTICE ARENA & AI COACH ================= */}
      {activeTab === 'practice' && (
        <div className="space-y-8">
          {/* Section 1: Interactive Roleplay Simulator */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                  Interactive Roleplay Simulator
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-950 mt-1">
                  {currentScenario.title}
                </h3>
                <p className="text-xs text-slate-600">{currentScenario.description}</p>
              </div>

              {/* Scenario Selector */}
              <div className="flex items-center gap-2">
                <select
                  value={selectedScenarioId}
                  onChange={(e) => {
                    setSelectedScenarioId(e.target.value);
                    setCurrentExchangeIndex(0);
                    setUserSpokenText('');
                    setDialogueFeedback(null);
                  }}
                  className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {DIALOGUE_SCENARIOS.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.title} ({sc.level})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conversation Flow */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span>
                  Exchange {currentExchangeIndex + 1} of {currentScenario.exchanges.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {currentScenario.exchanges.map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 rounded-full transition-all ${
                        i === currentExchangeIndex
                          ? 'w-6 bg-emerald-700'
                          : i < currentExchangeIndex
                          ? 'w-2 bg-emerald-400'
                          : 'w-2 bg-slate-200'
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Partner Speaking Card */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-2 border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-black text-amber-400 text-xs flex items-center gap-1.5">
                    <UserCheck className="w-4 h-4" />
                    <span>{currentScenario.roles.partner} (Listening Partner)</span>
                  </span>
                  <button
                    onClick={() =>
                      handleSpeak(
                        currentScenario.exchanges[currentExchangeIndex].partnerPrompt
                      )
                    }
                    className="text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Play Audio</span>
                  </button>
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  "{currentScenario.exchanges[currentExchangeIndex].partnerPrompt}"
                </p>
              </div>

              {/* Student Practice & Speaking Area */}
              <div className="bg-emerald-50/70 p-5 rounded-2xl border-2 border-emerald-300 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-emerald-950 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-700" />
                    <span>Your Turn to Speak ({currentScenario.roles.user})</span>
                  </span>
                  <span className="text-[11px] text-emerald-800 font-bold">
                    Urdu Hint: {currentScenario.exchanges[currentExchangeIndex].urduHint}
                  </span>
                </div>

                {/* Recommended Response */}
                <div className="bg-white p-3.5 rounded-xl border border-emerald-200 space-y-1">
                  <span className="text-[10px] font-black uppercase text-slate-500">
                    Recommended Natural Response:
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">
                    "{currentScenario.exchanges[currentExchangeIndex].recommendedUserResponse}"
                  </p>
                  <button
                    onClick={() =>
                      handleSpeak(
                        currentScenario.exchanges[currentExchangeIndex].recommendedUserResponse
                      )
                    }
                    className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1 pt-1"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>Listen how to say this</span>
                  </button>
                </div>

                {/* Speech Input Box */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-bold text-slate-700">
                      Speak into your microphone or type your response:
                    </label>
                    {micSupported && (
                      <button
                        onClick={handleToggleMic}
                        className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isRecording
                            ? 'bg-rose-600 text-white animate-pulse shadow-md'
                            : 'bg-emerald-700 text-white hover:bg-emerald-600'
                        }`}
                      >
                        {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        <span>{isRecording ? 'Listening... (Speak Now)' : 'Click to Speak'}</span>
                      </button>
                    )}
                  </div>

                  <div className="relative">
                    <textarea
                      rows={3}
                      value={userSpokenText}
                      onChange={(e) => setUserSpokenText(e.target.value)}
                      placeholder={
                        micSupported
                          ? 'Click the microphone button and speak, or type your answer here...'
                          : 'Type your sentence here to test with Instructor Nusrat...'
                      }
                      className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => handleAskAiCoach(userSpokenText)}
                      disabled={isAiLoading || !userSpokenText.trim()}
                      className="min-h-[40px] bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{isAiLoading ? 'Analyzing...' : 'Analyze My Sentence with AI'}</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (currentExchangeIndex > 0) {
                            setCurrentExchangeIndex((prev) => prev - 1);
                            setUserSpokenText('');
                          }
                        }}
                        disabled={currentExchangeIndex === 0}
                        className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40"
                      >
                        Previous Exchange
                      </button>

                      <button
                        onClick={() => {
                          if (currentExchangeIndex < currentScenario.exchanges.length - 1) {
                            setCurrentExchangeIndex((prev) => prev + 1);
                            setUserSpokenText('');
                          } else {
                            alert('Congratulations! You completed this full dialogue scenario!');
                          }
                        }}
                        className="min-h-[40px] bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <span>
                          {currentExchangeIndex < currentScenario.exchanges.length - 1
                            ? 'Next Exchange'
                            : 'Finish Scenario'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Dedicated AI English Coach & Grammar Corrector */}
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-700 shadow-xl space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Instructor Nusrat Waqar’s AI Language Coach</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Live Spoken Sentence & Grammar Analyzer
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200">
                Type or speak any English sentence you are unsure about. Receive instant grammar scores, native-speaker polishing, and detailed feedback.
              </p>
            </div>

            <div className="space-y-3">
              <textarea
                rows={3}
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                placeholder="Example: 'I didn't went to university yesterday because myself was feeling sick...'"
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span>Quick practice tests:</span>
                  <button
                    onClick={() => setAiInputText("I didn't went to the university yesterday.")}
                    className="text-amber-300 hover:underline"
                  >
                    "didn't went" test
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setAiInputText("Myself Ali, I am having two brothers.")}
                    className="text-amber-300 hover:underline"
                  >
                    "Myself Ali" test
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setAiInputText("What is your good name and where you live?")}
                    className="text-amber-300 hover:underline"
                  >
                    "good name" test
                  </button>
                </div>

                <button
                  onClick={() => handleAskAiCoach()}
                  disabled={isAiLoading || !aiInputText.trim()}
                  className="min-h-[44px] bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all border border-amber-500"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>{isAiLoading ? 'Analyzing Sentence...' : 'Check My English'}</span>
                </button>
              </div>
            </div>

            {/* AI Coach Feedback Display */}
            {aiCoachResult && (
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 space-y-5 animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-extrabold flex flex-col items-center justify-center text-sm shadow-md">
                      <span>{aiCoachResult.grammarScore}</span>
                      <span className="text-[9px] uppercase opacity-80">Score</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-serif">
                        Grammar & Fluency Evaluation
                      </h4>
                      <p className="text-xs text-emerald-300">
                        Target Level: {aiCoachResult.level || 'Intermediate'}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSpeak(aiCoachResult.correctedSentence)}
                    className="min-h-[36px] bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-600"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                    <span>Listen Corrected Audio</span>
                  </button>
                </div>

                {/* Corrected Polish */}
                <div className="bg-emerald-950/80 border border-emerald-600 p-4 rounded-xl space-y-1">
                  <span className="text-[10px] font-black uppercase text-amber-300">
                    Recommended Polished Version:
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white">
                    "{aiCoachResult.correctedSentence}"
                  </p>
                </div>

                {/* Identified Mistakes */}
                {aiCoachResult.mistakes && aiCoachResult.mistakes.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-rose-400 block">
                      Grammar & Diction Corrections:
                    </span>
                    <div className="space-y-2">
                      {aiCoachResult.mistakes.map((mis: any, mIdx: number) => (
                        <div
                          key={mIdx}
                          className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-0.5"
                        >
                          <span className="font-bold text-amber-300">
                            • {mis.issue}
                          </span>
                          <p className="text-slate-300">{mis.explanation}</p>
                          <p className="text-[11px] font-mono text-emerald-400">
                            {mis.rule}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Native Alternatives */}
                {aiCoachResult.nativeAlternatives && aiCoachResult.nativeAlternatives.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-xs font-black uppercase text-slate-300 block">
                      How Native Speakers & Professionals Express This:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {aiCoachResult.nativeAlternatives.map((alt: string, aIdx: number) => (
                        <div
                          key={aIdx}
                          className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-slate-200 italic"
                        >
                          "{alt}"
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pronunciation & Coach Encouragement */}
                <div className="bg-slate-950 p-4 rounded-xl border border-amber-400/40 space-y-2 text-xs">
                  {aiCoachResult.pronunciationTips && (
                    <div>
                      <span className="font-bold text-amber-300 block">
                        Pronunciation & Stress Tip:
                      </span>
                      <p className="text-slate-300">{aiCoachResult.pronunciationTips}</p>
                    </div>
                  )}

                  <div className="border-t border-slate-800 pt-2">
                    <span className="font-bold text-emerald-300 block">
                      Message from Instructor Nusrat Waqar:
                    </span>
                    <p className="text-slate-200 italic leading-relaxed">
                      "{aiCoachResult.instructorEncouragement}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= TAB 5: FLUENCY & GRAMMAR QUIZ ================= */}
      {activeTab === 'quiz' && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6 max-w-4xl mx-auto">
          {!isQuizCompleted ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">
                    Spoken English & Grammar Self-Assessment
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-950 mt-1">
                    Question {currentQuizIndex + 1} of {SPOKEN_ENGLISH_QUIZ.length}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-600">
                    Current Score: <strong className="text-emerald-700">{quizScore}</strong> / {currentQuizIndex}
                  </span>
                </div>
              </div>

              {/* Question Box */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                  Scenario: {currentQuiz.context}
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-950">
                  {currentQuiz.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuiz.options.map((opt, oIdx) => {
                  const isSelected = selectedQuizOption === oIdx;
                  let optionStyles = 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400';

                  if (isQuizAnswerSubmitted) {
                    if (oIdx === currentQuiz.correctAnswerIndex) {
                      optionStyles = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      optionStyles = 'bg-rose-50 border-rose-500 text-rose-950 line-through';
                    } else {
                      optionStyles = 'bg-slate-50 border-slate-200 text-slate-400';
                    }
                  } else if (isSelected) {
                    optionStyles = 'bg-emerald-800 text-white border-emerald-800 font-bold';
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isQuizAnswerSubmitted}
                      onClick={() => setSelectedQuizOption(oIdx)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-center justify-between gap-3 ${optionStyles}`}
                    >
                      <span>{opt}</span>
                      {isQuizAnswerSubmitted && oIdx === currentQuiz.correctAnswerIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation upon submission */}
              {isQuizAnswerSubmitted && (
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2 animate-in fade-in duration-150">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-950">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Explanation & Grammar Rule</span>
                  </div>
                  <p className="text-xs text-slate-800 leading-relaxed font-medium">
                    {currentQuiz.explanation}
                  </p>
                  <p className="text-[11px] text-emerald-850 italic font-bold border-t border-emerald-200/80 pt-1.5">
                    {currentQuiz.instructorComment}
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    if (selectedQuizOption === null) return;
                    setIsQuizAnswerSubmitted(true);
                    if (selectedQuizOption === currentQuiz.correctAnswerIndex) {
                      setQuizScore((prev) => prev + 1);
                    }
                  }}
                  disabled={selectedQuizOption === null || isQuizAnswerSubmitted}
                  className="min-h-[44px] bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm transition-colors"
                >
                  Submit Answer
                </button>

                {isQuizAnswerSubmitted && (
                  <button
                    onClick={() => {
                      if (currentQuizIndex < SPOKEN_ENGLISH_QUIZ.length - 1) {
                        setCurrentQuizIndex((prev) => prev + 1);
                        setSelectedQuizOption(null);
                        setIsQuizAnswerSubmitted(false);
                      } else {
                        setIsQuizCompleted(true);
                      }
                    }}
                    className="min-h-[44px] bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-6 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                  >
                    <span>
                      {currentQuizIndex < SPOKEN_ENGLISH_QUIZ.length - 1
                        ? 'Next Question'
                        : 'View Final Result'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-amber-400 text-slate-950 mx-auto flex items-center justify-center font-bold shadow-xl">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold font-serif text-slate-950">
                  Quiz Completed!
                </h3>
                <p className="text-sm text-slate-600">
                  You scored <strong>{quizScore}</strong> out of{' '}
                  <strong>{SPOKEN_ENGLISH_QUIZ.length}</strong> questions correctly.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-emerald-50 p-5 rounded-2xl border border-emerald-200 text-xs text-slate-800 space-y-2">
                <span className="font-extrabold text-emerald-950 block text-sm">
                  Instructor Nusrat Waqar’s Feedback:
                </span>
                <p className="leading-relaxed">
                  {quizScore >= 7
                    ? 'Outstanding! Your grasp of spoken grammar rules and situational etiquette is commendable. Keep practicing out loud daily!'
                    : quizScore >= 4
                    ? 'Good effort! You understand the foundations well. Review the "Grammar Rules" and "Common Blunders" sections to achieve complete mastery.'
                    : 'A good start. Don’t be discouraged! Re-read Lesson 1 and Lesson 2 and practice the dialogues line by line.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    setCurrentQuizIndex(0);
                    setSelectedQuizOption(null);
                    setIsQuizAnswerSubmitted(false);
                    setQuizScore(0);
                    setIsQuizCompleted(false);
                  }}
                  className="min-h-[44px] bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Discuss Result with Instructor Nusrat</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bottom Help Desk & Support Callout */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-700 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="text-amber-400 text-xs font-black uppercase tracking-wider">
            Personal Language Mentorship • Educare Help Desk
          </span>
          <h3 className="text-xl sm:text-2xl font-bold font-serif">
            Need One-on-One English Speaking or Interview Coaching?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl leading-relaxed">
            Reach out to <strong>{INSTRUCTOR_PROFILE.name}</strong> and the Educare Help Desk team at <strong>{HELPDESK_PHONE}</strong> for personalized interview preparation, AIOU thesis defense coaching, and communication advice.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="min-h-[46px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors border border-amber-500"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Call: {HELPDESK_PHONE}</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[46px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors border border-emerald-400"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>WhatsApp Helpline</span>
          </a>
        </div>
      </section>
    </div>
  );
};
