'use client';

import { useEffect, useState } from 'react';
import Header from './components/Header';
import RoutineGrid from './components/RoutineGrid';
import RoutineSlotForm from './components/RoutineSlotForm';
import { RoutineSlot, WeeklyRoutine, Subject } from './types';
import { loadData, saveRoutine, deleteRoutineSlot } from './utils/storage';
import { getSubjectsForSemester } from './constants/subjects';

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [routineSlots, setRoutineSlots] = useState<RoutineSlot[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<RoutineSlot | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [availableSubjects, setAvailableSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    loadRoutineData();
  }, [selectedDepartment, selectedSemester]);

  useEffect(() => {
    if (selectedDepartment && selectedSemester) {
      const subjects = getSubjectsForSemester(selectedDepartment, selectedSemester);
      setAvailableSubjects(subjects);
    }
  }, [selectedDepartment, selectedSemester]);

  const loadRoutineData = async () => {
    try {
      setIsLoading(true);
      const data = await loadData();
      const routine = data.routines.find(
        r => r.department === selectedDepartment && r.semester === selectedSemester
      );
      setRoutineSlots(routine?.slots || []);
    } catch (error) {
      console.error('Error loading routine data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSlotSubmit = async (slotData: Partial<RoutineSlot>) => {
    try {
      let updatedSlots: RoutineSlot[];
      
      if (selectedSlot) {
        // Update existing slot
        updatedSlots = routineSlots.map(slot =>
          slot.id === selectedSlot.id
            ? { ...slot, ...slotData } as RoutineSlot
            : slot
        );
      } else {
        // Add new slot
        const newSlot = {
          ...slotData,
          id: Date.now().toString(),
          department: selectedDepartment,
          semester: selectedSemester
        } as RoutineSlot;
        updatedSlots = [...routineSlots, newSlot];
      }

      const routine: WeeklyRoutine = {
        id: `${selectedDepartment}-${selectedSemester}`,
        department: selectedDepartment,
        semester: selectedSemester,
        slots: updatedSlots,
      };
      
      await saveRoutine(routine);
      setRoutineSlots(updatedSlots);
      setIsFormOpen(false);
      setSelectedSlot(undefined);
    } catch (error) {
      console.error('Error saving routine:', error);
      alert('Failed to save routine. Please try again.');
    }
  };

  const handleDeleteSlot = async (slot: RoutineSlot) => {
    try {
      await deleteRoutineSlot(selectedDepartment, selectedSemester, slot.id);
      setRoutineSlots(slots => slots.filter(s => s.id !== slot.id));
    } catch (error) {
      console.error('Error deleting slot:', error);
      alert('Failed to delete slot. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <Header
        selectedDepartment={selectedDepartment}
        selectedSemester={selectedSemester}
        onDepartmentChange={setSelectedDepartment}
        onSemesterChange={setSelectedSemester}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-white">
            {selectedDepartment 
              ? `${selectedDepartment} - Semester ${selectedSemester} Routine`
              : 'Select Department and Semester'}
          </h2>
          <button
            onClick={() => {
              setSelectedSlot(undefined);
              setIsFormOpen(true);
            }}
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
            disabled={!selectedDepartment}
          >
            Add New Slot
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-white">Loading...</div>
        ) : selectedDepartment ? (
          <div className="bg-gray-800 rounded-lg shadow">
            <RoutineGrid
              slots={routineSlots}
              onSlotClick={slot => {
                setSelectedSlot(slot);
                setIsFormOpen(true);
              }}
              onDeleteSlot={handleDeleteSlot}
            />
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            Please select a department and semester to view or create a routine
          </div>
        )}

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <RoutineSlotForm
                initialData={selectedSlot}
                existingSlots={routineSlots}
                availableSubjects={availableSubjects}
                onSubmit={handleSlotSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setSelectedSlot(undefined);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
