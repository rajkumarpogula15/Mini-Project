import { useEffect, useState } from "react";
import axios from "axios";
import VendorSidebarLayout from "../../components/VendorSidebarLayout";
import ServiceCard from "../../components/ServiceCard";
import AddServiceModal from "../../components/AddServiceModal"; 

function ManageServices() {
  const [services, setServices] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("userToken");

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/vendors/myservices", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err.message);
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/vendors/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchServices(); // Refresh list
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const editService = (service) => {
    alert("Edit coming soon! Service ID: " + service._id);
    // You can trigger a modal form here in future
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <VendorSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">🛠 Manage Your Services</h1>
      <div className="mb-6">
  <button
    onClick={() => setShowModal(true)}
    className="bg-green-600 text-white px-4 py-2 rounded"
  >
    ➕ Add Service
  </button>
</div>

<AddServiceModal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onServiceAdded={fetchServices}
/>


      {services.length === 0 ? (
        <p className="text-gray-500">No services added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard
              key={s._id}
              service={s}
              onDelete={deleteService}
              onEdit={editService}
            />
          ))}
        </div>
      )}
    </VendorSidebarLayout>
  );
}

export default ManageServices;
