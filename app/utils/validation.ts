import { RoutineSlot } from '../types';
import { isValidRoom } from '../constants/rooms';
import { isValidTeacher } from '../constants/teachers';

export const validateSlot = (
  slotData: Partial<RoutineSlot>,
  existingSlots: RoutineSlot[],
  editingSlotId?: string
): string | null => {
  // Required field validation
  if (!slotData.day) {
    return 'Day is required';
  }
  if (!slotData.startTime) {
    return 'Start time is required';
  }
  if (!slotData.endTime) {
    return 'End time is required';
  }
  if (!slotData.subjectId) {
    return 'Subject is required';
  }
  if (!slotData.teacherId) {
    return 'Teacher is required';
  }
  if (!slotData.roomNo) {
    return 'Room is required';
  }

  // Validate teacher exists and belongs to the department
  if (!isValidTeacher(slotData.teacherId)) {
    return 'Invalid teacher selected';
  }

  // Validate room exists and is available for the department
  if (!isValidRoom(slotData.roomNo)) {
    return 'Invalid room selected';
  }

  // Check for time conflicts
  const hasTimeConflict = existingSlots.some(slot => {
    // Skip checking against the slot being edited
    if (editingSlotId && slot.id === editingSlotId) {
      return false;
    }

    // Check if slots are on the same day and time
    return slot.day === slotData.day && slot.startTime === slotData.startTime;
  });

  if (hasTimeConflict) {
    return `This time slot (${slotData.day} at ${slotData.startTime}) is already occupied`;
  }

  // Check for teacher conflicts at the same time slot
  const hasTeacherConflict = existingSlots.some(slot => {
    if (editingSlotId && slot.id === editingSlotId) {
      return false;
    }
    return (
      slot.day === slotData.day &&
      slot.startTime === slotData.startTime &&
      slot.teacherId === slotData.teacherId
    );
  });

  if (hasTeacherConflict) {
    const conflictingSlot = existingSlots.find(slot =>
      slot.day === slotData.day &&
      slot.startTime === slotData.startTime &&
      slot.teacherId === slotData.teacherId &&
      (!editingSlotId || slot.id !== editingSlotId)
    );
    return `Teacher ${slotData.teacherId} is already teaching ${conflictingSlot?.department} Sem ${conflictingSlot?.semester} at this time`;
  }

  // Check for room conflicts at the same time slot
  const hasRoomConflict = existingSlots.some(slot => {
    if (editingSlotId && slot.id === editingSlotId) {
      return false;
    }
    return (
      slot.day === slotData.day &&
      slot.startTime === slotData.startTime &&
      slot.roomNo === slotData.roomNo
    );
  });

  if (hasRoomConflict) {
    const conflictingSlot = existingSlots.find(slot =>
      slot.day === slotData.day &&
      slot.startTime === slotData.startTime &&
      slot.roomNo === slotData.roomNo &&
      (!editingSlotId || slot.id !== editingSlotId)
    );
    return `Room ${slotData.roomNo} is already being used by ${conflictingSlot?.department} Sem ${conflictingSlot?.semester} at this time`;
  }

  return null;
};