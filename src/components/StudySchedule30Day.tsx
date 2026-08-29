import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  CheckSquare,
  Square,
  Award,
  FileText,
  Printer,
  Copy,
  Check,
  Phone,
  MessageCircle,
  RefreshCw,
  Sliders,
  ChevronRight,
  AlertCircle,
  TrendingUp,
  Target,
  GraduationCap,
  Layers,
  ArrowRight,
  BookMarked,
  Download,
  Share2,
  Eye,
  X
} from 'lucide-react';
import { ProgramLevel } from '../types';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';

interface PhaseInfo {
  phaseNumber: number;
  phaseTitle: string;
  dayRange: string;
  goal: string;
  unitsCovered: string;
  assignmentFocus: string;
  keyMilestone: string;
}

interface DailyScheduleItem {
  day: number;
  phase: number;
  unitOrTopic: string;
  title: string;
  morningTask: string;
  eveningTask: string;
  targetHours: number;
  milestoneTag: string;
  tips: string;
}

interface ScheduleData {
  meta: {
    programLevel: string;
    courseCode: string;
    daysRemaining: number;
    dailyHours: number;
    totalStudyHours: number;
    studentType: string;
    studyGoal: string;
    readinessScore: string;
    strategySummary: string;
  };
  phases: PhaseInfo[];
  dailySchedule: DailyScheduleItem[];
  paperPresentationGuide: {
    totalTimeMinutes: number;
    readingTimeMinutes: number;
    timePerQuestionMinutes: number;
    pagesPerQuestion: string;
    structure: Array<{
      section: string;
      weight: string;
      pages: string;
      tip: string;
    }>;
  };
  highYieldTips: string[];
}

interface StudySchedule30DayProps {
  initialLevel?: ProgramLevel;
  initialCode?: string;
  onOpenInquiry?: (level?: ProgramLevel, code?: string) => void;
}

export const StudySchedule30Day: React.FC<StudySchedule30DayProps> = ({
  initialLevel = 'B.Ed',
  initialCode = '8601',
  onOpenInquiry
}) => {
  // Input Configuration State
  const [programLevel, setProgramLevel] = useState<ProgramLevel>(initialLevel);
  const [courseCode, setCourseCode] = useState<string>(initialCode || '8601');
  const [remainingDays, setRemainingDays] = useState<number>(30);
  const [dailyHours, setDailyHours] = useState<number>(2.5);
  const [studentType, setStudentType] = useState<string>('Working Professional (Job Holder)');
  const [studyGoal, setStudyGoal] = useState<string>('Distinction / 80%+ Score');
  const [weakAreas, setWeakAreas] = useState<string>('');

  // Generation & Results State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<number | 'all' | 'pending'>('all');
  const [completedDays, setCompletedDays] = useState<Record<number, boolean>>({});
  const [downloadNotification, setDownloadNotification] = useState<string | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);

  // Popular Quick Course Code Presets for AIOU
  const popularCourses = [
    { code: '8601', name: 'General Methods of Teaching', level: 'B.Ed' },
    { code: '8611', name: 'Critical Thinking & Reflective', level: 'B.Ed' },
    { code: '8613', name: 'Research Project B.Ed', level: 'B.Ed' },
    { code: '1423', name: 'Compulsory English-I', level: 'BA / AD' },
    { code: '411', name: 'Islamic Studies / Pakistan Studies', level: 'BA / AD' },
    { code: '247', name: 'General Mathematics', level: 'Matric' },
    { code: '312', name: 'English-I Intermediate', level: 'FA / Intermediate' },
    { code: '5401', name: 'Educational Psychology', level: 'Master / PGD' },
    { code: '9408', name: 'Advanced Research Methods', level: 'BS (4-Year)' }
  ];

  // Load persistent progress from localStorage
  useEffect(() => {
    const storageKey = `educare_aiou_30day_progress_${courseCode}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setCompletedDays(JSON.parse(saved));
      } catch (e) {
        setCompletedDays({});
      }
    } else {
      setCompletedDays({});
    }
  }, [courseCode]);

  // Toggle Day Completion
  const toggleDayCompletion = (dayNum: number) => {
    setCompletedDays((prev) => {
      const updated = { ...prev, [dayNum]: !prev[dayNum] };
      const storageKey = `educare_aiou_30day_progress_${courseCode}`;
      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  // Reset Progress
  const resetProgress = () => {
    if (window.confirm(`Reset your 30-day checklist progress for Course ${courseCode}?`)) {
      setCompletedDays({});
      const storageKey = `educare_aiou_30day_progress_${courseCode}`;
      localStorage.removeItem(storageKey);
    }
  };

  // Handle AI Schedule Generation
  const handleGenerateSchedule = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/ai/personalized-30day-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programLevel,
          courseCode: courseCode.trim() || '8601',
          daysRemaining: remainingDays,
          dailyHours,
          studentType,
          studyGoal,
          weakAreas
        })
      });

      const responseJson = await res.json();
      if (responseJson.success && responseJson.data) {
        setScheduleData(responseJson.data);
      } else {
        setError(responseJson.error || 'Failed to generate 30-day schedule. Please try again.');
      }
    } catch (err: any) {
      setError('Connection timeout. Please check your network or contact academic helpline 03451291610.');
    } finally {
      setIsLoading(false);
    }
  };

  // Automatically generate default schedule on initial mount if none exists
  useEffect(() => {
    if (!scheduleData && !isLoading) {
      handleGenerateSchedule();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build Clean Formatted Text Content for Plain Text / TXT Export
  const generatePlainText = (): string => {
    if (!scheduleData) return '';

    const completed = scheduleData.dailySchedule.filter((d) => completedDays[d.day]).length;
    const total = scheduleData.dailySchedule.length;
    const percent = Math.round((completed / total) * 100);

    let text = `================================================================================\n`;
    text += `ALLAMA IQBAL OPEN UNIVERSITY (AIOU) - EXAM STUDY BLUEPRINT & SCHEDULE\n`;
    text += `Generated via Educare Student Help Desk | Helpline: ${HELPDESK_PHONE}\n`;
    text += `================================================================================\n\n`;

    text += `[1] ACADEMIC METADATA\n`;
    text += `--------------------------------------------------------------------------------\n`;
    text += `Program Level     : ${scheduleData.meta.programLevel}\n`;
    text += `Course Code       : ${scheduleData.meta.courseCode}\n`;
    text += `Exam Countdown    : ${scheduleData.meta.daysRemaining} Days Remaining\n`;
    text += `Daily Commitment  : ${scheduleData.meta.dailyHours} Hours / Day\n`;
    text += `Total Study Bank  : ${scheduleData.meta.totalStudyHours} Study Hours\n`;
    text += `Student Routine   : ${scheduleData.meta.studentType}\n`;
    text += `Target Score Goal : ${scheduleData.meta.studyGoal}\n`;
    text += `Readiness Score   : ${scheduleData.meta.readinessScore}\n`;
    text += `Progress Status   : ${completed} of ${total} Days Completed (${percent}%)\n`;
    text += `Date Generated    : ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}\n\n`;

    text += `STRATEGY OVERVIEW:\n`;
    text += `${scheduleData.meta.strategySummary}\n\n`;

    text += `================================================================================\n`;
    text += `[2] 4-PHASE SYLLABUS PROGRESSION ROADMAP\n`;
    text += `================================================================================\n`;
    scheduleData.phases.forEach((phase) => {
      text += `\nPhase ${phase.phaseNumber}: ${phase.phaseTitle.toUpperCase()} (${phase.dayRange})\n`;
      text += `  • Primary Goal   : ${phase.goal}\n`;
      text += `  • Units Covered  : ${phase.unitsCovered}\n`;
      text += `  • Assignment Link: ${phase.assignmentFocus}\n`;
      text += `  • Key Milestone  : ${phase.keyMilestone}\n`;
    });

    text += `\n================================================================================\n`;
    text += `[3] DAY-BY-DAY ACTION SCHEDULE & INTERACTIVE CHECKLIST\n`;
    text += `================================================================================\n`;
    scheduleData.dailySchedule.forEach((d) => {
      const statusBox = completedDays[d.day] ? '[X] COMPLETED' : '[ ] PENDING  ';
      text += `\n${statusBox} | Day ${d.day < 10 ? '0' + d.day : d.day} (${d.unitOrTopic}): ${d.title}\n`;
      text += `  • Target Study  : ${d.targetHours} Hours\n`;
      text += `  • Morning Task  : ${d.morningTask}\n`;
      text += `  • Evening Task  : ${d.eveningTask}\n`;
      text += `  • Milestone Tag : ${d.milestoneTag}\n`;
      if (d.tips) {
        text += `  • Pro Tip       : ${d.tips}\n`;
      }
    });

    text += `\n================================================================================\n`;
    text += `[4] AIOU 20-MARK PAPER PRESENTATION FORMULA (35 MINS / 4-5 PAGES)\n`;
    text += `================================================================================\n`;
    text += `Total Exam Time: 180 Minutes (3 Hours) | 5 Questions to attempt out of 8\n`;
    text += `Strict Time Per Question: 35 Minutes (35 x 5 = 175 Mins + 5 Mins Revision)\n\n`;
    scheduleData.paperPresentationGuide.structure.forEach((s, idx) => {
      text += `Part ${idx + 1}: ${s.section} [Weight: ${s.weight} Marks | Pages: ${s.pages}]\n`;
      text += `  Strategy: ${s.tip}\n\n`;
    });

    text += `================================================================================\n`;
    text += `[5] GOLDEN EXAM SCORING RULES\n`;
    text += `================================================================================\n`;
    scheduleData.highYieldTips.forEach((tip, idx) => {
      text += `${idx + 1}. ${tip}\n`;
    });

    text += `\n================================================================================\n`;
    text += `EDUCARE STUDENT SUPPORT HELPDESK\n`;
    text += `Helpline Call : ${HELPDESK_PHONE}\n`;
    text += `WhatsApp Desk : ${HELPDESK_PHONE}\n`;
    text += `Need verified solved assignments, 5-year past papers, or tutor assistance?\n`;
    text += `Contact Educare Help Desk for fast delivery across Pakistan.\n`;
    text += `================================================================================\n`;

    return text;
  };

  // Export as .TXT File Download
  const handleDownloadTxt = () => {
    if (!scheduleData) return;

    const textContent = generatePlainText();
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const sanitizedCode = scheduleData.meta.courseCode.replace(/[^a-zA-Z0-9]/g, '_');
    link.download = `AIOU_Study_Plan_${sanitizedCode}_${scheduleData.meta.daysRemaining}Days.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadNotification('Study Plan exported as Text File (.txt)!');
    setTimeout(() => setDownloadNotification(null), 3500);
  };

  // Copy Full Schedule to Clipboard
  const handleCopySchedule = () => {
    if (!scheduleData) return;
    const textContent = generatePlainText();
    navigator.clipboard.writeText(textContent);
    setCopied(true);
    setDownloadNotification('Study Plan copied to clipboard!');
    setTimeout(() => {
      setCopied(false);
      setDownloadNotification(null);
    }, 2500);
  };

  // Generate Styled HTML for Print / PDF Export
  const generatePrintableHtml = (): string => {
    if (!scheduleData) return '';

    const completed = scheduleData.dailySchedule.filter((d) => completedDays[d.day]).length;
    const total = scheduleData.dailySchedule.length;
    const percent = Math.round((completed / total) * 100);

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>AIOU Study Plan - Course ${scheduleData.meta.courseCode} (${scheduleData.meta.daysRemaining} Days)</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 12mm 14mm;
          }
          * {
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 8px;
            font-size: 11px;
            line-height: 1.45;
          }
          .header-banner {
            border: 2.5px solid #064e3b;
            border-radius: 8px;
            background: #f0fdf4;
            padding: 12px 16px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .header-title h1 {
            margin: 0;
            color: #064e3b;
            font-size: 18px;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .header-title p {
            margin: 3px 0 0;
            color: #334155;
            font-size: 11px;
          }
          .header-badge {
            background: #064e3b;
            color: #ffffff;
            padding: 6px 12px;
            border-radius: 6px;
            text-align: right;
            font-weight: bold;
            font-size: 10.5px;
          }
          .meta-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
            font-size: 10.5px;
          }
          .meta-table td {
            padding: 6px 10px;
            border: 1px solid #cbd5e1;
          }
          .meta-table .label {
            background: #f8fafc;
            font-weight: bold;
            color: #1e293b;
            width: 25%;
          }
          .meta-table .value {
            color: #0f172a;
            width: 25%;
          }
          .summary-box {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            padding: 8px 12px;
            border-radius: 6px;
            margin-bottom: 12px;
            font-size: 10.5px;
            color: #334155;
          }
          .section-heading {
            background: #0f172a;
            color: #ffffff;
            padding: 6px 10px;
            font-size: 11.5px;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-radius: 4px;
            margin: 14px 0 8px;
          }
          .phases-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 12px;
          }
          .phase-card {
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 8px;
            background: #fafafa;
            page-break-inside: avoid;
          }
          .phase-card-header {
            font-weight: 800;
            color: #064e3b;
            font-size: 11px;
            border-bottom: 1px solid #cbd5e1;
            padding-bottom: 3px;
            margin-bottom: 4px;
          }
          .phase-card p {
            margin: 2px 0;
            font-size: 9.5px;
            color: #334155;
          }
          .days-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 12px;
            font-size: 10px;
          }
          .days-table th {
            background: #064e3b;
            color: #ffffff;
            padding: 6px 8px;
            text-align: left;
            font-weight: bold;
            font-size: 10px;
          }
          .days-table td {
            padding: 6px 8px;
            border: 1px solid #cbd5e1;
            vertical-align: top;
          }
          .days-table tr:nth-child(even) {
            background: #f8fafc;
          }
          .days-table tr {
            page-break-inside: avoid;
          }
          .checkbox-square {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 1.5px solid #064e3b;
            border-radius: 2px;
            margin-right: 5px;
            vertical-align: middle;
          }
          .checkbox-done {
            background: #064e3b;
            color: #ffffff;
            text-align: center;
            font-size: 9px;
            line-height: 12px;
            font-weight: bold;
          }
          .presentation-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 12px;
          }
          .presentation-box {
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            padding: 8px;
            background: #f0fdf4;
            page-break-inside: avoid;
          }
          .presentation-box h4 {
            margin: 0 0 4px;
            font-size: 10.5px;
            color: #064e3b;
          }
          .presentation-box p {
            margin: 0;
            font-size: 9.5px;
            color: #334155;
          }
          .tips-list {
            margin: 6px 0 12px;
            padding-left: 18px;
            font-size: 10px;
            color: #1e293b;
          }
          .tips-list li {
            margin-bottom: 4px;
          }
          .footer-box {
            border-top: 1.5px solid #064e3b;
            padding-top: 8px;
            margin-top: 14px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 9.5px;
            color: #475569;
          }
          .print-controls {
            background: #0f172a;
            color: #ffffff;
            padding: 10px 16px;
            border-radius: 8px;
            margin-bottom: 12px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .print-btn {
            background: #fbbf24;
            color: #020617;
            font-weight: bold;
            border: none;
            padding: 6px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 12px;
          }
          @media print {
            .print-controls {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="print-controls">
          <span>📄 <strong>AIOU Study Plan Print Preview</strong> (Ready for A4 Paper or PDF Export)</span>
          <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
        </div>

        <div class="header-banner">
          <div class="header-title">
            <h1>Allama Iqbal Open University, Islamabad</h1>
            <p><strong>30-Day Exam Preparation Blueprint & Action Schedule</strong> • Prepared via Educare Help Desk</p>
          </div>
          <div class="header-badge">
            Course Code: ${scheduleData.meta.courseCode}<br>
            Helpline: ${HELPDESK_PHONE}
          </div>
        </div>

        <table class="meta-table">
          <tr>
            <td class="label">Program Level:</td>
            <td class="value"><strong>${scheduleData.meta.programLevel}</strong></td>
            <td class="label">Course Code:</td>
            <td class="value"><strong>${scheduleData.meta.courseCode}</strong></td>
          </tr>
          <tr>
            <td class="label">Exam Countdown:</td>
            <td class="value"><strong>${scheduleData.meta.daysRemaining} Days Remaining</strong></td>
            <td class="label">Daily Study Target:</td>
            <td class="value"><strong>${scheduleData.meta.dailyHours} Hours / Day</strong></td>
          </tr>
          <tr>
            <td class="label">Total Study Bank:</td>
            <td class="value"><strong>${scheduleData.meta.totalStudyHours} Study Hours</strong></td>
            <td class="label">Academic Target:</td>
            <td class="value"><strong>${scheduleData.meta.studyGoal}</strong></td>
          </tr>
          <tr>
            <td class="label">Student Routine:</td>
            <td class="value">${scheduleData.meta.studentType}</td>
            <td class="label">Readiness Rating:</td>
            <td class="value"><strong>${scheduleData.meta.readinessScore} (${completed}/${total} Days Done)</strong></td>
          </tr>
        </table>

        <div class="summary-box">
          <strong>Strategy Summary:</strong> ${scheduleData.meta.strategySummary}
        </div>

        <div class="section-heading">1. Four-Phase Syllabus Progression Roadmap</div>
        <div class="phases-grid">
          ${scheduleData.phases
            .map(
              (p) => `
            <div class="phase-card">
              <div class="phase-card-header">${p.phaseTitle} (${p.dayRange})</div>
              <p><strong>Goal:</strong> ${p.goal}</p>
              <p><strong>Units:</strong> ${p.unitsCovered}</p>
              <p><strong>Assignment:</strong> ${p.assignmentFocus}</p>
              <p><strong>Milestone:</strong> ${p.keyMilestone}</p>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="section-heading">2. Day-by-Day Study Action Checklist (30 Days)</div>
        <table class="days-table">
          <thead>
            <tr>
              <th style="width: 12%;">Day & Status</th>
              <th style="width: 22%;">Unit & Topic Title</th>
              <th style="width: 30%;">Morning Session (Concepts & Reading)</th>
              <th style="width: 28%;">Evening Session (Practice & Notes)</th>
              <th style="width: 8%;">Target</th>
            </tr>
          </thead>
          <tbody>
            ${scheduleData.dailySchedule
              .map((d) => {
                const isDone = completedDays[d.day];
                return `
              <tr>
                <td>
                  <span class="checkbox-square ${isDone ? 'checkbox-done' : ''}">${isDone ? '✓' : ''}</span>
                  <strong>Day ${d.day}</strong>
                </td>
                <td>
                  <strong>${d.unitOrTopic}</strong><br>
                  <span style="font-size:9px; color:#475569;">${d.title}</span>
                </td>
                <td>${d.morningTask}</td>
                <td>
                  ${d.eveningTask}
                  ${d.tips ? `<br><em style="color:#065f46; font-size:9px;">Tip: ${d.tips}</em>` : ''}
                </td>
                <td><strong>${d.targetHours}h</strong></td>
              </tr>
            `;
              })
              .join('')}
          </tbody>
        </table>

        <div class="section-heading">3. AIOU 20-Mark Paper Presentation Strategy (35 Mins / Question)</div>
        <div class="presentation-grid">
          ${scheduleData.paperPresentationGuide.structure
            .map(
              (s, i) => `
            <div class="presentation-box">
              <h4>Part ${i + 1}: ${s.section}</h4>
              <p><strong>Weight:</strong> ${s.weight} Marks | <strong>Pages:</strong> ${s.pages}</p>
              <p style="margin-top:3px;">${s.tip}</p>
            </div>
          `
            )
            .join('')}
        </div>

        <div class="section-heading">4. Golden Examination Scoring Guidelines</div>
        <ul class="tips-list">
          ${scheduleData.highYieldTips.map((tip) => `<li>${tip}</li>`).join('')}
        </ul>

        <div class="footer-box">
          <div>
            <strong>Educare Help Desk Pakistan</strong> • Academic Support, Solved Keybooks & Past Papers<br>
            Helpline: <strong>${HELPDESK_PHONE}</strong> | WhatsApp: <strong>${HELPDESK_PHONE}</strong>
          </div>
          <div style="text-align: right;">
            Student Signature: _______________________<br>
            Date: ____ / ____ / 2026
          </div>
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 300);
          };
        </script>
      </body>
      </html>
    `;
  };

  // Open Styled Print Window / Trigger Print
  const handlePrintPDF = () => {
    if (!scheduleData) return;

    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(generatePrintableHtml());
        printWindow.document.close();
        setDownloadNotification('Opened Print & PDF Export window!');
        setTimeout(() => setDownloadNotification(null), 3000);
      } else {
        // Fallback if popups blocked: trigger window.print directly
        window.print();
      }
    } catch {
      window.print();
    }
  };

  // Completion percentage
  const completedCount = scheduleData?.dailySchedule.filter((d) => completedDays[d.day]).length || 0;
  const totalDays = scheduleData?.dailySchedule.length || 30;
  const progressPercentage = Math.round((completedCount / totalDays) * 100);

  // Filtered Day Items
  const filteredDailySchedule = scheduleData?.dailySchedule.filter((item) => {
    if (selectedPhaseFilter === 'all') return true;
    if (selectedPhaseFilter === 'pending') return !completedDays[item.day];
    return item.phase === selectedPhaseFilter;
  }) || [];

  const whatsappInquiryUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
    `Hello Educare Help Desk (03451291610), I need past papers, solved notes, and tutor help for ${programLevel} (Course ${courseCode}).`
  )}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Banner */}
      <section className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-purple-600 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border border-amber-500">
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Gemini AI Academic Engine • AIOU 2026</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight leading-tight">
              Personalized 30-Day AIOU Study Schedule Generator
            </h1>
            <p className="text-purple-100/90 text-xs sm:text-sm leading-relaxed">
              Generate an intelligent, day-by-day 30-day exam preparation blueprint customized to your <strong>program level</strong>, <strong>course code</strong>, <strong>remaining exam time</strong>, and <strong>daily available study hours</strong>. Includes morning/evening task breakdowns, assignment integration, and AIOU 20-mark presentation formulas.
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
              <span>Request Solved Keybooks</span>
            </a>
          </div>
        </div>

        {/* Highlight Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-purple-100 font-bold">
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-purple-800">
            <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
            <span>30-Day Day-by-Day Cards</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-purple-800">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Morning & Evening Tasks</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-purple-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Interactive Checklists</span>
          </div>
          <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-2.5 rounded-xl border border-purple-800">
            <Award className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>35-Min / 4-Page Formula</span>
          </div>
        </div>
      </section>

      {/* Generator Configuration Panel */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-purple-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-700" />
              <span>Step 1: Set Your Program & Exam Parameters</span>
            </h2>
            <p className="text-xs text-slate-500">
              Customize the schedule to your exact semester timeline and daily routine.
            </p>
          </div>

          <div className="text-xs font-semibold text-slate-500 bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-200">
            AIOU Distance Learning Standard (9 Units per Course)
          </div>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Program Level */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
              <span>Program Level</span>
            </label>
            <select
              value={programLevel}
              onChange={(e) => setProgramLevel(e.target.value as ProgramLevel)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="Matric">Matric (9th / 10th)</option>
              <option value="FA / Intermediate">FA / Intermediate (11th / 12th / I.Com)</option>
              <option value="BA / AD">BA / Associate Degree (BA / B.Com)</option>
              <option value="BS (4-Year)">BS (4-Year Programs)</option>
              <option value="B.Ed">B.Ed (1.5, 2.5, 4-Year)</option>
              <option value="Master / PGD">Master / Postgraduate Diploma</option>
              <option value="M.Phil / MS">M.Phil / MS</option>
              <option value="Ph.D.">Ph.D.</option>
            </select>
          </div>

          {/* Course Code / Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-700" />
              <span>Course Code / Subject Title</span>
            </label>
            <input
              type="text"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              placeholder="e.g. 8601, 8611, 1423, 247, 411"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          {/* Remaining Exam Time */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-purple-700" />
                <span>Days Until Exam:</span>
              </span>
              <span className="text-purple-900 font-extrabold bg-purple-100 px-2 py-0.5 rounded-md text-xs">
                {remainingDays} Days
              </span>
            </label>
            <select
              value={remainingDays}
              onChange={(e) => setRemainingDays(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value={7}>7 Days (Emergency High-Yield Sprint)</option>
              <option value={15}>15 Days (Two-Week Intensive Sprint)</option>
              <option value={30}>30 Days (Standard 1-Month Master Schedule)</option>
              <option value={45}>45 Days (Extended Preparation Window)</option>
              <option value={60}>60 Days (Full Comprehensive Semester Prep)</option>
            </select>
          </div>

          {/* Available Daily Hours */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-700" />
                <span>Daily Available Study Time:</span>
              </span>
              <span className="text-purple-900 font-extrabold bg-purple-100 px-2 py-0.5 rounded-md text-xs">
                {dailyHours} Hours/Day
              </span>
            </label>
            <select
              value={dailyHours}
              onChange={(e) => setDailyHours(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value={1.5}>1.5 Hours / Day (Micro-Sessions for Busy Schedules)</option>
              <option value={2.5}>2.5 Hours / Day (Recommended Balanced Standard)</option>
              <option value={4.0}>4.0 Hours / Day (Intensive Fast-Track)</option>
              <option value={6.0}>6.0 Hours / Day (Full-Time Exam Bootcamp)</option>
            </select>
          </div>

          {/* Student Profile */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-purple-700" />
              <span>Student Profile & Routine</span>
            </label>
            <select
              value={studentType}
              onChange={(e) => setStudentType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="Working Professional (Job Holder)">Working Professional (Evening & Weekend Focus)</option>
              <option value="Housewife & Home Learner">Housewife & Home Learner (Afternoon Quiet Hours)</option>
              <option value="Full-Time Distance Student">Full-Time Distance Student (Morning & Night Splits)</option>
              <option value="First-Time Distance Learner">First-Time Distance Learner (Guided Assignments)</option>
            </select>
          </div>

          {/* Target Score / Goal */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-700" />
              <span>Target Academic Goal</span>
            </label>
            <select
              value={studyGoal}
              onChange={(e) => setStudyGoal(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-semibold focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="Distinction / 80%+ Score">Distinction / A-Grade (80%+ Target)</option>
              <option value="Pass Guarantee & Solved Assignments">Pass Guarantee & High Assignment Marks (65%+)</option>
              <option value="Rapid 5-Year Past Papers Sprint">Rapid 5-Year Past Papers & High-Yield Units</option>
            </select>
          </div>
        </div>

        {/* Quick Course Presets */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Popular AIOU Courses (Tap to Pre-fill):
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {popularCourses.map((c) => (
              <button
                key={c.code}
                onClick={() => {
                  setCourseCode(c.code);
                  setProgramLevel(c.level as ProgramLevel);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 border transition-all ${
                  courseCode === c.code
                    ? 'bg-purple-800 text-white border-purple-950 shadow-xs ring-1 ring-purple-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                <strong>{c.code}</strong> - {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Generation Action Button */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleGenerateSchedule}
            disabled={isLoading}
            className="w-full sm:w-auto bg-purple-700 hover:bg-purple-800 disabled:opacity-60 text-white font-extrabold py-3.5 px-8 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2.5 text-xs sm:text-sm"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                <span>Formulating 30-Day Strategy with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Generate 30-Day Personalized Schedule</span>
              </>
            )}
          </button>

          <div className="text-xs text-slate-500 text-center sm:text-right">
            Calculates <strong>{Math.round(dailyHours * remainingDays)} Total Study Hours</strong> tailored to Course {courseCode || '8601'}
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </section>

      {/* Generated Schedule Result Dashboard */}
      {scheduleData && (
        <section className="space-y-8 animate-fadeIn">
          {/* Summary Metric Stats Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-slate-800 space-y-6 shadow-md">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-purple-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {scheduleData.meta.programLevel}
                  </span>
                  <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Course Code: {scheduleData.meta.courseCode}
                  </span>
                  <span className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {scheduleData.meta.readinessScore}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-amber-300">
                  30-Day Academic Preparation Blueprint
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                  {scheduleData.meta.strategySummary}
                </p>
              </div>

              {/* Progress Box */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shrink-0 space-y-2 min-w-[240px]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-bold">Schedule Completion:</span>
                  <span className="text-amber-400 font-black">{progressPercentage}%</span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{completedCount} of {totalDays} Days Done</span>
                  {completedCount > 0 && (
                    <button
                      onClick={resetProgress}
                      className="text-rose-400 hover:text-rose-300 text-[10px] font-semibold underline"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 4 Stat Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Study Bank</span>
                <span className="text-xl sm:text-2xl font-black text-amber-300">{scheduleData.meta.totalStudyHours} Hours</span>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Daily Commitment</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-400">{scheduleData.meta.dailyHours} Hrs/Day</span>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Remaining Days</span>
                <span className="text-xl sm:text-2xl font-black text-purple-300">{scheduleData.meta.daysRemaining} Days</span>
              </div>
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Goal</span>
                <span className="text-sm sm:text-base font-black text-amber-300 pt-1 block truncate">
                  {scheduleData.meta.studyGoal}
                </span>
              </div>
            </div>

            {/* Export & Action Buttons Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDownloadTxt}
                  className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all border border-amber-500"
                  title="Download lightweight plain text file (.txt)"
                >
                  <Download className="w-3.5 h-3.5 text-slate-950" />
                  <span>Download Text (.txt)</span>
                </button>

                <button
                  onClick={handlePrintPDF}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-all border border-emerald-400"
                  title="Print formatted A4 study plan or save as PDF"
                >
                  <Printer className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Print / Save as PDF</span>
                </button>

                <button
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                  title="Preview print layout before printing"
                >
                  <Eye className="w-3.5 h-3.5 text-purple-300" />
                  <span>Print Preview</span>
                </button>

                <button
                  onClick={handleCopySchedule}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                  title="Copy full schedule markdown to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                  <span>{copied ? 'Copied!' : 'Copy Plan'}</span>
                </button>
              </div>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-700/70 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-500/50"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>Get Past Papers (03451291610)</span>
              </a>
            </div>

            {downloadNotification && (
              <div className="bg-emerald-900/90 text-emerald-200 border border-emerald-700 text-xs px-3 py-2 rounded-xl flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{downloadNotification}</span>
              </div>
            )}
          </div>

          {/* Dedicated Export & Study Organizer Hub */}
          <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-900 text-white rounded-2xl p-5 sm:p-6 border-2 border-purple-400/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-xl">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-400/30">
                <FileText className="w-3 h-3 text-amber-400" />
                <span>Offline Study & Wall Schedule Exports</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold font-serif text-white">
                Export Your Course {scheduleData.meta.courseCode} Study Blueprint
              </h3>
              <p className="text-xs text-purple-100/80 leading-relaxed">
                Save your complete schedule offline as a lightweight <strong>.txt text file</strong> or print a high-resolution <strong>A4 PDF checklist</strong> designed with checkboxes to stick on your study wall.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={handleDownloadTxt}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all border border-amber-500"
              >
                <Download className="w-4 h-4 text-slate-950" />
                <span>Download .TXT File</span>
              </button>

              <button
                onClick={handlePrintPDF}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-md transition-all border border-emerald-400"
              >
                <Printer className="w-4 h-4 text-slate-950" />
                <span>Save as PDF / Print</span>
              </button>

              <button
                onClick={() => setIsPreviewModalOpen(true)}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-white/20 transition-all"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* 4-Phase Weekly Roadmap Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-700" />
                <span>4-Phase Milestone Structure</span>
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                Syllabus Unit Progression
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {scheduleData.phases.map((phase) => (
                <div
                  key={phase.phaseNumber}
                  className="bg-white rounded-2xl border-2 border-slate-200 hover:border-purple-600 transition-all p-5 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-purple-100 text-purple-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-purple-200">
                        {phase.dayRange}
                      </span>
                      <span className="text-xs font-bold text-slate-400">Phase {phase.phaseNumber}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 font-serif leading-snug">
                      {phase.phaseTitle}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {phase.goal}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                      <div className="text-slate-700">
                        <strong>Units:</strong> {phase.unitsCovered}
                      </div>
                      <div className="text-slate-700">
                        <strong>Assignments:</strong> {phase.assignmentFocus}
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-[11px] text-amber-950 font-medium flex items-start gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Milestone:</strong> {phase.keyMilestone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Day-by-Day 30-Day Cards */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="space-y-0.5">
                <h3 className="text-lg font-bold font-serif text-slate-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-700" />
                  <span>Day-by-Day Study Plan & Interactive Checklist</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Tap checkboxes as you complete each study day. Your progress saves automatically.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
                <button
                  onClick={() => setSelectedPhaseFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedPhaseFilter === 'all'
                      ? 'bg-purple-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  All 30 Days ({totalDays})
                </button>
                <button
                  onClick={() => setSelectedPhaseFilter(1)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedPhaseFilter === 1
                      ? 'bg-purple-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Phase 1 (Days 1–7)
                </button>
                <button
                  onClick={() => setSelectedPhaseFilter(2)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedPhaseFilter === 2
                      ? 'bg-purple-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Phase 2 (Days 8–14)
                </button>
                <button
                  onClick={() => setSelectedPhaseFilter(3)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedPhaseFilter === 3
                      ? 'bg-purple-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Phase 3 (Days 15–21)
                </button>
                <button
                  onClick={() => setSelectedPhaseFilter(4)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedPhaseFilter === 4
                      ? 'bg-purple-800 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Phase 4 (Days 22–30)
                </button>
                <button
                  onClick={() => setSelectedPhaseFilter('pending')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    selectedPhaseFilter === 'pending'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Pending Only ({totalDays - completedCount})
                </button>
              </div>
            </div>

            {/* Day Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDailySchedule.map((dayItem) => {
                const isDone = completedDays[dayItem.day];
                return (
                  <div
                    key={dayItem.day}
                    className={`rounded-2xl border-2 transition-all p-5 flex flex-col justify-between space-y-4 ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-purple-300 shadow-xs'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Day Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleDayCompletion(dayItem.day)}
                            className="text-slate-400 hover:text-emerald-700 transition-colors shrink-0"
                            title={isDone ? 'Mark as Incomplete' : 'Mark as Completed'}
                          >
                            {isDone ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400" />
                            )}
                          </button>
                          <div>
                            <span
                              className={`text-xs font-black uppercase tracking-wider ${
                                isDone ? 'text-emerald-800 line-through' : 'text-purple-900'
                              }`}
                            >
                              Day {dayItem.day}
                            </span>
                            <span className="text-[11px] text-slate-400 block font-medium">
                              {dayItem.unitOrTopic}
                            </span>
                          </div>
                        </div>

                        <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-slate-200 shrink-0">
                          {dayItem.targetHours}h Target
                        </span>
                      </div>

                      {/* Day Title */}
                      <h4
                        className={`text-sm font-bold font-serif leading-snug ${
                          isDone ? 'text-slate-600 line-through' : 'text-slate-900'
                        }`}
                      >
                        {dayItem.title}
                      </h4>

                      {/* Morning Session Task */}
                      <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 space-y-1">
                        <span className="text-[10px] font-black uppercase text-amber-900 tracking-wider flex items-center gap-1">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Morning Session (Reading & Concepts):</span>
                        </span>
                        <p className="text-xs text-amber-950 leading-relaxed font-medium">
                          {dayItem.morningTask}
                        </p>
                      </div>

                      {/* Evening Session Task */}
                      <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-200/80 space-y-1">
                        <span className="text-[10px] font-black uppercase text-indigo-900 tracking-wider flex items-center gap-1">
                          <FileText className="w-3 h-3 text-indigo-600" />
                          <span>Evening Session (Practice & Recall):</span>
                        </span>
                        <p className="text-xs text-indigo-950 leading-relaxed font-medium">
                          {dayItem.eveningTask}
                        </p>
                      </div>
                    </div>

                    {/* Footer Milestone & Pro Tip */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="bg-purple-100 text-purple-900 font-bold px-2 py-0.5 rounded-md text-[10px] border border-purple-200">
                          {dayItem.milestoneTag}
                        </span>
                        <button
                          onClick={() => toggleDayCompletion(dayItem.day)}
                          className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                        >
                          <span>{isDone ? 'Completed ✓' : 'Mark Done'}</span>
                        </button>
                      </div>

                      {dayItem.tips && (
                        <p className="text-[10px] text-slate-500 italic bg-slate-50 p-2 rounded-lg border border-slate-200">
                          💡 <strong>Pro Tip:</strong> {dayItem.tips}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AIOU 20-Mark Paper Presentation Blueprint Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-300 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
                  <Award className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Exam Hall Master Formula</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  AIOU 100-Mark Paper Presentation Strategy (5 Questions × 20 Marks)
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl">
                  In AIOU 3-Hour examinations (180 minutes), speed and structural formatting dictate 80%+ distinctions. Use the exact time and page allocation breakdown below:
                </p>
              </div>

              <div className="text-right shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
                <span>Total Time: <strong>180 Minutes</strong></span>
                <span className="block text-emerald-700 font-extrabold text-sm">35 Mins / Question</span>
              </div>
            </div>

            {/* Structure Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {scheduleData.paperPresentationGuide.structure.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase text-slate-400">Part {idx + 1}</span>
                    <span className="bg-emerald-100 text-emerald-900 font-black text-[10px] px-2 py-0.5 rounded-full border border-emerald-300">
                      {item.weight} Marks
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {item.section}
                  </h4>
                  <div className="text-[11px] font-bold text-purple-700">
                    Page Allocation: {item.pages}
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    {item.tip}
                  </p>
                </div>
              ))}
            </div>

            {/* High Yield Exam Scoring Tips */}
            <div className="bg-emerald-950 text-white p-5 rounded-2xl border-2 border-emerald-800 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Golden Scoring Rules for AIOU Distance Learning Exams:</span>
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-emerald-100">
                {scheduleData.highYieldTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Academic Helpdesk Support Footer Banner */}
          <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-2 border-emerald-700 shadow-md">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-amber-300">
                Need Verified Solved Assignments, Keybooks, or Handwritten Material?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                Educare Help Desk provides certified PDF solved assignments, previous 5-year past paper booklets with step-by-step solutions, and home delivery across Pakistan for all AIOU course codes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={`tel:${HELPDESK_PHONE}`}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all border border-amber-500"
              >
                <Phone className="w-4 h-4 text-slate-950" />
                <span>Call Helpline: {HELPDESK_PHONE}</span>
              </a>
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all border border-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>WhatsApp Order Desk</span>
              </a>
            </div>
          </div>

          {/* In-App Print & PDF Document Preview Modal */}
          {isPreviewModalOpen && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-purple-400 overflow-hidden animate-fadeIn">
                {/* Modal Header Bar */}
                <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between border-b border-slate-800 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <Printer className="w-5 h-5 text-amber-400" />
                    <div>
                      <h3 className="text-sm sm:text-base font-bold font-serif text-white">
                        Study Blueprint Print & PDF Layout
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        Course {scheduleData.meta.courseCode} • {scheduleData.meta.programLevel} • {scheduleData.meta.daysRemaining} Days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadTxt}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-950" />
                      <span className="hidden sm:inline">Download</span> .TXT
                    </button>
                    <button
                      onClick={handlePrintPDF}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / PDF</span>
                    </button>
                    <button
                      onClick={() => setIsPreviewModalOpen(false)}
                      className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                      title="Close Preview"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Modal Printable Sheet Preview Body */}
                <div className="p-6 overflow-y-auto space-y-5 text-slate-900 bg-slate-50 font-sans text-xs">
                  <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-xs space-y-4">
                    {/* Official Banner Header */}
                    <div className="border-2 border-emerald-800 rounded-xl bg-emerald-50/70 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h1 className="text-base sm:text-lg font-black text-emerald-950 uppercase tracking-wide">
                          Allama Iqbal Open University, Islamabad
                        </h1>
                        <p className="text-xs text-slate-700">
                          <strong>Study Preparation Blueprint & Action Checklist</strong> • Educare Student Desk
                        </p>
                      </div>
                      <div className="bg-emerald-800 text-white px-3 py-1.5 rounded-lg text-right text-[11px] font-bold shrink-0">
                        Course Code: {scheduleData.meta.courseCode}<br />
                        Helpline: {HELPDESK_PHONE}
                      </div>
                    </div>

                    {/* Metadata Table */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Program</span>
                        <strong>{scheduleData.meta.programLevel}</strong>
                      </div>
                      <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Days Remaining</span>
                        <strong className="text-purple-700">{scheduleData.meta.daysRemaining} Days</strong>
                      </div>
                      <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Daily Target</span>
                        <strong className="text-emerald-700">{scheduleData.meta.dailyHours} Hours / Day</strong>
                      </div>
                      <div className="bg-slate-100 p-2.5 rounded-lg border border-slate-200">
                        <span className="text-[10px] text-slate-500 font-bold uppercase block">Target Goal</span>
                        <strong className="text-amber-700 truncate block">{scheduleData.meta.studyGoal}</strong>
                      </div>
                    </div>

                    {/* Strategy Overview */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs text-slate-700 leading-relaxed">
                      <strong>Strategy Overview:</strong> {scheduleData.meta.strategySummary}
                    </div>

                    {/* 4 Phases */}
                    <div className="space-y-2">
                      <h4 className="bg-slate-900 text-white px-3 py-1.5 rounded-md font-bold uppercase text-[11px] tracking-wider">
                        1. Four-Phase Syllabus Progression
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {scheduleData.phases.map((p) => (
                          <div key={p.phaseNumber} className="border border-slate-200 rounded-lg p-2.5 bg-slate-50 space-y-1">
                            <div className="font-bold text-emerald-800 text-[11px]">{p.phaseTitle} ({p.dayRange})</div>
                            <p className="text-[10px] text-slate-600"><strong>Goal:</strong> {p.goal}</p>
                            <p className="text-[10px] text-slate-600"><strong>Units:</strong> {p.unitsCovered}</p>
                            <p className="text-[10px] text-slate-600"><strong>Milestone:</strong> {p.keyMilestone}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Day Checklist Table */}
                    <div className="space-y-2">
                      <h4 className="bg-slate-900 text-white px-3 py-1.5 rounded-md font-bold uppercase text-[11px] tracking-wider">
                        2. Day-by-Day Action Checklist ({scheduleData.dailySchedule.length} Days)
                      </h4>
                      <div className="border border-slate-200 rounded-xl overflow-hidden">
                        <div className="max-h-72 overflow-y-auto">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead className="bg-emerald-800 text-white text-[11px] sticky top-0">
                              <tr>
                                <th className="p-2 border-b border-emerald-900">Day & Status</th>
                                <th className="p-2 border-b border-emerald-900">Unit / Topic</th>
                                <th className="p-2 border-b border-emerald-900">Morning Session</th>
                                <th className="p-2 border-b border-emerald-900">Evening Session</th>
                                <th className="p-2 border-b border-emerald-900">Target</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                              {scheduleData.dailySchedule.map((d) => {
                                const isDone = completedDays[d.day];
                                return (
                                  <tr key={d.day} className={isDone ? 'bg-emerald-50/60' : 'bg-white hover:bg-slate-50'}>
                                    <td className="p-2 font-bold whitespace-nowrap">
                                      <span className="inline-block w-3.5 h-3.5 border border-emerald-700 rounded-xs mr-1 text-[10px] text-center align-middle font-bold leading-3">
                                        {isDone ? '✓' : ''}
                                      </span>
                                      Day {d.day}
                                    </td>
                                    <td className="p-2">
                                      <strong>{d.unitOrTopic}</strong>
                                      <span className="block text-[10px] text-slate-500">{d.title}</span>
                                    </td>
                                    <td className="p-2 text-slate-700">{d.morningTask}</td>
                                    <td className="p-2 text-slate-700">
                                      {d.eveningTask}
                                      {d.tips && <span className="block text-[10px] text-emerald-800 italic">Tip: {d.tips}</span>}
                                    </td>
                                    <td className="p-2 font-bold">{d.targetHours}h</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>

                    {/* Paper presentation structure */}
                    <div className="space-y-2">
                      <h4 className="bg-slate-900 text-white px-3 py-1.5 rounded-md font-bold uppercase text-[11px] tracking-wider">
                        3. AIOU 20-Mark Paper Presentation Strategy (35 Mins / Question)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {scheduleData.paperPresentationGuide.structure.map((s, i) => (
                          <div key={i} className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 text-xs">
                            <strong className="text-emerald-900 block">Part {i + 1}: {s.section}</strong>
                            <span className="text-[10px] text-purple-700 font-bold block">{s.weight} Marks • {s.pages}</span>
                            <p className="text-[10px] text-slate-700 mt-1">{s.tip}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="border-t border-slate-300 pt-3 flex items-center justify-between text-[11px] text-slate-500">
                      <div>
                        <strong>Educare Help Desk Pakistan</strong> • Academic Support (Call/WhatsApp: {HELPDESK_PHONE})
                      </div>
                      <div>
                        Sign: ___________________ Date: ____/____/2026
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                  <span className="text-xs text-slate-600">
                    💡 Click <strong>Print / PDF</strong> and choose <em>"Save as PDF"</em> in your printer destination.
                  </span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleDownloadTxt}
                      className="flex-1 sm:flex-none px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 border border-amber-500 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-950" />
                      <span>Download .TXT</span>
                    </button>
                    <button
                      onClick={handlePrintPDF}
                      className="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / Save as PDF</span>
                    </button>
                    <button
                      onClick={() => setIsPreviewModalOpen(false)}
                      className="px-4 py-2 bg-slate-300 hover:bg-slate-400 text-slate-800 font-bold rounded-xl text-xs"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
};
