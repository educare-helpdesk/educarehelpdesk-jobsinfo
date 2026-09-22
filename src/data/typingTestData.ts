export interface TypingPassage {
  id: string;
  title: string;
  category: 'PPSC / Govt Exam' | 'Data Entry & Clerk' | 'AIOU Academic' | 'Daily Drills';
  difficulty: 'Beginner' | 'Intermediate' | 'PPSC Standard' | 'Advanced';
  text: string;
  targetWpm: number;
  description: string;
}

export interface TypingScoreRecord {
  id: string;
  date: string;
  durationSeconds: number;
  grossWpm: number;
  netWpm: number;
  accuracy: number;
  totalKeystrokes: number;
  correctCharacters: number;
  errorCount: number;
  passageTitle: string;
  passageCategory: string;
  qualificationStatus: string;
}

export const TYPING_PASSAGES: TypingPassage[] = [
  {
    id: 'ppsc-clerk-1',
    title: 'PPSC Junior Clerk Official Administrative Passage',
    category: 'PPSC / Govt Exam',
    difficulty: 'PPSC Standard',
    targetWpm: 30,
    description: 'Official government secretariat correspondence text. Standard 5-stroke benchmark used in PPSC BS-11 Junior Clerk exams.',
    text: 'The government of the Punjab is committed to providing efficient and transparent public services across all administrative departments. Every civil servant must ensure prompt disposal of official files, maintain accurate computerized records, and adhere strictly to the established rules of business. Punctuality, integrity, and devotion to public duty form the fundamental cornerstone of an effective civil service.'
  },
  {
    id: 'ppsc-clerk-2',
    title: 'Punjab Services & General Administration Secretariat Dispatch',
    category: 'PPSC / Govt Exam',
    difficulty: 'PPSC Standard',
    targetWpm: 30,
    description: 'Gazetted policy language focusing on departmental notices, service rules, and public facilitation.',
    text: 'In accordance with the latest notifications issued by the Services and General Administration Department, all administrative departments shall implement digital filing systems to minimize delays. Modern office management requires proficient keyboard skills, accurate data verification, and secure archival of official documents to uphold governance standards across the province.'
  },
  {
    id: 'deo-clerk-1',
    title: 'Data Entry Operator Alphanumeric & Records Test',
    category: 'Data Entry & Clerk',
    difficulty: 'Intermediate',
    targetWpm: 40,
    description: 'Balanced mix of numbers, capitalized abbreviations, and professional punctuation for DEO BS-12/14 tests.',
    text: 'Under Project Phase-II initiated on 15th March 2026, the department processed over 4,500 citizen verification requests. Out of 12,800 registered applicants, 98% completed computerized biometric validation through the centralized database. Precision in numerical entries, dates, and national identity numbers is strictly essential for maintaining reliable public registries.'
  },
  {
    id: 'aiou-academic-1',
    title: 'AIOU Distance Education & Digital Learning Systems',
    category: 'AIOU Academic',
    difficulty: 'Intermediate',
    targetWpm: 35,
    description: 'Academic passage focused on distance learning modalities, LMS submissions, and student support.',
    text: 'Allama Iqbal Open University continues to pioneer accessible distance education across Pakistan by integrating cutting-edge information technology with student-centered pedagogy. Through the AAGHI learning management system, thousands of students from remote areas participate in real-time academic workshops, upload typed research assignments, and interact directly with qualified course tutors.'
  },
  {
    id: 'court-stenographer-1',
    title: 'High Court & Judicial Computer Proficiency Drill',
    category: 'PPSC / Govt Exam',
    difficulty: 'Advanced',
    targetWpm: 45,
    description: 'Challenging legal vocabulary, long sentence structures, and formal court terminology.',
    text: 'The honorable bench observed that adherence to statutory procedural mandates is an indispensable prerequisite for the dispensation of equitable justice. Every administrative authority exercising quasi-judicial discretion must record cogent reasons for decisions, ensuring that citizens receive fair opportunity without arbitrary discrimination or undue institutional delay.'
  },
  {
    id: 'beginner-home-1',
    title: 'Beginner Home Row & Steady Rhythm Builder',
    category: 'Daily Drills',
    difficulty: 'Beginner',
    targetWpm: 25,
    description: 'High-frequency English words designed to train muscle memory and rhythm without looking at keys.',
    text: 'The quick brown fox jumps over the lazy dog every day. Practice typing with steady rhythm and keep your fingers placed on the home row keys. Do not rush for speed before you master high accuracy. A calm mind and relaxed hands will always produce fewer typing mistakes.'
  }
];

export interface TypingBenchmark {
  role: string;
  department: string;
  minWpm: number;
  minAccuracy: number;
  scale: string;
  notes: string;
}

export const GOVT_TYPING_BENCHMARKS: TypingBenchmark[] = [
  {
    role: 'Junior Clerk',
    department: 'PPSC / Punjab Govt Departments',
    minWpm: 25,
    minAccuracy: 90,
    scale: 'BS-11',
    notes: 'PPSC requires minimum 25 WPM on computer (some departments require 30 WPM). 5 minutes continuous typing test.'
  },
  {
    role: 'Data Entry Operator (DEO)',
    department: 'Police, Health, Board of Revenue',
    minWpm: 40,
    minAccuracy: 95,
    scale: 'BS-12 / BS-14',
    notes: 'Tested on both alphanumeric paragraphs and speed drills. Accuracy threshold is heavily weighted.'
  },
  {
    role: 'Service Center Official (SCO)',
    department: 'Punjab Land Records Authority (PLRA)',
    minWpm: 40,
    minAccuracy: 92,
    scale: 'BS-14',
    notes: 'English typing test of 40 WPM mandatory on computerized testing console.'
  },
  {
    role: 'Computer Operator',
    department: 'High Courts, District Judiciary, PPSC',
    minWpm: 45,
    minAccuracy: 95,
    scale: 'BS-15 / BS-16',
    notes: 'Requires 45+ WPM with strict penalty deductions for missed or transposed characters.'
  },
  {
    role: 'Stenographer / Steno-Typist',
    department: 'Federal & Punjab Secretariats',
    minWpm: 40,
    minAccuracy: 90,
    scale: 'BS-14 / BS-15',
    notes: 'English typing speed 40 WPM combined with 70/80 WPM shorthand transcription.'
  }
];

export interface TypingTipItem {
  id: string;
  category: 'Home Row & Technique' | 'Speed Secrets' | 'PPSC Exam Strategy' | 'Ergonomics';
  title: string;
  summary: string;
  keyPoints: string[];
  icon: string;
}

export const TYPING_TIPS_DATA: TypingTipItem[] = [
  {
    id: 'tip-home-row',
    category: 'Home Row & Technique',
    title: 'The Home Row Foundation (ASDF JKL;)',
    summary: 'Never let your fingers wander aimlessly. Your index fingers must always rest on the tactile bumps of F and J.',
    keyPoints: [
      'Left hand rest position: Pinky on A, Ring on S, Middle on D, Index on F.',
      'Right hand rest position: Index on J, Middle on K, Ring on L, Pinky on semicolon (;).',
      'Both thumbs hover gently over the Spacebar.',
      'Always return your fingers to the home row immediately after striking a key on the top or bottom row.'
    ],
    icon: 'keyboard'
  },
  {
    id: 'tip-accuracy-first',
    category: 'Speed Secrets',
    title: 'The 98% Accuracy Rule: Why Speed Follows Accuracy',
    summary: 'Hitting a wrong key costs you 3 distinct penalties: the mistake, the Backspace strike, and the re-strike.',
    keyPoints: [
      'A typist typing at 40 WPM with 99% accuracy will easily beat a typist typing at 60 WPM with 85% accuracy.',
      'In PPSC tests, mistakes deduct from your gross speed, dropping your Net WPM below the qualifying threshold.',
      'If you find yourself making mistakes, slow your pace by 10% until your accuracy hits 98% or higher.',
      'Speed naturally accelerates when finger muscles make zero hesitation stops.'
    ],
    icon: 'check-circle'
  },
  {
    id: 'tip-ppsc-strategy',
    category: 'PPSC Exam Strategy',
    title: 'Cracking PPSC, FPSC & NTS Typing Tests',
    summary: 'Master the exact scoring algorithms and test software conditions used in government exam centers.',
    keyPoints: [
      'Standard Word Formula: Testing agencies define 1 word as 5 keystrokes (including spaces and punctuation).',
      'Net Speed Formula: Net WPM = (Total Typed Characters / 5) / Time - (Mistakes / Time).',
      'During the 1-minute trial practice, test the key travel and keyboard height to adjust your seat.',
      'Read 2 to 3 words ahead: Keep your gaze on the text passage, never look down at your hands.',
      'Do not panic if you misspell a word: press Space immediately and focus on the next word rather than aggressively deleting.'
    ],
    icon: 'award'
  },
  {
    id: 'tip-ergonomics',
    category: 'Ergonomics',
    title: 'Posture, Hand Geometry & Wrist Health',
    summary: 'Typing fatigue and carpal tunnel pain occur when your wrists rest flat on the table edge.',
    keyPoints: [
      'Keep your wrists hovering in a straight, neutral position like a pianist playing piano keys.',
      'Your elbows should form a comfortable 90-degree angle with your shoulders relaxed and pulled back.',
      'Keep your monitor at eye level, roughly an arm\'s length away (20-28 inches).',
      'Warm up your fingers with light stretching before beginning an intense 5-minute timed test.'
    ],
    icon: 'shield'
  },
  {
    id: 'tip-15-day-roadmap',
    category: 'Speed Secrets',
    title: '15-Day Practice Roadmap (15 WPM to 45+ WPM)',
    summary: 'A structured, 20-minute daily routine to systematically build permanent finger muscle memory.',
    keyPoints: [
      'Days 1-3: Practice Home Row only (A S D F J K L ;) until you can type without glancing at the keys.',
      'Days 4-7: Introduce Top Row (Q W E R T Y U I O P) and Bottom Row (Z X C V B N M) in lowercase.',
      'Days 8-11: Integrate capital letters using opposite Shift keys and common punctuation marks (, . - ?).',
      'Days 12-15: Take timed 3-minute and 5-minute PPSC official passages under exam-like quiet conditions.'
    ],
    icon: 'calendar'
  }
];

const SCORES_STORAGE_KEY = 'aiou_typing_test_scores_history';

export const getStoredTypingScores = (): TypingScoreRecord[] => {
  try {
    const raw = localStorage.getItem(SCORES_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse typing scores', err);
    return [];
  }
};

export const saveTypingScore = (record: TypingScoreRecord): TypingScoreRecord[] => {
  try {
    const existing = getStoredTypingScores();
    const updated = [record, ...existing].slice(0, 20); // keep last 20 attempts
    localStorage.setItem(SCORES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save typing score', err);
    return [];
  }
};

export const clearTypingScores = (): void => {
  try {
    localStorage.removeItem(SCORES_STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear typing scores', err);
  }
};
