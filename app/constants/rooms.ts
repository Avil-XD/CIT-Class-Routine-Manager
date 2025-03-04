import { Room } from '../types';

interface DepartmentRooms {
  classrooms: Room[];
  shared?: Room[];
}

export const DEPARTMENT_ROOMS: Record<string, DepartmentRooms> = {
  CSE: {
    classrooms: [
      { number: 'PG Class Room', name: 'PG Classroom', type: 'classroom' },
      { number: '228', type: 'classroom' },
      { number: '229', type: 'classroom' },
      { number: '230', type: 'classroom' },
      { number: '236', type: 'classroom' },
      { number: '304', type: 'classroom' }
    ],
    shared: [
      { number: 'Computer Lab', name: 'Computer Laboratory', type: 'lab' }
    ]
  },
  ECE: {
    classrooms: [
      { number: '123', type: 'classroom' },
      { number: '124', type: 'classroom' },
      { number: '125', type: 'classroom' }
    ]
  },
  CE: {
    classrooms: [
      { number: '119', type: 'classroom' },
      { number: '121', type: 'classroom' },
      { number: '122', type: 'classroom' }
    ],
    shared: [
      { number: 'Fluid Lab', name: 'Fluid Laboratory', type: 'lab' },
      { number: 'Survey Lab', name: 'Survey Laboratory', type: 'lab' }
    ]
  },
  IE: {
    classrooms: [
      { number: '227', type: 'classroom' },
      { number: '301', type: 'classroom' }
    ]
  },
  IT: {
    classrooms: [] // Shares CSE rooms
  }
};

export const SHARED_LOCATIONS: Room[] = [
  { number: 'PG Room', type: 'classroom' },
  { number: 'Seminar Hall', type: 'seminar' },
  { number: 'G1', name: 'Gallery 1', type: 'gallery' },
  { number: 'G2', name: 'Gallery 2', type: 'gallery' },
  { number: 'G3', name: 'Gallery 3', type: 'gallery' }
];

export const getRoomsForDepartment = (department: string): Room[] => {
  const departmentRooms = DEPARTMENT_ROOMS[department];
  if (!departmentRooms) return [];

  let rooms = [...departmentRooms.classrooms];
  
  // Add shared rooms for the department if any
  if (departmentRooms.shared) {
    rooms = [...rooms, ...departmentRooms.shared];
  }

  // For IT department, include CSE rooms as they share them
  if (department === 'IT') {
    const cseRooms = DEPARTMENT_ROOMS['CSE']?.classrooms || [];
    rooms = [...rooms, ...cseRooms];
  }

  // Add shared locations available to all departments
  return [...rooms, ...SHARED_LOCATIONS];
};

export const isValidRoom = (roomNo: string): boolean => {
  // Check departments
  for (const dept of Object.values(DEPARTMENT_ROOMS)) {
    // Check main classrooms
    if (dept.classrooms.some(room => room.number === roomNo)) {
      return true;
    }
    // Check shared rooms
    if (dept.shared?.some(room => room.number === roomNo)) {
      return true;
    }
  }
  // Check shared locations
  return SHARED_LOCATIONS.some(room => room.number === roomNo);
};