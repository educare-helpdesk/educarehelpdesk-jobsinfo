import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProgramsGrid } from './components/ProgramsGrid';
import { AiAssignmentSolver } from './components/AiAssignmentSolver';
import { SolvedAssignmentsHub } from './components/SolvedAssignmentsHub';
import { CoverPageMaker } from './components/CoverPageMaker';
import { FeeCalculator } from './components/FeeCalculator';
import { PortalsAndLinks } from './components/PortalsAndLinks';
import { ContactEducare } from './components/ContactEducare';
import { JobsPortal } from './components/JobsPortal';
import { ExamCountdown } from './components/ExamCountdown';
import { BiseSargodhaPortal } from './components/BiseSargodhaPortal';
import { FaqSection } from './components/FaqSection';
import { StudyResources } from './components/StudyResources';
import { AcademicUpdates } from './components/AcademicUpdates';
import { AcademicCalendar } from './components/AcademicCalendar';
import { FormsDownloadHub } from './components/FormsDownloadHub';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { ProgramLevel } from './types';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from './data/aiouData';
import { Phone, MessageCircle, GraduationCap, CalendarDays, FileDown, Sparkles, Menu } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('programs');
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel | undefined>(undefined);
  const [selectedCode, setSelectedCode] = useState<string | undefined>(undefined);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleSelectProgramForAi = (level: ProgramLevel, code?: string) => {
    setSelectedLevel(level);
    setSelectedCode(code);
    setActiveTab('ai-solver');
  };

  const handleOpenInquiry = (level?: ProgramLevel, code?: string) => {
    if (level) setSelectedLevel(level);
    if (code) setSelectedCode(code);
    setIsInquiryModalOpen(true);
  };

  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk (03451291610), I need student support for Allama Iqbal Open University.")}`;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenInquiry={() => handleOpenInquiry()}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 pt-4 sm:pt-8 pb-24 md:pb-12">
        {activeTab === 'programs' && (
          <ProgramsGrid
            onSelectProgramForAi={handleSelectProgramForAi}
            onOpenInquiry={handleOpenInquiry}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'academic-updates' && (
          <AcademicUpdates
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenInquiry={() => handleOpenInquiry()}
          />
        )}

        {activeTab === 'academic-calendar' && (
          <AcademicCalendar
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {activeTab === 'forms-download' && (
          <FormsDownloadHub
            onNavigateTab={(tab) => setActiveTab(tab)}
            onOpenInquiry={(title) => handleOpenInquiry(undefined, title)}
          />
        )}

        {activeTab === 'ai-solver' && (
          <AiAssignmentSolver
            initialLevel={selectedLevel}
            initialCode={selectedCode}
          />
        )}

        {activeTab === 'solved-assignments' && (
          <SolvedAssignmentsHub
            onSelectForAi={handleSelectProgramForAi}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {activeTab === 'cover-page' && (
          <CoverPageMaker />
        )}

        {activeTab === 'fee-calculator' && (
          <FeeCalculator />
        )}

        {activeTab === 'faqs' && (
          <FaqSection onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'portals' && (
          <PortalsAndLinks />
        )}

        {activeTab === 'bise-sargodha' && (
          <BiseSargodhaPortal onOpenInquiry={() => handleOpenInquiry()} />
        )}

        {(activeTab === 'jobs' || activeTab === 'schemes' || activeTab === 'scholarships' || activeTab === 'pef') && (
          <JobsPortal
            initialTab={
              activeTab === 'schemes'
                ? 'schemes'
                : activeTab === 'scholarships'
                ? 'scholarships'
                : activeTab === 'pef'
                ? 'pef'
                : 'jobs'
            }
          />
        )}

        {activeTab === 'exam-countdown' && (
          <div className="space-y-8">
            <ExamCountdown onNavigateTab={(tab) => setActiveTab(tab)} />
          </div>
        )}

        {activeTab === 'study-resources' && (
          <StudyResources
            onSelectProgramForAi={handleSelectProgramForAi}
            onOpenInquiry={handleOpenInquiry}
          />
        )}

        {activeTab === 'contact' && (
          <ContactEducare
            initialLevel={selectedLevel}
            initialCode={selectedCode}
          />
        )}
      </main>

      {/* Floating Quick Action Widget - Placed safely above mobile bottom nav */}
      <div className="floating-actions fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-30 flex flex-col items-end gap-2 pointer-events-auto">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white min-h-[44px] min-w-[44px] p-3 sm:px-4 sm:py-3 rounded-full shadow-lg flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all hover:scale-105 border-2 border-emerald-400 active:scale-95"
          title="WhatsApp Educare Desk"
          aria-label="WhatsApp Educare Desk"
        >
          <MessageCircle className="w-5 h-5 text-white shrink-0" />
          <span className="hidden sm:inline">WhatsApp 03451291610</span>
        </a>

        <a
          href={`tel:${HELPDESK_PHONE}`}
          className="bg-slate-900 hover:bg-slate-800 text-amber-300 min-h-[44px] min-w-[44px] p-3 sm:px-4 sm:py-3 rounded-full shadow-lg flex items-center justify-center gap-2 font-bold text-xs sm:text-sm transition-all hover:scale-105 border-2 border-amber-400 active:scale-95"
          title="Call Educare Helpline"
          aria-label="Call Educare Helpline"
        >
          <Phone className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="hidden sm:inline">Call {HELPDESK_PHONE}</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (iOS / Android Friendly) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 text-white px-2 py-1.5 shadow-2xl safe-area-bottom"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="flex items-center justify-around">
          <button
            onClick={() => {
              setActiveTab('programs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`min-h-[46px] flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === 'programs' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Programs</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('academic-calendar');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`min-h-[46px] flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
              activeTab === 'academic-calendar' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CalendarDays className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Calendar</span>
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-400"></span>
          </button>

          <button
            onClick={() => {
              setActiveTab('forms-download');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`min-h-[46px] flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === 'forms-download' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileDown className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Forms</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('ai-solver');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`min-h-[46px] flex-1 flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              activeTab === 'ai-solver' ? 'text-amber-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="relative">
              <Sparkles className="w-5 h-5 mb-0.5 text-purple-400" />
            </div>
            <span className="text-[10px] tracking-tight">AI Solver</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="min-h-[46px] flex-1 flex flex-col items-center justify-center py-1 rounded-xl text-slate-400 hover:text-amber-300 transition-all"
            aria-label="Open Full Menu Drawer"
          >
            <Menu className="w-5 h-5 mb-0.5 text-emerald-400" />
            <span className="text-[10px] tracking-tight text-emerald-300 font-semibold">More (15+)</span>
          </button>
        </div>
      </nav>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialLevel={selectedLevel}
        initialCode={selectedCode}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
