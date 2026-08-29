import React, { useState, useMemo } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Download,
  Printer,
  Copy,
  Check,
  MessageCircle,
  Phone,
  BookOpen,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Share2,
  CalendarDays,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  Laptop,
  FileCheck2,
  Award,
  CreditCard,
  Building,
  RotateCcw
} from 'lucide-react';
import {
  AIOU_ACADEMIC_CALENDAR_EVENTS,
  CALENDAR_CATEGORIES,
  SEMESTER_CYCLES,
  AcademicCalendarEvent,
  CalendarCategory,
  SemesterCycle
} from '../data/academicCalendarData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import { ProgramLevel } from '../types';

interface AcademicCalendarProps {
  onOpenInquiry?: (level?: ProgramLevel, code?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({
  onOpenInquiry,
  onNavigateTab
}) => {
  // Filter States
  const [selectedSemester, setSelectedSemester] = useState<SemesterCycle>('All');
  const [selectedCategory, setSelectedCategory] = useState<CalendarCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active / Open' | 'Upcoming' | 'Continuous'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Toggle Single Event Card Accordion
  const toggleExpand = (id: string) => {
    setExpandedEvents((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Expand All / Collapse All
  const handleExpandAll = (expand: boolean) => {
    const newState: Record<string, boolean> = {};
    if (expand) {
      AIOU_ACADEMIC_CALENDAR_EVENTS.forEach((e) => {
        newState[e.id] = true;
      });
    }
    setExpandedEvents(newState);
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return AIOU_ACADEMIC_CALENDAR_EVENTS.filter((event) => {
      // Semester filter
      if (selectedSemester !== 'All' && event.semesterCycle !== selectedSemester) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }
      // Status filter
      if (selectedStatus !== 'All' && event.status !== selectedStatus) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesDesc = event.description.toLowerCase().includes(q);
        const matchesPhase = event.phase.toLowerCase().includes(q);
        const matchesDeadline = event.deadlineLabel.toLowerCase().includes(q);
        const matchesPrograms = event.targetPrograms.some((p) => p.toLowerCase().includes(q));
        const matchesCategory = event.category.toLowerCase().includes(q);
        return matchesTitle || matchesDesc || matchesPhase || matchesDeadline || matchesPrograms || matchesCategory;
      }
      return true;
    });
  }, [selectedSemester, selectedCategory, selectedStatus, searchQuery]);

  // Summary Metrics
  const activeCount = AIOU_ACADEMIC_CALENDAR_EVENTS.filter((e) => e.status === 'Active / Open').length;
  const upcomingCount = AIOU_ACADEMIC_CALENDAR_EVENTS.filter((e) => e.status === 'Upcoming').length;
  const continuousCount = AIOU_ACADEMIC_CALENDAR_EVENTS.filter((e) => e.status === 'Continuous').length;

  // Copy Single Event Details
  const handleCopyEvent = (event: AcademicCalendarEvent) => {
    const text = `📅 AIOU Academic Deadline: ${event.title}\n` +
      `📌 Category: ${event.category} (${event.semesterCycle})\n` +
      `⏳ Deadline: ${event.deadlineLabel}\n` +
      `🎯 Programs: ${event.targetPrograms.join(', ')}\n` +
      `ℹ️ Details: ${event.description}\n\n` +
      `📞 Need Assistance? Contact Educare Help Desk: ${HELPDESK_PHONE} (WhatsApp: 03451291610)`;

    navigator.clipboard.writeText(text);
    setCopiedId(event.id);
    setToastMessage(`Copied details for "${event.title}"`);
    setTimeout(() => {
      setCopiedId(null);
      setToastMessage(null);
    }, 2500);
  };

  // Generate Google Calendar Link
  const getGoogleCalendarUrl = (event: AcademicCalendarEvent) => {
    const title = encodeURIComponent(`AIOU Deadline: ${event.title}`);
    const details = encodeURIComponent(
      `${event.description}\n\nPrograms: ${event.targetPrograms.join(', ')}\nEducare Helpline: ${HELPDESK_PHONE}`
    );
    const location = encodeURIComponent('Allama Iqbal Open University (AIOU), Islamabad');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  // Export Plain Text Calendar
  const handleDownloadTxt = () => {
    let text = `================================================================================\n`;
    text += `ALLAMA IQBAL OPEN UNIVERSITY (AIOU) - MASTER ACADEMIC CALENDAR & DEADLINES\n`;
    text += `Facilitated via Educare Student Support Help Desk | Helpline: ${HELPDESK_PHONE}\n`;
    text += `================================================================================\n\n`;

    filteredEvents.forEach((ev, idx) => {
      text += `[${idx + 1}] ${ev.title.toUpperCase()}\n`;
      text += `--------------------------------------------------------------------------------\n`;
      text += `Semester Cycle : ${ev.semesterCycle} | Phase: ${ev.phase}\n`;
      text += `Category       : ${ev.category} | Status: ${ev.status}\n`;
      text += `Target Programs: ${ev.targetPrograms.join(', ')}\n`;
      text += `Time Window    : ${ev.startDate} to ${ev.endDate}\n`;
      text += `Key Deadline   : ${ev.deadlineLabel}\n`;
      text += `Overview       : ${ev.description}\n`;
      text += `Action Guidelines:\n`;
      ev.keyActionItems.forEach((action) => {
        text += `  • ${action}\n`;
      });
      if (ev.officialPortalUrl) {
        text += `Official Portal: ${ev.officialPortalName || 'AIOU Portal'} (${ev.officialPortalUrl})\n`;
      }
      text += `\n`;
    });

    text += `================================================================================\n`;
    text += `EDUCARE STUDENT SUPPORT DESK\n`;
    text += `Helpline Call & WhatsApp: ${HELPDESK_PHONE}\n`;
    text += `For verified solved assignments, guess papers, and fee reconciliation support.\n`;
    text += `================================================================================\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AIOU_Academic_Calendar_Deadlines_2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setToastMessage('Academic Calendar downloaded as .TXT file!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Printable A4 Layout
  const handlePrint = () => {
    try {
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        const html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>AIOU Academic Calendar & Deadlines - Educare Help Desk</title>
            <style>
              @page { size: A4 portrait; margin: 12mm 14mm; }
              body { font-family: 'Segoe UI', Arial, sans-serif; font-size: 11px; line-height: 1.45; color: #0f172a; margin: 0; padding: 8px; }
              .header { border: 2.5px solid #064e3b; border-radius: 8px; background: #f0fdf4; padding: 12px 16px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; }
              .header h1 { margin: 0; color: #064e3b; font-size: 18px; font-weight: bold; text-transform: uppercase; }
              .header p { margin: 3px 0 0; color: #334155; font-size: 11px; }
              .badge { background: #064e3b; color: #fff; padding: 6px 12px; border-radius: 6px; font-weight: bold; text-align: right; }
              .table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 10.5px; }
              .table th { background: #064e3b; color: white; padding: 7px 9px; text-align: left; }
              .table td { border: 1px solid #cbd5e1; padding: 7px 9px; vertical-align: top; }
              .table tr:nth-child(even) { background: #f8fafc; }
              .status-open { color: #065f46; font-weight: bold; }
              .status-upcoming { color: #1e40af; font-weight: bold; }
              .footer { border-top: 1.5px solid #064e3b; margin-top: 16px; padding-top: 8px; display: flex; justify-content: space-between; font-size: 9.5px; color: #475569; }
            </style>
          </head>
          <body>
            <div class="header">
              <div>
                <h1>Allama Iqbal Open University (AIOU)</h1>
                <p><strong>Master Academic Calendar, Admission & Examination Schedule</strong></p>
              </div>
              <div class="badge">
                Educare Helpline: ${HELPDESK_PHONE}<br>
                Islamabad, Pakistan
              </div>
            </div>

            <table class="table">
              <thead>
                <tr>
                  <th style="width: 25%;">Milestone / Event</th>
                  <th style="width: 15%;">Semester & Phase</th>
                  <th style="width: 22%;">Target Programs</th>
                  <th style="width: 20%;">Schedule & Deadline</th>
                  <th style="width: 18%;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${filteredEvents
                  .map(
                    (e) => `
                  <tr>
                    <td><strong>${e.title}</strong><br><span style="font-size:9px; color:#475569;">${e.category}</span></td>
                    <td>${e.semesterCycle}<br><em style="font-size:9.5px;">${e.phase}</em></td>
                    <td>${e.targetPrograms.join(', ')}</td>
                    <td><strong>${e.deadlineLabel}</strong><br><span style="font-size:9px; color:#64748b;">${e.startDate} - ${e.endDate}</span></td>
                    <td><span class="${e.status === 'Active / Open' ? 'status-open' : 'status-upcoming'}">${e.status}</span></td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>

            <div class="footer">
              <div><strong>Educare Help Desk Pakistan</strong> • Official Student Support (Call/WhatsApp: ${HELPDESK_PHONE})</div>
              <div>Printed: ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            </div>

            <script>
              window.onload = function() { window.print(); };
            </script>
          </body>
          </html>
        `;
        printWindow.document.open();
        printWindow.document.write(html);
        printWindow.document.close();
      } else {
        window.print();
      }
    } catch {
      window.print();
    }
  };

  // Helper for Category Color Theme
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Admissions':
        return {
          badgeBg: 'bg-emerald-100 text-emerald-950 border-emerald-300',
          dotBg: 'bg-emerald-600',
          borderCol: 'border-emerald-500',
          cardBg: 'bg-emerald-50/40',
          accentText: 'text-emerald-800'
        };
      case 'Assignment Deadlines':
        return {
          badgeBg: 'bg-teal-100 text-teal-950 border-teal-300',
          dotBg: 'bg-teal-600',
          borderCol: 'border-teal-500',
          cardBg: 'bg-teal-50/40',
          accentText: 'text-teal-800'
        };
      case 'Workshops & LMS':
        return {
          badgeBg: 'bg-indigo-100 text-indigo-950 border-indigo-300',
          dotBg: 'bg-indigo-600',
          borderCol: 'border-indigo-500',
          cardBg: 'bg-indigo-50/40',
          accentText: 'text-indigo-800'
        };
      case 'Exam Forms & Dates':
        return {
          badgeBg: 'bg-rose-100 text-rose-950 border-rose-300',
          dotBg: 'bg-rose-600',
          borderCol: 'border-rose-500',
          cardBg: 'bg-rose-50/40',
          accentText: 'text-rose-800'
        };
      case 'Result Declarations':
        return {
          badgeBg: 'bg-purple-100 text-purple-950 border-purple-300',
          dotBg: 'bg-purple-600',
          borderCol: 'border-purple-500',
          cardBg: 'bg-purple-50/40',
          accentText: 'text-purple-800'
        };
      default:
        return {
          badgeBg: 'bg-amber-100 text-amber-950 border-amber-300',
          dotBg: 'bg-amber-600',
          borderCol: 'border-amber-500',
          cardBg: 'bg-amber-50/40',
          accentText: 'text-amber-800'
        };
    }
  };

  // Render Icon according to Category
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'admission':
        return <GraduationCap className="w-4 h-4" />;
      case 'assignment':
        return <FileCheck2 className="w-4 h-4" />;
      case 'workshop':
        return <Laptop className="w-4 h-4" />;
      case 'exam':
        return <Clock className="w-4 h-4" />;
      case 'result':
        return <Award className="w-4 h-4" />;
      case 'fee':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-emerald-500 flex items-center gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Hero Header Banner */}
      <section className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-700/60 shadow-xl relative overflow-hidden">
        {/* Subtle Background Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 bg-emerald-800/80 border border-emerald-500/50 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-emerald-200 shadow-xs">
              <CalendarDays className="w-4 h-4 text-amber-300" />
              <span>AIOU Master Academic Schedule 2026–2027</span>
            </div>

            <div className="flex items-center gap-2">
              <ShareButton
                title="AIOU Academic Calendar & Deadlines 2026"
                text="Check key AIOU admission dates, assignment deadlines, MS Teams workshop schedules, and exam dates on Educare Help Desk."
                className="bg-slate-800/90 hover:bg-slate-700 text-xs px-3 py-1.5 rounded-xl border border-slate-700 text-slate-200"
              />
              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent('Hello Educare Desk (03451291610), I need guidance regarding AIOU academic deadlines and schedule.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors border border-emerald-400 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span className="hidden sm:inline">WhatsApp Help</span>
              </a>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-tight">
              AIOU Academic Calendar & Timeline
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Track official Allama Iqbal Open University deadlines in real time — including <strong>Phase I & Phase II admissions</strong>, <strong>assignment upload windows</strong>, <strong>Microsoft Teams workshops</strong>, <strong>roll number slip issuances</strong>, and <strong>composite result gazettes</strong>.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black shrink-0 border border-emerald-400/30">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white">{activeCount}</div>
                <div className="text-[11px] text-emerald-200/80 font-medium">Active / Open Windows</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-black shrink-0 border border-blue-400/30">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white">{upcomingCount}</div>
                <div className="text-[11px] text-emerald-200/80 font-medium">Upcoming Milestones</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-black shrink-0 border border-purple-400/30">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-lg sm:text-xl font-black text-white">2 Cycles</div>
                <div className="text-[11px] text-emerald-200/80 font-medium">Autumn & Spring</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-3.5 border border-white/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black shrink-0 border border-amber-400/30">
                <Phone className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="text-xs sm:text-sm font-black text-amber-300">{HELPDESK_PHONE}</div>
                <div className="text-[11px] text-emerald-200/80 font-medium">Direct Student Helpline</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Control Bar: Filters, Search, Views & Print Tools */}
      <section className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-slate-200 shadow-sm space-y-4">
        {/* Top Row: Search + View Mode Switch + Print/Export Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by program, assignment, workshop, or exam..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center"
              >
                ×
              </button>
            )}
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* View Mode Toggle */}
            <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 flex items-center">
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'timeline'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Timeline</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  viewMode === 'grid'
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Table Grid</span>
              </button>
            </div>

            {/* Expand / Collapse All */}
            <button
              onClick={() => handleExpandAll(Object.keys(expandedEvents).length === 0)}
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1 transition-colors border border-slate-200"
              title="Expand or collapse all action items"
            >
              {Object.keys(expandedEvents).length > 0 ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Collapse All</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Expand All</span>
                </>
              )}
            </button>

            {/* Download Text */}
            <button
              onClick={handleDownloadTxt}
              className="px-3 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-amber-500 shadow-2xs"
              title="Download text file (.txt)"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>Text (.txt)</span>
            </button>

            {/* Print / PDF */}
            <button
              onClick={handlePrint}
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors border border-emerald-400 shadow-2xs"
              title="Print academic calendar or save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Filter Pills Row 1: Semester Cycles */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Filter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Semester Cycle:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {SEMESTER_CYCLES.map((cycle) => (
              <button
                key={cycle}
                onClick={() => setSelectedSemester(cycle)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedSemester === cycle
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {cycle === 'All' ? '🌟 All Semesters' : cycle}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Pills Row 2: Categories */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <Layers className="w-3.5 h-3.5 text-purple-600" />
            <span>Milestone Category:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CALENDAR_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === category
                    ? 'bg-emerald-800 text-amber-300 border-emerald-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Row 3: Status Quick Filter */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-500">Status:</span>
            {(['All', 'Active / Open', 'Upcoming', 'Continuous'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  selectedStatus === status
                    ? 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status === 'All' ? 'All Status' : status}
              </button>
            ))}
          </div>

          <div className="text-slate-500 font-medium">
            Showing <strong>{filteredEvents.length}</strong> of {AIOU_ACADEMIC_CALENDAR_EVENTS.length} calendar events
          </div>
        </div>
      </section>

      {/* No Results Message */}
      {filteredEvents.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border-2 border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-800 mx-auto flex items-center justify-center border border-amber-300">
            <Search className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No Academic Events Found</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              No calendar deadlines matched your search filter for "<strong>{searchQuery}</strong>". Try clearing your search query or selecting a different category.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSemester('All');
              setSelectedCategory('All');
              setSelectedStatus('All');
            }}
            className="px-4 py-2 bg-emerald-800 text-amber-300 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* VIEW 1: SCROLLABLE VERTICAL TIMELINE VIEW */}
      {viewMode === 'timeline' && filteredEvents.length > 0 && (
        <div className="relative pl-6 sm:pl-10 space-y-6 sm:space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-emerald-600 before:via-teal-500 before:to-indigo-600 before:rounded-full">
          {filteredEvents.map((event, index) => {
            const theme = getCategoryColor(event.category);
            const isExpanded = expandedEvents[event.id] ?? false;
            const isCopied = copiedId === event.id;

            return (
              <div key={event.id} className="relative group animate-fadeIn">
                {/* Timeline Connector Marker Dot */}
                <div
                  className={`absolute -left-6 sm:-left-10 top-5 w-7 h-7 rounded-full bg-white border-4 ${theme.borderCol} shadow-md flex items-center justify-center text-slate-800 z-10 transition-transform group-hover:scale-110`}
                >
                  <span className="w-2 h-2 rounded-full bg-slate-900"></span>
                </div>

                {/* Event Card */}
                <div className={`bg-white rounded-3xl border-2 ${theme.borderCol} p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4`}>
                  {/* Top Bar: Semester, Category Badges & Urgency */}
                  <div className="flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${theme.badgeBg}`}>
                        {renderCategoryIcon(event.iconName)}
                        <span>{event.category}</span>
                      </span>

                      <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-300">
                        {event.semesterCycle}
                      </span>

                      <span className="bg-slate-50 text-slate-600 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg border border-slate-200">
                        {event.phase}
                      </span>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center gap-2">
                      {event.status === 'Active / Open' && (
                        <span className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs animate-pulse">
                          <span className="w-2 h-2 rounded-full bg-white"></span>
                          <span>ACTIVE NOW</span>
                        </span>
                      )}
                      {event.status === 'Upcoming' && (
                        <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold px-3 py-1 rounded-full">
                          <Clock className="w-3.5 h-3.5 text-blue-700" />
                          <span>UPCOMING</span>
                        </span>
                      )}
                      {event.status === 'Continuous' && (
                        <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                          <RotateCcw className="w-3.5 h-3.5 text-amber-700" />
                          <span>CONTINUOUS</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Key Deadline Banner */}
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 group-hover:text-emerald-900 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* High Impact Deadline Callout */}
                  <div className={`p-3.5 sm:p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${theme.cardBg} ${theme.borderCol}`}>
                    <div className="space-y-1">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Official Cutoff / Deadline Window</span>
                      </div>
                      <div className="text-sm sm:text-base font-black text-slate-950">
                        {event.deadlineLabel}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">
                        Span: {event.startDate} — {event.endDate}
                      </div>
                    </div>

                    {/* Target Programs Tags */}
                    <div className="space-y-1 max-w-sm">
                      <div className="text-[10px] font-bold uppercase text-slate-500">Applicable Programs:</div>
                      <div className="flex flex-wrap gap-1">
                        {event.targetPrograms.map((prog, pIdx) => (
                          <span
                            key={pIdx}
                            className="bg-white/80 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-300/80 shadow-2xs"
                          >
                            {prog}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Expandable Action Items Checklist */}
                  <div className="space-y-3 pt-1">
                    <button
                      onClick={() => toggleExpand(event.id)}
                      className="text-xs font-bold text-emerald-900 hover:text-emerald-700 flex items-center gap-1.5 group/btn"
                    >
                      <span>{isExpanded ? 'Hide Action Guidelines & Instructions' : 'View Action Guidelines & Checklist'}</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>

                    {isExpanded && (
                      <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3 animate-fadeIn">
                        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Key Student Action Items & Examination Rules:</span>
                        </div>
                        <ul className="space-y-2 text-xs text-slate-700">
                          {event.keyActionItems.map((item, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Footer Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                    <div className="flex flex-wrap items-center gap-2">
                      {event.officialPortalUrl && (
                        <a
                          href={event.officialPortalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                          <span>{event.officialPortalName || 'Open Official Portal'}</span>
                        </a>
                      )}

                      <a
                        href={getGoogleCalendarUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-300"
                        title="Add this deadline to Google Calendar"
                      >
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        <span className="hidden sm:inline">Add to</span> Calendar
                      </a>

                      <button
                        onClick={() => handleCopyEvent(event)}
                        className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-300"
                        title="Copy event summary to clipboard"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                    <a
                      href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610), I need assistance regarding "${event.title}" - ${event.deadlineLabel}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors border border-emerald-500 shadow-2xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Inquire (03451291610)</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: COMPACT CALENDAR GRID / TABLE VIEW */}
      {viewMode === 'grid' && filteredEvents.length > 0 && (
        <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-sm overflow-hidden animate-fadeIn">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4 border-b border-slate-800">Academic Milestone</th>
                  <th className="p-4 border-b border-slate-800">Semester & Phase</th>
                  <th className="p-4 border-b border-slate-800">Target Programs</th>
                  <th className="p-4 border-b border-slate-800">Official Deadline</th>
                  <th className="p-4 border-b border-slate-800">Status</th>
                  <th className="p-4 border-b border-slate-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                {filteredEvents.map((event) => {
                  const theme = getCategoryColor(event.category);
                  return (
                    <tr key={event.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 max-w-xs">
                        <div className="font-bold text-slate-950 text-xs sm:text-sm font-serif">{event.title}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{event.description}</div>
                        <span className={`inline-block mt-1 text-[10px] font-black px-2 py-0.5 rounded-md border ${theme.badgeBg}`}>
                          {event.category}
                        </span>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900">{event.semesterCycle}</div>
                        <div className="text-[11px] text-slate-500">{event.phase}</div>
                      </td>
                      <td className="p-4 max-w-[180px]">
                        <div className="flex flex-wrap gap-1">
                          {event.targetPrograms.slice(0, 3).map((p, i) => (
                            <span key={i} className="bg-slate-100 text-slate-700 text-[10px] px-1.5 py-0.5 rounded-sm border border-slate-200">
                              {p}
                            </span>
                          ))}
                          {event.targetPrograms.length > 3 && (
                            <span className="text-[10px] text-slate-400 font-bold">+{event.targetPrograms.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-black text-emerald-950">{event.deadlineLabel}</div>
                        <div className="text-[10px] text-slate-500">{event.startDate} - {event.endDate}</div>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {event.status === 'Active / Open' && (
                          <span className="inline-flex items-center gap-1 bg-emerald-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                            ACTIVE
                          </span>
                        )}
                        {event.status === 'Upcoming' && (
                          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-900 border border-blue-300 font-bold text-[10px] px-2 py-0.5 rounded-full">
                            UPCOMING
                          </span>
                        )}
                        {event.status === 'Continuous' && (
                          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] px-2 py-0.5 rounded-full">
                            CONTINUOUS
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {event.officialPortalUrl && (
                            <a
                              href={event.officialPortalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs"
                              title={event.officialPortalName}
                            >
                              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                            </a>
                          )}
                          <a
                            href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need help with "${event.title}".`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-lg text-xs"
                            title="Inquire via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Educare Support & Counseling Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500/50 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Never Miss an AIOU Deadline</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Need Help With Admissions, LMS Submissions, or Exam Prep?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Educare Student Support Desk provides complete guidance for fresh/continuing online admission forms, 100% verified solved assignments, MS Teams workshop orientation, CMS password recoveries, and fast-track degree applications.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md border border-amber-500"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Call {HELPDESK_PHONE}</span>
          </a>

          <a
            href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk (03451291610), I need assistance with AIOU academic deadlines and examination dates.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md border border-emerald-400"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>WhatsApp Helpline</span>
          </a>
        </div>
      </section>
    </div>
  );
};
