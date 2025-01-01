"use client";

import { useState } from "react";

interface AddHabitFormProps {
  onAddHabit: (name: string) => Promise<void>;
}

export default function AddHabitForm({ onAddHabit }: AddHabitFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      setLoading(true);
      await onAddHabit(name.trim());
      setName(""); // Clear form after success
      console.log("Habit added successfully"); // Debug log
    } catch (error) {
      console.error("Failed to add habit:", error);
      alert("Failed to add habit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new habit..."
          className="w-full px-3 py-2 border rounded-md"
          disabled={loading}
        />
      </div>
      <button
        type="submit"
        disabled={loading || !name.trim()}
        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Adding..." : "Add Habit"}
      </button>
    </form>
  );
}
