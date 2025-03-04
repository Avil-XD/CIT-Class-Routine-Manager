import { TimeSlot } from '../types';

export const timeSlots: TimeSlot[] = [
  { start: '8:30 AM', end: '9:30 AM', display: '1st Slot (8:30 AM - 9:30 AM)' },
  { start: '9:30 AM', end: '10:30 AM', display: '2nd Slot (9:30 AM - 10:30 AM)' },
  { start: '10:30 AM', end: '11:30 AM', display: '3rd Slot (10:30 AM - 11:30 AM)' },
  { start: '11:30 AM', end: '12:30 PM', display: '4th Slot (11:30 AM - 12:30 PM)' },
  { start: '1:30 PM', end: '2:30 PM', display: '5th Slot (1:30 PM - 2:30 PM)' },
  { start: '2:30 PM', end: '3:30 PM', display: '6th Slot (2:30 PM - 3:30 PM)' },
  { start: '3:30 PM', end: '4:30 PM', display: '7th Slot (3:30 PM - 4:30 PM)' },
  { start: '4:30 PM', end: '5:30 PM', display: '8th Slot (4:30 PM - 5:30 PM)' }
];

export const weekDays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];