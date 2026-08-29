export interface ExamSuccessTip {
  id: string;
  dayNumber: number; // 1 to 30 for Day of the Month / Sequence
  title: string;
  category: 'Paper Presentation' | 'Time Management' | 'Preparation Sprint' | 'Exam Hall Protocol' | 'Scoring Strategy' | 'Mental Focus';
  badge: string;
  summary: string;
  actionChecklist: string[];
  proTip: string;
  aiouSpecificContext: string;
  iconName?: string;
  impactLevel: 'High Impact' | 'Essential' | 'Game Changer';
}

export const EXAM_SUCCESS_TIPS: ExamSuccessTip[] = [
  {
    id: 'tip-1',
    dayNumber: 1,
    title: 'The 35-Minute AIOU Rule (Strict Time Allocation)',
    category: 'Time Management',
    badge: 'TIME STRATEGY',
    impactLevel: 'Game Changer',
    summary: 'AIOU final examination question papers require answering 5 questions out of 8 in 3 hours (180 minutes). Never spend more than 35 minutes on a single 20-mark question.',
    actionChecklist: [
      'Spend the first 5 minutes reading the entire question paper and selecting your best 5 questions.',
      'Allocate strictly 35 minutes per question (35 × 5 = 175 minutes).',
      'Reserve the final 5 minutes for rechecking question numbers, roll number verification, and tying extra sheets securely.',
      'If time runs out on question 1 or 2, wrap it up with bullet points and immediately move to question 3.'
    ],
    proTip: 'A half-answered 5th question earns 8-12 marks, whereas writing 2 extra pages on question 1 only gains 1-2 extra marks at best.',
    aiouSpecificContext: 'AIOU examiners deduct severe marks when students attempt only 3 or 4 questions instead of the required 5.'
  },
  {
    id: 'tip-2',
    dayNumber: 2,
    title: 'AIOU 4-Part Answer Presentation Structure (For 20 Marks)',
    category: 'Paper Presentation',
    badge: 'PRESENTATION',
    impactLevel: 'High Impact',
    summary: 'Examiners check thousands of answer sheets. To secure 16-18 out of 20 marks, structure every answer with clear, bold headings and structural demarcation.',
    actionChecklist: [
      'Part 1: Definition & Introduction (10-15 lines with author/scholar references).',
      'Part 2: Main Body with 6-8 Bold Headings & Underlined Keywords.',
      'Part 3: Practical Pakistani Context or Case Illustration (e.g. Federal/Provincial education policy, local school scenario).',
      'Part 4: Conclusion / Summary & Personal Analytical Opinion (6-8 lines).'
    ],
    proTip: 'Use a black 604/605 cut marker for primary headings and blue ballpoint/fountain pen for text. Avoid gel pens that bleed through thin answer sheets.',
    aiouSpecificContext: 'Standard AIOU answer sheets accommodate 4 to 5 handwritten pages per 20-mark question for optimal scoring.'
  },
  {
    id: 'tip-3',
    dayNumber: 3,
    title: 'Past 5-Year Papers High-Yield Pattern Analysis',
    category: 'Preparation Sprint',
    badge: 'HIGH-YIELD REVISION',
    impactLevel: 'Essential',
    summary: 'AIOU question banks rotate core curricular concepts across semesters. At least 60% of questions in the upcoming exam share themes with the past 5 semesters.',
    actionChecklist: [
      'Download and review the last 5 semesters of solved past papers for your course code.',
      'Identify 8-10 recurring core topics that appeared in at least 3 out of 5 papers.',
      'Prepare comprehensive outline notes (headings + definitions + diagram) for these core topics.',
      'Practice writing one full 20-mark answer without looking at the book within 30 minutes.'
    ],
    proTip: 'Compare Assignment #1 & Assignment #2 questions with past papers; frequently, one assignment question appears directly on the final exam.',
    aiouSpecificContext: 'Educare Help Desk (03451291610) provides compiled 5-year past papers and solved question banks for all AIOU codes.'
  },
  {
    id: 'tip-4',
    dayNumber: 4,
    title: 'Exam Day Essentials & CMS Roll No Slip Verification',
    category: 'Exam Hall Protocol',
    badge: 'HALL PROTOCOL',
    impactLevel: 'Essential',
    summary: 'Avoid last-minute center panic by preparing your examination kit and verifying center details 48 hours in advance.',
    actionChecklist: [
      'Print 2 clear copies of your CMS Roll Number Slip (one in bag, one backup at home).',
      'Carry Original CNIC (or original B-Form + Matric Sanad if under 18).',
      'Prepare a transparent stationery pouch with 2 blue pens, 1 black marker (604/605), ruler, eraser, and pencil.',
      'Arrive at the examination center at least 30 minutes before the scheduled start time (08:00 AM for morning shift, 01:30 PM for evening shift).'
    ],
    proTip: 'Inspect the address on the roll number slip carefully; regional centers sometimes change school/college venues between semesters.',
    aiouSpecificContext: 'Superintendents strictly prohibit electronic watches, mobile phones, and opaque bags inside AIOU examination halls.'
  },
  {
    id: 'tip-5',
    dayNumber: 5,
    title: 'Visual Flowcharts & Conceptual Diagrams (The 2-Mark Booster)',
    category: 'Paper Presentation',
    badge: 'DIAGRAM MASTERY',
    impactLevel: 'High Impact',
    summary: 'Adding a clean 2-inch conceptual box, flowchart, or hierarchy diagram in the middle of your answer breaks wall-of-text fatigue and immediately signals subject mastery.',
    actionChecklist: [
      'Draw a simple process flow diagram (e.g. Input → Process → Output or Hierarchy tree).',
      'Enclose key stages inside neatly drawn rounded rectangles or bulleted boxes with a pencil and ruler.',
      'Label diagrams clearly with a caption (e.g. "Figure 1.1: Stages of Curriculum Development").',
      'Reference the diagram directly in your text ("As illustrated in Figure 1.1 above...").'
    ],
    proTip: 'Examiners skim answer sheets in 90 seconds. A neat visual diagram catches their eye instantly and locks in top-tier marks.',
    aiouSpecificContext: 'Particularly high scoring in Education (B.Ed/M.Ed), Pakistan Studies, Sociology, Islamic Studies, and Management sciences.'
  },
  {
    id: 'tip-6',
    dayNumber: 6,
    title: 'How to Tackle an Unfamiliar or Tricky Question',
    category: 'Scoring Strategy',
    badge: 'CRITICAL TACTIC',
    impactLevel: 'Game Changer',
    summary: 'If you encounter an unexpected question, never leave it blank. You can extract 10-14 marks by deconstructing its core terminology.',
    actionChecklist: [
      'Break down the question into key keywords (e.g. "Analyze the impact of digital literacy on rural Pakistani classrooms").',
      'Define the primary terms in the first 2 paragraphs (e.g. Digital Literacy, Rural Education Barriers).',
      'Connect the question to general course themes and educational psychology theories from Unit 1-3.',
      'Provide realistic real-world examples, challenges, and proposed solutions with bold subheadings.'
    ],
    proTip: 'Write at least 3.5 pages with clean headings even for challenging questions. Examiners reward relevant effort and logical structure.',
    aiouSpecificContext: 'AIOU grading rubrics award marks for relevant conceptual explanation even if exact textbook terminology is paraphrased.'
  },
  {
    id: 'tip-7',
    dayNumber: 7,
    title: 'Active Recall & The 25/5 Pomodoro Study Rhythm',
    category: 'Mental Focus',
    badge: 'STUDY PRODUCTIVITY',
    impactLevel: 'High Impact',
    summary: 'Passive reading creates an illusion of competence. Use active recall intervals during the final week of revision.',
    actionChecklist: [
      'Study for 25 minutes with full focus (phone on silent in another room).',
      'Take a strict 5-minute break (stretch, drink water, rest eyes).',
      'After completing 4 Pomodoro cycles, take an extended 20-minute rest.',
      'Test yourself: Close the textbook and write down the 5 key headings and sub-points from memory.'
    ],
    proTip: 'Teach the concept aloud to an imaginary student in simple Urdu/English for 2 minutes to test true understanding.',
    aiouSpecificContext: 'Working professionals and housewives preparing for distance degrees gain 2x retention using micro-study sessions.'
  },
  {
    id: 'tip-8',
    dayNumber: 8,
    title: 'CMS Assignment Marks & Continuous Assessment Verification',
    category: 'Scoring Strategy',
    badge: 'PASS GUARANTEE',
    impactLevel: 'Essential',
    summary: 'In AIOU grading, continuous assessment (assignments) accounts for 30% of your final composite grade, while written exams account for 70%.',
    actionChecklist: [
      'Log into CMS portal (cms.aiou.edu.pk) and check your course assignment marks.',
      'Ensure you scored at least 40% (Matric/FA/BA) or 50% (BS/B.Ed/Postgraduate) on assignments.',
      'If assignment marks are missing or marked "0", contact your regional office or Educare Help Desk immediately before exams.',
      'Remember: You must pass BOTH assignments and final written exams independently.'
    ],
    proTip: 'Even if you score 90 in the written exam, failing assignments results in an overall course "Reappear" status.',
    aiouSpecificContext: 'Educare Help Desk (03451291610) provides instant verification and tutor contact tracking for pending marks.'
  },
  {
    id: 'tip-9',
    dayNumber: 9,
    title: 'Night-Before-Exam Protocol (Sleep, Nutrition & Mindset)',
    category: 'Mental Focus',
    badge: 'EXAM EVE',
    impactLevel: 'High Impact',
    summary: 'All-night cramming severely degrades working memory and cognitive processing speed during 3-hour long-form writing.',
    actionChecklist: [
      'Stop studying intensive new concepts by 09:00 PM on exam eve.',
      'Spend 30 minutes doing a light review of key summary cards, headings, and formulas.',
      'Ensure at least 7 hours of uninterrupted sleep to consolidate memory storage.',
      'Eat a balanced, protein-rich breakfast with plenty of water before leaving home.'
    ],
    proTip: 'Avoid panicked group discussions outside the examination center in the final 15 minutes before the bell rings.',
    aiouSpecificContext: 'A calm, rested mind writes 25% faster with clearer handwriting across 18-24 sheets.'
  },
  {
    id: 'tip-10',
    dayNumber: 10,
    title: 'Effective Question Selection & Margin Rule',
    category: 'Paper Presentation',
    badge: 'EXAM HALL TACTIC',
    impactLevel: 'Essential',
    summary: 'The first 10 minutes determine your paper trajectory. Select questions strategically and format your margins.',
    actionChecklist: [
      'Draw a neat 1-inch left margin and half-inch right margin on every page with a light pencil.',
      'Label question numbers prominently in the exact center of the page (e.g. "--- QUESTION NO. 3 (ANSWER) ---").',
      'Start your strongest question first to build examiner confidence and set a high grading benchmark.',
      'Place your second strongest question last to finish on a memorable, high-scoring impression.'
    ],
    proTip: 'Never leave blank pages in between answers; if you finish a question halfway through a page, draw a clean horizontal dividing line and write "P.T.O." or start on the next fresh page.',
    aiouSpecificContext: 'AIOU answer scripts are barcoded and verified; clear question numbering prevents accidental un-evaluated pages.'
  }
];

export const TIP_CATEGORIES = [
  'All Tips',
  'Time Management',
  'Paper Presentation',
  'Preparation Sprint',
  'Exam Hall Protocol',
  'Scoring Strategy',
  'Mental Focus'
] as const;
