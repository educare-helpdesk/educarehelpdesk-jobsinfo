import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CheckCircle2,
  Download,
  Clock,
  RotateCcw,
  X,
  Database,
  Check
} from 'lucide-react';
import { AssignmentChecklistStatus } from './SolvedAssignmentsHub';

export interface ToastItem {
  id: string;
  title: string;
  message: string;
  status?: AssignmentChecklistStatus | 'Cleared' | 'Reset';
  courseCode?: string;
  courseTitle?: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastCardProps {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss }) => {
  const duration = toast.duration ?? 4000;

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, duration);
    return () => clearTimeout(timer);
  }, [toast.id, duration, onDismiss]);

  const getTheme = () => {
    switch (toast.status) {
      case 'Downloaded':
        return {
          border: 'border-sky-300',
          bg: 'bg-white',
          accentBg: 'bg-sky-100',
          iconColor: 'text-sky-700',
          badgeBg: 'bg-sky-50 text-sky-900 border-sky-200',
          icon: Download,
          statusLabel: 'Downloaded',
          progressColor: 'bg-sky-500'
        };
      case 'In-Progress':
        return {
          border: 'border-amber-300',
          bg: 'bg-white',
          accentBg: 'bg-amber-100',
          iconColor: 'text-amber-700',
          badgeBg: 'bg-amber-50 text-amber-950 border-amber-200',
          icon: Clock,
          statusLabel: 'In-Progress',
          progressColor: 'bg-amber-500'
        };
      case 'Submitted':
        return {
          border: 'border-emerald-300',
          bg: 'bg-white',
          accentBg: 'bg-emerald-100',
          iconColor: 'text-emerald-700',
          badgeBg: 'bg-emerald-50 text-emerald-950 border-emerald-200',
          icon: CheckCircle2,
          statusLabel: 'Submitted',
          progressColor: 'bg-emerald-600'
        };
      case 'Cleared':
        return {
          border: 'border-slate-300',
          bg: 'bg-white',
          accentBg: 'bg-slate-100',
          iconColor: 'text-slate-600',
          badgeBg: 'bg-slate-50 text-slate-700 border-slate-200',
          icon: RotateCcw,
          statusLabel: 'Cleared',
          progressColor: 'bg-slate-400'
        };
      case 'Reset':
        return {
          border: 'border-rose-300',
          bg: 'bg-white',
          accentBg: 'bg-rose-100',
          iconColor: 'text-rose-600',
          badgeBg: 'bg-rose-50 text-rose-950 border-rose-200',
          icon: RotateCcw,
          statusLabel: 'Checklist Reset',
          progressColor: 'bg-rose-500'
        };
      default:
        return {
          border: 'border-emerald-300',
          bg: 'bg-white',
          accentBg: 'bg-emerald-100',
          iconColor: 'text-emerald-700',
          badgeBg: 'bg-emerald-50 text-emerald-950 border-emerald-200',
          icon: Check,
          statusLabel: 'Updated',
          progressColor: 'bg-emerald-600'
        };
    }
  };

  const theme = getTheme();
  const IconComponent = theme.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 10, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      id={`toast-${toast.id}`}
      className={`pointer-events-auto rounded-2xl border ${theme.border} ${theme.bg} shadow-lg shadow-slate-900/10 overflow-hidden flex flex-col`}
    >
      <div className="p-3.5 flex items-start gap-3">
        <div className={`p-2 rounded-xl ${theme.accentBg} ${theme.iconColor} shrink-0 mt-0.5`}>
          <IconComponent className="w-4 h-4" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-1.5">
            <h4 className="text-xs font-bold font-serif text-slate-900 leading-snug">
              {toast.title}
            </h4>
            <span
              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${theme.badgeBg}`}
            >
              {theme.statusLabel}
            </span>
          </div>

          <p className="text-[11px] text-slate-600 font-medium leading-relaxed">
            {toast.message}
          </p>

          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-slate-500">
            <Database className="w-3 h-3 text-emerald-700 shrink-0" />
            <span className="font-semibold text-emerald-800">Saved to Local Storage</span>
          </div>
        </div>

        <button
          onClick={() => onDismiss(toast.id)}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors shrink-0 -mr-1 -mt-1"
          aria-label="Dismiss toast notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress countdown bar */}
      <motion.div
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
        className={`h-0.5 ${theme.progressColor}`}
      />
    </motion.div>
  );
};
