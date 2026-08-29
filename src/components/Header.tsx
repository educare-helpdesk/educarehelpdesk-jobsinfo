import React from 'react';
import { Phone, MessageCircle, GraduationCap, Sparkles, BookOpen, Calculator, FileText, Globe, HelpCircle, Briefcase, BookMarked, Clock, Building, Newspaper, Bell, CalendarDays } from 'lucide-react';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { NewsTicker } from './NewsTicker';
import { ShareButton } from './ShareButton';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenInquiry }) => {
  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk, I need assistance regarding BISE Sargodha / AIOU programs.")}`;

  const navItems = [
    { id: 'programs', label: 'AIOU Programs (Matric-PhD)', icon: GraduationCap, color: 'text-emerald-700', activeBg: 'bg-emerald-800', badge: 'All Levels', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    { id: 'academic-calendar', label: 'Academic Calendar', icon: CalendarDays, color: 'text-teal-700', activeBg: 'bg-teal-900', badge: '2026 Deadlines', badgeColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black' },
    { id: 'academic-updates', label: 'Academic Updates', icon: Newspaper, color: 'text-rose-700', activeBg: 'bg-rose-800', badge: 'Live Grounded', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300' },
    { id: 'bise-sargodha', label: 'BISE Sargodha (Matric/Inter)', icon: Building, color: 'text-blue-700', activeBg: 'bg-blue-800', badge: 'Results & Admission', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300' },
    { id: 'jobs', label: 'Punjab Jobs & Govt Notifications', icon: Briefcase, color: 'text-amber-700', activeBg: 'bg-amber-500 text-slate-950', badge: 'Jobs & Alerts 2026', badgeColor: 'bg-rose-500 text-white border-rose-600 animate-pulse' },
    { id: 'ai-solver', label: 'AI Assignment Solver', icon: Sparkles, color: 'text-purple-700', activeBg: 'bg-purple-800', badge: 'AI Powered', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
    { id: 'solved-assignments', label: 'Solved Assignments', icon: BookOpen, color: 'text-teal-700', activeBg: 'bg-teal-800', badge: 'PDFs & Scans', badgeColor: 'bg-teal-100 text-teal-900 border-teal-300' },
    { id: 'exam-countdown', label: 'Exam Countdown Timer', icon: Clock, color: 'text-rose-700', activeBg: 'bg-rose-800', badge: 'Exams 2026', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'study-resources', label: 'Study Resources & Prep', icon: BookMarked, color: 'text-indigo-700', activeBg: 'bg-indigo-800', badge: 'AI Prep & Tips', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300' },
    { id: 'cover-page', label: 'Cover Page Maker', icon: FileText, color: 'text-cyan-700', activeBg: 'bg-cyan-800', badge: 'Print Ready', badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300' },
    { id: 'fee-calculator', label: 'Fee Estimator', icon: Calculator, color: 'text-orange-700', activeBg: 'bg-orange-800' },
    { id: 'faqs', label: 'AIOU & Exam FAQs', icon: HelpCircle, color: 'text-violet-700', activeBg: 'bg-violet-800', badge: 'Answers & Guides', badgeColor: 'bg-violet-100 text-violet-900 border-violet-300' },
    { id: 'portals', label: 'CMS & LMS Portals', icon: Globe, color: 'text-sky-700', activeBg: 'bg-sky-800' },
    { id: 'contact', label: 'Contact Help Desk', icon: HelpCircle, color: 'text-emerald-700', activeBg: 'bg-emerald-900' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-200 shadow-md">
      {/* Real-time AIOU News & Alerts Ticker */}
      <NewsTicker onSelectTab={setActiveTab} />

      {/* Top Helpline Bar with High Contrast */}
      <div className="bg-emerald-950 text-white px-4 py-2 text-xs sm:text-sm font-medium border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-100">
              Educare Student Portal • AIOU & BISE Sargodha Facilitation Center
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors font-bold text-xs sm:text-sm"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Helpline: {HELPDESK_PHONE}</span>
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 px-3 py-1 rounded-full text-xs font-bold text-white transition-colors border border-emerald-500"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>WhatsApp Helpline</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => setActiveTab('programs')}>
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md bg-emerald-900 text-amber-300 border-2 border-amber-400/60 shrink-0"
            >
              <GraduationCap className="w-7 h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-serif">
                  Educare Help Desk
                </h1>
                <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-amber-500 shadow-2xs">
                  AIOU & BISE Desk
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900 font-bold tracking-tight mt-0.5">
                Matric • Intermediate • BA/BS • B.Ed • Master • M.Phil • Ph.D Support Center
              </p>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-1.5">
            <button
              onClick={() => setActiveTab('academic-updates')}
              className="p-2 bg-rose-700 text-white rounded-xl font-extrabold shadow-xs flex items-center gap-1 text-[11px] border border-rose-600"
              title="Live Academic Updates"
            >
              <Newspaper className="w-4 h-4 text-amber-300" />
              <span>News</span>
            </button>
            <button
              onClick={() => setActiveTab('bise-sargodha')}
              className="p-2 bg-emerald-900 text-amber-300 rounded-xl font-bold shadow-xs flex items-center gap-1 text-[11px] border border-emerald-700"
              title="BISE Sargodha Portal"
            >
              <Building className="w-4 h-4" />
              <span>BISE</span>
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className="p-2 bg-amber-400 text-slate-950 rounded-xl font-extrabold shadow-xs flex items-center gap-1 text-[11px] border border-amber-500"
              title="Jobs Portal"
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </button>
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="p-2 bg-emerald-100 text-emerald-900 rounded-xl font-bold border border-emerald-300"
              title="Call Helpline"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-emerald-700 text-white rounded-xl font-bold shadow-xs border border-emerald-600"
              title="WhatsApp Chat"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Action Buttons on Header */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('bise-sargodha')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all shadow-sm border text-xs sm:text-sm font-extrabold ${
              activeTab === 'bise-sargodha'
                ? 'bg-emerald-950 text-white border-emerald-800'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white border-emerald-900'
            }`}
          >
            <Building className="w-4 h-4 text-amber-300" />
            <div className="text-left">
              <span className="text-[9px] uppercase font-black text-amber-300 block tracking-wider">Matric & Inter</span>
              <span className="text-xs font-black text-white">BISE Sargodha</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('jobs')}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2 rounded-xl transition-all shadow-sm border border-amber-500 text-xs sm:text-sm font-extrabold"
          >
            <Briefcase className="w-4 h-4 text-slate-950" />
            <div className="text-left">
              <span className="text-[9px] uppercase font-black text-slate-900 block tracking-wider">AIOU & Punjab</span>
              <span className="text-xs font-black text-slate-950">Jobs 2026</span>
            </div>
          </button>

          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-900 border-2 border-slate-300 hover:border-emerald-500 px-3.5 py-2 rounded-xl transition-all shadow-xs"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold bg-emerald-950 text-amber-300"
            >
              <Phone className="w-4 h-4 text-amber-300" />
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase font-extrabold text-slate-600 block tracking-wider">Call Helpline</span>
              <span className="text-sm font-extrabold text-slate-950">{HELPDESK_PHONE}</span>
            </div>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold shadow-sm transition-all border border-emerald-600"
          >
            <MessageCircle className="w-5 h-5 text-emerald-200" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-extrabold text-emerald-200 block tracking-wider">Quick Chat</span>
              <span className="text-xs font-extrabold text-white">WhatsApp Desk</span>
            </div>
          </a>

          <button
            onClick={onOpenInquiry}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs sm:text-sm border border-amber-600"
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar with High Contrast on Desktop */}
      <div className="bg-slate-100 border-t-2 border-slate-200 px-3 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 py-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap border shadow-xs ${
                  isActive
                    ? `${item.activeBg || 'bg-emerald-950'} text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50 scale-[1.02]`
                    : 'bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-950 border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : item.color || 'text-emerald-700'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-md font-black tracking-wide ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

