'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface AddHabitFormProps {
  onAddHabit: (habit: string) => void;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ onAddHabit }) => {
  const [habitInput, setHabitInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habitInput.trim()) {
      onAddHabit(habitInput.trim());
      setHabitInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
          placeholder="Enter a new habit"
          className="flex-1"
        />
        <Button type="submit">Add Habit</Button>
      </div>
    </form>
  );
};

export default AddHabitForm;