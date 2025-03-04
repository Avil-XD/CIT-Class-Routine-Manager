'use client';

import { RoutineSlot, TimeSlot, Subject } from '../types';
import { getSubjectName } from '../constants/subjects';
import { timeSlots, weekDays } from '../constants/timeSlots';

interface RoutineGridProps {
  slots: RoutineSlot[];
  onSlotClick?: (slot: RoutineSlot) => void;
  onDeleteSlot?: (slot: RoutineSlot) => void;
}

const getSubjectType = (code: string): 'theory' | 'lab' | 'project' => {
  // Check if the subject code ends with numbers 71-79 (lab subjects)
  const isLab = /\d{2}7\d$/.test(code);
  // Check if the code contains 9 (usually projects/viva)
  const isProject = /9[0-9]$/.test(code);
  return isProject ? 'project' : isLab ? 'lab' : 'theory';
};

const getSlotColor = (type: 'theory' | 'lab' | 'project') => {
  switch (type) {
    case 'lab':
      return 'bg-green-900/30';
    case 'project':
      return 'bg-yellow-900/30';
    default:
      return 'bg-blue-900/30';
  }
};

export default function RoutineGrid({ slots, onSlotClick, onDeleteSlot }: RoutineGridProps) {
  const getSlotForTimeAndDay = (timeSlot: TimeSlot, day: string) => {
    return slots.find(slot =>
      slot.startTime === timeSlot.start && slot.day === day
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-gray-700 p-2 bg-gray-700 text-white">
              Time/Day
            </th>
            {weekDays.map(day => (
              <th key={day} className="border border-gray-700 p-2 bg-gray-700 text-white">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(timeSlot => (
            <tr key={timeSlot.start}>
              <td className="border border-gray-700 p-2 font-medium text-white bg-gray-800">
                {timeSlot.display}
              </td>
              {weekDays.map(day => {
                const slot = getSlotForTimeAndDay(timeSlot, day);
                const subjectType = slot ? getSubjectType(slot.subjectId) : null;
                return (
                  <td
                    key={`${day}-${timeSlot.start}`}
                    className={`border border-gray-700 p-2 ${
                      slot ? getSlotColor(subjectType!) : 'bg-gray-800'
                    }`}
                  >
                    {slot && (
                      <div className="relative group">
                        <div 
                          className="text-sm cursor-pointer"
                          onClick={() => onSlotClick && onSlotClick(slot)}
                        >
                          <div className="font-medium text-white">
                            {getSubjectName(slot.subjectId)}
                          </div>
                          <div className="text-gray-300 text-xs mt-1">
                            Room: {slot.roomNo}
                          </div>
                          <div className="text-gray-300 text-xs">
                            Teacher: {slot.teacherId}
                          </div>
                          <div className="text-gray-300 text-xs italic">
                            {subjectType === 'lab' ? '(Lab)' : subjectType === 'project' ? '(Project)' : ''}
                          </div>
                        </div>
                        {onDeleteSlot && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm('Are you sure you want to delete this slot?')) {
                                onDeleteSlot(slot);
                              }
                            }}
                            className="absolute top-1 right-1 hidden group-hover:block p-1 text-red-400 hover:text-red-300"
                            title="Delete slot"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}