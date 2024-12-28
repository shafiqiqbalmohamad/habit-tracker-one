'use client';

import { useState, useEffect } from 'react';

export const useHabits = () => {
  const [habits, setHabits] = useState<string[]>([]);

  useEffect(() => {
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  const addHabit = (newHabit: string) => {
    const updatedHabits = [...habits, newHabit];
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const deleteHabit = (index: number) => {
    const updatedHabits = habits.filter((_, i) => i !== index);
    setHabits(updatedHabits);
    localStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  return {
    habits,
    addHabit,
    deleteHabit,
  };
};