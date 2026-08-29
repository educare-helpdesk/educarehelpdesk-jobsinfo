export type ProgramLevel = 'Matric' | 'FA / Intermediate' | 'BA / AD' | 'BS (4-Year)' | 'B.Ed' | 'Master / PGD' | 'M.Phil / MS' | 'Ph.D.';

export interface Course {
  code: string;
  name: string;
  credits: number;
  type: 'Compulsory' | 'Elective' | 'Research / Thesis';
}

export interface ProgramInfo {
  id: string;
  level: ProgramLevel;
  title: string;
  duration: string;
  semesters: number;
  eligibility: string;
  estimatedFeePerSemester: number;
  popularCodes: string[];
  description: string;
  coursesSample: Course[];
}

export interface SolvedAssignmentItem {
  id: string;
  programLevel: ProgramLevel;
  courseCode: string;
  courseTitle: string;
  semester: string;
  assignmentNumber: 1 | 2;
  academicYear: string;
  downloadCount: number;
  isPopular?: boolean;
  summary: string;
  sampleQuestions: { question: string; briefAnswer: string }[];
}

export interface PortalLink {
  title: string;
  description: string;
  url: string;
  iconName: string;
  badge?: string;
}

export interface CoverPageData {
  studentName: string;
  rollNumber: string;
  registrationNumber: string;
  program: string;
  courseCode: string;
  courseTitle: string;
  assignmentNumber: string;
  semester: string;
  tutorName: string;
  tutorAddress: string;
  submissionDate: string;
  studentPhone: string;
}

export interface ServiceInquiry {
  studentName: string;
  phone: string;
  programLevel: ProgramLevel | 'General Inquiry';
  courseCode?: string;
  serviceNeeded: 'Assignment Assistance' | 'Admission Help' | 'Fee Information' | 'Past Papers' | 'LMS / CMS Support' | 'Degree Verification' | 'Other';
  message: string;
}

export interface AiouNewsAlert {
  id: string;
  category: 'Admission' | 'Deadline' | 'Workshop' | 'LMS' | 'HelpDesk';
  tagText: string;
  headline: string;
  detail: string;
  date: string;
  isUrgent?: boolean;
  actionTab?: string;
  linkUrl?: string;
}

export interface FaqItem {
  id: string;
  category: 'Admissions' | 'Exams' | 'Assignments' | 'LMS & CMS' | 'General';
  question: string;
  answer: string;
  tags?: string[];
  helpfulCount?: number;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AcademicUpdateItem {
  id: string;
  title: string;
  category: 'Admissions' | 'Exams & Date Sheets' | 'Results & Gazettes' | 'LMS & Workshops' | 'Tutors & Assignments' | 'BISE & Punjab Boards' | 'HEC & Policies' | 'General';
  badge: string;
  badgeType?: 'urgent' | 'verified' | 'new' | 'info';
  publishedDate: string;
  source: string;
  summary: string;
  keyHighlights: string[];
  actionLabel?: string;
  actionUrl?: string;
  actionTab?: string;
  isUrgent?: boolean;
  tags: string[];
  groundingSources?: GroundingSource[];
}

