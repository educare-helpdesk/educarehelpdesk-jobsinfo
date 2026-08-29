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
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { ProgramLevel } from './types';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from './data/aiouData';
import { Phone, MessageCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('programs');
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevel | undefined>(undefined);
  const [selectedCode, setSelectedCode] = useState<string | undefined>(undefined);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);

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
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6 sm:pt-8 pb-12">
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

        {activeTab === 'jobs' && (
          <JobsPortal />
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

      {/* Floating Quick Action Widget */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg flex items-center gap-2 font-bold text-xs sm:text-sm transition-all hover:scale-105 border-2 border-emerald-400"
          title="WhatsApp Educare Desk"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="hidden sm:inline">WhatsApp 03451291610</span>
        </a>

        <a
          href={`tel:${HELPDESK_PHONE}`}
          className="bg-slate-900 hover:bg-slate-800 text-amber-300 p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg flex items-center gap-2 font-bold text-xs sm:text-sm transition-all hover:scale-105 border-2 border-amber-400"
          title="Call Educare Helpline"
        >
          <Phone className="w-5 h-5 text-amber-400" />
          <span className="hidden sm:inline">Call {HELPDESK_PHONE}</span>
        </a>
      </div>

      {/* Modal */}
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
