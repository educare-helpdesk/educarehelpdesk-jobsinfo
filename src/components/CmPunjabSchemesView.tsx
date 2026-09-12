import React, { useState, useMemo } from 'react';
import { CM_PUNJAB_SCHEMES, CmPunjabScheme } from '../data/schemesAndScholarshipsData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import {
  GraduationCap,
  Laptop,
  Bike,
  Sun,
  Briefcase,
  HeartHandshake,
  Milk,
  Search,
  CheckCircle2,
  ExternalLink,
  FileText,
  Phone,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Info,
  Layers,
  X,
  Award
} from 'lucide-react';

export const CmPunjabSchemesView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScheme, setSelectedScheme] = useState<CmPunjabScheme | null>(null);

  const categories = [
    'All',
    'Higher Education',
    'Technology & Laptops',
    'Transport & Mobility',
    'Employment & Internship',
    'Energy & Solar',
    'Special Assistance',
    'Health & Nutrition'
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Higher Education':
        return <GraduationCap className="w-5 h-5 text-emerald-600" />;
      case 'Technology & Laptops':
        return <Laptop className="w-5 h-5 text-blue-600" />;
      case 'Transport & Mobility':
        return <Bike className="w-5 h-5 text-amber-600" />;
      case 'Employment & Internship':
        return <Briefcase className="w-5 h-5 text-indigo-600" />;
      case 'Energy & Solar':
        return <Sun className="w-5 h-5 text-orange-600" />;
      case 'Special Assistance':
        return <HeartHandshake className="w-5 h-5 text-purple-600" />;
      case 'Health & Nutrition':
        return <Milk className="w-5 h-5 text-rose-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

  const filteredSchemes = useMemo(() => {
    return CM_PUNJAB_SCHEMES.filter((scheme) => {
      const matchesCat =
        selectedCategory === 'All' || scheme.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        scheme.title.toLowerCase().includes(q) ||
        (scheme.urduTitle && scheme.urduTitle.includes(q)) ||
        scheme.targetAudience.toLowerCase().includes(q) ||
        scheme.benefitSummary.toLowerCase().includes(q) ||
        scheme.keyHighlights.some((h) => h.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Schemes Intro Hero */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-500 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow-sm">
              <Award className="w-3.5 h-3.5 text-slate-950" />
              <span>Chief Minister Maryam Nawaz Sharif Youth & Student Initiatives 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-white">
              CM Punjab Student Welfare & Youth Schemes
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Official centralized portal for all active student schemes launched by the Government of the Punjab: 100% Honhaar Undergraduate Scholarships, Free Core i7 Laptops, 0% Interest E-Bikes, Paid Graduate Internships, Roshan Gharana Solar, and Himmat Cards.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <ShareButton variant="amber" />
            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent('Hello Educare Help Desk (03451291610), I need online application assistance for CM Punjab Student Schemes.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md border border-emerald-400"
            >
              <MessageCircle className="w-4 h-4 text-emerald-100" />
              <span>Apply Assistance Desk</span>
            </a>
          </div>
        </div>

        {/* Quick Highlights Bar */}
        <div className="pt-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-slate-900/80 border border-emerald-600/60 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">30,000+</div>
            <div className="text-slate-300 text-[11px]">Honhaar Scholarships</div>
          </div>
          <div className="bg-slate-900/80 border border-emerald-600/60 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">Core i7</div>
            <div className="text-slate-300 text-[11px]">Free Student Laptops</div>
          </div>
          <div className="bg-slate-900/80 border border-emerald-600/60 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">20,000+</div>
            <div className="text-slate-300 text-[11px]">E-Bikes & Scooties</div>
          </div>
          <div className="bg-slate-900/80 border border-emerald-600/60 p-2.5 rounded-xl">
            <div className="text-amber-300 font-extrabold text-sm">PKR 25,000</div>
            <div className="text-slate-300 text-[11px]">Monthly Internship Stipend</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search CM Punjab schemes (e.g. Honhaar, Laptop, E-Bikes, Solar, CIP, Himmat)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border-2 border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 sm:p-6 space-y-4">
              {/* Card Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0 shadow-xs">
                    {getCategoryIcon(scheme.category)}
                  </div>
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-950 border border-emerald-300 mb-1">
                      {scheme.badge}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-950 leading-snug font-serif">
                      {scheme.title}
                    </h3>
                    {scheme.urduTitle && (
                      <div className="text-xs font-semibold text-emerald-800 font-serif" dir="rtl">
                        {scheme.urduTitle}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Launched By and Budget */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Total Program Budget:</span>
                  <span className="font-black text-emerald-800">{scheme.budget}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Target Group:</span>
                  <span className="text-slate-600 truncate max-w-[200px]">{scheme.targetAudience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Current Status:</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    {scheme.status}
                  </span>
                </div>
              </div>

              {/* Benefit Summary */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {scheme.benefitSummary}
              </p>

              {/* Highlights List */}
              <div className="space-y-1.5">
                <div className="text-xs font-extrabold text-slate-900">Key Program Highlights:</div>
                <ul className="space-y-1">
                  {scheme.keyHighlights.slice(0, 3).map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-emerald-900 hover:text-emerald-700 transition-colors"
              >
                <Info className="w-4 h-4" />
                <span>Eligibility & How to Apply</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <a
                href={scheme.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <span>Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
          <Info className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching schemes found</h3>
          <p className="text-xs text-slate-500">Try adjusting your category filter or search keywords.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-bold text-emerald-700 underline"
          >
            Reset all filters
          </button>
        </div>
      )}

      {/* Scheme Full Details Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150 my-auto">
            {/* Modal Header */}
            <div className="bg-emerald-950 text-white p-5 flex items-start justify-between gap-3 shrink-0 border-b border-emerald-800">
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950">
                  {selectedScheme.badge}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif">{selectedScheme.title}</h3>
                <p className="text-xs text-emerald-200">{selectedScheme.launchedBy}</p>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
              {/* Overview Box */}
              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 space-y-2">
                <div className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">Benefit Overview</div>
                <p className="text-slate-800 leading-relaxed">{selectedScheme.benefitSummary}</p>
                <div className="flex flex-wrap gap-3 pt-2 text-xs font-semibold text-emerald-900">
                  <span>💰 Budget: {selectedScheme.budget}</span>
                  <span>📍 Status: {selectedScheme.status}</span>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mandatory Eligibility Criteria:</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedScheme.eligibilityCriteria.map((crit, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Required Documents for Verification:</span>
                </h4>
                <ul className="space-y-1.5 pl-2">
                  {selectedScheme.requiredDocuments.map((doc, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0"></span>
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step How to Apply */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Step-by-Step Online Application Process:</span>
                </h4>
                <div className="space-y-2 pl-2">
                  {selectedScheme.howToApplySteps.map((step, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Official Portal & Helpline */}
              <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 space-y-1 text-xs text-amber-950">
                <div className="font-bold">Official Registration Portal & Department:</div>
                <div className="text-amber-900 font-semibold">{selectedScheme.officialPortal}</div>
                <div className="text-amber-800">Helpline: {selectedScheme.helpline}</div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 shrink-0">
              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk, I need help applying for "${selectedScheme.title}".`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk Guidance</span>
              </a>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${HELPDESK_PHONE}`}
                  className="inline-flex items-center gap-1.5 text-slate-700 hover:text-emerald-900 px-3 py-2 rounded-xl text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{HELPDESK_PHONE}</span>
                </a>

                <a
                  href={selectedScheme.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-4 h-4 text-amber-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
