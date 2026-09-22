import React, { useState } from 'react';
import { ProgramLevel, ProgramInfo } from '../types';
import { AIOU_PROGRAMS, HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { GraduationCap, BookOpen, Clock, Layers, Sparkles, CheckCircle2, Phone, MessageCircle, ArrowRight, ShieldCheck, Briefcase, Building } from 'lucide-react';
import { QuickExamTipsCarousel } from './QuickExamTipsCarousel';
import { StudentQuickStats } from './StudentQuickStats';

interface ProgramsGridProps {
  onSelectProgramForAi: (level: ProgramLevel, code?: string) => void;
  onOpenInquiry: (level?: ProgramLevel) => void;
  setActiveTab: (tab: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({
  onSelectProgramForAi,
  onOpenInquiry,
  setActiveTab
}) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);

  const levels: (ProgramLevel | 'All')[] = [
    'All',
    'Matric',
    'FA / Intermediate',
    'BA / AD',
    'BS (4-Year)',
    'B.Ed',
    'Master / PGD',
    'M.Phil / MS',
    'Ph.D.'
  ];

  const filteredPrograms = selectedLevel === 'All'
    ? AIOU_PROGRAMS
    : AIOU_PROGRAMS.filter(p => p.level === selectedLevel);

  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk, I need assistance regarding AIOU programs.")}`;

  return (
    <div className="space-y-8 pb-12">
      {/* Main Hero Banner with Guaranteed 100% Solid & Gradient Visibility */}
      <section
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 bg-emerald-950 text-white p-4 sm:p-8 md:p-10 shadow-2xl border-2 border-emerald-600"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-16 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div
                className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm border border-amber-500"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                <span className="truncate">Official Educare Help Desk • 03451291610</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-serif text-white leading-tight">
                Allama Iqbal Open University <br className="hidden sm:inline" />
                <span className="text-amber-300">Matriculation to Ph.D.</span> Support Portal
              </h1>

              <p className="text-emerald-50 text-xs sm:text-base md:text-lg leading-relaxed font-medium">
                Get instant AI-powered assignment guidance, verified solved assignments, semester fee calculations, assignment cover page generation, and direct helpline support from Educare Help Desk.
              </p>

              <div className="pt-1 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                <a
                  href={`tel:${HELPDESK_PHONE}`}
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 px-5 py-3 rounded-xl font-black text-sm sm:text-base transition-all shadow-md border border-amber-500"
                >
                  <Phone className="w-5 h-5 text-slate-950" />
                  <span>Call Helpline: {HELPDESK_PHONE}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400 px-5 py-3 rounded-xl font-bold text-sm sm:text-base transition-all shadow-md"
                >
                  <MessageCircle className="w-5 h-5 text-emerald-200" />
                  <span>WhatsApp Chat</span>
                </a>

                <button
                  onClick={() => setActiveTab('bise-sargodha')}
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-600 text-white border-2 border-emerald-400 px-4 py-3 rounded-xl font-extrabold text-sm transition-all shadow-md"
                >
                  <Building className="w-4 h-4 text-amber-300" />
                  <span>BISE Sargodha</span>
                </button>

                <button
                  onClick={() => setActiveTab('exam-countdown')}
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-amber-300 border-2 border-amber-400/80 px-4 py-3 rounded-xl font-extrabold text-sm transition-all shadow-md"
                >
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Exam Timer</span>
                </button>
              </div>
            </div>

            {/* Official Picture Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md bg-white rounded-3xl p-3 border-2 border-amber-400 shadow-2xl relative group">
                <div className="rounded-2xl overflow-hidden bg-slate-950/5 border border-slate-200">
                  <img
                    src="/edu.png"
                    alt="eduCARE HELP DESK 24/7 Helpline 03451291610"
                    className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-2 px-1">
                  <a
                    href={`tel:${HELPDESK_PHONE}`}
                    className="flex-1 bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-slate-800 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>03451291610</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 text-xs sm:text-sm text-emerald-100 font-bold">
            <div
              className="flex items-center gap-2 bg-slate-900/90 text-white px-3.5 py-2.5 rounded-xl border border-emerald-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Matric, FA & BA Solved Papers</span>
            </div>
            <div
              className="flex items-center gap-2 bg-slate-900/90 text-white px-3.5 py-2.5 rounded-xl border border-emerald-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>BS & B.Ed LMS Workshop Guides</span>
            </div>
            <div
              className="flex items-center gap-2 bg-slate-900/90 text-white px-3.5 py-2.5 rounded-xl border border-emerald-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>M.Phil & Ph.D Research Support</span>
            </div>
            <div
              className="flex items-center gap-2 bg-slate-900/90 text-white px-3.5 py-2.5 rounded-xl border border-emerald-700"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>AIOU Admission Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* Student Quick-Stats Widget for Logged-In Students */}
      <StudentQuickStats
        onSelectProgramForAi={onSelectProgramForAi}
        onOpenInquiry={onOpenInquiry}
        setActiveTab={setActiveTab}
      />

      {/* Auto-Playing Quick Exam Tips Carousel */}
      <QuickExamTipsCarousel
        onNavigateTab={setActiveTab}
        onOpenInquiry={onOpenInquiry}
      />

      {/* Program Levels Navigation */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">AIOU Academic Programs</h2>
            <p className="text-xs sm:text-sm text-slate-600">Select an academic level to explore courses, fee estimates, and assignment help.</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Complete Coverage (Matric to PhD)</span>
          </div>
        </div>

        {/* Level Filters Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {levels.map((lvl) => {
            const isSelected = selectedLevel === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap border shadow-2xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-white border-emerald-900 ring-2 ring-emerald-400 scale-[1.03] shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 hover:text-emerald-950 border-slate-200'
                }`}
              >
                {lvl}
              </button>
            );
          })}
        </div>

        {/* Programs Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => {
            const isExpanded = expandedProgram === program.id;
            
            // Colorful theme per program level
            const getLevelTheme = (lvl: string) => {
              if (lvl.includes('Matric')) {
                return {
                  badge: 'bg-emerald-100 text-emerald-950 border-emerald-300',
                  topBorder: 'border-t-4 border-t-emerald-600',
                  btn: 'bg-emerald-700 hover:bg-emerald-800',
                  codeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100',
                  accentText: 'text-emerald-800'
                };
              }
              if (lvl.includes('Intermediate') || lvl.includes('FA')) {
                return {
                  badge: 'bg-blue-100 text-blue-950 border-blue-300',
                  topBorder: 'border-t-4 border-t-blue-600',
                  btn: 'bg-blue-700 hover:bg-blue-800',
                  codeBg: 'bg-blue-50 text-blue-900 border-blue-200 hover:bg-blue-100',
                  accentText: 'text-blue-800'
                };
              }
              if (lvl.includes('Associate') || lvl.includes('BA')) {
                return {
                  badge: 'bg-indigo-100 text-indigo-950 border-indigo-300',
                  topBorder: 'border-t-4 border-t-indigo-600',
                  btn: 'bg-indigo-700 hover:bg-indigo-800',
                  codeBg: 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100',
                  accentText: 'text-indigo-800'
                };
              }
              if (lvl.includes('BS')) {
                return {
                  badge: 'bg-teal-100 text-teal-950 border-teal-300',
                  topBorder: 'border-t-4 border-t-teal-600',
                  btn: 'bg-teal-700 hover:bg-teal-800',
                  codeBg: 'bg-teal-50 text-teal-900 border-teal-200 hover:bg-teal-100',
                  accentText: 'text-teal-800'
                };
              }
              if (lvl.includes('B.Ed')) {
                return {
                  badge: 'bg-amber-100 text-amber-950 border-amber-300 font-extrabold',
                  topBorder: 'border-t-4 border-t-amber-500',
                  btn: 'bg-amber-600 hover:bg-amber-700 text-white',
                  codeBg: 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100',
                  accentText: 'text-amber-800'
                };
              }
              if (lvl.includes('Postgraduate') || lvl.includes('Master')) {
                return {
                  badge: 'bg-rose-100 text-rose-950 border-rose-300',
                  topBorder: 'border-t-4 border-t-rose-600',
                  btn: 'bg-rose-700 hover:bg-rose-800',
                  codeBg: 'bg-rose-50 text-rose-900 border-rose-200 hover:bg-rose-100',
                  accentText: 'text-rose-800'
                };
              }
              if (lvl.includes('M.Phil')) {
                return {
                  badge: 'bg-purple-100 text-purple-950 border-purple-300',
                  topBorder: 'border-t-4 border-t-purple-600',
                  btn: 'bg-purple-700 hover:bg-purple-800',
                  codeBg: 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100',
                  accentText: 'text-purple-800'
                };
              }
              if (lvl.includes('Ph.D')) {
                return {
                  badge: 'bg-fuchsia-100 text-fuchsia-950 border-fuchsia-300',
                  topBorder: 'border-t-4 border-t-fuchsia-600',
                  btn: 'bg-fuchsia-800 hover:bg-fuchsia-900',
                  codeBg: 'bg-fuchsia-50 text-fuchsia-900 border-fuchsia-200 hover:bg-fuchsia-100',
                  accentText: 'text-fuchsia-900'
                };
              }
              return {
                badge: 'bg-sky-100 text-sky-950 border-sky-300',
                topBorder: 'border-t-4 border-t-sky-600',
                btn: 'bg-sky-700 hover:bg-sky-800',
                codeBg: 'bg-sky-50 text-sky-900 border-sky-200 hover:bg-sky-100',
                accentText: 'text-sky-800'
              };
            };

            const theme = getLevelTheme(program.level);

            return (
              <div
                key={program.id}
                className={`bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group ${theme.topBorder}`}
              >
                <div className="p-6 space-y-4">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <span className={`font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-md border ${theme.badge}`}>
                      {program.level}
                    </span>
                    <span className="text-xs font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md">
                      Est. PKR {program.estimatedFeePerSemester.toLocaleString()} / sem
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold text-slate-950 group-hover:${theme.accentText} transition-colors font-serif leading-snug`}>
                    {program.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {program.description}
                  </p>

                  {/* Program Meta Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      <span><strong>Duration:</strong> {program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      <span><strong>Semesters:</strong> {program.semesters}</span>
                    </div>
                  </div>

                  {/* Eligibility */}
                  <div className="text-xs text-slate-700">
                    <span className="font-semibold text-slate-900">Eligibility:</span> {program.eligibility}
                  </div>

                  {/* Popular Course Codes Tag */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider block">
                      Popular Course Codes:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {program.popularCodes.map((code) => (
                        <button
                          key={code}
                          onClick={() => onSelectProgramForAi(program.level, code)}
                          className={`${theme.codeBg} text-xs font-bold px-2.5 py-0.5 rounded-md border transition-colors flex items-center gap-1`}
                          title="Solve with AI"
                        >
                          <span>Code {code}</span>
                          <Sparkles className="w-3 h-3 text-amber-500" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Course Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                      <h4 className="font-bold text-slate-900">Sample Course Curriculum:</h4>
                      <div className="space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                        {program.coursesSample.map((course) => (
                          <div key={course.code} className="flex justify-between items-center text-slate-700 py-1 border-b border-slate-200/50 last:border-0">
                            <div>
                              <span className="font-bold text-emerald-800">[{course.code}]</span> {course.name}
                            </div>
                            <span className="text-[10px] text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                              {course.credits} Cr
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectProgramForAi(program.level)}
                      className={`flex-1 ${theme.btn} text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>AI Assignment Helper</span>
                    </button>

                    <button
                      onClick={() => setExpandedProgram(isExpanded ? null : program.id)}
                      className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors"
                    >
                      {isExpanded ? 'Hide' : 'Details'}
                    </button>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <button
                      onClick={() => onOpenInquiry(program.level)}
                      className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
                    >
                      <span>Inquire Admission</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need assistance for AIOU ${program.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>WhatsApp Help</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Prominent Educare Contact Banner */}
      <section className="bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-block bg-amber-200 text-amber-900 text-xs font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Educare Help Desk • Direct Support
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            Need Personal Guidance for AIOU Admission, Solved Assignments, or LMS?
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 max-w-2xl">
            Our student counseling desk is available to answer your questions for Matric, Intermediate, BA, BS, B.Ed, Master, M.Phil, and Ph.D programs.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call {HELPDESK_PHONE}</span>
          </a>

          <a
            href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent("Hello Educare Help Desk, I need quick assistance.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-5 py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm text-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>WhatsApp 03451291610</span>
          </a>
        </div>
      </section>
    </div>
  );
};
