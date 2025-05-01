import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/AdminLeftbar";

function ManageVendors() {
  const [vendors, setVendors] = useState([]);

  const fetchVendors = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await axios.get("http://localhost:5000/api/vendors/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setVendors(res.data);
    } catch (err) {
      console.error("Error loading vendors:", err.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.put(
        `http://localhost:5000/api/vendors/admin/update/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchVendors(); // refresh list
    } catch (err) {
      console.error("Failed to update vendor:", err.message);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <SidebarLayout>
      <h1 className="text-2xl font-bold mb-6">Manage Vendors 📦</h1>

      {vendors.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        <div className="grid gap-4">
          {vendors.map((v) => (
            <div
              key={v._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="text-lg font-semibold text-blue-600">{v.name}</h2>
                <p className="text-sm text-gray-500">📍 {v.location}</p>
                <p className="text-sm text-gray-500">📂 {v.category}</p>
                <p className="text-sm">Status: <span className="capitalize">{v.status}</span></p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => updateStatus(v._id, "approved")}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(v._id, "rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </SidebarLayout>
  );
}

export default ManageVendors;
