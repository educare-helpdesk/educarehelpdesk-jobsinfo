import React, { useState, useRef } from 'react';
import { Phone, MessageCircle, GraduationCap, Sparkles, BookOpen, Calculator, FileText, Globe, HelpCircle, Briefcase, BookMarked, Clock, Building, Newspaper, Bell, CalendarDays, FileDown, Menu, X, Search, ChevronRight, ChevronLeft, Printer } from 'lucide-react';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { NewsTicker } from './NewsTicker';
import { ShareButton } from './ShareButton';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenInquiry: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenInquiry,
  isMobileMenuOpen: propMenuOpen,
  setIsMobileMenuOpen: propSetMenuOpen,
}) => {
  const [localMenuOpen, setLocalMenuOpen] = useState(false);
  const [drawerSearch, setDrawerSearch] = useState('');
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const isMenuOpen = propMenuOpen !== undefined ? propMenuOpen : localMenuOpen;
  const setMenuOpen = propSetMenuOpen || setLocalMenuOpen;

  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk, I need assistance regarding BISE Sargodha / AIOU programs.")}`;

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({
        left: direction === 'left' ? -280 : 280,
        behavior: 'smooth'
      });
    }
  };

  const handlePrintPage = () => {
    window.print();
  };

  const navItems = [
    { id: 'programs', label: 'AIOU Programs (Matric-PhD)', icon: GraduationCap, color: 'text-emerald-700', activeBg: 'bg-emerald-800', badge: 'All Levels', badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300', category: 'Academics & Deadlines', desc: 'Browse degree catalogs, entry criteria & semester courses' },
    { id: 'forms-download', label: 'Forms Download Desk', icon: FileDown, color: 'text-emerald-700', activeBg: 'bg-emerald-850', badge: 'All Forms & NOC', badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300 font-black', category: 'Academics & Deadlines', desc: 'Download Degree, Admission, NOC, Birth, Job & Bank forms' },
    { id: 'academic-calendar', label: 'Academic Calendar', icon: CalendarDays, color: 'text-teal-700', activeBg: 'bg-teal-900', badge: '2026 Deadlines', badgeColor: 'bg-amber-100 text-amber-950 border-amber-300 font-black', category: 'Academics & Deadlines', desc: 'Official AIOU timeline for admissions, exams & results' },
    { id: 'academic-updates', label: 'Academic Updates', icon: Newspaper, color: 'text-rose-700', activeBg: 'bg-rose-800', badge: 'Live Grounded', badgeColor: 'bg-rose-100 text-rose-900 border-rose-300', category: 'Academics & Deadlines', desc: 'Real-time verified university alerts and notifications' },
    { id: 'bise-sargodha', label: 'BISE Sargodha (Matric/Inter)', icon: Building, color: 'text-blue-700', activeBg: 'bg-blue-800', badge: 'Results & Admission', badgeColor: 'bg-blue-100 text-blue-900 border-blue-300', category: 'Academics & Deadlines', desc: 'Sargodha Board 9th, 10th, 11th & 12th portal' },
    { id: 'jobs', label: 'Jobs, CM Schemes, Scholarships & PEF', icon: Briefcase, color: 'text-amber-700', activeBg: 'bg-amber-500 text-slate-950', badge: 'Jobs • PEF • CM Schemes', badgeColor: 'bg-rose-500 text-white border-rose-600 animate-pulse font-black', category: 'Academics & Deadlines', desc: 'PPSC & Police Jobs, CM Punjab Schemes (Honhaar, Laptops, E-Bikes), Scholarships & PEF Updates' },
    { id: 'ai-solver', label: 'AI Assignment Solver', icon: Sparkles, color: 'text-purple-700', activeBg: 'bg-purple-800', badge: 'AI Powered', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300', category: 'Solvers & Calculators', desc: 'Instant AI solutions formatted for AIOU assignment standards' },
    { id: 'solved-assignments', label: 'Solved Assignments', icon: BookOpen, color: 'text-teal-700', activeBg: 'bg-teal-800', badge: 'PDFs & Scans', badgeColor: 'bg-teal-100 text-teal-900 border-teal-300', category: 'Solvers & Calculators', desc: 'Pre-solved assignments catalog & handwritten guides' },
    { id: 'exam-countdown', label: 'Exam Countdown Timer', icon: Clock, color: 'text-rose-700', activeBg: 'bg-rose-800', badge: 'Exams 2026', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300', category: 'Solvers & Calculators', desc: 'Live countdowns & 30-day exam preparation planner' },
    { id: 'study-resources', label: 'Study Resources & Prep', icon: BookMarked, color: 'text-indigo-700', activeBg: 'bg-indigo-800', badge: 'AI Prep & Tips', badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300', category: 'Solvers & Calculators', desc: 'Past 5-year papers, study timetables & tutor guides' },
    { id: 'cover-page', label: 'Cover Page Maker', icon: FileText, color: 'text-cyan-700', activeBg: 'bg-cyan-800', badge: 'Print Ready', badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300', category: 'Solvers & Calculators', desc: 'Generate printable 3-part dispatch covers with barcode' },
    { id: 'fee-calculator', label: 'Fee Estimator', icon: Calculator, color: 'text-orange-700', activeBg: 'bg-orange-800', category: 'Solvers & Calculators', desc: 'Compute exact tuition, technology & late fees' },
    { id: 'faqs', label: 'AIOU & Exam FAQs', icon: HelpCircle, color: 'text-violet-700', activeBg: 'bg-violet-800', badge: 'Answers & Guides', badgeColor: 'bg-violet-100 text-violet-900 border-violet-300', category: 'Portals & Information', desc: 'Common questions, workshop rules & degree delivery' },
    { id: 'portals', label: 'CMS & LMS Portals', icon: Globe, color: 'text-sky-700', activeBg: 'bg-sky-800', category: 'Portals & Information', desc: 'Direct links to AAGHI LMS, CMS enrollment & tutor search' },
    { id: 'contact', label: 'Contact Help Desk', icon: Phone, color: 'text-emerald-700', activeBg: 'bg-emerald-900', category: 'Portals & Information', desc: 'Phone helpline 03451291610 & WhatsApp facilitation' },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.label.toLowerCase().includes(drawerSearch.toLowerCase()) ||
    (item.desc && item.desc.toLowerCase().includes(drawerSearch.toLowerCase())) ||
    (item.badge && item.badge.toLowerCase().includes(drawerSearch.toLowerCase()))
  );

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-200 shadow-md">
      {/* Real-time AIOU News & Alerts Ticker */}
      <NewsTicker onSelectTab={handleSelectTab} />

      {/* Top Helpline Bar with High Contrast */}
      <div className="bg-emerald-950 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b border-emerald-900">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-emerald-100 truncate text-[11px] sm:text-xs">
              Educare Student Portal • AIOU & BISE Sargodha Center
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors font-bold text-xs sm:text-sm min-h-[32px]"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer" onClick={() => handleSelectTab('programs')}>
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-md bg-emerald-900 text-amber-300 border-2 border-amber-400/60 shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-serif">
                  Educare Help Desk
                </h1>
                <span className="bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-amber-500 shadow-2xs shrink-0">
                  AIOU & BISE Desk
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-emerald-900 font-bold tracking-tight mt-0.5 line-clamp-1">
                Matric • Inter • BA/BS • B.Ed • Master • Ph.D Support Center
              </p>
            </div>
          </div>

          {/* Mobile Right Action Buttons (Call, WhatsApp, Menu) */}
          <div className="md:hidden flex items-center gap-1.5 shrink-0">
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="min-h-[42px] min-w-[42px] flex items-center justify-center bg-emerald-100 text-emerald-900 rounded-xl font-bold border border-emerald-300 active:scale-95 transition-transform"
              title="Call Helpline: 03451291610"
              aria-label="Call Helpline"
            >
              <Phone className="w-4 h-4 text-emerald-800" />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[42px] min-w-[42px] flex items-center justify-center bg-emerald-700 text-white rounded-xl font-bold shadow-xs border border-emerald-600 active:scale-95 transition-transform"
              title="WhatsApp Helpline"
              aria-label="WhatsApp Helpline"
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </a>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="min-h-[42px] px-2.5 bg-slate-900 text-amber-300 rounded-xl font-bold flex items-center gap-1 border border-slate-700 active:scale-95 transition-transform shadow-xs"
              aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5 text-amber-400" /> : <Menu className="w-5 h-5 text-amber-400" />}
              <span className="text-xs font-bold text-white">Menu</span>
            </button>
          </div>
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={() => handleSelectTab('bise-sargodha')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all shadow-sm border text-xs sm:text-sm font-extrabold ${
              activeTab === 'bise-sargodha'
                ? 'bg-emerald-950 text-white border-emerald-800'
                : 'bg-emerald-800 hover:bg-emerald-700 text-white border-emerald-900'
            }`}
          >
            <Building className="w-4 h-4 text-amber-300" />
            <span>BISE Sargodha</span>
          </button>

          <button
            onClick={() => handleSelectTab('jobs')}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all shadow-sm border text-xs sm:text-sm font-extrabold ${
              activeTab === 'jobs'
                ? 'bg-amber-400 text-slate-950 border-amber-500 ring-2 ring-amber-300'
                : 'bg-amber-500 hover:bg-amber-400 text-slate-950 border-amber-600'
            }`}
          >
            <Briefcase className="w-4 h-4 text-slate-950" />
            <span>Govt Jobs 2026</span>
          </button>

          <ShareButton 
            title="Educare Help Desk - AIOU & BISE Sargodha Portal"
            text="Access AIOU admissions, solved assignments, official downloadable forms, exam calendar, and BISE Sargodha results."
          />

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
            onClick={handlePrintPage}
            className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all shadow-xs border bg-white hover:bg-slate-50 text-slate-800 border-slate-300 text-xs font-bold"
            title="Print current page or Save as PDF (Ctrl + P)"
            aria-label="Print page"
          >
            <Printer className="w-4 h-4 text-slate-700" />
            <span>Print [Ctrl+P]</span>
          </button>

          <button
            onClick={onOpenInquiry}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2.5 rounded-xl transition-all shadow-sm text-xs sm:text-sm border border-amber-600"
          >
            Inquire Now
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar with Desktop Mouse Wheel & Touch-Friendly Horizontal Scroll */}
      <div className="relative bg-slate-100 border-t-2 border-slate-200 px-2 sm:px-3">
        {/* Desktop Left Scroll Button for Windows 7 Mouse Users */}
        <button
          onClick={() => scrollTabs('left')}
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/95 hover:bg-white text-slate-700 hover:text-slate-950 rounded-full shadow-md border border-slate-300 items-center justify-center transition-all hover:scale-110 active:scale-95"
          title="Scroll Left (Mouse / Keyboard)"
          aria-label="Scroll services list left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={tabsContainerRef}
          onWheel={(e) => {
            if (e.deltaY !== 0) {
              e.currentTarget.scrollLeft += e.deltaY;
            }
          }}
          className="max-w-7xl mx-auto flex items-center gap-1.5 sm:gap-2 py-2 overflow-x-auto scrollbar-none touch-pan-x scroll-smooth md:px-7"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`min-h-[40px] flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap border shadow-xs ${
                  isActive
                    ? `${item.activeBg || 'bg-emerald-950'} text-white border-slate-900 shadow-md ring-2 ring-emerald-500/50 scale-[1.01]`
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

        {/* Desktop Right Scroll Button for Windows 7 Mouse Users */}
        <button
          onClick={() => scrollTabs('right')}
          className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-white/95 hover:bg-white text-slate-700 hover:text-slate-950 rounded-full shadow-md border border-slate-300 items-center justify-center transition-all hover:scale-110 active:scale-95"
          title="Scroll Right (Mouse / Keyboard)"
          aria-label="Scroll services list right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex justify-end animate-in fade-in duration-150"
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="w-full max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-hidden border-l border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="bg-emerald-950 text-white p-4 flex items-center justify-between border-b border-emerald-900 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
                  <GraduationCap className="w-5 h-5 text-slate-950" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-serif text-white">Educare Portals Hub</h3>
                  <p className="text-[11px] text-emerald-200 font-medium">Select from 15+ student services</p>
                </div>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-300 hover:text-white hover:bg-emerald-900 rounded-xl transition-colors"
                aria-label="Close menu drawer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Instant Search Bar */}
            <div className="p-3 bg-slate-50 border-b border-slate-200 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={drawerSearch}
                  onChange={(e) => setDrawerSearch(e.target.value)}
                  placeholder="Search forms, calendar, AI solver..."
                  className="w-full pl-9 pr-8 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-base sm:text-xs"
                />
                {drawerSearch && (
                  <button
                    onClick={() => setDrawerSearch('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 min-h-[32px] min-w-[32px] flex items-center justify-center"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Nav Item List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {filteredNavItems.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <p className="text-xs font-bold">No services matching "{drawerSearch}"</p>
                  <button
                    onClick={() => setDrawerSearch('')}
                    className="mt-2 text-xs font-bold text-emerald-700 underline min-h-[44px] inline-flex items-center"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                filteredNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectTab(item.id)}
                      className={`w-full min-h-[52px] text-left p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                        isActive
                          ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-emerald-800'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold truncate">{item.label}</span>
                            {item.badge && (
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-black shrink-0 ${
                                isActive ? 'bg-emerald-800 text-amber-300' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.desc && (
                            <p className={`text-[10px] line-clamp-1 mt-0.5 ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                              {item.desc}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                    </button>
                  );
                })
              )}
            </div>

            {/* Quick Contact & Action Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2 shrink-0">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${HELPDESK_PHONE}`}
                  className="min-h-[44px] bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Call Desk</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-white" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenInquiry();
                }}
                className="w-full min-h-[44px] bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 border border-amber-500 shadow-xs"
              >
                <span>Submit Student Inquiry</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
