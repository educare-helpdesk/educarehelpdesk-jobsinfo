import { StudentProfile } from '../types';

export const PRESET_STUDENT_PROFILES: StudentProfile[] = [
  {
    id: 'std-usman-bed',
    studentId: '21-BED-04921',
    rollNo: 'CB649201',
    name: 'Muhammad Usman',
    programLevel: 'B.Ed',
    programName: 'B.Ed (1.5 Year) Teacher Education',
    semester: 'Autumn 2026',
    semesterNumber: 2,
    totalSemesters: 3,
    campus: 'Sargodha Regional Campus',
    feeStatus: 'Paid & Verified',
    lmsStatus: 'Active & Enrolled',
    workshopsCompleted: 5,
    workshopsTotal: 6,
    tutorsAllocatedCount: 5,
    tutorsTotalCount: 5,
    rollNoSlipStatus: 'Available Soon',
    courses: [
      {
        code: '8601',
        name: 'General Methods of Teaching',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Submitted',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Prof. Tariq Mehmood',
        tutorCity: 'Sargodha'
      },
      {
        code: '8602',
        name: 'Educational Assessment and Evaluation',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Draft',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Dr. Shahida Parveen',
        tutorCity: 'Bhalwal'
      },
      {
        code: '8603',
        name: 'Curriculum Development',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Pending',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Muhammad Rashid',
        tutorCity: 'Sargodha'
      },
      {
        code: '8605',
        name: 'Educational Leadership and Management',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Pending',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Farhana Kausar',
        tutorCity: 'Khushab'
      },
      {
        code: '8611',
        name: 'Critical Thinking and Reflective Practices',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Pending',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Dr. Ghulam Mustafa',
        tutorCity: 'Sargodha'
      }
    ]
  },
  {
    id: 'std-ayesha-bs',
    studentId: '23-BSE-11840',
    rollNo: 'BZ881420',
    name: 'Ayesha Siddiqa',
    programLevel: 'BS (4-Year)',
    programName: 'BS English Language & Literature',
    semester: 'Autumn 2026',
    semesterNumber: 4,
    totalSemesters: 8,
    campus: 'Islamabad Main Campus / Online',
    feeStatus: 'Paid & Verified',
    lmsStatus: 'Active & Enrolled',
    workshopsCompleted: 6,
    workshopsTotal: 6,
    tutorsAllocatedCount: 4,
    tutorsTotalCount: 4,
    rollNoSlipStatus: 'Available Soon',
    courses: [
      {
        code: '9051',
        name: 'Introduction to Linguistics',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Submitted',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Dr. Humaira Noreen',
        tutorCity: 'Islamabad'
      },
      {
        code: '9053',
        name: 'Classical & Renaissance Drama',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Pending',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Prof. Amjad Ali',
        tutorCity: 'Rawalpindi'
      },
      {
        code: '9054',
        name: '17th & 18th Century English Poetry',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Pending',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Dr. Sadia Rehman',
        tutorCity: 'Lahore'
      },
      {
        code: '1423',
        name: 'Compulsory English-I',
        ass1DueDate: 'Dec 20, 2026',
        ass1Status: 'Draft',
        ass2DueDate: 'Jan 25, 2027',
        ass2Status: 'Pending',
        submissionType: 'LMS Upload (PDF)',
        tutorName: 'Nadeem Akhtar',
        tutorCity: 'Sargodha'
      }
    ]
  },
  {
    id: 'std-hamza-fa',
    studentId: '24-FA-881240',
    rollNo: 'FA992104',
    name: 'Hamza Tariq',
    programLevel: 'FA / Intermediate',
    programName: 'FA (Higher Secondary School Certificate)',
    semester: 'Autumn 2026',
    semesterNumber: 1,
    totalSemesters: 4,
    campus: 'Sargodha Region (Tehsil Kot Moman)',
    feeStatus: 'Paid & Verified',
    lmsStatus: 'Manual Submission',
    workshopsCompleted: 0,
    workshopsTotal: 0,
    tutorsAllocatedCount: 4,
    tutorsTotalCount: 4,
    rollNoSlipStatus: 'Available Soon',
    courses: [
      {
        code: '316',
        name: 'Islamiat (Compulsory)',
        ass1DueDate: 'Nov 15, 2026',
        ass1Status: 'Submitted',
        ass2DueDate: 'Dec 20, 2026',
        ass2Status: 'Draft',
        submissionType: 'By Post / Courier',
        tutorName: 'Hafiz Muhammad Bilal',
        tutorCity: 'Kot Moman'
      },
      {
        code: '317',
        name: 'Pakistan Studies',
        ass1DueDate: 'Nov 15, 2026',
        ass1Status: 'Submitted',
        ass2DueDate: 'Dec 20, 2026',
        ass2Status: 'Pending',
        submissionType: 'By Post / Courier',
        tutorName: 'Muhammad Akram',
        tutorCity: 'Sargodha'
      },
      {
        code: '319',
        name: 'General Science',
        ass1DueDate: 'Nov 15, 2026',
        ass1Status: 'Pending',
        ass2DueDate: 'Dec 20, 2026',
        ass2Status: 'Pending',
        submissionType: 'By Post / Courier',
        tutorName: 'Naveed Iqbal',
        tutorCity: 'Bhalwal'
      },
      {
        code: '386',
        name: 'Compulsory English Part-I',
        ass1DueDate: 'Nov 15, 2026',
        ass1Status: 'Draft',
        ass2DueDate: 'Dec 20, 2026',
        ass2Status: 'Pending',
        submissionType: 'By Post / Courier',
        tutorName: 'Sajid Mehmood',
        tutorCity: 'Sargodha'
      }
    ]
  }
];

const STORAGE_KEY = 'aiou_logged_in_student_profile';

export const getStoredStudentProfile = (): StudentProfile | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Default to Muhammad Usman for immediate at-a-glance demonstration
      return PRESET_STUDENT_PROFILES[0];
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse student profile from localStorage', err);
    return PRESET_STUDENT_PROFILES[0];
  }
};

export const saveStoredStudentProfile = (profile: StudentProfile | null): void => {
  try {
    if (!profile) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  } catch (err) {
    console.error('Failed to save student profile to localStorage', err);
  }
};
