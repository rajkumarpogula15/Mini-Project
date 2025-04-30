import { Link, useNavigate } from "react-router-dom";

function SidebarLayout({ children }) {
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
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Event Management</h2>
          <nav className="space-y-3 text-gray-700 font-medium">
            <Link to="/dashboard" className="block hover:text-blue-600">🏠 Dashboard</Link>
            <Link to="/vendors" className="block hover:text-blue-600">📦 Vendors</Link>
            <Link to="/bookings" className="block hover:text-blue-600">📅 Bookings</Link>
            <Link to="/users" className="block hover:text-blue-600">👥 Users</Link>
            <Link to="/admin" className="block hover:text-blue-600">⚙️ Admin Home</Link>
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

export default SidebarLayout;
