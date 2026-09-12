import React, { useState, useMemo } from 'react';
import { STUDENT_SCHOLARSHIPS, StudentScholarship } from '../data/schemesAndScholarshipsData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import {
  GraduationCap,
  Award,
  Search,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Clock,
  Building2,
  FileText,
  DollarSign,
  Phone,
  MessageCircle,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

export const StudentScholarshipsView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScholarship, setSelectedScholarship] = useState<StudentScholarship | null>(null);

  const categories = [
    'All',
    'Provincial Merit',
    'Federal Need-Based',
    'Special Quota',
    'University Concession',
    'Endowment & Zakat',
    'Board High Achiever'
  ];

  const levels = [
    'All',
    'BS (4-Year)',
    'Intermediate',
    'B.Ed',
    'Matric',
    'Master',
    'Associate Degree'
  ];

  const filteredScholarships = useMemo(() => {
    return STUDENT_SCHOLARSHIPS.filter((schol) => {
      const matchesCat =
        selectedCategory === 'All' || schol.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'All' ||
        schol.eligibleLevels.some((lvl) =>
          lvl.toLowerCase().includes(selectedLevel.toLowerCase())
        );

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        schol.title.toLowerCase().includes(q) ||
        (schol.urduTitle && schol.urduTitle.includes(q)) ||
        schol.provider.toLowerCase().includes(q) ||
        schol.coverage.toLowerCase().includes(q) ||
        schol.description.toLowerCase().includes(q);

      return matchesCat && matchesLevel && matchesSearch;
    });
  }, [selectedCategory, selectedLevel, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-amber-500/80 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-sm">
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span>Verified Higher Education & School Scholarships Guide 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              Student Scholarships & Financial Aid Programs
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Explore active scholarships announced for Pakistani students: CM Punjab Honhaar 100% Tuition Fee Waiver, PEEF Special Quotas (Orphans, Grade 1-4, Minorities, PWDs), HEC Need-Based Grants, AIOU Fee Concessions, Mora Zakat, and Bait-ul-Mal Educational Assistance.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <ShareButton variant="amber" />
            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent('Hello Educare Help Desk (03451291610), I need assistance finding and applying for student scholarships.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>Scholarship Helpline</span>
            </a>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-900/80 border border-amber-600/40 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">100% Free</div>
            <div className="text-slate-300 text-[11px]">Tuition Fee Waivers</div>
          </div>
          <div className="bg-slate-900/80 border border-amber-600/40 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">PKR 3k - 10k</div>
            <div className="text-slate-300 text-[11px]">Monthly Living Stipends</div>
          </div>
          <div className="bg-slate-900/80 border border-amber-600/40 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">Special Quotas</div>
            <div className="text-slate-300 text-[11px]">Orphans, Minorities & PWDs</div>
          </div>
          <div className="bg-slate-900/80 border border-amber-600/40 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">All Levels</div>
            <div className="text-slate-300 text-[11px]">Matric to Postgraduate</div>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search scholarships (e.g. Honhaar, PEEF, HEC, AIOU SFSS, Mora, Bait-ul-Mal, Sargodha)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Level:</span>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs ring-1 ring-amber-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scholarships List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredScholarships.map((schol) => (
          <div
            key={schol.id}
            className="bg-white rounded-3xl border-2 border-slate-200 hover:border-amber-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 sm:p-6 space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-950 border border-amber-300">
                    {schol.category}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                    {schol.status}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug font-serif pt-1">
                  {schol.title}
                </h3>
                {schol.urduTitle && (
                  <div className="text-xs font-semibold text-emerald-800 font-serif" dir="rtl">
                    {schol.urduTitle}
                  </div>
                )}
                <div className="text-xs text-slate-500 font-medium">{schol.provider}</div>
              </div>

              {/* Coverage & Benefit Box */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                <div className="text-[11px] font-black text-emerald-950 uppercase tracking-wider">Financial Coverage:</div>
                <div className="text-sm font-extrabold text-emerald-900">{schol.coverage}</div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {schol.description}
              </p>

              {/* Eligible Levels Chips */}
              <div className="space-y-1.5">
                <div className="text-xs font-extrabold text-slate-900">Eligible Academic Levels:</div>
                <div className="flex flex-wrap gap-1.5">
                  {schol.eligibleLevels.map((lvl, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      {lvl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Benefits */}
              <div className="space-y-1">
                <div className="text-xs font-extrabold text-slate-900">Coverage Highlights:</div>
                <ul className="space-y-1">
                  {schol.benefits.slice(0, 2).map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedScholarship(schol)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-950 hover:text-amber-800 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>Eligibility & Application Steps</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={schol.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shadow-sm"
              >
                <span>Apply Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredScholarships.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching scholarships found</h3>
          <p className="text-xs text-slate-500">Try choosing a different level or resetting your search.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevel('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-amber-800 underline"
          >
            Show all scholarships
          </button>
        </div>
      )}

      {/* Scholarship Modal */}
      {selectedScholarship && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-start justify-between gap-3 shrink-0 border-b border-slate-800">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  {selectedScholarship.category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif">{selectedScholarship.title}</h3>
                <p className="text-xs text-slate-300">{selectedScholarship.provider}</p>
              </div>
              <button
                onClick={() => setSelectedScholarship(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {/* Financial Coverage Box */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1.5">
                <div className="text-xs font-black text-amber-950 uppercase tracking-wider">Financial Grant & Coverage</div>
                <div className="text-base font-black text-amber-950">{selectedScholarship.coverage}</div>
                <div className="text-xs text-amber-900 font-medium">Application Status: {selectedScholarship.deadline}</div>
              </div>

              {/* Eligibility */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Eligibility & Criteria:</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedScholarship.eligibility.map((crit, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Detailed Benefits:</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedScholarship.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0"></span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Application Steps */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>How to Apply & Submission Steps:</span>
                </h4>
                <div className="space-y-2 pl-2">
                  {selectedScholarship.applicationSteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info Box */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-1 text-xs text-slate-800">
                <div className="font-bold">Official Office / Helpline:</div>
                <div className="text-slate-700">{selectedScholarship.contactInfo}</div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need help applying for the "${selectedScholarship.title}".`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk Guidance</span>
              </a>

              <a
                href={selectedScholarship.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-md transition-all"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
