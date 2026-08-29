import { ProgramInfo, SolvedAssignmentItem, PortalLink, AiouNewsAlert, FaqItem } from '../types';

export const HELPDESK_PHONE = '03451291610';
export const HELPDESK_WHATSAPP = '923451291610';
export const HELPDESK_NAME = 'Educare Help Desk';

export const AIOU_NEWS_ALERTS: AiouNewsAlert[] = [
  {
    id: 'news-bise-1',
    category: 'Admission',
    tagText: 'BISE SARGODHA 2026',
    headline: 'BISE Sargodha Matric & Intermediate Admissions & Result Portal Live',
    detail: 'BISE Sargodha online admission forms, gazette result search, degree & DMC verification for IBCC/Jobs, and downloadable NOC/migration forms are now available on the Educare portal.',
    date: 'August 2026',
    isUrgent: true,
    actionTab: 'bise-sargodha',
    linkUrl: 'https://bisesargodha.edu.pk'
  },
  {
    id: 'news-1',
    category: 'Admission',
    tagText: 'AUTUMN 2026 ADMISSIONS',
    headline: 'Autumn 2026 Admissions Open for ODL & Face-to-Face Programs!',
    detail: 'Allama Iqbal Open University (AIOU) Autumn 2026 admissions are active for Matric, FA, BA, BS (4-Year), B.Ed (1.5, 2.5, 4-Year), M.Phil, and Ph.D. Apply online on the official AIOU OAS portal or contact Educare Help Desk (03451291610) for assistance.',
    date: 'August 2026',
    isUrgent: true,
    actionTab: 'fee-calculator',
    linkUrl: 'https://oas.aiou.edu.pk'
  },
  {
    id: 'news-2',
    category: 'Deadline',
    tagText: 'ASSIGNMENT DEADLINE',
    headline: 'Upcoming AIOU Assignment Submission Deadlines Schedule',
    detail: 'B.Ed Assignment No. 2 deadline is August 15, 2026. Matric / FA / BA Assignment No. 4 deadline is August 20, 2026. Upload typed single PDF files (under 5MB) on AAGHI LMS before the portal locks automatically.',
    date: 'August 2026',
    isUrgent: true,
    actionTab: 'solved-assignments',
    linkUrl: 'https://aaghi.aiou.edu.pk'
  },
  {
    id: 'news-3',
    category: 'Workshop',
    tagText: 'AAGHI LMS WORKSHOPS',
    headline: 'Mandatory Online Workshops Active on Microsoft Teams',
    detail: 'Online workshops for BS, B.Ed, Master, MPhil & PhD programs are currently running. Minimum 70% online attendance on Microsoft Teams via AAGHI portal is compulsory to qualify for semester examinations.',
    date: 'August 2026',
    isUrgent: false,
    actionTab: 'portals',
    linkUrl: 'https://aaghi.aiou.edu.pk'
  },
  {
    id: 'news-4',
    category: 'HelpDesk',
    tagText: 'SOLVED ASSIGNMENTS 03451291610',
    headline: 'Educare Help Desk: Instant Solved Assignments & Fee Challan Help',
    detail: 'Get 100% verified solved assignments (8601, 8611, 247, 386, 1423, 5401), roll number slip assistance, CMS password reset, and book dispatch tracking by contacting Educare Desk at 03451291610.',
    date: 'August 2026',
    isUrgent: true,
    actionTab: 'contact'
  },
  {
    id: 'news-punjab-jobs',
    category: 'Admission',
    tagText: 'PUNJAB JOBS 2026',
    headline: 'Mega Punjab Govt Recruitments: 5,000+ Educators & PPSC Posts Announced',
    detail: 'Government of Punjab and PPSC have announced new recruitment drives for Educators (BS-14 to BS-16), Junior Clerks (BS-11), College Lecturers (BS-17), and Police Sub-Inspectors. General age relaxation of 5 to 8 years is applicable.',
    date: '2026',
    isUrgent: true,
    actionTab: 'jobs',
    linkUrl: 'https://ppsc.gop.pk'
  },
  {
    id: 'news-punjab-notif',
    category: 'Deadline',
    tagText: 'GOVT OF PUNJAB NOTIFICATIONS',
    headline: 'Punjab Govt Notifications on Age Relaxation, Honhaar Scholarship & 25% Allowance',
    detail: 'Official gazette notifications issued by S&GAD, Higher Education, and Finance Department Punjab regarding 5-8 years age relaxation, 100% Honhaar Scholarships, and clerical staff upgradation are live on the Jobs Portal.',
    date: '2026',
    isUrgent: true,
    actionTab: 'jobs'
  },
  {
    id: 'news-5',
    category: 'LMS',
    tagText: 'CMS & LMS PORTALS',
    headline: 'Check CMS Portal Enrollment & Tutor Details Online',
    detail: 'Student enrollment, semester results, course registration, and assigned tutor details are available on AIOU CMS (enrollment.aiou.edu.pk) and Tutor Portal.',
    date: 'August 2026',
    isUrgent: false,
    actionTab: 'portals',
    linkUrl: 'https://enrollment.aiou.edu.pk'
  }
];

export const AIOU_PROGRAMS: ProgramInfo[] = [
  {
    id: 'matric',
    level: 'Matric',
    title: 'Secondary School Certificate (SSC / Matric)',
    duration: '2 Years',
    semesters: 4,
    eligibility: 'Middle Pass (8th Class Result Card / School Leaving Certificate) or equivalent',
    estimatedFeePerSemester: 5500,
    popularCodes: ['201', '202', '204', '221', '247'],
    description: 'AIOU Matriculation offers general SSC, Dars-e-Nizami (Sanavia Amma), and Open Schooling for students seeking formal secondary education through distance learning.',
    coursesSample: [
      { code: '201', name: 'Islamiat (Compulsory)', credits: 3, type: 'Compulsory' },
      { code: '202', name: 'Pakistan Studies', credits: 3, type: 'Compulsory' },
      { code: '204', name: 'Urdu', credits: 6, type: 'Compulsory' },
      { code: '221', name: 'English-I', credits: 6, type: 'Compulsory' },
      { code: '247', name: 'General Mathematics', credits: 6, type: 'Elective' }
    ]
  },
  {
    id: 'fa',
    level: 'FA / Intermediate',
    title: 'Higher Secondary School Certificate (HSSC / FA / I.Com)',
    duration: '2 Years',
    semesters: 4,
    eligibility: 'Matric / SSC Pass certificate from any recognized board',
    estimatedFeePerSemester: 7200,
    popularCodes: ['316', '317', '386', '387', '411', '416'],
    description: 'Intermediate programs in Arts, General Science, Commerce (I.Com), and Dars-e-Nizami (Sanavia Khasa) tailored for distance education learners across Pakistan.',
    coursesSample: [
      { code: '316', name: 'Islamiat (Compulsory)', credits: 3, type: 'Compulsory' },
      { code: '317', name: 'Pakistan Studies', credits: 3, type: 'Compulsory' },
      { code: '386', name: 'Compulsory English-I', credits: 6, type: 'Compulsory' },
      { code: '411', name: 'Urdu-I', credits: 6, type: 'Compulsory' },
      { code: '416', name: 'Economics-I', credits: 6, type: 'Elective' }
    ]
  },
  {
    id: 'ba-ad',
    level: 'BA / AD',
    title: 'Associate Degree Program (AD / BA Arts & Commerce)',
    duration: '2 Years',
    semesters: 4,
    eligibility: 'FA / F.Sc / I.Com / A-Level or equivalent (min 45% marks)',
    estimatedFeePerSemester: 11500,
    popularCodes: ['411', '416', '417', '419', '1423', '1424', '1429'],
    description: 'Associate Degree in Arts (B.A.), Business Administration, Commerce (B.Com), and Education (A.D. Education). Ideal for employment pathway.',
    coursesSample: [
      { code: '1423', name: 'Compulsory English-I', credits: 6, type: 'Compulsory' },
      { code: '1424', name: 'Compulsory English-II', credits: 6, type: 'Compulsory' },
      { code: '1429', name: 'Business Mathematics', credits: 6, type: 'Elective' },
      { code: '417', name: 'Pakistan Studies', credits: 3, type: 'Compulsory' },
      { code: '419', name: 'Mass Communication', credits: 6, type: 'Elective' }
    ]
  },
  {
    id: 'bs-4yr',
    level: 'BS (4-Year)',
    title: 'BS Programs (4-Year Undergraduate Degree)',
    duration: '4 Years',
    semesters: 8,
    eligibility: 'Intermediate / FA / F.Sc / ICS with minimum 45% marks',
    estimatedFeePerSemester: 18500,
    popularCodes: ['5401', '5403', '5408', '9401', '9407', '9408', '3400'],
    description: '4-year BS degrees in Computer Science, English, Urdu, Islamic Studies, Mathematics, Physics, Chemistry, Sociology, Pak Studies, Accounting & Finance.',
    coursesSample: [
      { code: '5401', name: 'Introduction to Programming', credits: 3, type: 'Compulsory' },
      { code: '5403', name: 'Data Structures & Algorithms', credits: 3, type: 'Compulsory' },
      { code: '9401', name: 'Study of Islamic Culture', credits: 3, type: 'Compulsory' },
      { code: '9407', name: 'English Communication Skills', credits: 3, type: 'Compulsory' },
      { code: '9408', name: 'Calculus & Analytical Geometry', credits: 3, type: 'Elective' }
    ]
  },
  {
    id: 'bed',
    level: 'B.Ed',
    title: 'Bachelor of Education (B.Ed 1.5, 2.5 & 4 Years)',
    duration: '1.5 to 4 Years',
    semesters: 3,
    eligibility: 'MA/MSc/BS for B.Ed 1.5yr; BA/BSc for B.Ed 2.5yr; FA/FSc for B.Ed 4yr',
    estimatedFeePerSemester: 21000,
    popularCodes: ['8601', '8602', '8603', '8604', '8605', '8606', '8611'],
    description: 'Professional teacher training recognized nationwide and internationally. Specializations in Early Childhood, Elementary, Secondary, and Higher Education.',
    coursesSample: [
      { code: '8601', name: 'General Methods of Teaching', credits: 3, type: 'Compulsory' },
      { code: '8602', name: 'Educational Assessment & Evaluation', credits: 3, type: 'Compulsory' },
      { code: '8603', name: 'Curriculum Development', credits: 3, type: 'Compulsory' },
      { code: '8604', name: 'Research Methods in Education', credits: 3, type: 'Compulsory' },
      { code: '8611', name: 'Critical Thinking & Reflective Practices', credits: 3, type: 'Compulsory' }
    ]
  },
  {
    id: 'master-pgd',
    level: 'Master / PGD',
    title: 'Master Degree & Post Graduate Diplomas (MA/MSc/PGD)',
    duration: '2 Years',
    semesters: 4,
    eligibility: 'Bachelor Degree (BA / BSc / B.Com) with minimum 2nd division',
    estimatedFeePerSemester: 22500,
    popularCodes: ['6501', '6502', '6551', '6553', '5601', '5602'],
    description: 'Postgraduate education in MA Education, MA Islamic Studies, MSc Sociology, MSc Mass Communication, PGD Criminology, PGD Computer Science.',
    coursesSample: [
      { code: '6501', name: 'Educational Psychology', credits: 3, type: 'Compulsory' },
      { code: '6502', name: 'Foundations of Education', credits: 3, type: 'Compulsory' },
      { code: '6551', name: 'Quranic Sciences', credits: 3, type: 'Compulsory' },
      { code: '5601', name: 'Advanced Sociology', credits: 3, type: 'Compulsory' }
    ]
  },
  {
    id: 'mphil-ms',
    level: 'M.Phil / MS',
    title: 'M.Phil / MS Programs (Research Master Degree)',
    duration: '2 Years',
    semesters: 4,
    eligibility: '16 Years of Education (BS 4-Year / MA / MSc) with min 2.5 CGPA + GAT Test',
    estimatedFeePerSemester: 32000,
    popularCodes: ['7701', '7702', '7705', '7710'],
    description: 'Higher research programs in Education, Arabic, Urdu, Physics, Chemistry, History, Islamic Studies with coursework and thesis research.',
    coursesSample: [
      { code: '7701', name: 'Advanced Quantitative Research Methods', credits: 3, type: 'Compulsory' },
      { code: '7702', name: 'Qualitative Research Techniques', credits: 3, type: 'Compulsory' },
      { code: '7705', name: 'Philosophical Perspectives in Education', credits: 3, type: 'Compulsory' }
    ]
  },
  {
    id: 'phd',
    level: 'Ph.D.',
    title: 'Doctor of Philosophy (Ph.D. Programs)',
    duration: '3 to 5 Years',
    semesters: 6,
    eligibility: 'M.Phil / MS (18 Years Education) min 3.0 CGPA + Subject GRE / GAT Subject + Interview',
    estimatedFeePerSemester: 42000,
    popularCodes: ['9901', '9902', '9910'],
    description: 'Doctoral research degree program for scholars, university faculty, and researchers across science, humanities, Islamic studies, and educational leadership.',
    coursesSample: [
      { code: '9901', name: 'Advanced Academic Writing & Research Ethics', credits: 3, type: 'Compulsory' },
      { code: '9902', name: 'Doctoral Seminar & Literature Review', credits: 3, type: 'Compulsory' }
    ]
  }
];

export const SOLVED_ASSIGNMENTS: SolvedAssignmentItem[] = [
  {
    id: 'asg-8601',
    programLevel: 'B.Ed',
    courseCode: '8601',
    courseTitle: 'General Methods of Teaching',
    semester: 'Autumn 2025 / Spring 2026',
    assignmentNumber: 1,
    academicYear: '2025-2026',
    downloadCount: 1420,
    isPopular: true,
    summary: 'Comprehensive solved assignment covering teaching strategies, lesson planning, student engagement techniques, and classroom management.',
    sampleQuestions: [
      {
        question: 'Q1: Define teaching methods. Discuss the major principles of effective teaching with examples.',
        briefAnswer: 'Teaching methods represent structured principles and strategies used by educators to enable student learning. Key principles include active participation, individual difference accommodation, clear objective setting, and reflective feedback.'
      },
      {
        question: 'Q2: Explain the steps involved in designing an effective lesson plan for secondary level.',
        briefAnswer: 'Lesson planning steps: 1. Identify learning objectives (Bloom taxonomy), 2. Anticipate learner needs, 3. Design instructional activities, 4. Plan assessment methods, 5. Allocate time and resources effectively.'
      }
    ]
  },
  {
    id: 'asg-8611',
    programLevel: 'B.Ed',
    courseCode: '8611',
    courseTitle: 'Critical Thinking & Reflective Practices',
    semester: 'Autumn 2025 / Spring 2026',
    assignmentNumber: 1,
    academicYear: '2025-2026',
    downloadCount: 980,
    isPopular: true,
    summary: 'Solved questions on Gibbs reflective cycle, critical reflection in teaching, action research, and problem-solving skills in education.',
    sampleQuestions: [
      {
        question: 'Q1: What is reflective practice? Detail Gibbs Reflective Cycle with a classroom scenario.',
        briefAnswer: 'Reflective practice is learning through examining one’s own experience. Gibbs Cycle consists of 6 stages: Description, Feelings, Evaluation, Analysis, Conclusion, and Action Plan.'
      }
    ]
  },
  {
    id: 'asg-247',
    programLevel: 'Matric',
    courseCode: '247',
    courseTitle: 'General Mathematics',
    semester: 'Autumn 2025',
    assignmentNumber: 1,
    academicYear: '2025-2026',
    downloadCount: 2350,
    isPopular: true,
    summary: 'Full step-by-step solved mathematical equations, percentage, ratio, proportion, and basic algebraic problems for Matric students.',
    sampleQuestions: [
      {
        question: 'Q1: Calculate the compound interest on PKR 50,000 at 8% per annum for 3 years.',
        briefAnswer: 'Formula: A = P(1 + r/100)^n. A = 50000(1.08)^3 = PKR 62,985.60. Interest = 62,985.60 - 50,000 = PKR 12,985.60.'
      }
    ]
  },
  {
    id: 'asg-386',
    programLevel: 'FA / Intermediate',
    courseCode: '386',
    courseTitle: 'Compulsory English-I',
    semester: 'Autumn 2025',
    assignmentNumber: 1,
    academicYear: '2025-2026',
    downloadCount: 1890,
    isPopular: true,
    summary: 'Grammar exercises, formal essay writing, comprehension passages, and letter writing solutions formatted according to AIOU examination guidelines.',
    sampleQuestions: [
      {
        question: 'Q1: Write a formal letter to the AIOU Regional Director requesting book delivery status.',
        briefAnswer: 'Formal letter template included with proper salutation, student credentials (Roll No, Reg No), polite query body, and request for tracking updates.'
      }
    ]
  },
  {
    id: 'asg-1423',
    programLevel: 'BA / AD',
    courseCode: '1423',
    courseTitle: 'Compulsory English-I',
    semester: 'Autumn 2025 / Spring 2026',
    assignmentNumber: 1,
    academicYear: '2025-2026',
    downloadCount: 3100,
    isPopular: true,
    summary: 'Higher English grammar, précis writing, academic paragraph development, reading comprehension, and business vocabulary solved questions.',
    sampleQuestions: [
      {
        question: 'Q1: Explain the difference between skimming and scanning in reading skills.',
        briefAnswer: 'Skimming is reading rapidly to get the general gist of a text, whereas scanning is searching for specific facts or key words without reading the entire document.'
      }
    ]
  },
  {
    id: 'asg-5401',
    programLevel: 'BS (4-Year)',
    courseCode: '5401',
    courseTitle: 'Introduction to Programming (C++/Python)',
    semester: 'Spring 2026',
    assignmentNumber: 1,
    academicYear: '2026',
    downloadCount: 1120,
    isPopular: false,
    summary: 'Complete solved code examples, loops, control structures, functions, array manipulations, and problem-solving assignments for BS Computer Science.',
    sampleQuestions: [
      {
        question: 'Q1: Write a program to find the factorial of a given integer using recursion.',
        briefAnswer: 'Includes C++ and Python implementation with base case check (n <= 1 return 1) and recursive step n * factorial(n - 1).'
      }
    ]
  },
  {
    id: 'asg-6501',
    programLevel: 'Master / PGD',
    courseCode: '6501',
    courseTitle: 'Educational Psychology',
    semester: 'Autumn 2025',
    assignmentNumber: 1,
    academicYear: '2025-2026',
    downloadCount: 840,
    isPopular: false,
    summary: 'Deep analysis of Piaget cognitive stages, Vygotsky social constructivism, motivation theories, and individual difference in adult learning.',
    sampleQuestions: [
      {
        question: 'Q1: Compare Piaget cognitive development stages with Vygotsky socio-cultural theory.',
        briefAnswer: 'Piaget emphasizes self-directed cognitive development through stages, while Vygotsky stresses the social environment, Zone of Proximal Development (ZPD), and scaffolding.'
      }
    ]
  }
];

export const PORTAL_LINKS: PortalLink[] = [
  {
    title: 'AIOU CMS Portal (Enrollment)',
    description: 'Check roll number, enrollment status, course registration, semester results, and fee slips.',
    url: 'https://enrollment.aiou.edu.pk',
    iconName: 'UserCheck',
    badge: 'Official Portal'
  },
  {
    title: 'AAGHI LMS Portal',
    description: 'Join online workshops, submit digital assignments, access Microsoft Teams sessions, and view tutor feedback.',
    url: 'https://aaghi.aiou.edu.pk',
    iconName: 'GraduationCap',
    badge: 'Online Workshops'
  },
  {
    title: 'Book Tracking System',
    description: 'Track postal dispatch of physical study books & dispatch status by CNIC or Roll Number.',
    url: 'https://books.aiou.edu.pk',
    iconName: 'PackageCheck',
    badge: 'Postal Track'
  },
  {
    title: 'Tutor Information System',
    description: 'Find your assigned semester tutor details, mailing addresses, and phone numbers.',
    url: 'https://tutor.aiou.edu.pk',
    iconName: 'Users',
    badge: 'Tutor Info'
  },
  {
    title: 'AIOU Admission Online Portal',
    description: 'Apply for new admissions (Matric, FA, BS, B.Ed, MPhil, PhD) and download provisional admission letter.',
    url: 'https://oas.aiou.edu.pk',
    iconName: 'FileCheck2',
    badge: 'New Admission'
  },
  {
    title: 'BISE Sargodha Official Portal',
    description: 'Check SSC/HSSC results, online admission, certificate verification, migration NOC, and roll number slips.',
    url: 'https://bisesargodha.edu.pk',
    iconName: 'Building',
    badge: 'Punjab Board'
  },
  {
    title: 'Result Card & Degree Verification',
    description: 'Apply for original degree certificate, duplicate result card, migration certificate, and correction desk.',
    url: 'https://degree.aiou.edu.pk',
    iconName: 'Award',
    badge: 'Degree Desk'
  }
];

export const AIOU_FAQS: (FaqItem & { q?: string; a?: string })[] = [
  {
    id: 'faq-1',
    category: 'Admissions',
    question: 'How do I apply for new admission at Allama Iqbal Open University (AIOU)?',
    answer: 'Admissions open twice a year: Spring (Jan–March) and Autumn (July–Sept). You can apply online at the AIOU OAS portal (oas.aiou.edu.pk). Fill out your profile, select your desired program (Matric, FA, BA, BS, B.Ed, MPhil, PhD), upload clear attested documents, generate the fee challan, and pay at designated banks or via JazzCash/EasyPaisa/1Link. Educare Help Desk (03451291610) can assist you with the entire form filling process.',
    tags: ['New Admission', 'OAS Portal', 'Challan', 'Registration'],
    helpfulCount: 242,
    q: 'How do I apply for new admission at Allama Iqbal Open University (AIOU)?',
    a: 'Admissions open in Spring and Autumn. Apply online at OAS portal (oas.aiou.edu.pk). Fill profile, upload attested documents, generate fee challan, and pay via JazzCash/EasyPaisa/Bank.'
  },
  {
    id: 'faq-2',
    category: 'Admissions',
    question: 'How do continuing students register and enroll for next semester courses on CMS?',
    answer: 'Continuing students must register courses online through the AIOU CMS Portal (enrollment.aiou.edu.pk). Go to "Course Registration" > "Student Enrollment" > Select Academic Career & Semester > Add courses according to scheme of study > Click "Submit" to generate the payable Fee Challan. Pay before the due date to avoid late fees.',
    tags: ['Continuing Student', 'Course Registration', 'CMS Enrollment', 'Semester Fee'],
    helpfulCount: 215,
    q: 'How do continuing students register for next semester courses on CMS?',
    a: 'Login to CMS (enrollment.aiou.edu.pk) > "Course Registration" > "Student Enrollment" > Select courses > Generate & pay fee challan.'
  },
  {
    id: 'faq-3',
    category: 'Admissions',
    question: 'What documents are required for AIOU online admission and attestation?',
    answer: 'Requirements by level: Matric requires 8th class certificate/School Leaving Certificate + CNIC/B-Form; FA requires Matric certificate & DMC; BA/BS requires Intermediate certificate; B.Ed requires previous degrees (BA/BSc/MA DMCs); MPhil/PhD requires 16/18 years degree transcripts + GAT score. All document copies must be attested by a Government Grade 17+ Gazetted Officer before uploading.',
    tags: ['Documents', 'Attestation', 'Eligibility', 'Gazetted Officer'],
    helpfulCount: 178,
    q: 'What documents are required for AIOU online admission form submission?',
    a: 'Matric needs 8th pass certificate; FA needs Matric certificate; BA/BS needs Intermediate certificate; B.Ed/MPhil needs prior degree transcripts. All copies must be attested by Grade 17+ officer.'
  },
  {
    id: 'faq-4',
    category: 'Admissions',
    question: 'How do I pay AIOU fee online via 1Link, EasyPaisa, JazzCash, or Bank Challan?',
    answer: '1Link / Mobile Banking: Select "Bill Payment" > "1Bill Invoice/Voucher" > Enter Prefix 999996 followed by your 10-digit Challan Number (e.g. 999996XXXXXXXXXX). EasyPaisa / JazzCash: Open App > "Education / University Fees" > Select "Allama Iqbal Open University" > Enter Challan Number. Physical Banks: Pay printed challan at any branch of ABL, MCB, FWBL, or UBL across Pakistan.',
    tags: ['Fee Payment', 'EasyPaisa', 'JazzCash', '1Link', 'Bank Challan'],
    helpfulCount: 290,
    q: 'How do I pay AIOU fee online via mobile apps or banks?',
    a: 'Pay via EasyPaisa/JazzCash under Education Fees, 1Link (prefix 999996 + Challan ID), or physical branches of ABL, MCB, FWBL, and UBL.'
  },
  {
    id: 'faq-5',
    category: 'Admissions',
    question: 'How can I check admission status, confirmation SMS, and tracking?',
    answer: 'Log in to AIOU OAS (for new students) or CMS portal (for continuing students). Click "Admission Status" or "My Enrollment". Confirmation SMS with your Student ID is typically dispatched within 4 to 6 weeks of fee payment. If delayed, contact Educare Help Desk at 03451291610 with your challan voucher number.',
    tags: ['Admission Status', 'Confirmation SMS', 'Student ID', 'Tracking'],
    helpfulCount: 165,
    q: 'How can I check my AIOU admission confirmation status?',
    a: 'Check "Admission Status" on OAS or CMS portal. Confirmation SMS arrives 4-6 weeks post fee submission. Helpline 03451291610 can verify status.'
  },
  {
    id: 'faq-6',
    category: 'Admissions',
    question: 'What should I do if an Admission Objection is raised on my application?',
    answer: 'If an objection is placed (e.g. unclear photo, unattested document, incorrect fee), log in to the OAS portal objection tracking page. Upload the requested clear attested document or corrected challan voucher within 15 days. You can also visit your nearest AIOU Regional Office or contact Educare Help Desk (03451291610) for fast clearance.',
    tags: ['Objection', 'OAS Correction', 'Regional Office', 'Document Re-upload'],
    helpfulCount: 140,
    q: 'How do I clear an admission objection on AIOU portal?',
    a: 'Log in to OAS portal objection section, re-upload clear attested scans within 15 days, or contact Educare Help Desk (03451291610).'
  },
  {
    id: 'faq-7',
    category: 'Assignments',
    question: 'What are the assignment submission procedures for Matric, FA, and BA (Associate Degree)?',
    answer: 'For Matric, FA, and BA/Associate Degree programs, assignments are physical and handwritten on paper. You must attach 3 copies of the official AIOU Tutor Dispatch Performa (Part 1, 2, 3) to each assignment. Pack them in an envelope with your tutor address clearly written, and dispatch via Pakistan Post UMS or Registered Post before the deadline. Keep the postal tracking receipt safely.',
    tags: ['Handwritten Assignments', 'Postal Dispatch', 'Matric FA BA', 'Tutor Form'],
    helpfulCount: 310,
    q: 'How do Matric, FA, and BA students submit handwritten assignments?',
    a: 'Handwrite on paper, attach 3 copies of tutor dispatch form to each assignment, mail to assigned tutor via registered Pakistan Post, and save the receipt.'
  },
  {
    id: 'faq-8',
    category: 'Assignments',
    question: 'How do BS, B.Ed, Master, MPhil, and PhD students upload typed assignments on AAGHI LMS?',
    answer: 'For BS, B.Ed, Master, MPhil, and PhD programs, assignments must be typed in English or Urdu and converted to a single PDF (under 5 MB). Log in to AAGHI LMS (aaghi.aiou.edu.pk) using your @aiou.edu.pk credentials > Select course code > Click "Assignment No. 1 / 2" > Click "Add Submission" > Upload PDF file > Click "Save changes". Verify the status shows green "Submitted for grading".',
    tags: ['LMS Upload', 'AAGHI Portal', 'PDF Submission', 'BS B.Ed Assignment'],
    helpfulCount: 380,
    q: 'How do I upload assignments on AAGHI LMS portal for BS and B.Ed?',
    a: 'Type assignment, convert to single PDF under 5MB, login to AAGHI LMS, click course > Assignment > Add Submission > Upload PDF > Save Changes.'
  },
  {
    id: 'faq-9',
    category: 'Assignments',
    question: 'What is the maximum file size, formatting rules, and cover page requirement for LMS upload?',
    answer: 'Maximum file size on AAGHI LMS is 5 MB in PDF or DOCX format. Plagiarism is strictly monitored by Turnitin. Every assignment must begin with a proper Cover Page including: Student Name, Roll Number, Student ID, Course Code, Course Title, Assignment No, and Semester. Educare Help Desk provides a free, instant Assignment Cover Page Generator.',
    tags: ['File Size Limit 5MB', 'Cover Page Maker', 'Turnitin Plagiarism', 'Formatting'],
    helpfulCount: 225,
    q: 'What are the formatting rules and file limits for AIOU assignment upload?',
    a: 'Single PDF/DOCX under 5MB. Must include complete cover page with name, roll number, course code, and semester. Avoid copy-pasting.'
  },
  {
    id: 'faq-10',
    category: 'Assignments',
    question: 'How do I find my assigned tutor name, contact number, and postal address?',
    answer: 'Log in to the AIOU CMS Portal (enrollment.aiou.edu.pk), navigate to "Academic Records" > "My Tutors", or visit tutor.aiou.edu.pk. If tutor details are not allocated close to deadline, send your assignments directly to your AIOU Regional Center Director before the deadline.',
    tags: ['Tutor Address', 'My Tutors', 'CMS Academic Records', 'Regional Director'],
    helpfulCount: 260,
    q: 'How can I find my semester tutor address and contact details?',
    a: 'Check "Academic Records" > "My Tutors" in CMS portal or tutor.aiou.edu.pk. If unassigned, contact Regional Directorate.'
  },
  {
    id: 'faq-11',
    category: 'Assignments',
    question: 'What happens if an assignment submission deadline is missed?',
    answer: 'AAGHI LMS submission links lock automatically at 23:59 on the deadline date. No extensions are granted by tutors. Assignments carry 30% weightage in final grading; failing to submit results in automatic failure of that course, requiring you to re-enroll in the course in a subsequent semester.',
    tags: ['Deadline Missed', 'Portal Lock', 'Weightage', 'Course Failure'],
    helpfulCount: 195,
    q: 'What happens if I miss the AIOU assignment deadline?',
    a: 'LMS locks automatically. Assignment carries 30% aggregate weight. Missing assignments results in course failure.'
  },
  {
    id: 'faq-12',
    category: 'Exams',
    question: 'When are final examinations held and how do I download my Roll Number Slip from CMS?',
    answer: 'Spring semester exams are held in Sept–Oct; Autumn semester exams are held in March–April. Download your Roll Number Slip from CMS (enrollment.aiou.edu.pk) under "Exam & Grades" > "My Exam Schedule" > "Download Roll No Slip". Print a physical copy and bring it along with your Original CNIC to the exam hall.',
    tags: ['Roll Number Slip', 'Exam Schedule', 'Date Sheet', 'CMS Download'],
    helpfulCount: 340,
    q: 'How do I download my AIOU Roll Number Slip for final exams?',
    a: 'Log in to CMS Portal > "Exam & Grades" > "My Exam Schedule" > Download and print Roll Number Slip. Carry original CNIC.'
  },
  {
    id: 'faq-13',
    category: 'Exams',
    question: 'What are the passing mark criteria for assignments, exams, and overall course completion?',
    answer: 'Matric, FA, BA, and BS (4-Year) programs require a minimum 40% in final exams and 40% in assignments separately. B.Ed, Master, MPhil, and PhD programs require a minimum 50% passing marks in both written exams and assignments. Both components are independently mandatory.',
    tags: ['Passing Marks', '40% Criteria', '50% Threshold', 'Grading Scheme'],
    helpfulCount: 295,
    q: 'What are the passing percentage criteria for AIOU exams and assignments?',
    a: '40% for Matric, FA, BA, and BS; 50% for B.Ed, Master, MPhil, and PhD in both exam and assignment components.'
  },
  {
    id: 'faq-14',
    category: 'Exams',
    question: 'What is the policy for Reappear (R/A) and Again Reappear (A/R) in final exams?',
    answer: 'If you fail the written exam but passed your assignments and workshops, you are marked "Re-Appear (R/A)". You do NOT need to submit assignments again or attend workshops. AIOU automatically schedules your exam in the next semester, and the reappear exam fee will be added to your next semester challan.',
    tags: ['Reappear Policy', 'R/A Exam', 'Again Reappear', 'Exam Fee'],
    helpfulCount: 230,
    q: 'What is the AIOU Re-appear (R/A) policy if I fail the written exam?',
    a: 'If assignments were passed, you only reappear in the written exam next semester. No need to resubmit assignments.'
  },
  {
    id: 'faq-15',
    category: 'Exams',
    question: 'How can I apply for a Change of Examination Center?',
    answer: 'Examination Center change requests must be submitted at least 20 days prior to exam commencement. Submit a request on CMS Service Request portal with documentary evidence (e.g. transfer letter, marriage certificate, utility bill of new residence) and pay the designated center change fee challan.',
    tags: ['Exam Center Change', 'Service Request', 'CMS Portal', 'Transfer'],
    helpfulCount: 160,
    q: 'How do I change my assigned AIOU examination center?',
    a: 'Apply 20 days before exams via CMS Service Request with documentary proof and fee voucher.'
  },
  {
    id: 'faq-16',
    category: 'Exams',
    question: 'How do I apply for Provisional Certificate, Result Card, and Original Degree issuance?',
    answer: 'Apply online at degree.aiou.edu.pk. Fill out the application form, upload clear attested scanned copies of all semester result cards, CNIC, Matric/Inter certificates, and pay the fee (Normal or Urgent delivery) via 1Link or bank challan. Degree verification is completed and dispatched via TCS/UMS within 15–45 days.',
    tags: ['Degree Tracking', 'Provisional Certificate', 'DMC Verification', 'Urgent Degree'],
    helpfulCount: 280,
    q: 'How do I get my original degree or provisional certificate from AIOU?',
    a: 'Apply on degree.aiou.edu.pk, upload attested semester result cards + CNIC, pay normal/urgent fee challan, and receive via courier.'
  },
  {
    id: 'faq-17',
    category: 'LMS & CMS',
    question: 'How do I log in to AIOU CMS (enrollment.aiou.edu.pk) and reset a forgotten password?',
    answer: 'Your CMS User ID is your Student Registration ID (e.g. 22PBN09812). If you forgot your password, click "Forgot Password" on the CMS login page and provide your registered mobile number or email. You can also contact Educare Help Desk (03451291610) for instant password recovery guidance.',
    tags: ['CMS Login', 'Password Reset', 'Student ID', 'Enrollment Portal'],
    helpfulCount: 245,
    q: 'How do I reset my AIOU CMS portal password?',
    a: 'Use Student ID as User ID. Click "Forgot Password" on enrollment.aiou.edu.pk or contact Educare Help Desk at 03451291610.'
  },
  {
    id: 'faq-18',
    category: 'LMS & CMS',
    question: 'What are the rules for AAGHI LMS online workshops on Microsoft Teams?',
    answer: 'Online workshops are mandatory for BS, B.Ed, Master, MPhil, and PhD students. Log in to AAGHI LMS > Select course > Click Microsoft Teams session link according to your date/time slot. A minimum 70% active online attendance is required to pass the workshop component; failure to attend results in course failure.',
    tags: ['AAGHI LMS', 'Online Workshops', 'Microsoft Teams', '70% Attendance'],
    helpfulCount: 270,
    q: 'What is the attendance requirement for AIOU online workshops?',
    a: 'Workshops take place on Microsoft Teams via AAGHI LMS. Minimum 70% live attendance is mandatory to avoid course failure.'
  },
  {
    id: 'faq-19',
    category: 'General',
    question: 'How does Educare Help Desk (03451291610) assist students?',
    answer: 'Educare Help Desk is an independent facilitation center providing comprehensive support for Allama Iqbal Open University & BISE Sargodha students. We provide verified solved assignments, AI assignment assistance, admission form guidance, fee calculation, CMS/LMS support, past papers, date sheets, job alerts, and cover page makers.',
    tags: ['Educare Helpline', 'Student Support', '03451291610', 'WhatsApp'],
    helpfulCount: 350,
    q: 'How can Educare Help Desk (03451291610) assist AIOU students?',
    a: 'Educare Help Desk provides 100% verified solved assignments, AI homework assistance, admission support, fee calculators, and 24/7 helpline at 03451291610.'
  },
  {
    id: 'faq-20',
    category: 'General',
    question: 'Is Educare Help Desk available on WhatsApp for instant solutions and PDF files?',
    answer: 'Yes! Educare Help Desk maintains an active WhatsApp student helpline at 03451291610 (+923451291610). Send your course code (e.g. 8601, 8611, 247, 386, 1423, 5401) or admission question to receive immediate guidance and PDF solved assignments.',
    tags: ['WhatsApp Desk', 'Instant Help', 'Solved PDF', '03451291610'],
    helpfulCount: 315,
    q: 'How do I contact Educare Help Desk on WhatsApp?',
    a: 'Send your query or course code to 03451291610 on WhatsApp for fast response and solved materials.'
  }
];

