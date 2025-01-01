"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import HabitDashboard from "@/components/HabitDashboard";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <HabitDashboard />
    </ProtectedRoute>
  );
}
