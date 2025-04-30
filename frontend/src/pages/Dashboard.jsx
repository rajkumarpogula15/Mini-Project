import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VendorDashboard from "./VendorDashboard"; // ✅ import
import OrganizerDashboard from "./OrganizerDashboard"; // 🛠 create this next
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState('');

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    const userRole = localStorage.getItem('userRole');

    if (!userToken) {
      navigate('/login');
    } else {
      setRole(userRole);
    }
  }, [navigate]);

  if (!role) return null; // Prevent flicker

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {role === 'organizer' && <OrganizerDashboard />}
      {role === 'vendor' && <VendorDashboard />}
      {role === 'admin' && <AdminDashboard />}
      {role === 'attendee' && (
        <div className="text-center text-gray-700 text-xl">
          Coming soon: Attendee Dashboard 🎉
        </div>
      )}
    </div>
  );
}

export default Dashboard;
