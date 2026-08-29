import React, { useState, useEffect } from 'react';
import { Clock, Calendar, AlertCircle, BookOpen, CheckCircle2, ChevronRight, MessageCircle, Sparkles, Download, BellRing, Target, Trophy, Lightbulb } from 'lucide-react';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import { DailyExamTips } from './DailyExamTips';

export interface ExamSession {
  id: string;
  level: string;
  sessionName: string;
  targetDateISO: string; // e.g. "2026-09-01T09:00:00"
  status: 'Upcoming' | 'Urgent' | 'Active';
  rollNumberSlipStatus: string;
  dateSheetStatus: string;
  description: string;
  keyPreparationSteps: string[];
}

export const AIOU_EXAM_SESSIONS: ExamSession[] = [
  {
    id: 'exam-matric-fa',
    level: 'Matric & FA / I.Com',
    sessionName: 'Autumn Semester Final Examination 2026',
    targetDateISO: '2026-09-05T09:00:00',
    status: 'Urgent',
    rollNumberSlipStatus: 'Uploaded on CMS Portal (Check Roll No. Slips)',
    dateSheetStatus: 'Official Notification Issued',
    description: 'Final examinations for Matric (SSC) and FA / F.Sc / I.Com programs across all Pakistan regional centers.',
    keyPreparationSteps: [
      'Download Roll Number Slip from AIOU CMS Portal (cms.aiou.edu.pk).',
      'Solve previous 5-year past papers for key subject codes.',
      'Verify exam center address on roll number slip.',
      'Ensure assignment marks are updated on CMS before exams.'
    ]
  },
  {
    id: 'exam-ba-bs-bed',
    level: 'BA / BS 4-Year / B.Ed',
    sessionName: 'Spring/Autumn Term Examinations 2026',
    targetDateISO: '2026-10-12T09:00:00',
    status: 'Upcoming',
    rollNumberSlipStatus: 'Expected 2 Weeks Before Exams',
    dateSheetStatus: 'Tentative Date Sheet Available',
    description: 'Term-end written examinations for Associate Degree (BA / B.Com), B.Ed (1.5, 2.5, 4-Yr), and BS 4-Year programs.',
    keyPreparationSteps: [
      'Submit all pending assignments to your assigned tutors on time.',
      'Review AIOU solved assignments and keybooks available on Educare Portal.',
      'Attend mandatory online LMS workshops for B.Ed & BS subjects.',
      'Keep original CNIC and Roll Number Slip printed for exam entry.'
    ]
  },
  {
    id: 'exam-ma-mphil',
    level: 'MA / M.Sc / M.Phil / PhD',
    sessionName: 'Postgraduate Final Term & Workshop Assessments',
    targetDateISO: '2026-11-15T09:00:00',
    status: 'Upcoming',
    rollNumberSlipStatus: 'Schedule Notification Pending',
    dateSheetStatus: 'Departmental Schedule',
    description: 'Final term examinations, thesis defense schedules, and face-to-face workshop presentations for Master and Research scholars.',
    keyPreparationSteps: [
      'Confirm online LMS workshop attendance and quiz completion.',
      'Submit research proposals / assignment 2 via AAGHI LMS.',
      'Verify fee submission status on CMS account.'
    ]
  },
  {
    id: 'assignment-deadline-1',
    level: 'Assignment #1 Deadline',
    sessionName: 'First Assignment Submission Cutoff Date',
    targetDateISO: '2026-08-28T23:59:59',
    status: 'Urgent',
    rollNumberSlipStatus: 'N/A (Assignment Phase)',
    dateSheetStatus: 'Official Academic Calendar',
    description: 'Final cutoff date to submit or dispatch Assignment 1 to tutors for Matric, FA, BA, B.Ed, and BS courses.',
    keyPreparationSteps: [
      'Download Educare PDF Solved Assignments if incomplete.',
      'Handwrite assignments for Matric/FA/BA or format typed PDF for BS/B.Ed.',
      'Check tutor address on CMS or upload on AAGHI LMS portal.'
    ]
  }
];

interface ExamCountdownProps {
  onNavigateTab?: (tab: string) => void;
}

export const ExamCountdown: React.FC<ExamCountdownProps> = ({ onNavigateTab }) => {
  const [selectedSessionId, setSelectedSessionId] = useState<string>(AIOU_EXAM_SESSIONS[0].id);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const currentSession = AIOU_EXAM_SESSIONS.find(s => s.id === selectedSessionId) || AIOU_EXAM_SESSIONS[0];

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetTime = new Date(currentSession.targetDateISO).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [selectedSessionId, currentSession.targetDateISO]);

  const toggleStep = (stepText: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [stepText]: !prev[stepText]
    }));
  };

  const progressPercentage = Math.round(
    (currentSession.keyPreparationSteps.filter(step => completedSteps[step]).length /
      currentSession.keyPreparationSteps.length) *
      100
  );

  return (
    <div
      className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-700 shadow-xl space-y-6"
    >
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-emerald-900/80 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full">
            <Clock className="w-3.5 h-3.5 text-slate-950 animate-pulse" />
            <span>AIOU Academic Calendar & Exam Timer</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200 flex items-center gap-2">
            <span>AIOU Official Exam Countdown Timer</span>
          </h2>
          <p className="text-emerald-100/90 text-xs sm:text-sm max-w-xl leading-relaxed">
            Track remaining days for upcoming Allama Iqbal Open University examinations, roll number slip releases, and assignment deadlines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ShareButton variant="amber" />
          <a
            href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610), I need date sheet and roll number slip guidance for: ${currentSession.sessionName}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all border border-emerald-500/60 flex items-center gap-1.5 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>Exams Helpline: {HELPDESK_PHONE}</span>
          </a>
        </div>
      </div>

      {/* Program Level Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
        <span className="text-slate-400 text-[11px] uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Target className="w-3.5 h-3.5 text-amber-400" />
          Select Session:
        </span>
        {AIOU_EXAM_SESSIONS.map((session) => (
          <button
            key={session.id}
            onClick={() => setSelectedSessionId(session.id)}
            className={`px-4 py-2 rounded-xl transition-all shrink-0 text-xs font-extrabold flex items-center gap-1.5 ${
              selectedSessionId === session.id
                ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-300'
                : 'bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            <span>{session.level}</span>
            {session.status === 'Urgent' && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            )}
          </button>
        ))}
      </div>

      {/* Main Countdown Cards */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-emerald-900/60 shadow-inner space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <span className="text-amber-400 font-extrabold text-[11px] uppercase tracking-wider block">
              {currentSession.level} • {currentSession.status} Phase
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white">
              {currentSession.sessionName}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-slate-800 text-slate-300 px-3 py-1 rounded-lg border border-slate-700 flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Target Date: {new Date(currentSession.targetDateISO).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
        </div>

        {/* Real-time Timer Digit Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-center">
          <div className="bg-gradient-to-b from-slate-800 to-slate-950 p-4 rounded-2xl border border-emerald-800/80 shadow-md">
            <span className="text-3xl sm:text-5xl font-black font-mono text-amber-400 tracking-tight block">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mt-1">
              Days Remaining
            </span>
          </div>

          <div className="bg-gradient-to-b from-slate-800 to-slate-950 p-4 rounded-2xl border border-emerald-800/80 shadow-md">
            <span className="text-3xl sm:text-5xl font-black font-mono text-emerald-300 tracking-tight block">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mt-1">
              Hours
            </span>
          </div>

          <div className="bg-gradient-to-b from-slate-800 to-slate-950 p-4 rounded-2xl border border-emerald-800/80 shadow-md">
            <span className="text-3xl sm:text-5xl font-black font-mono text-emerald-300 tracking-tight block">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mt-1">
              Minutes
            </span>
          </div>

          <div className="bg-gradient-to-b from-slate-800 to-slate-950 p-4 rounded-2xl border border-emerald-800/80 shadow-md">
            <span className="text-3xl sm:text-5xl font-black font-mono text-amber-400 tracking-tight block animate-pulse">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-widest block mt-1">
              Seconds
            </span>
          </div>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-start gap-2.5">
            <BellRing className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Roll Number Slip Status</span>
              <span className="font-extrabold text-amber-200">{currentSession.rollNumberSlipStatus}</span>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex items-start gap-2.5">
            <BookOpen className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Date Sheet Status</span>
              <span className="font-extrabold text-emerald-200">{currentSession.dateSheetStatus}</span>
            </div>
          </div>
        </div>

        {/* AI 30-Day Study Schedule CTA Banner */}
        <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 p-5 rounded-2xl border-2 border-purple-600 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-slate-950" />
              <span>AI Exam Preparation</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold font-serif text-white">
              Generate a Personalized 30-Day Study Schedule with Gemini AI
            </h4>
            <p className="text-xs text-purple-200/90 max-w-xl">
              Get a custom day-by-day revision schedule with morning/evening task splits, past paper sprints, and 35-minute paper presentation techniques tailored to {currentSession.level}.
            </p>
          </div>

          {onNavigateTab && (
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => onNavigateTab('academic-calendar')}
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all border border-emerald-500"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>View Full Academic Calendar</span>
              </button>

              <button
                onClick={() => onNavigateTab('study-resources')}
                className="bg-purple-600 hover:bg-purple-500 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all border border-purple-400"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>30-Day Study Planner</span>
              </button>
            </div>
          )}
        </div>

        {/* Interactive Preparation Checklist & Progress Bar */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-200 font-serif flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Exam Preparation Tracker ({progressPercentage}% Ready)</span>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              {currentSession.keyPreparationSteps.filter(s => completedSteps[s]).length} of {currentSession.keyPreparationSteps.length} Completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Interactive Checkbox Items */}
          <div className="space-y-2 pt-1 text-xs">
            {currentSession.keyPreparationSteps.map((step, idx) => {
              const isChecked = !!completedSteps[step];
              return (
                <button
                  key={idx}
                  onClick={() => toggleStep(step)}
                  className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-start gap-2.5 ${
                    isChecked
                      ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-100'
                      : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                  }`}
                >
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isChecked ? 'text-emerald-400 fill-emerald-400/20' : 'text-slate-600'
                    }`}
                  />
                  <span className={`leading-snug ${isChecked ? 'line-through text-slate-400' : ''}`}>
                    {step}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Exam Success Tips & Strategy Hub (Persistent Read Tracking) */}
        <DailyExamTips />
      </div>
    </div>
  );
};
