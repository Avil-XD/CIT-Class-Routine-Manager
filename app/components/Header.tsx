'use client';

interface HeaderProps {
  selectedDepartment: string;
  selectedSemester: number;
  onDepartmentChange: (dept: string) => void;
  onSemesterChange: (semester: number) => void;
}

const departments = ['CSE', 'ECE', 'CE'];
const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

export default function Header({
  selectedDepartment,
  selectedSemester,
  onDepartmentChange,
  onSemesterChange
}: HeaderProps) {
  return (
    <header className="bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">
            Class Routine Manager
          </h1>
          
          <div className="flex space-x-4">
            <select
              value={selectedDepartment}
              onChange={(e) => onDepartmentChange(e.target.value)}
              className="rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={selectedSemester}
              onChange={(e) => onSemesterChange(Number(e.target.value))}
              className="rounded-md border border-gray-600 px-3 py-2 bg-gray-700 text-white"
            >
              <option value="">Select Semester</option>
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}