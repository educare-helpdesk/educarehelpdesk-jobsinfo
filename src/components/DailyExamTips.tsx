import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  Share2, 
  Copy, 
  Check, 
  MessageCircle, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  RotateCcw, 
  Trophy, 
  Clock, 
  BookOpen, 
  HelpCircle,
  Flame,
  Search,
  Zap,
  Bookmark
} from 'lucide-react';
import { EXAM_SUCCESS_TIPS, ExamSuccessTip, TIP_CATEGORIES } from '../data/examTipsData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';

const LOCAL_STORAGE_READ_KEY = 'educare_read_exam_tips_v1';

interface DailyExamTipsProps {
  onOpenInquiry?: () => void;
}

export const DailyExamTips: React.FC<DailyExamTipsProps> = ({ onOpenInquiry }) => {
  const [readTipIds, setReadTipIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_READ_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All Tips');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedTipIds, setExpandedTipIds] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_READ_KEY, JSON.stringify(readTipIds));
    } catch (err) {
      console.warn('Failed to save read exam tips to local storage:', err);
    }
  }, [readTipIds]);

  // Determine Tip of the Day (Cycles by Day of Month)
  const today = new Date();
  const dayIndex = today.getDate() % EXAM_SUCCESS_TIPS.length;
  const tipOfTheDay = EXAM_SUCCESS_TIPS[dayIndex] || EXAM_SUCCESS_TIPS[0];

  const toggleReadStatus = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setReadTipIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedTipIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const markAllAsRead = () => {
    const allIds = EXAM_SUCCESS_TIPS.map((t) => t.id);
    setReadTipIds(allIds);
  };

  const resetAllReadStatus = () => {
    setReadTipIds([]);
  };

  const copyTipToClipboard = (tip: ExamSuccessTip, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = `🎯 *AIOU Exam Success Tip: ${tip.title}*\n\n💡 *Summary:* ${tip.summary}\n\n📋 *Action Checklist:*\n${tip.actionChecklist.map((c) => `• ${c}`).join('\n')}\n\n🌟 *Pro Tip:* ${tip.proTip}\n🏛️ *AIOU Context:* ${tip.aiouSpecificContext}\n\n📞 Educare Helpline: ${HELPDESK_PHONE}`;
    navigator.clipboard.writeText(text);
    setCopiedId(tip.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Filtered tips calculation
  const filteredTips = EXAM_SUCCESS_TIPS.filter((tip) => {
    const matchesCategory =
      selectedCategory === 'All Tips' || tip.category === selectedCategory;
    const isRead = readTipIds.includes(tip.id);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'read' && isRead) ||
      (statusFilter === 'unread' && !isRead);
    const matchesSearch =
      !searchQuery.trim() ||
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const totalTips = EXAM_SUCCESS_TIPS.length;
  const readCount = readTipIds.length;
  const progressPercent = Math.round((readCount / totalTips) * 100);

  const whatsappBaseUrl = `https://wa.me/${HELPDESK_WHATSAPP}`;

  return (
    <div className="space-y-6 pt-2">
      {/* Section Header & Progress Badge */}
      <div className="bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-emerald-800/80 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              <Zap className="w-3 h-3 text-slate-950 fill-slate-950" />
              <span>Persistent Daily Success Strategies</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>AIOU Daily Exam Success Tips & Scoring Tactics</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Proven paper presentation techniques, 35-minute timing formulas, and high-scoring guidelines. Track your read progress with automatic local storage persistence.
            </p>
          </div>

          {/* Read Status Progress Counter */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-right space-y-2 shrink-0 min-w-[200px]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-bold flex items-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>Tips Completed:</span>
              </span>
              <span className="font-mono font-bold text-amber-400">
                {readCount} / {totalTips} ({progressPercent}%)
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">
                {progressPercent === 100
                  ? '🏆 Exam Master Ready!'
                  : progressPercent > 50
                  ? '⚡ Halfway Mastered'
                  : '📖 Keep Learning'}
              </span>
              <button
                onClick={readCount === totalTips ? resetAllReadStatus : markAllAsRead}
                className="text-emerald-400 hover:text-emerald-300 underline font-bold"
              >
                {readCount === totalTips ? 'Reset Progress' : 'Mark All Read'}
              </button>
            </div>
          </div>
        </div>

        {/* Tip of the Day Featured Card */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-amber-950/60 rounded-xl p-4 sm:p-5 border-2 border-amber-500/80 shadow-md relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-500/30 pb-2.5 mb-3">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                <Flame className="w-3 h-3 fill-slate-950" />
                <span>Tip of the Day (Day #{tipOfTheDay.dayNumber})</span>
              </span>
              <span className="text-xs font-bold text-amber-200">
                {tipOfTheDay.category}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={(e) => toggleReadStatus(tipOfTheDay.id, e)}
                className={`text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                  readTipIds.includes(tipOfTheDay.id)
                    ? 'bg-emerald-800 text-emerald-100 border border-emerald-600'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                }`}
              >
                {readTipIds.includes(tipOfTheDay.id) ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Completed</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-3.5 h-3.5 text-slate-950" />
                    <span>Mark as Read</span>
                  </>
                )}
              </button>

              <button
                onClick={(e) => copyTipToClipboard(tipOfTheDay, e)}
                className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all text-xs"
                title="Copy Tip"
              >
                {copiedId === tipOfTheDay.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-base sm:text-lg font-bold font-serif text-white">
              {tipOfTheDay.title}
            </h4>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {tipOfTheDay.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="bg-slate-950/80 px-3 py-1.5 rounded-lg border border-emerald-900 text-amber-300 text-[11px] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span><strong>Pro-Tip:</strong> {tipOfTheDay.proTip}</span>
              </div>

              <a
                href={`${whatsappBaseUrl}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610), I need guidance on this exam tip: ${tipOfTheDay.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-300 hover:text-emerald-200 text-xs font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Discuss with Tutor Desk</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter Controls (Category, Status & Search) */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tips by keyword (e.g. 35-minute, heading, past papers, rollout)..."
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>

            {/* Read / Unread Status Filter */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 text-xs font-bold">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  statusFilter === 'all'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All ({totalTips})
              </button>
              <button
                onClick={() => setStatusFilter('unread')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  statusFilter === 'unread'
                    ? 'bg-amber-400 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Unread ({totalTips - readCount})
              </button>
              <button
                onClick={() => setStatusFilter('read')}
                className={`px-3 py-1 rounded-lg transition-all ${
                  statusFilter === 'read'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Read ({readCount})
              </button>
            </div>
          </div>

          {/* Category Pill Filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] font-bold scrollbar-none">
            {TIP_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg shrink-0 transition-all border ${
                    isSelected
                      ? 'bg-emerald-800 text-amber-300 border-emerald-600 shadow-xs'
                      : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips List Grid */}
        <div className="space-y-3 pt-1">
          {filteredTips.length === 0 ? (
            <div className="text-center p-8 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400 text-xs space-y-2">
              <p>No tips found matching your current filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Tips');
                  setStatusFilter('all');
                  setSearchQuery('');
                }}
                className="text-amber-400 hover:underline font-bold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredTips.map((tip) => {
              const isRead = readTipIds.includes(tip.id);
              const isExpanded = !!expandedTipIds[tip.id];
              const isCopied = copiedId === tip.id;

              return (
                <div
                  key={tip.id}
                  className={`rounded-xl border transition-all overflow-hidden ${
                    isRead
                      ? 'bg-slate-950/70 border-emerald-900/60'
                      : 'bg-slate-900/90 border-slate-800 hover:border-amber-400/50 shadow-sm'
                  }`}
                >
                  {/* Summary Header Row */}
                  <div
                    onClick={() => toggleExpand(tip.id)}
                    className="p-3.5 sm:p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      {/* Checkbox Icon */}
                      <button
                        onClick={(e) => toggleReadStatus(tip.id, e)}
                        className="mt-0.5 shrink-0 transition-transform active:scale-90"
                        title={isRead ? 'Mark as Unread' : 'Mark as Read'}
                      >
                        {isRead ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-500 hover:text-amber-400" />
                        )}
                      </button>

                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-[10px]">
                          <span
                            className={`font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                              tip.impactLevel === 'Game Changer'
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-500/40'
                                : tip.impactLevel === 'High Impact'
                                ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-blue-400/20 text-blue-300 border border-blue-500/40'
                            }`}
                          >
                            {tip.badge}
                          </span>
                          <span className="text-slate-400 font-bold">
                            {tip.category}
                          </span>
                          {isRead && (
                            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-0.5">
                              <Check className="w-3 h-3" /> Read
                            </span>
                          )}
                        </div>

                        <h4
                          className={`text-sm sm:text-base font-bold font-serif ${
                            isRead ? 'text-slate-300 line-through decoration-emerald-500/50' : 'text-white'
                          }`}
                        >
                          {tip.title}
                        </h4>

                        {!isExpanded && (
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {tip.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions & Expand Trigger */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={(e) => copyTipToClipboard(tip, e)}
                        className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 transition-all text-xs"
                        title="Copy Tip"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <div className="text-slate-400 hover:text-amber-400 p-1 transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Body */}
                  {isExpanded && (
                    <div className="px-4 pb-4 pt-2 border-t border-slate-800 space-y-3 text-xs bg-slate-950/40 animate-fadeIn">
                      <p className="text-slate-300 leading-relaxed">
                        {tip.summary}
                      </p>

                      {/* Action Checklist */}
                      <div className="bg-slate-900/90 rounded-xl p-3.5 border border-slate-800 space-y-2">
                        <div className="font-bold text-amber-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                          <span>Actionable Checklist for Scoring 80%+:</span>
                        </div>
                        <ul className="space-y-1.5 text-slate-300 pl-1">
                          {tip.actionChecklist.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0"></span>
                              <span className="leading-snug">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Pro-Tip & AIOU Context */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
                        <div className="bg-amber-950/40 border border-amber-600/40 p-3 rounded-xl space-y-1">
                          <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            Examiner Insight
                          </span>
                          <p className="text-amber-200/90 text-xs">
                            {tip.proTip}
                          </p>
                        </div>

                        <div className="bg-emerald-950/40 border border-emerald-600/40 p-3 rounded-xl space-y-1">
                          <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider block flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            AIOU Specific Rule
                          </span>
                          <p className="text-emerald-200/90 text-xs">
                            {tip.aiouSpecificContext}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Quick Read Toggle & Help Desk Link */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                        <button
                          onClick={(e) => toggleReadStatus(tip.id, e)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                            isRead
                              ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                              : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-xs'
                          }`}
                        >
                          {isRead ? (
                            <>
                              <Circle className="w-3.5 h-3.5 text-slate-400" />
                              <span>Mark as Unread</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              <span>Mark as Mastered & Read</span>
                            </>
                          )}
                        </button>

                        <a
                          href={`${whatsappBaseUrl}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610), I need past papers & notes related to exam strategy: ${tip.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>Get Solved Material for this Strategy</span>
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
    </div>
  );
};
