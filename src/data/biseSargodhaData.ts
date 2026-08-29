export interface BiseAdmissionSchedule {
  id: string;
  examLevel: 'Matric (9th & 10th)' | 'Intermediate (11th & 12th)';
  session: string;
  category: 'Regular' | 'Private' | 'Regular & Private';
  singleFeeDate: string;
  doubleFeeDate: string;
  tripleFeeDate: string;
  feeScience: number;
  feeArts: number;
  registrationFee: number;
  processingFee: number;
  status: 'Open' | 'Upcoming' | 'Closed';
  guidelines: string[];
}

export interface BiseDownloadItem {
  id: string;
  title: string;
  category: 'Admissions' | 'Migration & NOC' | 'Correction & Duplicate' | 'Rechecking' | 'Model Papers & Syllabus';
  fileType: 'PDF' | 'DOC' | 'Online Form';
  description: string;
  officialUrl: string;
  fileSize?: string;
  popular?: boolean;
}

export interface BiseVerificationService {
  id: string;
  serviceName: string;
  purpose: string;
  normalFee: number;
  urgentFee: number;
  processingDaysNormal: string;
  processingDaysUrgent: string;
  requiredDocs: string[];
  procedureSteps: string[];
}

export interface BiseResultSample {
  rollNumber: string;
  studentName: string;
  fatherName: string;
  examType: 'Matric Annual' | 'Matric 2nd Annual' | 'Inter Part-II Annual' | 'Inter Part-I Annual';
  year: string;
  group: 'Science (Biology)' | 'Science (Computer)' | 'Pre-Medical' | 'Pre-Engineering' | 'ICS (Physics)' | 'Humanities / Arts';
  registrationNo: string;
  schoolCollege: string;
  district: 'Sargodha' | 'Khushab' | 'Mianwali' | 'Bhakkar';
  totalMarks: number;
  obtainedMarks: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  status: 'PASS' | 'FAIL' | 'COMPARTMENT';
  subjects: {
    name: string;
    total: number;
    obtained: number;
    status: 'Pass' | 'Fail';
  }[];
}

export const BISE_SARGODHA_INFO = {
  name: 'Board of Intermediate and Secondary Education, Sargodha',
  shortName: 'BISE Sargodha',
  tagline: 'Empowering Education across Sargodha Division (Sargodha, Khushab, Mianwali, Bhakkar)',
  established: '1968',
  address: 'Near 49-Tail, Defence View Housing Scheme / Faisalabad Road, Sargodha, Punjab, Pakistan',
  officialWebsite: 'https://bisesargodha.edu.pk',
  helplinePhone: '048-3250041',
  controllerExamsPhone: '048-3250044',
  secretaryPhone: '048-3250047',
  inquiryEmail: 'info@bisesargodha.edu.pk',
  jurisdictionDistricts: ['Sargodha', 'Khushab', 'Mianwali', 'Bhakkar'],
  educareHelpDeskPhone: '03451291610',
  educareHelpDeskWhatsApp: '923451291610'
};

export const BISE_ADMISSION_SCHEDULES: BiseAdmissionSchedule[] = [
  {
    id: 'matric-admission-2026',
    examLevel: 'Matric (9th & 10th)',
    session: 'Matric 1st Annual Examination 2026',
    category: 'Regular & Private',
    singleFeeDate: 'December 15 - January 10',
    doubleFeeDate: 'January 11 - January 22',
    tripleFeeDate: 'January 23 - January 31',
    feeScience: 1650,
    feeArts: 1550,
    registrationFee: 1000,
    processingFee: 650,
    status: 'Open',
    guidelines: [
      'Regular candidates apply through their respective registered schools portal.',
      'Private candidates must fill the online admission form at bisesargodha.edu.pk, print the challan, and deposit fee in any HBL/MCB branch or 1Link 1Bill.',
      'Attestation of private admission form by a Grade 16+ Gazetted Govt School Headmaster/Principal is mandatory.',
      'Attach B-Form/CNIC copy and 2 passport-size photographs with sky-blue background.'
    ]
  },
  {
    id: 'inter-admission-2026',
    examLevel: 'Intermediate (11th & 12th)',
    session: 'HSSC 1st Annual Examination 2026 (FA / FSc / ICS / I.Com)',
    category: 'Regular & Private',
    singleFeeDate: 'January 20 - February 20',
    doubleFeeDate: 'February 21 - March 05',
    tripleFeeDate: 'March 06 - March 15',
    feeScience: 1950,
    feeArts: 1850,
    registrationFee: 1200,
    processingFee: 750,
    status: 'Open',
    guidelines: [
      'Regular college students must ensure their online registration and enrollment was processed in 1st Year.',
      'Private candidates can appear in Humanities (Arts), Commerce, and General Science combinations.',
      'Science groups with practicals (Pre-Med, Pre-Engg) are only allowed as Regular or fresh improvement after regular completion.',
      'Submit attested printed form along with original paid bank challan to BISE Sargodha facilitation counters.'
    ]
  },
  {
    id: 'matric-supplementary-2026',
    examLevel: 'Matric (9th & 10th)',
    session: 'Matric 2nd Annual (Supplementary) Examination 2026',
    category: 'Regular & Private',
    singleFeeDate: 'August 01 - August 20',
    doubleFeeDate: 'August 21 - August 30',
    tripleFeeDate: 'August 31 - September 07',
    feeScience: 1800,
    feeArts: 1700,
    registrationFee: 0,
    processingFee: 650,
    status: 'Upcoming',
    guidelines: [
      'For candidates with compartment/failed subjects in 1st Annual.',
      'Marks improvement candidates can appear in full or selective subject parts.',
      'Online application must be submitted within 20 days of result declaration.'
    ]
  }
];

export const BISE_DOWNLOADS_LIST: BiseDownloadItem[] = [
  {
    id: 'dl-1',
    title: 'Matric (9th & 10th) Online Private Admission Form 2026',
    category: 'Admissions',
    fileType: 'Online Form',
    description: 'Direct portal link and printable admission form format for private candidates appearing in SSC 1st Annual.',
    officialUrl: 'https://bisesargodha.edu.pk/forms/admission-matric',
    popular: true
  },
  {
    id: 'dl-2',
    title: 'Inter (11th & 12th) Online Admission Form & Challan Slip',
    category: 'Admissions',
    fileType: 'Online Form',
    description: 'HSSC 1st & 2nd Year admission form, bank challan generation, and private candidate guidelines.',
    officialUrl: 'https://bisesargodha.edu.pk/forms/admission-inter',
    popular: true
  },
  {
    id: 'dl-3',
    title: 'Inter-Board NOC / Migration Certificate Application Form',
    category: 'Migration & NOC',
    fileType: 'PDF',
    fileSize: '450 KB',
    description: 'Required for migrating from BISE Sargodha to other boards (BISE Lahore, Rawalpindi, Faisalabad, FBISE Islamabad, etc.).',
    officialUrl: 'https://bisesargodha.edu.pk/downloads/noc-migration-form.pdf',
    popular: true
  },
  {
    id: 'dl-4',
    title: 'Sanad / Certificate & DMC Verification Form (IBCC & Jobs)',
    category: 'Correction & Duplicate',
    fileType: 'PDF',
    fileSize: '520 KB',
    description: 'Official form for Matric / Inter degree verification for IBCC attestation, PPSC, Army, Rescue 1122, and foreign embassies.',
    officialUrl: 'https://bisesargodha.edu.pk/downloads/verification-form.pdf',
    popular: true
  },
  {
    id: 'dl-5',
    title: 'Duplicate Sanad / Certificate & Duplicate DMC Form',
    category: 'Correction & Duplicate',
    fileType: 'PDF',
    fileSize: '380 KB',
    description: 'Application for lost or damaged Original Certificate (Sanad) or Detailed Marks Certificate (DMC).',
    officialUrl: 'https://bisesargodha.edu.pk/downloads/duplicate-sanad-form.pdf'
  },
  {
    id: 'dl-6',
    title: 'Name, Father Name & Date of Birth Correction Form',
    category: 'Correction & Duplicate',
    fileType: 'PDF',
    fileSize: '610 KB',
    description: 'Official procedure and form for rectifying spelling mistakes or date of birth discrepancies as per school record / NADRA.',
    officialUrl: 'https://bisesargodha.edu.pk/downloads/correction-form.pdf'
  },
  {
    id: 'dl-7',
    title: 'Paper Rechecking Application Form & Instructions',
    category: 'Rechecking',
    fileType: 'PDF',
    fileSize: '340 KB',
    description: 'Application form for paper recount, un-marked question review, and re-addition of answer book marks.',
    officialUrl: 'https://bisesargodha.edu.pk/downloads/rechecking-form.pdf'
  },
  {
    id: 'dl-8',
    title: 'Matric & Inter Model Papers, Pairing Scheme & SLOs 2026',
    category: 'Model Papers & Syllabus',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    description: 'Updated SLO-based model papers, pairing schemes, and blueprint question patterns for 9th, 10th, 11th, and 12th classes.',
    officialUrl: 'https://bisesargodha.edu.pk/downloads/model-papers-2026.pdf',
    popular: true
  },
  {
    id: 'dl-9',
    title: 'Bank Challan Form (General Purpose / Fees / Duplicate / NOC)',
    category: 'Admissions',
    fileType: 'PDF',
    fileSize: '220 KB',
    description: 'Official 4-copy bank challan format for cash deposit at Habib Bank Limited (HBL) or Muslim Commercial Bank (MCB).',
    officialUrl: 'https://bisesargodha.edu.pk/downloads/bank-challan.pdf'
  }
];

export const BISE_VERIFICATION_SERVICES: BiseVerificationService[] = [
  {
    id: 'ver-ibcc',
    serviceName: 'Degree / Sanad Verification for IBCC Attestation',
    purpose: 'Required for students going abroad, foreign universities, or HEC equivalence who need Inter Board Coordination Commission (IBCC) attestation.',
    normalFee: 2500,
    urgentFee: 4000,
    processingDaysNormal: '7 to 10 Working Days',
    processingDaysUrgent: '2 to 3 Working Days (Same Day / Counter)',
    requiredDocs: [
      'Original Certificate (Sanad) / DMC + 2 Photocopies',
      'Candidate CNIC / Smart Card / B-Form copy',
      'Father CNIC copy',
      '2 Passport size photographs with sky-blue background',
      'Original Paid Bank Challan (HBL/MCB BISE Sargodha Account)',
      'IBCC Verification Application Performa'
    ],
    procedureSteps: [
      'Generate online verification challan from bisesargodha.edu.pk.',
      'Deposit fee in designated HBL/MCB branch or through 1Link 1Bill PSID.',
      'Fill the verification form and attach all required attested document photocopies.',
      'Submit at BISE Sargodha One-Window Facilitation Center (or send via registered Pakistan Post / TCS).',
      'Board verifies against record, seals in official IBCC confidential envelope, and hands over to applicant or dispatches to IBCC.'
    ]
  },
  {
    id: 'ver-dept-jobs',
    serviceName: 'Verification for Govt Jobs (PPSC, Police, Army, Rescue 1122, FPSC)',
    purpose: 'Official verification requested by recruiting departments (Punjab Police, Pak Army, PPSC, School Education Dept, Rescue 1122) for appointment confirmation.',
    normalFee: 1500,
    urgentFee: 2500,
    processingDaysNormal: '5 to 7 Working Days',
    processingDaysUrgent: '1 to 2 Working Days',
    requiredDocs: [
      'Letter from Employer / Department or Direct Student Request',
      'Photocopies of Matric / Inter Sanad & Result Card',
      'Candidate CNIC & 2 Photographs',
      'Paid Bank Challan'
    ],
    procedureSteps: [
      'If departmental letter provided, attach copy of official requisition letter.',
      'Pay the verification fee via bank challan.',
      'Submit at One-Window counter.',
      'Verification letter signed by Controller of Examinations will be dispatched directly to the employer department or handed over sealed.'
    ]
  },
  {
    id: 'ver-duplicate-sanad',
    serviceName: 'Issuance of Duplicate Certificate (Lost / Damaged Sanad)',
    purpose: 'For candidates whose original Matric or Intermediate certificate has been lost, stolen, burned, or damaged.',
    normalFee: 4000,
    urgentFee: 6500,
    processingDaysNormal: '15 to 20 Working Days',
    processingDaysUrgent: '5 to 7 Working Days',
    requiredDocs: [
      'Daily Diary / Police Report (Roznamcha) regarding lost certificate',
      'Newspaper advertisement in two daily newspapers (1 Urdu, 1 English)',
      'Affidavit on PKR 100 E-Stamp Paper duly attested by Oath Commissioner',
      'Attested copies of DMC/Result Card, CNIC, and 3 Photographs',
      'Paid Bank Challan'
    ],
    procedureSteps: [
      'Publish notice in certified daily newspaper regarding lost certificate with roll number, year, and session.',
      'Get police report from local police station.',
      'Prepare judicial affidavit stating duplicate sanad request.',
      'Submit completed file at BISE Sargodha branch. Committee reviews and issues Duplicate Sanad with official watermark.'
    ]
  },
  {
    id: 'ver-noc-migration',
    serviceName: 'Inter-Board NOC / Migration Certificate',
    purpose: 'For students shifting from BISE Sargodha to another educational board in Pakistan (e.g. Lahore, Rawalpindi, Federal Board, Sindh, KPK).',
    normalFee: 1800,
    urgentFee: 3000,
    processingDaysNormal: '3 to 5 Working Days',
    processingDaysUrgent: 'Same Day / 24 Hours',
    requiredDocs: [
      'Original Result Card / DMC / Registration Card',
      'CNIC / B-Form copy',
      'Paid Bank Challan'
    ],
    procedureSteps: [
      'Apply online or fill physical NOC application form.',
      'Pay fee through bank challan.',
      'Submit at counter to receive stamped Migration Certificate.'
    ]
  }
];

export const BISE_SAMPLE_RESULTS: BiseResultSample[] = [
  {
    rollNumber: '512044',
    studentName: 'Muhammad Hamza Malik',
    fatherName: 'Malik Tariq Mehmood',
    examType: 'Matric Annual',
    year: '2026',
    group: 'Science (Biology)',
    registrationNo: '22-B-SGD-94812',
    schoolCollege: 'Govt Comprehensive Higher Secondary School Sargodha',
    district: 'Sargodha',
    totalMarks: 1100,
    obtainedMarks: 1042,
    grade: 'A+',
    status: 'PASS',
    subjects: [
      { name: 'English (Compulsory)', total: 150, obtained: 142, status: 'Pass' },
      { name: 'Urdu (Compulsory)', total: 150, obtained: 139, status: 'Pass' },
      { name: 'Islamiyat (Compulsory)', total: 100, obtained: 96, status: 'Pass' },
      { name: 'Pak Studies', total: 100, obtained: 94, status: 'Pass' },
      { name: 'Mathematics (Science)', total: 150, obtained: 148, status: 'Pass' },
      { name: 'Physics (Th + Pr)', total: 150, obtained: 143, status: 'Pass' },
      { name: 'Chemistry (Th + Pr)', total: 150, obtained: 141, status: 'Pass' },
      { name: 'Biology (Th + Pr)', total: 150, obtained: 139, status: 'Pass' }
    ]
  },
  {
    rollNumber: '624189',
    studentName: 'Ayesha Fatima',
    fatherName: 'Muhammad Arshad',
    examType: 'Inter Part-II Annual',
    year: '2026',
    group: 'Pre-Medical',
    registrationNo: '24-C-SGD-18492',
    schoolCollege: 'Punjab College of Science for Women, Sargodha',
    district: 'Sargodha',
    totalMarks: 1100,
    obtainedMarks: 1018,
    grade: 'A+',
    status: 'PASS',
    subjects: [
      { name: 'English (Compulsory)', total: 200, obtained: 184, status: 'Pass' },
      { name: 'Urdu (Compulsory)', total: 200, obtained: 179, status: 'Pass' },
      { name: 'Islamic Education / Pak Studies', total: 100, obtained: 95, status: 'Pass' },
      { name: 'Physics (Theory + Practical)', total: 200, obtained: 188, status: 'Pass' },
      { name: 'Chemistry (Theory + Practical)', total: 200, obtained: 183, status: 'Pass' },
      { name: 'Biology (Theory + Practical)', total: 200, obtained: 189, status: 'Pass' }
    ]
  },
  {
    rollNumber: '739502',
    studentName: 'Usman Ali Khan',
    fatherName: 'Liaqat Ali Khan',
    examType: 'Inter Part-II Annual',
    year: '2026',
    group: 'ICS (Physics)',
    registrationNo: '24-P-MIA-05821',
    schoolCollege: 'Govt Post Graduate College Mianwali',
    district: 'Mianwali',
    totalMarks: 1100,
    obtainedMarks: 894,
    grade: 'A',
    status: 'PASS',
    subjects: [
      { name: 'English (Compulsory)', total: 200, obtained: 158, status: 'Pass' },
      { name: 'Urdu (Compulsory)', total: 200, obtained: 161, status: 'Pass' },
      { name: 'Tarjuma-tul-Quran / Pak Studies', total: 100, obtained: 86, status: 'Pass' },
      { name: 'Physics', total: 200, obtained: 162, status: 'Pass' },
      { name: 'Mathematics', total: 200, obtained: 172, status: 'Pass' },
      { name: 'Computer Science', total: 200, obtained: 155, status: 'Pass' }
    ]
  },
  {
    rollNumber: '488310',
    studentName: 'Sana Noreen',
    fatherName: 'Naseer Ahmad',
    examType: 'Matric Annual',
    year: '2026',
    group: 'Humanities / Arts',
    registrationNo: '23-G-KHU-33291',
    schoolCollege: 'Govt Girls High School Jauharabad, Khushab',
    district: 'Khushab',
    totalMarks: 1100,
    obtainedMarks: 765,
    grade: 'B',
    status: 'PASS',
    subjects: [
      { name: 'English (Compulsory)', total: 150, obtained: 98, status: 'Pass' },
      { name: 'Urdu (Compulsory)', total: 150, obtained: 115, status: 'Pass' },
      { name: 'Islamiyat (Compulsory)', total: 100, obtained: 79, status: 'Pass' },
      { name: 'Pak Studies', total: 100, obtained: 74, status: 'Pass' },
      { name: 'General Science', total: 150, obtained: 102, status: 'Pass' },
      { name: 'General Mathematics', total: 150, obtained: 99, status: 'Pass' },
      { name: 'Civics', total: 150, obtained: 101, status: 'Pass' },
      { name: 'Punjabi / Islamic Studies', total: 150, obtained: 97, status: 'Pass' }
    ]
  }
];

export const BISE_FAQS = [
  {
    q: 'How can I check my BISE Sargodha Matric or Intermediate result online?',
    a: 'You can check your result by entering your 6-digit Roll Number in our instant Result Checker tab, or by visiting the official portal at bisesargodha.edu.pk. You can also check via SMS by sending your Roll Number to 800290.'
  },
  {
    q: 'What is the procedure for Degree / Sanad Verification for IBCC or Job appointment?',
    a: 'Generate the verification fee challan from the board website, deposit fee in HBL/MCB, attach original certificate copies, CNIC copy, and passport photos, then submit at the BISE Sargodha One-Window Facilitation counter. The board delivers a sealed envelope for IBCC or dispatches direct to your employer.'
  },
  {
    q: 'Can a private student apply for Matric or Inter Science with practicals?',
    a: 'Under Punjab Board regulations, fresh private students cannot take Pre-Medical or Pre-Engineering groups with lab practicals for the first time. Private students can choose Humanities/Arts, General Science, or Commerce. Students who previously completed regular F.Sc can appear privately for marks improvement.'
  },
  {
    q: 'What should I do if I lost my Original Sanad (Matric / Inter Certificate)?',
    a: 'Publish a classified ad in 2 daily newspapers (1 Urdu, 1 English), get a police Roznamcha report, prepare an affidavit on PKR 100 stamp paper, deposit the duplicate sanad fee (PKR 4,000 normal / PKR 6,500 urgent), and submit the file at the BISE Sargodha facilitation center.'
  },
  {
    q: 'How do I apply for paper rechecking if I am unsatisfied with my marks?',
    a: 'Submit an online rechecking application within 15 days of result announcement on bisesargodha.edu.pk, deposit rechecking fee per paper (PKR 1,500/paper), and visit the Board Office on the assigned date for answer sheet recount.'
  }
];
