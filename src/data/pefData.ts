export interface PefProgram {
  id: string;
  code: 'FAS' | 'EVS' | 'NSP' | 'QAT' | 'CPD' | 'RLAP' | 'EXPANSION' | 'CAREERS';
  title: string;
  urduTitle?: string;
  category: 'School Subsidy' | 'Voucher Program' | 'New School Setup' | 'Annual Quality Exam' | 'Teacher Training' | 'Accelerated Literacy' | 'Public Private Partnership' | 'Field Jobs';
  beneficiaries: string;
  status: string;
  monthlySubsidyRate?: string;
  summary: string;
  keyFeatures: string[];
  sopAndGuidelines: string[];
  eligibilityOrPassingCriteria: string[];
  officialPortal: string;
  portalUrl: string;
  helpline: string;
  tags: string[];
}

export const PEF_PROGRAMS: PefProgram[] = [
  {
    id: 'pef-fas',
    code: 'FAS',
    title: 'Foundation Assisted Schools (FAS) Program',
    urduTitle: 'فاؤنڈیشن اسسٹڈ اسکولز (ایف اے ایس) پروگرام',
    category: 'School Subsidy',
    beneficiaries: 'Over 1.8 Million+ Students across 3,500+ Partner Private Schools in Punjab',
    status: 'Active Across All 36 Punjab Districts',
    monthlySubsidyRate: 'Primary: PKR 1,000 | Elementary: PKR 1,200 | Secondary (Arts): PKR 1,500 | Secondary (Science): PKR 1,600 per student/month',
    summary: 'The flagship public-private partnership initiative of Punjab Education Foundation (PEF). PEF pays monthly per-child financial subsidies directly to partner private schools so that children receive 100% free, high-standard schooling without charging any tuition or admission fees from parents.',
    keyFeatures: [
      'Zero tuition fee charged to parents; complete financial assistance borne by PEF.',
      'Free standardized textbooks printed by Punjab Curriculum & Textbook Board (PCTB) provided to all enrolled students.',
      'Mandatory science laboratory, computer lab, and library requirements enforced in elementary and high schools.',
      'Biometric / SIS student attendance and real-time electronic monthly billing verification.',
      'Partner schools undergo rigorous annual monitoring by PEF Quality Assurance Directorate.'
    ],
    sopAndGuidelines: [
      'Partner schools must strictly maintain student-teacher ratio not exceeding 1:35.',
      'Schools must not charge any hidden fees, exam funds, or sports charges from enrolled students.',
      'Physical infrastructure must feature ventilated classrooms, boundary walls, functional washrooms, and safe drinking water.',
      'Timely data submission on PEF Student Information System (SIS) by 5th of every calendar month.'
    ],
    eligibilityOrPassingCriteria: [
      'Schools must maintain minimum 67% passing rate in annual Quality Assurance Test (QAT).',
      'Minimum student enrollment of 100 students for rural and 150 students for urban partner schools.',
      'Qualified teaching staff with minimum BA/BSc qualification; professional B.Ed/M.Ed teachers preferred.'
    ],
    officialPortal: 'pef.punjab.gov.pk/programs/fas',
    portalUrl: 'https://pef.punjab.gov.pk',
    helpline: '042-99232791-98 | Educare Desk: 03451291610',
    tags: ['FAS', 'Free Schooling', 'Per Child Subsidy', 'Free Textbooks', 'PEF Partner']
  },
  {
    id: 'pef-evs',
    code: 'EVS',
    title: 'Education Voucher Scheme (EVS) for Underprivileged Children',
    urduTitle: 'ایجوکیشن واؤچر اسکیم (ای وی ایس)',
    category: 'Voucher Program',
    beneficiaries: '500,000+ Out-of-School Children, Slum Dwellers, Orphanages, and Brick Kiln Workers',
    status: 'Active Expansion Phase 2026',
    monthlySubsidyRate: 'PKR 1,000 - 1,500 monthly voucher value per child + free textbooks and stationery',
    summary: 'Targeted voucher system enabling destitute children living in urban slums, squatter settlements (katchi abadis), brick kilns, and backward rural hamlets to enroll in accredited partner private schools of their parents choice free of cost.',
    keyFeatures: [
      'Physical and digital redeemable vouchers issued directly to child parents/guardians.',
      'Special focus on girl child education and rehabilitation of former child laborers.',
      'Child receives free school uniform allowance, free bags, and government textbooks.',
      'Empowers poor parents with freedom of choosing reputable neighborhood private schools.'
    ],
    sopAndGuidelines: [
      'Vouchers redeemed directly by partner schools upon verified biometric attendance.',
      'Schools must maintain minimum 80% attendance record for enrolled voucher students.',
      'Regular health screening and deworming drives conducted in EVS partner schools.'
    ],
    eligibilityOrPassingCriteria: [
      'Child age: 5 to 16 years belonging to marginalized and low-income families.',
      'Household verified through BISP / Benazir Kafalat / PSPA database as below poverty benchmark.',
      'Voucher schools must clear QAT sample testing to maintain voucher redemption rights.'
    ],
    officialPortal: 'pef.punjab.gov.pk/programs/evs',
    portalUrl: 'https://pef.punjab.gov.pk',
    helpline: '042-99232793 | Educare Helpline: 03451291610',
    tags: ['EVS', 'Education Vouchers', 'Slum Children', 'Brick Kiln Kids', 'PEF Assistance']
  },
  {
    id: 'pef-nsp',
    code: 'NSP',
    title: 'New School Program (NSP) - Rural School Incubation',
    urduTitle: 'نیو اسکول پروگرام (این ایس پی) برائے دیہی علاقے',
    category: 'New School Setup',
    beneficiaries: 'Unserved & Remote Rural Villages across Punjab',
    status: 'Induction Phase Active',
    monthlySubsidyRate: 'Lump-sum establishment grant + per-student monthly operational subsidy',
    summary: 'Public-private partnership model that incentivizes educated local youth, community leaders, and registered NGOs to construct and run new primary, elementary, and high schools in backward rural localities lacking any government or private schools within a 2-kilometer radius.',
    keyFeatures: [
      'Guaranteed financial viability for rural education entrepreneurs.',
      'Eliminates long walking distances for rural girls in southern and central Punjab.',
      'Zero construction or registration red-tape; PEF provides architectural floor plans and curriculum support.',
      'Free textbooks and teacher training support provided from Day 1.'
    ],
    sopAndGuidelines: [
      'School must be located in GIS-verified unserved rural pocket without existing schools within 2 km.',
      'Minimum land space of 2 to 4 Kanals with playground and functional sanitation facilities.',
      'Owner enters into a 3-year performance agreement with PEF Directorate of NSP.'
    ],
    eligibilityOrPassingCriteria: [
      'Educated entrepreneurs with minimum Bachelor degree / BS degree from recognized university.',
      'Commitment to enroll at least 70 students within the first 6 months of school inception.'
    ],
    officialPortal: 'pef.punjab.gov.pk/programs/nsp',
    portalUrl: 'https://pef.punjab.gov.pk',
    helpline: '042-99232795 | 03451291610',
    tags: ['NSP', 'New School Program', 'Rural Education', 'Girls Schooling', 'NGO Partnership']
  },
  {
    id: 'pef-qat',
    code: 'QAT',
    title: 'PEF Quality Assurance Test (QAT 2026) Schedule & Exam Guidelines',
    urduTitle: 'پیف کوالٹی اشورینس ٹیسٹ (کیو اے ٹی) شیڈول و گائیڈ لائنز',
    category: 'Annual Quality Exam',
    beneficiaries: 'Over 2 Million Students in 4,000+ FAS, EVS & NSP Partner Schools',
    status: 'Annual Schedule Announced 2026',
    summary: 'The Quality Assurance Test (QAT) is the mandatory annual standardized examination conducted by PEF across all partner schools to evaluate student learning outcomes in core subjects: English, Urdu, Mathematics, and General Science. The results determine school subsidy continuation or termination.',
    keyFeatures: [
      'Independent external invigilation teams deployed directly by PEF Quality Assurance Directorate.',
      'Standardized Multiple Choice Questions (MCQs) and descriptive testing aligned with Single National Curriculum (SNC).',
      'OMR (Optical Mark Recognition) computerized bubble sheets for error-free computerized evaluation.',
      'Unannounced random selection of test grades (Classes 2 to 10) on the morning of test day.',
      'Transparent online report cards and school ranking gazette published on PEF portal.'
    ],
    sopAndGuidelines: [
      'No school teacher or principal is permitted inside the examination rooms during QAT conduct.',
      'Invigilators physically match student roll sheets against original PEF SIS enrollment records.',
      'Use of unfair means, leaking test material, or impersonation leads to immediate school de-affiliation and legal FIR.',
      'Students must use black or blue ballpoint pens for filling OMR bubble circles.'
    ],
    eligibilityOrPassingCriteria: [
      'CRITICAL BENCHMARK: Partner schools must achieve at least 67% overall student passing rate.',
      'First-time failure (<67%): Penalty warning and temporary 10% subsidy deduction for 6 months.',
      'Second consecutive failure (<67%): Complete de-licensing and cancellation of PEF partnership agreement.'
    ],
    officialPortal: 'pef.punjab.gov.pk/qat',
    portalUrl: 'https://pef.punjab.gov.pk',
    helpline: 'PEF QA Directorate: 042-99232791 | Educare: 03451291610',
    tags: ['QAT 2026', '67% Passing Threshold', 'SNC Syllabus', 'OMR Sheets', 'PEF Inspection']
  },
  {
    id: 'pef-cpd',
    code: 'CPD',
    title: 'Continuous Professional Development (CPD) & Teacher Training',
    urduTitle: 'اساتذہ کی مسلسل پیشہ ورانہ تربیت (سی پی ڈی پروگرام)',
    category: 'Teacher Training',
    beneficiaries: '35,000+ Teachers and School Heads in PEF Partner Schools',
    status: 'Round-the-Year Training Batches',
    summary: 'PEF provides comprehensive free pedagogical training workshops, master trainer coaching, and leadership seminars for school principals and classroom teachers to enhance teaching quality in partner institutions.',
    keyFeatures: [
      'Specialized modules in Early Childhood Education (ECE), Phonics, Mental Math, and Science Practical Kits.',
      'School Leadership and Management Training (SLMT) for headmasters on financial governance and SIS portal.',
      'Free training manuals, activity workbooks, and internationally certified completion certificates.',
      'Training centers established across Lahore, Multan, Rawalpindi, Sargodha, Faisalabad, and Bahawalpur.'
    ],
    sopAndGuidelines: [
      'Mandatory for all partner schools to nominate at least 2 teachers per academic session.',
      '100% training attendance required for certificate issuance and CPD credits.'
    ],
    eligibilityOrPassingCriteria: [
      'Active teachers serving in FAS, EVS, or NSP accredited schools.',
      'Minimum Intermediate / BA / B.Ed qualification.'
    ],
    officialPortal: 'pef.punjab.gov.pk/cpd',
    portalUrl: 'https://pef.punjab.gov.pk',
    helpline: '042-99232792 | 03451291610',
    tags: ['CPD', 'Teacher Training', 'Pedagogy', 'ECE Modules', 'School Leadership']
  },
  {
    id: 'pef-expansion',
    code: 'EXPANSION',
    title: 'PEF Partner School Expansion & New Partnership Phase 2026',
    urduTitle: 'پیف پارٹنر اسکول ایکسپینشن و نئی رجسٹریشن 2026',
    category: 'Public Private Partnership',
    beneficiaries: 'Private School Owners & Educational Institutions across Punjab',
    status: 'Applications Open for Phase 2026',
    summary: 'Punjab Education Foundation invites online applications from registered private elementary and high schools across Punjab to join the FAS & EVS programs. Selected schools receive guaranteed monthly government subsidies and free student textbooks.',
    keyFeatures: [
      'Guaranteed financial cashflow for private schools with monthly direct bank credits.',
      'Free PCTB textbooks provided for all enrolled students.',
      'Exemption from educational board registration charges for matric exams.',
      'Official PEF Partnership Plaque and recognition.'
    ],
    sopAndGuidelines: [
      'School must be registered with District Education Authority (DEA) of the respective district.',
      'Minimum 100 students enrolled with valid B-Forms.',
      'School building must meet safety, fire, and structural fitness standards.'
    ],
    eligibilityOrPassingCriteria: [
      'Submit preliminary school audit form on PEF SIS registration portal.',
      'Pass baseline PEF preliminary physical inspection and teacher qualification scrutiny.'
    ],
    officialPortal: 'pef.punjab.gov.pk/partnership-2026',
    portalUrl: 'https://pef.punjab.gov.pk',
    helpline: '042-99232798 | Educare Support: 03451291610',
    tags: ['School Expansion', 'FAS Registration', 'Private Schools', 'DEA Registered', 'Subsidy Application']
  },
  {
    id: 'pef-careers',
    code: 'CAREERS',
    title: 'PEF Jobs & Field Staff Recruitment 2026 (QAO, MEO & Officers)',
    urduTitle: 'پنجاب ایجوکیشن فاؤنڈیشن بھرتیاں و جابز 2026',
    category: 'Field Jobs',
    beneficiaries: 'Educated Graduates & Education Professionals across Punjab',
    status: 'Active Recruitment Phase 2026',
    summary: 'PEF recruits qualified and dynamic professionals on contract basis for field monitoring, quality testing, and program coordination across divisional and district regional offices.',
    keyFeatures: [
      'Quality Assurance Officers (QAO - BS-17 Equivalent): PKR 75,000 - 90,000/month salary package.',
      'Monitoring & Evaluation Officers (MEO - BS-16 Equivalent): PKR 60,000 - 75,000/month salary + field fuel allowance.',
      'Subject Specialists (English, Mathematics, Science, Urdu): PKR 80,000/month.',
      'Master Trainers (CPD Directorate): PKR 70,000/month.',
      'District Project Coordinators: BS-17 equivalent supervisory roles.'
    ],
    sopAndGuidelines: [
      'Selection via competitive written screening test conducted by NTS / PTS / PPSC followed by panel interview.',
      'Extensive field travel across designated district clusters is compulsory for QAOs and MEOs.'
    ],
    eligibilityOrPassingCriteria: [
      'QAO: 16-Year Master / BS (4-Year) in Education, Statistics, Economics, English, or Natural Sciences.',
      'MEO: Bachelor (14/16 Years) with proficiency in Android apps, GIS tracking, and MS Excel.',
      'Age limit: 21 to 35 years (General Punjab age relaxation applicable).'
    ],
    officialPortal: 'pef.punjab.gov.pk/careers',
    portalUrl: 'https://pef.punjab.gov.pk',
    helpline: 'PEF HR Wing: 042-99232791 | Educare: 03451291610',
    tags: ['PEF Jobs', 'QAO BS-17', 'MEO BS-16', 'Subject Specialist', 'Field Monitoring']
  }
];
