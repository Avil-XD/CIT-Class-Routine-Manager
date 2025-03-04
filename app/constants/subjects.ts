import { Subject } from '../types';

interface SemesterSubjects {
  [key: number]: Subject[];
}

const CSE_SUBJECTS: SemesterSubjects = {
  1: [
    { code: 'UPH101', name: 'Engineering Physics', isCompulsory: true },
    { code: 'UMA101', name: 'Engineering Mathematics-I', isCompulsory: true },
    { code: 'UEE101', name: 'Basic Electrical Engineering', isCompulsory: true },
    { code: 'UHSS101', name: 'English Communication', isCompulsory: true },
    { code: 'UME101', name: 'Engineering Workshop', isCompulsory: true },
    { code: 'UPH171', name: 'Engineering Physics Lab', isCompulsory: true },
    { code: 'UEE171', name: 'Basic Electrical Engineering Lab', isCompulsory: true },
    { code: 'UHSS171', name: 'English Communication Practice', isCompulsory: true }
  ],
  2: [
    { code: 'UCH201', name: 'Engineering Chemistry', isCompulsory: true },
    { code: 'UMA201', name: 'Engineering Mathematics-II', isCompulsory: true },
    { code: 'UCSE201', name: 'Programming for Problem Solving', isCompulsory: true },
    { code: 'UCE201', name: 'Engineering Drawing and Computer Graphics', isCompulsory: true },
    { code: 'UHSS201', name: 'Professional Ethics and Human Values', isCompulsory: true },
    { code: 'UCH271', name: 'Engineering Chemistry Lab', isCompulsory: true },
    { code: 'UCSE271', name: 'Programming for Problem Solving Lab', isCompulsory: true },
    { code: 'UCE271', name: 'Engineering Drawing and Computer Graphics Lab', isCompulsory: true }
  ],
  3: [
    { code: 'UECE306', name: 'Digital Electronics & Logic Design', isCompulsory: true },
    { code: 'UCSE301', name: 'Data Structures & Algorithms', isCompulsory: true },
    { code: 'UMA302', name: 'Discrete Mathematics', isCompulsory: true },
    { code: 'UCSE302', name: 'Elementary Number Theory and Algebra', isCompulsory: true },
    { code: 'UCSE303', name: 'Object-Oriented Programming using Java', isCompulsory: true },
    { code: 'UCSE373', name: 'Object-Oriented Programming Lab', isCompulsory: true },
    { code: 'UCSE371', name: 'Data Structures & Algorithms Lab', isCompulsory: true },
    { code: 'UCSE374', name: 'System Software Lab', isCompulsory: true }
  ],
  4: [
    { code: 'UCSE401', name: 'Computer Organization & Architecture', isCompulsory: true },
    { code: 'UCSE402', name: 'Probability Theory and Random Process', isCompulsory: true },
    { code: 'UCSE403', name: 'Design & Analysis of Algorithms', isCompulsory: true },
    { code: 'UCSE404', name: 'Database Management Systems', isCompulsory: true },
    { code: 'UHSS401', name: 'Engineering Economics', isCompulsory: true },
    { code: 'UCH401', name: 'Environmental Sciences', isCompulsory: true },
    { code: 'UHSS471', name: 'Language Lab', isCompulsory: true },
    { code: 'UCSE473', name: 'Design & Analysis of Algorithms Lab', isCompulsory: true },
    { code: 'UCSE474', name: 'Database Management Systems Lab', isCompulsory: true }
  ],
  5: [
    { code: 'UCSE501', name: 'Computer Networks', isCompulsory: true },
    { code: 'UCSE502', name: 'Operating Systems', isCompulsory: true },
    { code: 'UCSE503', name: 'Formal Language & Automata Theory', isCompulsory: true },
    { code: 'UCSE510', name: 'Professional Elective-I', elective: 'I' },
    { code: 'UHSS501', name: 'Industrial Management & Entrepreneurship', isCompulsory: true },
    { code: 'UCSE571', name: 'Computer Networks Lab', isCompulsory: true },
    { code: 'UCSE572', name: 'Operating Systems Lab', isCompulsory: true },
    { code: 'UCSE573', name: 'Hardware Laboratory', isCompulsory: true }
  ],
  6: [
    { code: 'UCSE601', name: 'Compiler Design', isCompulsory: true },
    { code: 'UCSE602', name: 'Software Engineering', isCompulsory: true },
    { code: 'UCSE603', name: 'Machine Learning', isCompulsory: true },
    { code: 'UCSE610', name: 'Professional Elective-II', elective: 'II' },
    { code: 'UCSE675', name: 'Implementation of Programming Languages Laboratory', isCompulsory: true },
    { code: 'UCSE672', name: 'Software Engineering Laboratory', isCompulsory: true },
    { code: 'UHSS601', name: 'Professional Communication', isCompulsory: true },
    { code: 'UCSE691', name: 'Design Lab', isCompulsory: true }
  ],
  7: [
    { code: 'UCSE701', name: 'Optimization', isCompulsory: true },
    { code: 'UCSE710', name: 'Professional Elective-III', elective: 'III' },
    { code: 'UCSE711', name: 'Professional Elective-IV', elective: 'IV' },
    { code: 'UCSE712', name: 'Open Elective-I', elective: 'Open' },
    { code: 'UCSE792', name: 'Project I', isCompulsory: true },
    { code: 'UCSE794', name: 'Industrial Training', isCompulsory: true }
  ],
  8: [
    { code: 'UCSE810', name: 'Professional Elective-V', elective: 'V' },
    { code: 'UCSE811', name: 'Open Elective-III', elective: 'Open' },
    { code: 'UCSE812', name: 'Open Elective-IV', elective: 'Open' },
    { code: 'UECE893', name: 'Project II', isCompulsory: true },
    { code: 'UECE894', name: 'Grand Viva', isCompulsory: true }
  ]
};

const ECE_SUBJECTS: SemesterSubjects = {
  1: [
    { code: 'UPH101', name: 'Engineering Physics', isCompulsory: true },
    { code: 'UMA101', name: 'Engineering Mathematics-I', isCompulsory: true },
    { code: 'UEE101', name: 'Basic Electrical Engineering', isCompulsory: true },
    { code: 'UHSS101', name: 'English Communication', isCompulsory: true },
    { code: 'UME101', name: 'Engineering Workshop', isCompulsory: true },
    { code: 'UPH171', name: 'Engineering Physics Lab', isCompulsory: true },
    { code: 'UEE171', name: 'Basic Electrical Engineering Lab', isCompulsory: true },
    { code: 'UHSS171', name: 'English Communication Practice', isCompulsory: true }
  ],
  2: [
    { code: 'UCH201', name: 'Engineering Chemistry', isCompulsory: true },
    { code: 'UMA201', name: 'Engineering Mathematics-II', isCompulsory: true },
    { code: 'UCSE201', name: 'Programming for Problem Solving', isCompulsory: true },
    { code: 'UCE201', name: 'Engineering Drawing and Computer Graphics', isCompulsory: true },
    { code: 'UHSS201', name: 'Professional Ethics and Human Values', isCompulsory: true },
    { code: 'UCH271', name: 'Engineering Chemistry Lab', isCompulsory: true },
    { code: 'UCSE271', name: 'Programming for Problem Solving Lab', isCompulsory: true },
    { code: 'UCE271', name: 'Engineering Drawing and Computer Graphics Lab', isCompulsory: true }
  ],
  3: [
    { code: 'UECE301', name: 'Electronic Devices', isCompulsory: true },
    { code: 'UECE302', name: 'Digital System Design', isCompulsory: true },
    { code: 'UECE303', name: 'Signals and Systems', isCompulsory: true },
    { code: 'UECE304', name: 'Network Theory', isCompulsory: true },
    { code: 'UCSE306', name: 'Data Structures Using C', isCompulsory: true },
    { code: 'UECE305', name: 'Indian Constitution (MC)', isCompulsory: true },
    { code: 'UECE371', name: 'Devices & Network Lab', isCompulsory: true },
    { code: 'UECE372', name: 'Digital System Design Lab', isCompulsory: true },
    { code: 'UCSE376', name: 'Data Structures Using C Lab', isCompulsory: true },
    { code: 'UHSS371', name: 'Group Discussion', isCompulsory: true }
  ],
  4: [
    { code: 'UECE401', name: 'Analog Communication', isCompulsory: true },
    { code: 'UECE402', name: 'Analog Circuits', isCompulsory: true },
    { code: 'UECE403', name: 'Microcontrollers', isCompulsory: true },
    { code: 'UMA401', name: 'Numerical Methods & Computer Programming', isCompulsory: true },
    { code: 'UCSE401', name: 'Database Management System', isCompulsory: true },
    { code: 'UECE471', name: 'Communication Engineering Lab', isCompulsory: true },
    { code: 'UECE472', name: 'Analog Circuits Lab', isCompulsory: true },
    { code: 'UECE473', name: 'Microcontrollers Lab', isCompulsory: true },
    { code: 'UMA471', name: 'Numerical Methods & Computer Programming Lab', isCompulsory: true }
  ],
  5: [
    { code: 'UECE501', name: 'Electromagnetic Waves', isCompulsory: true },
    { code: 'UECE502', name: 'Control Systems', isCompulsory: true },
    { code: 'UECE503', name: 'Digital Communication Systems & Stochastic Process', isCompulsory: true },
    { code: 'UECE504', name: 'Digital Signal Processing', isCompulsory: true },
    { code: 'UECE515', name: 'Nano Electronics', elective: 'I' },
    { code: 'UECE515', name: 'System Design using HDL', elective: 'I' },
    { code: 'UECE515', name: 'Linear IC and Systems', elective: 'I' },
    { code: 'UECE516', name: 'Bio-Medical Electronics', elective: 'II' },
    { code: 'UECE516', name: 'Introduction to MEMS', elective: 'II' },
    { code: 'UECE516', name: 'Optimization Theory', elective: 'II' },
    { code: 'UECE571', name: 'Electromagnetic Waves Lab', isCompulsory: true },
    { code: 'UECE574', name: 'Digital Signal Processing Lab', isCompulsory: true }
  ]
};

const CE_SUBJECTS: SemesterSubjects = {
  1: [
    { code: 'UPH101', name: 'Engineering Physics', isCompulsory: true },
    { code: 'UMA101', name: 'Engineering Mathematics-I', isCompulsory: true },
    { code: 'UEE101', name: 'Basic Electrical Engineering', isCompulsory: true },
    { code: 'UHSS101', name: 'English Communication', isCompulsory: true },
    { code: 'UME101', name: 'Engineering Workshop', isCompulsory: true },
    { code: 'UPH171', name: 'Engineering Physics Lab', isCompulsory: true },
    { code: 'UEE171', name: 'Basic Electrical Engineering Lab', isCompulsory: true },
    { code: 'UHSS171', name: 'English Communication Practice', isCompulsory: true },
    { code: 'UME171', name: 'Workshop Practice', isCompulsory: true }
  ],
  2: [
    { code: 'UCH201', name: 'Engineering Chemistry', isCompulsory: true },
    { code: 'UMA201', name: 'Engineering Mathematics-II', isCompulsory: true },
    { code: 'UCSE201', name: 'Programming for Problem Solving', isCompulsory: true },
    { code: 'UCE201', name: 'Engineering Drawing & Computer Graphics', isCompulsory: true },
    { code: 'UHSS201', name: 'Professional Ethics and Human Values', isCompulsory: true },
    { code: 'UCH271', name: 'Engineering Chemistry Lab', isCompulsory: true },
    { code: 'UCSE271', name: 'Programming for Problem Solving Lab', isCompulsory: true },
    { code: 'UCE271', name: 'Engineering Drawing & Computer Graphics Lab', isCompulsory: true }
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
  const electiveInfo = subject?.elective ? ` (${subject.elective === 'Open' ? 'Open Elective' : `Professional Elective-${subject.elective}`})` : '';
  const compulsoryInfo = subject?.isCompulsory ? ' (Compulsory)' : '';
  return subject ? `${subject.code} - ${subject.name}${compulsoryInfo}${electiveInfo}` : code;
};