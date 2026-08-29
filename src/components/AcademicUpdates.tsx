import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Sparkles, 
  RefreshCw, 
  Search, 
  ExternalLink, 
  Phone, 
  MessageCircle, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  Share2, 
  ShieldCheck, 
  Clock, 
  BookOpen, 
  GraduationCap, 
  Building, 
  Laptop, 
  FileText, 
  ArrowRight, 
  HelpCircle,
  TrendingUp,
  Tag
} from 'lucide-react';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { AcademicUpdateItem, GroundingSource } from '../types';

interface AcademicUpdatesProps {
  onNavigateTab?: (tab: string) => void;
  onOpenInquiry?: () => void;
}

const CATEGORIES = [
  { id: 'All', label: 'All Updates', icon: Globe },
  { id: 'Exams & Date Sheets', label: 'Exams & Date Sheets', icon: Calendar },
  { id: 'Admissions', label: 'Admissions 2026', icon: GraduationCap },
  { id: 'Results & Gazettes', label: 'Results & Gazettes', icon: CheckCircle2 },
  { id: 'LMS & Workshops', label: 'LMS & Workshops', icon: Laptop },
  { id: 'Tutors & Assignments', label: 'Tutors & Assignments', icon: BookOpen },
  { id: 'BISE & Punjab Boards', label: 'BISE & Punjab Boards', icon: Building },
  { id: 'HEC & Policies', label: 'HEC & Policies', icon: ShieldCheck },
];

const POPULAR_QUERIES = [
  'B.Ed Date Sheet 2026',
  'Autumn 2026 Admissions',
  'CMS Roll No Slips',
  'Aaghi LMS Workshop',
  'Assignment 2 Deadline',
  'BA/AD Result Gazette',
  'BISE Sargodha Matric Exam',
  'HEC Degree Attestation'
];

export const AcademicUpdates: React.FC<AcademicUpdatesProps> = ({ onNavigateTab, onOpenInquiry }) => {
  const [updates, setUpdates] = useState<AcademicUpdateItem[]>([]);
  const [searchSources, setSearchSources] = useState<GroundingSource[]>([]);
  const [webSearchQueries, setWebSearchQueries] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAiGrounded, setIsAiGrounded] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isQuotaNotice, setIsQuotaNotice] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchUpdates = async (cat = selectedCategory, q = searchQuery, force = false) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/academic-updates/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: cat,
          query: q,
          forceFresh: force
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && Array.isArray(data.updates)) {
          setUpdates(data.updates);
          setSearchSources(data.searchSources || []);
          setWebSearchQueries(data.webSearchQueries || []);
          setIsAiGrounded(!data.isFallback);
          setIsQuotaNotice(!!data.isQuotaNotice);
          setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }
    } catch (err) {
      console.warn('Failed to fetch academic updates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUpdates(selectedCategory, searchQuery);
  }, [selectedCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUpdates(selectedCategory, searchQuery, true);
  };

  const handleSelectQuickQuery = (query: string) => {
    setSearchQuery(query);
    fetchUpdates(selectedCategory, query, true);
  };

  const handleCopyUpdate = (item: AcademicUpdateItem) => {
    const text = `📢 *${item.title}*\n\n📌 Category: ${item.category}\n🗓️ Published: ${item.publishedDate}\n🏛️ Source: ${item.source}\n\n📝 Summary:\n${item.summary}\n\n🔑 Key Points:\n${item.keyHighlights.map(k => `• ${k}`).join('\n')}\n\n🔗 Official Link: ${item.actionUrl || 'https://aiou.edu.pk'}\n📞 Helpline Educare Desk: 03451291610`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const whatsappBaseUrl = `https://wa.me/${HELPDESK_WHATSAPP}`;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-emerald-800/80 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20"></div>

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
              </span>
              <div className="inline-flex items-center gap-1.5 bg-emerald-900/90 text-emerald-200 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider border border-emerald-600 shadow-inner">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Google Search Grounded Engine</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {lastUpdated && (
                <span className="text-[11px] text-emerald-300/80 font-medium hidden sm:inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>Synced: {lastUpdated}</span>
                </span>
              )}
              <button
                onClick={() => fetchUpdates(selectedCategory, searchQuery, true)}
                disabled={isLoading}
                className="bg-emerald-800 hover:bg-emerald-700 disabled:opacity-50 text-emerald-100 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-emerald-600 shadow-xs"
                title="Fetch latest updates via real-time search"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-300' : ''}`} />
                <span>{isLoading ? 'Searching...' : 'Refresh Live'}</span>
              </button>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-serif text-white leading-tight">
              Academic Updates & AIOU News Hub
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Real-time educational announcements, semester examination date sheets, roll number slips, admissions, LMS online workshop notifications, and BISE Sargodha board news grounded in official university data.
            </p>
          </div>

          {/* Quick Helpline Ribbon */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-emerald-900/80">
            <div className="flex items-center gap-3 text-xs text-emerald-200">
              <span className="font-semibold text-white flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Verified Official Sources:</span>
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 font-mono text-[11px]">aiou.edu.pk</span>
              <span className="bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 font-mono text-[11px] hidden sm:inline">enrollment.aiou.edu.pk</span>
              <span className="bg-emerald-900/60 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700 font-mono text-[11px] hidden md:inline">bisesargodha.edu.pk</span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${HELPDESK_PHONE}`}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-slate-950" />
                <span>Helpline: {HELPDESK_PHONE}</span>
              </a>
              <a
                href={`${whatsappBaseUrl}?text=${encodeURIComponent("Hello Educare Help Desk, I need clarification on the latest AIOU announcements.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all border border-emerald-400"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>WhatsApp Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="bg-white rounded-2xl p-5 border-2 border-slate-200 shadow-sm space-y-4">
        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, course code, program, or board (e.g. B.Ed Date Sheet, Roll No Slip, Admission, BA Result)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium focus:ring-2 focus:ring-emerald-600 focus:outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all shadow-xs shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Search Updates</span>
            </button>

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  fetchUpdates(selectedCategory, '', true);
                }}
                className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl border border-slate-300 shrink-0"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Quick Query Suggestion Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-slate-500 font-bold shrink-0 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>Popular:</span>
          </span>
          {POPULAR_QUERIES.map((q) => (
            <button
              key={q}
              onClick={() => handleSelectQuickQuery(q)}
              className={`shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors border ${
                searchQuery === q
                  ? 'bg-emerald-800 text-white border-emerald-900'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Category Filter Pills */}
        <div className="border-t border-slate-100 pt-3 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                  isSelected
                    ? 'bg-emerald-900 text-amber-300 border-emerald-950 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Google Search Grounding Metadata Banner */}
      {searchSources.length > 0 && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Grounded with Google Search Live Citations</span>
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                Gemini 3.7 Flash
              </span>
            </div>
            <p className="text-slate-300 text-[11px]">
              Information is grounded in real-time crawl data from official educational portals.
            </p>
          </div>

          {/* Sources List */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 text-[11px]">Citations:</span>
            {searchSources.slice(0, 3).map((source, idx) => (
              <a
                key={idx}
                href={source.uri}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-800 hover:bg-slate-700 text-emerald-300 text-[11px] font-mono px-2.5 py-1 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors truncate max-w-[200px]"
                title={source.title}
              >
                <span className="truncate">{source.title.replace('Allama Iqbal Open University', 'AIOU')}</span>
                <ExternalLink className="w-2.5 h-2.5 shrink-0 text-emerald-400" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Quota Notice if API rate limited */}
      {isQuotaNotice && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold text-amber-950">High-Traffic Notice: Serving Verified Educare Academic Repository</p>
            <p className="text-amber-800">
              Live Google Search quota is currently high; displaying curated, authentic AIOU & BISE 2026 notifications. All dates and instructions are verified by Educare Help Desk counselors.
            </p>
          </div>
        </div>
      )}

      {/* Main Updates Content Grid */}
      {isLoading ? (
        <div className="bg-white rounded-3xl p-12 border-2 border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto animate-spin">
            <RefreshCw className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Grounding Latest Academic Updates...
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Querying AIOU official portals, date sheet gazettes, and educational news via Google Search Grounding engine.
            </p>
          </div>
        </div>
      ) : updates.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border-2 border-slate-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 font-serif">
              No specific updates found for "{searchQuery}"
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try searching with general terms like "AIOU Exam", "Admissions 2026", "Roll No Slip", or clear the search filter.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              fetchUpdates('All', '', true);
            }}
            className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {updates.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-3xl border-2 transition-all duration-200 hover:shadow-md flex flex-col justify-between overflow-hidden ${
                  item.isUrgent
                    ? 'border-rose-300 shadow-rose-50/50'
                    : 'border-slate-200 hover:border-emerald-300'
                }`}
              >
                {/* Top Badge Strip */}
                <div className="p-5 sm:p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      {item.isUrgent && (
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                      )}
                      <span
                        className={`text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                          item.badgeType === 'urgent' || item.isUrgent
                            ? 'bg-rose-100 text-rose-900 border-rose-300'
                            : item.badgeType === 'verified'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : item.badgeType === 'new'
                            ? 'bg-purple-100 text-purple-900 border-purple-300'
                            : 'bg-blue-100 text-blue-900 border-blue-300'
                        }`}
                      >
                        {item.badge}
                      </span>

                      <span className="text-[11px] font-bold text-slate-500">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.publishedDate}</span>
                    </div>
                  </div>

                  {/* Title & Source */}
                  <div className="space-y-1.5">
                    <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-semibold">
                      <Building className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{item.source}</span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Key Highlights Checklist */}
                  {Array.isArray(item.keyHighlights) && item.keyHighlights.length > 0 && (
                    <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Key Points & Student Action Guidelines:</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {item.keyHighlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                            <span className="leading-snug">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tags */}
                  {Array.isArray(item.tags) && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-slate-100 text-slate-600 text-[10px] font-medium px-2 py-0.5 rounded-md flex items-center gap-1"
                        >
                          <Tag className="w-2.5 h-2.5 text-slate-400" />
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Bar */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    {item.actionTab && onNavigateTab && (
                      <button
                        onClick={() => onNavigateTab(item.actionTab!)}
                        className="bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
                      >
                        <span>{item.actionLabel || 'View on Educare'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {item.actionUrl && (
                      <a
                        href={item.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 border border-slate-300 transition-all shadow-2xs"
                      >
                        <span>Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                      </a>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleCopyUpdate(item)}
                      className="p-2 bg-white hover:bg-slate-100 text-slate-700 rounded-xl border border-slate-300 transition-all"
                      title="Copy Announcement Text"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={`${whatsappBaseUrl}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610), I need guidance regarding this update: ${item.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 p-2 rounded-xl font-bold transition-all shadow-2xs"
                      title="Ask on WhatsApp Desk"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Official AIOU Web Portals Fast Access Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-300">
            <Building className="w-3.5 h-3.5 text-emerald-700" />
            <span>Official University Gateways</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
            Direct Access to Official AIOU & Educational Portals
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Bookmark and access the primary portals for admissions, course enrollment, LMS workshops, and examinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="https://enrollment.aiou.edu.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-emerald-900 text-amber-300 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif group-hover:text-emerald-900">
                AIOU CMS Student Portal
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Download roll number slips, check semester results, tutor allocations, and view academic records.
              </p>
            </div>
          </a>

          <a
            href="https://lms.aiou.edu.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-900 text-purple-200 rounded-xl">
                <Laptop className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-700 transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif group-hover:text-purple-900">
                Aaghi LMS Workshop Portal
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Attend live online workshops via Microsoft Teams, download workshop schedules, and upload assignments.
              </p>
            </div>
          </a>

          <a
            href="https://oas.aiou.edu.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-900 text-blue-200 rounded-xl">
                <GraduationCap className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-700 transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif group-hover:text-blue-900">
                AIOU Online Admission (OAS)
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Fresh student admission application, prospectus download, tracking application status, and fee challans.
              </p>
            </div>
          </a>

          <a
            href="https://www.bisesargodha.edu.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-amber-500 text-slate-950 rounded-xl font-bold">
                <Building className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-700 transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif group-hover:text-amber-950">
                BISE Sargodha Official Portal
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Matric and Intermediate 9th, 10th, 11th, 12th date sheets, roll no slips, and online result verification.
              </p>
            </div>
          </a>

          <a
            href="https://dts.aiou.edu.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-teal-800 text-teal-200 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-teal-700 transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif group-hover:text-teal-900">
                Online Degree Tracking (DTS)
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Track formal degree issuance, urgent certificate applications, and verification status online.
              </p>
            </div>
          </a>

          <a
            href="https://eservices.hec.gov.pk"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-indigo-900 text-indigo-200 rounded-xl">
                <Globe className="w-5 h-5" />
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 transition-colors" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 font-serif group-hover:text-indigo-900">
                HEC Pakistan E-Services
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Higher Education Commission degree attestation, equivalence certificates, and scholarship verification.
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* WhatsApp Broadcast / Daily Alert Subscription Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 p-6 sm:p-8 rounded-3xl text-white border-2 border-emerald-700 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5 text-slate-950" />
            <span>Instant Student Broadcast</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
            Receive AIOU Updates Directly on WhatsApp
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Never miss an exam date sheet release, assignment submission deadline, or online workshop batch. Save <strong>03451291610</strong> and message "ADD" for daily broadcast alerts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <a
            href={`${whatsappBaseUrl}?text=${encodeURIComponent("Hello Educare Help Desk, please add me to the AIOU & BISE student broadcast alerts.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 text-slate-950" />
            <span>Join WhatsApp Alerts</span>
          </a>

          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="bg-emerald-950/80 hover:bg-emerald-950 text-emerald-200 font-bold px-5 py-3.5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-emerald-600 transition-all"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Call: {HELPDESK_PHONE}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
