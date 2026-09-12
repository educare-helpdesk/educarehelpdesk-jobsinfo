export interface CmPunjabScheme {
  id: string;
  title: string;
  urduTitle?: string;
  launchedBy: string;
  category: 'Higher Education' | 'Transport & Mobility' | 'Technology & Laptops' | 'Energy & Solar' | 'Employment & Internship' | 'Special Assistance' | 'Health & Nutrition';
  status: 'Active & Open' | 'Phase-II Registration' | 'Distribution Phase' | 'Upcoming 2026 Cycle';
  budget: string;
  targetAudience: string;
  benefitSummary: string;
  eligibilityCriteria: string[];
  requiredDocuments: string[];
  howToApplySteps: string[];
  officialPortal: string;
  applyUrl: string;
  helpline: string;
  badge: string;
  keyHighlights: string[];
}

export interface StudentScholarship {
  id: string;
  title: string;
  urduTitle?: string;
  provider: string;
  category: 'Provincial Merit' | 'Federal Need-Based' | 'Special Quota' | 'University Concession' | 'Endowment & Zakat' | 'Board High Achiever';
  coverage: string;
  eligibleLevels: string[];
  status: 'Active Applications' | 'Rolling Cycle' | 'Institutional Quota' | 'Annual Intake';
  deadline: string;
  description: string;
  eligibility: string[];
  benefits: string[];
  applicationSteps: string[];
  officialPortal: string;
  applyUrl: string;
  contactInfo: string;
}

export const CM_PUNJAB_SCHEMES: CmPunjabScheme[] = [
  {
    id: 'scheme-honhaar',
    title: 'CM Punjab Honhaar Undergraduate Scholarship Program',
    urduTitle: 'وزیر اعلیٰ پنجاب ہونہار اسکالرشپ پروگرام',
    launchedBy: 'Chief Minister Maryam Nawaz Sharif / Higher Education Department (HED) Punjab',
    category: 'Higher Education',
    status: 'Active & Open',
    budget: 'PKR 130 Billion (30,000+ Scholarships Annually)',
    targetAudience: 'Undergraduate BS (4-Year) & 5-Year Professional Degree Students across Punjab',
    benefitSummary: '100% complete tuition fee waiver for the entire duration of 4 to 5 year degree programs in 68 public universities, 131 graduate colleges, and top private medical & engineering institutes.',
    eligibilityCriteria: [
      'Punjab Domicile is strictly mandatory for all applicants.',
      'Enrolled in designated public sector universities or constituent graduate colleges across Punjab.',
      'Merit Cut-off: Top scorers in Intermediate / FA / FSc / ICS / I.Com from any recognized Punjab BISE Board.',
      'Family monthly income must not exceed PKR 300,000 (3 Lakh) per month.',
      'Age limit as per university admission regulations (undergraduate level).',
      'Priority disciplines: Artificial Intelligence, Computer Science, Engineering, Medicine (MBBS/BDS), Agriculture, Veterinary, and Social Sciences.'
    ],
    requiredDocuments: [
      'Original Punjab Domicile Certificate',
      'Student CNIC or B-Form copy',
      'Father / Guardian CNIC and verified monthly Income Slip / Salary Certificate',
      'Matric and Intermediate (HSSC) Result Cards / Sanads',
      'University Admission Fee Receipt & Student Registration Number'
    ],
    howToApplySteps: [
      'Visit official Punjab HED Honhaar Portal at honhaarscholarship.punjabhec.gov.pk.',
      'Register account using CNIC/B-Form and verify email / mobile number.',
      'Select university, academic department, and current semester degree program.',
      'Upload academic result cards and attested parent/guardian income proof.',
      'Submit the finalized application and obtain the Computerized Verification Tracking ID.'
    ],
    officialPortal: 'Punjab Higher Education Commission (PHEC) & HED',
    applyUrl: 'https://honhaarscholarship.punjabhec.gov.pk',
    helpline: '042-99232761 / Educare Desk: 03451291610',
    badge: '100% TUITION COVERAGE',
    keyHighlights: [
      'Covers 68 public sector universities and 131 postgraduate colleges',
      'No repayment or service bond required',
      'Direct disbursement to university treasuries',
      'Merit list published transparently online'
    ]
  },
  {
    id: 'scheme-laptop',
    title: 'CM Punjab Free Laptop Scheme 2026 (Phase 1 & 2)',
    urduTitle: 'وزیراعلیٰ پنجاب مفت لیپ ٹاپ اسکیم',
    launchedBy: 'Government of the Punjab / Higher Education Department',
    category: 'Technology & Laptops',
    status: 'Distribution Phase',
    budget: 'PKR 10 Billion+ (Latest Core i7 Laptops)',
    targetAudience: 'Top Merit Students in Matric, Intermediate (BISE Sargodha & all Punjab Boards) and Public Universities',
    benefitSummary: 'Distribution of brand-new, high-performance Core i7 laptops equipped with licensed software, coding tools, and digital learning suites for academic research and freelance training.',
    eligibilityCriteria: [
      'High achievers and position holders in BISE Matric & Intermediate Annual Examinations across all 9 Punjab Boards.',
      'Students enrolled in 4-Year BS programs in public sector universities with CGPA 3.50+ or top 5% semester standing.',
      'Dedicated quota for students from backward and southern Punjab districts (Sargodha, Mianwali, Bhakkar, Khushab, DG Khan, Rajanpur).',
      'Dedicated 3% quota for Persons with Disabilities (PWDs) and 5% quota for Non-Muslim Minority students.',
      'Students must hold a valid Punjab domicile.'
    ],
    requiredDocuments: [
      'CNIC or Smart B-Form',
      'Board Verified Result Card with official barcode',
      'University / College Bonafide Student Certificate signed by Principal/Registrar',
      'Attested Domicile Certificate'
    ],
    howToApplySteps: [
      'Institutional Merit Lists compiled directly from BISE gazette results and University examination records.',
      'Students verify their name and credentials on the PITB Youth Laptop Portal.',
      'Report discrepancies to the university student affairs desk or Educare Help Desk.',
      'Attend the ceremonial divisional distribution camp with original CNIC for biometric verification.'
    ],
    officialPortal: 'Punjab Information Technology Board (PITB) Youth Portal',
    applyUrl: 'https://youth.punjab.gov.pk',
    helpline: '0800-02345 / Educare: 03451291610',
    badge: 'CORE i7 LAPTOPS',
    keyHighlights: [
      'Latest generation Core i7 processors with 16GB RAM and SSD storage',
      'Includes 1-year comprehensive hardware replacement warranty',
      'Pre-loaded with educational software & freelancing portals',
      '100% transparent biometric verification'
    ]
  },
  {
    id: 'scheme-ebikes',
    title: 'CM Punjab Youth E-Bikes & Electric Scooties Scheme',
    urduTitle: 'وزیر اعلیٰ یوتھ ای بائیکس و اسکوٹیز اسکیم',
    launchedBy: 'Transport Department Punjab & Bank of Punjab (BOP)',
    category: 'Transport & Mobility',
    status: 'Active & Open',
    budget: 'PKR 20 Billion (20,000+ Electric & Petrol Bikes)',
    targetAudience: 'Male and Female Students Enrolled in Colleges & Universities across Punjab',
    benefitSummary: 'Eco-friendly electric bikes and petrol motorcycles provided on interest-free monthly installments of PKR 5,000 per month. Govt of Punjab pays 100% markup, insurance subsidy, and registration fees.',
    eligibilityCriteria: [
      'Regular enrolled student in any recognized college or university in Punjab (AIOU regional center students eligible).',
      'Age: 18 years or above with valid CNIC.',
      'Possession of valid Learner Driving Permit or Motorcycle Driving License issued by Punjab Traffic Police.',
      'Dedicated 50% quota allocated for female students with electric scooties.',
      'Guarantor required (Parent, sibling, or blood relative with verifiable income).'
    ],
    requiredDocuments: [
      'Student CNIC & Punjab Domicile',
      'Traffic Police Motorcycle Driving License / Learner Permit',
      'College / University Enrolment Certificate / Student Card',
      'Guarantor CNIC & Electricity Bill / Salary Slip'
    ],
    howToApplySteps: [
      'Register on official portal: bikes.punjab.gov.pk.',
      'Choose preferred bike type: Electric Bike (V-Electric) or Petrol Motorcycle (100cc/125cc).',
      'Upload Driving License number and student institutional credentials.',
      'Submit form; BOP conducts electronic credit verification.',
      'Successful applicants receive delivery orders at designated divisional bike dealerships.'
    ],
    officialPortal: 'Bank of Punjab (BOP) & Transport Dept Portal',
    applyUrl: 'https://bikes.punjab.gov.pk',
    helpline: '042-111-267-200 / 03451291610',
    badge: '0% INTEREST / PKR 5000/MO',
    keyHighlights: [
      'Zero percent (0%) interest rate; markup borne 100% by Punjab Government',
      'Complete first-year comprehensive insurance covered',
      'Priority helmet, tracking device, and safety gear included',
      'Dedicated female electric scooty quota with custom step-through design'
    ]
  },
  {
    id: 'scheme-cip',
    title: 'Chief Minister Paid Internship Program (CIP 2026)',
    urduTitle: 'وزیراعلیٰ پیڈ انٹرن شپ پروگرام',
    launchedBy: 'Youth Affairs & Sports Department, Govt of Punjab',
    category: 'Employment & Internship',
    status: 'Phase-II Registration',
    budget: 'PKR 1 Billion (6,000+ Paid Graduate Internships)',
    targetAudience: 'Fresh University Graduates (Graduated within last 2 years from Punjab)',
    benefitSummary: '6-month hands-on paid professional internship in Punjab Government departments, secretariats, attached authorities, and top private sector organizations with a monthly stipend of PKR 25,000.',
    eligibilityCriteria: [
      'Graduated in 16-Year BS, BA (Hons), Master, B.Ed, or equivalent within the last two years.',
      'Minimum 2.50 CGPA or 2nd Division from HEC recognized university.',
      'Unemployed at the time of application submission.',
      'Age limit: 21 to 28 years.',
      'Punjab domicile is required.'
    ],
    requiredDocuments: [
      'Final Degree or Official Transcript / DMC',
      'Punjab Domicile Certificate',
      'CNIC copy & 2 passport size photographs',
      'Declaration of unemployment affidavit'
    ],
    howToApplySteps: [
      'Log on to youthaffairs.punjab.gov.pk/cip.',
      'Build candidate profile with degree qualifications and preferred district.',
      'Match internship vacancies according to your degree specialization.',
      'Shortlisted candidates receive internship appointment letter via email/SMS.'
    ],
    officialPortal: 'Youth Affairs Punjab Portal',
    applyUrl: 'https://youthaffairs.punjab.gov.pk',
    helpline: '042-99232014 / Educare Desk: 03451291610',
    badge: 'PKR 25,000/MONTH STIPEND',
    keyHighlights: [
      'Direct monthly bank transfer into student Bank of Punjab account',
      'Valuable civil service & corporate job experience certificate',
      'Placement in education, health, IT, agriculture, and finance sectors',
      'Pathways to permanent placement and contractual hiring'
    ]
  },
  {
    id: 'scheme-solar',
    title: 'CM Punjab Roshan Gharana Solar Scheme for Students & Low-Income Families',
    urduTitle: 'روشن گھرانہ سولر اسکیم پنجاب',
    launchedBy: 'Energy Department, Government of the Punjab',
    category: 'Energy & Solar',
    status: 'Active & Open',
    budget: 'PKR 65 Billion (Up to 500,000 Solar Systems)',
    targetAudience: 'Domestic electricity consumers consuming up to 200/500 units with student households',
    benefitSummary: 'Provision of fully installed 1KW to 2KW Solar Panels, Inverters, and Lithium Batteries under 90% to 100% government subsidy to eliminate loadshedding disruptions for students studying at home.',
    eligibilityCriteria: [
      'Electricity consumption between 50 to 200 units (Protected Consumers) and 200 to 500 units.',
      'Clean billing record with no electricity theft or meter tampering FIRs.',
      'Households with school, college, or university going children given affirmative priority score.',
      'Valid CNIC and registered electricity reference number (FESCO, GEPCO, LESCO, MEPCO, IESCO).'
    ],
    requiredDocuments: [
      'Latest paid electricity bill copy',
      'CNIC of electricity bill account holder',
      'Proof of property ownership or tenant agreement with owner authorization'
    ],
    howToApplySteps: [
      'Send reference number via SMS or visit energy.punjab.gov.pk.',
      'Verify consumer eligibility through computerized disco billing database.',
      'Selected consumers receive automated solar installation voucher and vendor assignment.'
    ],
    officialPortal: 'Punjab Energy Department Portal',
    applyUrl: 'https://energy.punjab.gov.pk',
    helpline: '042-99202570 / 03451291610',
    badge: 'FREE 1KW/2KW SOLAR KITS',
    keyHighlights: [
      'Complete solar system including Tier-1 PV panels and hybrid inverter',
      'Ensures continuous 24/7 power for online LMS classes and exam study',
      'Significant reduction in monthly household electricity expenditures',
      'Free warranty and maintenance for 5 years'
    ]
  },
  {
    id: 'scheme-himmat',
    title: 'CM Punjab Himmat Card & Special Student Assistance Scheme',
    urduTitle: 'وزیراعلیٰ ہمت کارڈ اسکیم',
    launchedBy: 'Social Welfare & Bait-ul-Maal Department, Government of Punjab',
    category: 'Special Assistance',
    status: 'Active & Open',
    budget: 'PKR 8 Billion (65,000+ Special Persons & Students)',
    targetAudience: 'Persons with Disabilities (PWDs) and Special Students enrolled in schools, colleges and universities',
    benefitSummary: 'Issuance of Himmat ATM Card with a quarterly financial stipend of PKR 10,500 plus provision of motorized wheelchairs, braille digital devices, and hearing aids.',
    eligibilityCriteria: [
      'Certified Persons with Disabilities having valid CNIC with Disability logo or Social Welfare Disability Certificate.',
      'Special students enrolled in AIOU, government special education institutions, or public universities.',
      'Punjab domicile mandatory.'
    ],
    requiredDocuments: [
      'Special CNIC / B-Form with disability mark',
      'Disability Assessment Board Certificate',
      'Proof of enrollment in academic institution (if student)'
    ],
    howToApplySteps: [
      'Register at swd.punjab.gov.pk or visit nearest District Social Welfare Office.',
      'Complete bio-metric verification at Bank of Punjab branch.',
      'Collect Himmat Card to receive PKR 10,500 every quarter directly at 1Link ATMs.'
    ],
    officialPortal: 'Social Welfare Department Punjab',
    applyUrl: 'https://swd.punjab.gov.pk',
    helpline: '042-99204149 / Educare: 03451291610',
    badge: 'PKR 10,500 QUARTERLY + AIDS',
    keyHighlights: [
      'Quarterly cash stipend deposited directly onto Bank of Punjab ATM card',
      'Free motorized electric wheelchairs for university mobility',
      'Braille laptops & hearing assistance devices provided',
      '100% free public transport on Metro Bus & Orange Line Train'
    ]
  },
  {
    id: 'scheme-school-meal',
    title: 'CM Punjab Primary School Nutrition & Free Milk Program',
    urduTitle: 'وزیراعلیٰ پرائمری اسکول فری ملک و نیوٹریشن پروگرام',
    launchedBy: 'School Education Department Punjab',
    category: 'Health & Nutrition',
    status: 'Active & Open',
    budget: 'PKR 12 Billion (Over 1 Million Primary Students)',
    targetAudience: 'Primary School Children in Public Schools across Backward & Rural Punjab Districts',
    benefitSummary: 'Daily distribution of fortified hygienic milk packs and nutritional snack biscuits to all students in government primary schools to eliminate childhood malnutrition, boost cognitive growth, and maximize school attendance.',
    eligibilityCriteria: [
      'All students enrolled in Government Primary Schools in target districts (DG Khan, Rajanpur, Muzaffargarh, Layyah, Bhakkar, Bahawalpur, Rahim Yar Khan, and Mianwali).',
      'No application required; automatically distributed during daily school recess.'
    ],
    requiredDocuments: ['School Enrollment in SIS (School Information System) Punjab'],
    howToApplySteps: [
      'School headmasters register enrolled students in SIS daily attendance module.',
      'Food Authority tests milk quality and distributes to designated clusters.'
    ],
    officialPortal: 'School Education Department Punjab',
    applyUrl: 'https://schools.punjab.gov.pk',
    helpline: '042-99212012',
    badge: 'DAILY FORTIFIED MILK',
    keyHighlights: [
      'Daily 200ml fortified milk pack enriched with Vitamin A, D, Calcium, and Iron',
      'Proven 22% increase in primary school student retention and attendance',
      'Monitored by Punjab Food Authority (PFA) for 100% hygiene compliance'
    ]
  }
];

export const STUDENT_SCHOLARSHIPS: StudentScholarship[] = [
  {
    id: 'schol-honhaar',
    title: 'CM Punjab Honhaar Undergraduate Scholarship 2026',
    urduTitle: 'ہونہار اسکالرشپ برائے انڈرگریجویٹ طلباء',
    provider: 'Government of the Punjab / PHEC',
    category: 'Provincial Merit',
    coverage: '100% Complete Tuition Fee for 4-5 Years',
    eligibleLevels: ['BS (4-Year)', 'MBBS / BDS', 'DVM / Pharm-D', 'B.Sc Engineering', 'Associate Degree'],
    status: 'Active Applications',
    deadline: 'Rolling Merit Intake (Phase-II Open)',
    description: 'Premier scholarship awarded to 30,000+ meritorious students studying in 68 public sector universities and 131 graduate colleges across Punjab. Covers complete semester tuition without any repayment clause.',
    eligibility: [
      'Punjab domicile is required.',
      'High merit in Intermediate (FA/FSc/ICS/I.Com) or BS ongoing CGPA.',
      'Family monthly income under PKR 300,000/month.',
      'Enrolled in eligible public or selected private universities.'
    ],
    benefits: [
      'Zero tuition fee throughout the 4 or 5-year undergraduate degree',
      'Direct disbursement to university bank accounts',
      'No financial burden on parents'
    ],
    applicationSteps: [
      'Register on honhaarscholarship.punjabhec.gov.pk.',
      'Submit CNIC, intermediate roll number, and father income slip.',
      'Track computerized verification through university student aid office.'
    ],
    officialPortal: 'honhaarscholarship.punjabhec.gov.pk',
    applyUrl: 'https://honhaarscholarship.punjabhec.gov.pk',
    contactInfo: 'PHEC Helpline: 042-99232761 | Educare: 03451291610'
  },
  {
    id: 'schol-peef',
    title: 'PEEF (Punjab Educational Endowment Fund) Special Quota & Master Scholarships',
    urduTitle: 'پیف اسپیشل کوٹہ و ماسٹرز اسکالرشپ',
    provider: 'Punjab Educational Endowment Fund (PEEF), Lahore',
    category: 'Special Quota',
    coverage: 'Full Tuition Fee + PKR 3,000 to 5,000 Monthly Stipend',
    eligibleLevels: ['Intermediate (FA/FSc)', 'BS (4-Year)', 'Master / PGD', 'B.Ed'],
    status: 'Active Applications',
    deadline: 'Active Phase 2026',
    description: 'PEEF provides scholarships to disadvantaged and needy categories: orphan children, children of Grade 1-4 government servants, children of civilian martyrs (Shaheed), non-Muslim minority students, and students with disabilities.',
    eligibility: [
      'Must belong to one of the 5 special quota categories (Orphan, Grade 1-4, Minority, Special Person, or Shaheed child).',
      'Minimum 60% marks in previous examination (Matric for Inter scholarship, Inter for BS scholarship, BS for Master).',
      'Total monthly family income from all sources not exceeding PKR 60,000/month (Grade 1-4 exempted from income ceiling if based on salary slip).',
      'Regular student in a registered public or private educational institution in Punjab.'
    ],
    benefits: [
      '100% Tuition fee reimbursed directly',
      'Monthly hostel and living stipend disbursed via Bank of Punjab cards',
      'Available until completion of full degree course'
    ],
    applicationSteps: [
      'Download PEEF Special Quota form from peef.org.pk.',
      'Attach Death Certificate (for orphans) or Salary Slip (Grade 1-4) or Disability / Minority Certificate.',
      'Get form attested by Head of Institution and mail to PEEF Office, Link Wahdat Road, Lahore.'
    ],
    officialPortal: 'PEEF Official Portal (peef.org.pk)',
    applyUrl: 'https://peef.org.pk',
    contactInfo: 'PEEF Office Lahore: 042-99260051-4 | Educare Desk: 03451291610'
  },
  {
    id: 'schol-hec-need',
    title: 'HEC Need-Based Undergraduate Scholarship Program',
    urduTitle: 'ایچ ای سی ضرورت مند اسکالرشپ برائے بی ایس طلباء',
    provider: 'Higher Education Commission (HEC), Islamabad',
    category: 'Federal Need-Based',
    coverage: '100% Tuition Fee + PKR 6,000 Monthly Living Allowance',
    eligibleLevels: ['BS (4-Year)', 'B.Ed (4-Year)', 'Associate Degree'],
    status: 'Active Applications',
    deadline: 'Institutional Deadlines Set by Respective Universities',
    description: 'HEC initiative in partnership with all public universities across Pakistan to support talented students facing severe economic hardship. Covers complete tuition plus a monthly living allowance.',
    eligibility: [
      'Admitted on merit in regular BS 4-Year undergraduate program in public university.',
      'Family income unable to support educational costs (verified via electricity bills, house rent, and asset declarations).',
      'Minimum 2.50 CGPA maintained in consecutive semesters.'
    ],
    benefits: [
      'Full institutional tuition fee voucher paid by HEC',
      'Monthly living stipend of PKR 6,000 directly paid to student bank account',
      'Includes book and study materials allowance'
    ],
    applicationSteps: [
      'Visit your University Financial Aid / Student Affairs Office.',
      'Submit HEC Need-Based Scholarship form along with utility bills and income affidavit.',
      'Appear in the Institutional Scholarship Award Committee (ISAC) interview.'
    ],
    officialPortal: 'HEC Need Based Portal (hec.gov.pk)',
    applyUrl: 'https://hec.gov.pk',
    contactInfo: 'HEC Call Center: 051-111-119-432'
  },
  {
    id: 'schol-aiou-sfss',
    title: 'AIOU Student Financial Support Scheme (SFSS) & Earn-to-Learn',
    urduTitle: 'علامہ اقبال اوپن یونیورسٹی مالی امداد و فیس رعایت اسکیم',
    provider: 'Allama Iqbal Open University (AIOU), Islamabad',
    category: 'University Concession',
    coverage: '35% to 100% Semester Fee Concession',
    eligibleLevels: ['Matric', 'FA / Intermediate', 'BA / AD', 'BS (4-Year)', 'B.Ed', 'Master / PGD'],
    status: 'Rolling Cycle',
    deadline: 'Submitted along with Semester Admission Challan',
    description: 'AIOU allocates generous funds annually to ensure no student drops out due to financial inability. Complete 100% free education is provided to prisoners in jails, disabled students, and transgender students.',
    eligibility: [
      'Needy and deserving continuing or fresh students of AIOU.',
      'Passed previous semester courses on first attempt.',
      'Transgender students receive 100% tuition waiver upon showing CNIC.',
      'Persons with disabilities receive 100% fee concession.',
      'Inmates/prisoners enrolled through jail superintendent study centers receive 100% free books and exams.'
    ],
    benefits: [
      '35% to 50% fee concession for general deserving applicants',
      '100% fee waiver for disabled, transgender, and prisoner students',
      'Earn-to-Learn internships on AIOU regional campuses'
    ],
    applicationSteps: [
      'Download AIOU Financial Support Form from Educare Forms Desk or aiou.edu.pk.',
      'Visit nearest AIOU Regional Campus (e.g. Sargodha, Faisalabad, Rawalpindi, Lahore).',
      'Present income certificate and previous result card before Regional Financial Assistance Committee.',
      'Receive approved revised fee challan and pay discounted amount at designated bank branch.'
    ],
    officialPortal: 'AIOU Directorate of Student Advisory & Counseling',
    applyUrl: 'https://aiou.edu.pk',
    contactInfo: 'AIOU Help Desk: 051-111-112-468 | Educare Desk: 03451291610'
  },
  {
    id: 'schol-mora',
    title: 'Mora Educational Scholarship (Punjab Zakat & Ushr Department)',
    urduTitle: 'مورا اسکالرشپ برائے مستحق طلباء (محکمہ زکوٰۃ و عشر)',
    provider: 'Zakat & Ushr Department, Government of Punjab',
    category: 'Endowment & Zakat',
    coverage: 'PKR 18,000 to PKR 36,000 Annual Educational Stipend',
    eligibleLevels: ['Matric', 'FA / FSc', 'BA / BSc', 'BS (4-Year)', 'B.Ed', 'Master'],
    status: 'Annual Intake',
    deadline: 'Processed via Local Zakat Committees Annually',
    description: 'Educational stipends awarded from Provincial Zakat Fund to deserving Muslim students (Mustahiq-e-Zakat) studying in recognized colleges, universities, and professional technical institutions across Punjab.',
    eligibility: [
      'Mustahiq-e-Zakat Muslim student residing in Punjab.',
      'Certified by Local Zakat Committee (LZC) of student native residential area.',
      'Good moral character and regular attendance in educational institution.',
      'Family income below poverty line threshold.'
    ],
    benefits: [
      'Direct annual cash payment to cover tuition fees, books, and examination fees',
      'Renewable every year based on academic progression'
    ],
    applicationSteps: [
      'Obtain Mora Scholarship form from college/university student affairs office.',
      'Get Part-B signed and stamped by Chairman of your residential Local Zakat Committee.',
      'Head of educational institution forwards compiled cases to District Zakat Officer (DZO).'
    ],
    officialPortal: 'Punjab Zakat & Ushr Department (zakat.punjab.gov.pk)',
    applyUrl: 'https://zakat.punjab.gov.pk',
    contactInfo: 'District Zakat Committee (DZO) | Educare Helpline: 03451291610'
  },
  {
    id: 'schol-pbm',
    title: 'Pakistan Bait-ul-Mal (PBM) Educational Financial Assistance',
    urduTitle: 'پاکستان بیت المال تعلیمی مالی امداد',
    provider: 'Pakistan Bait-ul-Mal (PBM), Government of Pakistan',
    category: 'Federal Need-Based',
    coverage: 'Complete Semester / Annual Tuition Fee Voucher',
    eligibleLevels: ['Intermediate', 'BS (4-Year)', 'B.Ed', 'Master', 'MS / M.Phil'],
    status: 'Active Applications',
    deadline: 'Rolling intake throughout the calendar year',
    description: 'Financial assistance provided to deserving and poor students studying in government colleges, polytechnic institutes, and public universities across Pakistan to prevent dropouts.',
    eligibility: [
      'Enrolled in public sector educational institution.',
      'Parent/guardian monthly income must not exceed PKR 35,000/month.',
      'Student must not be receiving scholarship from any other public agency.',
      'Clear academic record with passing grades.'
    ],
    benefits: [
      'PBM issues cross cheque directly in the name of the university/college vice chancellor or principal',
      'Covers tuition fees, registration, library, and examination fees'
    ],
    applicationSteps: [
      'Download PBM Educational Assistance Form from pbm.gov.pk.',
      'Attach university fee challan, CNIC, and parent income certificate.',
      'Submit at nearest District Bait-ul-Mal Office (available in Sargodha, Khushab, Bhakkar, Mianwali, etc.).'
    ],
    officialPortal: 'pbm.gov.pk',
    applyUrl: 'https://pbm.gov.pk',
    contactInfo: 'PBM Toll Free: 0800-66666 | Educare: 03451291610'
  },
  {
    id: 'schol-bise-talent',
    title: 'BISE Sargodha Board Talent & Merit Scholarship',
    urduTitle: 'بورڈ آف انٹرمیڈیٹ اینڈ سیکنڈری ایجوکیشن سرگودھا ٹیلنٹ اسکالرشپ',
    provider: 'BISE Sargodha (Board of Intermediate & Secondary Education)',
    category: 'Board High Achiever',
    coverage: 'Monthly Stipend + Cash Medals & Book Grants',
    eligibleLevels: ['Matric (9th & 10th)', 'Intermediate (11th & 12th)'],
    status: 'Active Applications',
    deadline: 'Awarded Post Result Declaration 2026',
    description: 'Merit-based scholarships awarded to top position holders, science high-achievers, and humanities toppers in SSC & HSSC Annual Examinations of BISE Sargodha.',
    eligibility: [
      'Passed Matric or Intermediate from BISE Sargodha with A+ Grade (80%+ marks).',
      'Continuing education in next higher class in a recognized college/institution in Punjab.',
      'Both science and general arts groups eligible according to allocated board quotas.'
    ],
    benefits: [
      'Monthly scholarship allowance disbursed directly to students',
      'Lump-sum one-time book allowance and commendation certificate',
      'Priority consideration for provincial and federal merit awards'
    ],
    applicationSteps: [
      'BISE Sargodha automatically dispatches scholarship nomination letters to schools/colleges of top scorers.',
      'Students fill verification form endorsed by their current college principal.',
      'Bank payment slip issued directly from BISE Sargodha Accounts Branch.'
    ],
    officialPortal: 'bisesargodha.edu.pk',
    applyUrl: 'https://bisesargodha.edu.pk',
    contactInfo: 'BISE Sargodha Scholarship Branch: 048-3250047 | 03451291610'
  }
];
