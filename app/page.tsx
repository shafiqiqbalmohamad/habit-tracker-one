import { Suspense } from 'react';
import HabitDashboard from '@/components/HabitDashboard';

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-100 p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <HabitDashboard />
      </Suspense>
    </main>
  );
}