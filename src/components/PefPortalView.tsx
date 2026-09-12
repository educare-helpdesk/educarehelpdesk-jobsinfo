import React, { useState, useMemo } from 'react';
import { PEF_PROGRAMS, PefProgram } from '../data/pefData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import {
  School,
  Ticket,
  PlusCircle,
  FileCheck2,
  GraduationCap,
  Sparkles,
  Users,
  Briefcase,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  X,
  Building,
  BookOpen
} from 'lucide-react';

export const PefPortalView: React.FC = () => {
  const [selectedCode, setSelectedCode] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<PefProgram | null>(null);

  const filterTabs = [
    { code: 'All', label: 'All PEF Initiatives' },
    { code: 'QAT', label: 'QAT 2026 Exam' },
    { code: 'FAS', label: 'FAS (Partner Schools)' },
    { code: 'EVS', label: 'EVS (Vouchers)' },
    { code: 'NSP', label: 'NSP (New Schools)' },
    { code: 'CPD', label: 'Teacher Training (CPD)' },
    { code: 'EXPANSION', label: 'School Expansion 2026' },
    { code: 'CAREERS', label: 'PEF Jobs (QAO/MEO)' }
  ];

  const getProgramIcon = (code: string) => {
    switch (code) {
      case 'FAS':
        return <School className="w-5 h-5 text-emerald-600" />;
      case 'EVS':
        return <Ticket className="w-5 h-5 text-purple-600" />;
      case 'NSP':
        return <PlusCircle className="w-5 h-5 text-blue-600" />;
      case 'QAT':
        return <FileCheck2 className="w-5 h-5 text-amber-600" />;
      case 'CPD':
        return <GraduationCap className="w-5 h-5 text-teal-600" />;
      case 'EXPANSION':
        return <Building className="w-5 h-5 text-indigo-600" />;
      case 'CAREERS':
        return <Briefcase className="w-5 h-5 text-rose-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
    }
  };

  const filteredPrograms = useMemo(() => {
    return PEF_PROGRAMS.filter((prog) => {
      const matchesCode = selectedCode === 'All' || prog.code === selectedCode;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        prog.title.toLowerCase().includes(q) ||
        (prog.urduTitle && prog.urduTitle.includes(q)) ||
        prog.summary.toLowerCase().includes(q) ||
        prog.category.toLowerCase().includes(q) ||
        prog.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCode && matchesSearch;
    });
  }, [selectedCode, searchQuery]);

  return (
    <div className="space-y-6">
      {/* PEF Hero Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-sm">
              <School className="w-3.5 h-3.5 text-slate-950" />
              <span>Punjab Education Foundation (PEF) Official Desk</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Punjab Education Foundation (PEF) Updates & Portals
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Complete updates for 2.6+ million students, 4,000+ partner private schools, teachers, and job applicants across Punjab. Get authentic guidelines on Quality Assurance Test (QAT 2026), FAS per-child subsidies, Education Voucher Scheme (EVS), New School Program (NSP), CPD Teacher Training, and PEF Officer recruitments.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <ShareButton variant="amber" />
            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent('Hello Educare Help Desk (03451291610), I need guidance regarding PEF programs, QAT 2026, or partner school registration.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>PEF Support Desk</span>
            </a>
          </div>
        </div>

        {/* Highlight Metrics */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-900/80 border border-emerald-600/50 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">2.6 Million+</div>
            <div className="text-slate-300 text-[11px]">Free Enrolled Students</div>
          </div>
          <div className="bg-slate-900/80 border border-emerald-600/50 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">67% Benchmark</div>
            <div className="text-slate-300 text-[11px]">Mandatory QAT Passing Rate</div>
          </div>
          <div className="bg-slate-900/80 border border-emerald-600/50 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">Up to PKR 1,600</div>
            <div className="text-slate-300 text-[11px]">Monthly Student Subsidy</div>
          </div>
          <div className="bg-slate-900/80 border border-emerald-600/50 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">3,500+ Schools</div>
            <div className="text-slate-300 text-[11px]">Partner Private Network</div>
          </div>
        </div>
      </div>

      {/* Dedicated QAT 2026 Urgent Notice Box */}
      <div className="bg-amber-50 rounded-2xl border-2 border-amber-400 p-4 sm:p-5 shadow-sm space-y-3">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-400 rounded-xl text-slate-950 shrink-0 mt-0.5">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-md">
                Critical Directive for All Partner Schools
              </span>
              <span className="text-xs font-bold text-amber-950">Active Academic Session 2026</span>
            </div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-950">
              Quality Assurance Test (QAT 2026) Passing Benchmark & Exam Conduct
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              All Foundation Assisted Schools (FAS), EVS, and NSP partners must prepare students according to the Single National Curriculum (SNC). Partner institutions that fail to secure at least <strong>67% passing rate</strong> face a 10% penalty warning, and de-affiliation upon a second failure.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-xs">
          <div className="bg-white p-3 rounded-xl border border-amber-200">
            <span className="font-bold text-slate-900 block">Core Subjects Tested:</span>
            <span className="text-slate-600">English, Urdu, Mathematics & General Science</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-amber-200">
            <span className="font-bold text-slate-900 block">Evaluation Method:</span>
            <span className="text-slate-600">Computerized OMR Bubble Sheets with MCQs</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-amber-200">
            <span className="font-bold text-slate-900 block">Invigilation:</span>
            <span className="text-slate-600">External PEF QA teams; teachers barred from rooms</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search PEF initiatives (e.g. QAT, FAS, EVS, NSP, CPD, QAO, MEO, Subsidy)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {filterTabs.map((tab) => (
            <button
              key={tab.code}
              onClick={() => setSelectedCode(tab.code)}
              className={`px-3.5 py-2 rounded-xl font-bold whitespace-nowrap transition-all border ${
                selectedCode === tab.code
                  ? 'bg-emerald-800 text-white border-emerald-950 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* PEF Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-3xl border-2 border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 sm:p-6 space-y-4">
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
                  {getProgramIcon(prog.code)}
                </div>
                <div className="space-y-0.5">
                  <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-300">
                    {prog.category}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug font-serif">
                    {prog.title}
                  </h3>
                  {prog.urduTitle && (
                    <div className="text-xs font-semibold text-emerald-800 font-serif" dir="rtl">
                      {prog.urduTitle}
                    </div>
                  )}
                </div>
              </div>

              {/* Status and Beneficiaries Box */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Current Status:</span>
                  <span className="text-emerald-700 font-bold">{prog.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Scope:</span>
                  <span className="text-slate-600 truncate max-w-[210px]">{prog.beneficiaries}</span>
                </div>
                {prog.monthlySubsidyRate && (
                  <div className="flex items-start justify-between gap-2 pt-1 border-t border-slate-200">
                    <span className="font-bold text-slate-900 shrink-0">Subsidy Rate:</span>
                    <span className="text-slate-800 font-semibold text-right">{prog.monthlySubsidyRate}</span>
                  </div>
                )}
              </div>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {prog.summary}
              </p>

              {/* Key Features */}
              <div className="space-y-1.5">
                <div className="text-xs font-extrabold text-slate-900">Key Features:</div>
                <ul className="space-y-1">
                  {prog.keyFeatures.slice(0, 3).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedProgram(prog)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 hover:text-emerald-700 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>SOPs & Guidelines</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={prog.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <span>PEF Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-5 flex items-start justify-between gap-3 shrink-0 border-b border-emerald-800">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  {selectedProgram.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif">{selectedProgram.title}</h3>
                <p className="text-xs text-emerald-200">{selectedProgram.status}</p>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {/* Summary Box */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <div className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">Program Overview</div>
                <p className="text-slate-800 leading-relaxed">{selectedProgram.summary}</p>
                {selectedProgram.monthlySubsidyRate && (
                  <div className="text-xs font-bold text-emerald-900 pt-1">
                    Subsidy Breakdown: {selectedProgram.monthlySubsidyRate}
                  </div>
                )}
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Program Features & Benefits:</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedProgram.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-2 shrink-0"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SOPs and Guidelines */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Standard Operating Procedures (SOPs):</span>
                </h4>
                <div className="space-y-2 pl-2">
                  {selectedProgram.sopAndGuidelines.map((sop, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{sop}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Eligibility or Passing Benchmark */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Passing / Evaluation Benchmark:</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedProgram.eligibilityOrPassingCriteria.map((crit, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official Office & Helpline */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1 text-xs text-slate-800">
                <div className="font-bold">Official PEF Department & Portal:</div>
                <div className="text-slate-700">{selectedProgram.officialPortal}</div>
                <div className="text-slate-600">PEF Helpline: {selectedProgram.helpline}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need information on PEF: "${selectedProgram.title}".`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk Guidance</span>
              </a>

              <a
                href={selectedProgram.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
              >
                <span>Visit PEF Official Portal</span>
                <ExternalLink className="w-4 h-4 text-amber-300" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
