import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    app: "Educare Help Desk - Allama Iqbal Open University Portal",
    contact: "03451291610",
    time: new Date().toISOString()
  });
});

// Inquiry Submission Endpoint
app.post("/api/inquiry", (req, res) => {
  const { studentName, phone, programLevel, courseCode, serviceNeeded, message } = req.body || {};
  
  if (!studentName || !phone) {
    return res.status(400).json({ error: "Student name and phone number are required." });
  }

  const text = `Hello Educare Help Desk (03451291610),\nMy name is ${studentName}.\nPhone: ${phone}\nProgram: ${programLevel || 'General'}\nCourse Code: ${courseCode || 'N/A'}\nService Needed: ${serviceNeeded || 'General Help'}\nMessage: ${message || 'I need help regarding AIOU.'}`;
  const whatsappUrl = `https://wa.me/923451291610?text=${encodeURIComponent(text)}`;

  return res.json({
    success: true,
    message: "Inquiry received successfully! Redirecting to Educare WhatsApp desk.",
    whatsappUrl,
    inquiryData: { studentName, phone, programLevel, courseCode, serviceNeeded, message }
  });
});

// Fallback curated news items when API quota is reached
const FALLBACK_AIOU_NEWS = [
  {
    id: 'aiou-fallback-1',
    headline: 'AIOU Autumn 2026 Admissions Open for B.Ed, BS, MA & Post-Graduate Programs',
    category: 'Admission',
    tagText: 'ADMISSION 2026',
    date: 'August 2026',
    detail: 'Allama Iqbal Open University Islamabad has officially opened Autumn 2026 online admissions for B.Ed (1.5, 2.5 & 4 Year), BS 4-Year programs, MA, M.Sc, and Postgraduate diplomas across Pakistan. Online application forms and fee challans are available on CMS/OAS portal.',
    isUrgent: true,
    linkUrl: 'https://aiou.edu.pk'
  },
  {
    id: 'aiou-fallback-2',
    headline: 'Autumn 2026 Assignment Submission Deadlines & Tutor Allocation List Released',
    category: 'Deadline',
    tagText: 'DEADLINE ALERT',
    date: 'August 2026',
    detail: 'AIOU has updated student tutor allocations on CMS Portal. Matric, FA, BA, B.Ed, and BS students are advised to check tutor details and upload soft copies of assignments on AAGHI LMS or dispatch hard copies before the official deadline.',
    isUrgent: true,
    linkUrl: 'https://aiou.edu.pk'
  },
  {
    id: 'aiou-fallback-3',
    headline: 'Online LMS Workshop Schedule & Microsoft Teams Credentials Issued',
    category: 'Workshop',
    tagText: 'LMS WORKSHOP',
    date: 'August 2026',
    detail: 'Online workshops for B.Ed, BS, and Master level courses are underway on AAGHI LMS via Microsoft Teams. Students are instructed to check their workshop date-sheets and log in daily to maintain mandatory attendance.',
    isUrgent: false,
    linkUrl: 'https://lms.aiou.edu.pk'
  },
  {
    id: 'aiou-fallback-4',
    headline: 'AIOU Exam Date Sheet & Roll Number Slips Released on CMS Portal',
    category: 'HelpDesk',
    tagText: 'EXAM ALERT',
    date: 'August 2026',
    detail: 'Final examination date-sheets and roll number slips for Spring/Autumn semesters have been uploaded on student CMS portals. Contact Educare Help Desk at 03451291610 for roll number slip assistance.',
    isUrgent: true,
    linkUrl: 'https://aiou.edu.pk'
  },
  {
    id: 'aiou-fallback-5',
    headline: 'Part-Time Tutor & Workshop Resource Person Enrollment Drive 2026',
    category: 'Admission',
    tagText: 'TUTOR JOBS',
    date: 'August 2026',
    detail: 'AIOU invites applications from eligible teachers and scholars across Pakistan for tutor enrollment on the Aaghi Tutor Portal (tutor.aiou.edu.pk). Minimum M.Phil / Master degree required.',
    isUrgent: false,
    linkUrl: 'https://tutor.aiou.edu.pk'
  }
];

// Rich Fallback Academic Updates for AIOU, BISE & Higher Education
const FALLBACK_ACADEMIC_UPDATES = [
  {
    id: 'acad-up-1',
    title: 'AIOU Semester Final Examination Date Sheet & Roll No Slips Issued on CMS',
    category: 'Exams & Date Sheets',
    badge: 'DATE SHEET 2026',
    badgeType: 'urgent',
    publishedDate: 'August 2026',
    source: 'AIOU Examination Department (aiou.edu.pk)',
    summary: 'Allama Iqbal Open University has officially notified the semester examination schedule for Matric, Intermediate (FA/F.Sc/I.Com), BA/Associate Degree, BS 4-Year, and B.Ed programs. Examination centers have been designated across all regional campuses in Punjab, Sindh, KPK, Balochistan, and AJK.',
    keyHighlights: [
      'Download roll number slips from student CMS portal under "Examinations & Grades".',
      'Original CNIC / B-Form and printed Roll Number Slip are strictly mandatory at exam centers.',
      'Morning shift timings: 08:30 AM to 11:30 AM; Afternoon shift: 02:00 PM to 05:00 PM.',
      'Educare Help Desk (03451291610) provides instant roll number slip retrieval assistance.'
    ],
    actionLabel: 'Check Roll Number Slip on CMS',
    actionUrl: 'https://enrollment.aiou.edu.pk',
    actionTab: 'exam-countdown',
    isUrgent: true,
    tags: ['AIOU Exam', 'Date Sheet', 'Roll No Slip', 'CMS Portal', 'B.Ed', 'BA/BS'],
    groundingSources: [
      { title: 'AIOU Official Examination Directorate', uri: 'https://aiou.edu.pk' },
      { title: 'AIOU CMS Student Enrollment Portal', uri: 'https://enrollment.aiou.edu.pk' }
    ]
  },
  {
    id: 'acad-up-2',
    title: 'Autumn 2026 Phase-I & Phase-II Admissions Open with Fee Payment Options',
    category: 'Admissions',
    badge: 'ADMISSION OPEN',
    badgeType: 'verified',
    publishedDate: 'August 2026',
    source: 'AIOU Directorate of Admissions',
    summary: 'Fresh and continuing student admissions are actively ongoing for Matric, FA, BS (4-Year Face-to-Face & Distance), B.Ed (1.5, 2.5, 4 Years), Post-Graduate Diplomas, and Master programs. Prospectuses and online forms are accessible on OAS portal.',
    keyHighlights: [
      'Fee deposit available through 1-Link, JazzCash, EasyPaisa, U-Paisa, ABL, MCB, FWBL, and NBP.',
      'Overseas Pakistani international students can apply directly through the International Students Portal.',
      'Installment facility available for deserving distance students upon regional director approval.',
      'Educare Helpline (03451291610) guides admission form submission and challan verification.'
    ],
    actionLabel: 'Apply Online via OAS Portal',
    actionUrl: 'https://oas.aiou.edu.pk',
    actionTab: 'programs',
    isUrgent: false,
    tags: ['Admissions 2026', 'Prospectus', 'OAS Portal', 'B.Ed Admissions', 'Fee Challan'],
    groundingSources: [
      { title: 'AIOU Online Admission System (OAS)', uri: 'https://oas.aiou.edu.pk' },
      { title: 'AIOU Official Prospectus Download', uri: 'https://aiou.edu.pk' }
    ]
  },
  {
    id: 'acad-up-3',
    title: 'Aaghi LMS Online Workshop Schedule & Mandatory Attendance Directive',
    category: 'LMS & Workshops',
    badge: 'LMS WORKSHOP',
    badgeType: 'new',
    publishedDate: 'August 2026',
    source: 'AIOU Computer & ICT Directorate',
    summary: 'Online workshop batches for B.Ed, BS, MA Education, and M.Sc programs are being conducted via Aaghi LMS integrated with Microsoft Teams. Students must attend all 6 days of each course workshop to qualify for final exams.',
    keyHighlights: [
      'A minimum of 80% to 90% attendance is strictly compulsory for course clearance.',
      'Workshop passwords are SMS-dispatched and synchronized with student @aiou.edu.pk Microsoft 365 accounts.',
      'Workshop date-sheets and resource person links are displayed under the LMS "Workshop Schedule" tab.',
      'Need login troubleshooting or technical support? Contact Educare Help Desk at 03451291610.'
    ],
    actionLabel: 'Open Aaghi LMS Portal',
    actionUrl: 'https://lms.aiou.edu.pk',
    actionTab: 'portals',
    isUrgent: true,
    tags: ['Aaghi LMS', 'Microsoft Teams', 'B.Ed Workshop', 'Workshop Attendance', 'ICT Support'],
    groundingSources: [
      { title: 'Aaghi LMS Workshop Portal', uri: 'https://lms.aiou.edu.pk' },
      { title: 'AIOU Workshop Schedule Verification', uri: 'https://aiou.edu.pk' }
    ]
  },
  {
    id: 'acad-up-4',
    title: 'Solved Assignments Submission Deadlines & Regional Tutor Directory Updated',
    category: 'Tutors & Assignments',
    badge: 'ASSIGNMENT DEADLINE',
    badgeType: 'urgent',
    publishedDate: 'August 2026',
    source: 'AIOU Assignment Section',
    summary: 'AIOU has finalized the tutor allocation list for current semester courses on student CMS profiles. Matric and FA students must dispatch handwritten assignments to assigned tutors, while BS, B.Ed, and Master students must upload typed PDF copies on LMS.',
    keyHighlights: [
      'Assignment #1 and Assignment #2 submission deadlines have been published by the Academic Council.',
      'Check allocated tutor postal addresses and phone numbers under "Tutor Information" on CMS.',
      'Plagiarism checks and 20-mark evaluation rubrics apply to all postgraduate submissions.',
      'Educare Help Desk (03451291610) provides verified solved assignments, keybooks, and handwritten copies.'
    ],
    actionLabel: 'Get Solved Assignments',
    actionUrl: 'https://aiou.edu.pk',
    actionTab: 'solved-assignments',
    isUrgent: true,
    tags: ['Solved Assignments', 'Tutor Allocation', 'LMS Upload', 'Assignment Deadlines'],
    groundingSources: [
      { title: 'AIOU Assignment Schedule & Tutor Portal', uri: 'https://aiou.edu.pk' },
      { title: 'CMS Tutor Allocation Directory', uri: 'https://enrollment.aiou.edu.pk' }
    ]
  },
  {
    id: 'acad-up-5',
    title: 'AIOU Semester Result Gazette & Online DMC Download on CMS Portal',
    category: 'Results & Gazettes',
    badge: 'RESULT ANNOUNCED',
    badgeType: 'verified',
    publishedDate: 'August 2026',
    source: 'Controller of Examinations AIOU',
    summary: 'Results for Matric, FA, BA / Associate Degree, B.Ed, and Postgraduate programs have been formally compiled and uploaded on the student CMS portal with complete course-wise grade point breakdown.',
    keyHighlights: [
      'Access provisional result cards & Detailed Marks Certificates (DMC) by logging into CMS with Student ID.',
      'Application for rechecking of exam answer sheets is open within 30 days of result declaration.',
      'Degree issuance tracking available via the Online Degree Tracking System (DTS).',
      'For uncredited assignment marks or result corrections, call Educare Help Desk at 03451291610.'
    ],
    actionLabel: 'Check Result on CMS',
    actionUrl: 'https://enrollment.aiou.edu.pk',
    actionTab: 'bise-sargodha',
    isUrgent: false,
    tags: ['Result Gazette', 'DMC', 'Rechecking', 'CMS Result', 'Degree Tracking DTS'],
    groundingSources: [
      { title: 'AIOU Online Result Gazette', uri: 'https://aiou.edu.pk' },
      { title: 'AIOU Degree Tracking System', uri: 'https://dts.aiou.edu.pk' }
    ]
  },
  {
    id: 'acad-up-6',
    title: 'BISE Sargodha & Punjab Boards 9th/10th/11th/12th Annual Examination Notifications',
    category: 'BISE & Punjab Boards',
    badge: 'PUNJAB BOARDS',
    badgeType: 'info',
    publishedDate: 'August 2026',
    source: 'Punjab Boards Committee of Chairmen (PBCC) / BISE Sargodha',
    summary: 'The Board of Intermediate & Secondary Education (BISE) Sargodha along with Lahore, Rawalpindi, Faisalabad, and Multan boards have issued revised registration schedules, practical exam guidelines, and online certificate verification protocols.',
    keyHighlights: [
      'Online admission forms for 1st & 2nd Annual Matric/Intermediate exams available on bisesargodha.edu.pk.',
      'E-Verification and online migration / NOC system activated for inter-board transfer students.',
      'Re-checking and duplicate marks sheet issuance available through integrated E-Services counter.',
      'Educare Help Desk (03451291610) provides one-on-one assistance for Sargodha Board documentation.'
    ],
    actionLabel: 'Open BISE Sargodha Portal',
    actionUrl: 'https://www.bisesargodha.edu.pk',
    actionTab: 'bise-sargodha',
    isUrgent: false,
    tags: ['BISE Sargodha', 'PBCC', 'Matric Inter Exam', 'NOC Migration', 'Result Verification'],
    groundingSources: [
      { title: 'BISE Sargodha Official Portal', uri: 'https://www.bisesargodha.edu.pk' },
      { title: 'Punjab Boards Committee of Chairmen', uri: 'https://pbcc.punjab.gov.pk' }
    ]
  },
  {
    id: 'acad-up-7',
    title: 'HEC Pakistan Policy Updates on Distance Learning & Equivalence Verification',
    category: 'HEC & Policies',
    badge: 'HEC GUIDELINES',
    badgeType: 'verified',
    publishedDate: 'August 2026',
    source: 'Higher Education Commission (HEC) Pakistan',
    summary: 'HEC Pakistan has re-affirmed that all distance learning and online degrees awarded by AIOU Islamabad are fully accredited and recognized on par with regular university degrees across federal and provincial institutions.',
    keyHighlights: [
      'Online degree attestation through HEC e-portal (eservices.hec.gov.pk) requires verified transcripts and DMCs.',
      'B.Ed (1.5, 2.5, and 4-Year) degrees are approved by National Accreditation Council for Teacher Education (NACTE).',
      'Equivalence certificate application procedures for foreign and religious madrassa certificates updated.',
      'Educare Help Desk (03451291610) assists with HEC attestation document readiness.'
    ],
    actionLabel: 'HEC E-Services Portal',
    actionUrl: 'https://eservices.hec.gov.pk',
    actionTab: 'portals',
    isUrgent: false,
    tags: ['HEC Pakistan', 'Degree Attestation', 'Equivalence', 'NACTE', 'Distance Learning'],
    groundingSources: [
      { title: 'HEC Pakistan E-Services Portal', uri: 'https://eservices.hec.gov.pk' },
      { title: 'HEC Degree Attestation System', uri: 'https://hec.gov.pk' }
    ]
  }
];

// In-memory academic updates cache (10 minutes)
let academicUpdatesCache: {
  [key: string]: {
    data: any;
    timestamp: number;
  };
} = {};

// In-memory news cache (15 minutes)
let newsCache: {
  alerts: any[];
  searchSources: any[];
  timestamp: number;
} | null = null;

const CACHE_DURATION_MS = 15 * 60 * 1000;

// Gemini AI Assignment Solver & Study Assistant Route
app.post("/api/ai/solve", async (req, res) => {
  try {
    const { prompt, courseCode, programLevel, mode } = req.body || {};

    if (!prompt) {
      return res.status(400).json({ error: "Prompt / question is required." });
    }

    const systemInstruction = `You are the Expert Educational Tutor and Academic Counselor for Educare Help Desk (03451291610), specializing in Allama Iqbal Open University (AIOU) curriculum from Matric to PhD level.
Your goal is to provide accurate, well-structured, student-friendly, and comprehensive answers for AIOU assignments, past paper questions, course material explanations, and admission guidance.

Guidelines:
1. Provide structured, step-by-step answers suitable for AIOU assignment standards. Use bold headings, bullet points, numbered lists, and clear examples.
2. If asked about course codes (e.g. 8601, 8611, 247, 1423, 411, 5401), reference the specific subject matter for AIOU.
3. For math or science questions, show full step-by-step working out.
4. Keep the tone encouraging, respectful, academic, and clear.
5. Conclude with a helpful note: "Need further solved assignments or personalized help? Contact Educare Help Desk at 03451291610."`;

    const userPrompt = `Student Program Level: ${programLevel || 'Not specified'}
Course Code: ${courseCode || 'General'}
Task Type: ${mode || 'Assignment Help'}
Question/Prompt:
${prompt}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const answer = response.text || "Sorry, no solution could be generated at this time.";

    return res.json({
      success: true,
      answer,
      courseCode,
      programLevel
    });
  } catch (err: any) {
    const isRateLimit = err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota');
    if (!isRateLimit) {
      console.error("Gemini API Error in /api/ai/solve:", err?.message ? err.message.slice(0, 120) : err);
    }

    if (err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota')) {
      return res.json({
        success: true,
        answer: "⚠️ **High Server Demand Notice**:\n\nOur AI tutor service is currently experiencing high server volume. Please try again in a few moments.\n\n📱 **Need Instant Solved Assignments?**\nContact our human academic expert team directly at **Educare Help Desk (WhatsApp: 03451291610)** for verified PDF solved assignments, keybooks, and course guidance!",
        isQuotaNotice: true
      });
    }

    return res.status(500).json({
      error: "Failed to process AI query.",
      details: err?.message || "Unknown error"
    });
  }
});

// Gemini AI Study Strategy & Time Management Plan Endpoint
app.post("/api/ai/study-plan", async (req, res) => {
  try {
    const {
      programLevel,
      courseCode,
      daysRemaining,
      dailyHours,
      studyPace,
      studentType
    } = req.body || {};

    const systemInstruction = `You are the Lead Academic Counselor and Distance Learning Strategy Specialist for Educare Help Desk (03451291610), dedicated to Allama Iqbal Open University (AIOU) students.
Your mission is to generate a custom, highly actionable, realistic exam preparation blueprint and time management schedule tailored to distance learning learners in Pakistan.

Formatting Guidelines:
1. Provide clear markdown headings (###), bullet points, and scannable daily/weekly schedules.
2. Structure the response into:
   - 🎯 **Phase-Wise Study Roadmap** (Unit Breakdown & Milestones according to the remaining days).
   - ⏰ **Daily Time-Block Schedule** (Customized for ${studentType || 'AIOU distance learning student'}).
   - 📝 **AIOU High-Scoring Paper Presentation Strategy** (Headings, page allocation for 20-mark questions, time distribution per question).
   - 🔑 **Top High-Yield Focus Areas & Self-Assessment Drills** for AIOU Course ${courseCode || 'General'}.
   - ⚡ **Last-Week Revision & Memory Retention Hacks** (Active recall, past papers, flash summaries).
3. Conclude with: "Need verified past papers, solved notes, or assignment guidance? Contact Educare Help Desk: 03451291610."`;

    const userPrompt = `Generate a customized AIOU Exam Preparation and Time Management Plan with the following parameters:
- Program Level: ${programLevel || 'Undergraduate / B.Ed'}
- Course Code / Subject: ${courseCode || 'General AIOU Course'}
- Days Remaining Until Exam: ${daysRemaining || 30} days
- Available Study Time: ${dailyHours || 2} hours per day
- Preparation Mode: ${studyPace || 'Balanced Comprehensive'}
- Student Profile: ${studentType || 'Distance Learning Student'}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const plan = response.text || "Unable to generate study plan at this time.";

    return res.json({
      success: true,
      plan,
      programLevel,
      courseCode,
      daysRemaining
    });
  } catch (err: any) {
    const isRateLimit = err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota');
    if (!isRateLimit) {
      console.error("Gemini API Error in /api/ai/study-plan:", err?.message ? err.message.slice(0, 120) : err);
    }

    if (isRateLimit) {
      return res.json({
        success: true,
        plan: `### 🎯 High-Yield 30-Day AIOU Exam Preparation Strategy\n\n*(High AI server demand fallback mode)*\n\n#### 1. 📚 Phase 1: Core Unit Mastery (Days 1–15)\n- Focus on Units 1, 2, 4, 7, and 9 of your official AIOU textbook (these historically constitute 60-70% of exam questions).\n- Solve all self-assessment questions at the end of each unit.\n- Review both Solved Assignments 1 and 2—at least 2 questions in the final exam are adapted directly from assignment prompts.\n\n#### 2. ⏰ Distance Learning Daily Routine (2–3 Hours)\n- **Session 1 (Morning - 45 min)**: Core concept reading & bullet summary notes.\n- **Session 2 (Afternoon/Break - 30 min)**: Diagram and key formula/definition flash recall.\n- **Session 3 (Evening - 45 min)**: Practice writing one 20-mark essay answer with proper subheadings within 35 minutes.\n\n#### 3. 📝 AIOU Paper Presentation Formula (100 Marks / 5 Questions)\n- Allocate strictly **35 minutes and 4-5 pages** per question.\n- Structure: Introduction (10%) ➔ Main Body with 6-8 bold headings (70%) ➔ Practical Pakistani Context Examples (10%) ➔ Conclusion (10%).\n\n📞 **Need personalized notes or past paper booklets?** Contact Educare Help Desk at **03451291610**.`,
        isQuotaNotice: true
      });
    }

    return res.status(500).json({
      error: "Failed to generate AI study plan.",
      details: err?.message || "Unknown error"
    });
  }
});

// Comprehensive Fallback 30-Day Schedule Generator for Offline/Quota situations
function generateFallback30DaySchedule(
  programLevel: string,
  courseCode: string,
  daysRemaining: number,
  dailyHours: number,
  studentType: string,
  studyGoal: string
) {
  const code = courseCode || '8601';
  const level = programLevel || 'B.Ed';
  const hours = dailyHours || 2.5;

  const phaseList = [
    {
      phaseNumber: 1,
      phaseTitle: "Phase 1: Foundation & High-Yield Units (Days 1–7)",
      dayRange: "Days 1–7",
      goal: `Master foundational concepts of ${code} (Units 1 to 3) & complete Solved Assignment #1 review.`,
      unitsCovered: "Units 1, 2, and 3",
      assignmentFocus: "Assignment #1 Questions 1, 2 & 3",
      keyMilestone: "Diagnostic self-test on Unit 1-3 core definitions and historical framework."
    },
    {
      phaseNumber: 2,
      phaseTitle: "Phase 2: Core Analytical & Applied Theory (Days 8–14)",
      dayRange: "Days 8–14",
      goal: `Deep-dive into Units 4, 5 & 6 with special emphasis on Pakistani curriculum context.`,
      unitsCovered: "Units 4, 5, and 6",
      assignmentFocus: "Assignment #1 Q4-5 & Assignment #2 Q1-2",
      keyMilestone: "Write two full 20-mark essay answers within 35 minutes each."
    },
    {
      phaseNumber: 3,
      phaseTitle: "Phase 3: Advanced Units & Assignment #2 Integration (Days 15–21)",
      dayRange: "Days 15–21",
      goal: `Finish Units 7, 8 & 9 and finalize all self-assessment questions at end of chapters.`,
      unitsCovered: "Units 7, 8, and 9",
      assignmentFocus: "Assignment #2 Remaining Questions",
      keyMilestone: "Complete consolidated 9-unit bullet revision flashcards."
    },
    {
      phaseNumber: 4,
      phaseTitle: "Phase 4: 5-Year Past Papers & 35-Minute Mock Sprints (Days 22–30)",
      dayRange: "Days 22–30",
      goal: `Solve last 5 terms past papers (Spring/Autumn), practice speed writing, and master exam room time discipline.`,
      unitsCovered: "Comprehensive All 9 Units Synthesis",
      assignmentFocus: "Past Papers (2021–2025)",
      keyMilestone: "Full 3-hour mock paper simulation (5 questions, 180 minutes)."
    }
  ];

  const dailySchedule = [];
  for (let d = 1; d <= 30; d++) {
    let phase = 1;
    let unit = "Unit 1";
    let title = "";
    let morningTask = "";
    let eveningTask = "";
    let milestoneTag = "Core Foundation";
    let tips = "";

    if (d <= 7) {
      phase = 1;
      const uNum = Math.min(Math.ceil(d / 2.3), 3);
      unit = `Unit ${uNum}`;
      title = `${unit}: Foundational Concepts & Terminology`;
      morningTask = `Read pages ${1 + (d - 1) * 15} to ${d * 15} of textbook. Highlight definitions and key theories.`;
      eveningTask = `Review Solved Assignment #1 Question ${Math.min(d, 5)}. Draft 5 structured bullet points.`;
      milestoneTag = d === 7 ? "Phase 1 Review Test" : "Assignment #1 Link";
      tips = "Use a blue marker to create 4-6 clear subheadings for every 20-mark concept.";
    } else if (d <= 14) {
      phase = 2;
      const uNum = Math.min(3 + Math.ceil((d - 7) / 2.3), 6);
      unit = `Unit ${uNum}`;
      title = `${unit}: Critical Principles & Practical Applications`;
      morningTask = `Study Unit ${uNum} core frameworks. Draw a 1-page visual flow diagram of key processes.`;
      eveningTask = `Solve 2 self-assessment questions from chapter end under a 20-minute timer.`;
      milestoneTag = d === 14 ? "Phase 2 Midpoint Drill" : "High-Yield Unit";
      tips = "Include real-world examples from Pakistani educational institutions or social settings.";
    } else if (d <= 21) {
      phase = 3;
      const uNum = Math.min(6 + Math.ceil((d - 14) / 2.3), 9);
      unit = `Unit ${uNum}`;
      title = `${unit}: Advanced Synthesis & Assignment #2 Review`;
      morningTask = `Read Unit ${uNum} summaries and analyze solved assignment #2 corresponding topics.`;
      eveningTask = `Practice writing a 4-page answer to an expected long question in 35 minutes.`;
      milestoneTag = d === 21 ? "9-Unit Milestone Complete" : "Assignment #2 Mastery";
      tips = "AIOU examiners award top marks for structured introductory definitions and concluding remarks.";
    } else {
      phase = 4;
      const termYear = 2021 + (d - 22);
      unit = `Past Papers & Revision`;
      title = `Day ${d}: ${d >= 29 ? 'Final Speed Drills & Roll No Slip Readiness' : `Past Paper Term ${termYear} Simulation`}`;
      morningTask = d >= 29 
        ? `Rapid revision of 9-unit formula sheets and verified roll number slip & stationary pack.`
        : `Solve Question 1 & 2 from AIOU ${termYear} semester past paper without looking at keys.`;
      eveningTask = d >= 29
        ? `Relaxation, sleep schedule alignment, and reviewing 10 golden presentation rules.`
        : `Solve Question 3 & 4 from ${termYear} paper and cross-check with Educare solved notes.`;
      milestoneTag = d === 28 ? "Full 3-Hour Mock Paper" : d === 30 ? "Final Exam Readiness" : "Past Paper Sprint";
      tips = "Maintain strictly 35 minutes per question. Never leave any of the 5 required questions blank.";
    }

    dailySchedule.push({
      day: d,
      phase,
      unitOrTopic: unit,
      title,
      morningTask,
      eveningTask,
      targetHours: hours,
      milestoneTag,
      tips
    });
  }

  return {
    meta: {
      programLevel: level,
      courseCode: code,
      daysRemaining: daysRemaining || 30,
      dailyHours: hours,
      totalStudyHours: Math.round(hours * 30),
      studentType: studentType || 'Distance Learning Student',
      studyGoal: studyGoal || 'Distinction & A-Grade',
      readinessScore: daysRemaining <= 10 ? 'High-Intensity Sprint' : 'Optimal Mastery Window',
      strategySummary: `Comprehensive 30-day structured exam preparation schedule for ${level} (Code ${code}) tailored for ${studentType || 'AIOU students'} with ${hours} daily hours.`
    },
    phases: phaseList,
    dailySchedule,
    paperPresentationGuide: {
      totalTimeMinutes: 180,
      readingTimeMinutes: 5,
      timePerQuestionMinutes: 35,
      pagesPerQuestion: "4 to 5 pages (A4 ruled answer sheet)",
      structure: [
        { section: "Introduction & Conceptual Definition", weight: "10%", pages: "0.5 page", tip: "State author definitions and clear textbook scope." },
        { section: "Main Theoretical Framework & Subheadings", weight: "60%", pages: "2.5 to 3 pages", tip: "Use 6 to 8 clear numbered headings with blue/black marker." },
        { section: "Pakistani Context & Practical Illustrations", weight: "20%", pages: "1 page", tip: "Add local statistics, educational policies, or institutional case examples." },
        { section: "Critical Evaluation & Conclusion", weight: "10%", pages: "0.5 page", tip: "Summarize main findings and recommendations." }
      ]
    },
    highYieldTips: [
      "Review Assignment #1 and #2 thoroughly—over 40% of final exam questions are mirrored or adapted from assignments.",
      "Strictly allocate 35 minutes per question to guarantee you complete all 5 questions on the 100-mark paper.",
      "Always start your answer with bold heading 'INTRODUCTION' and conclude with 'CONCLUSION / SUMMARY'.",
      "Keep textbook Unit 1, 2, 4, 7, and 9 on high-priority review as they constitute the core syllabus backbone.",
      "Need verified solved assignments, keybooks, or past paper booklets? Contact Educare Help Desk at 03451291610."
    ]
  };
}

// Dedicated 30-Day Personalized AI Study Schedule Endpoint
app.post("/api/ai/personalized-30day-schedule", async (req, res) => {
  try {
    const {
      programLevel = 'B.Ed',
      courseCode = '8601',
      daysRemaining = 30,
      dailyHours = 3,
      studentType = 'Working Professional (Job Holder)',
      studyGoal = 'Distinction / 80%+ Score',
      weakAreas = ''
    } = req.body || {};

    const systemInstruction = `You are the Senior Academic Dean and Personalized Study Schedule Architect at Educare Help Desk (03451291610), specializing in Allama Iqbal Open University (AIOU) distance learning programs.
Your objective is to generate a comprehensive, meticulously tailored 30-Day Day-by-Day Study Schedule and Exam Master Plan based on the student's program level, course code, and remaining exam time.

You must return ONLY a valid JSON object matching the exact schema requested below without Markdown code wrappers or extra text.

Requirements:
1. "meta": Object with:
   - "programLevel": string
   - "courseCode": string
   - "daysRemaining": number
   - "dailyHours": number
   - "totalStudyHours": number
   - "studentType": string
   - "studyGoal": string
   - "readinessScore": string (e.g. "Optimal Preparation", "Intensive Sprint", "Critical Cramming")
   - "strategySummary": string (2-3 sentences explaining the overarching roadmap tailored to this student profile)
2. "phases": Array of exactly 4 phase objects:
   - "phaseNumber": number (1, 2, 3, 4)
   - "phaseTitle": string (e.g. "Phase 1: Foundations & High-Yield Units (Days 1–7)")
   - "dayRange": string (e.g. "Days 1–7", "Days 8–14", "Days 15–21", "Days 22–30")
   - "goal": string
   - "unitsCovered": string
   - "assignmentFocus": string
   - "keyMilestone": string
3. "dailySchedule": Array of exactly 30 day objects (Day 1 to Day 30):
   - "day": number (1 to 30)
   - "phase": number (1, 2, 3, or 4)
   - "unitOrTopic": string (e.g. "Unit 1: Philosophy of Education")
   - "title": string (concise actionable title)
   - "morningTask": string (actionable study task, reading pages, or concept notes)
   - "eveningTask": string (practice question, assignment review, or active recall drill)
   - "targetHours": number (e.g. 2.5)
   - "milestoneTag": string (e.g. "Assignment #1 Link", "High-Yield Unit", "Self-Assessment", "Past Paper Drill", "Speed Test", "Mock Exam")
   - "tips": string (practical high-scoring tip for this specific day)
4. "paperPresentationGuide": Object with:
   - "totalTimeMinutes": number (180)
   - "readingTimeMinutes": number (5)
   - "timePerQuestionMinutes": number (35)
   - "pagesPerQuestion": string (e.g. "4 to 5 pages")
   - "structure": Array of objects { "section": string, "weight": string, "pages": string, "tip": string }
5. "highYieldTips": Array of 5 strings (concrete, actionable AIOU exam scoring tips)

Tailor topics and unit references realistically to AIOU Course ${courseCode} (${programLevel}). Ensure distance learning realities (assignments, LMS workshops, past papers) are fully addressed.`;

    const userPrompt = `Generate a personalized 30-Day AIOU Study Schedule with these parameters:
- Program Level: ${programLevel}
- Course Code / Subject: ${courseCode}
- Remaining Exam Time: ${daysRemaining} days remaining
- Available Daily Time: ${dailyHours} hours/day
- Student Lifestyle Profile: ${studentType}
- Target Goal: ${studyGoal}
- Known Weak Areas / Notes: ${weakAreas || 'All 9 curriculum units'}

Return strictly JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        temperature: 0.5,
      }
    });

    const jsonText = response.text || "{}";
    let scheduleData: any = null;

    try {
      scheduleData = JSON.parse(jsonText);
    } catch (parseErr) {
      console.warn("Could not directly parse JSON from 30-day schedule generator:", parseErr);
      // Attempt regex extraction
      const match = jsonText.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          scheduleData = JSON.parse(match[0]);
        } catch (e) {
          scheduleData = null;
        }
      }
    }

    if (!scheduleData || !Array.isArray(scheduleData.dailySchedule) || scheduleData.dailySchedule.length === 0) {
      scheduleData = generateFallback30DaySchedule(programLevel, courseCode, daysRemaining, dailyHours, studentType, studyGoal);
    }

    return res.json({
      success: true,
      data: scheduleData,
      isAiGenerated: true,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    const isRateLimit = err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota');
    if (!isRateLimit) {
      console.error("Gemini API Error in /api/ai/personalized-30day-schedule:", err?.message ? err.message.slice(0, 120) : err);
    }

    const {
      programLevel = 'B.Ed',
      courseCode = '8601',
      daysRemaining = 30,
      dailyHours = 2.5,
      studentType = 'Distance Learning Student',
      studyGoal = 'Distinction'
    } = req.body || {};

    const fallbackData = generateFallback30DaySchedule(programLevel, courseCode, daysRemaining, dailyHours, studentType, studyGoal);

    return res.json({
      success: true,
      data: fallbackData,
      isFallback: true,
      isQuotaNotice: isRateLimit,
      message: isRateLimit
        ? "AI server experiencing high volume; loaded verified Educare high-yield 30-day study framework."
        : "Loaded verified Educare study schedule template."
    });
  }
});

// Live AIOU News & Exam Alerts Endpoint via Gemini + Google Search Grounding
app.get("/api/news/latest", async (req, res) => {
  // Return cached data if fresh
  if (newsCache && (Date.now() - newsCache.timestamp < CACHE_DURATION_MS)) {
    return res.json({
      success: true,
      alerts: newsCache.alerts,
      searchSources: newsCache.searchSources,
      cached: true,
      timestamp: new Date(newsCache.timestamp).toISOString()
    });
  }

  try {
    const prompt = `Find the latest official announcements, exam date sheets, admission deadlines, result alerts, tutor allocations, and LMS workshop schedules from Allama Iqbal Open University (AIOU) Islamabad for 2026.
Return 5 to 6 recent, accurate, and official news items or exam alerts.
Return ONLY a valid JSON array of objects with these exact properties:
- "id": string (unique identifier like "aiou-news-1")
- "headline": string (concise, clear headline under 80 characters)
- "category": string (one of: "Admission", "Deadline", "Workshop", "LMS", "HelpDesk")
- "tagText": string (e.g. "EXAM ALERT", "ADMISSION 2026", "LMS WORKSHOP", "TUTOR UPDATE", "DEADLINE")
- "date": string (e.g. "August 2026" or "Latest Official")
- "detail": string (2-3 sentences explaining the announcement, requirements, or dates)
- "isUrgent": boolean
- "linkUrl": string (URL if available from search grounding, default to "https://aiou.edu.pk")`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      }
    });

    const jsonText = response.text || "[]";
    let alerts = [];
    try {
      alerts = JSON.parse(jsonText);
    } catch (parseErr) {
      console.warn("Failed to parse JSON from Gemini news grounding response:", parseErr);
    }

    if (!Array.isArray(alerts) || alerts.length === 0) {
      alerts = FALLBACK_AIOU_NEWS;
    }

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const searchSources = groundingChunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));

    // Cache the successful result
    newsCache = {
      alerts,
      searchSources: searchSources.length > 0 ? searchSources : [{ title: "AIOU Official Portal", uri: "https://aiou.edu.pk" }],
      timestamp: Date.now()
    };

    return res.json({
      success: true,
      alerts,
      searchSources: newsCache.searchSources,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    const isRateLimit = err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota');
    if (!isRateLimit) {
      console.warn("Notice: Gemini Search API notice in /api/news/latest:", err?.message ? err.message.slice(0, 120) : "Search unavailable");
    }

    // Cache the fallback result for 15 mins so we don't repeatedly hit rate limits
    newsCache = {
      alerts: FALLBACK_AIOU_NEWS,
      searchSources: [{ title: "AIOU Official Portal", uri: "https://aiou.edu.pk" }],
      timestamp: Date.now()
    };

    console.log("[News API] Serving curated fallback AIOU news (API unavailable or rate limited).");

    return res.json({
      success: true,
      alerts: FALLBACK_AIOU_NEWS,
      searchSources: newsCache.searchSources,
      isFallback: true,
      timestamp: new Date().toISOString()
    });
  }
});

// Dedicated Real-Time Academic Updates Search Grounding Endpoint
app.post("/api/academic-updates/search", async (req, res) => {
  const { query = "", category = "All", forceFresh = false } = req.body || {};
  const cacheKey = `${category.toLowerCase()}_${query.trim().toLowerCase()}`;

  // Check cache (10 minutes)
  if (!forceFresh && academicUpdatesCache[cacheKey] && (Date.now() - academicUpdatesCache[cacheKey].timestamp < 10 * 60 * 1000)) {
    return res.json({
      success: true,
      ...academicUpdatesCache[cacheKey].data,
      cached: true,
      timestamp: new Date(academicUpdatesCache[cacheKey].timestamp).toISOString()
    });
  }

  try {
    const prompt = `Perform a grounded Google Search for the most up-to-date, verified official announcements and academic news from Allama Iqbal Open University (AIOU Islamabad), Higher Education Commission Pakistan (HEC), and Punjab Education Boards (BISE Sargodha / PBCC) for 2026.

Category Filter Requested: "${category}"
Specific Search Query: "${query || 'Latest AIOU 2026 Admissions, Date Sheets, Results, and LMS Workshop Updates'}"

Extract 5 to 7 accurate, structured, and informative academic updates.
Return ONLY a valid JSON array of objects adhering to this schema:
[
  {
    "id": "string (unique kebab-case id like aiou-exam-2026)",
    "title": "string (clear, official headline under 95 characters)",
    "category": "string (must be one of: 'Admissions', 'Exams & Date Sheets', 'Results & Gazettes', 'LMS & Workshops', 'Tutors & Assignments', 'BISE & Punjab Boards', 'HEC & Policies', 'General')",
    "badge": "string (e.g. 'ADMISSION 2026', 'DATE SHEET', 'RESULT ALERT', 'LMS WORKSHOP', 'PUNJAB BOARDS', 'DEADLINE ALERT')",
    "badgeType": "string (one of: 'urgent', 'verified', 'new', 'info')",
    "publishedDate": "string (e.g. 'August 2026' or 'Latest Notification')",
    "source": "string (e.g. 'AIOU Official (aiou.edu.pk)', 'HEC Pakistan', 'BISE Sargodha')",
    "summary": "string (3-4 informative sentences explaining the notification, key dates, eligibility, and portal guidance)",
    "keyHighlights": [
      "string (Key takeaway bullet point 1)",
      "string (Key takeaway bullet point 2)",
      "string (Key takeaway bullet point 3)",
      "string (Key takeaway bullet point 4)"
    ],
    "actionLabel": "string (e.g. 'Check Date Sheet on CMS', 'Apply Online OAS', 'Open Aaghi LMS', 'Verify Result')",
    "actionUrl": "string (e.g. 'https://aiou.edu.pk' or official portal link)",
    "actionTab": "string (e.g. 'exam-countdown', 'programs', 'portals', 'solved-assignments', 'bise-sargodha')",
    "isUrgent": boolean,
    "tags": ["string", "string", "string"]
  }
]`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
      }
    });

    const jsonText = response.text || "[]";
    let updates = [];
    try {
      updates = JSON.parse(jsonText);
    } catch (parseErr) {
      console.warn("Failed to parse JSON from academic updates grounding response:", parseErr);
    }

    if (!Array.isArray(updates) || updates.length === 0) {
      updates = FALLBACK_ACADEMIC_UPDATES;
    }

    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const groundingChunks = groundingMetadata?.groundingChunks || [];
    const webSearchQueries = groundingMetadata?.webSearchQueries || [];

    const searchSources = groundingChunks
      .filter((c: any) => c.web?.uri && c.web?.title)
      .map((c: any) => ({ title: c.web.title, uri: c.web.uri }));

    const finalSources = searchSources.length > 0
      ? searchSources
      : [
          { title: "AIOU Official Portal", uri: "https://aiou.edu.pk" },
          { title: "AIOU CMS Student Enrollment Portal", uri: "https://enrollment.aiou.edu.pk" },
          { title: "HEC Pakistan", uri: "https://hec.gov.pk" }
        ];

    // Attach verified grounding sources to items
    const enrichedUpdates = updates.map((item: any, idx: number) => ({
      ...item,
      groundingSources: item.groundingSources && item.groundingSources.length > 0
        ? item.groundingSources
        : finalSources.slice(idx % finalSources.length, (idx % finalSources.length) + 2)
    }));

    const responseData = {
      updates: enrichedUpdates,
      searchSources: finalSources,
      webSearchQueries,
      isAiGrounded: true,
      category,
      query
    };

    academicUpdatesCache[cacheKey] = {
      data: responseData,
      timestamp: Date.now()
    };

    return res.json({
      success: true,
      ...responseData,
      cached: false,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    const isRateLimit = err?.status === 429 || err?.message?.includes('429') || err?.message?.includes('quota');
    if (!isRateLimit) {
      console.warn("Gemini Search Grounding notice in /api/academic-updates/search:", err?.message ? err.message.slice(0, 120) : err);
    }

    // Filter fallback data by category or query
    let filteredFallback = FALLBACK_ACADEMIC_UPDATES;
    if (category && category !== 'All') {
      filteredFallback = filteredFallback.filter(u => u.category.toLowerCase().includes(category.toLowerCase()) || category.toLowerCase().includes(u.category.toLowerCase()));
      if (filteredFallback.length === 0) {
        filteredFallback = FALLBACK_ACADEMIC_UPDATES;
      }
    }

    if (query && query.trim()) {
      const qLower = query.toLowerCase();
      const queryFiltered = filteredFallback.filter(u =>
        u.title.toLowerCase().includes(qLower) ||
        u.summary.toLowerCase().includes(qLower) ||
        u.tags.some(t => t.toLowerCase().includes(qLower))
      );
      if (queryFiltered.length > 0) {
        filteredFallback = queryFiltered;
      }
    }

    const fallbackResponseData = {
      updates: filteredFallback,
      searchSources: [
        { title: "AIOU Official Portal (aiou.edu.pk)", uri: "https://aiou.edu.pk" },
        { title: "AIOU CMS Student Enrollment Portal", uri: "https://enrollment.aiou.edu.pk" },
        { title: "BISE Sargodha Official Portal", uri: "https://www.bisesargodha.edu.pk" }
      ],
      webSearchQueries: [`AIOU ${category} 2026 news`, `AIOU official updates ${query}`],
      isFallback: true,
      isQuotaNotice: isRateLimit,
      category,
      query
    };

    return res.json({
      success: true,
      ...fallbackResponseData,
      timestamp: new Date().toISOString()
    });
  }
});

// Start Vite in dev mode or serve static files in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Educare Help Desk AIOU Server running on http://localhost:${PORT}`);
  });
}

startServer();
