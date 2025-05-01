import { Link, useNavigate } from "react-router-dom";

function OrganizerSidebarLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-indigo-600 mb-6">Organizer Panel</h2>

          <nav className="space-y-3 text-gray-700 font-medium">
            <Link to="/organizer" className="block hover:text-indigo-600">🏠 Dashboard</Link>
            <Link to="/organizer/events" className="block hover:text-indigo-600">🗓️ Manage Events</Link>
            <Link to="/organizer/vendors/recommended" className="block hover:text-indigo-600">🤝 Vendor Recommendations</Link>
            <Link to="/organizer/vendors/book" className="block hover:text-indigo-600">📦 Book Vendors</Link>
            <Link to="/organizer/share" className="block hover:text-indigo-600">🔗 Share Event Page</Link>
            <Link to="/organizer/media" className="block hover:text-indigo-600">📤 Upload Media</Link>
            <Link to="/organizer/profile" className="block hover:text-indigo-600">👤 Profile</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

export default OrganizerSidebarLayout;
