"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/utils/supabase";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-900 text-white fixed left-0 top-0">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6">Habit Tracker</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="block p-2 hover:bg-gray-800 rounded">
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/weekly"
                className="block p-2 hover:bg-gray-800 rounded"
              >
                Weekly View
              </Link>
            </li>
            {user && (
              <li className="mt-4 pt-4 border-t border-gray-700">
                <button
                  onClick={() => supabase.auth.signOut()}
                  className="block w-full p-2 text-left hover:bg-gray-800 rounded"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
