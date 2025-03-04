import { RoutineSlot } from '../types';

export const validateSlot = (
  slotData: Partial<RoutineSlot>,
  existingSlots: RoutineSlot[],
  editingSlotId?: string
): string | null => {
  if (!slotData.day) {
    return 'Day is required';
  }
  if (!slotData.startTime) {
    return 'Start time is required';
  }
  if (!slotData.subjectId) {
    return 'Subject is required';
  }
  if (!slotData.teacherId) {
    return 'Teacher is required';
  }
  if (!slotData.roomNo) {
    return 'Room number is required';
  }

  // Check for time conflicts
  const hasTimeConflict = existingSlots.some(slot => {
    // Skip checking against the slot being edited
    if (editingSlotId && slot.id === editingSlotId) {
      return false;
    }

    // Check if slots are on the same day and time
    return (
      slot.day === slotData.day &&
      slot.startTime === slotData.startTime
    );
  });

  if (hasTimeConflict) {
    return 'This time slot is already occupied';
  }

  // Check for teacher conflicts (teacher can't be in two places at once)
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
    return 'Teacher is already assigned to another class at this time';
  }

  // Check for room conflicts
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
    return 'Room is already occupied at this time';
  }

  return null;
};