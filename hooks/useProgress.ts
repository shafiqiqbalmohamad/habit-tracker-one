// lib/useProgress.ts
import { useState, useEffect } from 'react';
import { Habit } from '../types/habit'; // Assuming you have a `Habit` type defined

// Custom hook to calculate the progress of habits
export const useProgress = (habits: Habit[]) => {
  const [progress, setProgress] = useState<number>(0);

  // Calculate the progress based on completed habits
  useEffect(() => {
    const totalHabits = habits.length;
    const completedHabits = habits.filter((habit) => habit.completed).length;
    
    if (totalHabits > 0) {
      setProgress((completedHabits / totalHabits) * 100);
    } else {
      setProgress(0);
    }
  }, [habits]);

  return progress;
};
