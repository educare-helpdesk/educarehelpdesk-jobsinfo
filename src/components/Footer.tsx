import React from 'react';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { GraduationCap, Phone, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk, I need help.")}`;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 text-xs mt-12">
      {/* Upper Helpline Strip */}
      <div className="bg-emerald-950 border-b border-emerald-900/60 py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-amber-400" />
            <span className="font-bold text-slate-100 text-sm">
              Educare Help Desk • Allama Iqbal Open University (AIOU) Support Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-950" />
              <span>Call: {HELPDESK_PHONE}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 text-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
              <span>WhatsApp Chat</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-3 md:col-span-1">
          <h3 className="text-sm font-bold text-white font-serif flex items-center gap-2">
            <span>Educare Help Desk</span>
          </h3>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            Comprehensive student support service for Allama Iqbal Open University learners across Pakistan and overseas. Assisting Matric, FA, BA, BS, B.Ed, Master, M.Phil, and Ph.D. students.
          </p>
          <div className="font-bold text-amber-300 text-xs">
            Helpline: {HELPDESK_PHONE}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Board & University Portals</h4>
          <ul className="space-y-1 text-[11px] text-slate-400">
            <li><button onClick={() => setActiveTab('academic-updates')} className="hover:text-amber-300 font-bold text-rose-400">Academic Updates & News Hub (Live)</button></li>
            <li><button onClick={() => setActiveTab('bise-sargodha')} className="hover:text-amber-300 font-bold text-amber-300">BISE Sargodha Portal (Matric/Inter)</button></li>
            <li><button onClick={() => setActiveTab('jobs')} className="hover:text-amber-300 font-bold text-emerald-400">Punjab Jobs & Govt Notifications</button></li>
            <li><button onClick={() => setActiveTab('exam-countdown')} className="hover:text-amber-300">Exam Countdown Timer</button></li>
            <li><button onClick={() => setActiveTab('programs')} className="hover:text-amber-300">AIOU Programs (Matric to PhD)</button></li>
            <li><button onClick={() => setActiveTab('portals')} className="hover:text-amber-300">CMS & LMS Official Links</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Tools & Guides</h4>
          <ul className="space-y-1 text-[11px] text-slate-400">
            <li><button onClick={() => setActiveTab('faqs')} className="hover:text-amber-300 font-bold text-amber-300">AIOU & Exam FAQs (All Guides)</button></li>
            <li><button onClick={() => setActiveTab('ai-solver')} className="hover:text-amber-300">AI Assignment Solver</button></li>
            <li><button onClick={() => setActiveTab('solved-assignments')} className="hover:text-amber-300">Solved Assignments Catalog</button></li>
            <li><button onClick={() => setActiveTab('cover-page')} className="hover:text-amber-300">Assignment Cover Page Maker</button></li>
            <li><button onClick={() => setActiveTab('fee-calculator')} className="hover:text-amber-300">Fee Estimator</button></li>
            <li><button onClick={() => setActiveTab('portals')} className="hover:text-amber-300">CMS & AAGHI LMS Portals</button></li>
          </ul>
        </div>

        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Direct Support</h4>
          <p className="text-slate-400 text-[11px]">
            Call or message Educare Help Desk at <strong>03451291610</strong> for instant help regarding solved assignments, roll number slips, tutor address, and assignment deadlines.
          </p>
          <div className="pt-2">
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="inline-block bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-3 py-1.5 rounded text-xs border border-slate-700"
            >
              Call 03451291610
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-900 py-4 px-4 text-center text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} Educare Help Desk (03451291610). Independent Student Support Desk for AIOU Learners.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for Allama Iqbal Open University Students</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
