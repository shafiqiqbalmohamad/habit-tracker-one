"use client";

import { useHabits } from "@/hooks/useHabits";
import { format, startOfWeek, addDays } from "date-fns";

export default function WeeklyView() {
  const {
    habits,
    loading,
    deleteHabit,
    toggleHabitForDate,
    getHabitCompletion,
  } = useHabits();

  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(startOfCurrentWeek, i)
  );

  const handleDelete = async (habitId: number) => {
    try {
      await deleteHabit(habitId);
    } catch (error) {
      console.error("Failed to delete habit:", error);
      alert("Failed to delete habit. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left">Habit</th>
                {weekDates.map((date) => (
                  <th
                    key={date.toISOString()}
                    className="px-6 py-3 text-center"
                  >
                    <div>{format(date, "EEE")}</div>
                    <div className="text-sm text-gray-500">
                      {format(date, "MM/dd")}
                    </div>
                  </th>
                ))}
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {habits.map((habit) => (
                <tr key={habit.id}>
                  <td className="px-6 py-4">{habit.name}</td>
                  {weekDates.map((date) => (
                    <td
                      key={date.toISOString()}
                      className="px-6 py-4 text-center"
                    >
                      <input
                        type="checkbox"
                        checked={getHabitCompletion(
                          habit.id,
                          format(date, "yyyy-MM-dd")
                        )}
                        onChange={() =>
                          toggleHabitForDate(
                            habit.id,
                            format(date, "yyyy-MM-dd")
                          )
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(habit.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
