import React, { useState, useEffect } from 'react';
import { AIOU_NEWS_ALERTS, HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { AiouNewsAlert } from '../types';
import { Bell, ChevronLeft, ChevronRight, Pause, Play, ExternalLink, MessageCircle, Info, Calendar, X, ShieldAlert, Sparkles, RefreshCw, Globe } from 'lucide-react';

interface NewsTickerProps {
  onSelectTab?: (tab: string) => void;
}

export const NewsTicker: React.FC<NewsTickerProps> = ({ onSelectTab }) => {
  const [alertsList, setAlertsList] = useState<AiouNewsAlert[]>(AIOU_NEWS_ALERTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [activeAlertIndex, setActiveAlertIndex] = useState<number>(0);
  const [selectedAlertModal, setSelectedAlertModal] = useState<AiouNewsAlert | null>(null);
  const [viewMode, setViewMode] = useState<'marquee' | 'slider'>('marquee');
  const [isFetchingLive, setIsFetchingLive] = useState<boolean>(false);
  const [lastFetchedTime, setLastFetchedTime] = useState<string | null>(null);
  const [searchSources, setSearchSources] = useState<{ title: string; uri: string }[]>([]);

  // Fetch live news from Google Search API via backend endpoint
  const fetchLiveNews = async () => {
    setIsFetchingLive(true);
    try {
      const res = await fetch('/api/news/latest');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.alerts) && data.alerts.length > 0) {
          setAlertsList(data.alerts);
          if (Array.isArray(data.searchSources)) {
            setSearchSources(data.searchSources);
          }
          setLastFetchedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (err) {
      console.warn('Live Google Search news fetch failed, using default AIOU alerts:', err);
    } finally {
      setIsFetchingLive(false);
    }
  };

  useEffect(() => {
    fetchLiveNews();
  }, []);

  const filteredAlerts = selectedCategory === 'All'
    ? alertsList
    : alertsList.filter(a => a.category.toLowerCase() === selectedCategory.toLowerCase() || a.tagText.toLowerCase().includes(selectedCategory.toLowerCase()));

  // Auto-advance slider mode if not paused
  useEffect(() => {
    if (viewMode !== 'slider' || isPaused || filteredAlerts.length === 0) return;
    const interval = setInterval(() => {
      setActiveAlertIndex(prev => (prev + 1) % filteredAlerts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [viewMode, isPaused, filteredAlerts.length]);

  const handleAlertClick = (alert: AiouNewsAlert) => {
    setSelectedAlertModal(alert);
  };

  const handleAction = (alert: AiouNewsAlert) => {
    if (alert.actionTab && onSelectTab) {
      onSelectTab(alert.actionTab);
    }
    setSelectedAlertModal(null);
  };

  const currentAlert = filteredAlerts[activeAlertIndex % Math.max(1, filteredAlerts.length)] || filteredAlerts[0] || AIOU_NEWS_ALERTS[0];

  return (
    <div className="bg-slate-950 text-white border-b border-emerald-900/80 text-xs shadow-inner relative z-30">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between">
        {/* Ticker Label Badge */}
        <div className="bg-emerald-950 px-3 py-1.5 flex items-center justify-between md:justify-start gap-2 border-r border-emerald-900/60 shrink-0">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="font-extrabold text-amber-300 uppercase tracking-wider text-[11px] flex items-center gap-1 font-serif">
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span>AIOU LIVE NEWS & EXAM ALERTS</span>
            </span>

            {/* Google Search Live Grounded Badge */}
            <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-900 text-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-700">
              <Globe className="w-3 h-3 text-amber-400" />
              <span>Google Search Grounded</span>
            </span>
          </div>

          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={fetchLiveNews}
              disabled={isFetchingLive}
              className="p-1 bg-emerald-900 text-amber-300 rounded border border-emerald-700"
              title="Refresh AIOU news using Google Search"
            >
              <RefreshCw className={`w-3 h-3 ${isFetchingLive ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setViewMode(prev => prev === 'marquee' ? 'slider' : 'marquee')}
              className="text-[10px] bg-emerald-900 hover:bg-emerald-800 text-amber-300 font-bold px-2 py-0.5 rounded border border-emerald-700"
            >
              {viewMode === 'marquee' ? 'Static' : 'Scroll'}
            </button>
          </div>
        </div>

        {/* Ticker Body: Marquee or Slider */}
        <div className="flex-1 overflow-hidden py-1.5 px-3 relative flex items-center min-h-[32px]">
          {viewMode === 'marquee' ? (
            /* Continuous Marquee Scrolling Ticker */
            <div className="animate-marquee hover:pause flex items-center gap-8 cursor-pointer select-none">
              {/* Duplicate array for seamless infinite looping */}
              {[...filteredAlerts, ...filteredAlerts, ...filteredAlerts].map((alert, idx) => (
                <div
                  key={`${alert.id}-${idx}`}
                  onClick={() => handleAlertClick(alert)}
                  className="flex items-center gap-2 hover:text-amber-300 transition-colors shrink-0 group"
                >
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wide ${
                    alert.isUrgent ? 'bg-amber-400 text-slate-950' : 'bg-emerald-800 text-emerald-100'
                  }`}>
                    {alert.tagText}
                  </span>
                  <span className="font-semibold text-slate-100 group-hover:underline">
                    {alert.headline}
                  </span>
                  <span className="text-slate-400 text-[10px] hidden lg:inline">
                    ({alert.detail.slice(0, 70)}...)
                  </span>
                  <span className="text-amber-400/80 font-bold text-[10px] ml-1">
                    [Details →]
                  </span>
                  <span className="text-emerald-700 font-bold ml-3">•</span>
                </div>
              ))}
            </div>
          ) : (
            /* Step Slider Mode */
            <div className="w-full flex items-center justify-between gap-3 text-xs">
              <div
                onClick={() => handleAlertClick(currentAlert)}
                className="flex items-center gap-2 cursor-pointer hover:text-amber-300 transition-colors flex-1 truncate"
              >
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase shrink-0 ${
                  currentAlert?.isUrgent ? 'bg-amber-400 text-slate-950' : 'bg-emerald-800 text-emerald-100'
                }`}>
                  {currentAlert?.tagText}
                </span>
                <span className="font-bold text-slate-100 truncate">
                  {currentAlert?.headline}
                </span>
                <span className="text-amber-300 text-[10px] underline font-bold shrink-0 hidden sm:inline">
                  Click for Full Official Details
                </span>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-1 shrink-0 bg-slate-900 border border-slate-800 px-1 py-0.5 rounded-lg">
                <button
                  onClick={() => setActiveAlertIndex(prev => (prev - 1 + filteredAlerts.length) % filteredAlerts.length)}
                  className="p-1 hover:text-amber-300 transition-colors text-slate-400"
                  title="Previous Alert"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsPaused(prev => !prev)}
                  className="p-1 hover:text-amber-300 transition-colors text-slate-400"
                  title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
                >
                  {isPaused ? <Play className="w-3 h-3 text-emerald-400" /> : <Pause className="w-3 h-3 text-amber-400" />}
                </button>
                <button
                  onClick={() => setActiveAlertIndex(prev => (prev + 1) % filteredAlerts.length)}
                  className="p-1 hover:text-amber-300 transition-colors text-slate-400"
                  title="Next Alert"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Quick Filter, Refresh & Mode Switcher */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-900/90 px-3 py-1 border-l border-emerald-900/60 shrink-0 text-[10px] font-bold">
          {onSelectTab && (
            <button
              onClick={() => onSelectTab('academic-updates')}
              className="bg-rose-700 hover:bg-rose-600 text-white font-extrabold px-2.5 py-0.5 rounded border border-rose-500 flex items-center gap-1 transition-all"
              title="Open full Academic Updates & Search Hub"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>All Updates Hub →</span>
            </button>
          )}

          <span className="text-slate-400 uppercase tracking-wider">Filter:</span>
          {['All', 'Admission', 'Deadline', 'Workshop'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-extrabold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            onClick={fetchLiveNews}
            disabled={isFetchingLive}
            className="flex items-center gap-1 bg-emerald-900 hover:bg-emerald-800 text-amber-300 px-2 py-0.5 rounded border border-emerald-700 transition-all text-[10px]"
            title="Fetch live news from Google Search API"
          >
            <RefreshCw className={`w-3 h-3 ${isFetchingLive ? 'animate-spin' : ''}`} />
            <span>{isFetchingLive ? 'Searching...' : 'Search Live'}</span>
          </button>
        </div>
      </div>

      {/* Alert Detail Modal */}
      {selectedAlertModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 text-slate-900">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 space-y-0">
            {/* Modal Header */}
            <div className="bg-emerald-900 text-white p-5 flex items-center justify-between border-b border-emerald-800">
              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase px-2 py-0.5 rounded">
                  {selectedAlertModal.tagText}
                </span>
                <span className="text-xs font-semibold text-emerald-200">
                  {selectedAlertModal.date}
                </span>
              </div>

              <button
                onClick={() => setSelectedAlertModal(null)}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-emerald-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-lg font-bold font-serif text-slate-900 leading-snug">
                {selectedAlertModal.headline}
              </h3>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700 leading-relaxed">
                <p>{selectedAlertModal.detail}</p>
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-emerald-800 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Live Google Search Grounding</span>
                  </span>
                  {lastFetchedTime && (
                    <span className="text-slate-400 font-normal">Updated {lastFetchedTime}</span>
                  )}
                </div>
              </div>

              {/* Grounding Web Sources */}
              {searchSources.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Verified Google Search References:
                  </span>
                  <div className="space-y-1">
                    {searchSources.slice(0, 3).map((src, idx) => (
                      <a
                        key={idx}
                        href={src.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 p-2 rounded-xl text-[11px] font-semibold text-emerald-900 border border-emerald-200/80 transition-colors"
                      >
                        <span className="truncate pr-2">{src.title || src.uri}</span>
                        <ExternalLink className="w-3 h-3 text-emerald-700 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {selectedAlertModal.actionTab && (
                  <button
                    onClick={() => handleAction(selectedAlertModal)}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>Go to Relevant Educare Service</span>
                  </button>
                )}

                <a
                  href={selectedAlertModal.linkUrl || "https://aiou.edu.pk"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all border border-slate-300"
                >
                  <span>Visit Official AIOU Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
                </a>

                <a
                  href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610), I need help regarding alert: ${selectedAlertModal.headline}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Contact Educare Helpline: {HELPDESK_PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

