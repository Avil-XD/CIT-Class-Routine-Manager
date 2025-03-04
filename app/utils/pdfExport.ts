import { RoutineSlot } from '../types';
import { getSubjectName } from '../constants/subjects';

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM'
];

const weekDays = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
];

export const generatePdfContent = (
  slots: RoutineSlot[],
  department: string,
  semester: number
): string => {
  let htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px;
          table-layout: fixed;
        }
        th, td { 
          border: 1px solid black; 
          padding: 8px; 
          text-align: center;
          vertical-align: top;
          font-size: 12px;
        }
        th { 
          background-color: #f0f0f0;
          font-weight: bold;
        }
        .header { 
          text-align: center; 
          margin-bottom: 20px;
        }
        .slot-info {
          margin: 0;
          line-height: 1.4;
        }
        .subject-code {
          font-weight: bold;
        }
        .subject-name {
          font-style: italic;
          color: #444;
        }
        .room-info {
          color: #666;
          font-size: 11px;
          margin-top: 4px;
        }
        .teacher-info {
          color: #666;
          font-size: 11px;
        }
        @media print {
          body { 
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            size: landscape;
            margin: 1cm;
          }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Class Routine</h1>
        <h2>${department} - Semester ${semester}</h2>
      </div>
      <table>
        <thead>
          <tr>
            <th style="width: 100px;">Time/Day</th>
            ${weekDays.map(day => `<th>${day}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
  `;

  timeSlots.forEach(time => {
    htmlContent += `
      <tr>
        <td>${time}</td>
        ${weekDays.map(day => {
          const slot = slots.find(s => s.startTime === time && s.day === day);
          if (slot) {
            const subjectInfo = getSubjectName(slot.subjectId);
            return `
              <td>
                <div class="slot-info">
                  <div class="subject-code">${subjectInfo}</div>
                  <div class="room-info">Room: ${slot.roomNo}</div>
                  <div class="teacher-info">Teacher: ${slot.teacherId}</div>
                </div>
              </td>
            `;
          }
          return '<td></td>';
        }).join('')}
      </tr>
    `;
  });

  htmlContent += `
        </tbody>
      </table>
    </body>
    </html>
  `;

  return htmlContent;
};

export const exportRoutineToPdf = async (
  slots: RoutineSlot[],
  department: string,
  semester: number
) => {
  const htmlContent = generatePdfContent(slots, department, semester);
  
  // Create a Blob containing the HTML content
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  
  // Open in a new window for printing
  const printWindow = window.open(url);
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
      URL.revokeObjectURL(url);
    };
  }
};