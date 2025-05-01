import { useEffect, useState } from "react";
import axios from "axios";
import VendorSidebarLayout from "../../components/VendorSidebarLayout";

function VendorEarnings() {
  const [earnings, setEarnings] = useState(0);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vendors/earnings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEarnings(res.data.total || 0);
      } catch (err) {
        console.error("Failed to load earnings:", err.message);
      }
    };
    fetchEarnings();
  }, []);

  return (
    <VendorSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">💰 Earnings Summary</h1>
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-4xl font-bold text-green-600">₹{earnings}</h2>
        <p className="text-gray-500 mt-2">Total confirmed earnings</p>
      </div>
    </VendorSidebarLayout>
  );
}

export default VendorEarnings;
