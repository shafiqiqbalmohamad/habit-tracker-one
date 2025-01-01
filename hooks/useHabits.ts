"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import type { Habit, HabitTracking } from "@/types";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [trackingData, setTrackingData] = useState<HabitTracking[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTrackingData = async (habitIds: number[]) => {
    if (!habitIds.length || !user) return;

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
        .insert([
          {
            name,
            user_id: user.id,
          },
        ])
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
      // First delete tracking data
      const { error: trackingError } = await supabase
        .from("habit_tracking")
        .delete()
        .eq("habit_id", id)
        .eq("user_id", user.id);

      if (trackingError) throw trackingError;

      // Then delete the habit
      const { error: habitError } = await supabase
        .from("habits")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (habitError) throw habitError;

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
