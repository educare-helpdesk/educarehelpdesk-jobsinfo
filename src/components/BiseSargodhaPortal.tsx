import React, { useState, useMemo } from 'react';
import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  FileCheck,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Layers,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
  Building,
  AlertTriangle
} from 'lucide-react';
import {
  BISE_SARGODHA_INFO,
  BISE_ADMISSION_SCHEDULES,
  BISE_DOWNLOADS_LIST,
  BISE_VERIFICATION_SERVICES,
  BISE_SAMPLE_RESULTS,
  BISE_FAQS,
  BiseResultSample
} from '../data/biseSargodhaData';
import { ShareButton } from './ShareButton';

interface BiseSargodhaPortalProps {
  initialSubTab?: 'results' | 'admissions' | 'downloads' | 'verification' | 'fee-calculator';
  onOpenInquiry?: () => void;
}

export const BiseSargodhaPortal: React.FC<BiseSargodhaPortalProps> = ({
  initialSubTab = 'results',
  onOpenInquiry
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'results' | 'admissions' | 'downloads' | 'verification' | 'fee-calculator' | 'contact'>(initialSubTab);

  // Result Search State
  const [rollInput, setRollInput] = useState<string>('');
  const [selectedExamType, setSelectedExamType] = useState<string>('all');
  const [searchedResult, setSearchedResult] = useState<BiseResultSample | null>(BISE_SAMPLE_RESULTS[0]);
  const [hasSearched, setHasSearched] = useState<boolean>(true);
  const [searchError, setSearchError] = useState<string>('');

  // Downloads Filter State
  const [downloadCategory, setDownloadCategory] = useState<string>('All');
  const [downloadSearch, setDownloadSearch] = useState<string>('');

  // Verification Fee Calculator State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(BISE_VERIFICATION_SERVICES[0].id);
  const [verificationUrgency, setVerificationUrgency] = useState<'normal' | 'urgent'>('normal');
  const [copiesCount, setCopiesCount] = useState<number>(1);

  // Admission Fee Calculator State
  const [calcLevel, setCalcLevel] = useState<'matric' | 'inter'>('matric');
  const [calcCategory, setCalcCategory] = useState<'regular' | 'private'>('private');
  const [calcGroup, setCalcGroup] = useState<'science' | 'arts'>('science');
  const [calcTiming, setCalcTiming] = useState<'single' | 'double' | 'triple'>('single');

  // Handle Result Search
  const handleSearchRoll = (roll: string) => {
    const trimmed = roll.trim();
    if (!trimmed) {
      setSearchError('Please enter a valid 6-digit Roll Number');
      return;
    }
    setSearchError('');
    setHasSearched(true);

    const found = BISE_SAMPLE_RESULTS.find(
      (r) => r.rollNumber.toLowerCase() === trimmed.toLowerCase()
    );

    if (found) {
      setSearchedResult(found);
    } else {
      // Generate realistic dynamic mock result for arbitrary roll number so users can test any roll number
      const mockObtained = 820 + Math.floor((parseInt(trimmed.slice(-3), 10) || 50) % 240);
      const isPass = mockObtained >= 363;
      const percentage = Math.round((mockObtained / 1100) * 100);
      const calculatedGrade =
        percentage >= 80 ? 'A+' : percentage >= 70 ? 'A' : percentage >= 60 ? 'B' : percentage >= 50 ? 'C' : 'D';

      const dynamicResult: BiseResultSample = {
        rollNumber: trimmed,
        studentName: 'Candidate ' + trimmed,
        fatherName: 'Guardian Name',
        examType: 'Matric Annual',
        year: '2026',
        group: 'Science (Biology)',
        registrationNo: `23-B-SGD-${trimmed.padStart(6, '0')}`,
        schoolCollege: 'Govt Higher Secondary School Sargodha',
        district: 'Sargodha',
        totalMarks: 1100,
        obtainedMarks: mockObtained,
        grade: calculatedGrade as any,
        status: isPass ? 'PASS' : 'COMPARTMENT',
        subjects: [
          { name: 'English (Compulsory)', total: 150, obtained: Math.round(mockObtained * 0.13), status: 'Pass' },
          { name: 'Urdu (Compulsory)', total: 150, obtained: Math.round(mockObtained * 0.135), status: 'Pass' },
          { name: 'Islamiyat / Pak Studies', total: 200, obtained: Math.round(mockObtained * 0.18), status: 'Pass' },
          { name: 'Mathematics', total: 150, obtained: Math.round(mockObtained * 0.14), status: 'Pass' },
          { name: 'Physics (Th + Pr)', total: 150, obtained: Math.round(mockObtained * 0.14), status: 'Pass' },
          { name: 'Chemistry (Th + Pr)', total: 150, obtained: Math.round(mockObtained * 0.135), status: 'Pass' },
          { name: 'Biology / CS (Th + Pr)', total: 150, obtained: Math.round(mockObtained * 0.14), status: 'Pass' }
        ]
      };
      setSearchedResult(dynamicResult);
    }
  };

  const handlePrintResult = () => {
    window.print();
  };

  // Filtered Downloads
  const filteredDownloads = useMemo(() => {
    return BISE_DOWNLOADS_LIST.filter((item) => {
      const matchesCat = downloadCategory === 'All' || item.category === downloadCategory;
      const matchesSearch =
        downloadSearch.trim() === '' ||
        item.title.toLowerCase().includes(downloadSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(downloadSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [downloadCategory, downloadSearch]);

  // Active Verification Service
  const currentVerService = useMemo(() => {
    return (
      BISE_VERIFICATION_SERVICES.find((s) => s.id === selectedServiceId) ||
      BISE_VERIFICATION_SERVICES[0]
    );
  }, [selectedServiceId]);

  const totalVerificationFee = useMemo(() => {
    const base = verificationUrgency === 'urgent' ? currentVerService.urgentFee : currentVerService.normalFee;
    return base * copiesCount;
  }, [currentVerService, verificationUrgency, copiesCount]);

  // Admission Fee Calculation
  const estimatedAdmissionFee = useMemo(() => {
    let base = calcLevel === 'matric' ? (calcGroup === 'science' ? 1650 : 1550) : (calcGroup === 'science' ? 1950 : 1850);
    const processing = calcLevel === 'matric' ? 650 : 750;
    const regFee = calcCategory === 'private' ? (calcLevel === 'matric' ? 1000 : 1200) : 0;
    
    let multiplier = 1;
    if (calcTiming === 'double') multiplier = 2;
    if (calcTiming === 'triple') multiplier = 3;

    return (base * multiplier) + processing + regFee;
  }, [calcLevel, calcCategory, calcGroup, calcTiming]);

  const whatsappInquiryUrl = `https://wa.me/${BISE_SARGODHA_INFO.educareHelpDeskWhatsApp}?text=${encodeURIComponent(
    `Hello Educare Help Desk, I need assistance regarding BISE Sargodha (${activeSubTab.toUpperCase()}).`
  )}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Hero Banner */}
      <div
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 bg-emerald-950 text-white p-6 sm:p-10 border-2 border-emerald-700 shadow-2xl"
      >
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div
              className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md border border-amber-500"
            >
              <Building className="w-4 h-4 text-slate-950" />
              <span>Official BISE Sargodha Facilitation Center 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <ShareButton variant="amber" />
              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all border border-emerald-400 flex items-center gap-1.5 shadow-md"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>Help Desk: {BISE_SARGODHA_INFO.educareHelpDeskPhone}</span>
              </a>
            </div>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white tracking-tight leading-tight">
              BISE Sargodha Student Portal
            </h1>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
              Complete student facilitation for <strong>Matric (9th/10th)</strong> & <strong>Intermediate (11th/12th)</strong> under Board of Intermediate & Secondary Education Sargodha. Check instant exam results, online admissions, degree/sanad verification, and official downloadable forms for <strong>Sargodha, Khushab, Mianwali & Bhakkar</strong> districts.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-emerald-800/60 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Jurisdiction</span>
              <span className="text-xs sm:text-sm font-extrabold text-white">4 Districts (SGD, KHU, MIA, BHK)</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-emerald-800/60 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">SMS Result Code</span>
              <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Send Roll to 800290
              </span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-emerald-800/60 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Board Office</span>
              <span className="text-xs sm:text-sm font-extrabold text-white">Near 49-Tail, Sargodha</span>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-emerald-800/60 backdrop-blur-xs">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">Official Portal</span>
              <a
                href={BISE_SARGODHA_INFO.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-extrabold text-emerald-300 hover:text-amber-300 flex items-center gap-1 underline underline-offset-2"
              >
                <span>bisesargodha.edu.pk</span>
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sub-Navigation Bar */}
      <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveSubTab('results')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shrink-0 border ${
            activeSubTab === 'results'
              ? 'bg-emerald-800 text-white border-emerald-900 shadow-md ring-2 ring-emerald-400/50'
              : 'bg-emerald-50 text-emerald-950 hover:bg-emerald-100 border-emerald-200'
          }`}
        >
          <Award className={`w-4 h-4 ${activeSubTab === 'results' ? 'text-amber-300' : 'text-emerald-700'}`} />
          <span>Exam Results & Gazette</span>
        </button>

        <button
          onClick={() => setActiveSubTab('admissions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shrink-0 border ${
            activeSubTab === 'admissions'
              ? 'bg-blue-800 text-white border-blue-900 shadow-md ring-2 ring-blue-400/50'
              : 'bg-blue-50 text-blue-950 hover:bg-blue-100 border-blue-200'
          }`}
        >
          <GraduationCap className={`w-4 h-4 ${activeSubTab === 'admissions' ? 'text-amber-300' : 'text-blue-700'}`} />
          <span>Online Admissions 2026</span>
        </button>

        <button
          onClick={() => setActiveSubTab('verification')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shrink-0 border ${
            activeSubTab === 'verification'
              ? 'bg-purple-800 text-white border-purple-900 shadow-md ring-2 ring-purple-400/50'
              : 'bg-purple-50 text-purple-950 hover:bg-purple-100 border-purple-200'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 ${activeSubTab === 'verification' ? 'text-amber-300' : 'text-purple-700'}`} />
          <span>Degree & Sanad Verification</span>
        </button>

        <button
          onClick={() => setActiveSubTab('downloads')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shrink-0 border ${
            activeSubTab === 'downloads'
              ? 'bg-teal-800 text-white border-teal-900 shadow-md ring-2 ring-teal-400/50'
              : 'bg-teal-50 text-teal-950 hover:bg-teal-100 border-teal-200'
          }`}
        >
          <Download className={`w-4 h-4 ${activeSubTab === 'downloads' ? 'text-amber-300' : 'text-teal-700'}`} />
          <span>Downloads & Forms</span>
        </button>

        <button
          onClick={() => setActiveSubTab('fee-calculator')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shrink-0 border ${
            activeSubTab === 'fee-calculator'
              ? 'bg-rose-800 text-white border-rose-900 shadow-md ring-2 ring-rose-400/50'
              : 'bg-rose-50 text-rose-950 hover:bg-rose-100 border-rose-200'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeSubTab === 'fee-calculator' ? 'text-amber-300' : 'text-rose-700'}`} />
          <span>Board Fee Estimator</span>
        </button>

        <button
          onClick={() => setActiveSubTab('contact')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shrink-0 ${
            activeSubTab === 'contact'
              ? 'bg-emerald-800 text-white shadow-md'
              : 'text-slate-700 hover:bg-slate-100'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>Board Office & Helpline</span>
        </button>
      </div>

      {/* ==================== TAB 1: EXAM RESULTS & GAZETTE ==================== */}
      {activeSubTab === 'results' && (
        <div className="space-y-6">
          {/* Result Search Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider block">
                  Matric & Intermediate Annual / 2nd Annual Results
                </span>
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  BISE Sargodha Online Result Search
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Enter your 6-digit Roll Number to view complete Detailed Marks Certificate (DMC), subject-wise breakdown, and grade status.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-2 rounded-xl text-xs font-bold">
                <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                <span>SMS Check: Send Roll Number to <strong>800290</strong></span>
              </div>
            </div>

            {/* Input Bar */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={rollInput}
                    onChange={(e) => setRollInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchRoll(rollInput)}
                    placeholder="Enter Roll Number (e.g. 512044, 624189, 739502)..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                  />
                </div>

                <button
                  onClick={() => handleSearchRoll(rollInput)}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold px-6 py-3 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Check Result</span>
                </button>
              </div>

              {searchError && (
                <p className="text-red-600 text-xs font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{searchError}</span>
                </p>
              )}

              {/* Sample Roll Numbers for Quick Preview */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-slate-500 font-bold">Try Sample Roll Numbers:</span>
                {BISE_SAMPLE_RESULTS.map((sample) => (
                  <button
                    key={sample.rollNumber}
                    onClick={() => {
                      setRollInput(sample.rollNumber);
                      handleSearchRoll(sample.rollNumber);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 border border-slate-200 rounded-lg font-mono font-bold text-xs transition-colors"
                  >
                    {sample.rollNumber} ({sample.examType.split(' ')[0]} {sample.grade})
                  </button>
                ))}
              </div>
            </div>

            {/* Result Display Section */}
            {hasSearched && searchedResult && (
              <div className="bg-slate-50 rounded-2xl p-5 sm:p-7 border border-emerald-200 space-y-6">
                {/* Result Top Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-800 text-amber-300 flex items-center justify-center font-bold font-serif text-xl shadow-xs">
                      {searchedResult.grade}
                    </div>
                    <div>
                      <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider block">
                        {searchedResult.examType} {searchedResult.year} • {searchedResult.group}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900">
                        {searchedResult.studentName}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium">
                        Father Name: <strong>{searchedResult.fatherName}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <div className={`px-3 py-1.5 rounded-xl font-extrabold text-xs tracking-wider border flex items-center gap-1.5 ${
                      searchedResult.status === 'PASS'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>STATUS: {searchedResult.status}</span>
                    </div>

                    <button
                      onClick={handlePrintResult}
                      className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                    >
                      <Printer className="w-4 h-4 text-slate-600" />
                      <span>Print DMC</span>
                    </button>
                  </div>
                </div>

                {/* Candidate Info Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Roll Number</span>
                    <span className="text-sm font-extrabold font-mono text-emerald-900">{searchedResult.rollNumber}</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Registration No</span>
                    <span className="text-xs font-extrabold font-mono text-slate-800">{searchedResult.registrationNo}</span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">Total Marks</span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono">
                      {searchedResult.obtainedMarks} / {searchedResult.totalMarks} ({Math.round((searchedResult.obtainedMarks / searchedResult.totalMarks) * 100)}%)
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="text-slate-500 font-bold uppercase text-[10px] block">District / Center</span>
                    <span className="text-xs font-extrabold text-slate-800">{searchedResult.district}</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 font-bold uppercase text-[10px] block">School / College Name</span>
                  <span className="font-bold text-slate-900">{searchedResult.schoolCollege}</span>
                </div>

                {/* Subject-Wise Marks Sheet Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="bg-emerald-900 text-white px-4 py-2.5 font-bold text-xs flex justify-between items-center">
                    <span>Subject-Wise Marks Breakdown</span>
                    <span className="text-[11px] text-emerald-200">Total Marks: {searchedResult.totalMarks}</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-100 text-slate-700 font-extrabold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-4">Subject Name</th>
                          <th className="py-2.5 px-4 text-center">Total Marks</th>
                          <th className="py-2.5 px-4 text-center">Obtained Marks</th>
                          <th className="py-2.5 px-4 text-center">Percentage</th>
                          <th className="py-2.5 px-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {searchedResult.subjects.map((sub, idx) => {
                          const subPct = Math.round((sub.obtained / sub.total) * 100);
                          return (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="py-2.5 px-4 font-bold text-slate-900">{sub.name}</td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-600">{sub.total}</td>
                              <td className="py-2.5 px-4 text-center font-mono font-extrabold text-emerald-900">{sub.obtained}</td>
                              <td className="py-2.5 px-4 text-center font-mono text-slate-700">{subPct}%</td>
                              <td className="py-2.5 px-4 text-center">
                                <span className={`px-2 py-0.5 rounded-md font-extrabold text-[10px] ${
                                  sub.status === 'Pass' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {sub.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-emerald-50/70 border-t-2 border-emerald-200 font-extrabold text-slate-900">
                        <tr>
                          <td className="py-3 px-4 text-emerald-950 font-serif">Grand Total & Grade</td>
                          <td className="py-3 px-4 text-center font-mono">{searchedResult.totalMarks}</td>
                          <td className="py-3 px-4 text-center font-mono text-base text-emerald-900">{searchedResult.obtainedMarks}</td>
                          <td className="py-3 px-4 text-center font-mono text-emerald-900">
                            {Math.round((searchedResult.obtainedMarks / searchedResult.totalMarks) * 100)}%
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="bg-emerald-800 text-amber-300 px-3 py-1 rounded-lg text-xs font-serif font-black shadow-xs">
                              Grade {searchedResult.grade}
                            </span>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Rechecking / Verification Action Footer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Unsatisfied with marks? Apply for <strong>Paper Rechecking</strong> within 15 days of result.</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSubTab('verification')}
                      className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Verify Sanad / DMC
                    </button>
                    <button
                      onClick={() => setActiveSubTab('downloads')}
                      className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Rechecking Form
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Official Gazette Links Card */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-amber-400 font-extrabold text-[11px] uppercase tracking-wider block">Full Institutional Gazettes</span>
                <h3 className="text-xl font-bold font-serif text-white">Download BISE Sargodha Complete Result Gazettes (PDF)</h3>
              </div>
              <a
                href="https://bisesargodha.edu.pk/gazette"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Download className="w-4 h-4" />
                <span>Official Gazette Portal</span>
              </a>
            </div>
            <p className="text-slate-300 text-xs sm:text-sm">
              School and College administrators can search results institution-wise across all tehsils of Sargodha, Bhalwal, Shahpur, Silanwali, Kot Moman, Sahiwal, Khushab, Noorpur Thal, Quaidabad, Mianwali, Isa Khel, Piplan, Bhakkar, Darya Khan, Kallurkot, and Mankera.
            </p>
          </div>
        </div>
      )}

      {/* ==================== TAB 2: ONLINE ADMISSIONS 2026 ==================== */}
      {activeSubTab === 'admissions' && (
        <div className="space-y-6">
          {/* Admission Schedules Header */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider block">
                  SSC (9th/10th) & HSSC (11th/12th) Exam Admissions
                </span>
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  BISE Sargodha Admission Schedule & Registration 2026
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Official fee schedule, submission dates (Single, Double, Triple Fee), and step-by-step instructions for Regular and Private candidates.
                </p>
              </div>

              <a
                href="https://bisesargodha.edu.pk"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5 self-start md:self-auto"
              >
                <Globe className="w-4 h-4 text-emerald-200" />
                <span>Online Admission Form Portal</span>
              </a>
            </div>

            {/* Admission Schedule Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {BISE_ADMISSION_SCHEDULES.map((sched) => (
                <div
                  key={sched.id}
                  className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                        {sched.examLevel} • {sched.category}
                      </span>
                      <h3 className="text-lg font-bold font-serif text-slate-900 mt-1">
                        {sched.session}
                      </h3>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold ${
                      sched.status === 'Open' ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {sched.status}
                    </span>
                  </div>

                  {/* Fee Dates Table */}
                  <div className="bg-white rounded-xl border border-slate-200 p-3 text-xs space-y-2 font-medium">
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">Single Fee Deadline:</span>
                      <span className="font-extrabold text-emerald-800">{sched.singleFeeDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-slate-100">
                      <span className="text-slate-600">Double Fee Deadline:</span>
                      <span className="font-extrabold text-amber-700">{sched.doubleFeeDate}</span>
                    </div>
                    <div className="flex justify-between items-center py-1">
                      <span className="text-slate-600">Triple Fee Deadline:</span>
                      <span className="font-extrabold text-red-700">{sched.tripleFeeDate}</span>
                    </div>
                  </div>

                  {/* Fee Rates */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200">
                      <span className="text-slate-600 block text-[10px]">Science Group (Base)</span>
                      <span className="font-extrabold text-emerald-900 font-mono">PKR {sched.feeScience.toLocaleString()}</span>
                    </div>
                    <div className="bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200">
                      <span className="text-slate-600 block text-[10px]">Arts / General Group</span>
                      <span className="font-extrabold text-emerald-900 font-mono">PKR {sched.feeArts.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Guidelines */}
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">Important Guidelines:</span>
                    <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                      {sched.guidelines.map((g, idx) => (
                        <li key={idx} className="leading-snug">{g}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <a
                      href={`https://wa.me/${BISE_SARGODHA_INFO.educareHelpDeskWhatsApp}?text=${encodeURIComponent(
                        `Hello Educare Desk (03451291610), I need online admission form assistance for BISE Sargodha: ${sched.session}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Need Admission Help? Contact Us</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Step-by-Step Private Admission Walkthrough */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-emerald-800 space-y-4">
              <h3 className="text-lg font-bold font-serif text-amber-300 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span>How to Submit BISE Sargodha Private Admission Form (5 Steps)</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">1</span>
                  <span className="font-bold text-white block">Online Form</span>
                  <p className="text-slate-300 text-[11px]">Visit bisesargodha.edu.pk and fill private candidate biodata, subjects & photo.</p>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">2</span>
                  <span className="font-bold text-white block">Generate Challan</span>
                  <p className="text-slate-300 text-[11px]">Download system-generated bank challan with unique barcode & PSID.</p>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">3</span>
                  <span className="font-bold text-white block">Pay Bank Fee</span>
                  <p className="text-slate-300 text-[11px]">Deposit fee at HBL, MCB branch or via 1Link 1Bill mobile banking.</p>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">4</span>
                  <span className="font-bold text-white block">Form Attestation</span>
                  <p className="text-slate-300 text-[11px]">Get printed admission form attested by a Grade 16+ Headmaster or Principal.</p>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 space-y-1">
                  <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs">5</span>
                  <span className="font-bold text-white block">Board Dispatch</span>
                  <p className="text-slate-300 text-[11px]">Submit at BISE Sargodha facilitation counter or send via registered Pakistan Post.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 3: DEGREE & SANAD VERIFICATION ==================== */}
      {activeSubTab === 'verification' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider block">
                  Certificate Verification & Sanad Tasdeeq
                </span>
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  BISE Sargodha Degree & Certificate Verification
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Official verification procedures for IBCC Attestation, Government Jobs (Punjab Police, Pak Army, PPSC, Rescue 1122), WES, Higher Studies & Duplicate Sanad.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${BISE_SARGODHA_INFO.educareHelpDeskWhatsApp}?text=${encodeURIComponent(
                    `Hello Educare Desk (03451291610), I need assistance with BISE Sargodha Degree/Sanad Verification.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-700 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>Verification Helpline: {BISE_SARGODHA_INFO.educareHelpDeskPhone}</span>
                </a>
              </div>
            </div>

            {/* Service Selector Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {BISE_VERIFICATION_SERVICES.map((srv) => (
                <button
                  key={srv.id}
                  onClick={() => setSelectedServiceId(srv.id)}
                  className={`p-4 rounded-2xl border text-left transition-all space-y-2 ${
                    selectedServiceId === srv.id
                      ? 'bg-emerald-900 text-white border-emerald-900 shadow-md ring-2 ring-emerald-600'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <ShieldCheck className={`w-5 h-5 ${selectedServiceId === srv.id ? 'text-amber-300' : 'text-emerald-700'}`} />
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                      selectedServiceId === srv.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-700'
                    }`}>
                      PKR {srv.normalFee.toLocaleString()}
                    </span>
                  </div>
                  <span className="font-bold text-xs sm:text-sm block leading-snug">
                    {srv.serviceName}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Service Detailed View */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-emerald-200 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-emerald-800 font-extrabold text-[11px] uppercase tracking-wider block">
                    Selected Verification Service
                  </span>
                  <h3 className="text-xl font-bold font-serif text-slate-900">
                    {currentVerService.serviceName}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 max-w-2xl">{currentVerService.purpose}</p>
                </div>

                {/* Urgency Toggle & Interactive Fee Calculator */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 shrink-0">
                  <span className="text-[11px] font-bold text-slate-600 block">Processing Mode & Fee:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setVerificationUrgency('normal')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${
                        verificationUrgency === 'normal'
                          ? 'bg-emerald-800 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Normal (PKR {currentVerService.normalFee})
                    </button>
                    <button
                      onClick={() => setVerificationUrgency('urgent')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-colors ${
                        verificationUrgency === 'urgent'
                          ? 'bg-amber-400 text-slate-950'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Urgent (PKR {currentVerService.urgentFee})
                    </button>
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1 flex justify-between">
                    <span>Expected Time:</span>
                    <strong className="text-slate-800">
                      {verificationUrgency === 'urgent'
                        ? currentVerService.processingDaysUrgent
                        : currentVerService.processingDaysNormal}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Two Column Layout: Required Documents & Step-by-Step Procedure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Required Documents Checklist */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm border-b border-slate-100 pb-2">
                    <FileCheck className="w-4 h-4 text-emerald-700" />
                    <span>Required Documents Checklist</span>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {currentVerService.requiredDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step-by-Step Procedure */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm border-b border-slate-100 pb-2">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <span>Step-by-Step Application Procedure</span>
                  </div>

                  <ol className="space-y-2.5 text-xs text-slate-700 list-decimal list-inside">
                    {currentVerService.procedureSteps.map((step, idx) => (
                      <li key={idx} className="leading-relaxed pl-1">
                        <span className="text-slate-800 font-medium">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 4: DOWNLOADS & FORMS CENTER ==================== */}
      {activeSubTab === 'downloads' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider block">
                  Official PDF Documents, Challans & Applications
                </span>
                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  BISE Sargodha Download Center 2026
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1">
                  Download official admission forms, NOC / Migration forms, duplicate certificate applications, paper rechecking performas, and SLO-based model papers.
                </p>
              </div>
            </div>

            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={downloadSearch}
                  onChange={(e) => setDownloadSearch(e.target.value)}
                  placeholder="Search forms (e.g. NOC, Duplicate, Rechecking, Model Papers)..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
                {['All', 'Admissions', 'Migration & NOC', 'Correction & Duplicate', 'Rechecking', 'Model Papers & Syllabus'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setDownloadCategory(cat)}
                    className={`px-3 py-2 rounded-xl transition-colors shrink-0 ${
                      downloadCategory === cat
                        ? 'bg-emerald-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Downloads Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDownloads.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-2xl p-5 border border-slate-200 hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4 hover:shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                        {item.fileType} {item.fileSize ? `(${item.fileSize})` : ''}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold font-serif text-slate-900 leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <a
                    href={item.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Form</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 5: BOARD FEE ESTIMATOR ==================== */}
      {activeSubTab === 'fee-calculator' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider block">
                Instant Fee Computation
              </span>
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                BISE Sargodha Official Fee Estimator
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Calculate total board fees including Single/Double/Triple fee slabs, registration, and processing fees for Matric and Intermediate.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Controls */}
              <div className="lg:col-span-2 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    1. Examination Level:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcLevel('matric')}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-colors border ${
                        calcLevel === 'matric'
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Matric (9th & 10th)
                    </button>
                    <button
                      onClick={() => setCalcLevel('inter')}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-colors border ${
                        calcLevel === 'inter'
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Intermediate (11th & 12th)
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    2. Candidate Status:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcCategory('regular')}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-colors border ${
                        calcCategory === 'regular'
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Regular School / College
                    </button>
                    <button
                      onClick={() => setCalcCategory('private')}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-colors border ${
                        calcCategory === 'private'
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Private Candidate
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    3. Study Group:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCalcGroup('science')}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-colors border ${
                        calcGroup === 'science'
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Science with Practicals (Pre-Med / Pre-Engg / Bio / CS)
                    </button>
                    <button
                      onClick={() => setCalcGroup('arts')}
                      className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-colors border ${
                        calcGroup === 'arts'
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Humanities / Arts / Commerce
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                    4. Fee Submission Timing:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setCalcTiming('single')}
                      className={`py-2 px-2 rounded-xl font-bold text-xs transition-colors border ${
                        calcTiming === 'single'
                          ? 'bg-emerald-800 text-white border-emerald-900'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Single Fee
                    </button>
                    <button
                      onClick={() => setCalcTiming('double')}
                      className={`py-2 px-2 rounded-xl font-bold text-xs transition-colors border ${
                        calcTiming === 'double'
                          ? 'bg-amber-500 text-slate-950 border-amber-600'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Double Fee (2x)
                    </button>
                    <button
                      onClick={() => setCalcTiming('triple')}
                      className={`py-2 px-2 rounded-xl font-bold text-xs transition-colors border ${
                        calcTiming === 'triple'
                          ? 'bg-red-600 text-white border-red-700'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      Triple Fee (3x)
                    </button>
                  </div>
                </div>
              </div>

              {/* Total Calculation Card */}
              <div className="bg-gradient-to-br from-emerald-950 to-slate-900 text-white p-6 rounded-2xl border border-emerald-800 shadow-md flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <span className="text-amber-400 text-[11px] font-extrabold uppercase tracking-wider block">
                    Estimated Total Fee
                  </span>
                  <div className="text-3xl sm:text-4xl font-black font-mono text-white">
                    PKR {estimatedAdmissionFee.toLocaleString()}
                  </div>
                  <p className="text-xs text-slate-300">
                    Includes exam fee ({calcTiming.toUpperCase()}), processing charges, and private candidate enrollment fee where applicable.
                  </p>
                </div>

                <div className="space-y-2 text-xs border-t border-emerald-900/80 pt-4 text-emerald-200">
                  <div className="flex justify-between">
                    <span>Selected Level:</span>
                    <strong className="text-white uppercase">{calcLevel} ({calcGroup})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <strong className="text-white uppercase">{calcCategory}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee Slab:</span>
                    <strong className="text-amber-300 uppercase">{calcTiming} Fee</strong>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${BISE_SARGODHA_INFO.educareHelpDeskWhatsApp}?text=${encodeURIComponent(
                    `Hello Educare Desk, I calculated BISE Sargodha ${calcLevel.toUpperCase()} admission fee (PKR ${estimatedAdmissionFee}) and need challan generation assistance.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-3 px-4 rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Get Challan & Form Support</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== TAB 6: CONTACT & BOARD DIRECTORY ==================== */}
      {activeSubTab === 'contact' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-5">
              <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider block">
                Official Board Contacts & Facilitation Desk
              </span>
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                BISE Sargodha Official Directory & Locations
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Direct phone numbers, address, and One-Window Facilitation counter details for Sargodha, Khushab, Mianwali, and Bhakkar.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-700" />
                  Board Complex Address
                </span>
                <p className="text-slate-600 leading-relaxed">{BISE_SARGODHA_INFO.address}</p>
                <span className="text-[11px] text-emerald-800 font-bold block pt-1">Timings: Monday - Friday (08:00 AM - 04:00 PM)</span>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                <span className="font-extrabold text-slate-900 block text-sm flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-700" />
                  Official Phone Directory
                </span>
                <div className="space-y-1 text-slate-700">
                  <div className="flex justify-between">
                    <span>Main Exchange:</span>
                    <strong>{BISE_SARGODHA_INFO.helplinePhone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Controller Exams:</span>
                    <strong>{BISE_SARGODHA_INFO.controllerExamsPhone}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Secretary BISE:</span>
                    <strong>{BISE_SARGODHA_INFO.secretaryPhone}</strong>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950 text-white p-5 rounded-2xl border border-emerald-800 space-y-2">
                <span className="font-extrabold text-amber-300 block text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Educare Student Help Desk
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Fast WhatsApp support for challan forms, admission submission, roll number slips, and degree verification.
                </p>
                <div className="pt-2">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-lg text-xs"
                  >
                    <span>WhatsApp: {BISE_SARGODHA_INFO.educareHelpDeskPhone}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h3 className="text-lg font-bold font-serif text-slate-900">
                Frequently Asked Questions (BISE Sargodha)
              </h3>
              <div className="space-y-2.5">
                {BISE_FAQS.map((faq, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    <span className="font-bold text-slate-900 block text-sm">{faq.q}</span>
                    <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
