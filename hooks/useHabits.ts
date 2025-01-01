"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Habit {
  id: number;
  name: string;
  user_id: string;
  created_at: string;
}

interface HabitTracking {
  id: number;
  habit_id: number;
  date: string;
  completed: boolean;
  user_id: string;
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [trackingData, setTrackingData] = useState<HabitTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchHabits = async () => {
    if (!user) return;

    try {
      const { data: habits, error } = await supabase
        .from("habits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (habits) {
        setHabits(habits);
        await fetchTrackingData(habits.map((h) => h.id));
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrackingData = async (habitIds: number[]) => {
    if (!user || !habitIds.length) return;

    try {
      const { data: tracking, error } = await supabase
        .from("habit_tracking")
        .select("*")
        .in("habit_id", habitIds)
        .eq("user_id", user.id);

      if (error) throw error;

      if (tracking) {
        setTrackingData(tracking);
      }
    } catch (error) {
      console.error("Error fetching tracking data:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchHabits();
    }
  }, [user]);

  const addHabit = async (name: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("habits")
        .insert([{ name, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        setHabits((prevHabits) => [...prevHabits, data]);
      }
    } catch (error) {
      console.error("Error adding habit:", error);
      throw error;
    }
  };

  const deleteHabit = async (id: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("habits")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;

      setHabits((prevHabits) => prevHabits.filter((habit) => habit.id !== id));
      setTrackingData((prevTracking) =>
        prevTracking.filter((track) => track.habit_id !== id)
      );
    } catch (error) {
      console.error("Error deleting habit:", error);
      throw error;
    }
  };

  const toggleHabitForDate = async (habitId: number, date: string) => {
    if (!user) return;

    try {
      const existingTracking = trackingData.find(
        (t) => t.habit_id === habitId && t.date === date
      );

      if (existingTracking) {
        const { error } = await supabase
          .from("habit_tracking")
          .update({ completed: !existingTracking.completed })
          .eq("id", existingTracking.id)
          .eq("user_id", user.id);

        if (error) throw error;

        setTrackingData((prevTracking) =>
          prevTracking.map((t) =>
            t.id === existingTracking.id ? { ...t, completed: !t.completed } : t
          )
        );
      } else {
        const { data, error } = await supabase
          .from("habit_tracking")
          .insert([
            {
              habit_id: habitId,
              date,
              completed: true,
              user_id: user.id,
            },
          ])
          .select()
          .single();

        if (error) throw error;

        if (data) {
          setTrackingData((prevTracking) => [...prevTracking, data]);
        }
      }
    } catch (error) {
      console.error("Error toggling habit:", error);
      throw error;
    }
  };

  const getHabitCompletion = (habitId: number, date: string) => {
    return trackingData.some(
      (t) => t.habit_id === habitId && t.date === date && t.completed
    );
  };

  return {
    habits,
    loading,
    addHabit,
    deleteHabit,
    toggleHabitForDate,
    getHabitCompletion,
  };
}
