import { NextApiRequest, NextApiResponse } from 'next';

// Define the type for a habit to be a string
type Habit = string;

let habits: Habit[] = ["Exercise", "Read", "Meditate"];

// The handler function for the API
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(habits);
  }

  if (req.method === 'POST') {
    // Type assertion for habit data
    const newHabit: Habit = req.body.habit;
    habits.push(newHabit);
    return res.status(201).json({ message: 'Habit added', habit: newHabit });
  }

  res.status(405).json({ message: 'Method Not Allowed' });
}
