import React, { useState, useMemo } from 'react';
import { AIOU_FAQS, HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ThumbsUp,
  MessageCircle,
  Phone,
  Sparkles,
  Filter,
  X,
  Copy,
  Check,
  FileText,
  GraduationCap,
  UploadCloud,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  Send,
  AlertCircle
} from 'lucide-react';

interface FaqSectionProps {
  className?: string;
  initialCategory?: string;
  onNavigateTab?: (tabId: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  className = '',
  initialCategory = 'All',
  onNavigateTab
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-1');
  const [helpfulCounts, setHelpfulCounts] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeProcedureGuide, setActiveProcedureGuide] = useState<'admission' | 'assignment' | 'exam' | 'lms'>('assignment');

  const categories = [
    'All',
    'Admissions',
    'Assignments',
    'Exams',
    'LMS & CMS',
    'General'
  ];

  // Quick suggestion chips for search
  const quickSearches = [
    'Challan Payment',
    'Assignment PDF Upload',
    'Tutor Address',
    'Roll Number Slip',
    'Passing Marks',
    'Re-appear Policy',
    'Cover Page',
    'LMS Password'
  ];

  // Filter logic
  const filteredFaqs = useMemo(() => {
    return AIOU_FAQS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();

      const qText = (item.question || item.q || '').toLowerCase();
      const aText = (item.answer || item.a || '').toLowerCase();
      const tagsText = (item.tags || []).join(' ').toLowerCase();
      const qNum = searchQuery.toLowerCase().trim();

      const matchesSearch =
        !qNum ||
        qText.includes(qNum) ||
        aText.includes(qNum) ||
        tagsText.includes(qNum);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleHelpfulClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (userVoted[id]) return;

    setUserVoted((prev) => ({ ...prev, [id]: true }));
    setHelpfulCounts((prev) => ({
      ...prev,
      [id] : (prev[id] || 0) + 1
    }));
  };

  const handleCopyAnswer = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categoryBadgeColors: Record<string, string> = {
    Admissions: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    Assignments: 'bg-indigo-100 text-indigo-950 border-indigo-300',
    Exams: 'bg-amber-100 text-amber-950 border-amber-300',
    'LMS & CMS': 'bg-teal-100 text-teal-950 border-teal-300',
    General: 'bg-slate-100 text-slate-900 border-slate-300'
  };

  return (
    <div id="aiou-faqs-container" className={`space-y-8 ${className}`}>
      {/* Top Banner Header */}
      <div
        className="rounded-3xl p-6 sm:p-10 border-2 border-emerald-700 shadow-xl space-y-6 bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 bg-emerald-950 text-white"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-xs">
              <HelpCircle className="w-4 h-4 text-slate-950" />
              <span>AIOU Official Student Help Desk & Knowledge Base</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Frequently Asked Questions & Official Procedures
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
              Step-by-step verified procedures for AIOU online registration, fee challan payments, assignment submission (Handwritten vs AAGHI LMS PDF), examination dates, roll number slips, and CMS portal support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <a
              href={`tel:${HELPDESK_PHONE}`}
              className="px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all border border-amber-500"
            >
              <Phone className="w-4 h-4 text-slate-950" />
              <span>Call: {HELPDESK_PHONE}</span>
            </a>

            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                "Hello Educare Help Desk (03451291610), I have a question about AIOU procedures."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md bg-emerald-600 hover:bg-emerald-500 text-white transition-all border border-emerald-400"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>WhatsApp Desk 24/7</span>
            </a>
          </div>
        </div>

        {/* Quick Procedure Switcher Tabs */}
        <div className="pt-4 border-t border-emerald-800/80">
          <div className="text-xs font-bold text-emerald-200 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Interactive Procedure Quick Guides:</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              onClick={() => setActiveProcedureGuide('assignment')}
              className={`p-3 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                activeProcedureGuide === 'assignment'
                  ? 'bg-white text-slate-900 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 border-emerald-700/60'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${activeProcedureGuide === 'assignment' ? 'bg-indigo-100 text-indigo-800' : 'bg-emerald-950 text-amber-300'}`}>
                <UploadCloud className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold block truncate">Assignment Submission</span>
                <span className="text-[10px] opacity-75 block truncate">LMS PDF & Postal Rules</span>
              </div>
            </button>

            <button
              onClick={() => setActiveProcedureGuide('admission')}
              className={`p-3 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                activeProcedureGuide === 'admission'
                  ? 'bg-white text-slate-900 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 border-emerald-700/60'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${activeProcedureGuide === 'admission' ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-950 text-amber-300'}`}>
                <FileText className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold block truncate">Admission & Challan</span>
                <span className="text-[10px] opacity-75 block truncate">OAS & Continuing CMS</span>
              </div>
            </button>

            <button
              onClick={() => setActiveProcedureGuide('exam')}
              className={`p-3 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                activeProcedureGuide === 'exam'
                  ? 'bg-white text-slate-900 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 border-emerald-700/60'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${activeProcedureGuide === 'exam' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-950 text-amber-300'}`}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold block truncate">Exams & Roll No Slips</span>
                <span className="text-[10px] opacity-75 block truncate">Passing Marks & Reappear</span>
              </div>
            </button>

            <button
              onClick={() => setActiveProcedureGuide('lms')}
              className={`p-3 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                activeProcedureGuide === 'lms'
                  ? 'bg-white text-slate-900 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                  : 'bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-100 border-emerald-700/60'
              }`}
            >
              <div className={`p-2 rounded-xl shrink-0 ${activeProcedureGuide === 'lms' ? 'bg-teal-100 text-teal-800' : 'bg-emerald-950 text-amber-300'}`}>
                <Layers className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold block truncate">LMS & CMS Portals</span>
                <span className="text-[10px] opacity-75 block truncate">Workshops & Credentials</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Procedure Step-by-Step Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        {activeProcedureGuide === 'assignment' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-indigo-700 bg-indigo-50 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-indigo-200">
                  <UploadCloud className="w-3.5 h-3.5" />
                  Official Guidelines
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  AIOU Assignment Submission: Complete Step-by-Step Guide
                </h3>
              </div>

              {onNavigateTab && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigateTab('cover-page')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Generate Cover Page</span>
                  </button>
                  <button
                    onClick={() => onNavigateTab('ai-solver')}
                    className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>AI Homework Helper</span>
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Box 1: Matric, FA, BA */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-indigo-200 space-y-3">
                <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-black">
                    1
                  </div>
                  <span>Matric, FA & BA / Associate Degree (Handwritten)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Write assignments cleanly on ruled paper with clear headings in blue/black ink.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Attach <strong>3 copies of AIOU 3-Part Tutor Dispatch Form</strong> to the front of each assignment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Dispatch via <strong>Pakistan Post UMS or Registered Post</strong> to your allocated tutor's address.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Keep the postal receipt safely until final results are declared on CMS.</span>
                  </li>
                </ul>
              </div>

              {/* Box 2: BS, B.Ed, Master, MPhil, PhD */}
              <div className="bg-slate-50 p-5 rounded-2xl border-2 border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-sm">
                  <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center text-xs font-black">
                    2
                  </div>
                  <span>BS (4-Yr), B.Ed, Master, MPhil & PhD (AAGHI LMS Upload)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Type assignment answers (MS Word) and convert to a <strong>single PDF under 5 MB</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Include a complete cover page with Name, Student ID, Roll No, Course Code, and Semester.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Login to <strong>aaghi.aiou.edu.pk</strong> &gt; Select Course &gt; Assignment &gt; Click <strong>"Add Submission"</strong> &gt; Upload PDF.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Ensure status turns <strong>Green "Submitted for grading"</strong> before the midnight deadline.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeProcedureGuide === 'admission' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-emerald-200">
                  <FileText className="w-3.5 h-3.5" />
                  Registration & Fees
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  AIOU Online Admission & Fee Challan Payment (4 Steps)
                </h3>
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('fee-calculator')}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Fee Estimator Calculator</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center">
                  01
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Apply on OAS / CMS</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  New students register on <strong>oas.aiou.edu.pk</strong>; continuing students enroll courses on <strong>enrollment.aiou.edu.pk</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center">
                  02
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Upload Documents</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Upload attested copies of academic certificates, CNIC/B-Form, and passport-size photograph with blue background.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center">
                  03
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Pay Fee Challan</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Pay via <strong>1Link (Prefix 999996 + Challan)</strong>, EasyPaisa, JazzCash, or bank branches of ABL, MCB, UBL, and FWBL.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-amber-300 font-black text-sm flex items-center justify-center">
                  04
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Confirmation SMS</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Confirmation SMS containing your Student ID and CMS login credentials will arrive within 4 to 6 weeks.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeProcedureGuide === 'exam' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-amber-900 bg-amber-50 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-amber-200">
                  <GraduationCap className="w-3.5 h-3.5" />
                  Examination Policies
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  AIOU Examination Hall Rules, Passing Criteria & Roll No Slips
                </h3>
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('exam-countdown')}
                  className="bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Exam Countdown Schedule</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-2">
                <span className="font-extrabold text-amber-950 text-sm block">1. Exam Hall Entry Essentials</span>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• Printed Roll Number Slip from CMS.</li>
                  <li>• Original Computerized CNIC or B-Form.</li>
                  <li>• Strict prohibition of mobile phones and unauthorized materials.</li>
                </ul>
              </div>

              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-2">
                <span className="font-extrabold text-emerald-950 text-sm block">2. Passing Mark Criteria</span>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• <strong>Matric, FA, BA, BS:</strong> 40% minimum in exams & assignments independently.</li>
                  <li>• <strong>B.Ed, Master, MPhil, PhD:</strong> 50% minimum passing mark threshold.</li>
                </ul>
              </div>

              <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-200 space-y-2">
                <span className="font-extrabold text-indigo-950 text-sm block">3. Re-appear (R/A) Policy</span>
                <ul className="space-y-1.5 text-slate-700">
                  <li>• If you passed assignments & workshops, only re-sit the written paper in the next semester.</li>
                  <li>• Reappear fee is billed automatically on next semester challan.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeProcedureGuide === 'lms' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-teal-800 bg-teal-50 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md border border-teal-200">
                  <Layers className="w-3.5 h-3.5" />
                  Digital Portals
                </div>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                  AAGHI LMS & CMS Portal Access & MS Teams Workshops
                </h3>
              </div>

              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('portals')}
                  className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open All Official Portals</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-teal-50/60 rounded-2xl border border-teal-200 space-y-2">
                <div className="font-bold text-teal-950 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-700" />
                  <span>CMS Portal (enrollment.aiou.edu.pk)</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Used for Course Registration, Tutor Address lookup, Semester Results, Date Sheet, Roll Number Slips, and Fee Challans.
                  Username is your Student ID (e.g. 21PBN04821).
                </p>
              </div>

              <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-200 space-y-2">
                <div className="font-bold text-purple-950 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-purple-700" />
                  <span>AAGHI LMS Portal (aaghi.aiou.edu.pk)</span>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  Used for Live Microsoft Teams Workshops and PDF assignment uploads. A minimum of <strong>70% active online attendance</strong> is compulsory in workshop sessions.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FAQ Search & Category Filter Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-emerald-700" />
              <span>Search Question & Keyword Database</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredFaqs.length} of {AIOU_FAQS.length} Verified FAQs
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              id="aiou-faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search e.g. 'challan payment', 'handwritten', 'LMS upload', 'roll number slip', 'passing marks', 'tutor address'..."
              className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Keywords Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold shrink-0">
              Popular:
            </span>
            {quickSearches.map((kw) => (
              <button
                key={kw}
                onClick={() => setSearchQuery(kw)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 transition-all border ${
                  searchQuery.toLowerCase() === kw.toLowerCase()
                    ? 'bg-emerald-800 text-white border-emerald-900'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {kw}
              </button>
            ))}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
            <span className="text-slate-400 uppercase tracking-wider text-[10px] mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Filter:
            </span>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl transition-all shrink-0 text-xs sm:text-sm ${
                    isActive
                      ? 'bg-emerald-800 text-white shadow-sm font-black'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 pt-2">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-300 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                No matching answers found for "{searchQuery}".
              </p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Need immediate help with this specific inquiry? Contact Educare Help Desk directly on WhatsApp or Call at 03451291610.
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  Reset All Filters
                </button>
                <a
                  href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                    `Hello Educare Help Desk (03451291610), I have a question about: ${searchQuery}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Ask on WhatsApp 03451291610</span>
                </a>
              </div>
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              const qTitle = faq.question || faq.q || '';
              const aText = faq.answer || faq.a || '';
              const baseHelpful = faq.helpfulCount || 60;
              const currentHelpful = baseHelpful + (helpfulCounts[faq.id] || 0);

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'bg-white border-emerald-600 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-50/90 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  {/* Accordion Question Header */}
                  <button
                    onClick={() => toggleExpand(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-3 focus:outline-none cursor-pointer"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${
                            categoryBadgeColors[faq.category] || 'bg-slate-100 text-slate-800'
                          }`}
                        >
                          {faq.category}
                        </span>

                        {faq.tags &&
                          faq.tags.slice(0, 3).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-medium text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200"
                            >
                              #{tag}
                            </span>
                          ))}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold font-serif text-slate-900 leading-snug">
                        {qTitle}
                      </h3>
                    </div>

                    <div className={`p-2 rounded-xl border shrink-0 transition-all ${
                      isExpanded
                        ? 'bg-emerald-800 text-amber-300 border-emerald-900'
                        : 'bg-white text-slate-500 border-slate-200'
                    }`}>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Answer Content */}
                  {isExpanded && (
                    <div className="px-4 pb-4 sm:px-6 sm:pb-6 space-y-4 border-t border-slate-100 pt-4 bg-slate-50/40 animate-fadeIn">
                      <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                          {aText}
                        </p>
                      </div>

                      {/* Action Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                        <div className="flex items-center gap-2">
                          {/* Helpful Counter Button */}
                          <button
                            onClick={(e) => handleHelpfulClick(e, faq.id)}
                            disabled={userVoted[faq.id]}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all text-xs font-bold border ${
                              userVoted[faq.id]
                                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                                : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <ThumbsUp
                              className={`w-3.5 h-3.5 ${
                                userVoted[faq.id]
                                  ? 'text-emerald-700 fill-emerald-700'
                                  : 'text-slate-500'
                              }`}
                            />
                            <span>
                              {userVoted[faq.id] ? 'Helpful!' : 'Helpful'} ({currentHelpful})
                            </span>
                          </button>

                          {/* Copy Answer Button */}
                          <button
                            onClick={(e) => handleCopyAnswer(e, faq.id, `${qTitle}\n\n${aText}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 transition-all text-xs"
                            title="Copy question and answer"
                          >
                            {copiedId === faq.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5 text-slate-500" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Direct WhatsApp Query CTA */}
                        <a
                          href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                            `Hello Educare Help Desk (03451291610), I need more information about this question:\n"${qTitle}"`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-extrabold text-xs bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-colors"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Ask 03451291610 on WhatsApp &rarr;</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Support Helpline Card */}
      <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="inline-block bg-amber-200 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Student Guidance & Consultation Desk
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
            Still Have Questions or Facing an LMS / CMS Issue?
          </h3>
          <p className="text-xs text-slate-700 max-w-2xl leading-relaxed">
            Educare Help Desk provides personalized guidance for course selection, admission forms, fee deposits, password resets, assignment solutions, and exam centers.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs text-xs sm:text-sm border border-slate-950"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call: {HELPDESK_PHONE}</span>
          </a>

          <a
            href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
              "Hello Educare Help Desk (03451291610), I need direct counseling support."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xs text-xs sm:text-sm border border-emerald-800"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>WhatsApp 03451291610</span>
          </a>
        </div>
      </div>
    </div>
  );
};
