export interface Subject {
  code: string;
  name: string;
  isCompulsory?: boolean;
  elective?: string;
}

export interface RoutineSlot {
  id: string;
  day: string;
  startTime: string;
  endTime?: string;
  subjectId: string;
  teacherId: string;
  roomNo: string;
  semester: number;
  department: string;
}

export interface WeeklyRoutine {
  id: string;
  department: string;
  semester: number;
  slots: RoutineSlot[];
}

interface SemesterSubjects {
  [key: number]: Subject[];
}