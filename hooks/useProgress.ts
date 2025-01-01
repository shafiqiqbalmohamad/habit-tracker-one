// lib/useProgress.ts
"use client";

import { useState, useEffect } from "react";
import type { Habit, HabitTracking } from "@/types";

interface ProgressStats {
  total: number;
  completed: number;
  percentage: number;
}

export function useProgress(
  habits: Habit[],
  trackingData: HabitTracking[],
  selectedDate: string
) {
  const [stats, setStats] = useState<ProgressStats>({
    total: 0,
    completed: 0,
    percentage: 0,
  });

  useEffect(() => {
    if (!habits.length) {
      setStats({ total: 0, completed: 0, percentage: 0 });
      return;
    }

    const total = habits.length;
    const completed = habits.filter((habit) => {
      return trackingData.some(
        (tracking) =>
          tracking.habit_id === habit.id &&
          tracking.date === selectedDate &&
          tracking.completed
      );
    }).length;

    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    setStats({
      total,
      completed,
      percentage,
    });
  }, [habits, trackingData, selectedDate]);

  return stats;
}
