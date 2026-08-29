export type FormCategory =
  | 'All'
  | 'Admissions & Enrollment'
  | 'Degree & Certificates'
  | 'NOC & Migration'
  | 'Jobs & Experience Letters'
  | 'General Applications & Corrections'
  | 'Bank, Challans & Fee Refund'
  | 'Civic, Birth & Affidavits';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea';
  placeholder?: string;
  options?: string[];
  required?: boolean;
}

export interface DownloadableForm {
  id: string;
  title: string;
  category: Exclude<FormCategory, 'All'>;
  department: string;
  formCode: string;
  badge: string;
  badgeColor: string;
  description: string;
  applicableFor: string;
  feeInfo: string;
  processingTime: string;
  submissionChannel: string;
  requiredDocuments: string[];
  instructions: string[];
  sampleContent: string;
  printableTemplate: {
    authority: string;
    subHeader: string;
    sections: {
      heading: string;
      fields: { label: string; valuePlaceholder?: string; isLong?: boolean }[];
    }[];
    declarationText: string;
    footerNotes: string[];
  };
  isPopular?: boolean;
  isUrgentAvailable?: boolean;
}

export const FORMS_CATEGORIES: FormCategory[] = [
  'All',
  'Admissions & Enrollment',
  'Degree & Certificates',
  'NOC & Migration',
  'Jobs & Experience Letters',
  'General Applications & Corrections',
  'Bank, Challans & Fee Refund',
  'Civic, Birth & Affidavits'
];

export const DOWNLOADABLE_FORMS: DownloadableForm[] = [
  // ==========================================
  // 1. DEGREE & CERTIFICATES
  // ==========================================
  {
    id: 'form-aiou-degree',
    title: 'AIOU Degree & Certificate Issuance Application Form',
    category: 'Degree & Certificates',
    department: 'AIOU Examination Department / Degree Section, Islamabad',
    formCode: 'AIOU-DEG-01',
    badge: 'DEGREE / SANAD',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    description: 'Official application for issuance of Degree, Sanad, Provisional Certificate, or Detailed Marks Certificate (DMC) for all Matric, FA, BA, B.Ed, BS, and Master level graduates.',
    applicableFor: 'All AIOU Passed Students (Matric to Ph.D)',
    feeInfo: 'Normal: Rs. 1,000 - 2,500 | Urgent: Rs. 2,000 - 4,500 (Varies by Program)',
    processingTime: 'Urgent: 7 - 10 Working Days | Normal: 45 - 60 Days',
    submissionChannel: 'Online via DTS (dts.aiou.edu.pk) or By Post to Controller Examinations, Block 3, AIOU Islamabad',
    requiredDocuments: [
      'Attested copy of Matric/SSC Sanad & Result Card',
      'Attested copy of FA/FSc/HSSC Sanad & Result Card',
      'Attested copy of previous degree certificates (for BS, B.Ed, Master)',
      'Attested CNIC / B-Form copy of applicant',
      'Original Paid Bank Challan (AIOU Copy)',
      '1 Passport size photograph with blue background (attested on back)'
    ],
    instructions: [
      'Fill candidate name and father name strictly matching Matric Certificate spelling.',
      'Ensure all semester results are complete and reflected in the unofficial web transcript.',
      'For Urgent Degree, select "Urgent" on the bank challan before making payment at ABL/MCB/FWBL or JazzCash/Easypaisa.',
      'Keep postal tracking receipt or DTS Tracking ID safe for courier dispatch verification.'
    ],
    sampleContent: `APPLICATION FOR ISSUANCE OF DEGREE / CERTIFICATE / SANAD
Allama Iqbal Open University, Sector H-8, Islamabad

1. Candidate Name (Block Letters): _____________________________________________
2. Father's Name: _____________________________________________________________
3. CNIC / B-Form No: ___________________________ 4. Roll No: __________________
5. Student ID / Registration No: _______________ 6. Program Passed: ____________
7. Semester of Passing: ________________________ 8. Examination Center: ________
9. Delivery Postal Address: ____________________________________________________
   City: ___________________________ District: _______________ Mobile: ________
10. Fee Details: Challan No: ____________ Bank: ___________ Amount: Rs. _______ Date: _________
11. Mode of Issuance: [  ] Normal   [  ] Urgent (Fast Track)

Declaration: I solemnly declare that all particulars given above are correct and authentic according to my educational records.
Applicant Signature: ______________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Controller of Examinations - Degree & Certificate Issuance Section (Block No. 3)',
      sections: [
        {
          heading: 'A. APPLICANT PERSONAL & ACADEMIC PARTICULARS',
          fields: [
            { label: "Candidate's Full Name (in BLOCK letters as per Matric)" },
            { label: "Father's Full Name" },
            { label: 'CNIC / B-Form Number', valuePlaceholder: '_____-________-_' },
            { label: 'AIOU Roll Number' },
            { label: 'Student ID / Registration Number' },
            { label: 'Program / Degree Completed (e.g. B.Ed 1.5, BS English, BA)' },
            { label: 'Passing Semester & Year (e.g. Autumn 2025)' },
            { label: 'Major Subjects / Specialization' }
          ]
        },
        {
          heading: 'B. POSTAL DISPATCH & CONTACT DETAILS',
          fields: [
            { label: 'Complete Permanent / Mailing Address for Courier Dispatch', isLong: true },
            { label: 'Active Mobile Number (for Courier SMS alerts)' },
            { label: 'Email Address' },
            { label: 'District & Tehsil' }
          ]
        },
        {
          heading: 'C. FEE PAYMENT PARTICULARS',
          fields: [
            { label: 'Bank Challan / 1Link Transaction ID' },
            { label: 'Bank Name & Branch Code' },
            { label: 'Amount Paid (PKR)' },
            { label: 'Payment Category', valuePlaceholder: 'Normal [  ]  /  Urgent [  ]' }
          ]
        }
      ],
      declarationText: 'I solemnly declare that all particulars provided in this application are correct to the best of my knowledge and belief. I have attached all required attested certificates.',
      footerNotes: [
        'Degree tracking available 24/7 at https://dts.aiou.edu.pk',
        'Educare Help Desk Pakistan (03451291610) provides regional collection & tracking facilitation.'
      ]
    },
    isPopular: true,
    isUrgentAvailable: true
  },

  {
    id: 'form-aiou-dmc-provisional',
    title: 'AIOU Provisional Result Card & Web DMC Application Form',
    category: 'Degree & Certificates',
    department: 'AIOU Result Section, Examination Department',
    formCode: 'AIOU-DMC-02',
    badge: 'PROVISIONAL DMC',
    badgeColor: 'bg-teal-100 text-teal-950 border-teal-300',
    description: 'Application for issuance of official stamped Provisional Certificate, Complete Academic Record transcript, or course-wise Detailed Marks Certificate (DMC).',
    applicableFor: 'Students needing immediate proof of qualification for job/admission',
    feeInfo: 'Provisional Certificate: Rs. 600 | Duplicate DMC: Rs. 800',
    processingTime: 'Urgent: 3 - 5 Days | Normal: 15 Days',
    submissionChannel: 'CMS Portal / By Post to Incharge Result Section, AIOU Islamabad',
    requiredDocuments: [
      'Copy of Student ID / CMS Result Cards of all completed semesters',
      'Attested Copy of CNIC / B-Form',
      'Original Paid Bank Challan'
    ],
    instructions: [
      'Provisional certificate is issued only after all credit hours are successfully completed and marked passed on CMS.',
      'Ensure clear mobile number is mentioned for tracking SMS.'
    ],
    sampleContent: `APPLICATION FOR PROVISIONAL CERTIFICATE / DETAILED MARKS CERTIFICATE (DMC)
Allama Iqbal Open University, Islamabad

To: The Incharge Result Section, Examination Department, AIOU, Islamabad.
Subject: Request for Issuance of Official Provisional Result Certificate

1. Student Name: ________________________________ 2. Father Name: ________________________________
3. Roll No: __________________ 4. Registration No: ______________ 5. Program: ____________________
6. Total Credit Hours Passed: _______ 7. Complete Mailing Address: __________________________________
8. Mobile / WhatsApp No: _________________________ 9. Fee Challan No: ____________ Date: _________

Applicant Signature: ________________________`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Examination Department - Result & DMC Verification Branch',
      sections: [
        {
          heading: '1. CANDIDATE & RECORD DETAILS',
          fields: [
            { label: "Student's Full Name" },
            { label: "Father's Name" },
            { label: 'Roll Number' },
            { label: 'Student ID / Reg ID' },
            { label: 'Program Completed' },
            { label: 'Required Document', valuePlaceholder: 'Provisional Certificate [  ] / Official DMC [  ]' }
          ]
        },
        {
          heading: '2. DISPATCH ADDRESS',
          fields: [
            { label: 'Complete Delivery Address', isLong: true },
            { label: 'Mobile Number' }
          ]
        }
      ],
      declarationText: 'I request the issuance of my provisional certificate for immediate employment / admission verification purposes.',
      footerNotes: [
        'Send with original bank receipt to: Incharge Result Section, Block 3, AIOU, Sector H-8, Islamabad.',
        'Helpline: 03451291610 (Educare Help Desk Pakistan)'
      ]
    },
    isPopular: true
  },

  {
    id: 'form-duplicate-degree',
    title: 'Duplicate Degree / Certificate Application Form',
    category: 'Degree & Certificates',
    department: 'AIOU Degree Department / Duplicate Section',
    formCode: 'AIOU-DUP-03',
    badge: 'LOST / DAMAGED',
    badgeColor: 'bg-rose-100 text-rose-950 border-rose-300',
    description: 'Application for duplicate certificate/degree in case of loss, theft, fire damage, or mutilation of original educational documents.',
    applicableFor: 'Students who lost their original AIOU degree or certificate',
    feeInfo: 'Matric/FA: Rs. 2,500 | BA/BS/B.Ed/Master: Rs. 4,000',
    processingTime: '20 - 30 Working Days',
    submissionChannel: 'By Post / By Hand to Degree Section, AIOU Islamabad',
    requiredDocuments: [
      'Original Police Daily Diary (Rapat / FIR) of lost degree',
      'Original Newspaper Cutting of lost degree announcement in national daily newspaper',
      'Affidavit on Rs. 50/100 E-Stamp Paper duly attested by Oath Commissioner / Notary Public',
      'Attested copy of CNIC & previous qualification certificates',
      'Original Paid Bank Challan'
    ],
    instructions: [
      'Newspaper advertisement must mention Roll Number, Program Name, Passing Year, and Registration Number.',
      'In case of damaged degree, submit the original damaged/burnt pieces without police report.'
    ],
    sampleContent: `APPLICATION FOR ISSUANCE OF DUPLICATE DEGREE / DIPLOMA / CERTIFICATE
Allama Iqbal Open University, Islamabad

1. Applicant Name: ___________________________________________________________
2. Father Name: ______________________________________________________________
3. Program: _____________________ Roll No: ______________ Reg No: _____________
4. Reason for Duplicate Request: [  ] Lost / Stolen   [  ] Damaged / Burnt
5. Police Station FIR / Diary No: ________________ Dated: _____________________
6. Newspaper Name & Date of Press Release: ____________________________________
7. Delivery Address: __________________________________________________________
   Mobile No: _____________________________ Challan No: ______________________

Applicant Signature: ______________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Controller of Examinations - Duplicate Degree Branch',
      sections: [
        {
          heading: 'A. APPLICANT RECORD PARTICULARS',
          fields: [
            { label: "Student's Full Name" },
            { label: "Father's Name" },
            { label: 'Roll Number' },
            { label: 'Student ID / Registration ID' },
            { label: 'Degree / Certificate Title' },
            { label: 'Passing Year / Session' }
          ]
        },
        {
          heading: 'B. LOSS / DAMAGE PARTICULARS',
          fields: [
            { label: 'Nature of Loss', valuePlaceholder: 'Lost [  ] / Stolen [  ] / Damaged [  ]' },
            { label: 'Police Diary / FIR Number & Station Name' },
            { label: 'Newspaper Name & Publication Date' },
            { label: 'Affidavit E-Stamp Number' }
          ]
        }
      ],
      declarationText: 'I solemnly affirm that I have actually lost my original degree and have not misused it anywhere. If the original is recovered, I shall return it to the university immediately.',
      footerNotes: [
        'Must attach original newspaper clipping and original attested affidavit.',
        'Helpline Support: 03451291610 (Educare Help Desk)'
      ]
    }
  },

  // ==========================================
  // 2. NOC & MIGRATION FORMS
  // ==========================================
  {
    id: 'form-noc-migration',
    title: 'University / Board Migration Certificate (NOC) Form',
    category: 'NOC & Migration',
    department: 'AIOU Examination / Migration Branch & BISE Sargodha',
    formCode: 'EDU-NOC-01',
    badge: 'NOC / MIGRATION',
    badgeColor: 'bg-indigo-100 text-indigo-950 border-indigo-300',
    description: 'Application for issuance of official No Objection Certificate (NOC) and Migration Certificate to transfer academic records to another Pakistani or International University / Board.',
    applicableFor: 'Students migrating to PU, UOS, BZU, GCUF, Virtual Univ, or any Board',
    feeInfo: 'Normal: Rs. 1,000 | Urgent: Rs. 2,000',
    processingTime: 'Urgent: 2 - 3 Days | Normal: 10 - 15 Days',
    submissionChannel: 'Regional Campus / Online Portal / By Post to Registrar / Controller',
    requiredDocuments: [
      'Original Last Passed Result Card / Transcript Copy',
      'Attested Copy of CNIC / B-Form',
      'Original Paid Bank Challan',
      'Clearance certificate from Regional Campus / Library (if applicable)'
    ],
    instructions: [
      'Mention exact destination University / Board name on the form.',
      'Once NOC is issued, student cannot re-enroll in the previous institution without re-migration.'
    ],
    sampleContent: `APPLICATION FOR ISSUANCE OF MIGRATION CERTIFICATE (N.O.C.)

To: The Controller of Examinations / Registrar.
Subject: Application for Grant of Migration Certificate (No Objection Certificate)

1. Name of Applicant: _________________________________________________________
2. Father's Name: _____________________________________________________________
3. CNIC No: ___________________________ Mobile: _______________________________
4. Last Exam Passed / Appeared: ________________ Roll No: ______________________
5. Registration Number: _________________ Session / Year: ______________________
6. Reason for Migration: ______________________________________________________
7. Name of University / Board to which migrating: ______________________________
8. Postal Address for Dispatch: ________________________________________________
9. Bank Challan No: ___________________ Amount: Rs. ________ Date: ____________

Applicant Signature: ________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'FACILITATION & REGISTRATION DESK',
      subHeader: 'Inter-University & Board Migration & NOC Verification Branch',
      sections: [
        {
          heading: '1. APPLICANT ACADEMIC PARTICULARS',
          fields: [
            { label: 'Full Name of Student' },
            { label: "Father's Full Name" },
            { label: 'CNIC / B-Form Number' },
            { label: 'University / Board Roll Number' },
            { label: 'Registration / Enrolment ID' },
            { label: 'Last Program / Class Passed' }
          ]
        },
        {
          heading: '2. MIGRATION DESTINATION DETAILS',
          fields: [
            { label: 'Target University / Board Name (where taking admission)' },
            { label: 'Reason for Transfer / Migration' },
            { label: 'Dispatch Postal Address', isLong: true },
            { label: 'Applicant Mobile / WhatsApp Number' }
          ]
        }
      ],
      declarationText: 'I declare that I have cleared all university dues and there is no disciplinary action pending against me. Please issue my Migration Certificate / NOC.',
      footerNotes: [
        'Attach original paid fee challan.',
        'Educare Help Desk (03451291610) facilitates fast-track NOC processing.'
      ]
    },
    isPopular: true
  },

  {
    id: 'form-character-certificate',
    title: 'Character Certificate & Student Conduct Proforma',
    category: 'NOC & Migration',
    department: 'Student Affairs / Head of Department / Regional Campus',
    formCode: 'EDU-CHAR-02',
    badge: 'CHARACTER CERT',
    badgeColor: 'bg-cyan-100 text-cyan-950 border-cyan-300',
    description: 'Formal Character and Conduct Certificate issued to bonafide students for employment, visa processing, scholarships, or higher education admissions.',
    applicableFor: 'Students applying for Jobs, Foreign Visas, or Higher Studies',
    feeInfo: 'Free of Cost / Nominal Rs. 200 processing fee',
    processingTime: '1 - 3 Working Days',
    submissionChannel: 'Regional Campus / Institutional Head Office',
    requiredDocuments: [
      'Copy of Student ID Card',
      'Copy of Last Passed Semester DMC / Result Sheet',
      'Copy of CNIC'
    ],
    instructions: [
      'Fill your enrolled session and program correctly.',
      'Get stamped by the designated Regional Director or Head of Department.'
    ],
    sampleContent: `CHARACTER & CONDUCT CERTIFICATE PROFORMA
TO WHOM IT MAY CONCERN

This is to certify that Mr./Ms. ________________________________________________
Son/Daughter of ______________________________________________________________
Resident of __________________________________________________________________
CNIC No: __________________________ Roll No / ID: ____________________________
was a bonafide student of this institution in the program of: __________________
during the academic sessions: _______________ to _______________.

During his/her stay at this institution, his/her conduct, character, and academic performance were found to be [ GOOD / EXCELLENT ]. To the best of our knowledge, he/she did not participate in any subversive or undesirable activities.

We wish him/her every success in his/her future endeavors.

Authorized Signature: _______________________
Name & Designation: ________________________
Official Stamp / Seal: ______________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'INSTITUTIONAL STUDENT AFFAIRS & CONDUCT DESK',
      subHeader: 'Student Verification & Bonafide Certificate Branch',
      sections: [
        {
          heading: 'STUDENT PARTICULARS',
          fields: [
            { label: 'Student Full Name' },
            { label: "Father's Full Name" },
            { label: 'CNIC / B-Form Number' },
            { label: 'Academic Program / Course' },
            { label: 'Session Period (e.g. 2023 - 2025)' },
            { label: 'Institutional Roll / Reg Number' }
          ]
        }
      ],
      declarationText: 'Certified that the above mentioned candidate bears a good moral character and maintained disciplined conduct during his/her period of study.',
      footerNotes: [
        'Valid for government employment, military commissions, embassy visas, and university admissions.',
        'Facilitated via Educare Student Desk: 03451291610'
      ]
    }
  },

  // ==========================================
  // 3. JOBS & EXPERIENCE LETTERS
  // ==========================================
  {
    id: 'form-job-application-standard',
    title: 'Standard Government & Private Job Application Form',
    category: 'Jobs & Experience Letters',
    department: 'Establishment / Human Resources Department (Punjab / Federal Format)',
    formCode: 'JOB-APP-01',
    badge: 'JOB APPLICATION',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
    description: 'Comprehensive employment application form compliant with Punjab & Federal Government recruitment standards for BPS-01 to BPS-17 posts and private sector jobs.',
    applicableFor: 'Job Applicants (Educators, Clerks, Data Entry, Officers, Lecturers)',
    feeInfo: 'Free of Cost (Print & Submit with your CV / Challan)',
    processingTime: 'Aligned with advertised job closing dates',
    submissionChannel: 'By Post or By Hand to Advertised Department / Employer Address',
    requiredDocuments: [
      'Detailed Updated Curriculum Vitae (CV) / Resume',
      'Attested copies of all Academic Degrees & Certificates (Matric to Highest)',
      'Attested copy of CNIC & Domicile Certificate',
      'Attested copy of Experience Certificates',
      '2 Recent Passport size photographs',
      'Original Paid Bank Challan (if application fee is required by department)'
    ],
    instructions: [
      'Write Post Name and Advertisement / BPS Reference number clearly.',
      'List educational qualifications in chronological order starting from Matric/SSC.',
      'Sign and date at the bottom of the declaration.'
    ],
    sampleContent: `STANDARD APPLICATION FORM FOR EMPLOYMENT / RECRUITMENT

Post Applied For: __________________________________ BPS Scale: _______________
Advertisement Reference / Dept: ____________________ Date: ___________________

1. Full Name (in Block Letters): _____________________________________________
2. Father's Name: _____________________________________________________________
3. Date of Birth (DD/MM/YYYY): ____/____/________ Age on Closing Date: _______
4. CNIC Number: ___________________________ Religion: _________________________
5. Domicile District: ______________________ Province: ________________________
6. Gender: [  ] Male   [  ] Female   [  ] Other    Marital Status: ____________
7. Postal Address: ____________________________________________________________
   Mobile No: _________________________ WhatsApp No: _________________________
8. Academic Record:
   | Qualification | Board / University | Passing Year | Marks Obt/Total | % / Div |
   | Matric / SSC  |                    |              |                 |         |
   | FA / FSc / Inter |                 |              |                 |         |
   | BA / BSc / BS |                    |              |                 |         |
   | MA / MSc / MS |                    |              |                 |         |
9. Experience Summary:
   | Organization | Designation | From Date | To Date | Total Period |
   |              |             |           |         |              |

Declaration: I certify that all information submitted is true, complete, and correct.
Applicant Signature: ________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'APPLICATION FOR EMPLOYMENT & RECRUITMENT',
      subHeader: 'Public & Private Sector Job Application Proforma',
      sections: [
        {
          heading: '1. POST & CANDIDATE IDENTITY',
          fields: [
            { label: 'Position / Post Applied For' },
            { label: 'BPS Scale / Job Code' },
            { label: "Candidate's Full Name (BLOCK letters)" },
            { label: "Father's / Husband's Name" },
            { label: 'Date of Birth (DD-MM-YYYY)' },
            { label: 'CNIC Number', valuePlaceholder: '_____-________-_' },
            { label: 'Domicile District' },
            { label: 'Province' }
          ]
        },
        {
          heading: '2. MAILING & CONTACT INFORMATION',
          fields: [
            { label: 'Complete Postal Mailing Address', isLong: true },
            { label: 'Mobile Number 1 (Primary)' },
            { label: 'Mobile Number 2 / WhatsApp' },
            { label: 'Email Address' }
          ]
        },
        {
          heading: '3. ACADEMIC QUALIFICATIONS (Chronological Order)',
          fields: [
            { label: 'Matric / SSC (Board, Year, Marks, Grade)' },
            { label: 'Intermediate / HSSC (Board, Year, Marks, Grade)' },
            { label: 'Graduation / BS / BA (Univ, Year, CGPA/Div)' },
            { label: 'Postgraduation / Master / MS (Univ, Year, CGPA)' }
          ]
        }
      ],
      declarationText: 'I hereby declare that all entries made in this form are correct and true. If any document or information is found false, my candidature may be cancelled immediately.',
      footerNotes: [
        'Enclose attested copies of testimonials, CNIC, Domicile, and 2 photographs.',
        'Helpline Support: 03451291610 (Educare Student & Job Desk)'
      ]
    },
    isPopular: true
  },

  {
    id: 'form-experience-certificate-letter',
    title: 'Professional Experience Certificate & Relieving Letter Template',
    category: 'Jobs & Experience Letters',
    department: 'Human Resources / School & College Administration',
    formCode: 'EXP-LTR-02',
    badge: 'EXPERIENCE LETTER',
    badgeColor: 'bg-purple-100 text-purple-950 border-purple-300',
    description: 'Official formal Experience Letter and Service Certificate template for teachers, lecturers, IT professionals, clerks, and private sector employees.',
    applicableFor: 'Employees requesting service proof for new jobs, PPSC, FPSC, or Promotions',
    feeInfo: 'Free of Cost (Issued by Employer / Administration)',
    processingTime: '1 - 2 Working Days',
    submissionChannel: 'HR / Principal Office Stamp',
    requiredDocuments: [
      'Employee ID Card / Appointment Letter Copy',
      'Clearance / No Dues Slip from Department'
    ],
    instructions: [
      'Ensure starting date and relieving date are clearly mentioned.',
      'Key job responsibilities and satisfactory performance should be stated.'
    ],
    sampleContent: `EXPERIENCE & SERVICE CERTIFICATE
(On Official Institutional Letterhead)

Date: ____/____/2026
Ref No: ______________________

TO WHOM IT MAY CONCERN

This is to certify that Mr./Ms. ________________________________________________
Son/Daughter of ______________________________________________________________
CNIC No: ___________________________ Employee ID: ____________________________
has worked with our organization/institution as: ______________________________
from: ____/____/________ to: ____/____/________ (Total Period: ____ Yrs, ____ Mos).

During his/her tenure with us, he/she performed his/her duties with dedication, integrity, and high professionalism. His/her major responsibilities included:
• __________________________________________________________________________
• __________________________________________________________________________

He/she demonstrated excellent work ethics and maintained cordial relations with colleagues and administration. We have no hesitation in recommending him/her for any future professional assignment.

We wish him/her the best of success in all future pursuits.

Authorized Signatory: _________________________
Designation: __________________________________
Department / Institution: ______________________
Official Stamp & Seal: ________________________`,
    printableTemplate: {
      authority: 'OFFICIAL SERVICE & EXPERIENCE CERTIFICATE',
      subHeader: 'Institutional Human Resources & Employment Verification Branch',
      sections: [
        {
          heading: 'EMPLOYEE & SERVICE DETAILS',
          fields: [
            { label: 'Employee Full Name' },
            { label: "Father's Name" },
            { label: 'CNIC Number' },
            { label: 'Designation / Job Title (e.g. Senior Teacher, IT Officer)' },
            { label: 'Department / Section' },
            { label: 'Date of Joining (DD-MM-YYYY)' },
            { label: 'Date of Relieving / Current Status' },
            { label: 'Total Service Period (Years & Months)' }
          ]
        },
        {
          heading: 'PERFORMANCE & CONDUCT EVALUATION',
          fields: [
            { label: 'Nature of Job (Full-time / Part-time / Contract / Regular)' },
            { label: 'Primary Job Duties & Key Accomplishments', isLong: true },
            { label: 'Conduct & Efficiency Rating', valuePlaceholder: 'Satisfactory [  ] / Excellent [  ]' }
          ]
        }
      ],
      declarationText: 'This certificate is issued on the specific request of the employee without any financial or legal liability on this organization.',
      footerNotes: [
        'Must be printed on official company/school letterhead with authorized stamp.',
        'Helpline Support: 03451291610 (Educare Help Desk Pakistan)'
      ]
    },
    isPopular: true
  },

  {
    id: 'form-govt-noc-jobs',
    title: 'Departmental NOC for In-Service Candidates (FPSC/PPSC/NTS)',
    category: 'Jobs & Experience Letters',
    department: 'Administrative Department / Competent Authority (Govt of Punjab / Federal)',
    formCode: 'GOVT-NOC-03',
    badge: 'DEPT NOC (PPSC/FPSC)',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    description: 'No Objection Certificate (NOC) proforma required by in-service government servants to apply for higher positions through PPSC, FPSC, SPSC, KPPSC, or NTS.',
    applicableFor: 'Government Employees applying for higher posts or competitive exams',
    feeInfo: 'Free of Cost',
    processingTime: '3 - 7 Working Days',
    submissionChannel: 'Through Proper Channel to Appointing Authority',
    requiredDocuments: [
      'Copy of Advertised Job Notice & Application Form',
      'Copy of Current Appointment Order & Joining Report',
      'Copy of CNIC & Employee Pay Slip'
    ],
    instructions: [
      'Submit application through proper channel at least 10 days before commission closing date.',
      'Department certifies no departmental inquiry or disciplinary action is pending.'
    ],
    sampleContent: `DEPARTMENTAL PERMISSION CERTIFICATE (N.O.C.) FOR IN-SERVICE CANDIDATE
(For Application to PPSC / FPSC / Competitive Exams)

1. Name of Candidate: ________________________________________________________
2. Father's Name: ____________________________________________________________
3. CNIC No: ___________________________ Designation: _________________________
4. Present Department / Office: _______________________________________________
5. Nature of Appointment: [  ] Regular   [  ] Contract   [  ] Adhoc
6. Date of Joining Present Service: ____/____/________ BPS Scale: _____________
7. Post Applied For: _________________________________________________________
8. Commission / Testing Agency: [  ] PPSC   [  ] FPSC   [  ] NTS   [  ] Other

CERTIFICATE BY THE APPOINTING AUTHORITY:
It is certified that the above-named employee is working in this department. This department has NO OBJECTION to his/her applying for the above post. In case of his/her selection, he/she will be relieved from his/her duties.

No disciplinary proceedings or inquiry is pending against him/her.

Signature of Appointing Authority: ______________________
Designation: __________________________________________
Office Stamp: _________________________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'GOVERNMENT OF THE PUNJAB / FEDERAL DEPARTMENT',
      subHeader: 'Competent Authority - Departmental Permission & NOC Section',
      sections: [
        {
          heading: '1. EMPLOYEE & CURRENT POST DETAILS',
          fields: [
            { label: "Candidate's Full Name" },
            { label: "Father's Name" },
            { label: 'CNIC Number' },
            { label: 'Current Designation & BPS' },
            { label: 'Name of Department / Institute' },
            { label: 'Date of Initial Appointment' }
          ]
        },
        {
          heading: '2. DETAILS OF POST APPLIED FOR',
          fields: [
            { label: 'Post Applied For (Job Title)' },
            { label: 'Testing Commission (e.g. PPSC, FPSC)' },
            { label: 'Advertisement Number & Case No.' }
          ]
        }
      ],
      declarationText: 'Certified that this department has No Objection to the candidate appearing for the competitive examination and he/she will be relieved upon selection.',
      footerNotes: [
        'Required for PPSC/FPSC interview verification.',
        'Facilitated via Educare Desk: 03451291610'
      ]
    }
  },

  // ==========================================
  // 4. ADMISSIONS & ENROLLMENT
  // ==========================================
  {
    id: 'form-aiou-admission-manual',
    title: 'AIOU Manual Admission & Prospectus Application Form',
    category: 'Admissions & Enrollment',
    department: 'AIOU Directorate of Admissions & Mailing, Islamabad',
    formCode: 'AIOU-ADM-01',
    badge: 'ADMISSION FORM',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    description: 'Standard admission proforma for Matric, FA, I.Com, Certificate courses, and Open Academy offline admissions across Pakistan.',
    applicableFor: 'Fresh & Continuing Students seeking manual admission submission',
    feeInfo: 'As per Program Prospectus (Matric: Rs. 3,500 | FA: Rs. 4,500 approx)',
    processingTime: '15 - 30 Days (Admission Confirmation SMS generated)',
    submissionChannel: 'Designated Bank Branches (ABL/MCB/FWBL/UBL) or Regional Campuses',
    requiredDocuments: [
      'Attested copy of previous result card / Sanad / Middle School pass certificate',
      'Attested copy of CNIC or NADRA B-Form',
      "Attested copy of Father's / Guardian's CNIC",
      '2 Recent Passport size photographs with blue background',
      'Original Paid Bank Challan (AIOU Admission Copy)'
    ],
    instructions: [
      'Write your active mobile phone number carefully; all SMS updates regarding admission confirmation, tutor allocation, and books dispatch are sent on this number.',
      'Do not write overwriting or use correction fluid on course codes.'
    ],
    sampleContent: `ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD
ADMISSION APPLICATION FORM (FRESH / CONTINUING)

Semester: [  ] Autumn   [  ] Spring   Year: 2026   Program: ____________________

1. Applicant Name: ___________________________________________________________
2. Father's Name: ____________________________________________________________
3. CNIC / B-Form No: _______________________ 4. Gender: [ ] Male  [ ] Female
5. Date of Birth: ____/____/________ 6. Marital Status: _______________________
7. Postal Address: ___________________________________________________________
   District: _____________________ Tehsil: __________________ Mobile: _________
8. Permanent Address: ________________________________________________________
9. Courses to be Enrolled in Current Semester:
   | S.# | Course Code | Course Title | Credit Hours |
   |  1  |             |              |              |
   |  2  |             |              |              |
   |  3  |             |              |              |
   |  4  |             |              |              |
10. Bank Challan No: _________________ Amount: Rs. ____________ Date: _________

Applicant Signature: _________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Directorate of Admissions & Mailing (Admission Form)',
      sections: [
        {
          heading: '1. APPLICANT PERSONAL DATA',
          fields: [
            { label: "Applicant's Full Name (in BLOCK letters)" },
            { label: "Father's Name" },
            { label: 'CNIC / NADRA B-Form Number' },
            { label: 'Date of Birth (DD-MM-YYYY)' },
            { label: 'Gender', valuePlaceholder: 'Male [  ] / Female [  ]' },
            { label: 'Email Address' }
          ]
        },
        {
          heading: '2. ADDRESS & CONTACT DETAILS',
          fields: [
            { label: 'Complete Mailing Address for Book Dispatch', isLong: true },
            { label: 'Primary Mobile Number (for AIOU SMS)' },
            { label: 'District & Tehsil' }
          ]
        },
        {
          heading: '3. PROGRAM & COURSE SELECTION',
          fields: [
            { label: 'Program Name (e.g. Matric General, FA, B.Ed)' },
            { label: 'Course Codes Selected (e.g. 201, 202, 316, 386)' },
            { label: 'Total Semester Fee Paid (PKR)' }
          ]
        }
      ],
      declarationText: 'I undertake that all information entered is accurate. I agree to abide by all university rules and regulations.',
      footerNotes: [
        'Deposit fee at any 1Link / ABL / MCB / FWBL branch or via JazzCash / Easypaisa.',
        'Helpline Support: 03451291610 (Educare Help Desk)'
      ]
    },
    isPopular: true
  },

  // ==========================================
  // 5. GENERAL APPLICATIONS & CORRECTIONS
  // ==========================================
  {
    id: 'form-exam-center-change',
    title: 'AIOU Examination Center Change Application Form',
    category: 'General Applications & Corrections',
    department: 'AIOU Controller of Examinations - Conduct Branch',
    formCode: 'AIOU-EXM-02',
    badge: 'CENTER CHANGE',
    badgeColor: 'bg-rose-100 text-rose-950 border-rose-300',
    description: 'Application for changing examination center due to residence transfer, job relocation, or genuine genuine medical / family circumstance.',
    applicableFor: 'Students unable to appear at their currently allocated exam center',
    feeInfo: 'Rs. 1,000 (Prescribed Center Change Fee)',
    processingTime: '5 - 7 Days (Before Start of Exams)',
    submissionChannel: 'Submit to Controller of Examinations at least 15 days before paper start',
    requiredDocuments: [
      'Copy of Current Web Roll Number Slip',
      'Copy of Student CNIC',
      'Proof of Residence / Job Transfer / Marriage Certificate (supporting change of station)',
      'Original Paid Fee Challan'
    ],
    instructions: [
      'Center change within the same city/tehsil is generally not allowed unless special permission is granted.',
      'Must submit application at least 15 days before the commencement of examination.'
    ],
    sampleContent: `APPLICATION FOR CHANGE OF EXAMINATION CENTER
Allama Iqbal Open University, Islamabad

To: The Controller of Examinations, AIOU, Sector H-8, Islamabad.
Subject: Request for Change of Examination Center

1. Student Name: ________________________________ 2. Father Name: ___________________________
3. Roll Number: __________________ 4. Reg / Student ID: ________________ 5. Program: _________
6. Semester: [  ] Autumn   [  ] Spring   Year: 2026
7. Currently Allocated Exam Center: ___________________________________________________________
8. Desired / Proposed Exam Center (City & District): __________________________________________
9. Solid Reason for Change: __________________________________________________________________
10. Contact Mobile No: ________________________ 11. Bank Challan No: _________ Date: _________

Applicant Signature: _________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Controller of Examinations - Examination Conduct & Center Allotment Branch',
      sections: [
        {
          heading: '1. CANDIDATE ACADEMIC RECORD',
          fields: [
            { label: "Student's Full Name" },
            { label: "Father's Name" },
            { label: 'AIOU Roll Number' },
            { label: 'Student ID / Registration ID' },
            { label: 'Program Name' },
            { label: 'Current Allocated Exam Center' }
          ]
        },
        {
          heading: '2. PROPOSED CENTER & JUSTIFICATION',
          fields: [
            { label: 'Requested New Exam Center / City' },
            { label: 'Reason for Center Change (Job / Residence Transfer / Medical)', isLong: true },
            { label: 'Active Mobile / WhatsApp Number' }
          ]
        }
      ],
      declarationText: 'I request that my examination center be shifted to the desired city as I have relocated my residence / workplace.',
      footerNotes: [
        'Attach copy of roll number slip and original bank receipt.',
        'Helpline Support: 03451291610 (Educare Help Desk)'
      ]
    },
    isPopular: true
  },

  {
    id: 'form-paper-rechecking',
    title: 'AIOU Paper Re-Checking / Re-Evaluation Scrutiny Form',
    category: 'General Applications & Corrections',
    department: 'AIOU Examination Department - Secrecy & Scrutiny Branch',
    formCode: 'AIOU-SCR-03',
    badge: 'RE-CHECKING',
    badgeColor: 'bg-amber-100 text-amber-950 border-amber-300',
    description: 'Application for recount and verification of marks, unchecked answers, and totaling accuracy of final examination papers.',
    applicableFor: 'Students dissatisfied with their announced examination marks / grades',
    feeInfo: 'Rs. 1,000 per Course Code',
    processingTime: '15 - 20 Working Days',
    submissionChannel: 'Submit within 15 days of result declaration to Controller Examinations',
    requiredDocuments: [
      'Copy of Announced Result Card / Web Transcript',
      'Copy of CNIC',
      'Original Paid Bank Challan for Rechecking Fee'
    ],
    instructions: [
      'Re-checking includes recounting of marks and ensuring no question remained unmarked.',
      'Re-checking does not mean re-assessment of subjective answer quality as per university statutes.'
    ],
    sampleContent: `APPLICATION FOR RE-CHECKING / RE-EVALUATION OF ANSWER BOOKS
Allama Iqbal Open University, Islamabad

To: The Controller of Examinations, AIOU, Sector H-8, Islamabad.

1. Student Name: _____________________________________________________________
2. Father's Name: ____________________________________________________________
3. Roll No: _______________________ 4. Registration No: ______________________
5. Program: ______________________ 6. Semester Passed: _______________________
7. Course Code(s) for Re-Checking:
   Course 1: ____________ Marks Obt: ______ Course 2: ____________ Marks Obt: ______
   Course 3: ____________ Marks Obt: ______ Course 4: ____________ Marks Obt: ______
8. Total Re-checking Fee Paid: Rs. ________ Challan No: __________ Date: _______
9. Postal Address for Result Dispatch: ________________________________________
   Mobile No: _____________________________

Applicant Signature: _________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Controller of Examinations - Secrecy & Answer Script Scrutiny Branch',
      sections: [
        {
          heading: '1. APPLICANT & RESULT DETAILS',
          fields: [
            { label: 'Student Full Name' },
            { label: "Father's Name" },
            { label: 'Roll Number' },
            { label: 'Registration ID' },
            { label: 'Program Name' },
            { label: 'Course Codes to Re-Check' }
          ]
        },
        {
          heading: '2. RE-CHECKING PARTICULARS',
          fields: [
            { label: 'Total Course Codes Count' },
            { label: 'Fee Paid (PKR)' },
            { label: 'Challan Number & Date' },
            { label: 'Mobile Number for Tracking SMS' }
          ]
        }
      ],
      declarationText: 'I request the recounting and scrutiny of my marked answer script for the courses listed above.',
      footerNotes: [
        'Must be submitted within 15 days of official result announcement.',
        'Helpline Support: 03451291610 (Educare Help Desk)'
      ]
    }
  },

  {
    id: 'form-name-correction',
    title: 'AIOU Student Name & Father Name Correction Proforma',
    category: 'General Applications & Corrections',
    department: 'AIOU Directorate of Admissions - Registration & Correction Branch',
    formCode: 'AIOU-CORR-04',
    badge: 'CORRECTION',
    badgeColor: 'bg-blue-100 text-blue-950 border-blue-300',
    description: 'Application for rectification of spelling mistakes, surname discrepancies, or father name errors in university records.',
    applicableFor: 'Students having spelling mismatches between AIOU records and Matric Certificate / CNIC',
    feeInfo: 'Minor Spelling: Rs. 500 | Complete Name Change: Rs. 1,500',
    processingTime: '10 - 15 Working Days',
    submissionChannel: 'By Post to Incharge Registration Section, Block 4, AIOU Islamabad',
    requiredDocuments: [
      'Original Attested copy of Matric / SSC Sanad (Primary Record)',
      'Attested copy of NADRA CNIC or Smart Card',
      'Affidavit on Stamp Paper (if complete name is changed)',
      'Original Paid Bank Challan'
    ],
    instructions: [
      'Correction is made strictly in accordance with the Matriculation Sanad issued by BISE Board.',
      'Attach all previous semester result cards for updated record generation.'
    ],
    sampleContent: `APPLICATION FOR CORRECTION OF NAME / FATHER'S NAME / DATE OF BIRTH
Allama Iqbal Open University, Islamabad

1. Roll No: ______________________ Registration No: __________________________
2. Program: _____________________ Semester: __________________________________
3. Incorrect Name as per AIOU Record: _________________________________________
4. Correct Name to be Updated (as per Matric Sanad): ___________________________
5. Incorrect Father Name in AIOU Record: ______________________________________
6. Correct Father Name to be Updated: _________________________________________
7. Mobile No: ___________________________ Email: _____________________________
8. Bank Challan No: _____________________ Amount: Rs. ________ Date: _________

Applicant Signature: _________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Directorate of Student Admissions - Registration & Records Correction Branch',
      sections: [
        {
          heading: '1. EXISTING UNIVERSITY RECORD',
          fields: [
            { label: 'Student ID / Roll No' },
            { label: 'Program Name' },
            { label: 'Incorrect Name appearing in AIOU' },
            { label: 'Incorrect Father Name appearing in AIOU' }
          ]
        },
        {
          heading: '2. REQUIRED CORRECT PARTICULARS (AS PER MATRIC SANAD)',
          fields: [
            { label: 'Correct Full Name (to be updated)' },
            { label: 'Correct Father Name (to be updated)' },
            { label: 'CNIC / B-Form Number' },
            { label: 'Mobile Number' }
          ]
        }
      ],
      declarationText: 'I solemnly state that my correct particulars are as per my Matriculation certificate attached herewith.',
      footerNotes: [
        'Enclose attested copy of Matric Certificate & CNIC.',
        'Helpline Support: 03451291610 (Educare Help Desk)'
      ]
    }
  },

  // ==========================================
  // 6. BANK, CHALLANS & FEE REFUNDS
  // ==========================================
  {
    id: 'form-aiou-fee-challan',
    title: 'AIOU Standard 4-Copy Bank Challan Form (1Link / All Banks)',
    category: 'Bank, Challans & Fee Refund',
    department: 'AIOU Treasurer Department & Accounts Branch',
    formCode: 'AIOU-BNK-01',
    badge: 'BANK CHALLAN',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    description: 'Official 4-part deposit slip format (Bank Copy, AIOU Copy, Student Copy, Department Copy) accepted at ABL, MCB, FWBL, UBL, and via 1Link Consumer ID.',
    applicableFor: 'All Fee Payments (Admission, Exam, Degree, Re-checking, Duplicate)',
    feeInfo: 'Free of Cost Template (Pay your designated fee at bank counter)',
    processingTime: 'Instant Bank Stamping & Online Reconciliation',
    submissionChannel: 'Any Allied Bank (ABL), MCB, First Women Bank (FWBL), or UBL branch',
    requiredDocuments: [
      'Student ID / Roll Number or OAS Tracking ID',
      'Valid CNIC Number'
    ],
    instructions: [
      'Generate 1Link Consumer ID on CMS / OAS portal for direct mobile app payment (JazzCash / Easypaisa / Upaisa).',
      'Keep Student Copy and AIOU Copy stamped by bank teller safely.'
    ],
    sampleContent: `ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD
BANK FEE DEPOSIT CHALLAN (4-PART VOUCHER)

Bank Name: [  ] Allied Bank (ABL)   [  ] MCB Bank   [  ] FWBL   [  ] UBL
1Link Consumer ID / Bill No: _________________________________________________

Candidate Name: ______________________________________________________________
Father Name: _________________________________________________________________
CNIC / B-Form No: ___________________________ Roll / Reg ID: _________________
Program Name: ______________________________ Semester: _______________________
Fee Head / Purpose: [  ] Admission Fee   [  ] Degree Fee   [  ] Re-checking   [  ] Other
Total Amount (in Figures): PKR ____________/-
Total Amount (in Words): Rupees _______________________________________________

Bank Cashier Signature & Stamp: ______________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Official 4-Copy Bank Deposit Challan Voucher (Treasurer Office)',
      sections: [
        {
          heading: 'DEPOSITOR & PAYMENT PARTICULARS',
          fields: [
            { label: "Candidate's Full Name" },
            { label: "Father's Name" },
            { label: 'CNIC / B-Form Number' },
            { label: 'Student ID / Roll Number' },
            { label: 'Fee Category / Purpose' },
            { label: 'Total Amount (in Figures & Words)' }
          ]
        }
      ],
      declarationText: 'Accepted for credit to Allama Iqbal Open University account across all authorized 1Link bank branches.',
      footerNotes: [
        'Parts include: 1. Bank Copy, 2. AIOU Copy (submit with form), 3. Student Copy, 4. Accounts Copy.',
        'Helpline Support: 03451291610 (Educare Help Desk)'
      ]
    },
    isPopular: true
  },

  {
    id: 'form-fee-refund-claim',
    title: 'AIOU Fee Refund & Excess Payment Claim Application',
    category: 'Bank, Challans & Fee Refund',
    department: 'AIOU Treasurer Department - Fee Refund & Audit Section',
    formCode: 'AIOU-REF-02',
    badge: 'FEE REFUND',
    badgeColor: 'bg-orange-100 text-orange-950 border-orange-300',
    description: 'Application for refund of fee paid in excess, admission rejection refund, course drop fee reimbursement, or double transaction claims.',
    applicableFor: 'Students who paid double fee or whose admission was cancelled / disallowed',
    feeInfo: 'Refund processed as per university deduction rules (10% - 100%)',
    processingTime: '30 - 45 Working Days',
    submissionChannel: 'Submit with Original Stamped Challan to Treasurer, AIOU Islamabad',
    requiredDocuments: [
      'Original Paid Bank Challan (Student Copy + AIOU Copy)',
      'Copy of Admission Ineligibility / Cancellation letter (if applicable)',
      'Copy of Student CNIC and Cheque/Account Title proof (IBAN)'
    ],
    instructions: [
      'Original paid bank challan is mandatory; duplicate photocopies will not be entertained.',
      'Mention active Bank Account Title and IBAN number for cross-cheque or direct digital transfer.'
    ],
    sampleContent: `APPLICATION FOR REFUND OF ADMISSION / EXAMINATION FEE
Allama Iqbal Open University, Sector H-8, Islamabad

To: The Treasurer, AIOU, Islamabad.
Subject: Request for Refund of University Fee

1. Student Name: ________________________________ 2. Father Name: ___________________________
3. CNIC No: ___________________________ 4. Roll / OAS ID: __________________________________
5. Program & Semester: ______________________________________________________________________
6. Reason for Fee Refund Claim: [  ] Double Payment   [  ] Admission Ineligible   [  ] Dropped
7. Bank Name & Branch where deposited: ______________________________________________________
8. Original Challan No: ________________ Amount Paid: Rs. _________ Date: ___________________
9. Refund Payment Mode (Provide your Bank Account Details):
   Account Title: __________________________________________________________________________
   Bank Name: ___________________________ IBAN: PK__________________________________________
   Mobile Number: _______________________

Applicant Signature: _________________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'ALLAMA IQBAL OPEN UNIVERSITY, ISLAMABAD',
      subHeader: 'Office of the Treasurer - Fee Refund & Audit Branch (Block 2)',
      sections: [
        {
          heading: '1. APPLICANT & CLAIM PARTICULARS',
          fields: [
            { label: "Student's Full Name" },
            { label: "Father's Name" },
            { label: 'CNIC Number' },
            { label: 'Roll / OAS Tracking ID' },
            { label: 'Reason for Refund Claim' }
          ]
        },
        {
          heading: '2. BANK REFUND DISPATCH DETAILS',
          fields: [
            { label: 'Applicant Bank Account Title' },
            { label: 'Bank Name & Branch' },
            { label: '24-Digit IBAN Number', valuePlaceholder: 'PK__ ____ ____ ____ ____ ____' },
            { label: 'Mobile Number for Transfer Notification' }
          ]
        }
      ],
      declarationText: 'I request the refund of the fee deposited by me as detailed above. I have attached the original paid fee challan.',
      footerNotes: [
        'Must attach original paid bank challan.',
        'Helpline Support: 03451291610 (Educare Help Desk)'
      ]
    }
  },

  // ==========================================
  // 7. CIVIC, BIRTH & AFFIDAVITS
  // ==========================================
  {
    id: 'form-birth-certificate-nadra',
    title: 'NADRA & Union Council Birth Certificate Application Proforma',
    category: 'Civic, Birth & Affidavits',
    department: 'Local Government / Union Council / NADRA Facilitation',
    formCode: 'CIV-BRT-01',
    badge: 'BIRTH CERTIFICATE',
    badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300',
    description: 'Official proforma for applying for computerized NADRA Birth Certificate (CBR) or Late Birth Entry Registration at Union Council / Cantonment Board.',
    applicableFor: 'Citizens, Students, and Parents applying for official computerized Birth Certificate',
    feeInfo: 'Standard UC Fee: Rs. 200 - 500 | Late Entry: As per Local Govt Bylaws',
    processingTime: '3 - 7 Working Days',
    submissionChannel: 'Concerned Union Council (Secretary UC) / Cantonment Board Office',
    requiredDocuments: [
      'Copy of Hospital / Doctor / Midwife Birth Discharge Slip',
      "Attested Copy of Father's CNIC and Mother's CNIC",
      "Copy of Grandfather's CNIC (if applicable)",
      'Attested Copy of Parents Nikahnama (Marriage Contract)',
      'Affidavit on Rs. 50/100 E-Stamp Paper (for late birth entry)'
    ],
    instructions: [
      'Spell child name and parents names exactly as on CNIC/Passport.',
      'For late birth entry of adults, attach Matric Sanad as date-of-birth proof.'
    ],
    sampleContent: `UNION COUNCIL / CANTONMENT BOARD
APPLICATION PROFORMA FOR COMPUTERIZED BIRTH CERTIFICATE

1. Child / Applicant Full Name: ______________________________________________
2. Gender: [  ] Male   [  ] Female   [  ] Transgender
3. Date of Birth (in Figures): ____/____/________ (in Words): _________________
4. Place of Birth (Hospital Name / Home Address): _____________________________
   City: ___________________________ District: ________________________________
5. Father's Full Name: _______________________________________________________
   Father's CNIC No: _________________________ Religion: _____________________
6. Mother's Full Name: _______________________________________________________
   Mother's CNIC No: _________________________ Nationality: __________________
7. Grandfather's Name: _______________________________________________________
8. Permanent Address: ________________________________________________________
9. Present Mailing Address: __________________________________________________
   Mobile No: _________________________

Applicant / Parent Signature: __________________ Date: ____/____/2026`,
    printableTemplate: {
      authority: 'LOCAL GOVERNMENT & COMMUNITY DEVELOPMENT DEPARTMENT',
      subHeader: 'Union Council / Cantonment Board - Vital Statistics & Birth Registration Branch',
      sections: [
        {
          heading: '1. PARTICULARS OF THE CHILD / APPLICANT',
          fields: [
            { label: 'Full Name of Child / Person' },
            { label: 'Date of Birth (DD-MM-YYYY)' },
            { label: 'Exact Place of Birth (Hospital / Home Address)' },
            { label: 'City & District of Birth' }
          ]
        },
        {
          heading: '2. PARENTS IDENTIFICATION PARTICULARS',
          fields: [
            { label: "Father's Full Name" },
            { label: "Father's CNIC Number" },
            { label: "Mother's Full Name" },
            { label: "Mother's CNIC Number" },
            { label: 'Permanent Address', isLong: true },
            { label: 'Contact Mobile Number' }
          ]
        }
      ],
      declarationText: 'I solemnly affirm that the particulars given above are true and correct. I request that computerized birth registration be issued.',
      footerNotes: [
        'Attach copies of hospital birth card, parents CNIC, and Nikahnama.',
        'Facilitated via Educare Desk: 03451291610'
      ]
    },
    isPopular: true
  },

  {
    id: 'form-stamp-paper-affidavit',
    title: 'Standard E-Stamp Paper Affidavit (General Declaration / Gap Year)',
    category: 'Civic, Birth & Affidavits',
    department: 'Judicial / Oath Commissioner / Notary Public (Rs. 50/100 E-Stamp)',
    formCode: 'STAMP-AFF-02',
    badge: 'LEGAL AFFIDAVIT',
    badgeColor: 'bg-slate-100 text-slate-900 border-slate-300',
    description: 'Universal legal affidavit template for study gap year explanation, lost educational documents, un-married declaration, or name correction.',
    applicableFor: 'University admissions, job verifications, passport and visa documentation',
    feeInfo: 'E-Stamp Value: Rs. 50 / 100 (plus Oath Commissioner fee Rs. 50)',
    processingTime: 'Instant (Print on E-Stamp and get attested by Oath Commissioner)',
    submissionChannel: 'Any District Courts / Tehsil Oath Commissioner / Notary Public',
    requiredDocuments: [
      'Purchased E-Stamp Paper from Bank of Punjab / E-Stamping Portal',
      'Original CNIC of the Deponent',
      'Supporting documentary proofs (e.g. Matric Sanad, Police report)'
    ],
    instructions: [
      'Print or paste this text onto the generated Punjab e-Stamp Paper.',
      'Sign in the presence of an authorized Oath Commissioner and get it stamped with his judicial seal.'
    ],
    sampleContent: `AFFIDAVIT / SOLEMN DECLARATION
(To be executed on Rs. 50 / 100 E-Stamp Paper)

I, ___________________________________________________________________________
Son / Daughter of: ___________________________________________________________
Resident of: _________________________________________________________________
Holder of CNIC No: ___________________________________________________________
do hereby solemnly affirm and declare on oath as under:

1. That I am a citizen of Pakistan and competent to swear this affidavit.
2. That I completed my [ Matric / Intermediate / Graduation ] in the year ________ under Roll No: ________________ from [ Board / University Name ].
3. That during the gap period from ________ to ________, I did not take admission in any other institution nor was I involved in any illegal / subversive activity.
4. That all my educational testimonials submitted for admission / employment are genuine and authentic.
5. That if any statement made herein is found false, I shall be liable for legal action under the relevant laws.

DEPONENT: __________________________________
CNIC No: ___________________________________ Date: ____/____/2026

VERIFICATION:
Verified on Oath at ______________ on this ____ day of ____________ 2026, that the contents of this affidavit are true and correct to the best of my knowledge and belief and nothing has been concealed.

DEPONENT SIGNATURE: _______________________
ATTESTED BY OATH COMMISSIONER: _____________`,
    printableTemplate: {
      authority: 'LEGAL AFFIDAVIT & SOLEMN DECLARATION',
      subHeader: 'Oath Commissioner & Notary Public Verification Template',
      sections: [
        {
          heading: 'DEPONENT IDENTITY',
          fields: [
            { label: "Deponent's Full Name" },
            { label: "Father's Name" },
            { label: 'CNIC Number', valuePlaceholder: '_____-________-_' },
            { label: 'Residential Address', isLong: true },
            { label: 'Purpose of Affidavit (e.g. Gap Year / Lost Document / Name Discrepancy)' }
          ]
        }
      ],
      declarationText: 'Solemnly affirmed and declared on oath that the facts stated in this affidavit are true and correct.',
      footerNotes: [
        'Must be stamped by an authorized Oath Commissioner or Notary Public.',
        'Helpline Support: 03451291610 (Educare Help Desk Pakistan)'
      ]
    },
    isPopular: true
  }
];
