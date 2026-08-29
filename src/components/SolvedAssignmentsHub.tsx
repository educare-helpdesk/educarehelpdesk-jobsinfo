import React, { useState, useEffect, useMemo } from 'react';
import { ProgramLevel, SolvedAssignmentItem } from '../types';
import { SOLVED_ASSIGNMENTS, HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import { ToastContainer, ToastItem } from './Toast';
import {
  Search,
  BookOpen,
  Download,
  FileText,
  CheckCircle2,
  MessageCircle,
  Phone,
  Sparkles,
  Filter,
  CheckSquare,
  Clock,
  RotateCcw,
  ListTodo,
  Check,
  AlertCircle
} from 'lucide-react';

export type AssignmentChecklistStatus = 'Downloaded' | 'In-Progress' | 'Submitted';

interface SolvedAssignmentsHubProps {
  onSelectForAi: (level: ProgramLevel, code: string) => void;
  onOpenInquiry: (level?: ProgramLevel, code?: string) => void;
}

const CHECKLIST_STORAGE_KEY = 'aiou_assignment_checklist_v1';

export const SolvedAssignmentsHub: React.FC<SolvedAssignmentsHubProps> = ({
  onSelectForAi,
  onOpenInquiry
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<'All' | AssignmentChecklistStatus | 'Unmarked'>('All');
  const [activeItem, setActiveItem] = useState<SolvedAssignmentItem | null>(SOLVED_ASSIGNMENTS[0]);
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  // Checklist State stored per assignment id
  const [checklistStatusMap, setChecklistStatusMap] = useState<Record<string, AssignmentChecklistStatus>>(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save to localStorage whenever checklistStatusMap changes
  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checklistStatusMap));
    } catch (e) {
      console.error('Failed to save checklist to localStorage', e);
    }
  }, [checklistStatusMap]);

  const addToast = (toast: Omit<ToastItem, 'id'>) => {
    const newToast: ToastItem = {
      ...toast,
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
    };
    setToasts((prev) => [...prev.slice(-3), newToast]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSetStatus = (itemId: string, status: AssignmentChecklistStatus | null, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const assignment = SOLVED_ASSIGNMENTS.find((item) => item.id === itemId);
    const currentStatus = checklistStatusMap[itemId];

    if (status === null || currentStatus === status) {
      setChecklistStatusMap((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
      addToast({
        title: 'Status Cleared',
        message: assignment
          ? `Code ${assignment.courseCode} (${assignment.courseTitle}) unpinned from checklist.`
          : 'Assignment status unpinned from checklist.',
        status: 'Cleared',
        courseCode: assignment?.courseCode,
        courseTitle: assignment?.courseTitle,
        duration: 3500
      });
    } else {
      setChecklistStatusMap((prev) => ({
        ...prev,
        [itemId]: status
      }));
      addToast({
        title: `Marked as ${status}`,
        message: assignment
          ? `Code ${assignment.courseCode} (${assignment.courseTitle}) updated to "${status}".`
          : `Assignment status updated to "${status}".`,
        status: status,
        courseCode: assignment?.courseCode,
        courseTitle: assignment?.courseTitle,
        duration: 4000
      });
    }
  };

  const handleResetChecklist = () => {
    if (window.confirm('Are you sure you want to reset all checklist statuses?')) {
      const count = Object.keys(checklistStatusMap).length;
      setChecklistStatusMap({});
      addToast({
        title: 'Checklist Cleared',
        message: `Reset ${count} tracked assignment${count === 1 ? '' : 's'} from local storage.`,
        status: 'Reset',
        duration: 4000
      });
    }
  };

  const levels: (ProgramLevel | 'All')[] = [
    'All',
    'Matric',
    'FA / Intermediate',
    'BA / AD',
    'BS (4-Year)',
    'B.Ed',
    'Master / PGD'
  ];

  // Checklist stats calculations
  const stats = useMemo(() => {
    let downloadedCount = 0;
    let inProgressCount = 0;
    let submittedCount = 0;

    SOLVED_ASSIGNMENTS.forEach((item) => {
      const status = checklistStatusMap[item.id];
      if (status === 'Downloaded') downloadedCount++;
      else if (status === 'In-Progress') inProgressCount++;
      else if (status === 'Submitted') submittedCount++;
    });

    const totalTracked = downloadedCount + inProgressCount + submittedCount;
    return {
      downloaded: downloadedCount,
      inProgress: inProgressCount,
      submitted: submittedCount,
      totalTracked,
      total: SOLVED_ASSIGNMENTS.length
    };
  }, [checklistStatusMap]);

  const filteredAssignments = useMemo(() => {
    return SOLVED_ASSIGNMENTS.filter((item) => {
      const matchesLevel = selectedLevel === 'All' || item.programLevel === selectedLevel;
      const matchesSearch =
        item.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.programLevel.toLowerCase().includes(searchTerm.toLowerCase());

      const itemStatus = checklistStatusMap[item.id];
      let matchesStatus = true;
      if (selectedStatusFilter === 'Unmarked') {
        matchesStatus = !itemStatus;
      } else if (selectedStatusFilter !== 'All') {
        matchesStatus = itemStatus === selectedStatusFilter;
      }

      return matchesLevel && matchesSearch && matchesStatus;
    });
  }, [selectedLevel, searchTerm, selectedStatusFilter, checklistStatusMap]);

  const getStatusBadge = (status?: AssignmentChecklistStatus) => {
    if (!status) return null;
    switch (status) {
      case 'Downloaded':
        return (
          <span className="inline-flex items-center gap-1 bg-sky-100 text-sky-900 border border-sky-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
            <Download className="w-3 h-3 text-sky-700" />
            <span>Downloaded</span>
          </span>
        );
      case 'In-Progress':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-950 border border-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-amber-700" />
            <span>In-Progress</span>
          </span>
        );
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-950 border border-emerald-300 font-extrabold text-[10px] px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            <span>Submitted</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div
        className="bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 bg-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-md border-2 border-emerald-700"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-md">
              <ListTodo className="w-3.5 h-3.5" />
              <span>AIOU Academic Library & Assignment Checklist Tracker</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-amber-200">
              Solved Assignments Hub & Student Checklist
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
              Browse solved assignments for Autumn 2025 & Spring 2026. Track your completion progress by marking assignments as <strong>Downloaded</strong>, <strong>In-Progress</strong>, or <strong>Submitted</strong>.
            </p>
          </div>

          <a
            href={`tel:${HELPDESK_PHONE}`}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition-all shrink-0"
          >
            <Phone className="w-4 h-4 text-slate-950" />
            <span>Order Full PDF: {HELPDESK_PHONE}</span>
          </a>
        </div>
      </div>

      {/* Checklist Progress Overview Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-800" />
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-serif">
                My Assignment Completion Checklist
              </h3>
              <p className="text-[11px] text-slate-500">
                Mark each assignment to keep track of your semester preparation. Saved automatically on this device.
              </p>
            </div>
          </div>

          {stats.totalTracked > 0 && (
            <button
              onClick={handleResetChecklist}
              className="self-start sm:self-auto inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-rose-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Checklist</span>
            </button>
          )}
        </div>

        {/* Stats Pill Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <button
            onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'Downloaded' ? 'All' : 'Downloaded')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'Downloaded'
                ? 'bg-sky-50 border-sky-500 ring-1 ring-sky-500 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-sky-900 flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-sky-700" />
                Downloaded
              </span>
              <span className="text-xs font-black bg-sky-100 text-sky-950 px-2 py-0.5 rounded-full border border-sky-300">
                {stats.downloaded}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Files saved to review</div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'In-Progress' ? 'All' : 'In-Progress')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'In-Progress'
                ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                In-Progress
              </span>
              <span className="text-xs font-black bg-amber-100 text-amber-950 px-2 py-0.5 rounded-full border border-amber-300">
                {stats.inProgress}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Currently writing / solving</div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter(selectedStatusFilter === 'Submitted' ? 'All' : 'Submitted')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'Submitted'
                ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-emerald-900 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Submitted
              </span>
              <span className="text-xs font-black bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded-full border border-emerald-300">
                {stats.submitted}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Uploaded on LMS / Sent to Tutor</div>
          </button>

          <button
            onClick={() => setSelectedStatusFilter('All')}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              selectedStatusFilter === 'All'
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold">Total Tracked</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                selectedStatusFilter === 'All' ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-800'
              }`}>
                {stats.totalTracked} / {stats.total}
              </span>
            </div>
            <div className={`text-[10px] mt-0.5 ${selectedStatusFilter === 'All' ? 'text-slate-300' : 'text-slate-500'}`}>
              Show All Papers
            </div>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Course Code (e.g., 8601, 247, 1423) or Title..."
              className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm font-medium rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            <Filter className="w-4 h-4 text-slate-500 shrink-0 hidden sm:block" />
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedLevel === lvl
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Status Filter Tab Pills */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 overflow-x-auto scrollbar-none text-xs">
          <span className="text-slate-500 font-bold text-[11px] shrink-0">Checklist Filter:</span>
          {(['All', 'Downloaded', 'In-Progress', 'Submitted', 'Unmarked'] as const).map((filterOpt) => (
            <button
              key={filterOpt}
              onClick={() => setSelectedStatusFilter(filterOpt)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] shrink-0 transition-all border ${
                selectedStatusFilter === filterOpt
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-2xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              {filterOpt}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* List Column */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>Available Solved Papers ({filteredAssignments.length})</span>
            {selectedStatusFilter !== 'All' && (
              <span className="text-emerald-800 font-bold normal-case bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Filter: {selectedStatusFilter}
              </span>
            )}
          </div>

          <div className="space-y-3 max-h-[650px] overflow-y-auto pr-1">
            {filteredAssignments.map((item) => {
              const isSelected = activeItem?.id === item.id;
              const currentStatus = checklistStatusMap[item.id];

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItem(item)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2.5 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-600 shadow-sm ring-1 ring-emerald-600/30'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="bg-emerald-800 text-white font-bold text-[10px] px-2 py-0.5 rounded uppercase">
                        Code {item.courseCode}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        {item.programLevel}
                      </span>
                    </div>

                    {getStatusBadge(currentStatus)}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 font-serif leading-snug">
                    {item.courseTitle}
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    <span>Semester: {item.semester}</span>
                    <span className="font-semibold text-emerald-700">Assignment #{item.assignmentNumber}</span>
                  </div>

                  {/* Inline Checklist Quick-Mark Buttons */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px] font-bold">
                    <span className="text-slate-400 uppercase tracking-wider text-[9px]">Mark:</span>
                    <div className="flex items-center gap-1">
                      <button
                        title="Mark as Downloaded"
                        onClick={(e) => handleSetStatus(item.id, 'Downloaded', e)}
                        className={`px-2 py-1 rounded-md border flex items-center gap-1 transition-all ${
                          currentStatus === 'Downloaded'
                            ? 'bg-sky-600 text-white border-sky-700 shadow-2xs'
                            : 'bg-slate-50 hover:bg-sky-50 text-slate-600 hover:text-sky-800 border-slate-200'
                        }`}
                      >
                        <Download className="w-3 h-3" />
                        <span>Downloaded</span>
                      </button>

                      <button
                        title="Mark as In-Progress"
                        onClick={(e) => handleSetStatus(item.id, 'In-Progress', e)}
                        className={`px-2 py-1 rounded-md border flex items-center gap-1 transition-all ${
                          currentStatus === 'In-Progress'
                            ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-2xs font-extrabold'
                            : 'bg-slate-50 hover:bg-amber-50 text-slate-600 hover:text-amber-800 border-slate-200'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>In-Progress</span>
                      </button>

                      <button
                        title="Mark as Submitted"
                        onClick={(e) => handleSetStatus(item.id, 'Submitted', e)}
                        className={`px-2 py-1 rounded-md border flex items-center gap-1 transition-all ${
                          currentStatus === 'Submitted'
                            ? 'bg-emerald-700 text-white border-emerald-800 shadow-2xs'
                            : 'bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-800 border-slate-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Submitted</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredAssignments.length === 0 && (
              <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No solved assignments found matching your filter.</p>
                <p className="text-xs text-slate-500">Contact Educare Help Desk at 03451291610 to request any AIOU solved paper directly!</p>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedLevel('All');
                      setSelectedStatusFilter('All');
                    }}
                    className="bg-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl"
                  >
                    Reset Filters
                  </button>
                  <a
                    href={`tel:${HELPDESK_PHONE}`}
                    className="inline-block bg-amber-400 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl"
                  >
                    Call: {HELPDESK_PHONE}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Selected Item Preview Column */}
        <div className="lg:col-span-7">
          {activeItem ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden sticky top-24 space-y-5 p-6">
              {/* Header */}
              <div className="border-b border-slate-100 pb-4 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-2.5 py-1 rounded-md border border-amber-200">
                    AIOU Solved Solution Preview
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    Session: {activeItem.semester}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  [{activeItem.courseCode}] {activeItem.courseTitle}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 font-medium pt-1">
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Program: <strong>{activeItem.programLevel}</strong></span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Assignment: <strong>#{activeItem.assignmentNumber}</strong></span>
                  <span className="bg-slate-100 px-2.5 py-1 rounded-md">Downloads: <strong>{activeItem.downloadCount}+</strong></span>
                </div>
              </div>

              {/* Interactive Checklist Status Selector Card */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-800" />
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                      Assignment Status Checklist:
                    </span>
                  </div>
                  {checklistStatusMap[activeItem.id] && (
                    <button
                      onClick={() => handleSetStatus(activeItem.id, null)}
                      className="text-[11px] font-bold text-slate-500 hover:text-rose-600 underline"
                    >
                      Clear Status
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => handleSetStatus(activeItem.id, 'Downloaded')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all ${
                      checklistStatusMap[activeItem.id] === 'Downloaded'
                        ? 'bg-sky-600 text-white border-sky-700 shadow-sm ring-2 ring-sky-300'
                        : 'bg-white hover:bg-sky-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>Downloaded</span>
                  </button>

                  <button
                    onClick={() => handleSetStatus(activeItem.id, 'In-Progress')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all ${
                      checklistStatusMap[activeItem.id] === 'In-Progress'
                        ? 'bg-amber-400 text-slate-950 border-amber-500 font-extrabold shadow-sm ring-2 ring-amber-300'
                        : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    <span>In-Progress</span>
                  </button>

                  <button
                    onClick={() => handleSetStatus(activeItem.id, 'Submitted')}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1 border transition-all ${
                      checklistStatusMap[activeItem.id] === 'Submitted'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm ring-2 ring-emerald-300'
                        : 'bg-white hover:bg-emerald-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submitted</span>
                  </button>
                </div>

                {/* Helpful status tip */}
                {checklistStatusMap[activeItem.id] === 'Downloaded' && (
                  <p className="text-[11px] text-sky-900 bg-sky-100/70 p-2 rounded-lg border border-sky-200 font-medium">
                    📂 Marked as <strong>Downloaded</strong>. Use the AI Solver button below to generate complete structured answers.
                  </p>
                )}
                {checklistStatusMap[activeItem.id] === 'In-Progress' && (
                  <p className="text-[11px] text-amber-950 bg-amber-100/80 p-2 rounded-lg border border-amber-200 font-medium">
                    ✍️ Marked as <strong>In-Progress</strong>. Don't forget to generate your 3-fold Tutor Cover Page before submitting!
                  </p>
                )}
                {checklistStatusMap[activeItem.id] === 'Submitted' && (
                  <p className="text-[11px] text-emerald-950 bg-emerald-100/80 p-2 rounded-lg border border-emerald-200 font-medium">
                    ✅ Marked as <strong>Submitted</strong>! Keep your LMS submission screenshot or postal booking receipt safely.
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-1">
                <h4 className="text-xs font-bold uppercase text-slate-700 tracking-wider">Overview:</h4>
                <p className="text-xs text-slate-700 leading-relaxed">{activeItem.summary}</p>
              </div>

              {/* Sample Q&As */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-emerald-900 tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-700" />
                  <span>Sample Solved Questions Excerpt:</span>
                </h4>

                <div className="space-y-3 max-h-[240px] overflow-y-auto pr-1">
                  {activeItem.sampleQuestions.map((sq, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-slate-200/90 space-y-1.5 text-xs">
                      <div className="font-bold text-slate-900">{sq.question}</div>
                      <div className="text-slate-700 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100/80 leading-relaxed">
                        <span className="font-semibold text-emerald-900">Answer Guidance: </span>
                        {sq.briefAnswer}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onSelectForAi(activeItem.programLevel, activeItem.courseCode)}
                  className="w-full sm:w-auto flex-1 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-2xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Solve Full Code {activeItem.courseCode} with AI</span>
                </button>

                <a
                  href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(`Hello Educare Help Desk (03451291610),\nI need the complete PDF solved assignment for AIOU Code ${activeItem.courseCode} (${activeItem.courseTitle} - ${activeItem.programLevel}).`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Get Full PDF on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center text-slate-500">
              Select an assignment from the list to view preview.
            </div>
          )}
        </div>
      </div>

      {/* Floating Toast Notification Stack */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
