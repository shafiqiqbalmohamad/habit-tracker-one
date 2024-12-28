'use client';

import React from 'react';
import { useHabits } from '@/hooks/useHabits';
import HabitCard from '@/components/HabitCard';
import AddHabitForm from '@/components/AddHabitForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HabitDashboard() {
  const { habits, addHabit, deleteHabit } = useHabits();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Habit Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <AddHabitForm onAddHabit={addHabit} />
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {habits.map((habit, index) => (
          <HabitCard 
            key={index} 
            habit={habit} 
            onDelete={() => deleteHabit(index)} 
          />
        ))}
      </div>
    </div>
  );
}