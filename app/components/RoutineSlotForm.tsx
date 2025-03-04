'use client';

import { useState, useEffect } from 'react';
import { RoutineSlot } from '../types';
import { Subject } from '../types';
import { validateSlot } from '../utils/validation';

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
  const [formData, setFormData] = useState<Partial<RoutineSlot>>(
    initialData || {
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

  useEffect(() => {
    setError(null);
  }, [formData]);

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

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '2:00 PM', '3:00 PM', '4:00 PM'
  ];

  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

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
          <label className={labelClassName}>Start Time</label>
          <select
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
            className={inputClassName}
            required
          >
            <option value="">Select Time</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
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
          <label className={labelClassName}>Room No</label>
          <input
            type="text"
            value={formData.roomNo}
            onChange={(e) => setFormData({ ...formData, roomNo: e.target.value })}
            className={inputClassName}
            required
            placeholder="e.g., 301"
          />
        </div>

        <div>
          <label className={labelClassName}>Teacher ID</label>
          <input
            type="text"
            value={formData.teacherId}
            onChange={(e) => setFormData({ ...formData, teacherId: e.target.value })}
            className={inputClassName}
            required
            placeholder="e.g., TCH001"
          />
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