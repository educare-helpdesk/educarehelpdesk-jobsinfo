export type CalendarCategory = 
  | 'All' 
  | 'Admissions' 
  | 'Assignment Deadlines' 
  | 'Workshops & LMS' 
  | 'Exam Forms & Dates' 
  | 'Result Declarations' 
  | 'Enrollment & Fees';

export type SemesterCycle = 'All' | 'Autumn Semester' | 'Spring Semester' | 'Continuous';

export type EventUrgency = 'Critical Milestone' | 'Active Window' | 'Upcoming' | 'Standard';

export interface AcademicCalendarEvent {
  id: string;
  title: string;
  semesterCycle: 'Autumn Semester' | 'Spring Semester' | 'Continuous';
  phase: string;
  category: 'Admissions' | 'Assignment Deadlines' | 'Workshops & LMS' | 'Exam Forms & Dates' | 'Result Declarations' | 'Enrollment & Fees';
  targetPrograms: string[];
  startDate: string;
  endDate: string;
  deadlineLabel: string;
  status: 'Active / Open' | 'Upcoming' | 'Continuous' | 'Closed / Archive';
  urgency: EventUrgency;
  badge: string;
  iconName: 'admission' | 'assignment' | 'workshop' | 'exam' | 'result' | 'fee' | 'calendar';
  description: string;
  keyActionItems: string[];
  officialPortalUrl?: string;
  officialPortalName?: string;
  helplineHelpTopic: string;
  isHighImpact?: boolean;
}

export const AIOU_ACADEMIC_CALENDAR_EVENTS: AcademicCalendarEvent[] = [
  // ==================== ADMISSIONS ====================
  {
    id: 'cal-adm-aut-phase1',
    title: 'Autumn 2026 Admissions (Phase I: Matric & FA / I.Com)',
    semesterCycle: 'Autumn Semester',
    phase: 'Phase I (Matric / FA)',
    category: 'Admissions',
    targetPrograms: ['Matric (SSC)', 'FA / I.Com (HSSC)', 'Certificate Courses', 'Open Academy'],
    startDate: 'July 15, 2026',
    endDate: 'September 05, 2026',
    deadlineLabel: 'Sep 05, 2026 (Without Late Fee)',
    status: 'Active / Open',
    urgency: 'Critical Milestone',
    badge: 'PHASE I ADMISSIONS',
    iconName: 'admission',
    description: 'Admissions for Matric General, Dars-e-Nizami, FA General, FA with Open Electives, and I.Com are open across Pakistan and for International / Overseas Pakistani students through the Online Admission System (OAS).',
    keyActionItems: [
      'Fresh applicants submit application on oas.aiou.edu.pk with scanned CNIC/B-Form and Middle/Matric Sanad.',
      'Continuing students enroll via CMS Portal (enrollment.aiou.edu.pk).',
      'Pay fee online through JazzCash, Easypaisa, 1Link, UBL, ABL, FWBL, or MCB Bank Challan.',
      'Late fee grace period typically extends till September 20 with standard late surcharge.'
    ],
    officialPortalUrl: 'https://oas.aiou.edu.pk',
    officialPortalName: 'AIOU OAS Admission Portal',
    helplineHelpTopic: 'Autumn Phase I Admission & Challan Verification',
    isHighImpact: true
  },
  {
    id: 'cal-adm-aut-phase2',
    title: 'Autumn 2026 Admissions (Phase II: BS, B.Ed, AD, MA/MSc, MPhil & PhD)',
    semesterCycle: 'Autumn Semester',
    phase: 'Phase II (Higher Education)',
    category: 'Admissions',
    targetPrograms: ['BS (4-Year)', 'B.Ed (1.5, 2.5, 4-Year)', 'Associate Degree (BA/B.Com)', 'Postgraduate Diplomas', 'M.Phil / MS', 'Ph.D.'],
    startDate: 'September 01, 2026',
    endDate: 'October 15, 2026',
    deadlineLabel: 'Oct 15, 2026 (Extended till Oct 31 with Late Fee)',
    status: 'Active / Open',
    urgency: 'Critical Milestone',
    badge: 'PHASE II ADMISSIONS',
    iconName: 'admission',
    description: 'Nationwide admissions for all Teacher Training programs (B.Ed 1.5/2.5/4 Years), BS 4-Year (ODL & Blended), Associate Degrees (Arts, Commerce, Business), Postgraduate Diplomas, and merit-based M.Phil/Ph.D. programs.',
    keyActionItems: [
      'M.Phil and Ph.D. test/interview schedule conducted at AIOU Main Campus, H-8 Islamabad.',
      'B.Ed & BS applicants apply 100% online; prospectuses available in PDF format.',
      'Continuing students must complete course selection on CMS before the deadline to avoid late charges.',
      'Educare Help Desk (03451291610) provides instant prospectus guidance and fee calculation.'
    ],
    officialPortalUrl: 'https://oas.aiou.edu.pk',
    officialPortalName: 'AIOU OAS Portal',
    helplineHelpTopic: 'BS / B.Ed Autumn Phase II Admission Support',
    isHighImpact: true
  },
  {
    id: 'cal-adm-spr-phase1',
    title: 'Spring 2026 Admissions (Phase I: Matric & FA / Intermediate)',
    semesterCycle: 'Spring Semester',
    phase: 'Phase I (School Programs)',
    category: 'Admissions',
    targetPrograms: ['Matric', 'FA', 'I.Com'],
    startDate: 'January 15, 2026',
    endDate: 'February 20, 2026',
    deadlineLabel: 'Feb 20, 2026 (Late Fee till Mar 05)',
    status: 'Upcoming',
    urgency: 'Upcoming',
    badge: 'SPRING PHASE I',
    iconName: 'admission',
    description: 'Spring semester admission intake for Secondary and Higher Secondary school qualifications across regional campuses in Punjab, Sindh, KPK, Balochistan, AJK, and Gilgit-Baltistan.',
    keyActionItems: [
      'Prospectus download available online.',
      'Manual forms accepted at regional designated bank branches or online on OAS portal.',
      'Overseas students can attempt 100% online through designated international portal.'
    ],
    officialPortalUrl: 'https://oas.aiou.edu.pk',
    officialPortalName: 'AIOU Admission Desk',
    helplineHelpTopic: 'Spring Phase I Matric/FA Inquiries'
  },
  {
    id: 'cal-adm-spr-phase2',
    title: 'Spring 2026 Admissions (Phase II: BS, B.Ed, AD & Master Programs)',
    semesterCycle: 'Spring Semester',
    phase: 'Phase II (Undergrad & Grad)',
    category: 'Admissions',
    targetPrograms: ['BS (4-Year)', 'B.Ed', 'Associate Degree', 'Master / PGD'],
    startDate: 'March 01, 2026',
    endDate: 'April 15, 2026',
    deadlineLabel: 'April 15, 2026 (Late fee till April 30)',
    status: 'Upcoming',
    urgency: 'Upcoming',
    badge: 'SPRING PHASE II',
    iconName: 'admission',
    description: 'Spring intake for all Undergraduate, B.Ed, and Postgraduate programs with flexible distance learning modalities and LMS-based coursework.',
    keyActionItems: [
      'Submit academic transcripts and domicile verification online.',
      'Generate 1Link digital challan for fast fee reconciliation on CMS.'
    ],
    officialPortalUrl: 'https://oas.aiou.edu.pk',
    officialPortalName: 'OAS Admission Portal',
    helplineHelpTopic: 'Spring Phase II Higher Education Guidance'
  },
  {
    id: 'cal-adm-bise-sargodha-2026',
    title: 'BISE Sargodha Matric & Intermediate Online Admission & Registration Drive 2026',
    semesterCycle: 'Continuous',
    phase: 'Annual Board Registration',
    category: 'Admissions',
    targetPrograms: ['Matric (9th & 10th)', 'Intermediate (11th & 12th / FA/FSc/ICS/I.Com)'],
    startDate: 'Active Window',
    endDate: 'Board Schedule 2026',
    deadlineLabel: 'Regular Fee / Double Fee / Triple Fee Windows',
    status: 'Active / Open',
    urgency: 'Critical Milestone',
    badge: 'BISE SARGODHA',
    iconName: 'admission',
    description: 'Online admission forms and online registration returns for Regular & Private candidates under Board of Intermediate & Secondary Education (BISE) Sargodha covering Sargodha, Khushab, Mianwali, and Bhakkar districts.',
    keyActionItems: [
      'Private students download challan and submit online admission form on bisesargodha.edu.pk.',
      'Affiliated schools and colleges submit computerized student registration returns.',
      'Deposit fee at designated Habib Bank Limited (HBL) or Punjab Bank branches.',
      'Educare Help Desk (03451291610) provides admission form submission and challan verification.'
    ],
    officialPortalUrl: 'https://bisesargodha.edu.pk',
    officialPortalName: 'BISE Sargodha Portal',
    helplineHelpTopic: 'BISE Sargodha Admission & Online Form Submission',
    isHighImpact: true
  },
  {
    id: 'cal-adm-overseas-2026',
    title: 'AIOU International & Overseas Pakistani Admissions (Worldwide Intake)',
    semesterCycle: 'Continuous',
    phase: 'Overseas Admissions',
    category: 'Admissions',
    targetPrograms: ['Matric', 'FA', 'I.Com', 'BS (4-Year)', 'B.Ed', 'Postgraduate'],
    startDate: 'Round-the-Year',
    endDate: 'Open Intake',
    deadlineLabel: 'Online Admission Portal Open 24/7',
    status: 'Active / Open',
    urgency: 'Active Window',
    badge: 'OVERSEAS PAKISTANIS',
    iconName: 'admission',
    description: 'Special online academic intake for Overseas Pakistanis living in UAE, Saudi Arabia, Kuwait, Qatar, Oman, Bahrain, USA, UK, and Europe with 100% online exams and online workshops.',
    keyActionItems: [
      'Register on AIOU Overseas Portal: overseas.aiou.edu.pk.',
      'Submit scanned passport copy, valid visa / Iqama, and academic certificates.',
      'Pay fee online using international credit/debit card (Visa / MasterCard).',
      'All assignments uploaded on LMS and examinations conducted through proctored online system.'
    ],
    officialPortalUrl: 'https://overseas.aiou.edu.pk',
    officialPortalName: 'AIOU Overseas Portal',
    helplineHelpTopic: 'Overseas Student Online Admission Guidance',
    isHighImpact: true
  },

  // ==================== ASSIGNMENT DEADLINES ====================
  {
    id: 'cal-ass-aut-mat-fa',
    title: 'Autumn Assignment Submission Deadlines (Matric & FA)',
    semesterCycle: 'Autumn Semester',
    phase: 'Assignment Cycle (School)',
    category: 'Assignment Deadlines',
    targetPrograms: ['Matric (SSC)', 'FA / I.Com (HSSC)'],
    startDate: 'October 15, 2026',
    endDate: 'December 20, 2026',
    deadlineLabel: 'Ass #1: Nov 15 | Ass #2: Dec 20, 2026',
    status: 'Active / Open',
    urgency: 'Critical Milestone',
    badge: 'MANUAL BY POST',
    iconName: 'assignment',
    description: 'Matric and FA students must submit handwritten assignments directly by registered postal mail or courier to their allocated tutor address before the designated cutoff dates.',
    keyActionItems: [
      'Check allocated tutor name, phone number, and postal address on CMS (enrollment.aiou.edu.pk).',
      'Attach 3 copies of AIOU Assignment Cover Forms (Parat) with each handwritten assignment.',
      'Obtain and save postal courier tracking receipts as proof of timely submission.',
      'Educare Help Desk (03451291610) provides verified solved handwritten & printed keybooks.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'AIOU CMS Tutor Details',
    helplineHelpTopic: 'Matric / FA Solved Assignments & Tutor Tracking',
    isHighImpact: true
  },
  {
    id: 'cal-ass-aut-bed-bs',
    title: 'Autumn Assignment Upload Deadlines (BS, B.Ed, AD & Master)',
    semesterCycle: 'Autumn Semester',
    phase: 'LMS Submission Cycle',
    category: 'Assignment Deadlines',
    targetPrograms: ['BS (4-Year)', 'B.Ed (All Tracks)', 'Associate Degree', 'Postgraduate'],
    startDate: 'November 01, 2026',
    endDate: 'January 25, 2027',
    deadlineLabel: 'Ass #1: Dec 20, 2026 | Ass #2: Jan 25, 2027',
    status: 'Active / Open',
    urgency: 'Critical Milestone',
    badge: 'AAGHI LMS UPLOAD',
    iconName: 'assignment',
    description: 'All BS, B.Ed, and Master level students must type and upload assignments in single PDF format (file size strictly under 5MB) onto the AAGHI LMS portal before 11:59 PM of the respective deadline.',
    keyActionItems: [
      'Do NOT submit handwritten scans for BS/B.Ed unless instructed for mathematical/Urdu courses.',
      'Ensure single typed PDF file is uploaded in the correct course code slot.',
      'Confirm the submission status changes from "Draft" to "Submitted for Grading".',
      'Educare Help Desk provides 100% plagiarism-free typed solved assignments (8601, 8611, 8612, etc.).'
    ],
    officialPortalUrl: 'https://aaghi.aiou.edu.pk',
    officialPortalName: 'AAGHI LMS Portal',
    helplineHelpTopic: 'Typed B.Ed / BS Solved Assignments & LMS Upload',
    isHighImpact: true
  },
  {
    id: 'cal-ass-spr-bs-bed',
    title: 'Spring Assignment Upload Deadlines (BS, B.Ed & Postgraduate)',
    semesterCycle: 'Spring Semester',
    phase: 'Spring LMS Cycle',
    category: 'Assignment Deadlines',
    targetPrograms: ['BS', 'B.Ed', 'MA / MSc', 'Postgraduate'],
    startDate: 'May 01, 2026',
    endDate: 'August 15, 2026',
    deadlineLabel: 'Ass #1: June 30 | Ass #2: August 15, 2026',
    status: 'Upcoming',
    urgency: 'Active Window',
    badge: 'SPRING ASSIGNMENTS',
    iconName: 'assignment',
    description: 'Spring semester assignment submission windows on AAGHI LMS for teacher education and professional degree programs.',
    keyActionItems: [
      'Check course syllabus question files on AIOU official website.',
      'Maintain continuous backup of all submitted assignment files.',
      'Tutor grading marks must appear on CMS before final examination date.'
    ],
    officialPortalUrl: 'https://aaghi.aiou.edu.pk',
    officialPortalName: 'AAGHI LMS Portal',
    helplineHelpTopic: 'Spring Solved Assignments Help'
  },

  // ==================== WORKSHOPS & LMS ====================
  {
    id: 'cal-wsp-aut-phase1',
    title: 'Autumn Mandatory Online Workshops (B.Ed, BS & Master on MS Teams)',
    semesterCycle: 'Autumn Semester',
    phase: 'Interactive Workshop Phase',
    category: 'Workshops & LMS',
    targetPrograms: ['B.Ed (1.5, 2.5, 4-Year)', 'BS (4-Year)', 'Associate Degree in Education', 'Master Level'],
    startDate: 'December 15, 2026',
    endDate: 'February 15, 2027',
    deadlineLabel: 'Batch Schedule Released Weekly (70%+ Attendance Req)',
    status: 'Upcoming',
    urgency: 'Critical Milestone',
    badge: 'MANDATORY ATTENDANCE',
    iconName: 'workshop',
    description: 'Online interactive workshops conducted via Microsoft Teams integrated inside AAGHI LMS. Students must attend daily scheduled lectures for 6 days per course code.',
    keyActionItems: [
      'Minimum 70% online attendance is compulsory per course code; failing workshops results in course reappear.',
      'Login credentials: Username is StudentID@aiou.edu.pk, password provided via official SMS.',
      'If workshop schedule clashes or password fails, contact Regional Office or Educare Help Desk (03451291610) immediately.',
      'Quizzes are conducted during or immediately following the final workshop session.'
    ],
    officialPortalUrl: 'https://aaghi.aiou.edu.pk',
    officialPortalName: 'AAGHI LMS Workshop Desk',
    helplineHelpTopic: 'MS Teams Workshop Login & Clashing Resolution',
    isHighImpact: true
  },
  {
    id: 'cal-wsp-spr-phase',
    title: 'Spring Semester Online Workshop Batches (MS Teams)',
    semesterCycle: 'Spring Semester',
    phase: 'Spring Workshop Batches',
    category: 'Workshops & LMS',
    targetPrograms: ['B.Ed', 'BS', 'Postgraduate'],
    startDate: 'June 10, 2026',
    endDate: 'August 20, 2026',
    deadlineLabel: 'Weekly Batches June - August',
    status: 'Upcoming',
    urgency: 'Standard',
    badge: 'SPRING WORKSHOPS',
    iconName: 'workshop',
    description: 'Spring workshop batches for all enrolled semester coursework and specialized teaching practice / research orientation components.',
    keyActionItems: [
      'Check individual student workshop schedule on AAGHI LMS portal.',
      'Join meeting exactly at scheduled time to record server-side attendance timestamps.'
    ],
    officialPortalUrl: 'https://aaghi.aiou.edu.pk',
    officialPortalName: 'AAGHI LMS Portal',
    helplineHelpTopic: 'Spring Workshop Attendance Verification'
  },

  // ==================== EXAM FORMS & DATES ====================
  {
    id: 'cal-exam-aut-phase1-mat-fa',
    title: 'Autumn Final Written Examinations (Phase I: Matric & FA / I.Com)',
    semesterCycle: 'Autumn Semester',
    phase: 'Phase I Final Exams',
    category: 'Exam Forms & Dates',
    targetPrograms: ['Matric (SSC)', 'FA / I.Com (HSSC)'],
    startDate: 'March 01, 2027',
    endDate: 'April 10, 2027',
    deadlineLabel: 'Roll No Slips Released: Mid February 2027',
    status: 'Upcoming',
    urgency: 'Upcoming',
    badge: 'EXAM PHASE I',
    iconName: 'exam',
    description: 'Final physical board examination across all designated AIOU examination centers for Matric and Intermediate programs.',
    keyActionItems: [
      'Download Web Roll Number Slip from CMS (enrollment.aiou.edu.pk) 10 days before exams.',
      'Carry original CNIC / B-Form along with the printed Roll Number Slip to the examination hall.',
      'Educare provides 5-year solved past papers and guess papers for top-tier scores.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'CMS Roll No Slip Portal',
    helplineHelpTopic: 'Matric / FA Roll Number Slip & Past Papers',
    isHighImpact: true
  },
  {
    id: 'cal-exam-aut-phase2-bs-bed',
    title: 'Autumn Final Written Examinations (Phase II: BS, B.Ed, AD & Master)',
    semesterCycle: 'Autumn Semester',
    phase: 'Phase II Final Exams',
    category: 'Exam Forms & Dates',
    targetPrograms: ['BS (4-Year)', 'B.Ed (All Tracks)', 'Associate Degree (BA/B.Com)', 'Master', 'M.Phil'],
    startDate: 'April 15, 2027',
    endDate: 'June 05, 2027',
    deadlineLabel: 'Roll No Slips Live: Early April 2027',
    status: 'Upcoming',
    urgency: 'Critical Milestone',
    badge: 'HIGHER ED EXAMS',
    iconName: 'exam',
    description: 'Final written subjective examinations for all University-level degrees. Standard 3-hour papers (attempt 5 questions out of 8, 20 marks each).',
    keyActionItems: [
      'Strict 35-Minute per question rule applies for optimal 5-question completion.',
      'Center change requests must be submitted to Controller Examinations at least 15 days before paper start.',
      'Pass criterion: 50% in written exam AND 50% in continuous assessment (assignments).',
      'Educare Help Desk (03451291610) provides compiled 5-year question banks & answer outlines.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'CMS Examination Portal',
    helplineHelpTopic: 'B.Ed & BS Exam Strategy & Solved Keybooks',
    isHighImpact: true
  },
  {
    id: 'cal-exam-spr-phase1-mat-fa',
    title: 'Spring Final Written Examinations (Phase I: Matric & FA)',
    semesterCycle: 'Spring Semester',
    phase: 'Spring Exam Phase I',
    category: 'Exam Forms & Dates',
    targetPrograms: ['Matric', 'FA', 'I.Com'],
    startDate: 'September 01, 2026',
    endDate: 'October 05, 2026',
    deadlineLabel: 'Roll No Slips: August 20, 2026',
    status: 'Active / Open',
    urgency: 'Critical Milestone',
    badge: 'EXAMS RUNNING',
    iconName: 'exam',
    description: 'Spring written exams for SSC and HSSC currently scheduling across national examination centers.',
    keyActionItems: [
      'Verify examination hall location and shift timing (Morning 08:30 AM / Evening 02:00 PM).',
      'Electronic gadgets and mobile phones are strictly prohibited in examination centers.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'CMS Portal',
    helplineHelpTopic: 'Exam Center Verification & Roll No Slip'
  },
  {
    id: 'cal-exam-spr-phase2-bs-bed',
    title: 'Spring Final Written Examinations (Phase II: BS, B.Ed & Master)',
    semesterCycle: 'Spring Semester',
    phase: 'Spring Exam Phase II',
    category: 'Exam Forms & Dates',
    targetPrograms: ['BS', 'B.Ed', 'BA / AD', 'Master'],
    startDate: 'October 15, 2026',
    endDate: 'December 05, 2026',
    deadlineLabel: 'Roll No Slips: Early October 2026',
    status: 'Active / Open',
    urgency: 'Critical Milestone',
    badge: 'UPCOMING EXAM CYCLE',
    iconName: 'exam',
    description: 'Final semester examinations for all Bachelor, Teacher Education, and Postgraduate candidates.',
    keyActionItems: [
      'Download roll number slip directly from CMS portal.',
      'Check assignment marks reflection on CMS prior to entering the exam hall.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'CMS Exam Desk',
    helplineHelpTopic: 'Spring BS / B.Ed Exam Preparation & Past Papers',
    isHighImpact: true
  },

  // ==================== RESULT DECLARATIONS ====================
  {
    id: 'cal-res-aut-mat-fa',
    title: 'Autumn Semester Result Declaration (Matric & FA)',
    semesterCycle: 'Autumn Semester',
    phase: 'Result & DMC Gazette',
    category: 'Result Declarations',
    targetPrograms: ['Matric (SSC)', 'FA / I.Com (HSSC)'],
    startDate: 'June 15, 2027',
    endDate: 'July 10, 2027',
    deadlineLabel: 'Expected: Mid June 2027',
    status: 'Upcoming',
    urgency: 'Upcoming',
    badge: 'RESULT GAZETTE',
    iconName: 'result',
    description: 'Official result announcement and composite DMC scorecard release on CMS portal for Matric and Intermediate programs.',
    keyActionItems: [
      'View individual result card with course-wise breakdown on CMS.',
      'Re-checking application window is open for 15 days following the result notification.',
      'Passing students receive provisional certificate (Sanad) by post within 60 days.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'AIOU Web Result Portal',
    helplineHelpTopic: 'Matric/FA Result Verification & Rechecking Forms'
  },
  {
    id: 'cal-res-aut-bs-bed',
    title: 'Autumn Semester Result Declaration (BS, B.Ed, AD & Master)',
    semesterCycle: 'Autumn Semester',
    phase: 'Higher Ed Results',
    category: 'Result Declarations',
    targetPrograms: ['BS (4-Year)', 'B.Ed (All Tracks)', 'Associate Degree', 'Master / PGD'],
    startDate: 'July 25, 2027',
    endDate: 'August 31, 2027',
    deadlineLabel: 'Expected: Late July / August 2027',
    status: 'Upcoming',
    urgency: 'Upcoming',
    badge: 'CMS TRANSCRIPT',
    iconName: 'result',
    description: 'Semester transcript compilation, GPA calculation, and complete degree completion status updates on CMS portal.',
    keyActionItems: [
      'Check combined assignment marks (30%) + exam marks (70%) on the unofficial transcript.',
      'Reappear / Again Reappear course codes can be registered in the subsequent enrollment cycle.',
      'Graduates can submit online Degree Tracking System (DTS) applications for fast-track degree issuance.',
      'Educare Help Desk (03451291610) provides assistance with degree issuance and HEC attestation guidance.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'AIOU CMS Portal',
    helplineHelpTopic: 'Transcript Verification & Degree Application',
    isHighImpact: true
  },
  {
    id: 'cal-res-spr-mat-fa',
    title: 'Spring Semester Result Announcement (Matric & FA)',
    semesterCycle: 'Spring Semester',
    phase: 'Spring Result Window',
    category: 'Result Declarations',
    targetPrograms: ['Matric', 'FA', 'I.Com'],
    startDate: 'December 20, 2026',
    endDate: 'January 15, 2027',
    deadlineLabel: 'Late December 2026',
    status: 'Upcoming',
    urgency: 'Standard',
    badge: 'SPRING RESULTS',
    iconName: 'result',
    description: 'Spring semester complete result notifications for school-level certificate and intermediate programs.',
    keyActionItems: [
      'Official web gazette downloadable in PDF format.',
      'Apply for un-evaluated paper scrutiny within 15 days of announcement.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'Result Portal',
    helplineHelpTopic: 'Spring Result Scrutiny Forms'
  },
  {
    id: 'cal-res-spr-bs-bed',
    title: 'Spring Semester Result Announcement (BS, B.Ed & Master)',
    semesterCycle: 'Spring Semester',
    phase: 'Spring Higher Ed Results',
    category: 'Result Declarations',
    targetPrograms: ['BS', 'B.Ed', 'Associate Degree', 'Master'],
    startDate: 'January 25, 2027',
    endDate: 'February 28, 2027',
    deadlineLabel: 'Late January / February 2027',
    status: 'Upcoming',
    urgency: 'Standard',
    badge: 'SPRING TRANSCRIPTS',
    iconName: 'result',
    description: 'Comprehensive Spring results for BS 4-Year, B.Ed, and Master degrees.',
    keyActionItems: [
      'Review continuous assessment grade integration.',
      'Download unofficial web transcript for employment and higher education applications.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'CMS Portal',
    helplineHelpTopic: 'Unofficial Web Transcript Assistance'
  },

  // ==================== ENROLLMENT & CONTINUOUS FEES ====================
  {
    id: 'cal-enr-cont-students',
    title: 'Continuing Student Semester Course Registration & Fee Challan',
    semesterCycle: 'Continuous',
    phase: 'All Continuing Batches',
    category: 'Enrollment & Fees',
    targetPrograms: ['Matric', 'FA', 'BA', 'BS', 'B.Ed', 'Master', 'MPhil', 'PhD'],
    startDate: 'Active Throughout Admission Periods',
    endDate: 'Aligned with Phase I / Phase II Deadlines',
    deadlineLabel: 'Must Enroll Before Late Fee Cutoff',
    status: 'Continuous',
    urgency: 'Critical Milestone',
    badge: 'CMS COURSE SELECTION',
    iconName: 'fee',
    description: 'All 2nd, 3rd, 4th, 5th, 6th, 7th, and 8th semester continuing students must login to CMS (Course Registration tile) to select subsequent semester course codes and generate digital fee challans.',
    keyActionItems: [
      'Go to enrollment.aiou.edu.pk → Course Registration → Student Enrollment.',
      'Select your next semester from the dropdown (e.g., 02, 03, 04) and add required compulsory/elective courses.',
      'Download fee invoice and pay via Mobile App (JazzCash/Easypaisa/Upaisa) using the 1Link Consumer ID.',
      'Educare Help Desk (03451291610) provides step-by-step guidance for failed challans or missed codes.'
    ],
    officialPortalUrl: 'https://enrollment.aiou.edu.pk',
    officialPortalName: 'CMS Course Enrollment',
    helplineHelpTopic: 'Continuing Course Enrollment & Challan Payment Help',
    isHighImpact: true
  },
  {
    id: 'cal-deg-verification-window',
    title: 'Fast-Track Degree Issuance & HEC Attestation Window',
    semesterCycle: 'Continuous',
    phase: 'All Graduates',
    category: 'Enrollment & Fees',
    targetPrograms: ['All Graduating Batches (BA, BS, B.Ed, MA, MPhil, PhD)'],
    startDate: 'Continuous Year-Round',
    endDate: 'Open 365 Days',
    deadlineLabel: 'Urgent: 7 Days | Normal: 45 Days',
    status: 'Continuous',
    urgency: 'Standard',
    badge: 'DEGREE TRACKING (DTS)',
    iconName: 'calendar',
    description: 'Graduating students can track, apply, and expedite urgent degree issuance, provisional certificates, and HEC equivalence certificates via the online Degree Tracking System (DTS).',
    keyActionItems: [
      'Verify that all semester assignments and exam marks are complete on the CMS transcript.',
      'Submit DTS online application with attested copies of Matric, Inter, and previous degree certificates.',
      'Educare Help Desk facilitates regional collection and courier dispatch verification across Pakistan.'
    ],
    officialPortalUrl: 'https://dts.aiou.edu.pk',
    officialPortalName: 'AIOU Degree Tracking System (DTS)',
    helplineHelpTopic: 'Degree Tracking & Urgent Certificate Dispatch',
    isHighImpact: true
  }
];

export const CALENDAR_CATEGORIES: CalendarCategory[] = [
  'All',
  'Admissions',
  'Assignment Deadlines',
  'Workshops & LMS',
  'Exam Forms & Dates',
  'Result Declarations',
  'Enrollment & Fees'
];

export const SEMESTER_CYCLES: SemesterCycle[] = [
  'All',
  'Autumn Semester',
  'Spring Semester',
  'Continuous'
];
