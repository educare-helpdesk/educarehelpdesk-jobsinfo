export interface JobItem {
  id: string;
  title: string;
  department: string;
  region: 'Punjab' | 'Federal' | 'AIOU Special' | 'All Pakistan';
  category: 'Punjab (PPSC)' | 'Educators / Teaching' | 'Punjab Police & Rescue' | 'Punjab Health & IT' | 'AIOU Tutor' | 'Federal (FPSC)' | 'General Gov';
  vacancies: string;
  payScale: string;
  qualification: string;
  ageLimit: string;
  lastDate: string;
  isUrgent?: boolean;
  applyUrl: string;
  officialPortal: string;
  description: string;
  criteriaList: string[];
  howToApplySteps: string[];
  requiredDocuments: string[];
}

export interface PunjabGovNotification {
  id: string;
  title: string;
  notificationNumber: string;
  department: string;
  category: 'Recruitment & Age Relaxation' | 'Pay & Allowances' | 'Leaves & Holidays' | 'Teacher Policies & SIS' | 'Student Schemes & Scholarships' | 'Service Regularization' | 'PPSC & Testing Policies' | 'Minority & Disability Quota';
  dateIssued: string;
  summary: string;
  keyDirectives: string[];
  applicableTo: string;
  officialGazetteRef?: string;
  downloadUrl?: string;
  verified: boolean;
  tags: string[];
}

export const PAKISTAN_JOB_UPDATES: JobItem[] = [
  {
    id: 'job-1',
    title: 'PPSC Elementary School Educator (ESE) & Senior Educator (SESE/SSE BS-14 to BS-16)',
    department: 'School Education Department, Government of Punjab',
    region: 'Punjab',
    category: 'Educators / Teaching',
    vacancies: '5,000+ Posts (All 36 Punjab Districts)',
    payScale: 'BS-14 to BS-16 (Regular / Contract with Special Allowance)',
    qualification: 'BA / BSc / BS (4-Year) / Master in Science, Arts, Urdu, English, Math + B.Ed',
    ageLimit: '20 - 35 Years (Male) | 20 - 38 Years (Female) with General Age Relaxation',
    lastDate: 'Active Phase 2026',
    isUrgent: true,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'Punjab Public Service Commission (PPSC)',
    description: 'PPSC and School Education Department Punjab announce mega educator recruitment for Elementary School Educators (ESE - Science / Math / Arts), Senior Elementary School Educators (SESE), and Secondary School Educators (SSE) across all 36 Punjab districts.',
    criteriaList: [
      'Punjab Domicile is strictly mandatory (District quota applicable).',
      'Minimum 2nd Division in BS (4-Year) / Master / Bachelor from HEC recognized university.',
      'Professional Degree: B.Ed / M.Ed is required or candidate must acquire within specified probationary period.',
      'Age relaxation of up to 5 years for Males and 8 years for Females as per Punjab S&GAD notification.',
      'Subject categories: ESE (Science-Math), ESE (Arts), SESE (English, Urdu, Math, Physics, Chemistry, Biology, Arabic), SSE (Bio/Chem, Phy/Math, Computer Science).'
    ],
    howToApplySteps: [
      'Visit official PPSC Portal (ppsc.gop.pk) and click on "Apply Online".',
      'Select your district educator advertisement post (e.g. ESE Science Sargodha / Lahore / Rawalpindi).',
      'Generate 1Link PSID fee voucher of PKR 600 and pay via EasyPaisa, JazzCash, ATM, or Online Banking.',
      'Upload recent passport size photograph (under 25KB) and CNIC front scan.',
      'Enter Matric, Intermediate, Graduation, and B.Ed academic marks, marks obtained, and division.',
      'Submit form before deadline and download the finalized PPSC Application Summary Slip.'
    ],
    requiredDocuments: [
      'Punjab Domicile Certificate of applicant district',
      'Computerized National Identity Card (CNIC)',
      'Matric, Intermediate, Graduation/Master DMCs & Degrees',
      'B.Ed / Teaching Degree Certificate (if completed)',
      'PPSC 1Link Fee Payment Receipt'
    ]
  },
  {
    id: 'job-plra',
    title: 'Punjab Land Record Authority (PLRA) - Service Center Official (SCO BS-14) & ADLR (BS-17)',
    department: 'Punjab Land Record Authority (PLRA), Board of Revenue Punjab',
    region: 'Punjab',
    category: 'Punjab (PPSC)',
    vacancies: '850+ Posts (All Arazi Record Centers across Punjab)',
    payScale: 'BS-14 / BS-17 (Regular with PLRA Executive Allowance)',
    qualification: 'BCS / BS(IT) / BS(SE) / B.Com / MBA / MCS / 14-16 Years Education with Computer Typing',
    ageLimit: '18 - 35 Years (Male) | 18 - 38 Years (Female)',
    lastDate: 'Active PPSC / PLRA Batch 2026',
    isUrgent: true,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'Punjab Public Service Commission / PLRA Portal',
    description: 'Mega induction of Service Center Officials (SCO BS-14) and Assistant Director Land Records (ADLR BS-17) at Tehsil Arazi Record Centers (ARC), Qanoongoi Centers, and Dehi Marakiz-e-Maal (DMM) across all 36 Punjab districts.',
    criteriaList: [
      'Punjab Domicile of respective district/tehsil is required.',
      'For SCO (BS-14): Minimum 2nd Division in BCS/BS-IT/B.Com/Graduation + minimum 30 WPM English computer typing speed.',
      'For ADLR (BS-17): Master / BS (16 Years) with 100-mark General Knowledge & Land Revenue System screening test.',
      'Hands-on proficiency in computerized data entry, record searching, and public counter services.'
    ],
    howToApplySteps: [
      'Log on to ppsc.gop.pk and select "Service Center Official (SCO) PLRA" under your district.',
      'Pay PKR 600 fee via 1Link PSID through mobile banking apps or ATM.',
      'Enter educational credentials, degrees, and typing certifications.',
      'Appear in the Phase-I written MCQ screening test and Phase-II English typing speed test.'
    ],
    requiredDocuments: [
      'District Domicile Certificate',
      'Original CNIC and 2 Passport Photographs',
      'Matric, Intermediate, Graduation/BS Degree & Transcripts',
      'PPSC Paid Challan Slip'
    ]
  },
  {
    id: 'job-fia',
    title: 'Federal Investigation Agency (FIA) - Assistant Director (BS-17), Inspector (BS-16) & Sub-Inspector (BS-14)',
    department: 'Federal Investigation Agency (FIA), Ministry of Interior, Islamabad',
    region: 'All Pakistan',
    category: 'Federal (FPSC)',
    vacancies: '1,800+ Posts (Punjab, Sindh, KPK, Balochistan & Federal Quotas)',
    payScale: 'BS-09 to BS-17 + 100% FIA Investigation Allowance',
    qualification: 'Graduation / Master / BS (4-Year) in Any Discipline / LLB for Investigation Wings',
    ageLimit: '18 - 33 Years (Includes General 5-Year Federal Age Relaxation)',
    lastDate: 'Active Phase 2026',
    isUrgent: true,
    applyUrl: 'https://fpsc.gov.pk',
    officialPortal: 'Federal Public Service Commission (FPSC) / FIA Careers',
    description: 'Federal government invites applications for officers and investigative staff in FIA Wings: Immigration & Border Management, Cybercrime Wing (CCW), Anti-Corruption, Anti-Human Trafficking, Counter Terrorism, and Corporate Crime across Pakistan.',
    criteriaList: [
      'Open to applicants holding Punjab Domicile as well as all provincial quotas.',
      'Physical Standards (for Uniform Posts): Height 5 ft 6 in (Male), 5 ft 2 in (Female). Chest 32x33.5 in (Male).',
      'Screening Syllabus: 20% English Grammar, 20% General Knowledge/Pakistan Studies, 20% Everyday Science, 20% Basic Math, 20% FIA Act 1974.',
      'For Assistant Director / Inspector: FPSC Written Test followed by Descriptive Examination and Interview.'
    ],
    howToApplySteps: [
      'Visit FPSC website (fpsc.gov.pk) and click on "General Recruitment".',
      'Download Challan form or pay via 1Link PSID (PKR 300 for BS-16/17, PKR 750 for BS-18).',
      'Fill online application form and verify applicant quota (Punjab Open Merit / Women / Minorities).',
      'Track roll number slip schedule on FPSC web portal.'
    ],
    requiredDocuments: [
      'Punjab / Provincial Domicile Certificate',
      'CNIC and Original Educational Certificates',
      '1Link PSID / National Bank Paid Challan Copy'
    ]
  },
  {
    id: 'job-2',
    title: 'PPSC Junior Clerk (BS-11) & Assistant (BS-16) in Punjab S&GAD & Board of Revenue',
    department: 'Services & General Administration Department (S&GAD) / Board of Revenue Punjab',
    region: 'Punjab',
    category: 'Punjab (PPSC)',
    vacancies: '430+ Posts',
    payScale: 'BS-11 & BS-16 (Regular with allowances)',
    qualification: 'Higher Secondary School Certificate (FA/FSc/ICS) for Junior Clerk | Graduate for Assistant',
    ageLimit: '18 - 30 Years (Male) | 18 - 33 Years (Female)',
    lastDate: 'Active PPSC Advertisement 2026',
    isUrgent: true,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'Punjab Public Service Commission (PPSC)',
    description: 'Recruitment of Junior Clerks (BS-11) and Assistants (BS-16) across Punjab Civil Secretariat Lahore, Board of Revenue, Divisional Commissioner Offices, and Deputy Commissioner (DC) Establishments in Punjab.',
    criteriaList: [
      'Punjab Domicile holder.',
      'For Junior Clerk: Higher Secondary School Certificate (2nd Division) + minimum 30 WPM English typing speed on computer.',
      'Proficiency in MS Office (Word, Excel, PowerPoint) and basic inpage Urdu typing is evaluated in Phase-II typing test.',
      'For Assistant (BS-16): Bachelor Degree (2nd Division) with 100-mark General Knowledge & English MCQ test.'
    ],
    howToApplySteps: [
      'Log in to ppsc.gop.pk and select "Junior Clerk (BS-11) S&GAD" or "Assistant (BS-16)".',
      'Pay PKR 600 online challan via 1Link PSID.',
      'Provide typing speed certification or practice verification.',
      'Fill academic details from Matric onwards and submit.',
      'PPSC will issue Roll Number Slip for written MCQ screening test.'
    ],
    requiredDocuments: [
      'Punjab Domicile',
      'CNIC & 2 Passport Photographs',
      'Intermediate / FA / FSc / ICS / BA Degree & Transcripts',
      'Computer / Typing Course Certificate (if applicable)'
    ]
  },
  {
    id: 'job-sbp',
    title: 'State Bank of Pakistan (SBP) - State Bank Officers Training Scheme (SBOTS Batch BS-17)',
    department: 'State Bank of Pakistan (SBP BSC), Central Bank of Pakistan',
    region: 'All Pakistan',
    category: 'General Gov',
    vacancies: '150+ Posts (All Provincial Quotas with Punjab Share)',
    payScale: 'OG-2 Officer (Equivalent BS-17) - Starting Salary PKR 140,000+ / Month + Medical & Perks',
    qualification: 'Master / BS (4-Year / 16 Years) with min 2.5 CGPA or 60% in Economics, Finance, Business, Math, IT, Stats',
    ageLimit: 'Max 26 Years (Relaxation of 3 years for special areas & 5 years for banking staff)',
    lastDate: 'Active Nationwide Batch 2026',
    isUrgent: true,
    applyUrl: 'https://www.sbp.org.pk/careers',
    officialPortal: 'State Bank of Pakistan Careers / NTS Testing Service',
    description: 'Prestigious entry-level central banking career program leading to induction as Assistant Director (OG-2) in State Bank of Pakistan following 6 months residential training at National Institute of Banking & Finance (NIBAF) Islamabad.',
    criteriaList: [
      '16 Years of education in Economics, Finance, Commerce, Business Administration, Mathematics, Statistics, Data Science, or Computer Science.',
      'Minimum 2.5/4.0 CGPA or 60% marks in graduation/master from HEC recognized university.',
      'Written test conducted by NTS covering English Essay & Comprehension, Analytical Reasoning, Quantitative Ability, and General Economic Knowledge.',
      'Selected officers receive stipend during training followed by permanent placement in SBP Karachi/field offices.'
    ],
    howToApplySteps: [
      'Register online on NTS testing agency portal (nts.org.pk) or SBP career portal.',
      'Pay NTS testing fee online via 1Link 1Bill PSID.',
      'Fill detailed educational scores and upload recent photograph.',
      'Download NTS Roll Number Slip and attend written exam at regional centers (Lahore, Rawalpindi, Multan, Faisalabad, Karachi, Islamabad).'
    ],
    requiredDocuments: [
      'CNIC & Domicile Certificate',
      'BS (4-Year) / Master Degree & Official Transcripts with CGPA/Percentage conversion',
      'Recent Passport Size Photograph'
    ]
  },
  {
    id: 'job-wapda',
    title: 'WAPDA & Punjab DISCOs (LESCO, GEPCO, FESCO, MEPCO, IESCO) - Assistant Managers (BS-17) & Staff',
    department: 'Water and Power Development Authority (WAPDA) / Punjab Power Companies',
    region: 'Punjab',
    category: 'General Gov',
    vacancies: '2,400+ Posts (Lahore, Faisalabad, Gujranwala, Multan, Rawalpindi Circles)',
    payScale: 'BS-11 to BS-17 (WAPDA Pay Scales + Free Electricity Units Allowance)',
    qualification: 'B.Sc Electrical / Civil / Mechanical Engineering, MBA / M.Com, B.Com / BA / BSc',
    ageLimit: '18 - 33 Years',
    lastDate: 'Active Phase 2026',
    isUrgent: false,
    applyUrl: 'https://wapda.gov.pk/careers',
    officialPortal: 'WAPDA / Punjab DISCOs Official Career Portals',
    description: 'Direct recruitment across Punjab power distribution companies for Junior Engineers, Assistant Managers (HR & Admin, Accounts, Operations), Revenue Officers, Commercial Assistants, Line Superintendents, and Meter Readers.',
    criteriaList: [
      'For Junior Engineers: B.Sc Engineering with valid PEC (Pakistan Engineering Council) registration.',
      'For Assistant Managers (HR/Accounts): MBA / M.Com / BBA (Hons) / BS Accounting & Finance (2nd Division).',
      'For Commercial Assistants / Clerks: BA / B.Sc / B.Com / FA with computer proficiency.',
      'Written test testing 50% Subject Core + 30% English & Analytical + 20% General Knowledge.'
    ],
    howToApplySteps: [
      'Visit concerned DISCO (e.g. lesco.gov.pk / fesco.com.pk / mepco.com.pk) or testing portal (NTS/PTS).',
      'Generate online challan and submit application form.',
      'Pay test fee via mobile wallets or bank branches.',
      'Check test center and roll number slip on testing agency portal.'
    ],
    requiredDocuments: [
      'Domicile Certificate of concerned circle/district',
      'PEC Registration Certificate (for Engineers)',
      'Academic Degrees & Transcripts',
      'Paid Deposit Slip'
    ]
  },
  {
    id: 'job-3',
    title: 'PPSC College Lecturers (BS-17) in Punjab Higher Education Department (HED)',
    department: 'Higher Education Department (HED), Government of Punjab',
    region: 'Punjab',
    category: 'Punjab (PPSC)',
    vacancies: '1,450+ Posts (Male, Female & Minority Quotas)',
    payScale: 'BS-17 Regular / Cadre Pay + Allowances',
    qualification: 'Master Degree / BS 4-Year (at least 2nd Division) in relevant subject',
    ageLimit: '21 - 33 Years (Male) | 21 - 36 Years (Female)',
    lastDate: 'Active PPSC Schedule 2026',
    isUrgent: false,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'Punjab Public Service Commission (PPSC)',
    description: 'Prestigious recruitment of College Lecturers (BS-17) across Punjab Government Graduate and Associate Colleges in English, Urdu, Physics, Chemistry, Mathematics, Biology, Computer Science, Economics, History, Pak Studies, Commerce, and Islamiyat.',
    criteriaList: [
      'Master Degree or BS 4-Year (16 Years of Education) in relevant subject from HEC recognized university.',
      'Written Test Structure: 80% Subject-specific MCQs + 20% General Knowledge / Pakistan Affairs.',
      'Negative marking: 0.25 marks deducted per wrong answer.',
      'Merit formula: Academic marks (40) + Written test score (50 converted) + Interview performance (100).'
    ],
    howToApplySteps: [
      'Check subject vacancy distribution on ppsc.gop.pk.',
      'Apply online with Punjab Domicile and valid CNIC.',
      'Pay PKR 600 fee via 1Link PSID.',
      'Download PPSC Syllabus guidelines for your subject from the portal.',
      'Prepare past papers and reference books.'
    ],
    requiredDocuments: [
      'Punjab Domicile Certificate',
      'CNIC and Original Degrees (Matric, Inter, BS/Master)',
      'HEC Degree Equivalence (if degree title is non-standard)'
    ]
  },
  {
    id: 'job-food',
    title: 'Punjab Food Authority (PFA) & Food Department - Food Safety Officer (BS-17) & Inspectors',
    department: 'Punjab Food Authority (PFA) / Food Department, Government of Punjab',
    region: 'Punjab',
    category: 'Punjab (PPSC)',
    vacancies: '520+ Posts (All Punjab Divisions & Districts)',
    payScale: 'BS-09 to BS-17 (Regular)',
    qualification: 'B.Sc (Hons) Food Science / Microbiology / Biochemistry / Graduation for Inspectors',
    ageLimit: '18 - 35 Years (Male) | 18 - 38 Years (Female)',
    lastDate: 'Active PPSC Batch 2026',
    isUrgent: false,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'Punjab Public Service Commission / PFA Portal',
    description: 'PPSC announces vacancies for Food Safety Officers (FSO BS-17), Assistant Food Controllers (AFC BS-15), Food Grain Supervisors, and Inspectors for food quality enforcement, dairy/restaurant inspections, and grain storage across Punjab.',
    criteriaList: [
      'For FSO (BS-17): B.Sc (Hons) in Food Science & Technology, Food Safety & Quality Management, Microbiology, or Dairy Technology.',
      'For Food Inspector / Supervisor (BS-09/BS-11): Intermediate (F.Sc/FA) or Bachelor Degree.',
      'Punjab Domicile is compulsory.',
      '100-mark single paper MCQ test on Punjab Pure Food Regulations, Food Microbiology, and General Knowledge.'
    ],
    howToApplySteps: [
      'Apply online via PPSC portal (ppsc.gop.pk).',
      'Pay PKR 600 fee via 1Link PSID.',
      'Submit academic transcripts and division.',
      'Download application confirmation slip.'
    ],
    requiredDocuments: [
      'Punjab Domicile & CNIC',
      'B.Sc (Hons) / Graduation Degree & Transcripts',
      'PPSC Paid Challan Slip'
    ]
  },
  {
    id: 'job-4',
    title: 'Punjab Police Sub-Inspector (SI BS-14), ASI & Constable Recruitment',
    department: 'Punjab Police Department, Government of Punjab',
    region: 'Punjab',
    category: 'Punjab Police & Rescue',
    vacancies: '3,200+ Posts (District Police, Traffic & PHP)',
    payScale: 'BS-07 (Constable) | BS-11 (ASI) | BS-14 (Sub-Inspector)',
    qualification: 'Matric for Constable | FA/FSc for ASI | Graduation (BA/BSc/BS) for Sub-Inspector',
    ageLimit: '18 - 25 Years (Constable) | 20 - 28 Years (SI Open Merit)',
    lastDate: 'Active Batch 2026',
    isUrgent: true,
    applyUrl: 'https://punjabpolice.gov.pk',
    officialPortal: 'Punjab Police / PPSC Police Cadre',
    description: 'Recruitment for Sub-Inspectors (BS-14 Open Merit & Service Quota), Assistant Sub-Inspectors, Traffic Wardens, and Constables across all Punjab Police Ranges (Lahore, Rawalpindi, Faisalabad, Sargodha, Gujranwala, Multan, Bahawalpur, DG Khan, Sahiwal).',
    criteriaList: [
      'Physical Standards: Height 5 ft 7 in (Male), 5 ft 2 in (Female). Chest 33x34.5 in (Male only).',
      'Endurance Test: 1.6 Kilometer running in 7 minutes (Male) / 10 minutes (Female).',
      'Sub-Inspector posts are filled via PPSC written examination (General Knowledge, English, and Basic Computer & MS Office).',
      'Candidate must be a permanent resident and domicile holder of the concerned Punjab district.'
    ],
    howToApplySteps: [
      'For Constables: Submit physical application form at your District Police Lines along with PKR 500 fee.',
      'For Sub-Inspector (BS-14): Apply online via PPSC (ppsc.gop.pk).',
      'Clear the physical measurement, endurance race, and document verification.',
      'Appear in the written exam and medical board clearance.'
    ],
    requiredDocuments: [
      'District Domicile Certificate & 8 Passport size photos',
      'Original CNIC / NADRA Smart Card',
      'Academic Certificates and Character Verification from Police Station'
    ]
  },
  {
    id: 'job-agri',
    title: 'Punjab Agriculture & Livestock Department - Agriculture Officer (BS-17) & Veterinary Officers',
    department: 'Agriculture Department & Livestock & Dairy Development, Punjab',
    region: 'Punjab',
    category: 'Punjab (PPSC)',
    vacancies: '640+ Posts (Extension Wing, Research Wing & Field Hospitals)',
    payScale: 'BS-17 (Regular / Cadre Pay)',
    qualification: 'B.Sc (Hons) Agriculture in Agronomy/PBG/Entomology/Horticulture | DVM + PVMC Registration',
    ageLimit: '21 - 35 Years (Male) | 21 - 38 Years (Female)',
    lastDate: 'Active PPSC Batch 2026',
    isUrgent: false,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'Punjab Public Service Commission (PPSC)',
    description: 'Recruitment of Agriculture Extension Officers, Water Management Officers, and Veterinary Officers across all 36 Punjab districts under CM Punjab Kissan & Livestock Support Initiatives.',
    criteriaList: [
      'For Agri Officer: B.Sc (Hons) Agriculture (4-Year) in relevant discipline from HEC recognized university.',
      'For Veterinary Officer: DVM (Doctor of Veterinary Medicine) with valid PVMC (Pakistan Veterinary Medical Council) registration.',
      'Punjab Domicile holder.',
      'Written test syllabus: 80% Professional subject core + 20% General Knowledge & Pakistan Affairs.'
    ],
    howToApplySteps: [
      'Visit ppsc.gop.pk and select "Agriculture Officer" or "Veterinary Officer".',
      'Pay PKR 600 fee via 1Link PSID.',
      'Provide PVMC registration details for DVM applicants.',
      'Submit application and download summary receipt.'
    ],
    requiredDocuments: [
      'Punjab Domicile & CNIC',
      'B.Sc (Hons) Agri / DVM Degree & Transcripts',
      'PVMC Registration Card (for Veterinary posts)'
    ]
  },
  {
    id: 'job-nadra',
    title: 'NADRA - Junior Executive, Data Entry Operator (DEO) & Mobile Registration Supervisor',
    department: 'National Database and Registration Authority (NADRA Regional Headquarters)',
    region: 'All Pakistan',
    category: 'Punjab Health & IT',
    vacancies: '750+ Positions (Lahore, Sargodha, Multan, Rawalpindi, Islamabad Centers)',
    payScale: 'Fixed Package PKR 45,000 - 80,000 / Month + Allowances',
    qualification: 'Intermediate (FA / FSc / ICS / I.Com) or Graduation (BA / BSc / B.Com / BS) + 30 WPM Typing Speed',
    ageLimit: '18 - 30 Years',
    lastDate: 'Rolling Walk-in & Online Batches 2026',
    isUrgent: true,
    applyUrl: 'https://careers.nadra.gov.pk',
    officialPortal: 'NADRA Official Careers Portal',
    description: 'Walk-in test and interview schedules across Punjab and federal centers for NRC counters, Smart Card registration, family tree verification, and Mobile Registration Units (MRUs).',
    criteriaList: [
      'Minimum Intermediate or Graduate with 2nd division.',
      'Computer proficiency in typing (minimum 30 WPM) and MS Office.',
      'Applicant must possess domicile of the concerned district / tehsil where vacancy exists.',
      'Walk-in test includes computer typing test, basic English, and general IQ test.'
    ],
    howToApplySteps: [
      'Visit careers.nadra.gov.pk to check district-wise walk-in schedule dates and locations.',
      'Bring original documents and attested copies directly to the test venue.',
      'Pass the computerized typing and screening test on the spot.',
      'Shortlisted candidates are interviewed on the same or designated day.'
    ],
    requiredDocuments: [
      'Original CNIC and Domicile',
      'Original Educational Certificates and Degrees',
      'Updated CV / Resume and 2 Passport Size Photos'
    ]
  },
  {
    id: 'job-5',
    title: 'Punjab Health Department Charge Nurse (BS-16) & Medical Officer (BS-17)',
    department: 'Primary & Secondary Healthcare / Specialized Healthcare Department Punjab',
    region: 'Punjab',
    category: 'Punjab Health & IT',
    vacancies: '1,200+ Posts',
    payScale: 'BS-16 (Charge Nurse) | BS-17 (Medical Officer / Women MO)',
    qualification: 'B.Sc Nursing Generic / Post RN + PNC Registration | MBBS + PMDC Registration',
    ageLimit: '21 - 35 Years (Females & Males as per rules)',
    lastDate: 'Active PPSC / P&SHD Ad',
    isUrgent: true,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'PPSC Health Portal & P&SHD Punjab',
    description: 'Induction of Charge Nurses (BS-16) and Medical Officers / Women Medical Officers (BS-17) in District Headquarter (DHQ), Tehsil Headquarter (THQ) hospitals, Rural Health Centers (RHC), and Basic Health Units (BHU) across Punjab.',
    criteriaList: [
      'Valid registration with Pakistan Nursing Council (PNC) or Pakistan Medical & Dental Council (PMDC).',
      'Punjab Domicile is compulsory.',
      'House job completion certificate for Medical Officers from recognized teaching hospitals.',
      'PPSC written test: 80% Nursing / Medical syllabus + 20% General Knowledge.'
    ],
    howToApplySteps: [
      'Verify valid PNC/PMDC registration card validity before applying.',
      'Apply online on PPSC portal and generate 1Link PSID of PKR 600.',
      'Fill clinical experience and academic marks percentages.',
      'Submit application and track roll number slip issuance.'
    ],
    requiredDocuments: [
      'Valid PNC or PMDC Registration Card',
      'MBBS / B.Sc Nursing Degree & Complete Transcripts',
      'One Year House Job Certificate',
      'Punjab Domicile & CNIC'
    ]
  },
  {
    id: 'job-irrigation',
    title: 'Punjab Irrigation Department - Sub-Engineer Civil (BS-14) & SDO (BS-17)',
    department: 'Irrigation Department, Government of Punjab',
    region: 'Punjab',
    category: 'Punjab (PPSC)',
    vacancies: '380+ Posts (Canal Irrigation Circles, Barrages & Small Dams)',
    payScale: 'BS-14 & BS-17 (Regular)',
    qualification: 'DAE (Civil 3-Year) for Sub-Engineer | B.Sc Civil Engineering + PEC Registration for SDO',
    ageLimit: '18 - 35 Years (Male) | 18 - 38 Years (Female)',
    lastDate: 'Active Schedule 2026',
    isUrgent: false,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'Punjab Public Service Commission (PPSC)',
    description: 'PPSC recruitment for Sub-Engineers (Civil) and Sub-Divisional Officers (SDO) in Sargodha, Lahore, Faisalabad, Multan, Bahawalpur, and DG Khan Canal Drainage & Barrage Zones.',
    criteriaList: [
      'For Sub-Engineer: 3-Year Diploma of Associate Engineer (DAE) in Civil Technology from PBTE.',
      'For SDO: B.Sc Civil Engineering with valid PEC registration.',
      'Punjab Domicile.',
      'PPSC written test: 80% Civil Engineering / Hydraulics + 20% General Knowledge.'
    ],
    howToApplySteps: [
      'Apply online via PPSC (ppsc.gop.pk).',
      'Pay PKR 600 fee via 1Link PSID.',
      'Submit DAE/PEC credentials and division.',
      'Attend the PPSC single-paper written test.'
    ],
    requiredDocuments: [
      'Punjab Domicile & CNIC',
      'DAE / B.Sc Engineering Degree & Transcripts',
      'PEC Registration (for SDO candidates)'
    ]
  },
  {
    id: 'job-railways',
    title: 'Pakistan Railways - Commercial Staff (BS-11 to BS-16), Station Master (BS-14) & Sub-Engineers',
    department: 'Ministry of Railways, Government of Pakistan, Lahore Headquarters',
    region: 'All Pakistan',
    category: 'General Gov',
    vacancies: '1,350+ Posts (Lahore, Rawalpindi, Multan, Faisalabad Divisions)',
    payScale: 'BS-07 to BS-16 (Permanent Railway Scales + Running Allowances)',
    qualification: 'Matric / Intermediate for Guards & Clerks | Graduation for Station Master & Commercial Group',
    ageLimit: '18 - 33 Years',
    lastDate: 'Active Phase 2026',
    isUrgent: false,
    applyUrl: 'https://pakrail.gov.pk',
    officialPortal: 'Pakistan Railways Official Portal / Testing Service',
    description: 'Major operational and commercial staff recruitment across Pakistan Railways network for passenger facilitation, train operations, safety signaling, and computerized reservation counters.',
    criteriaList: [
      'Division-wise quotas for Lahore, Rawalpindi, Multan, and Federal Circles.',
      'For Station Master / Commercial Assistant: Bachelor Degree (2nd Division).',
      'Medical fitness: Category A-1 visual acuity without color blindness for operational staff.',
      'Written test on English, General Knowledge, Basic Mathematics, and Railway Operations basics.'
    ],
    howToApplySteps: [
      'Visit pakrail.gov.pk/careers or assigned testing agency portal.',
      'Generate online deposit slip and pay application fee.',
      'Submit online application and select your nearest test center.',
      'Download roll number slip for written and physical/medical test.'
    ],
    requiredDocuments: [
      'Domicile Certificate & CNIC',
      'Matric / Intermediate / Graduation Degrees',
      'Paid Bank Deposit Slip'
    ]
  },
  {
    id: 'job-nab',
    title: 'National Accountability Bureau (NAB) - Assistant Director (BS-17) & Junior Investigation Officer',
    department: 'National Accountability Bureau (NAB Headquarters Islamabad & Regional Bureaus Lahore, Multan, Rawalpindi)',
    region: 'Federal',
    category: 'Federal (FPSC)',
    vacancies: '220+ Posts',
    payScale: 'BS-14 to BS-17 + NAB Special Allowance',
    qualification: 'Master / BS 4-Year in Law (LLB), Forensic Science, Criminology, Accounting/Finance, Computer Science',
    ageLimit: '20 - 33 Years',
    lastDate: 'Active Phase 2026',
    isUrgent: false,
    applyUrl: 'https://nab.gov.pk/careers',
    officialPortal: 'NAB Careers / Federal Recruitment Portal',
    description: 'Federal recruitment for NAB investigation officers, forensic digital investigators, and intelligence operators for financial crime, anti-corruption investigations, and asset recovery.',
    criteriaList: [
      'Bachelor / Master (16 Years) in Law, Forensic Sciences, Finance, Banking, or Computer Science.',
      'Physical fitness standards and psychological vetting.',
      'Written test covering National Accountability Ordinance 1999, Anti-Money Laundering Laws, English Essay, and Analytical Reasoning.',
      'All Pakistan merit with provincial quotas.'
    ],
    howToApplySteps: [
      'Apply online via NAB portal (nab.gov.pk).',
      'Print online application form and dispatch with required documents to designated regional bureau.',
      'Pay fee through bank draft / online collection mode.',
      'Appear in written test, physical test, and psychological evaluation.'
    ],
    requiredDocuments: [
      'Attested copies of CNIC & Domicile',
      'Educational Degrees and Experience Certificates',
      '3 Passport Size Photographs'
    ]
  },
  {
    id: 'job-6',
    title: 'PITB (Punjab IT Board) Software Engineers, e-Rozgaar Trainers & Data Operators',
    department: 'Punjab Information Technology Board (PITB), Government of Punjab',
    region: 'Punjab',
    category: 'Punjab Health & IT',
    vacancies: '350+ Positions (Lahore, Arfa Tower & Regional Centers)',
    payScale: 'PKR 60,000 - 250,000 / Month (Market Competitive IT Scale)',
    qualification: 'BS (CS / SE / IT) / MCS / DAE / Graduation with IT Skills',
    ageLimit: '20 - 45 Years',
    lastDate: 'Rolling Batches 2026',
    isUrgent: false,
    applyUrl: 'https://jobs.punjab.gov.pk',
    officialPortal: 'Punjab Job Center Portal (jobs.punjab.gov.pk)',
    description: 'PITB invites applications for cutting-edge digital governance projects: Mobile App Developers, Full Stack Engineers, UI/UX Designers, e-Rozgaar Technical/Non-Technical Trainers, and Data Entry Executives.',
    criteriaList: [
      'BS in Computer Science, Software Engineering, or equivalent IT degree.',
      'Hands-on experience in React, Node.js, Python, Flutter, or Cloud Infrastructure.',
      'For e-Rozgaar Trainers: Proven freelancing profile (Upwork/Fiverr) with minimum $3,000+ earnings history.',
      'Positions are contract-based with attractive market-based remuneration packages.'
    ],
    howToApplySteps: [
      'Register on the official Punjab Job Center (jobs.punjab.gov.pk).',
      'Complete your detailed resume profile and link your portfolio/GitHub/Upwork.',
      'Search for "Punjab Information Technology Board" vacancies.',
      'Click "Apply Now" without any application fee.'
    ],
    requiredDocuments: [
      'Updated Professional Resume / CV',
      'CNIC & Degree Transcripts',
      'Portfolio links & Certifications'
    ]
  },
  {
    id: 'job-7',
    title: 'AIOU Part-Time Tutor & Online Workshop Resource Person (Spring & Autumn)',
    department: 'Allama Iqbal Open University (AIOU), Regional Services Division',
    region: 'AIOU Special',
    category: 'AIOU Tutor',
    vacancies: '5,000+ Tutors (All Districts of Punjab & Pakistan)',
    payScale: 'PKR 25,000 - 90,000 / Semester (Remuneration based on students & workshops)',
    qualification: 'Master / BS 4-Year / M.Phil / Ph.D. in relevant subject',
    ageLimit: '25 - 60 Years (Government & Private Educators eligible)',
    lastDate: 'Active Academic Batch 2026',
    isUrgent: true,
    applyUrl: 'https://tutor.aiou.edu.pk',
    officialPortal: 'AIOU Aaghi Tutor Portal',
    description: 'AIOU invites subject specialists, school teachers, college professors, and post-graduates across Punjab to register as Part-Time Tutors and AAGHI LMS Online Workshop Resource Persons for Matric, FA, BA, BS, B.Ed, MPhil, and PhD courses.',
    criteriaList: [
      'Matric/FA: Minimum 2nd Class Master Degree / BS 4-Year in relevant subject.',
      'BA/BS/B.Ed: M.Phil / MS degree preferred with teaching experience.',
      'M.Phil / PhD: Ph.D. degree or senior university faculty members.',
      'Government employees must submit Departmental Permission Certificate (DPC).',
      'Must have basic computer literacy to conduct workshops on Microsoft Teams.'
    ],
    howToApplySteps: [
      'Visit the official AIOU Tutor Portal (tutor.aiou.edu.pk).',
      'Sign up using CNIC and active mobile number.',
      'Enter academic qualifications (Matric to highest degree) and teaching experience.',
      'Generate PKR 1,000 challan and pay via JazzCash, EasyPaisa, or 1Link.',
      'Upload paid challan and attested document scans.',
      'Educare Help Desk (03451291610) provides full assistance for tutor registration!'
    ],
    requiredDocuments: [
      'CNIC Front & Back Scans',
      'Passport Photograph with blue background',
      'Degrees & DMCs from Matric to Terminal Degree',
      'Departmental NOC (for Government servants)',
      'Paid Challan Receipt'
    ]
  },
  {
    id: 'job-aiou-exam',
    title: 'AIOU Exam Superintendents, Invigilators & Center Staff (Semester Terminal Exams)',
    department: 'Examinations Department, Allama Iqbal Open University (AIOU), Islamabad',
    region: 'AIOU Special',
    category: 'AIOU Tutor',
    vacancies: '3,500+ Staff (All Examination Centers across Punjab & Pakistan)',
    payScale: 'PKR 1,500 - 3,500 / Exam Shift (Remuneration based on designation)',
    qualification: 'Bachelor / Master / Teaching Staff / School & College Teachers',
    ageLimit: '21 - 60 Years',
    lastDate: 'Active Semester Schedule 2026',
    isUrgent: false,
    applyUrl: 'https://aiou.edu.pk',
    officialPortal: 'AIOU Regional Services & Exam Directorate',
    description: 'AIOU invites applications from government and recognized private school/college teachers to serve as Center Superintendents, Deputy Superintendents, Resident Inspectors, and Invigilators for Spring and Autumn Semester Final Examinations.',
    criteriaList: [
      'Superintendent: Minimum BS-17 or Senior Headmaster / Subject Specialist.',
      'Deputy Superintendent / Invigilator: Minimum BS-14 to BS-16 Teacher / Graduate.',
      'Clear service record with no disciplinary inquiry under PEEDA Act.',
      'Recommendation by Head of Institute / District Education Officer (DEO).'
    ],
    howToApplySteps: [
      'Contact your local AIOU Regional Center or download the Invigilation Performa from aiou.edu.pk.',
      'Fill service details, school affiliation, and contact number.',
      'Attach NOC from your school principal / Head of Institute.',
      'Submit form to AIOU Regional Director Office before semester exam commencement.'
    ],
    requiredDocuments: [
      'Attested CNIC Copy',
      'Departmental NOC / Verification from School Principal',
      'Service Book Extract / Experience Certificate'
    ]
  },
  {
    id: 'job-8',
    title: 'Punjab Rescue 1122 Emergency Medical Technician (EMT), Driver & Fire Rescuer',
    department: 'Punjab Emergency Service Department (Rescue 1122)',
    region: 'Punjab',
    category: 'Punjab Police & Rescue',
    vacancies: '1,100+ Posts (All 36 Districts of Punjab)',
    payScale: 'BS-11 to BS-14 + Emergency Allowance',
    qualification: 'F.Sc Pre-Medical (EMT) | Matric + HTV License (Driver) | DAE (Fire Rescuer)',
    ageLimit: '20 - 30 Years',
    lastDate: 'Active Phase 2026',
    isUrgent: false,
    applyUrl: 'https://rescue.gov.pk',
    officialPortal: 'Punjab Emergency Service Portal (rescue.gov.pk / PTS)',
    description: 'Rescue 1122 Punjab invites energetic youth for induction as Emergency Medical Technicians, Fire Rescuers, Rescue Drivers, Computer Telephone Operators (CTO), and Station Incharges across Punjab.',
    criteriaList: [
      'EMT: F.Sc Pre-Medical (2nd Division) from recognized board.',
      'Fire Rescuer: DAE (Civil/Electrical/Mechanical) or F.Sc.',
      'Physical Test: 1.6 KM running in 7 minutes, 25 pushups, 25 situps, and height verification (5 ft 6 in for males).',
      '6-Month compulsory specialized emergency training at Emergency Services Academy Lahore upon selection.'
    ],
    howToApplySteps: [
      'Apply online via testing agency portal (pts.org.pk / rescue.gov.pk).',
      'Fill online bio-data and print 1Link bank deposit slip.',
      'Pay fee at designated bank or via mobile banking apps.',
      'Download Roll Number Slip for physical screening test.'
    ],
    requiredDocuments: [
      'Punjab Domicile & CNIC',
      'F.Sc / Matric / DAE Mark Sheet & Certificates',
      'Driving License (for Driver posts)',
      '3 Passport Photographs'
    ]
  },
  {
    id: 'job-prisons',
    title: 'Punjab Prisons Department - Warder (BS-07) & Assistant Superintendent Jail (BS-16)',
    department: 'Punjab Prisons Department, Home Department, Government of Punjab',
    region: 'Punjab',
    category: 'Punjab Police & Rescue',
    vacancies: '1,600+ Posts (Central & District Jails across Punjab)',
    payScale: 'BS-07 (Warder) | BS-16 (Assistant Superintendent Jail - PPSC)',
    qualification: 'Matric for Warder | Graduation (BA/BSc/BS) for Assistant Superintendent Jail',
    ageLimit: '18 - 28 Years',
    lastDate: 'Active Batch 2026',
    isUrgent: false,
    applyUrl: 'https://prisons.punjab.gov.pk',
    officialPortal: 'Punjab Prisons / PPSC Official Portal',
    description: 'Home Department Punjab announces security staff and operational officer induction for Central Jails (Lahore Kot Lakhpat, Faisalabad, Rawalpindi Adiala, Sahiwal, Multan) and District Jails (Sargodha, Gujranwala, Sialkot, Jhang, Kasur).',
    criteriaList: [
      'Physical Standards: Height 5 ft 7 in (Male), 5 ft 2 in (Female). Chest 33x34.5 in.',
      'Running Test: 1.6 KM in 7 minutes.',
      'For Assistant Superintendent Jail: Selection via PPSC written examination (General Knowledge, English, Pakistan Studies) and psychological assessment.',
      'Punjab Domicile mandatory.'
    ],
    howToApplySteps: [
      'For Warders: Submit physical application form at Regional DIG Prisons Office / Central Jail along with PKR 500 fee.',
      'For ASJ (BS-16): Apply online via PPSC (ppsc.gop.pk).',
      'Appear in physical measurement, race, and written screening test.'
    ],
    requiredDocuments: [
      'District Domicile Certificate',
      'CNIC & 6 Passport Sized Photographs',
      'Matric / Graduation Degree & Mark Sheets'
    ]
  },
  {
    id: 'job-9',
    title: 'Punjab Revenue Authority (PRA) Enforcement Officer & Tax Inspector (BS-16)',
    department: 'Punjab Revenue Authority, Finance Department Punjab',
    region: 'Punjab',
    category: 'Punjab (PPSC)',
    vacancies: '180 Posts',
    payScale: 'BS-16 (Regular with PRA Special Allowance)',
    qualification: 'B.Com / BBA / BS Accounting & Finance / Economics / LLB / MBA',
    ageLimit: '21 - 32 Years (Male) | 21 - 35 Years (Female)',
    lastDate: 'Active PPSC Batch 2026',
    isUrgent: false,
    applyUrl: 'https://ppsc.gop.pk',
    officialPortal: 'PPSC Official Portal',
    description: 'PPSC announces recruitment for Enforcement Officers and Tax Inspectors in Punjab Revenue Authority (PRA) for sales tax on services administration across Punjab divisions.',
    criteriaList: [
      'Graduation in Commerce, Finance, Economics, Business Administration, or Law (LLB).',
      'Punjab Domicile.',
      'Written test covering Tax Laws, Accounting Principles, English, and General Knowledge.'
    ],
    howToApplySteps: [
      'Apply online via PPSC (ppsc.gop.pk).',
      'Pay PKR 600 fee via 1Link PSID.',
      'Submit academic credentials and division.',
      'Download application confirmation slip.'
    ],
    requiredDocuments: [
      'Punjab Domicile & CNIC',
      'B.Com / BBA / BS Degree & Transcripts',
      'PPSC Fee Voucher'
    ]
  },
  {
    id: 'job-post',
    title: 'Pakistan Post - Postal Assistant, Sorting Assistant (BS-09) & Postal Inspector (BS-14)',
    department: 'Pakistan Post, Directorate General, Islamabad',
    region: 'All Pakistan',
    category: 'General Gov',
    vacancies: '950+ Posts (Punjab Circles: Central, Northern & Southern Punjab)',
    payScale: 'BS-07 to BS-14 (Federal Regular with GPO Allowances)',
    qualification: 'Matric / Intermediate with typing speed 30 WPM | Graduation for Postal Inspector',
    ageLimit: '18 - 30 Years',
    lastDate: 'Active Schedule 2026',
    isUrgent: false,
    applyUrl: 'https://pakpost.gov.pk',
    officialPortal: 'Pakistan Post Official Portal',
    description: 'Recruitment for digital financial services, EMS international parcels, urgent mail service, and GPO counter automation staff across all General Post Offices (GPOs) and Sub-Post Offices in Punjab and nationwide.',
    criteriaList: [
      'Circle-based merit (Central Punjab, Northern Punjab, Southern Punjab).',
      'Minimum Intermediate with 30 WPM computer typing speed.',
      'Written test on basic English, Mathematics, General Knowledge, and computer literacy.'
    ],
    howToApplySteps: [
      'Visit pakpost.gov.pk and download the prescribed application format or apply online.',
      'Submit deposit fee through Post Office / 1Link.',
      'Attend written test and typing test at regional GPO test centers.'
    ],
    requiredDocuments: [
      'Domicile Certificate & CNIC',
      'Educational Degrees & Transcripts',
      'Paid Post Office Receipt'
    ]
  },
  {
    id: 'job-10',
    title: 'TEVTA Punjab Vocational Instructors, Junior Instructors & Lab Demonstrators',
    department: 'Technical Education & Vocational Training Authority (TEVTA), Punjab',
    region: 'Punjab',
    category: 'Educators / Teaching',
    vacancies: '650+ Posts',
    payScale: 'BS-14 to BS-17 (TEVTA Technical Scale)',
    qualification: 'BS Engineering / DAE (3-Year) / B.Tech / B.Sc in Electrical, Mechanical, Civil, IT',
    ageLimit: '18 - 35 Years',
    lastDate: 'Active Schedule 2026',
    isUrgent: false,
    applyUrl: 'https://tevta.gop.pk',
    officialPortal: 'TEVTA Punjab Career Portal',
    description: 'TEVTA Punjab invites technical professionals and diploma holders to serve as Instructors and Trainers in Government Colleges of Technology (GCT) and Vocational Training Institutes (VTI) across Punjab.',
    criteriaList: [
      'DAE or B.Sc Engineering in relevant technical technology.',
      'Punjab Domicile.',
      'Practical workshop and industrial experience is given additional weightage.'
    ],
    howToApplySteps: [
      'Visit tevta.gop.pk/careers and register candidate profile.',
      'Select technical institute and district.',
      'Upload technical certificates and transcripts.',
      'Submit application online.'
    ],
    requiredDocuments: [
      'DAE / Engineering Degree & PEC / SBTE Registration',
      'Domicile & CNIC Scans',
      'Experience Certificates'
    ]
  },
  {
    id: 'job-11',
    title: 'FPSC Federal Government Secondary School Teachers (SST BS-17) & Inspectors',
    department: 'Federal Public Service Commission (FPSC), Islamabad',
    region: 'Federal',
    category: 'Federal (FPSC)',
    vacancies: '580+ Posts (Islamabad, FGEI & Federal Directorates)',
    payScale: 'BS-16, BS-17 & BS-18',
    qualification: 'Master / BS 4-Year in Science / Humanities + B.Ed for SST posts',
    ageLimit: '22 - 35 Years (General 5 Years Federal Relaxation Applicable)',
    lastDate: 'Monthly FPSC Consolidated Ads',
    isUrgent: false,
    applyUrl: 'https://fpsc.gov.pk',
    officialPortal: 'FPSC Online Portal',
    description: 'Federal Public Service Commission announces permanent vacancies for Secondary School Teachers (SST Male/Female BS-17), Trained Graduate Teachers (TGT BS-16), Inspectors, and Assistant Directors in Federal Government Educational Institutions (FGEI Cantt/Garrison) and Federal Ministries.',
    criteriaList: [
      'Open to applicants holding Punjab Domicile as well as all provincial quotas.',
      'SST: 2nd Class Master / BS (4-Year) + B.Ed degree.',
      'Written test: 20% English + 50% Subject + 30% Professional Pedagogy/Education.'
    ],
    howToApplySteps: [
      'Go to fpsc.gov.pk & click "General Recruitment".',
      'Pay fee via 1Link PSID (BS-16/17: PKR 300).',
      'Fill online application form and track examination schedule.'
    ],
    requiredDocuments: [
      'Domicile Certificate & CNIC',
      'Educational Degrees (Matric to Post-Graduation)',
      '1Link PSID Challan Receipt'
    ]
  }
];

export const PUNJAB_GOV_NOTIFICATIONS: PunjabGovNotification[] = [
  {
    id: 'notif-1',
    title: 'Notification on General Age Relaxation (Up to 5 to 8 Years) for Punjab Govt Recruitments',
    notificationNumber: 'No. SORI(S&GAD)9-36/81',
    department: 'Services & General Administration Department (S&GAD), Government of Punjab',
    category: 'Recruitment & Age Relaxation',
    dateIssued: '2026',
    summary: 'Government of the Punjab has granted blanket general age relaxation across all government departments, PPSC, and autonomous bodies for initial recruitment to civil posts.',
    keyDirectives: [
      'General upper age relaxation of 5 Years is admissible across the board for all Male candidates.',
      'General upper age relaxation of 8 Years is admissible for all Female candidates.',
      'Applicable to all PPSC, Departmental Selection Committees, and contract-to-regular recruitments across Punjab.',
      'Relaxation is calculated on top of the prescribed maximum age limit mentioned in the service rules.'
    ],
    applicableTo: 'All Candidates applying for Punjab Govt, PPSC, Police, Education, and Healthcare posts',
    verified: true,
    tags: ['Age Relaxation', 'S&GAD', 'PPSC Rules', 'Recruitment Policy']
  },
  {
    id: 'notif-2',
    title: 'Notification of Honhaar Undergraduate Scholarship Program & Free Laptops Scheme',
    notificationNumber: 'No. SO(Univ-I)12-4/2026',
    department: 'Higher Education Department (HED), Government of Punjab',
    category: 'Student Schemes & Scholarships',
    dateIssued: '2026',
    summary: 'Chief Minister Punjab initiative providing 100% full tuition fee waivers and stipends for 30,000+ students studying in 68 public sector universities and 131 graduate colleges across Punjab.',
    keyDirectives: [
      '100% Complete Tuition Fee coverage for 4-Year and 5-Year undergraduate degree programs.',
      'Merit eligibility: Top scoring students in intermediate/FSc across all Punjab BISE boards.',
      'Family income ceiling: Monthly household income below PKR 300,000 per month.',
      'Special allocation for STEM, IT, Artificial Intelligence, Medical, Agriculture, and Social Sciences.',
      'Transparent online application verification via Punjab Higher Education Portal.'
    ],
    applicableTo: 'Students enrolled in BS / Undergraduate Programs across all Punjab Public Universities',
    verified: true,
    tags: ['Honhaar Scholarship', 'HED Punjab', 'Free Education', 'CM Punjab Initiative']
  },
  {
    id: 'notif-3',
    title: 'Notification on Regularization of Contract Employees under Punjab Regularization Act',
    notificationNumber: 'No. DS(O&M)5-3/2024(P-I)',
    department: 'Services & General Administration Department (O&M Wing), Government of Punjab',
    category: 'Service Regularization',
    dateIssued: '2026',
    summary: 'Directives issued to all Administrative Secretaries and Divisional Commissioners regarding the scrutiny and regularization of contract employees who have rendered 3 or more years of continuous service.',
    keyDirectives: [
      'Employees recruited on contract basis through transparent selection procedures with 3 years satisfactory service are eligible for permanent regularization.',
      'Departmental Scrutiny Committees (DSC) mandated to finalize cases within 60 days.',
      'Seniority of regularized employees to be determined from the date of initial contract appointment as per Supreme Court & High Court judgments.',
      'Protection of pay, increments, and leave accounts accrued during the contract period.'
    ],
    applicableTo: 'Contract Employees across Punjab School Education, Health, Agriculture, and S&GAD Departments',
    verified: true,
    tags: ['Regularization', 'Contract Act', 'S&GAD Circular', 'Permanent Service']
  },
  {
    id: 'notif-4',
    title: 'Notification on 25% Special Allowance / Disparity Reduction Allowance for Civil Servants',
    notificationNumber: 'No. FD.SR.V.4-1/2026',
    department: 'Finance Department, Government of Punjab',
    category: 'Pay & Allowances',
    dateIssued: '2026',
    summary: 'Sanction of Disparity Reduction and Special Allowance at 25% of basic pay for civil servants from BS-01 to BS-19 who are not drawing any special cadre-specific allowance.',
    keyDirectives: [
      'Granted at the rate of 25% of Basic Pay of the applicable pay scales.',
      'Admissible to all regular and contract government servants serving in Punjab Government offices.',
      'Taxes will be deducted at source as per Income Tax regulations.',
      'Payable on monthly payroll with arrears reconciliation.'
    ],
    applicableTo: 'Punjab Government Employees (BS-01 to BS-19) in Secretariats, Attached Departments & Field Offices',
    verified: true,
    tags: ['25% Allowance', 'Disparity Reduction', 'Finance Dept Punjab', 'Salary Raise']
  },
  {
    id: 'notif-5',
    title: 'Notification on e-Transfer Policy & SIS Portal Guidelines for School Teachers',
    notificationNumber: 'No. SO(SE-IV)2-34/2026',
    department: 'School Education Department, Government of Punjab',
    category: 'Teacher Policies & SIS',
    dateIssued: '2026',
    summary: 'Standard Operating Procedures (SOPs) and timetable for opening e-Transfer rounds on the School Information System (SIS Punjab) application for primary, elementary, and high school teachers.',
    keyDirectives: [
      'All transfer requests (Mutual, Wedlock, Hardship/Disability, Compassionate, Open Merit) must be filed strictly through SIS Punjab mobile app.',
      'Manual transfer applications or political recommendations are strictly banned and liable to disciplinary action under PEEDA Act.',
      'STR (Student-Teacher Ratio) formula of 1:40 strictly applied for vacancy calculation.',
      'Automated merit score generated based on distance, seniority, wedlock score, and teaching tenure.'
    ],
    applicableTo: 'All PSTs, ESTs, SSTs, and Headmasters in Punjab Government Schools',
    verified: true,
    tags: ['e-Transfer', 'SIS Punjab', 'Teacher Posting', 'School Education Dept']
  },
  {
    id: 'notif-6',
    title: 'Notification on Upgradation of Clerical & Ministerial Staff (BS-11 to BS-16)',
    notificationNumber: 'No. FD.PC.40-1/2026',
    department: 'Finance Department, Government of Punjab',
    category: 'Pay & Allowances',
    dateIssued: '2026',
    summary: 'Implementation notification for the financial and cadre upgradation of clerical and ministerial posts across all provincial departments.',
    keyDirectives: [
      'Junior Clerk upgraded from BS-11 to BS-14.',
      'Senior Clerk upgraded from BS-14 to BS-16.',
      'Assistant upgraded from BS-16 to BS-17 with pay protection and premature increment.',
      'Superintendent re-designated and allowed grant of special incentive allowance.'
    ],
    applicableTo: 'All Clerical Staff, Junior Clerks, Senior Clerks & Assistants in Punjab Govt',
    verified: true,
    tags: ['Clerk Upgradation', 'Pay Scale Scale-14', 'Finance Notification', 'Ministerial Staff']
  },
  {
    id: 'notif-quota',
    title: 'Notification on 3% Disability & 5% Minority Quota Strict Implementation in Recruitments',
    notificationNumber: 'No. SORI(S&GAD)6-4/2026',
    department: 'Services & General Administration Department (S&GAD), Government of Punjab',
    category: 'Minority & Disability Quota',
    dateIssued: '2026',
    summary: 'Strict directives issued to PPSC and all Departmental Recruitment Committees to ensure non-lapsing 3% quota for Persons with Disabilities (PWDs) and 5% quota for Non-Muslim Minorities in all recruitments.',
    keyDirectives: [
      '3% Quota strictly reserved for disabled persons possessing valid Disability Certificate issued by Provincial Council for Rehabilitation of Disabled Persons.',
      '5% Quota strictly allocated for non-Muslim minorities across all cadre posts.',
      'Unfilled quota vacancies must not be converted to open merit; they must be carried forward and re-advertised in subsequent recruitment phases.',
      'Disability age relaxation of 10 years admissible for disabled candidates.'
    ],
    applicableTo: 'All Punjab Govt Departments, PPSC, Autonomous Bodies & Attached Formations',
    verified: true,
    tags: ['3% Disability Quota', '5% Minority Quota', 'S&GAD Circular', 'Equal Opportunity']
  },
  {
    id: 'notif-erozgaar',
    title: 'Notification on e-Rozgaar 2.0 & Freelancing Hubs in All 36 Punjab Districts',
    notificationNumber: 'No. PITB(IT-Trg)18-2/2026',
    department: 'Punjab Information Technology Board (PITB) & Youth Affairs Department',
    category: 'Student Schemes & Scholarships',
    dateIssued: '2026',
    summary: 'Free 3-month high-income freelancing and digital skills training program for unemployed graduates and students across 45+ e-Rozgaar centers in Punjab universities and colleges.',
    keyDirectives: [
      '100% Free on-campus and online training in Technical (MERN, Python, WordPress), Creative Design (UI/UX, 3D), and Non-Technical (Content Marketing, SEO, Social Media).',
      'Free high-speed internet co-working spaces provided for registered graduates.',
      'Eligibility: Punjab Domicile, minimum 14 to 16 years education (BA, BSc, B.Com, BS, Master).',
      'Target: 50,000+ youth to achieve financial independence through global freelancing platforms.'
    ],
    applicableTo: 'Unemployed Graduates, AIOU Students & Degree Holders across Punjab',
    verified: true,
    tags: ['e-Rozgaar', 'PITB', 'Freelancing', 'Digital Skills', 'Free Training']
  },
  {
    id: 'notif-7',
    title: 'Notification on School Timings, Summer & Winter Vacations & Smog/Heatwave Protocols',
    notificationNumber: 'No. SO(A-I)1-31/2026',
    department: 'School Education Department, Government of Punjab',
    category: 'Leaves & Holidays',
    dateIssued: 'Seasonal Circular 2026',
    summary: 'Official notification regarding school operating hours, assembly protocols, and vacation calendars for all public and private schools across 36 districts of Punjab.',
    keyDirectives: [
      'Single shift schools operate from 07:45 AM to 01:30 PM (Mon-Thu) and 07:45 AM to 12:00 PM (Friday).',
      'Mandatory availability of clean drinking water and functional ORS packets during high heatwave alerts.',
      'Anti-smog SOPs including ban on outdoor sports and compulsory mask usage during November-December months.',
      'Strict penalty for non-compliant private and public institutions.'
    ],
    applicableTo: 'All Public and Private Schools across all 36 Districts of Punjab',
    verified: true,
    tags: ['School Timings', 'Summer Vacation', 'Smog Protocol', 'Punjab Schools']
  },
  {
    id: 'notif-8',
    title: 'Notification on Revised Maternity, Paternity and Special Medical Leave Rules',
    notificationNumber: 'No. FD.SR-II/2-101/2025',
    department: 'Finance Department, Government of Punjab',
    category: 'Leaves & Holidays',
    dateIssued: '2026',
    summary: 'Revision of Punjab Civil Servants Leave Rules granting enhanced paid leaves for female and male employees.',
    keyDirectives: [
      'Maternity leave allowed for 90 days with full pay and allowances for female civil servants (up to 3 times in service).',
      'Paternity leave sanctioned for 15 consecutive days with full pay for male civil servants upon child birth.',
      'Special Iddat leave of 130 days with full pay for female employees upon bereavement of spouse.',
      'No debit from casual or earned leave account for maternity/paternity leaves.'
    ],
    applicableTo: 'All Civil Servants & Regular/Contract Employees of Punjab Government',
    verified: true,
    tags: ['Maternity Leave', 'Paternity Leave', 'Leave Rules', 'Punjab Civil Servants']
  },
  {
    id: 'notif-9',
    title: 'Notification on PPSC Revised Syllabus, Single Paper MCQ Pattern & 0.25 Negative Marking',
    notificationNumber: 'No. PPSC/Exam-Policy/2026/18',
    department: 'Punjab Public Service Commission (PPSC), Lahore',
    category: 'PPSC & Testing Policies',
    dateIssued: '2026',
    summary: 'PPSC official examination policy notification standardizing the 100-mark single paper MCQ syllabus, qualifying thresholds, and negative marking penalty.',
    keyDirectives: [
      'Written test comprises 100 Multiple Choice Questions (MCQs) of 90 minutes duration.',
      'Each correct answer carries +1.00 mark; each incorrect response attracts -0.25 mark deduction.',
      'Passing criteria: Minimum 40% aggregate marks in written test for shortlisting to interview.',
      'Interview carries 100 marks; minimum 50% passing marks in interview is compulsory.',
      'Use of unfair means or impersonation leads to 5-year disqualification across all PPSC exams.'
    ],
    applicableTo: 'All Candidates appearing in PPSC Written Examinations & Subject Tests',
    verified: true,
    tags: ['PPSC Syllabus', 'Negative Marking', 'Exam Rules', 'Merit Criteria']
  },
  {
    id: 'notif-10',
    title: 'Notification on CM Punjab Roshan Gharana Solar Scheme & E-Bikes for Students',
    notificationNumber: 'No. Energy(Dev)8-19/2026',
    department: 'Energy Department & Transport Department, Government of Punjab',
    category: 'Student Schemes & Scholarships',
    dateIssued: '2026',
    summary: 'Government of Punjab initiative providing subsidized solar systems for domestic electricity consumers (consuming up to 200/500 units) and interest-free E-Bikes for college and university students.',
    keyDirectives: [
      'Complete 1KW & 2KW Solar Kit with inverter, solar panels, and lithium battery under government subsidy.',
      'E-Bikes Scheme: 20,000+ Electric and Petrol Bikes distributed to male and female students on easy interest-free monthly installments of PKR 5,000/month.',
      'Government of Punjab pays 100% markup/interest on bike financing through Bank of Punjab (BOP).',
      'Online registration portal launched via Punjab PITB e-service platform.'
    ],
    applicableTo: 'Punjab Residents, Consumers, and Enrolled College/University Students',
    verified: true,
    tags: ['Solar Scheme', 'E-Bikes', 'CM Punjab', 'Student Relief']
  }
];

