import { ProgramLevel } from '../types';

export interface ExamTipItem {
  id: string;
  title: string;
  category: 'Paper Presentation' | 'Unit Strategy' | 'Memory & Recall' | 'Urdu Medium' | 'English Medium' | 'LMS & Workshops';
  summary: string;
  details: string[];
  keyTakeaway: string;
  iconName: string;
  badge?: string;
}

export interface TimeStrategyProfile {
  id: string;
  profileName: string;
  targetAudience: string;
  dailyCommitment: string;
  weeklyHours: number;
  scheduleRoutine: {
    timeSlot: string;
    activity: string;
    focus: string;
  }[];
  productivityTips: string[];
}

export interface ProgramExamGuide {
  level: ProgramLevel;
  paperPattern: string;
  marksDistribution: string;
  passingCriteria: string;
  highYieldUnits: string;
  topStrategy: string;
  recommendedKeywords: string[];
}

export const AIOU_EXAM_TIPS: ExamTipItem[] = [
  {
    id: 'tip-1',
    title: 'The 20-Mark Question Golden Formula',
    category: 'Paper Presentation',
    summary: 'AIOU examination papers consist of 5 compulsory questions of 20 marks each. Mastering the 5-tier anatomy guarantees 16+ marks per question.',
    details: [
      'Page Allocation: Write strictly 4 to 5 pages per 20-mark question. Do not exceed 5 pages or write fewer than 3 pages.',
      'Introduction & Definition (1.5 Marks): Begin with a formal definition and a 4-5 line contextual overview.',
      'Core Theoretical Framework (10 Marks): Use at least 6 to 8 bold subheadings with 60-marker pen accents.',
      'Local Pakistani Context & Real-life Examples (5 Marks): Examiners heavily award practical application within Pakistani schools, economy, or culture.',
      'Conclusion & Critical Summary (2 Marks): Summarize key inferences in 3-4 bullet points.'
    ],
    keyTakeaway: 'Never write continuous unbroken paragraphs. Break every answer into 6-8 distinct subheadings with neat left/right margins.',
    iconName: 'Award',
    badge: 'High Impact'
  },
  {
    id: 'tip-2',
    title: 'The 80/20 AIOU Textbook Strategy',
    category: 'Unit Strategy',
    summary: 'AIOU course books comprise 9 units. 70% of exam questions historically emerge from 5 core high-yield units.',
    details: [
      'Units 1 & 2: Introduce fundamental definitions, historical evolution, and foundational principles.',
      'Units 4 & 5: Typically contain the primary theoretical models and comparative analyses.',
      'Units 7 & 9: Cover contemporary trends, future challenges, and practical implementation in Pakistan.',
      'Self-Assessment Questions: 80% of final paper questions are directly derived or slightly rephrased from the self-assessment exercises at the end of each unit.'
    ],
    keyTakeaway: 'Master the end-of-unit Self-Assessment Questions for Units 1, 2, 4, 7, and 9 before opening past papers.',
    iconName: 'BookOpen',
    badge: 'Syllabus Hack'
  },
  {
    id: 'tip-3',
    title: 'Assignment-to-Exam Direct Correlation',
    category: 'Unit Strategy',
    summary: 'Your semester assignments are not just coursework—they are the official blueprint for your final examination.',
    details: [
      'Question Overlap: Typically 2 out of the 5 questions on the final exam paper are modified versions of questions from Assignment 1 and Assignment 2.',
      'Tutor Feedback Review: If your tutor provided remarks on your marked assignment, revise those specific weak points immediately.',
      'Comprehensive Solution Memorization: Ensure you know how to expand your short assignment answers into a full 20-mark essay format.'
    ],
    keyTakeaway: 'Thoroughly revise both Assignment 1 & 2 question sets two weeks prior to your exam date.',
    iconName: 'CheckCircle2',
    badge: 'Proven Method'
  },
  {
    id: 'tip-4',
    title: 'Urdu Medium Presentation & Marker Formatting',
    category: 'Urdu Medium',
    summary: 'Enhance readability and presentation aesthetics for Islamic Studies, Pak Studies, Urdu, and Education papers.',
    details: [
      'Marker Selection: Use 604 or 605 cut markers for main headings (سرخی) and standard blue ballpoint for body writing.',
      'Verses & Hadith Quotes: Center Quranic verses or Arabic quotations in inverted commas with direct Urdu translation underneath.',
      'Bullet Points (نکات): Number your arguments (۱، ۲، ۳، ۴) rather than using vague asterisks.',
      'Margins (حاشیہ): Draw a 1-inch pencil margin on the right side of every page for neatness.'
    ],
    keyTakeaway: 'Neat calligraphy, distinct marker headings, and highlighted references add 10-15 overall aggregate marks.',
    iconName: 'FileText',
    badge: 'Urdu Papers'
  },
  {
    id: 'tip-5',
    title: 'Active Recall & Spaced Repetition for Distance Learners',
    category: 'Memory & Recall',
    summary: 'Distance learning requires self-driven memory retention without daily physical lectures.',
    details: [
      'The Blurting Technique: Read a unit for 30 minutes, close the book, and write down everything you remember on a blank paper.',
      'Formula & Timeline Sheet: Maintain a 1-page cheat sheet for key authors, dates, formulas, and legal sections.',
      'Audio Self-Notes: Record 3-minute voice summaries on your phone and listen during daily commutes or household chores.'
    ],
    keyTakeaway: 'Testing yourself with closed books yields 300% better retention than passive re-reading.',
    iconName: 'Brain',
    badge: 'Retention'
  },
  {
    id: 'tip-6',
    title: 'LMS Workshop Attendance & Quiz Mastery (BS & B.Ed)',
    category: 'LMS & Workshops',
    summary: 'LMS workshop participation and automated quizzes are mandatory for undergraduate and post-graduate programs.',
    details: [
      'Attendance Threshold: Maintain at least 80% daily attendance on Microsoft Teams via AAGHI LMS to avoid course failure.',
      'End-of-Workshop Quiz: Quizzes carry 20% weightage. Prepare by reviewing basic unit MCQs and key definitions.',
      'Stable Internet Contingency: Keep mobile hotspot backup ready during your designated 1.5-hour workshop time slot.'
    ],
    keyTakeaway: 'Never miss LMS workshop sessions—failure in workshops results in repeating the entire course.',
    iconName: 'Sparkles',
    badge: 'Mandatory'
  }
];

export const TIME_MANAGEMENT_PROFILES: TimeStrategyProfile[] = [
  {
    id: 'working-prof',
    profileName: 'Working Professionals & Job Holders',
    targetAudience: 'Bankers, Teachers, Govt Employees, Private Sector Staff',
    dailyCommitment: '2 – 2.5 Hours Daily + Weekend Sprint',
    weeklyHours: 16,
    scheduleRoutine: [
      { timeSlot: '06:00 AM – 07:00 AM', activity: 'High-Focus Morning Session', focus: '1 Unit reading & concept mapping with fresh mind' },
      { timeSlot: '01:30 PM – 02:00 PM', activity: 'Lunch Break Micro-Review', focus: 'Flashcards, formula sheets, or recorded audio summaries' },
      { timeSlot: '09:00 PM – 10:00 PM', activity: 'Evening Practice Drill', focus: 'Writing one 20-mark question or assignment question' },
      { timeSlot: 'Saturday / Sunday', activity: 'Weekend 4-Hour Sprint', focus: 'Completing pending assignments, LMS workshops & past papers' }
    ],
    productivityTips: [
      'Download all course PDFs to your mobile for offline reading during commutes.',
      'Prepare written assignments in small 30-minute daily chunks instead of pulling last-night all-nighters.',
      'Use lunch breaks to listen to educational voice notes or review glossary terms.'
    ]
  },
  {
    id: 'home-learner',
    profileName: 'Housewives & Home Learners',
    targetAudience: 'Mothers, Family Caregivers, Remote Learners',
    dailyCommitment: '2 – 3 Hours in Divided Micro-Blocks',
    weeklyHours: 18,
    scheduleRoutine: [
      { timeSlot: '01:30 PM – 03:00 PM', activity: 'Quiet Afternoon Focus Block', focus: 'Deep reading of core textbook units while household is quiet' },
      { timeSlot: '05:30 PM – 06:00 PM', activity: 'Tea Time Concept Recall', focus: 'Self-assessment questions & key points memorization' },
      { timeSlot: '09:30 PM – 10:30 PM', activity: 'Night Assignment Writing', focus: 'Handwriting cover pages and solved question drafting' }
    ],
    productivityTips: [
      'Designate a permanent quiet study corner with all textbooks, stationery, and notebooks ready.',
      'Pair study time with daily routines—review flashcards while children are resting or at school.',
      'Keep a written calendar on the wall with bold markers for assignment deadlines and exam countdowns.'
    ]
  },
  {
    id: 'fulltime-student',
    profileName: 'Full-Time Distance Students',
    targetAudience: 'Students dedicating primary hours to academic achievement',
    dailyCommitment: '4 – 5 Hours Daily Structured Study',
    weeklyHours: 28,
    scheduleRoutine: [
      { timeSlot: '09:00 AM – 11:00 AM', activity: 'Morning Intensive Study', focus: 'Deep reading of 2 textbook units with analytical notes' },
      { timeSlot: '11:30 AM – 01:00 PM', activity: 'LMS Workshop & Digital Research', focus: 'Attending Teams workshops, downloading handouts & reference papers' },
      { timeSlot: '04:00 PM – 05:30 PM', activity: 'Timed Question Simulation', focus: 'Simulating 35-minute exam answers under exam conditions' },
      { timeSlot: '08:30 PM – 09:30 PM', activity: 'Daily Revision & Active Recall', focus: 'Revising previous day units to prevent forgetting curve' }
    ],
    productivityTips: [
      'Use the 50/10 Pomodoro rule (50 min study, 10 min stretch) for sustained mental energy.',
      'Solve at least 5 past papers per subject under strict 3-hour timer conditions before exam day.',
      'Maintain color-coded highlighters (Yellow: Concepts, Pink: Definitions, Green: Examples).'
    ]
  }
];

export const PROGRAM_EXAM_GUIDES: ProgramExamGuide[] = [
  {
    level: 'Matric',
    paperPattern: 'Total 8 questions, attempt any 5 questions (20 marks each). Total: 100 Marks.',
    marksDistribution: '5 Questions × 20 Marks = 100 Marks. Passing: 40% (33% for older schemes).',
    passingCriteria: 'Minimum 40 marks out of 100 in final exam + assignment passing marks.',
    highYieldUnits: 'Units 1, 2, 3, 5, 8 (Focus on core textbook questions and grammar exercises).',
    topStrategy: 'Focus on textbook exercise questions, short definitions, and neat handwriting with blue ballpoint and 604 marker.',
    recommendedKeywords: ['Definition', 'Characteristics', 'Advantages', 'Pakistani Context', 'Summary']
  },
  {
    level: 'FA / Intermediate',
    paperPattern: 'Total 8 descriptive questions, solve 5 questions of 20 marks each.',
    marksDistribution: '5 Questions × 20 Marks = 100 Marks. Passing: 40% aggregate.',
    passingCriteria: '40% in final paper and continuous assessment assignments.',
    highYieldUnits: 'Units 1, 2, 4, 6, 7 (Important focus on historical events, principles, and commercial math).',
    topStrategy: 'Write structured essays with at least 6 subheadings per answer. Include relevant historical timelines and data points.',
    recommendedKeywords: ['Historical Context', 'Principles', 'Comparative Analysis', 'Critical Appraisal']
  },
  {
    level: 'BA / AD',
    paperPattern: '8 long questions provided, attempt any 5 questions (20 marks each).',
    marksDistribution: '100 Marks Final Paper + 30% Assignment Weightage. Minimum 40% in theory.',
    passingCriteria: 'Mandatory 40% in written exam + overall aggregate requirement.',
    highYieldUnits: 'Units 2, 3, 5, 7, 9 (Focus on critical essays, sociological theories, and institutional roles).',
    topStrategy: 'Demonstrate mature critical thinking. Connect theoretical models with modern socio-economic conditions in Pakistan.',
    recommendedKeywords: ['Theoretical Framework', 'Socio-Economic Impact', 'Contemporary Challenges', 'Analytical Review']
  },
  {
    level: 'BS (4-Year)',
    paperPattern: 'Comprehensive 8-question paper (attempt 5) + LMS Workshop Marks + Assignments.',
    marksDistribution: '50% Final Exam + 30% Assignments + 20% Workshop & Quizzes (Passing 50%).',
    passingCriteria: 'Minimum 50% passing marks in final exam and continuous assessments.',
    highYieldUnits: 'Units 1, 3, 4, 6, 8 (In-depth research papers, case studies, and quantitative models).',
    topStrategy: 'Reference international literature and academic studies. Cite authors and include flowcharts/diagrams.',
    recommendedKeywords: ['Empirical Evidence', 'Methodology', 'Case Study', 'Strategic Recommendations']
  },
  {
    level: 'B.Ed',
    paperPattern: '8 questions relating to pedagogical frameworks, attempt 5 questions (20 marks each).',
    marksDistribution: '50% Final Exam + 30% Assignments + 20% LMS Workshop attendance & quiz.',
    passingCriteria: 'Minimum 50% passing threshold in both exam and workshops.',
    highYieldUnits: 'Units 1 (Foundations), 3 (Lesson Planning), 5 (Assessment Methods), 7 (Classroom Management), 8 (Reflective Practice).',
    topStrategy: 'Use reflective cycles (Gibbs, Kolb, Bloom’s Taxonomy). Provide concrete secondary or primary school lesson plan examples.',
    recommendedKeywords: ['Pedagogical Approach', 'Bloom Taxonomy', 'Reflective Cycle', 'Lesson Plan', 'Formative Assessment']
  },
  {
    level: 'Master / PGD',
    paperPattern: '8 advanced analytical questions, attempt 5 (20 marks each).',
    marksDistribution: 'Theory 70% + Assignments 30% (Passing 50%).',
    passingCriteria: '50% in final paper with mandatory workshop completion.',
    highYieldUnits: 'Units 2, 4, 5, 7, 9 (Focus on policy analysis, research methodology, and theoretical frameworks).',
    topStrategy: 'Integrate policy documents, statistical trends, and theoretical comparisons with comprehensive literature citations.',
    recommendedKeywords: ['Policy Framework', 'Quantitative / Qualitative Synthesis', 'Institutional Governance', 'Future Directions']
  },
  {
    level: 'M.Phil / MS',
    paperPattern: 'Advanced research-oriented paper, seminar presentations, and thesis defense.',
    marksDistribution: 'Examinations + Seminar + Thesis Evaluation (Passing 50%).',
    passingCriteria: 'Minimum 50% passing and CGPA 2.50+ for degree award.',
    highYieldUnits: 'Research Design, Data Analysis (SPSS/SmartPLS), Literature Review, Epistemology.',
    topStrategy: 'Emphasize APA 7th edition referencing, conceptual frameworks, gap analysis, and robust methodological triangulation.',
    recommendedKeywords: ['Epistemological Paradigm', 'Gap Analysis', 'Methodological Triangulation', 'APA Referencing']
  },
  {
    level: 'Ph.D.',
    paperPattern: 'Comprehensive Examination + Doctoral Research Thesis Defense.',
    marksDistribution: 'Doctoral Comprehensive Exams + Peer-Reviewed HEC Journal Publication.',
    passingCriteria: 'Pass comprehensive exam + HEC W/X/Y category published article.',
    highYieldUnits: 'Advanced Quantitative/Qualitative Modeling, Grounded Theory, Dissertation Design.',
    topStrategy: 'Novel theoretical contribution, rigorous literature synthesis, and defensive critical evaluation.',
    recommendedKeywords: ['Theoretical Novelty', 'Doctoral Synthesis', 'HEC Compliance', 'Contribution to Knowledge']
  }
];

export const REVISION_COUNTDOWN_CHECKLIST = [
  { daysOut: '30 Days Out', task: 'Complete reading all 9 units & highlight key definitions in AIOU textbooks.' },
  { daysOut: '20 Days Out', task: 'Finalize and submit Assignment 1 & 2. Verify tutor dispatch or AAGHI LMS upload.' },
  { daysOut: '14 Days Out', task: 'Solve at least 3 previous 5-year past examination papers under timed 3-hour conditions.' },
  { daysOut: '7 Days Out', task: 'Download official Roll Number Slip from CMS. Verify exam center address and timings.' },
  { daysOut: '3 Days Out', task: 'Review 1-page formula & heading cheat sheets. Practice 5-minute speed outline sketches.' },
  { daysOut: '1 Day Out', task: 'Prepare stationary pouch (Blue pens, 604/605 markers, ruler, CNIC, Roll No slip). Sleep 7+ hours.' }
];
