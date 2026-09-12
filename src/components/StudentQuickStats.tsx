import React, { useState, useEffect } from 'react';
import { StudentProfile, ProgramLevel } from '../types';
import {
  PRESET_STUDENT_PROFILES,
  getStoredStudentProfile,
  saveStoredStudentProfile
} from '../data/studentProfileData';
import { HELPDESK_PHONE, HELPDESK_WHATSAPP } from '../data/aiouData';
import {
  UserCheck,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  FileText,
  ExternalLink,
  ChevronRight,
  LogOut,
  User,
  GraduationCap,
  Layers,
  ArrowRight,
  HelpCircle,
  FileCheck,
  ShieldCheck,
  Building,
  RefreshCw,
  X,
  Plus
} from 'lucide-react';

interface StudentQuickStatsProps {
  onSelectProgramForAi: (level: ProgramLevel, code?: string) => void;
  onOpenInquiry: (level?: ProgramLevel, code?: string) => void;
  setActiveTab: (tab: string) => void;
}

export const StudentQuickStats: React.FC<StudentQuickStatsProps> = ({
  onSelectProgramForAi,
  onOpenInquiry,
  setActiveTab
}) => {
  const [profile, setProfile] = useState<StudentProfile | null>(getStoredStudentProfile);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [filterPendingOnly, setFilterPendingOnly] = useState(false);

  // Custom login inputs
  const [customRollNo, setCustomRollNo] = useState('');
  const [customName, setCustomName] = useState('');
  const [customLevel, setCustomLevel] = useState<ProgramLevel>('B.Ed');
  const [customError, setCustomError] = useState('');

  // Keep state synchronized with storage
  const handleSelectPreset = (preset: StudentProfile) => {
    setProfile(preset);
    saveStoredStudentProfile(preset);
    setIsSwitchModalOpen(false);
  };

  const handleLogout = () => {
    setProfile(null);
    saveStoredStudentProfile(null);
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRollNo.trim() || !customName.trim()) {
      setCustomError('Please enter both your Student Roll Number and Name.');
      return;
    }

    // Generate custom student profile
    const customProfile: StudentProfile = {
      id: `std-custom-${Date.now()}`,
      studentId: `26-${customLevel.substring(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`,
      rollNo: customRollNo.toUpperCase().trim(),
      name: customName.trim(),
      programLevel: customLevel,
      programName: `${customLevel} Program (Registered Student)`,
      semester: 'Autumn 2026',
      semesterNumber: 1,
      totalSemesters: 4,
      campus: 'Regional Campus (Online Verified)',
      feeStatus: 'Paid & Verified',
      lmsStatus: customLevel === 'Matric' || customLevel === 'FA / Intermediate' ? 'Manual Submission' : 'Active & Enrolled',
      workshopsCompleted: customLevel === 'Matric' || customLevel === 'FA / Intermediate' ? 0 : 6,
      workshopsTotal: customLevel === 'Matric' || customLevel === 'FA / Intermediate' ? 0 : 6,
      tutorsAllocatedCount: 4,
      tutorsTotalCount: 4,
      rollNoSlipStatus: 'Available Soon',
      courses: [
        {
          code: customLevel === 'B.Ed' ? '8601' : customLevel === 'Matric' ? '201' : '1423',
          name: customLevel === 'B.Ed' ? 'General Methods of Teaching' : customLevel === 'Matric' ? 'Islamiat (Compulsory)' : 'Compulsory English-I',
          ass1DueDate: customLevel === 'Matric' ? 'Nov 15, 2026' : 'Dec 20, 2026',
          ass1Status: 'Draft',
          ass2DueDate: customLevel === 'Matric' ? 'Dec 20, 2026' : 'Jan 25, 2027',
          ass2Status: 'Pending',
          submissionType: customLevel === 'Matric' || customLevel === 'FA / Intermediate' ? 'By Post / Courier' : 'LMS Upload (PDF)',
          tutorName: 'Allocated CMS Tutor',
          tutorCity: 'Assigned District'
        },
        {
          code: customLevel === 'B.Ed' ? '8602' : customLevel === 'Matric' ? '202' : '1424',
          name: customLevel === 'B.Ed' ? 'Educational Assessment and Evaluation' : customLevel === 'Matric' ? 'Pak Studies' : 'Compulsory English-II',
          ass1DueDate: customLevel === 'Matric' ? 'Nov 15, 2026' : 'Dec 20, 2026',
          ass1Status: 'Pending',
          ass2DueDate: customLevel === 'Matric' ? 'Dec 20, 2026' : 'Jan 25, 2027',
          ass2Status: 'Pending',
          submissionType: customLevel === 'Matric' || customLevel === 'FA / Intermediate' ? 'By Post / Courier' : 'LMS Upload (PDF)',
          tutorName: 'Allocated CMS Tutor',
          tutorCity: 'Assigned District'
        }
      ]
    };

    setProfile(customProfile);
    saveStoredStudentProfile(customProfile);
    setIsSwitchModalOpen(false);
    setCustomRollNo('');
    setCustomName('');
    setCustomError('');
  };

  const pendingAssignmentsCount = profile
    ? profile.courses.reduce((acc, c) => {
        let count = 0;
        if (c.ass1Status !== 'Submitted') count++;
        if (c.ass2Status !== 'Submitted') count++;
        return acc + count;
      }, 0)
    : 0;

  const totalAssignmentsCount = profile ? profile.courses.length * 2 : 0;
  const submittedAssignmentsCount = totalAssignmentsCount - pendingAssignmentsCount;

  // Filter courses if user toggles pending only
  const displayedCourses = profile
    ? filterPendingOnly
      ? profile.courses.filter(c => c.ass1Status !== 'Submitted' || c.ass2Status !== 'Submitted')
      : profile.courses
    : [];

  return (
    <div id="student-quick-stats-widget" className="my-6">
      {/* ================= IF LOGGED IN ================= */}
      {profile ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-700 shadow-xl overflow-hidden text-slate-900 transition-all">
          {/* Top Banner Header */}
          <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 bg-emerald-950 text-white p-5 sm:p-6 border-b border-emerald-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Student Identity */}
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-lg flex items-center justify-center shadow-md shrink-0 border-2 border-amber-300">
                  {profile.name.charAt(0)}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 bg-emerald-700/80 text-emerald-100 text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-emerald-500/60">
                      <UserCheck className="w-3 h-3 text-amber-300" />
                      Logged-In Student Desk
                    </span>
                    <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {profile.semester}
                    </span>
                    <span className="bg-emerald-900 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-md border border-emerald-700">
                      Semester {profile.semesterNumber} of {profile.totalSemesters}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight leading-snug">
                    {profile.name}
                  </h3>
                  <p className="text-xs text-emerald-100/90 font-medium flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>
                      <strong className="text-amber-300">Roll No:</strong> {profile.rollNo}
                    </span>
                    <span>•</span>
                    <span>
                      <strong className="text-amber-300">ID:</strong> {profile.studentId}
                    </span>
                    <span>•</span>
                    <span>{profile.programName}</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons: Switch Student / Logout */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={() => setIsSwitchModalOpen(true)}
                  className="bg-emerald-800 hover:bg-emerald-700 text-emerald-100 text-xs font-bold px-3 py-2 rounded-xl border border-emerald-600 transition-all flex items-center gap-1.5 shadow-sm"
                  title="Switch between student profiles or enter your own Roll Number"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                  <span>Switch Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3 py-2 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
                  title="Log out from student desk"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-300" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            {/* Semester Lifecycle Progress Tracker Bar */}
            <div className="mt-5 pt-4 border-t border-emerald-800/60">
              <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                <span className="text-emerald-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Current Semester Status: {profile.semester} Lifecycle</span>
                </span>
                <span className="text-amber-300 text-[11px]">
                  {submittedAssignmentsCount} of {totalAssignmentsCount} Assignments Completed
                </span>
              </div>
              <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-emerald-700/60">
                <div
                  className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${totalAssignmentsCount > 0 ? (submittedAssignmentsCount / totalAssignmentsCount) * 100 : 50}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 4 Core Quick-Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 sm:p-5 bg-slate-50 border-b border-slate-200">
            {/* Tile 1: Fee & Enrollment */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">
                  Challan / CMS Fee
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-sm sm:text-base font-extrabold text-emerald-900">
                {profile.feeStatus}
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                1Link PSID reconciled on CMS
              </p>
            </div>

            {/* Tile 2: Tutor Allocation */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">
                  CMS Tutors Assigned
                </span>
                <UserCheck className="w-4 h-4 text-teal-600" />
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900">
                {profile.tutorsAllocatedCount} / {profile.tutorsTotalCount} Courses (100%)
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                Mobile numbers & addresses verified
              </p>
            </div>

            {/* Tile 3: LMS Workshops */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500">
                  LMS & Workshops
                </span>
                <FileCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                {profile.workshopsTotal > 0
                  ? `${profile.workshopsCompleted} / ${profile.workshopsTotal} Attended`
                  : 'By Post Delivery'}
              </div>
              <p className="text-[11px] text-slate-500 leading-tight">
                {profile.workshopsTotal > 0 ? 'AAGHI attendance synchronized' : 'Manual tutor postal parcels'}
              </p>
            </div>

            {/* Tile 4: Pending Assignments */}
            <div className={`p-3.5 rounded-2xl border shadow-2xs space-y-1 ${
              pendingAssignmentsCount > 0 ? 'bg-amber-50/80 border-amber-300' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider font-extrabold text-amber-950">
                  Upcoming Deadlines
                </span>
                <Clock className="w-4 h-4 text-amber-700" />
              </div>
              <div className="text-sm sm:text-base font-black text-amber-950">
                {pendingAssignmentsCount} Pending
              </div>
              <p className="text-[11px] text-amber-800 leading-tight">
                Autumn deadline approaching
              </p>
            </div>
          </div>

          {/* Upcoming Assignment Deadlines Table / Cards */}
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  <span>Upcoming Course Assignment Deadlines</span>
                </h4>
                <p className="text-xs text-slate-600">
                  Check Assignment #1 & #2 cutoff dates, submission portal mode, and assigned tutors for your enrolled courses.
                </p>
              </div>

              {/* Filter toggle */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setFilterPendingOnly(false)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    !filterPendingOnly
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  All Courses ({profile.courses.length})
                </button>
                <button
                  onClick={() => setFilterPendingOnly(true)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    filterPendingOnly
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Pending Only ({profile.courses.filter(c => c.ass1Status !== 'Submitted' || c.ass2Status !== 'Submitted').length})
                </button>
              </div>
            </div>

            {/* Courses List */}
            <div className="space-y-3">
              {displayedCourses.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                  <p className="text-sm font-bold text-slate-800">All assignments for your enrolled courses are submitted!</p>
                  <p className="text-xs text-slate-500">You can toggle &quot;All Courses&quot; to review previous submissions.</p>
                </div>
              ) : (
                displayedCourses.map((course) => (
                  <div
                    key={course.code}
                    className="bg-white hover:bg-slate-50/80 p-4 sm:p-5 rounded-2xl border border-slate-200 transition-all shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                      {/* Course Title & Details */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-emerald-800 text-amber-300 font-extrabold text-xs px-2.5 py-0.5 rounded-md font-mono">
                            Code: {course.code}
                          </span>
                          <span
                            className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                              course.submissionType === 'LMS Upload (PDF)'
                                ? 'bg-indigo-50 text-indigo-900 border-indigo-200'
                                : 'bg-emerald-50 text-emerald-950 border-emerald-200'
                            }`}
                          >
                            {course.submissionType}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">
                            Tutor: <strong>{course.tutorName}</strong> ({course.tutorCity})
                          </span>
                        </div>
                        <h5 className="text-sm sm:text-base font-bold text-slate-900">
                          {course.name}
                        </h5>
                      </div>

                      {/* Quick Shortcut Buttons */}
                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          onClick={() => onSelectProgramForAi(profile.programLevel, course.code)}
                          className="bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 border border-purple-800"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>AI Solver ({course.code})</span>
                        </button>

                        <button
                          onClick={() => setActiveTab('solved-assignments')}
                          className="bg-teal-50 hover:bg-teal-100 text-teal-900 text-xs font-bold px-3 py-1.5 rounded-xl transition-all border border-teal-200 flex items-center gap-1"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                          <span>Solved Guide</span>
                        </button>

                        <button
                          onClick={() => setActiveTab('cover-page')}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl transition-all border border-slate-200 flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-700" />
                          <span>Cover Page</span>
                        </button>
                      </div>
                    </div>

                    {/* Deadline Milestones */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-100 text-xs">
                      {/* Ass 1 */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">
                            Assignment #1 Cutoff
                          </span>
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                            {course.ass1DueDate}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            course.ass1Status === 'Submitted'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : course.ass1Status === 'Draft'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {course.ass1Status}
                        </span>
                      </div>

                      {/* Ass 2 */}
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-500 block">
                            Assignment #2 Cutoff
                          </span>
                          <span className="font-extrabold text-slate-900 text-xs sm:text-sm flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                            {course.ass2DueDate}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${
                            course.ass2Status === 'Submitted'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : course.ass2Status === 'Draft'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {course.ass2Status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Quick Portal Jump Bar */}
            <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://aaghi.aiou.edu.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-700 hover:bg-indigo-800 text-white font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-200" />
                  <span>AAGHI LMS Portal Login &rarr;</span>
                </a>

                <a
                  href="https://enrollment.aiou.edu.pk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-xs"
                >
                  <Building className="w-3.5 h-3.5 text-amber-300" />
                  <span>AIOU CMS Portal &rarr;</span>
                </a>

                <button
                  onClick={() => setActiveTab('academic-calendar')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3.5 py-2 rounded-xl transition-all border border-slate-300 flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>View Master Academic Calendar</span>
                </button>
              </div>

              <a
                href={`https://wa.me/${HELPDESK_WHATSAPP}?text=${encodeURIComponent(
                  `Hello Educare Help Desk (03451291610), I need assignment guidance for ${profile.name} (Roll No: ${profile.rollNo}, Program: ${profile.programName}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-800 hover:text-emerald-950 font-extrabold flex items-center gap-1 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
              >
                <span>Helpline WhatsApp Assistance (03451291610) &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        /* ================= IF LOGGED OUT ================= */
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-700 shadow-xl space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                <UserCheck className="w-3.5 h-3.5 text-slate-950" />
                <span>AIOU Student Quick-Stats Widget</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Log In to View Your Assignment Deadlines & Semester Status
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Connect your student profile to view upcoming Assignment #1 & #2 deadlines, AAGHI LMS workshop records, allocated CMS tutor contacts, and exam preparations at a glance.
              </p>
            </div>

            {/* Quick Demo Student Switchers */}
            <div className="space-y-2 shrink-0">
              <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wide block">
                Instant 1-Click Demo Profiles:
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_STUDENT_PROFILES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleSelectPreset(preset)}
                    className="bg-emerald-800/80 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl border border-emerald-600 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <User className="w-3.5 h-3.5 text-amber-300" />
                    <span>{preset.name} ({preset.programLevel})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Roll Number Lookup Form */}
          <div className="pt-4 border-t border-emerald-800/80">
            <form onSubmit={handleCustomLogin} className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-700/80 space-y-3">
              <span className="text-xs font-bold text-emerald-200 block">
                Or Enter Your Roll Number & Name to Access Your Personal Desk:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div>
                  <input
                    type="text"
                    value={customRollNo}
                    onChange={(e) => setCustomRollNo(e.target.value)}
                    placeholder="Roll No (e.g. CB649201)"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 font-mono"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Student Full Name"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div>
                  <select
                    value={customLevel}
                    onChange={(e) => setCustomLevel(e.target.value as ProgramLevel)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="B.Ed">B.Ed (Teacher Education)</option>
                    <option value="BS (4-Year)">BS (4-Year)</option>
                    <option value="FA / Intermediate">FA / Intermediate</option>
                    <option value="Matric">Matric</option>
                    <option value="BA / AD">BA / AD</option>
                    <option value="Master / PGD">Master / PGD</option>
                  </select>
                </div>
              </div>

              {customError && (
                <p className="text-xs text-rose-300 font-semibold">{customError}</p>
              )}

              <div className="flex items-center justify-end">
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Access Student Quick-Stats</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= SWITCH / PROFILE MODAL ================= */}
      {isSwitchModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 text-slate-900">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="space-y-0.5">
                <h4 className="text-lg font-bold font-serif text-white">
                  Switch AIOU Student Profile
                </h4>
                <p className="text-xs text-slate-300">
                  Select a registered demo student or enter your own student credentials.
                </p>
              </div>
              <button
                onClick={() => setIsSwitchModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Preset Student Personas:
              </span>

              <div className="space-y-2.5">
                {PRESET_STUDENT_PROFILES.map((preset) => {
                  const isCurrent = profile?.id === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        isCurrent
                          ? 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-900">
                            {preset.name}
                          </span>
                          <span className="bg-emerald-100 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded">
                            {preset.programLevel}
                          </span>
                          {isCurrent && (
                            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600">
                          {preset.programName} • Roll: {preset.rollNo} • {preset.campus}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {preset.courses.length} Courses • Deadlines: {preset.courses[0]?.ass1DueDate} (Ass 1), {preset.courses[0]?.ass2DueDate} (Ass 2)
                        </p>
                      </div>

                      <ChevronRight className={`w-5 h-5 shrink-0 ${isCurrent ? 'text-emerald-700' : 'text-slate-400'}`} />
                    </div>
                  );
                })}
              </div>

              {/* Custom Roll Number Entry Form */}
              <div className="pt-3 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-700 block mb-2">
                  Or Log In with Any Roll Number:
                </span>
                <form onSubmit={handleCustomLogin} className="space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={customRollNo}
                      onChange={(e) => setCustomRollNo(e.target.value)}
                      placeholder="Roll No (e.g. CB649201)"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                    <input
                      type="text"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <select
                    value={customLevel}
                    onChange={(e) => setCustomLevel(e.target.value as ProgramLevel)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="B.Ed">B.Ed (Teacher Education)</option>
                    <option value="BS (4-Year)">BS (4-Year)</option>
                    <option value="FA / Intermediate">FA / Intermediate</option>
                    <option value="Matric">Matric</option>
                    <option value="BA / AD">BA / AD</option>
                    <option value="Master / PGD">Master / PGD</option>
                  </select>

                  {customError && (
                    <p className="text-xs text-rose-600 font-semibold">{customError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-300" />
                    <span>Save & Load Custom Student Profile</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
