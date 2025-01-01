"use client";

import { useHabits } from "@/hooks/useHabits";
import AddHabitForm from "@/components/AddHabitForm";

export default function Dashboard() {
  const { habits, loading, addHabit, deleteHabit } = useHabits();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Habit Tracker Dashboard</h1>

      {/* Add Habit Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>
        <AddHabitForm onAddHabit={addHabit} />
      </div>

      {/* Habits List */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Habits</h2>
        {habits.length === 0 ? (
          <p className="text-gray-500">
            No habits added yet. Start tracking your habits!
          </p>
        ) : (
          <div className="space-y-4">
            {habits.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <span className="text-gray-800">{habit.name}</span>
                <button
                  onClick={() => deleteHabit(habit.id)}
                  className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
