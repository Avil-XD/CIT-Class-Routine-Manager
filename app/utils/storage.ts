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

export const getAllRoutineSlots = async (): Promise<RoutineSlot[]> => {
  const data = getInitialData();
  return data.routines.flatMap(routine => routine.slots);
};

export const findConflictingSlots = async (
  day: string,
  startTime: string,
  roomNo?: string,
  teacherId?: string,
  excludeSlotId?: string
): Promise<RoutineSlot[]> => {
  const allSlots = await getAllRoutineSlots();
  return allSlots.filter(slot => {
    if (excludeSlotId && slot.id === excludeSlotId) {
      return false;
    }
    
    // Must match day and time slot
    if (slot.day !== day || slot.startTime !== startTime) {
      return false;
    }

    // Check for room or teacher conflicts
    if (roomNo && slot.roomNo === roomNo) return true;
    if (teacherId && slot.teacherId === teacherId) return true;
    
    return false;
  });
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