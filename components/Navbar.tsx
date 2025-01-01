export default function Navbar() {
  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold">Habit Tracker</h1>
          </div>
          {/* Add navigation items here if needed */}
        </div>
      </div>
    </nav>
  );
}
