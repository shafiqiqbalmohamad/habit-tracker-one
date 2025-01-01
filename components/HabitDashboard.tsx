"use client";

import { useHabits } from "@/hooks/useHabits";
import AddHabitForm from "./AddHabitForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HabitDashboard() {
  const { habits, loading, addHabit } = useHabits();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Habit</CardTitle>
        </CardHeader>
        <CardContent>
          <AddHabitForm onAddHabit={addHabit} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Habits</CardTitle>
        </CardHeader>
        <CardContent>
          {habits.length === 0 ? (
            <p className="text-gray-500">No habits added yet.</p>
          ) : (
            <ul className="space-y-2">
              {habits.map((habit) => (
                <li
                  key={habit.id}
                  className="flex items-center justify-between"
                >
                  <span>{habit.name}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
