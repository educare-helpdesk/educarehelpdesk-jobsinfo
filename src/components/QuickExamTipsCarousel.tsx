import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Lightbulb, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  MessageCircle, 
  Flame, 
  BookOpen, 
  Clock, 
  Award, 
  ArrowRight,
  ShieldCheck,
  Zap,
  BookmarkCheck,
  BookmarkPlus,
  RefreshCw,
  Layers,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXAM_SUCCESS_TIPS, ExamSuccessTip, TIP_CATEGORIES } from '../data/examTipsData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';

interface QuickExamTipsCarouselProps {
  onNavigateTab?: (tab: string) => void;
  onOpenInquiry?: (level?: any, code?: string) => void;
}

const AUTOPLAY_INTERVAL = 6000; // 6 seconds per slide
const STORAGE_BOOKMARKS_KEY = 'educare_saved_tips_v1';

export const QuickExamTipsCarousel: React.FC<QuickExamTipsCarouselProps> = ({
  onNavigateTab,
  onOpenInquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Tips');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [direction, setDirection] = useState<number>(1);

  // Mobile Touch Swipe Handling
  const touchStartXRef = useRef<number | null>(null);
  const touchDeltaXRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null) return;
    const deltaX = touchDeltaXRef.current;
    const minSwipeDistance = 40; // 40px swipe threshold
    if (deltaX < -minSwipeDistance) {
      handleNext();
    } else if (deltaX > minSwipeDistance) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
  };

  // Filter tips based on category
  const filteredTips = selectedCategory === 'All Tips'
    ? EXAM_SUCCESS_TIPS
    : EXAM_SUCCESS_TIPS.filter(t => t.category === selectedCategory);

  // Reset current index when category changes if out of bounds
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.warn('Failed to store bookmarks', e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % filteredTips.length);
  }, [filteredTips.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(prev => (prev - 1 + filteredTips.length) % filteredTips.length);
  }, [filteredTips.length]);

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && !isHovered && filteredTips.length > 1) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, AUTOPLAY_INTERVAL);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, filteredTips.length, handleNext]);

  // Handle keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const currentTip: ExamSuccessTip = filteredTips[currentIndex] || filteredTips[0] || EXAM_SUCCESS_TIPS[0];
  const isBookmarked = bookmarkedIds.includes(currentTip?.id);

  const copyTipText = (tip: ExamSuccessTip, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = `🎯 *AIOU Study & Exam Success Tip: ${tip.title}*\n\n📌 *Summary:* ${tip.summary}\n\n📋 *Action Steps:*\n${tip.actionChecklist.map(c => `• ${c}`).join('\n')}\n\n🌟 *Examiner Insight:* ${tip.proTip}\n🏛️ *AIOU Context:* ${tip.aiouSpecificContext}\n\n📞 Educare Helpline: ${HELPDESK_PHONE}`;
    navigator.clipboard.writeText(text);
    setCopiedId(tip.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Time Management':
        return {
          bg: 'from-amber-950 via-slate-900 to-emerald-950',
          badge: 'bg-amber-400 text-slate-950 border-amber-500',
          accent: 'text-amber-400',
          border: 'border-amber-500/60',
          icon: Clock
        };
      case 'Paper Presentation':
        return {
          bg: 'from-blue-950 via-slate-900 to-teal-950',
          badge: 'bg-teal-400 text-slate-950 border-teal-500',
          accent: 'text-teal-300',
          border: 'border-teal-500/60',
          icon: FileText
        };
      case 'Preparation Sprint':
        return {
          bg: 'from-purple-950 via-slate-900 to-slate-950',
          badge: 'bg-purple-300 text-slate-950 border-purple-400',
          accent: 'text-purple-300',
          border: 'border-purple-500/60',
          icon: Layers
        };
      case 'Exam Hall Protocol':
        return {
          bg: 'from-rose-950 via-slate-900 to-slate-950',
          badge: 'bg-rose-400 text-slate-950 border-rose-500',
          accent: 'text-rose-300',
          border: 'border-rose-500/60',
          icon: ShieldCheck
        };
      case 'Scoring Strategy':
        return {
          bg: 'from-emerald-950 via-slate-900 to-amber-950',
          badge: 'bg-emerald-400 text-slate-950 border-emerald-500',
          accent: 'text-emerald-300',
          border: 'border-emerald-500/60',
          icon: Award
        };
      case 'Mental Focus':
        return {
          bg: 'from-sky-950 via-slate-900 to-indigo-950',
          badge: 'bg-sky-400 text-slate-950 border-sky-500',
          accent: 'text-sky-300',
          border: 'border-sky-500/60',
          icon: Lightbulb
        };
      default:
        return {
          bg: 'from-emerald-950 via-slate-900 to-slate-950',
          badge: 'bg-amber-400 text-slate-950 border-amber-500',
          accent: 'text-amber-300',
          border: 'border-emerald-500/60',
          icon: Zap
        };
    }
  };

  const theme = getCategoryColor(currentTip.category);
  const CategoryIcon = theme.icon;

  const whatsappUrl = `https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610), I need study guidance regarding this exam tip: ${currentTip.title}`)}`;

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      transition: { duration: 0.25, ease: 'easeIn' }
    })
  };

  return (
    <section 
      id="quick-exam-tips-carousel-section"
      className="relative overflow-hidden rounded-3xl bg-slate-900 border-2 border-emerald-600/80 shadow-xl text-white transition-all select-none sm:select-auto touch-pan-y"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar with Auto-Play Status, Categories & Controls */}
      <div className="p-3.5 sm:p-5 border-b border-slate-800/90 bg-slate-950/90 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Title & Live Badge */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-950 shadow-md shrink-0">
              <Lightbulb className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  <Flame className="w-3 h-3 fill-slate-950" />
                  <span>Quick Exam Tips</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold text-amber-300">
                  Auto-Playing
                </span>
              </div>
              <h2 className="text-sm sm:text-lg font-bold font-serif text-white flex items-center gap-1.5">
                <span>Exam Prep & Scoring Secrets</span>
                <span className="text-xs font-sans text-slate-400 font-normal hidden sm:inline">• 80%+ Scoring Guidelines</span>
              </h2>
            </div>
          </div>

          <span className="md:hidden text-[10px] font-semibold text-emerald-300/80 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 shrink-0">
            Swipe ⇄
          </span>
        </div>

        {/* Carousel Control Toolbar */}
        <div className="flex items-center justify-between md:justify-end gap-2 w-full md:w-auto">
          {/* Slide Indicator Badge */}
          <div className="bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-xl text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Tip {currentIndex + 1} of {filteredTips.length}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Play/Pause Button */}
            <button
              id="carousel-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`min-h-[40px] px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                isPlaying 
                  ? 'bg-emerald-950/80 border-emerald-600 text-emerald-300 hover:bg-emerald-900' 
                  : 'bg-amber-950/80 border-amber-600 text-amber-300 hover:bg-amber-900'
              }`}
              title={isPlaying ? 'Pause Auto-Play (or hover card)' : 'Resume Auto-Play'}
              aria-label={isPlaying ? 'Pause Carousel' : 'Play Carousel'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-emerald-300" />
                  <span className="text-[11px] hidden sm:inline">Auto-Playing</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-amber-300" />
                  <span className="text-[11px] hidden sm:inline">Paused</span>
                </>
              )}
            </button>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-xl border border-slate-800">
              <button
                id="carousel-prev-btn"
                onClick={handlePrev}
                className="min-h-[38px] min-w-[38px] flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Previous Tip (Left Arrow)"
                aria-label="Previous Tip"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                id="carousel-next-btn"
                onClick={handleNext}
                className="min-h-[38px] min-w-[38px] flex items-center justify-center hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition-all"
                title="Next Tip (Right Arrow)"
                aria-label="Next Tip"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Hub Navigation Button */}
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('exam-countdown')}
              className="hidden lg:inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500 shadow-sm transition-all"
            >
              <span>30-Day Master Tips Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Auto-Play Linear Progress Bar */}
      <div className="w-full bg-slate-950 h-1 overflow-hidden relative">
        {isPlaying && !isHovered && (
          <div 
            key={`${currentTip.id}-${currentIndex}`}
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-teal-300 h-full animate-carousel-progress"
            style={{
              animationDuration: `${AUTOPLAY_INTERVAL}ms`
            }}
          />
        )}
      </div>

      {/* Category Pills Filter */}
      <div className="px-4 sm:px-6 pt-3 pb-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-slate-950/60 border-b border-slate-800/60">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider mr-1">
          Topic:
        </span>
        {TIP_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all border ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-800 to-teal-800 text-amber-300 border-emerald-500 shadow-xs'
                  : 'bg-slate-900/90 hover:bg-slate-800 text-slate-300 border-slate-800'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Active Slide Display with AnimatePresence */}
      <div className="p-4 sm:p-7 min-h-[300px] flex flex-col justify-between relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentTip.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-4"
          >
            {/* Slide Top Metadata Row */}
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center flex-wrap gap-2">
                <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs border ${theme.badge}`}>
                  <CategoryIcon className="w-3 h-3" />
                  <span>{currentTip.badge}</span>
                </span>
                
                <span className="text-xs font-bold text-slate-300 bg-slate-800/80 px-2.5 py-0.5 rounded-md border border-slate-700">
                  {currentTip.category}
                </span>

                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                  currentTip.impactLevel === 'Game Changer'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {currentTip.impactLevel}
                </span>
              </div>

              {/* Bookmark & Copy Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleBookmark(currentTip.id, e)}
                  className={`min-h-[38px] text-xs font-bold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 ${
                    isBookmarked
                      ? 'bg-emerald-800 text-emerald-200 border-emerald-600'
                      : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title={isBookmarked ? 'Saved to Bookmarks' : 'Save Tip'}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <BookmarkPlus className="w-3.5 h-3.5 text-slate-400" />
                      <span>Save</span>
                    </>
                  )}
                </button>

                <button
                  onClick={(e) => copyTipText(currentTip, e)}
                  className="min-h-[38px] px-3 py-1.5 bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 text-xs font-bold transition-all flex items-center gap-1"
                  title="Copy Tip to Clipboard"
                >
                  {copiedId === currentTip.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Main Tip Headline */}
            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-2xl font-bold font-serif text-white tracking-tight flex items-start gap-2.5">
                <span className="text-amber-400 font-mono text-base sm:text-xl font-black shrink-0 mt-0.5">
                  #{currentTip.dayNumber}
                </span>
                <span>{currentTip.title}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                {currentTip.summary}
              </p>
            </div>

            {/* Quick Actionable Step Pills & Pro Tip */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-1">
              {/* Left 7 Cols: Actionable Checklist */}
              <div className="md:col-span-7 bg-slate-950/70 p-3.5 sm:p-4 rounded-2xl border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold text-amber-300 border-b border-slate-800/80 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Actionable Checklist (Apply in Next Paper):</span>
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-slate-200">
                  {currentTip.actionChecklist.slice(0, 3).map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-600/80 text-emerald-300 font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-snug">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right 5 Cols: Examiner Insight & AIOU Hallmark */}
              <div className="md:col-span-5 space-y-2.5 flex flex-col justify-between">
                {/* Pro-Tip Box */}
                <div className="bg-gradient-to-br from-amber-950/60 to-slate-950 p-3.5 rounded-2xl border border-amber-500/50 space-y-1.5 shadow-sm">
                  <div className="flex items-center gap-1.5 text-[11px] font-black text-amber-300 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Examiner Golden Rule</span>
                  </div>
                  <p className="text-xs text-amber-100/90 leading-relaxed font-medium">
                    {currentTip.proTip}
                  </p>
                </div>

                {/* Context Tag */}
                <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex items-start gap-2 text-xs text-slate-300">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="leading-snug text-[11px]">
                    <strong className="text-emerald-300 font-semibold">AIOU Protocol: </strong>
                    {currentTip.aiouSpecificContext}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide Dots Indicator & Quick Action Links */}
        <div className="pt-5 mt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {filteredTips.map((tip, idx) => (
              <button
                key={tip.id}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? 'w-7 bg-amber-400 shadow-sm'
                    : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                title={`Jump to Tip #${tip.dayNumber}: ${tip.title}`}
                aria-label={`Jump to tip ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-end">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
              <span>Ask Tutor on WhatsApp</span>
            </a>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('study-resources')}
                className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-xl border border-slate-700 transition-all shadow-sm"
              >
                <span>Study Schedule & Notes</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
