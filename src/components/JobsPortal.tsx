import React, { useState, useMemo } from 'react';
import { PAKISTAN_JOB_UPDATES, PUNJAB_GOV_NOTIFICATIONS, JobItem, PunjabGovNotification } from '../data/jobData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ShareButton } from './ShareButton';
import {
  Briefcase,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  MapPin,
  GraduationCap,
  DollarSign,
  Clock,
  CheckCircle2,
  FileText,
  ChevronRight,
  MessageCircle,
  Phone,
  Sparkles,
  X,
  UserCheck,
  ShieldAlert,
  FileCheck,
  Copy,
  Check,
  Building2,
  Award,
  AlertCircle,
  BookOpen,
  Info,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const JobsPortal: React.FC = () => {
  const [activeMainTab, setActiveMainTab] = useState<'jobs' | 'notifications'>('jobs');
  
  // Jobs Filter State
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>('All');
  const [selectedJobRegion, setSelectedJobRegion] = useState<string>('All');
  const [jobSearchQuery, setJobSearchQuery] = useState<string>('');
  const [selectedJobModal, setSelectedJobModal] = useState<JobItem | null>(null);

  // Notification Filter State
  const [selectedNotifCategory, setSelectedNotifCategory] = useState<string>('All');
  const [notifSearchQuery, setNotifSearchQuery] = useState<string>('');
  const [expandedNotifId, setExpandedNotifId] = useState<string | null>('notif-1');
  const [copiedNotifId, setCopiedNotifId] = useState<string | null>(null);

  const jobCategories = [
    'All',
    'Punjab (PPSC)',
    'Educators / Teaching',
    'Punjab Police & Rescue',
    'Punjab Health & IT',
    'Federal (FPSC)',
    'General Gov',
    'AIOU Tutor'
  ];

  const jobRegions = [
    'All',
    'Punjab',
    'Federal',
    'All Pakistan',
    'AIOU Special'
  ];

  const notifCategories = [
    'All',
    'Recruitment & Age Relaxation',
    'Student Schemes & Scholarships',
    'Pay & Allowances',
    'Teacher Policies & SIS',
    'Leaves & Holidays',
    'Service Regularization',
    'Minority & Disability Quota',
    'PPSC & Testing Policies'
  ];

  const quickJobSearches = [
    'PLRA (SCO BS-14)',
    'FIA BS-14/16/17',
    'Educators BS-14',
    'State Bank (SBOTS)',
    'WAPDA & DISCOs',
    'Junior Clerk',
    'College Lecturer',
    'Police SI',
    'Punjab Food (FSO)',
    'NADRA DEO',
    'AIOU Tutor',
    'Rescue 1122',
    'Irrigation Sub-Eng',
    'Pakistan Railways'
  ];

  const quickNotifSearches = [
    'Age Relaxation',
    'Honhaar Scholarship',
    '3% Disability Quota',
    'e-Rozgaar 2.0',
    '25% Allowance',
    'e-Transfer SIS',
    'Clerk Upgradation',
    'Regularization',
    'Negative Marking',
    'E-Bikes'
  ];

  // Filtered Jobs
  const filteredJobs = useMemo(() => {
    return PAKISTAN_JOB_UPDATES.filter((job) => {
      const matchesCat =
        selectedJobCategory === 'All' ||
        job.category.toLowerCase() === selectedJobCategory.toLowerCase();

      const matchesRegion =
        selectedJobRegion === 'All' ||
        job.region.toLowerCase() === selectedJobRegion.toLowerCase();

      const q = jobSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.qualification.toLowerCase().includes(q) ||
        job.region.toLowerCase().includes(q) ||
        job.payScale.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q);

      return matchesCat && matchesRegion && matchesSearch;
    });
  }, [selectedJobCategory, selectedJobRegion, jobSearchQuery]);

  // Filtered Notifications
  const filteredNotifications = useMemo(() => {
    return PUNJAB_GOV_NOTIFICATIONS.filter((notif) => {
      const matchesCat =
        selectedNotifCategory === 'All' ||
        notif.category.toLowerCase() === selectedNotifCategory.toLowerCase();

      const q = notifSearchQuery.toLowerCase().trim();
      const tagsText = notif.tags.join(' ').toLowerCase();
      const matchesSearch =
        !q ||
        notif.title.toLowerCase().includes(q) ||
        notif.notificationNumber.toLowerCase().includes(q) ||
        notif.department.toLowerCase().includes(q) ||
        notif.summary.toLowerCase().includes(q) ||
        notif.applicableTo.toLowerCase().includes(q) ||
        tagsText.includes(q);

      return matchesCat && matchesSearch;
    });
  }, [selectedNotifCategory, notifSearchQuery]);

  const handleCopyNotification = (notif: PunjabGovNotification) => {
    const textToCopy = `📌 GOVT OF PUNJAB OFFICIAL NOTIFICATION\nRef: ${notif.notificationNumber}\nDepartment: ${notif.department}\nDate: ${notif.dateIssued}\n\nTitle: ${notif.title}\n\nSummary:\n${notif.summary}\n\nKey Directives:\n${notif.keyDirectives.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n\nApplicable To: ${notif.applicableTo}\n\nShared via Educare Student Help Desk (03451291610)`;
    
    navigator.clipboard.writeText(textToCopy);
    setCopiedNotifId(notif.id);
    setTimeout(() => setCopiedNotifId(null), 2500);
  };

  const getCategoryBadgeColor = (cat: string) => {
    switch (cat) {
      case 'Recruitment & Age Relaxation':
        return 'bg-emerald-100 text-emerald-950 border-emerald-300';
      case 'Student Schemes & Scholarships':
        return 'bg-amber-100 text-amber-950 border-amber-300';
      case 'Pay & Allowances':
        return 'bg-indigo-100 text-indigo-950 border-indigo-300';
      case 'Teacher Policies & SIS':
        return 'bg-teal-100 text-teal-950 border-teal-300';
      case 'Leaves & Holidays':
        return 'bg-purple-100 text-purple-950 border-purple-300';
      case 'Service Regularization':
        return 'bg-rose-100 text-rose-950 border-rose-300';
      case 'Minority & Disability Quota':
        return 'bg-emerald-100 text-emerald-950 border-emerald-300';
      case 'PPSC & Testing Policies':
        return 'bg-cyan-100 text-cyan-950 border-cyan-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Banner */}
      <div
        className="bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 bg-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-emerald-700 space-y-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
              <Briefcase className="w-4 h-4 text-slate-950" />
              <span>Current Jobs & Punjab Government Official Notifications (2026)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-serif text-white tracking-tight">
              Punjab Jobs, PPSC, Educators & Official Govt Notifications
            </h1>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Explore verified job openings across Punjab (PPSC, School Educators BS-14/16, Police, Health, PITB & AIOU Tutors) and read official gazetted notifications issued by S&GAD, School Education, Higher Education, and Finance Department Punjab.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <ShareButton variant="amber" />
            <a
              href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent('Hello Educare Help Desk (03451291610), I need online job apply assistance and notification verification.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-emerald-500 transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 text-emerald-200" />
              <span>Job Apply & Desk Support</span>
            </a>
          </div>
        </div>

        {/* Main Section Navigation Switcher */}
        <div className="pt-4 border-t border-emerald-800/80 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveMainTab('jobs')}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all border ${
              activeMainTab === 'jobs'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/40'
                : 'bg-emerald-900/60 hover:bg-emerald-800 text-white border-emerald-700/80'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Active Punjab & Pakistan Jobs ({PAKISTAN_JOB_UPDATES.length})</span>
          </button>

          <button
            onClick={() => setActiveMainTab('notifications')}
            className={`px-5 py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center gap-2.5 transition-all border ${
              activeMainTab === 'notifications'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md ring-2 ring-amber-300/40'
                : 'bg-emerald-900/60 hover:bg-emerald-800 text-white border-emerald-700/80'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            <span>Punjab Govt Official Notifications ({PUNJAB_GOV_NOTIFICATIONS.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: ACTIVE JOBS IN PUNJAB & PAKISTAN */}
      {activeMainTab === 'jobs' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Search & Filter Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  id="punjab-job-search-input"
                  type="text"
                  value={jobSearchQuery}
                  onChange={(e) => setJobSearchQuery(e.target.value)}
                  placeholder="Search jobs e.g. 'Educators', 'PPSC', 'Junior Clerk', 'Lecturer BS-17', 'Police SI', 'Rescue 1122'..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-inner"
                />
                {jobSearchQuery && (
                  <button
                    onClick={() => setJobSearchQuery('')}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Reset Action */}
              {(jobSearchQuery || selectedJobCategory !== 'All' || selectedJobRegion !== 'All') && (
                <button
                  onClick={() => {
                    setJobSearchQuery('');
                    setSelectedJobCategory('All');
                    setSelectedJobRegion('All');
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl border border-slate-300 transition-colors shrink-0"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Quick Keyword Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold shrink-0">
                Popular Searches:
              </span>
              {quickJobSearches.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setJobSearchQuery(kw)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 transition-all border ${
                    jobSearchQuery.toLowerCase() === kw.toLowerCase()
                      ? 'bg-emerald-800 text-white border-emerald-900 shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Region Filter Row */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-700" />
                Region:
              </span>
              {jobRegions.map((reg) => (
                <button
                  key={reg}
                  onClick={() => setSelectedJobRegion(reg)}
                  className={`px-3 py-1.5 rounded-xl transition-all shrink-0 text-xs ${
                    selectedJobRegion === reg
                      ? 'bg-amber-400 text-slate-950 font-black shadow-xs ring-1 ring-amber-400'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {reg === 'All' ? 'All Regions' : reg}
                </button>
              ))}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Category:
              </span>
              {jobCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedJobCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl transition-all shrink-0 text-xs ${
                    selectedJobCategory === cat
                      ? 'bg-emerald-800 text-white font-black shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Jobs Count Info */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>Showing {filteredJobs.length} of {PAKISTAN_JOB_UPDATES.length} Active Job Openings in Punjab & Pakistan</span>
            <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              Verified 2026 Job Advertisements
            </span>
          </div>

          {/* Job Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-300 space-y-3 p-6">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <p className="text-sm font-bold text-slate-800">
                  No job vacancies found matching "{jobSearchQuery}".
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Looking for a specific post or departmental vacancy? Ask Educare Help Desk directly on WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setJobSearchQuery('');
                    setSelectedJobCategory('All');
                    setSelectedJobRegion('All');
                  }}
                  className="bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  Reset Job Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  id={`job-card-${job.id}`}
                  className="bg-white rounded-3xl border border-slate-200 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* Card Header */}
                  <div className="p-5 sm:p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-0.5 rounded-full border ${
                        job.category === 'AIOU Tutor'
                          ? 'bg-amber-100 text-amber-950 border-amber-300'
                          : job.category.includes('PPSC')
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                          : job.category.includes('Police')
                          ? 'bg-rose-100 text-rose-950 border-rose-300'
                          : job.category.includes('Health')
                          ? 'bg-teal-100 text-teal-950 border-teal-300'
                          : 'bg-indigo-100 text-indigo-950 border-indigo-300'
                      }`}>
                        {job.category}
                      </span>

                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1 border border-slate-200">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {job.region}
                      </span>
                    </div>

                    <h3 className="text-base font-bold font-serif text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {job.title}
                    </h3>

                    <p className="text-xs font-semibold text-slate-500 border-b border-slate-100 pb-2">
                      {job.department}
                    </p>

                    {/* Key Details Grid */}
                    <div className="space-y-2 text-xs text-slate-700 pt-1">
                      <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900">Qual: </span>
                          <span className="text-slate-700">{job.qualification}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900">Pay Scale: </span>
                          <span className="text-slate-700">{job.payScale}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-bold text-slate-800">Vacancies: {job.vacancies}</span>
                        <span className="font-bold text-emerald-800 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-700" />
                          Last Date: {job.lastDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedJobModal(job)}
                      className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <span>View Criteria & How to Apply</span>
                      <ChevronRight className="w-4 h-4 text-amber-300" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: PUNJAB GOVERNMENT OFFICIAL NOTIFICATIONS */}
      {activeMainTab === 'notifications' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Notifications Search & Filter Bar */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  id="punjab-notif-search-input"
                  type="text"
                  value={notifSearchQuery}
                  onChange={(e) => setNotifSearchQuery(e.target.value)}
                  placeholder="Search notifications e.g. 'Age Relaxation', 'SORI', 'Honhaar', '25% Allowance', 'SIS e-Transfer', 'Regularization'..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-emerald-600 focus:outline-none shadow-inner"
                />
                {notifSearchQuery && (
                  <button
                    onClick={() => setNotifSearchQuery('')}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Reset Action */}
              {notifSearchQuery && (
                <button
                  onClick={() => {
                    setNotifSearchQuery('');
                    setSelectedNotifCategory('All');
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl border border-slate-300 transition-colors shrink-0"
                >
                  Reset Filter
                </button>
              )}
            </div>

            {/* Quick Keyword Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold shrink-0">
                Popular:
              </span>
              {quickNotifSearches.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setNotifSearchQuery(kw)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 transition-all border ${
                    notifSearchQuery.toLowerCase() === kw.toLowerCase()
                      ? 'bg-emerald-800 text-white border-emerald-900'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                  }`}
                >
                  {kw}
                </button>
              ))}
            </div>

            {/* Notification Category Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 scrollbar-none text-xs font-bold">
              <span className="text-slate-400 uppercase tracking-wider text-[10px] shrink-0 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                Category:
              </span>
              {notifCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedNotifCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl transition-all shrink-0 text-xs ${
                    selectedNotifCategory === cat
                      ? 'bg-emerald-800 text-white font-black shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications Count Info */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
            <span>Showing {filteredNotifications.length} of {PUNJAB_GOV_NOTIFICATIONS.length} Gazetted Punjab Government Notifications</span>
            <span className="text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Verified S&GAD & Departmental Circulars
            </span>
          </div>

          {/* Notification Cards List */}
          <div className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-300 space-y-3 p-6">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <p className="text-sm font-bold text-slate-800">
                  No notifications found for "{notifSearchQuery}".
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Need a copy of an official notification not listed here? Contact Educare Help Desk (03451291610) on WhatsApp.
                </p>
                <button
                  onClick={() => {
                    setNotifSearchQuery('');
                    setSelectedNotifCategory('All');
                  }}
                  className="bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  Reset Notification Filters
                </button>
              </div>
            ) : (
              filteredNotifications.map((notif) => {
                const isExpanded = expandedNotifId === notif.id;

                return (
                  <div
                    key={notif.id}
                    id={`notif-${notif.id}`}
                    className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                      isExpanded
                        ? 'border-emerald-600 shadow-md ring-1 ring-emerald-500/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => setExpandedNotifId(isExpanded ? null : notif.id)}
                      className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${getCategoryBadgeColor(
                              notif.category
                            )}`}
                          >
                            {notif.category}
                          </span>

                          <span className="text-[11px] font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
                            {notif.notificationNumber}
                          </span>

                          <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {notif.dateIssued}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold font-serif text-slate-900 leading-snug">
                          {notif.title}
                        </h3>

                        <p className="text-xs font-medium text-slate-500">
                          {notif.department}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                        <div
                          className={`p-2 rounded-xl border transition-all ${
                            isExpanded
                              ? 'bg-emerald-800 text-amber-300 border-emerald-900'
                              : 'bg-slate-50 text-slate-500 border-slate-200'
                          }`}
                        >
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Expandable Notification Body */}
                    {isExpanded && (
                      <div className="px-5 pb-6 sm:px-6 space-y-5 border-t border-slate-100 pt-5 bg-slate-50/40 animate-fadeIn text-xs text-slate-700">
                        {/* Summary Box */}
                        <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-1.5">
                          <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                            <Info className="w-3.5 h-3.5 text-emerald-700" />
                            Notification Summary & Official Intent
                          </span>
                          <p className="text-slate-800 leading-relaxed font-medium">
                            {notif.summary}
                          </p>
                        </div>

                        {/* Key Directives List */}
                        <div className="space-y-2">
                          <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5 uppercase tracking-wide">
                            <FileCheck className="w-3.5 h-3.5 text-amber-600" />
                            Key Clauses & Departmental Directives
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {notif.keyDirectives.map((directive, dIdx) => (
                              <div
                                key={dIdx}
                                className="bg-white p-3 rounded-xl border border-slate-200 flex items-start gap-2 shadow-2xs"
                              >
                                <span className="w-5 h-5 rounded-full bg-emerald-800 text-amber-300 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                                  {dIdx + 1}
                                </span>
                                <span className="text-slate-800 font-medium leading-relaxed">
                                  {directive}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Scope of Application */}
                        <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/80 flex items-start gap-2.5">
                          <Award className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-extrabold text-amber-950 text-[11px] block">
                              Applicability & Target Beneficiaries:
                            </span>
                            <span className="text-slate-700 text-xs">{notif.applicableTo}</span>
                          </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                          <div className="flex items-center gap-2">
                            {/* Copy Full Notification Details */}
                            <button
                              onClick={() => handleCopyNotification(notif)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 shadow-2xs transition-all text-xs"
                            >
                              {copiedNotifId === notif.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">Copied Notification!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                                  <span>Copy Official Text</span>
                                </>
                              )}
                            </button>

                            {/* Tags */}
                            <div className="hidden sm:flex items-center gap-1">
                              {notif.tags.map((t, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Direct WhatsApp Consultation */}
                          <a
                            href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                              `Hello Educare Help Desk (03451291610), I need verification / copy of Punjab Govt Notification:\n"${notif.title}" (Ref: ${notif.notificationNumber})`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-emerald-800 hover:text-emerald-950 font-extrabold text-xs bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl border border-emerald-200 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Inquire via WhatsApp 03451291610 &rarr;</span>
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
      )}

      {/* Detail & How-To-Apply Modal for Jobs */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 text-slate-900">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 sm:p-6 flex items-start justify-between border-b border-slate-800">
              <div className="space-y-1">
                <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                  {selectedJobModal.category} • {selectedJobModal.region}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
                  {selectedJobModal.title}
                </h3>
                <p className="text-xs text-slate-300 font-medium">
                  {selectedJobModal.department}
                </p>
              </div>

              <button
                onClick={() => setSelectedJobModal(null)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              {/* Highlights Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-[11px] font-bold text-emerald-900">
                <div>
                  <span className="text-slate-500 block text-[10px]">Pay Scale</span>
                  <span>{selectedJobModal.payScale}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Vacancies</span>
                  <span>{selectedJobModal.vacancies}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Age Limit</span>
                  <span>{selectedJobModal.ageLimit}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Deadline</span>
                  <span className="text-amber-800">{selectedJobModal.lastDate}</span>
                </div>
              </div>

              {/* Job Overview */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 font-serif text-sm border-b border-slate-100 pb-1">
                  Job Overview & Vacancy Description
                </h4>
                <p className="leading-relaxed text-slate-800">{selectedJobModal.description}</p>
              </div>

              {/* Eligibility Criteria */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 font-serif text-sm border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-emerald-700" />
                  <span>Eligibility & Academic Criteria</span>
                </h4>
                <ul className="space-y-1.5">
                  {selectedJobModal.criteriaList.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-slate-800 leading-relaxed">{crit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by Step How to Apply Online */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 font-serif text-sm border-b border-slate-100 pb-1 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>How to Apply Online (Step-by-Step)</span>
                </h4>
                <ol className="space-y-2">
                  {selectedJobModal.howToApplySteps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                      <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-slate-800 leading-normal">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Required Documents */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 font-serif text-sm border-b border-slate-100 pb-1">
                  Required Documents Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  {selectedJobModal.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-medium text-slate-700 flex items-center gap-1.5">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="bg-slate-50 p-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <a
                href={selectedJobModal.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <span>Visit Official Portal ({selectedJobModal.officialPortal})</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              </a>

              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                  `Hello Educare Help Desk (03451291610), I need online job form apply assistance for: ${selectedJobModal.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Educare Job Helpline: {HELPDESK_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Support & Notification Guidance Box */}
      <div className="bg-amber-50 rounded-3xl p-6 sm:p-8 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="inline-block bg-amber-200 text-amber-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Job Application & Government Policy Assistance
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
            Need Online Form Filling Assistance or Notification Guidance?
          </h3>
          <p className="text-xs text-slate-700 max-w-2xl leading-relaxed">
            Educare Help Desk (03451291610) provides complete assistance for PPSC / FPSC / Educator online form submission, 1Link PSID fee challans, age relaxation calculations, and qualification document attestation.
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
              "Hello Educare Help Desk (03451291610), I need guidance regarding Punjab Jobs and Govt Notifications."
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
