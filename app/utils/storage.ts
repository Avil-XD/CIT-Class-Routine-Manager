'use client';

import { WeeklyRoutine, RoutineSlot } from '../types';

interface StoredData {
  routines: WeeklyRoutine[];
}

const STORAGE_KEY = 'class-routine-data';

const getInitialData = (): StoredData => {
  if (typeof window === 'undefined') {
    return { routines: [] };
  }
  
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : { routines: [] };
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return { routines: [] };
  }
};

export const saveRoutine = async (routine: WeeklyRoutine): Promise<void> => {
  try {
    const data = getInitialData();
    const existingIndex = data.routines.findIndex(
      r => r.department === routine.department && r.semester === routine.semester
    );

    if (existingIndex >= 0) {
      data.routines[existingIndex] = routine;
    } else {
      data.routines.push(routine);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    throw new Error('Failed to save routine');
  }
};

export const loadData = async (): Promise<StoredData> => {
  return getInitialData();
};

// Get all slots from all routines regardless of department/semester
export const getAllRoutineSlots = async (): Promise<RoutineSlot[]> => {
  const data = getInitialData();
  return data.routines.flatMap(routine => routine.slots);
};

// Find any conflicts at a given time slot
export const findConflictingSlots = async (
  day: string,
  startTime: string
): Promise<RoutineSlot[]> => {
  const allSlots = await getAllRoutineSlots();
  return allSlots.filter(slot => 
    slot.day === day && slot.startTime === startTime
  );
};

// Check if a room is available at a given time
export const isRoomAvailable = async (
  roomNo: string,
  day: string,
  startTime: string,
  excludeSlotId?: string
): Promise<boolean> => {
  const conflictingSlots = await findConflictingSlots(day, startTime);
  return !conflictingSlots.some(slot => 
    slot.roomNo === roomNo && 
    (!excludeSlotId || slot.id !== excludeSlotId)
  );
};

// Check if a teacher is available at a given time
export const isTeacherAvailable = async (
  teacherId: string,
  day: string,
  startTime: string,
  excludeSlotId?: string
): Promise<boolean> => {
  const conflictingSlots = await findConflictingSlots(day, startTime);
  return !conflictingSlots.some(slot => 
    slot.teacherId === teacherId && 
    (!excludeSlotId || slot.id !== excludeSlotId)
  );
};

export const deleteRoutineSlot = async (
  department: string,
  semester: number,
  slotId: string
): Promise<void> => {
  try {
    const data = getInitialData();
    const routineIndex = data.routines.findIndex(
      r => r.department === department && r.semester === semester
    );

    if (routineIndex >= 0) {
      data.routines[routineIndex].slots = data.routines[routineIndex].slots.filter(
        slot => slot.id !== slotId
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error deleting from localStorage:', error);
    throw new Error('Failed to delete routine slot');
  }
};