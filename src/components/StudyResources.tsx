import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Clock,
  BookOpen,
  CheckCircle2,
  Award,
  Brain,
  Calendar,
  Printer,
  Copy,
  Check,
  Phone,
  MessageCircle,
  RefreshCw,
  Target,
  Play,
  Pause,
  RotateCcw,
  FileText,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Send,
  Sliders,
  ChevronRight,
  BookMarked,
  CheckSquare,
  Square
} from 'lucide-react';
import { ProgramLevel } from '../types';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { StudySchedule30Day } from './StudySchedule30Day';
import {
  AIOU_EXAM_TIPS,
  TIME_MANAGEMENT_PROFILES,
  PROGRAM_EXAM_GUIDES,
  REVISION_COUNTDOWN_CHECKLIST,
  ExamTipItem,
  TimeStrategyProfile,
  ProgramExamGuide
} from '../data/studyResourcesData';

interface StudyResourcesProps {
  onSelectProgramForAi?: (level: ProgramLevel, code?: string) => void;
  onOpenInquiry?: (level?: ProgramLevel, code?: string) => void;
}

export const StudyResources: React.FC<StudyResourcesProps> = ({
  onSelectProgramForAi,
  onOpenInquiry
}) => {
  // Main sub-tabs
  const [activeSection, setActiveSection] = useState<
    'ai-tips' | 'time-management' | 'ai-planner' | 'study-tools' | 'program-blueprints' | 'exam-checklist'
  >('ai-tips');

  // Filter for Exam Tips
  const [selectedTipCategory, setSelectedTipCategory] = useState<string>('All');
  const [expandedTipId, setExpandedTipId] = useState<string | null>('tip-1');

  // Selected Program Guide
  const [selectedProgramLevel, setSelectedProgramLevel] = useState<ProgramLevel>('B.Ed');

  // AI Study Plan Generator Form State
  const [planLevel, setPlanLevel] = useState<ProgramLevel>('B.Ed');
  const [planCourseCode, setPlanCourseCode] = useState<string>('8601');
  const [planDaysRemaining, setPlanDaysRemaining] = useState<number>(30);
  const [planDailyHours, setPlanDailyHours] = useState<number>(3);
  const [planStudentType, setPlanStudentType] = useState<string>('Working Professional (Job Holder)');
  const [planPace, setPlanPace] = useState<string>('Balanced Comprehensive Prep (A-Grade Aim)');
  const [isGeneratingPlan, setIsGeneratingPlan] = useState<boolean>(false);
  const [generatedPlan, setGeneratedPlan] = useState<string | null>(null);
  const [planCopied, setPlanCopied] = useState<boolean>(false);
  const [planError, setPlanError] = useState<string | null>(null);

  // Interactive Time Calculator State
  const [calcSubjects, setCalcSubjects] = useState<number>(4);
  const [calcDailyHours, setCalcDailyHours] = useState<number>(2);
  const [calcDaysToExam, setCalcDaysToExam] = useState<number>(45);

  // Interactive Pomodoro Timer State
  const [pomodoroMode, setPomodoroMode] = useState<'work' | 'shortBreak' | 'longBreak'>('work');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [completedSessions, setCompletedSessions] = useState<number>(0);
  const timerRef = useRef<any>(null);

  // Checkable Checklist State
  const [completedChecklist, setCompletedChecklist] = useState<Record<number, boolean>>({
    0: true,
    1: true
  });

  const toggleChecklist = (index: number) => {
    setCompletedChecklist((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Pomodoro Timer Effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            if (pomodoroMode === 'work') {
              setCompletedSessions((s) => s + 1);
              setPomodoroMode('shortBreak');
              return 5 * 60;
            } else {
              setPomodoroMode('work');
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isTimerRunning, pomodoroMode]);

  const switchPomodoroMode = (mode: 'work' | 'shortBreak' | 'longBreak') => {
    setIsTimerRunning(false);
    setPomodoroMode(mode);
    if (mode === 'work') setTimeLeft(25 * 60);
    if (mode === 'shortBreak') setTimeLeft(5 * 60);
    if (mode === 'longBreak') setTimeLeft(15 * 60);
  };

  const resetPomodoro = () => {
    setIsTimerRunning(false);
    if (pomodoroMode === 'work') setTimeLeft(25 * 60);
    if (pomodoroMode === 'shortBreak') setTimeLeft(5 * 60);
    if (pomodoroMode === 'longBreak') setTimeLeft(15 * 60);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // AI Plan Generation
  const handleGeneratePlan = async () => {
    setIsGeneratingPlan(true);
    setPlanError(null);
    setGeneratedPlan(null);

    try {
      const res = await fetch('/api/ai/study-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programLevel: planLevel,
          courseCode: planCourseCode,
          daysRemaining: planDaysRemaining,
          dailyHours: planDailyHours,
          studentType: planStudentType,
          studyPace: planPace
        })
      });

      const data = await res.json();
      if (data?.plan) {
        setGeneratedPlan(data.plan);
      } else {
        setPlanError(data?.error || 'Failed to generate study plan. Please try again.');
      }
    } catch (err: any) {
      setPlanError('Network error while connecting to AI counselor. Please retry or contact helpline 03451291610.');
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const copyPlanToClipboard = () => {
    if (!generatedPlan) return;
    navigator.clipboard.writeText(generatedPlan);
    setPlanCopied(true);
    setTimeout(() => setPlanCopied(false), 2000);
  };

  const printPlan = () => {
    window.print();
  };

  const tipCategories = ['All', 'Paper Presentation', 'Unit Strategy', 'Memory & Recall', 'Urdu Medium', 'LMS & Workshops'];

  const filteredTips = selectedTipCategory === 'All'
    ? AIOU_EXAM_TIPS
    : AIOU_EXAM_TIPS.filter((t) => t.category === selectedTipCategory);

  // Time Calculator Derived Metrics
  const totalAvailableHours = calcDailyHours * calcDaysToExam;
  const hoursPerSubject = Math.round(totalAvailableHours / Math.max(calcSubjects, 1));
  const unitsPerSubject = 9; // AIOU standard 9 units per course
  const totalUnits = calcSubjects * unitsPerSubject;
  const hoursPerUnit = (totalAvailableHours / Math.max(totalUnits, 1)).toFixed(1);
  const readinessRating = Number(hoursPerUnit) >= 3.0
    ? { text: 'Optimal Preparation Window', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' }
    : Number(hoursPerUnit) >= 1.5
    ? { text: 'Moderate Time Window (High Focus Required)', color: 'text-amber-800 bg-amber-100 border-amber-300' }
    : { text: 'Critical Cramming Window (Focus on High-Yield Units)', color: 'text-rose-800 bg-rose-100 border-rose-300' };

  const whatsappInquiryUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
    `Hello Educare Help Desk (03451291610), I need study resources, solved assignment PDFs, and exam prep guide for ${selectedProgramLevel}.`
  )}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with High Contrast */}
      <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-700 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border border-amber-500">
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>AI-Curated Academic Study Resources 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
              AIOU Exam Preparation & Time Management Hub
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed">
              Master Allama Iqbal Open University examinations with AI-formulated study frameworks, distance learning schedules, 20-mark paper presentation strategies, and personalized study planners tailored for Matric, FA, BA, BS, B.Ed, and Master students.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all border border-amber-500"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Academic Helpline: {HELPDESK_PHONE}</span>
            </a>
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all border border-emerald-400"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Request Past Papers & Notes</span>
            </a>
          </div>
        </div>

        {/* Quick Value Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-emerald-100 font-bold">
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-emerald-800">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>20-Mark Paper Formula</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-emerald-800">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Working Professional Schedules</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-emerald-800">
            <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>AI Custom Roadmap Engine</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-emerald-800">
            <Brain className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>80/20 High-Yield Units</span>
          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b-2 border-slate-200 scrollbar-none">
        <button
          onClick={() => setActiveSection('ai-tips')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap border ${
            activeSection === 'ai-tips'
              ? 'bg-emerald-800 text-white border-emerald-950 shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>AI Exam Prep Strategies</span>
        </button>

        <button
          onClick={() => setActiveSection('time-management')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap border ${
            activeSection === 'time-management'
              ? 'bg-emerald-800 text-white border-emerald-950 shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          <span>Time Management Routines</span>
        </button>

        <button
          onClick={() => setActiveSection('ai-planner')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap border ${
            activeSection === 'ai-planner'
              ? 'bg-purple-800 text-white border-purple-950 shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span>AI Personalized Study Planner</span>
        </button>

        <button
          onClick={() => setActiveSection('study-tools')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap border ${
            activeSection === 'study-tools'
              ? 'bg-indigo-800 text-white border-indigo-950 shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Sliders className="w-4 h-4 text-indigo-400" />
          <span>Interactive Study Tools & Pomodoro</span>
        </button>

        <button
          onClick={() => setActiveSection('program-blueprints')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap border ${
            activeSection === 'program-blueprints'
              ? 'bg-teal-800 text-white border-teal-950 shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <GraduationCap className="w-4 h-4 text-teal-300" />
          <span>Program Exam Blueprints</span>
        </button>

        <button
          onClick={() => setActiveSection('exam-checklist')}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-extrabold text-xs sm:text-sm transition-all whitespace-nowrap border ${
            activeSection === 'exam-checklist'
              ? 'bg-rose-800 text-white border-rose-950 shadow-sm'
              : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 text-rose-300" />
          <span>30-Day Revision Checklist</span>
        </button>
      </div>

      {/* SECTION 1: AI EXAM PREP STRATEGIES */}
      {activeSection === 'ai-tips' && (
        <div className="space-y-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 mr-2">Filter Strategy:</span>
            {tipCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedTipCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedTipCategory === cat
                    ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTips.map((tip: ExamTipItem) => {
              const isExpanded = expandedTipId === tip.id;
              return (
                <div
                  key={tip.id}
                  className={`bg-white rounded-2xl border-2 transition-all p-5 sm:p-6 flex flex-col justify-between ${
                    isExpanded ? 'border-emerald-600 shadow-md ring-1 ring-emerald-500/20' : 'border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="bg-emerald-100 text-emerald-900 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-300">
                        {tip.category}
                      </span>
                      {tip.badge && (
                        <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-300">
                          {tip.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-serif leading-snug">
                      {tip.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {tip.summary}
                    </p>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 space-y-2.5">
                        <h4 className="text-xs font-black uppercase text-emerald-900 tracking-wider">
                          Key Action Points for AIOU Papers:
                        </h4>
                        <ul className="space-y-1.5">
                          {tip.details.map((detail, idx) => (
                            <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-xl mt-3">
                          <p className="text-xs text-amber-900 font-bold">
                            💡 Pro Takeaway: {tip.keyTakeaway}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => setExpandedTipId(isExpanded ? null : tip.id)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                    >
                      <span>{isExpanded ? 'Collapse Details' : 'Read Full Strategy & Guidelines'}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                    </button>

                    <a
                      href={`tel:${HELPDESK_PHONE}`}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
                      title="Ask Academic Counselor"
                    >
                      <Phone className="w-3 h-3 text-emerald-600" />
                      <span>03451291610</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Paper Presentation Blueprint Banner */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border-2 border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <h3 className="text-base sm:text-lg font-bold font-serif text-amber-300 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-400" />
                <span>The 35-Minute / 4-Page Time Allocation Formula</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In AIOU 3-hour examination papers (180 mins total): spend 5 minutes reading the paper, strictly 35 minutes per question across 5 questions (175 mins total), and 5 minutes final proofreading of roll number and sheets.
              </p>
            </div>
            <button
              onClick={() => setActiveSection('ai-planner')}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm shrink-0 transition-all"
            >
              Generate AI Schedule
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: TIME MANAGEMENT STRATEGIES */}
      {activeSection === 'time-management' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-2">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Distance Learning Study Routines by Student Profile
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Unlike traditional campus universities, AIOU requires dedicated self-paced discipline. Select the profile that best matches your lifestyle to review structured daily study schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {TIME_MANAGEMENT_PROFILES.map((profile: TimeStrategyProfile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl border-2 border-slate-200 hover:border-emerald-600 transition-all p-5 sm:p-6 flex flex-col justify-between shadow-xs space-y-5"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="bg-indigo-100 text-indigo-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-indigo-200">
                      {profile.dailyCommitment}
                    </span>
                    <h3 className="text-lg font-bold font-serif text-slate-900 pt-1">
                      {profile.profileName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Target: {profile.targetAudience}
                    </p>
                  </div>

                  {/* Schedule Timeline */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Recommended Daily Routine:</span>
                    </h4>
                    <div className="space-y-2">
                      {profile.scheduleRoutine.map((routine, idx) => (
                        <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs space-y-0.5">
                          <div className="font-bold text-emerald-950 flex items-center justify-between">
                            <span>{routine.timeSlot}</span>
                            <span className="text-[10px] text-slate-500 font-semibold">{routine.activity}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-tight">
                            {routine.focus}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Productivity Tips */}
                  <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/80 space-y-1.5">
                    <h4 className="text-[11px] font-black uppercase text-emerald-900 tracking-wider">
                      Productivity Hacks:
                    </h4>
                    <ul className="space-y-1">
                      {profile.productivityTips.map((tip, idx) => (
                        <li key={idx} className="text-[11px] text-emerald-950 flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setPlanStudentType(profile.profileName);
                    setActiveSection('ai-planner');
                  }}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Generate Customized Roadmap</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: AI PERSONALIZED 30-DAY STUDY PLANNER & SCHEDULE */}
      {activeSection === 'ai-planner' && (
        <StudySchedule30Day
          initialLevel={selectedProgramLevel}
          initialCode="8601"
          onOpenInquiry={onOpenInquiry}
        />
      )}

      {/* SECTION 4: INTERACTIVE STUDY TOOLS & POMODORO */}
      {activeSection === 'study-tools' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tool 1: Distance Learning Pomodoro Focus Timer */}
          <div className="bg-white rounded-3xl p-6 border-2 border-indigo-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-indigo-100 text-indigo-900 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-indigo-200">
                  Focus Booster
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Sessions Completed: <strong className="text-indigo-900">{completedSessions}</strong>
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                AIOU 25/5 Pomodoro Study Timer
              </h3>
              <p className="text-xs text-slate-600">
                Distance learning requires uninterrupted bursts of concentration. Use 25 minutes of textbook reading followed by 5 minutes of mental rest.
              </p>
            </div>

            {/* Mode Selector */}
            <div className="flex items-center justify-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                onClick={() => switchPomodoroMode('work')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pomodoroMode === 'work' ? 'bg-indigo-800 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Focus Session (25m)
              </button>
              <button
                onClick={() => switchPomodoroMode('shortBreak')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pomodoroMode === 'shortBreak' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Short Break (5m)
              </button>
              <button
                onClick={() => switchPomodoroMode('longBreak')}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  pomodoroMode === 'longBreak' ? 'bg-purple-800 text-white shadow-xs' : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                Long Break (15m)
              </button>
            </div>

            {/* Timer Display */}
            <div className="text-center py-6 bg-slate-950 text-white rounded-2xl border-2 border-indigo-900 space-y-2">
              <div className="text-5xl sm:text-6xl font-black font-mono tracking-widest text-amber-300">
                {formatTimer(timeLeft)}
              </div>
              <div className="text-xs font-semibold uppercase text-emerald-300 tracking-wider">
                {pomodoroMode === 'work' ? '📖 Deep Textbook Reading in Progress' : '☕ Relax, Stretch, Hydrate'}
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm shadow-md transition-all ${
                  isTimerRunning
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-indigo-700 hover:bg-indigo-800 text-white'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isTimerRunning ? 'Pause Session' : 'Start Focus Timer'}</span>
              </button>

              <button
                onClick={resetPomodoro}
                className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div className="text-[11px] text-center text-slate-500 italic">
              💡 Tip: Turn off phone notifications during the 25-minute focus window.
            </div>
          </div>

          {/* Tool 2: Interactive Study Hours & Workload Calculator */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="bg-emerald-100 text-emerald-900 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-emerald-200">
                Workload Estimator
              </span>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                AIOU Semester Workload & Readiness Calculator
              </h3>
              <p className="text-xs text-slate-600">
                Calculate total study hours per subject and determine whether your daily schedule is sufficient to master all 9 course units before exam day.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Enrolled Courses</label>
                  <input
                    type="number"
                    min={1}
                    max={8}
                    value={calcSubjects}
                    onChange={(e) => setCalcSubjects(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-bold text-center"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Daily Study (Hrs)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={calcDailyHours}
                    onChange={(e) => setCalcDailyHours(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-bold text-center"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Days to Exam</label>
                  <input
                    type="number"
                    min={5}
                    max={120}
                    value={calcDaysToExam}
                    onChange={(e) => setCalcDaysToExam(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2 text-xs font-bold text-center"
                  />
                </div>
              </div>

              {/* Calculation Results Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Total Study Bank</span>
                    <span className="text-lg font-black text-slate-900">{totalAvailableHours} Hours</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Hours Per Course</span>
                    <span className="text-lg font-black text-emerald-800">{hoursPerSubject} Hours</span>
                  </div>
                </div>

                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Time Available Per Unit (9 Units/Course)</span>
                  <span className="text-base font-black text-slate-900">{hoursPerUnit} Hours / Unit</span>
                </div>

                <div className={`p-2.5 rounded-xl border text-xs font-bold text-center ${readinessRating.color}`}>
                  Status: {readinessRating.text}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`tel:${HELPDESK_PHONE}`}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>Short on Time? Order Solved Keybooks ({HELPDESK_PHONE})</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: PROGRAM EXAM BLUEPRINTS */}
      {activeSection === 'program-blueprints' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-2">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              AIOU Program-Wise Examination Patterns & Passing Criteria
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Exam patterns, assignment weightage, and passing thresholds vary significantly between Matric, Intermediate, BS 4-Year, B.Ed, and Postgraduate programs. Select your program to review official parameters.
            </p>

            {/* Program Selection Buttons */}
            <div className="flex items-center gap-2 flex-wrap pt-3">
              {PROGRAM_EXAM_GUIDES.map((g: ProgramExamGuide) => (
                <button
                  key={g.level}
                  onClick={() => setSelectedProgramLevel(g.level)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    selectedProgramLevel === g.level
                      ? 'bg-emerald-800 text-white border-emerald-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {g.level}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Program Detailed Blueprint */}
          {(() => {
            const guide = PROGRAM_EXAM_GUIDES.find((g) => g.level === selectedProgramLevel) || PROGRAM_EXAM_GUIDES[0];
            return (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider border border-emerald-300">
                      Official Scheme
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-slate-900 pt-1">
                      {guide.level} Examination Blueprint & Guidelines
                    </h3>
                  </div>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-2xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get {guide.level} Notes on WhatsApp</span>
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs sm:text-sm">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-xs tracking-wider text-emerald-800">
                      <FileText className="w-4 h-4 text-emerald-700" />
                      <span>Paper Pattern & Question Setup</span>
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {guide.paperPattern}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-xs tracking-wider text-emerald-800">
                      <Award className="w-4 h-4 text-emerald-700" />
                      <span>Marks Distribution & Weightage</span>
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {guide.marksDistribution}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-xs tracking-wider text-emerald-800">
                      <Target className="w-4 h-4 text-emerald-700" />
                      <span>Passing Criteria & Aggregates</span>
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {guide.passingCriteria}
                    </p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 uppercase text-xs tracking-wider text-emerald-800">
                      <BookOpen className="w-4 h-4 text-emerald-700" />
                      <span>High-Yield Course Units</span>
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {guide.highYieldUnits}
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl space-y-2">
                  <h4 className="text-xs font-black uppercase text-amber-950 tracking-wider flex items-center gap-2">
                    <Brain className="w-4 h-4 text-amber-600" />
                    <span>Top Scoring Strategy for {guide.level}:</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                    {guide.topStrategy}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-amber-900 mr-1">Recommended Examiner Keywords:</span>
                    {guide.recommendedKeywords.map((kw, idx) => (
                      <span key={idx} className="bg-amber-200/80 text-amber-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* SECTION 6: 30-DAY REVISION CHECKLIST */}
      {activeSection === 'exam-checklist' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-2">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Interactive 30-Day Exam Countdown & Task Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Track your milestones leading up to final exam day. Mark tasks as completed to ensure you don't miss assignment deadlines, roll number slips, or stationery preparation.
            </p>
          </div>

          <div className="space-y-3">
            {REVISION_COUNTDOWN_CHECKLIST.map((item, idx) => {
              const isDone = !!completedChecklist[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleChecklist(idx)}
                  className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                    isDone
                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                  }`}
                >
                  <button
                    type="button"
                    className="mt-0.5 shrink-0 text-emerald-700"
                    aria-label="Toggle task"
                  >
                    {isDone ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isDone ? 'bg-emerald-200 text-emerald-900' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {item.daysOut}
                      </span>
                      <span className="text-[11px] text-slate-400 font-semibold">
                        {isDone ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isDone ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                      {item.task}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="bg-slate-900 text-white p-6 rounded-2xl border-2 border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold font-serif text-amber-300">
                Stuck on a course or missing roll number slip?
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Our Educare Help Desk team provides 24/7 student support via WhatsApp and Helpline.
              </p>
            </div>
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shrink-0 transition-all"
            >
              Call {HELPDESK_PHONE}
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
