import { Link, useNavigate } from "react-router-dom";

function VendorSidebarLayout({ children }) {
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
          <h2 className="text-2xl font-bold text-green-600 mb-6">Vendor Panel</h2>
          <nav className="space-y-3 text-gray-700 font-medium">
            <Link to="/vendor/dashboard" className="block hover:text-green-600">🏠 Dashboard</Link>
            <Link to="/vendor/services" className="block hover:text-green-600">🛠 Manage Services</Link>
            <Link to="/vendor/bookings" className="block hover:text-green-600">📅 Bookings</Link>
            <Link to="/vendor/earnings" className="block hover:text-green-600">💰 Earnings</Link>
            <Link to="/vendor/reviews" className="block hover:text-green-600">⭐ Reviews</Link>
            <Link to="/vendor/profile" className="block hover:text-green-600">👤 Profile</Link>
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}

export default VendorSidebarLayout;
