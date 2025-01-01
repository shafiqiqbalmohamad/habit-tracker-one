export interface Habit {
  id: number;
  name: string;
  user_id: string;
  created_at: string;
}

export interface HabitTracking {
  id: number;
  habit_id: number;
  date: string;
  completed: boolean;
  user_id: string;
}
