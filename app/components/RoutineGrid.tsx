'use client';

import { RoutineSlot } from '../types';
import { getSubjectName } from '../constants/subjects';

interface RoutineGridProps {
  slots: RoutineSlot[];
  onSlotClick?: (slot: RoutineSlot) => void;
  onDeleteSlot?: (slot: RoutineSlot) => void;
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM'
];

const weekDays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];

export default function RoutineGrid({ slots, onSlotClick, onDeleteSlot }: RoutineGridProps) {
  const getSlotForTimeAndDay = (time: string, day: string) => {
    return slots.find(slot => 
      slot.startTime === time && slot.day === day
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
          {timeSlots.map(time => (
            <tr key={time}>
              <td className="border border-gray-700 p-2 font-medium text-white bg-gray-800">
                {time}
              </td>
              {weekDays.map(day => {
                const slot = getSlotForTimeAndDay(time, day);
                return (
                  <td 
                    key={`${day}-${time}`}
                    className={`border border-gray-700 p-2 ${
                      slot 
                        ? 'bg-blue-900/30' 
                        : 'bg-gray-800'
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