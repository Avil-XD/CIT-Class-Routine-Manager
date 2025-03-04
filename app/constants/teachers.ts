import { Teacher } from '../types';

export const DEPARTMENT_TEACHERS: Record<string, Teacher[]> = {
  CSE: [
    { id: 'APS', name: 'APS', department: 'CSE' },
    { id: 'RNM', name: 'RNM', department: 'CSE' },
    { id: 'PSB', name: 'PSB', department: 'CSE' },
    { id: 'HKK', name: 'HKK', department: 'CSE' },
    { id: 'PKS', name: 'PKS', department: 'CSE' },
    { id: 'SJN', name: 'SJN', department: 'CSE' },
    { id: 'BKC', name: 'BKC', department: 'CSE' },
    { id: 'RJP', name: 'RJP', department: 'CSE' },
    { id: 'MDB', name: 'MDB', department: 'CSE' },
    { id: 'DKR', name: 'DKR', department: 'CSE' },
    { id: 'AN', name: 'AN', department: 'CSE' }
  ],
  ECE: [
    { id: 'NMD', name: 'NMD', department: 'ECE' },
    { id: 'ATP', name: 'ATP', department: 'ECE' },
    { id: 'BBP', name: 'BBP', department: 'ECE' },
    { id: 'KKP', name: 'KKP', department: 'ECE' },
    { id: 'HDC', name: 'HDC', department: 'ECE' },
    { id: 'RJC', name: 'RJC', department: 'ECE' },
    { id: 'SNB', name: 'SNB', department: 'ECE' },
    { id: 'ADM', name: 'ADM', department: 'ECE' }
  ],
  CE: [
    { id: 'YCO', name: 'YCO', department: 'CE' },
    { id: 'AKD', name: 'AKD', department: 'CE' },
    { id: 'RMH', name: 'RMH', department: 'CE' },
    { id: 'PJB', name: 'PJB', department: 'CE' },
    { id: 'BRS', name: 'BRS', department: 'CE' },
    { id: 'OMP', name: 'OMP', department: 'CE' },
    { id: 'MMG', name: 'MMG', department: 'CE' },
    { id: 'NLD', name: 'NLD', department: 'CE' }
  ],
  IE: [
    { id: 'RJD', name: 'RJD', department: 'IE' },
    { id: 'BK', name: 'BK', department: 'IE' },
    { id: 'KDS', name: 'KDS', department: 'IE' },
    { id: 'DPD', name: 'DPD', department: 'IE' },
    { id: 'TKM', name: 'TKM', department: 'IE' },
    { id: 'GNR', name: 'GNR', department: 'IE' }
  ]
};

export const getTeachersForDepartment = (department: string): Teacher[] => {
  return DEPARTMENT_TEACHERS[department] || [];
};

export const isValidTeacher = (teacherId: string): boolean => {
  return Object.values(DEPARTMENT_TEACHERS).some(
    teachers => teachers.some(teacher => teacher.id === teacherId)
  );
};