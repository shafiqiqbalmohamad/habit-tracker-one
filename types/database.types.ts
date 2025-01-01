export interface Habit {
  id: number;
  user_id: string;
  name: string;
  created_at: string;
}

export interface HabitTracking {
  id: number;
  habit_id: number;
  date: string;
  completed: boolean;
  user_id: string;
}
