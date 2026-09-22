import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  TYPING_PASSAGES,
  GOVT_TYPING_BENCHMARKS,
  TYPING_TIPS_DATA,
  TypingPassage,
  TypingScoreRecord,
  getStoredTypingScores,
  saveTypingScore,
  clearTypingScores
} from '../data/typingTestData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import {
  Keyboard,
  Clock,
  Award,
  Zap,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  BookOpen,
  HelpCircle,
  FileText,
  Copy,
  Check,
  TrendingUp,
  Volume2,
  VolumeX,
  Sliders,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
  Phone,
  Trash2,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

interface TypingPortalProps {
  onNavigateTab?: (tab: string) => void;
}

export const TypingPortal: React.FC<TypingPortalProps> = ({ onNavigateTab }) => {
  const [activeTab, setActiveTab] = useState<'test' | 'notes' | 'benchmarks' | 'history'>('test');

  // Test Configuration
  const [selectedPassageId, setSelectedPassageId] = useState<string>(TYPING_PASSAGES[0].id);
  const [testDuration, setTestDuration] = useState<number>(60); // 60s default
  const [customText, setCustomText] = useState<string>('');
  const [isCustomPassage, setIsCustomPassage] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Active Test Engine States
  const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'finished'>('idle');
  const [userInput, setUserInput] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [currentScore, setCurrentScore] = useState<TypingScoreRecord | null>(null);
  const [scoreHistory, setScoreHistory] = useState<TypingScoreRecord[]>(getStoredTypingScores);
  const [copiedResult, setCopiedResult] = useState<boolean>(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Active Passage Text
  const currentPassage = useMemo<TypingPassage>(() => {
    if (isCustomPassage && customText.trim().length > 10) {
      return {
        id: 'custom-user',
        title: 'Custom User Passage',
        category: 'Daily Drills',
        difficulty: 'Intermediate',
        targetWpm: 35,
        description: 'Custom paragraph entered by student.',
        text: customText.trim()
      };
    }
    const found = TYPING_PASSAGES.find((p) => p.id === selectedPassageId);
    return found || TYPING_PASSAGES[0];
  }, [selectedPassageId, isCustomPassage, customText]);

  // Audio Click Feedback via Web Audio API
  const playClickSound = (isError: boolean) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isError ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(isError ? 180 : 600, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio playback safely ignored if blocked by browser policy
    }
  };

  // Timer Lifecycle
  useEffect(() => {
    if (testStatus === 'running') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testStatus]);

  // Finish Test Calculation
  const finishTest = () => {
    setTestStatus('finished');
    if (timerRef.current) clearInterval(timerRef.current);

    const actualDurationSeconds = testDuration - timeLeft || testDuration;
    const timeInMinutes = actualDurationSeconds / 60 || 0.01;

    const targetText = currentPassage.text;
    let correctChars = 0;
    let errors = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === targetText[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }

    // Standard PPSC 5-Stroke Gross WPM: (Total Keystrokes / 5) / TimeInMinutes
    const grossWpm = Math.round((userInput.length / 5) / timeInMinutes);

    // Standard Net WPM Formula: Gross WPM - (Errors / TimeInMinutes)
    const errorPenalty = Math.round(errors / timeInMinutes);
    const netWpm = Math.max(0, Math.round(grossWpm - errorPenalty));

    // Accuracy %
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

    // Qualification Status
    let qual = 'Needs Improvement (< 25 WPM)';
    if (netWpm >= 45 && accuracy >= 95) {
      qual = 'High Court / Computer Operator Qualified (45+ WPM)';
    } else if (netWpm >= 40 && accuracy >= 90) {
      qual = 'Data Entry Operator & PLRA Qualified (40+ WPM)';
    } else if (netWpm >= 25 && accuracy >= 90) {
      qual = 'PPSC Junior Clerk BS-11 Qualified (25-30 WPM)';
    }

    const newRecord: TypingScoreRecord = {
      id: `score-${Date.now()}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      durationSeconds: actualDurationSeconds,
      grossWpm,
      netWpm,
      accuracy,
      totalKeystrokes: userInput.length,
      correctCharacters: correctChars,
      errorCount: errors,
      passageTitle: currentPassage.title,
      passageCategory: currentPassage.category,
      qualificationStatus: qual
    };

    setCurrentScore(newRecord);
    const updated = saveTypingScore(newRecord);
    setScoreHistory(updated);
  };

  // Start or Handle Input Change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;

    if (testStatus === 'idle' && val.length > 0) {
      setTestStatus('running');
    }

    if (testStatus === 'finished') return;

    // Play click sound
    const lastCharIndex = val.length - 1;
    if (lastCharIndex >= 0 && currentPassage.text[lastCharIndex]) {
      const isError = val[lastCharIndex] !== currentPassage.text[lastCharIndex];
      playClickSound(isError);
    }

    setUserInput(val);

    // If user completed entire passage before timer expires
    if (val.length >= currentPassage.text.length) {
      finishTest();
    }
  };

  // Reset Test
  const handleResetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTestStatus('idle');
    setUserInput('');
    setTimeLeft(testDuration);
    setCurrentScore(null);
    setCopiedResult(false);
    setTimeout(() => {
      if (inputRef.current) inputRef.current.focus();
    }, 100);
  };

  // Change Duration
  const handleChangeDuration = (seconds: number) => {
    setTestDuration(seconds);
    setTimeLeft(seconds);
    handleResetTest();
  };

  // Real-time live stats while typing
  const liveStats = useMemo(() => {
    const elapsedSeconds = testDuration - timeLeft || 1;
    const timeInMinutes = elapsedSeconds / 60;

    let correctChars = 0;
    let errors = 0;

    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] === currentPassage.text[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }

    const gross = Math.round((userInput.length / 5) / timeInMinutes) || 0;
    const net = Math.max(0, Math.round(gross - (errors / timeInMinutes))) || 0;
    const acc = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 100;

    return { gross, net, acc, correctChars, errors };
  }, [userInput, currentPassage.text, testDuration, timeLeft]);

  // Copy result card
  const handleCopyScoreCard = () => {
    if (!currentScore) return;
    const text = `🎯 Educare Help Desk - Official Typing Test Result\nCandidate: Student / Job Applicant\nPassage: ${currentScore.passageTitle}\nNet Speed: ${currentScore.netWpm} WPM\nGross Speed: ${currentScore.grossWpm} WPM\nAccuracy: ${currentScore.accuracy}%\nErrors: ${currentScore.errorCount}\nDuration: ${currentScore.durationSeconds}s\nStatus: ${currentScore.qualificationStatus}\nOfficial Portal: Educare Help Desk (03451291610)`;
    navigator.clipboard.writeText(text);
    setCopiedResult(true);
    setTimeout(() => setCopiedResult(false), 2500);
  };

  // Handle clearing history
  const handleClearHistory = () => {
    clearTypingScores();
    setScoreHistory([]);
  };

  // Keyboard Layout Guide Keys
  const homeRowKeys = [
    { key: 'A', finger: 'Left Pinky', color: 'bg-rose-100 text-rose-950 border-rose-300' },
    { key: 'S', finger: 'Left Ring', color: 'bg-amber-100 text-amber-950 border-amber-300' },
    { key: 'D', finger: 'Left Middle', color: 'bg-emerald-100 text-emerald-950 border-emerald-300' },
    { key: 'F', finger: 'Left Index (Bump)', color: 'bg-blue-100 text-blue-950 border-blue-400 font-black ring-2 ring-blue-400' },
    { key: 'G', finger: 'Left Index', color: 'bg-blue-50 text-blue-900 border-blue-300' },
    { key: 'H', finger: 'Right Index', color: 'bg-indigo-50 text-indigo-900 border-indigo-300' },
    { key: 'J', finger: 'Right Index (Bump)', color: 'bg-indigo-100 text-indigo-950 border-indigo-400 font-black ring-2 ring-indigo-400' },
    { key: 'K', finger: 'Right Middle', color: 'bg-emerald-100 text-emerald-950 border-emerald-300' },
    { key: 'L', finger: 'Right Ring', color: 'bg-amber-100 text-amber-950 border-amber-300' },
    { key: ';', finger: 'Right Pinky', color: 'bg-rose-100 text-rose-950 border-rose-300' },
    { key: 'Space', finger: 'Both Thumbs', color: 'bg-teal-100 text-teal-950 border-teal-300' }
  ];

  return (
    <div id="typing-speed-portal" className="space-y-8 pb-12">
      {/* Top Banner Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 bg-emerald-950 text-white p-6 sm:p-10 shadow-xl border-2 border-emerald-700 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm">
              <Keyboard className="w-4 h-4 text-slate-950" />
              <span>PPSC, DEO & Fast Typing Speed Portal (2026)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Typing Speed Test, Notes & Professional Fast-Typing Tips
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Test your Words Per Minute (WPM) using official PPSC 5-stroke formulas. Master the touch typing Home Row technique (ASDF JKL;), explore government clerical qualification benchmarks (Junior Clerk BS-11, DEO BS-14, Computer Operator), and study high-speed tips.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <ShareButton variant="amber" />
            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                'Hello Educare Help Desk (03451291610), I need guidance for PPSC Junior Clerk / DEO typing test preparation.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-emerald-500 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Typing Test Guidance Desk</span>
            </a>
          </div>
        </div>

        {/* Navigation Switcher Tabs */}
        <div className="pt-4 border-t border-emerald-800/80 flex flex-wrap gap-2.5">
          <button
            onClick={() => setActiveTab('test')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all border ${
              activeTab === 'test'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/40'
                : 'bg-emerald-900/60 hover:bg-emerald-800 text-white border-emerald-700/80'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>Live Typing Speed Test</span>
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all border ${
              activeTab === 'notes'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/40'
                : 'bg-emerald-900/60 hover:bg-emerald-800 text-white border-emerald-700/80'
            }`}
          >
            <BookOpen className="w-4 h-4 text-amber-300" />
            <span>Typing Notes & Fast-Typing Tips</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all border ${
              activeTab === 'benchmarks'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/40'
                : 'bg-emerald-900/60 hover:bg-emerald-800 text-white border-emerald-700/80'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-300" />
            <span>Govt Job Speed Standards (PPSC / DEO)</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2 transition-all border ${
              activeTab === 'history'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/40'
                : 'bg-emerald-900/60 hover:bg-emerald-800 text-white border-emerald-700/80'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-teal-300" />
            <span>My Test Records ({scoreHistory.length})</span>
          </button>
        </div>
      </section>

      {/* ================= VIEW 1: LIVE TYPING TEST ================= */}
      {activeTab === 'test' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Controls Bar: Time Duration & Passage Select */}
          <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Duration Options */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  Select Test Duration:
                </span>
                <div className="flex items-center gap-2">
                  {[60, 120, 180, 300].map((sec) => (
                    <button
                      key={sec}
                      onClick={() => handleChangeDuration(sec)}
                      disabled={testStatus === 'running'}
                      className={`px-3.5 py-1.5 rounded-xl font-extrabold text-xs transition-all border ${
                        testDuration === sec
                          ? 'bg-slate-900 text-amber-300 border-slate-950 shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200 disabled:opacity-50'
                      }`}
                    >
                      {sec === 60 ? '1 Min' : sec === 120 ? '2 Min' : sec === 180 ? '3 Min' : '5 Min (PPSC Standard)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sound & Reset Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                    soundEnabled
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                  title="Toggle mechanical key audio clicks"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                  <span>Sound {soundEnabled ? 'ON' : 'OFF'}</span>
                </button>

                <button
                  onClick={handleResetTest}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold px-3.5 py-2.5 rounded-xl text-xs border border-slate-300 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart / New</span>
                </button>
              </div>
            </div>

            {/* Passage Selection Carousel */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                Select Exam Passage:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {TYPING_PASSAGES.map((passage) => (
                  <button
                    key={passage.id}
                    onClick={() => {
                      setSelectedPassageId(passage.id);
                      setIsCustomPassage(false);
                      handleResetTest();
                    }}
                    disabled={testStatus === 'running'}
                    className={`p-3 rounded-2xl text-left shrink-0 max-w-xs transition-all border ${
                      !isCustomPassage && selectedPassageId === passage.id
                        ? 'bg-emerald-950 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 disabled:opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold mb-1">
                      <span className={!isCustomPassage && selectedPassageId === passage.id ? 'text-amber-300' : 'text-emerald-700'}>
                        {passage.category}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-white/20 text-[9px] uppercase">
                        {passage.difficulty}
                      </span>
                    </div>
                    <div className="text-xs font-bold truncate">{passage.title}</div>
                    <div className="text-[10px] opacity-75 truncate">{passage.targetWpm} WPM Benchmark</div>
                  </button>
                ))}

                {/* Custom Passage Button */}
                <button
                  onClick={() => {
                    setIsCustomPassage(true);
                    handleResetTest();
                  }}
                  disabled={testStatus === 'running'}
                  className={`p-3 rounded-2xl text-left shrink-0 max-w-xs transition-all border ${
                    isCustomPassage
                      ? 'bg-emerald-950 text-white border-emerald-800 shadow-md ring-2 ring-emerald-400'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200 disabled:opacity-50'
                  }`}
                >
                  <div className="text-[10px] font-bold text-amber-500 mb-1">Custom Drill</div>
                  <div className="text-xs font-bold">Paste Custom Text</div>
                  <div className="text-[10px] text-slate-500">Practice your own paragraph</div>
                </button>
              </div>
            </div>

            {/* If Custom Passage is Selected */}
            {isCustomPassage && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <label className="text-xs font-bold text-amber-950 block">
                  Paste or type custom text below (minimum 50 words recommended):
                </label>
                <textarea
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    handleResetTest();
                  }}
                  placeholder="Paste your assignment question, court judgment, or custom practice passage here..."
                  className="w-full bg-white border border-amber-300 rounded-xl p-3 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* Live Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Countdown Timer */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Time Remaining</span>
                <Clock className="w-4 h-4 text-emerald-700" />
              </div>
              <div className={`text-2xl sm:text-3xl font-black font-mono ${timeLeft <= 10 && testStatus === 'running' ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
              <p className="text-[11px] text-slate-500">
                {testStatus === 'idle' ? 'Starts on first keystroke' : testStatus === 'running' ? 'Test in progress' : 'Completed'}
              </p>
            </div>

            {/* Net WPM */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Net Speed (WPM)</span>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-900">
                {liveStats.net} <span className="text-xs font-bold text-slate-500">WPM</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Gross: {liveStats.gross} WPM (PPSC 5-Stroke)
              </p>
            </div>

            {/* Accuracy */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Accuracy</span>
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
              </div>
              <div className={`text-2xl sm:text-3xl font-black font-mono ${liveStats.acc < 90 ? 'text-rose-600' : 'text-teal-900'}`}>
                {liveStats.acc}%
              </div>
              <p className="text-[11px] text-slate-500">
                Target: 95%+ for DEO/Clerk
              </p>
            </div>

            {/* Errors */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Mistakes / Errors</span>
                <AlertCircle className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-rose-700">
                {liveStats.errors}
              </div>
              <p className="text-[11px] text-slate-500">
                Typed: {userInput.length} chars
              </p>
            </div>
          </div>

          {/* Passage Reading & Interactive Character Display */}
          <div className="bg-white rounded-3xl border-2 border-slate-300 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {currentPassage.category} • Target: {currentPassage.targetWpm} WPM
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                  {currentPassage.title}
                </h3>
              </div>

              <div className="text-xs text-slate-500 font-medium hidden sm:block">
                Progress: {Math.min(100, Math.round((userInput.length / currentPassage.text.length) * 100))}%
              </div>
            </div>

            {/* Character-by-character interactive reading box */}
            <div
              className="p-5 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-sm sm:text-base leading-relaxed tracking-wide select-none max-h-56 overflow-y-auto"
              style={{ minHeight: '130px' }}
            >
              {currentPassage.text.split('').map((char, index) => {
                let charClass = 'text-slate-600';

                if (index < userInput.length) {
                  if (userInput[index] === char) {
                    charClass = 'bg-emerald-100 text-emerald-950 font-bold';
                  } else {
                    charClass = 'bg-rose-500 text-white font-black underline';
                  }
                } else if (index === userInput.length) {
                  charClass = 'bg-amber-300 text-slate-950 font-black ring-2 ring-slate-900 animate-pulse';
                }

                return (
                  <span key={index} className={`rounded-xs px-0.5 transition-colors ${charClass}`}>
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Interactive User Input Field */}
            <div className="space-y-2">
              <label htmlFor="typing-test-input-box" className="text-xs font-bold text-slate-700 flex items-center justify-between">
                <span>Type the passage above exactly as shown (Backspace allowed):</span>
                {testStatus === 'idle' && (
                  <span className="text-emerald-700 font-extrabold animate-pulse">
                    Click here & start typing to begin timer &rarr;
                  </span>
                )}
              </label>

              <textarea
                id="typing-test-input-box"
                ref={inputRef}
                value={userInput}
                onChange={handleInputChange}
                disabled={testStatus === 'finished'}
                placeholder="Click here and begin typing to immediately start the speed test..."
                className="w-full bg-slate-900 text-amber-200 font-mono text-sm sm:text-base p-4 rounded-2xl border-2 border-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/30 shadow-inner resize-none disabled:opacity-50"
                rows={3}
                autoFocus
              />
            </div>
          </div>

          {/* Result Card Modal / Panel (shown upon completion) */}
          {testStatus === 'finished' && currentScore && (
            <div className="bg-white rounded-3xl border-2 border-emerald-600 p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span>Test Completed • Official Scorecard</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
                    Your Typing Result: {currentScore.netWpm} WPM
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    {currentScore.qualificationStatus}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyScoreCard}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-950 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedResult ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-amber-300" />}
                    <span>{copiedResult ? 'Result Copied!' : 'Copy Scorecard'}</span>
                  </button>

                  <button
                    onClick={handleResetTest}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Retake Test</span>
                  </button>
                </div>
              </div>

              {/* Detailed Breakdown Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
                  <span className="text-[10px] uppercase font-black text-emerald-800 block">Net Speed</span>
                  <span className="text-3xl font-black font-mono text-emerald-950">{currentScore.netWpm}</span>
                  <span className="text-xs font-bold text-emerald-700 block">WPM</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] uppercase font-black text-slate-500 block">Gross Speed</span>
                  <span className="text-3xl font-black font-mono text-slate-900">{currentScore.grossWpm}</span>
                  <span className="text-xs font-bold text-slate-500 block">WPM</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] uppercase font-black text-slate-500 block">Accuracy</span>
                  <span className={`text-3xl font-black font-mono ${currentScore.accuracy < 90 ? 'text-rose-600' : 'text-slate-900'}`}>
                    {currentScore.accuracy}%
                  </span>
                  <span className="text-xs font-bold text-slate-500 block">Correct Ratio</span>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="text-[10px] uppercase font-black text-slate-500 block">Uncorrected Errors</span>
                  <span className="text-3xl font-black font-mono text-rose-600">{currentScore.errorCount}</span>
                  <span className="text-xs font-bold text-slate-500 block">Mistakes</span>
                </div>
              </div>

              {/* Govt Job Eligibility Status Bar */}
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-black text-amber-950 text-sm block">
                    PPSC & Government Qualification Verdict:
                  </span>
                  <p className="text-slate-800 leading-relaxed">
                    {currentScore.netWpm >= 25 && currentScore.accuracy >= 90 ? (
                      <span className="text-emerald-950 font-bold">
                        Congratulations! Your speed of {currentScore.netWpm} WPM meets the qualifying criteria for PPSC Junior Clerk (BS-11). For Data Entry Operator (BS-14) or High Court jobs, aim for 40+ WPM with 95%+ accuracy.
                      </span>
                    ) : (
                      <span className="text-amber-950 font-bold">
                        Your speed is currently below the 25-30 WPM qualifying threshold for PPSC Junior Clerk exams. Study the Home Row technique and 15-day practice tips in the &quot;Typing Notes&quot; tab to improve rapidly.
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= VIEW 2: TYPING NOTES & FAST TIPS ================= */}
      {activeTab === 'notes' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Interactive Keyboard Visual: Home Row Technique */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-300">
                <Keyboard className="w-3.5 h-3.5 text-emerald-700" />
                <span>Touch Typing Core Foundation</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                The Home Row Technique (ASDF JKL;) & Finger Allocations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                Touch typing relies on tactile muscle memory rather than eyesight. The <strong>F</strong> and <strong>J</strong> keys feature raised bumps so you can position both hands without glancing at the keyboard.
              </p>
            </div>

            {/* Interactive Visual Key Layout */}
            <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border-2 border-slate-800 text-center space-y-4">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-widest block">
                Official Home Row Finger Assignment Map
              </span>

              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-2xl mx-auto">
                {homeRowKeys.map((item) => (
                  <div
                    key={item.key}
                    className={`p-2.5 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center min-w-[50px] sm:min-w-[62px] shadow-sm transition-transform hover:scale-105 ${item.color}`}
                  >
                    <span className="text-base sm:text-xl font-black font-mono">{item.key}</span>
                    <span className="text-[9px] font-semibold text-slate-600 block truncate max-w-[55px]">
                      {item.finger}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-300 font-medium max-w-lg mx-auto leading-relaxed">
                Notice: Left Index rests on <strong className="text-amber-300 font-mono">F</strong> and Right Index rests on <strong className="text-amber-300 font-mono">J</strong>. Both thumbs control the Spacebar.
              </p>
            </div>
          </div>

          {/* 8 Golden Rules of Fast Typing */}
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span>The 8 Golden Rules to Reach 50+ WPM</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {TYPING_TIPS_DATA.map((tip, idx) => (
                <div
                  key={tip.id}
                  className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                      Rule #{idx + 1} • {tip.category}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-serif">
                    {tip.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {tip.summary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    {tip.keyPoints.map((point, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 15-Day Structured Routine Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-teal-900 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-700 shadow-md space-y-3">
            <h4 className="text-lg font-bold font-serif text-amber-300">
              15-Day Guaranteed Speed Routine (20 Minutes Daily)
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
              Consistent deliberate practice outperforms marathon typing sessions. Spend 10 minutes on accuracy drills, followed by two 5-minute timed exam passages. In 15 days, finger muscle memory will be permanently established.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setActiveTab('test')}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-sm"
              >
                Start Practice Test Now &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW 3: GOVT JOB BENCHMARKS ================= */}
      {activeTab === 'benchmarks' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-amber-300">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Official Recruitment Standards</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              Punjab & Federal Government Typing Speed Criteria (2026)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
              Review official speed requirements set by Punjab Public Service Commission (PPSC), Federal Public Service Commission (FPSC), Punjab Police, and District Judiciary for computer clerical posts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GOVT_TYPING_BENCHMARKS.map((bench, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-4 hover:border-emerald-600 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-slate-900 text-amber-300 text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md">
                      {bench.scale}
                    </span>
                    <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Min {bench.minWpm} WPM
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-serif">
                    {bench.role}
                  </h4>
                  <p className="text-xs text-slate-600 font-medium">
                    {bench.department}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 leading-relaxed">
                    {bench.notes}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Accuracy Benchmark:</span>
                  <span className="font-extrabold text-slate-900">{bench.minAccuracy}% Minimum</span>
                </div>
              </div>
            ))}
          </div>

          {/* Direct WhatsApp Consultation for PPSC Apply */}
          <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-200 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <h4 className="text-base font-bold text-emerald-950 font-serif">
                Need PPSC Junior Clerk / DEO Form Submission Assistance?
              </h4>
              <p className="text-xs text-slate-700">
                Educare Help Desk (03451291610) provides online form apply, 1Link fee challan payment, and typing syllabus guidelines.
              </p>
            </div>
            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                'Hello Educare Help Desk (03451291610), I need guidance for PPSC Junior Clerk online apply and typing test prep.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-emerald-800 transition-all shadow-xs shrink-0 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Inquire via WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* ================= VIEW 4: MY TEST HISTORY ================= */}
      {activeTab === 'history' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-teal-100 text-teal-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-teal-300">
                <TrendingUp className="w-3.5 h-3.5 text-teal-700" />
                <span>Local Performance Analytics</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                Your Typing Test Attempts & Personal Best
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Track your speed improvements across practice sessions stored in your browser.
              </p>
            </div>

            {scoreHistory.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-200 transition-all flex items-center gap-1.5 self-start sm:self-center"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {scoreHistory.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Keyboard className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">No Typing Attempts Recorded Yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Take a 1-minute or 5-minute timed test to start tracking your Net WPM and accuracy progress.
              </p>
              <button
                onClick={() => setActiveTab('test')}
                className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                Take First Typing Test &rarr;
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-serif">
                      <th className="p-3.5 sm:p-4">Date & Time</th>
                      <th className="p-3.5 sm:p-4">Passage Title</th>
                      <th className="p-3.5 sm:p-4 text-center">Net WPM</th>
                      <th className="p-3.5 sm:p-4 text-center">Gross WPM</th>
                      <th className="p-3.5 sm:p-4 text-center">Accuracy</th>
                      <th className="p-3.5 sm:p-4 text-center">Errors</th>
                      <th className="p-3.5 sm:p-4">Qualification Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {scoreHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3.5 sm:p-4 text-slate-500 whitespace-nowrap">{item.date}</td>
                        <td className="p-3.5 sm:p-4 text-slate-900 font-bold max-w-xs truncate">
                          {item.passageTitle}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center font-mono font-black text-sm text-emerald-900">
                          {item.netWpm}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center font-mono text-slate-600">
                          {item.grossWpm}
                        </td>
                        <td className="p-3.5 sm:p-4 text-center font-mono font-bold text-teal-800">
                          {item.accuracy}%
                        </td>
                        <td className="p-3.5 sm:p-4 text-center font-mono text-rose-600">
                          {item.errorCount}
                        </td>
                        <td className="p-3.5 sm:p-4 text-xs font-semibold text-slate-700">
                          {item.qualificationStatus}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
