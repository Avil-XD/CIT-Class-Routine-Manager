import { Subject } from '../types';

interface SemesterSubjects {
  [key: number]: Subject[];
}

// Helper function to determine subject type based on code
const getSubjectTypeAndCredits = (code: string, name: string): { type: 'theory' | 'lab' | 'project'; credits: number } => {
  const isLab = /\d{2}7\d$/.test(code);
  const isProject = /project|viva/i.test(name) || code.endsWith('92') || code.endsWith('93') || code.endsWith('94');
  
  if (isProject) return { type: 'project', credits: 4 };
  if (isLab) return { type: 'lab', credits: 1 };
  return { type: 'theory', credits: 3 };
};

const getSemesterFromCode = (code: string): number => {
  const match = code.match(/\d/);
  return match ? parseInt(match[0]) : 1;
};

const CSE_SUBJECTS: SemesterSubjects = {
  1: [
    { code: 'UPH101', name: 'Engineering Physics', type: 'theory', semester: 1, credits: 3 },
    { code: 'UMA101', name: 'Engineering Mathematics-I', type: 'theory', semester: 1, credits: 3 },
    { code: 'UEE101', name: 'Basic Electrical Engineering', type: 'theory', semester: 1, credits: 3 },
    { code: 'UHSS101', name: 'English Communication', type: 'theory', semester: 1, credits: 3 },
    { code: 'UME101', name: 'Engineering Workshop', type: 'theory', semester: 1, credits: 3 },
    { code: 'UPH171', name: 'Engineering Physics Lab', type: 'lab', semester: 1, credits: 1 },
    { code: 'UEE171', name: 'Basic Electrical Engineering Lab', type: 'lab', semester: 1, credits: 1 },
    { code: 'UHSS171', name: 'English Communication Practice', type: 'lab', semester: 1, credits: 1 }
  ],
  2: [
    { code: 'UCH201', name: 'Engineering Chemistry', type: 'theory', semester: 2, credits: 3 },
    { code: 'UMA201', name: 'Engineering Mathematics-II', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCSE201', name: 'Programming for Problem Solving', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCE201', name: 'Engineering Drawing and Computer Graphics', type: 'theory', semester: 2, credits: 3 },
    { code: 'UHSS201', name: 'Professional Ethics and Human Values', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCH271', name: 'Engineering Chemistry Lab', type: 'lab', semester: 2, credits: 1 },
    { code: 'UCSE271', name: 'Programming for Problem Solving Lab', type: 'lab', semester: 2, credits: 1 },
    { code: 'UCE271', name: 'Engineering Drawing and Computer Graphics Lab', type: 'lab', semester: 2, credits: 1 }
  ],
  3: [
    { code: 'UECE306', name: 'Digital Electronics & Logic Design', type: 'theory', semester: 3, credits: 3 },
    { code: 'UCSE301', name: 'Data Structures & Algorithms', type: 'theory', semester: 3, credits: 3 },
    { code: 'UMA302', name: 'Discrete Mathematics', type: 'theory', semester: 3, credits: 3 },
    { code: 'UCSE302', name: 'Elementary Number Theory and Algebra', type: 'theory', semester: 3, credits: 3 },
    { code: 'UCSE303', name: 'Object-Oriented Programming using Java', type: 'theory', semester: 3, credits: 3 },
    { code: 'UCSE373', name: 'Object-Oriented Programming Lab', type: 'lab', semester: 3, credits: 1 },
    { code: 'UCSE371', name: 'Data Structures & Algorithms Lab', type: 'lab', semester: 3, credits: 1 },
    { code: 'UCSE374', name: 'System Software Lab', type: 'lab', semester: 3, credits: 1 }
  ],
  4: [
    { code: 'UCSE401', name: 'Computer Organization & Architecture', type: 'theory', semester: 4, credits: 3 },
    { code: 'UCSE402', name: 'Probability Theory and Random Process', type: 'theory', semester: 4, credits: 3 },
    { code: 'UCSE403', name: 'Design & Analysis of Algorithms', type: 'theory', semester: 4, credits: 3 },
    { code: 'UCSE404', name: 'Database Management Systems', type: 'theory', semester: 4, credits: 3 },
    { code: 'UHSS401', name: 'Engineering Economics', type: 'theory', semester: 4, credits: 3 },
    { code: 'UCH401', name: 'Environmental Sciences', type: 'theory', semester: 4, credits: 3 },
    { code: 'UHSS471', name: 'Language Lab', type: 'lab', semester: 4, credits: 1 },
    { code: 'UCSE473', name: 'Design & Analysis of Algorithms Lab', type: 'lab', semester: 4, credits: 1 },
    { code: 'UCSE474', name: 'Database Management Systems Lab', type: 'lab', semester: 4, credits: 1 }
  ],
  5: [
    { code: 'UCSE501', name: 'Computer Networks', type: 'theory', semester: 5, credits: 3 },
    { code: 'UCSE502', name: 'Operating Systems', type: 'theory', semester: 5, credits: 3 },
    { code: 'UCSE503', name: 'Formal Language & Automata Theory', type: 'theory', semester: 5, credits: 3 },
    { code: 'UCSE510', name: 'Professional Elective-I', type: 'theory', semester: 5, credits: 3 },
    { code: 'UHSS501', name: 'Industrial Management & Entrepreneurship', type: 'theory', semester: 5, credits: 3 },
    { code: 'UCSE571', name: 'Computer Networks Lab', type: 'lab', semester: 5, credits: 1 },
    { code: 'UCSE572', name: 'Operating Systems Lab', type: 'lab', semester: 5, credits: 1 },
    { code: 'UCSE573', name: 'Hardware Laboratory', type: 'lab', semester: 5, credits: 1 }
  ],
  6: [
    { code: 'UCSE601', name: 'Compiler Design', type: 'theory', semester: 6, credits: 3 },
    { code: 'UCSE602', name: 'Software Engineering', type: 'theory', semester: 6, credits: 3 },
    { code: 'UCSE603', name: 'Machine Learning', type: 'theory', semester: 6, credits: 3 },
    { code: 'UCSE610', name: 'Professional Elective-II', type: 'theory', semester: 6, credits: 3 },
    { code: 'UCSE675', name: 'Implementation of Programming Languages Laboratory', type: 'lab', semester: 6, credits: 1 },
    { code: 'UCSE672', name: 'Software Engineering Laboratory', type: 'lab', semester: 6, credits: 1 },
    { code: 'UHSS601', name: 'Professional Communication', type: 'theory', semester: 6, credits: 3 },
    { code: 'UCSE691', name: 'Design Lab', type: 'project', semester: 6, credits: 4 }
  ],
  7: [
    { code: 'UCSE701', name: 'Optimization', type: 'theory', semester: 7, credits: 3 },
    { code: 'UCSE710', name: 'Professional Elective-III', type: 'theory', semester: 7, credits: 3 },
    { code: 'UCSE711', name: 'Professional Elective-IV', type: 'theory', semester: 7, credits: 3 },
    { code: 'UCSE712', name: 'Open Elective-I', type: 'theory', semester: 7, credits: 3 },
    { code: 'UCSE792', name: 'Project I', type: 'project', semester: 7, credits: 4 },
    { code: 'UCSE794', name: 'Industrial Training', type: 'project', semester: 7, credits: 4 }
  ],
  8: [
    { code: 'UCSE810', name: 'Professional Elective-V', type: 'theory', semester: 8, credits: 3 },
    { code: 'UCSE811', name: 'Open Elective-III', type: 'theory', semester: 8, credits: 3 },
    { code: 'UCSE812', name: 'Open Elective-IV', type: 'theory', semester: 8, credits: 3 },
    { code: 'UECE893', name: 'Project II', type: 'project', semester: 8, credits: 4 },
    { code: 'UECE894', name: 'Grand Viva', type: 'project', semester: 8, credits: 4 }
  ]
};

const ECE_SUBJECTS: SemesterSubjects = {
  1: [
    { code: 'UPH101', name: 'Engineering Physics', type: 'theory', semester: 1, credits: 3 },
    { code: 'UMA101', name: 'Engineering Mathematics-I', type: 'theory', semester: 1, credits: 3 },
    { code: 'UEE101', name: 'Basic Electrical Engineering', type: 'theory', semester: 1, credits: 3 },
    { code: 'UHSS101', name: 'English Communication', type: 'theory', semester: 1, credits: 3 },
    { code: 'UME101', name: 'Engineering Workshop', type: 'theory', semester: 1, credits: 3 },
    { code: 'UPH171', name: 'Engineering Physics Lab', type: 'lab', semester: 1, credits: 1 },
    { code: 'UEE171', name: 'Basic Electrical Engineering Lab', type: 'lab', semester: 1, credits: 1 },
    { code: 'UHSS171', name: 'English Communication Practice', type: 'lab', semester: 1, credits: 1 }
  ],
  2: [
    { code: 'UCH201', name: 'Engineering Chemistry', type: 'theory', semester: 2, credits: 3 },
    { code: 'UMA201', name: 'Engineering Mathematics-II', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCSE201', name: 'Programming for Problem Solving', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCE201', name: 'Engineering Drawing and Computer Graphics', type: 'theory', semester: 2, credits: 3 },
    { code: 'UHSS201', name: 'Professional Ethics and Human Values', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCH271', name: 'Engineering Chemistry Lab', type: 'lab', semester: 2, credits: 1 },
    { code: 'UCSE271', name: 'Programming for Problem Solving Lab', type: 'lab', semester: 2, credits: 1 },
    { code: 'UCE271', name: 'Engineering Drawing and Computer Graphics Lab', type: 'lab', semester: 2, credits: 1 }
  ],
  3: [
    { code: 'UECE301', name: 'Electronic Devices', type: 'theory', semester: 3, credits: 3 },
    { code: 'UECE302', name: 'Digital System Design', type: 'theory', semester: 3, credits: 3 },
    { code: 'UECE303', name: 'Signals and Systems', type: 'theory', semester: 3, credits: 3 },
    { code: 'UECE304', name: 'Network Theory', type: 'theory', semester: 3, credits: 3 },
    { code: 'UCSE306', name: 'Data Structures Using C', type: 'theory', semester: 3, credits: 3 },
    { code: 'UECE305', name: 'Indian Constitution (MC)', type: 'theory', semester: 3, credits: 3 },
    { code: 'UECE371', name: 'Devices & Network Lab', type: 'lab', semester: 3, credits: 1 },
    { code: 'UECE372', name: 'Digital System Design Lab', type: 'lab', semester: 3, credits: 1 },
    { code: 'UCSE376', name: 'Data Structures Using C Lab', type: 'lab', semester: 3, credits: 1 },
    { code: 'UHSS371', name: 'Group Discussion', type: 'lab', semester: 3, credits: 1 }
  ],
  4: [
    { code: 'UECE401', name: 'Analog Communication', type: 'theory', semester: 4, credits: 3 },
    { code: 'UECE402', name: 'Analog Circuits', type: 'theory', semester: 4, credits: 3 },
    { code: 'UECE403', name: 'Microcontrollers', type: 'theory', semester: 4, credits: 3 },
    { code: 'UMA401', name: 'Numerical Methods & Computer Programming', type: 'theory', semester: 4, credits: 3 },
    { code: 'UCSE401', name: 'Database Management System', type: 'theory', semester: 4, credits: 3 },
    { code: 'UECE471', name: 'Communication Engineering Lab', type: 'lab', semester: 4, credits: 1 },
    { code: 'UECE472', name: 'Analog Circuits Lab', type: 'lab', semester: 4, credits: 1 },
    { code: 'UECE473', name: 'Microcontrollers Lab', type: 'lab', semester: 4, credits: 1 },
    { code: 'UMA471', name: 'Numerical Methods & Computer Programming Lab', type: 'lab', semester: 4, credits: 1 }
  ],
  5: [
    { code: 'UECE501', name: 'Electromagnetic Waves', type: 'theory', semester: 5, credits: 3 },
    { code: 'UECE502', name: 'Control Systems', type: 'theory', semester: 5, credits: 3 },
    { code: 'UECE503', name: 'Digital Communication Systems & Stochastic Process', type: 'theory', semester: 5, credits: 3 },
    { code: 'UECE504', name: 'Digital Signal Processing', type: 'theory', semester: 5, credits: 3 },
    { code: 'UECE515', name: 'Professional Elective-I', type: 'theory', semester: 5, credits: 3 },
    { code: 'UECE516', name: 'Professional Elective-II', type: 'theory', semester: 5, credits: 3 },
    { code: 'UECE571', name: 'Electromagnetic Waves Lab', type: 'lab', semester: 5, credits: 1 },
    { code: 'UECE574', name: 'Digital Signal Processing Lab', type: 'lab', semester: 5, credits: 1 }
  ]
};

const CE_SUBJECTS: SemesterSubjects = {
  1: [
    { code: 'UPH101', name: 'Engineering Physics', type: 'theory', semester: 1, credits: 3 },
    { code: 'UMA101', name: 'Engineering Mathematics-I', type: 'theory', semester: 1, credits: 3 },
    { code: 'UEE101', name: 'Basic Electrical Engineering', type: 'theory', semester: 1, credits: 3 },
    { code: 'UHSS101', name: 'English Communication', type: 'theory', semester: 1, credits: 3 },
    { code: 'UME101', name: 'Engineering Workshop', type: 'theory', semester: 1, credits: 3 },
    { code: 'UPH171', name: 'Engineering Physics Lab', type: 'lab', semester: 1, credits: 1 },
    { code: 'UEE171', name: 'Basic Electrical Engineering Lab', type: 'lab', semester: 1, credits: 1 },
    { code: 'UHSS171', name: 'English Communication Practice', type: 'lab', semester: 1, credits: 1 },
    { code: 'UME171', name: 'Workshop Practice', type: 'lab', semester: 1, credits: 1 }
  ],
  2: [
    { code: 'UCH201', name: 'Engineering Chemistry', type: 'theory', semester: 2, credits: 3 },
    { code: 'UMA201', name: 'Engineering Mathematics-II', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCSE201', name: 'Programming for Problem Solving', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCE201', name: 'Engineering Drawing & Computer Graphics', type: 'theory', semester: 2, credits: 3 },
    { code: 'UHSS201', name: 'Professional Ethics and Human Values', type: 'theory', semester: 2, credits: 3 },
    { code: 'UCH271', name: 'Engineering Chemistry Lab', type: 'lab', semester: 2, credits: 1 },
    { code: 'UCSE271', name: 'Programming for Problem Solving Lab', type: 'lab', semester: 2, credits: 1 },
    { code: 'UCE271', name: 'Engineering Drawing & Computer Graphics Lab', type: 'lab', semester: 2, credits: 1 }
  ]
};

export const getSubjectsForSemester = (department: string, semester: number): Subject[] => {
  switch (department) {
    case 'CE':
      return CE_SUBJECTS[semester] || [];
    case 'ECE':
      return ECE_SUBJECTS[semester] || [];
    case 'CSE':
      return CSE_SUBJECTS[semester] || [];
    default:
      return [];
  }
};

export const getSubjectName = (code: string): string => {
  const allSubjects: Subject[] = [
    ...Object.values(CE_SUBJECTS).flat(),
    ...Object.values(ECE_SUBJECTS).flat(),
    ...Object.values(CSE_SUBJECTS).flat()
  ];
  const subject = allSubjects.find(s => s.code === code);
  return subject ? `${subject.code} - ${subject.name}` : code;
};