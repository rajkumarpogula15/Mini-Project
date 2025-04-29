import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      {role === 'organizer' && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-semibold">Welcome Organizer 👑</h2>
          <p>Manage your events here.</p>
        </div>
      )}
      {role === 'vendor' && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-semibold">Welcome Vendor 📦</h2>
          <p>Manage your services here.</p>
        </div>
      )}
      {role === 'attendee' && (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
          <h2 className="text-xl font-semibold">Welcome Attendee 🎉</h2>
          <p>Book and attend events.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
