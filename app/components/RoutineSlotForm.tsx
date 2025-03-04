'use client';

import { useState, useEffect } from 'react';
import { RoutineSlot, Subject, Room, Teacher, TimeSlot } from '../types';
import { validateSlot } from '../utils/validation';
import { timeSlots, weekDays } from '../constants/timeSlots';
import { getRoomsForDepartment } from '../constants/rooms';
import { getTeachersForDepartment } from '../constants/teachers';
import { findConflictingSlots } from '../utils/storage';

interface FormData extends Partial<RoutineSlot> {
  startTime: string;
  endTime: string;
}

interface RoutineSlotFormProps {
  initialData?: Partial<RoutineSlot>;
  onSubmit: (data: Partial<RoutineSlot>) => void;
  onCancel: () => void;
  existingSlots: RoutineSlot[];
  availableSubjects: Subject[];
}

export default function RoutineSlotForm({
  initialData,
  onSubmit,
  onCancel,
  existingSlots,
  availableSubjects
}: RoutineSlotFormProps) {
  const [formData, setFormData] = useState<FormData>(
    initialData ? {
      ...initialData,
      startTime: initialData.startTime || '',
      endTime: initialData.endTime || ''
    } : {
      day: '',
      startTime: '',
      endTime: '',
      subjectId: '',
      teacherId: '',
      roomNo: '',
      semester: 1,
      department: ''
    }
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableRooms, setAvailableRooms] = useState<Room[]>([]);
  const [availableTeachers, setAvailableTeachers] = useState<Teacher[]>([]);

  // Update available rooms and teachers when department changes
  useEffect(() => {
    setError(null);
    if (formData.department) {
      setAvailableRooms(getRoomsForDepartment(formData.department));
      setAvailableTeachers(getTeachersForDepartment(formData.department));
    }
  }, [formData.department]);

  // Check for conflicts and update room/teacher selection
  useEffect(() => {
    if (formData.day && formData.startTime) {
      // Clear room if it's occupied
      const isRoomOccupied = formData.roomNo && existingSlots.some(
        slot =>
          slot.roomNo === formData.roomNo &&
          slot.day === formData.day &&
          slot.startTime === formData.startTime &&
          (!initialData?.id || slot.id !== initialData.id)
      );
      if (isRoomOccupied) {
        setFormData(prev => ({ ...prev, roomNo: '' }));
      }

      // Clear teacher if they have another class
      const isTeacherOccupied = formData.teacherId && existingSlots.some(
        slot =>
          slot.teacherId === formData.teacherId &&
          slot.day === formData.day &&
          slot.startTime === formData.startTime &&
          (!initialData?.id || slot.id !== initialData.id)
      );
      if (isTeacherOccupied) {
        setFormData(prev => ({ ...prev, teacherId: '' }));
      }
    }
  }, [formData.day, formData.startTime, existingSlots, initialData?.id]);

  const [roomConflicts, setRoomConflicts] = useState<RoutineSlot[]>([]);
  const [teacherConflicts, setTeacherConflicts] = useState<RoutineSlot[]>([]);

  // Update conflicts when day/time/room/teacher changes
  useEffect(() => {
    const updateConflicts = async () => {
      if (formData.day && formData.startTime) {
        try {
          const slots = await findConflictingSlots(
            formData.day,
            formData.startTime,
            formData.roomNo || undefined,
            formData.teacherId || undefined,
            initialData?.id
          );
          
          setRoomConflicts(slots.filter(slot => slot.roomNo === formData.roomNo));
          setTeacherConflicts(slots.filter(slot => slot.teacherId === formData.teacherId));
        } catch (error) {
          console.error('Error checking conflicts:', error);
          setRoomConflicts([]);
          setTeacherConflicts([]);
        }
      } else {
        setRoomConflicts([]);
        setTeacherConflicts([]);
      }
    };
    
    updateConflicts();
  }, [formData.day, formData.startTime, formData.roomNo, formData.teacherId, initialData?.id]);

  const isRoomOccupied = (room: Room): boolean => {
    return roomConflicts.some(slot => slot.roomNo === room.number);
  };

  const getRoomOccupiedInfo = (room: Room): string => {
    const occupyingSlots = roomConflicts.filter(slot => slot.roomNo === room.number);
    if (occupyingSlots.length === 0) return '';
    
    return ' - Already used in: ' + occupyingSlots.map(slot =>
      `${slot.day} at ${slot.startTime} (${slot.department} Sem ${slot.semester})`
    ).join(', ');
  };

  const isTeacherOccupied = (teacher: Teacher): boolean => {
    return teacherConflicts.some(slot => slot.teacherId === teacher.id);
  };

  const getTeacherOccupiedInfo = (teacher: Teacher): string => {
    const occupyingSlots = teacherConflicts.filter(slot => slot.teacherId === teacher.id);
    if (occupyingSlots.length === 0) return '';
    
    return ' - Already teaching: ' + occupyingSlots.map(slot =>
      `${slot.day} at ${slot.startTime} (${slot.department} Sem ${slot.semester})`
    ).join(', ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const validationError = validateSlot(
      formData,
      existingSlots,
      initialData?.id
    );

    if (validationError) {
      setError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      onSubmit(formData);
    } catch (err) {
      setError('Failed to save routine slot. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = "mt-1 block w-full rounded-md border border-gray-600 p-2 bg-gray-700 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400";
  const labelClassName = "block text-sm font-medium text-gray-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-800 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">
          {initialData ? 'Edit Routine Slot' : 'Add New Routine Slot'}
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 text-red-200 rounded-md mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Day</label>
          <select
            value={formData.day}
            onChange={(e) => setFormData({ ...formData, day: e.target.value })}
            className={inputClassName}
            required
          >
            <option value="">Select Day</option>
            {weekDays.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName}>Time Slot</label>
          <select
            value={formData.startTime}
            onChange={(e) => {
              const selectedSlot = timeSlots.find(slot => slot.start === e.target.value);
              setFormData({
                ...formData,
                startTime: selectedSlot?.start || '',
                endTime: selectedSlot?.end || ''
              });
            }}
            className={inputClassName}
            required
          >
            <option value="">Select Time</option>
            {timeSlots.map(slot => (
              <option key={slot.start} value={slot.start}>{slot.display}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className={labelClassName}>Subject</label>
          <select
            value={formData.subjectId}
            onChange={(e) => setFormData({ ...formData, subjectId: e.target.value })}
            className={inputClassName}
            required
          >
            <option value="">Select Subject</option>
            {availableSubjects.map(subject => (
              <option 
                key={subject.code} 
                value={subject.code}
                className={subject.isCompulsory ? 'font-bold' : ''}
              >
                {subject.code} - {subject.name}
                {subject.isCompulsory ? ' (Compulsory)' : ''}
                {subject.elective ? ` (${subject.elective === 'Open' ? 'Open Elective' : `Professional Elective-${subject.elective}`})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName}>Room</label>
          <select
            value={formData.roomNo}
            onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
            className={inputClassName}
            required
            disabled={!formData.department}
          >
            <option value="">Select Room</option>
            {availableRooms.map(room => (
              <option
                key={room.number}
                value={room.number}
                disabled={isRoomOccupied(room)}
                className={isRoomOccupied(room) ? 'bg-red-900/30 text-gray-500 cursor-not-allowed' : undefined}
                style={isRoomOccupied(room) ? { display: 'none' } : undefined}
              >
                {room.name || room.number}
                {room.type === 'lab' ? ' (Lab)' :
                 room.type === 'seminar' ? ' (Seminar Hall)' :
                 room.type === 'gallery' ? ' (Gallery)' : ''}
                {isRoomOccupied(room) ? getRoomOccupiedInfo(room) : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClassName}>Teacher</label>
          <select
            value={formData.teacherId}
            onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
            className={inputClassName}
            required
            disabled={!formData.department}
          >
            <option value="">Select Teacher</option>
            {availableTeachers.map(teacher => (
              <option
                key={teacher.id}
                value={teacher.id}
                disabled={isTeacherOccupied(teacher)}
                className={isTeacherOccupied(teacher) ? 'bg-red-900/30 text-gray-500 cursor-not-allowed' : undefined}
                style={isTeacherOccupied(teacher) ? { display: 'none' } : undefined}
              >
                {teacher.id} ({teacher.name})
                {isTeacherOccupied(teacher) ? getTeacherOccupiedInfo(teacher) : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-700 border border-gray-600 rounded-md hover:bg-gray-600"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-md hover:bg-blue-600 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Add'} Slot
        </button>
      </div>
    </form>
  );
}