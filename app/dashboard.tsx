import React, { useState } from "react";
import AddHabitForm from "../components/AddHabitForm";
import HabitCard from "../components/HabitCard";
import ProgressBar from "../components/ProgressBar";

const Dashboard: React.FC = () => {
  const [habits, setHabits] = useState<string[]>([]);

  const addHabit = (habit: string) => {
    setHabits((prevHabits) => [...prevHabits, habit]);
  };

  const handleDeleteHabit = (index: number) => {
    setHabits((prevHabits) => prevHabits.filter((_, i) => i !== index));
  };

  const progressPercentage = Math.round((habits.length / 10) * 100);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Habit Tracker Dashboard</h1>

      {/* Progress Bar */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Your Progress</h2>
        <ProgressBar progress={progressPercentage} />
      </div>

      {/* Habit List */}
      <div style={{ marginTop: "30px" }}>
        <h2>Your Habits</h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {habits.length > 0 ? (
            habits.map((habit, index) => (
              <HabitCard
                key={index}
                habit={habit}
                onDelete={() => handleDeleteHabit(index)}
              />
            ))
          ) : (
            <p>No habits added yet. Start tracking your habits!</p>
          )}
        </div>
      </div>

      {/* Add Habit Form */}
      <AddHabitForm onAddHabit={addHabit} />
    </div>
  );
};

export default Dashboard;
