import { useState } from "react";
import axios from "axios";

function AddServiceModal({ isOpen, onClose, onServiceAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    location: "",
    priceRange: "",
    description: "",
    availableDates: ""
  });

  const token = localStorage.getItem("userToken");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        availableDates: formData.availableDates.split(',').map(d => new Date(d.trim()))
      };

      await axios.post("http://localhost:5000/api/vendors", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      onServiceAdded(); // refresh list
      onClose(); // close modal
    } catch (err) {
      console.error("Failed to add service:", err.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg relative">
        <button className="absolute top-2 right-2 text-red-500 font-bold text-xl" onClick={onClose}>×</button>
        <h2 className="text-xl font-bold mb-4">Add New Service</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="name" placeholder="Service Name" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="text" name="category" placeholder="Category" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="w-full border p-2 rounded" />
          <input type="text" name="priceRange" placeholder="Price Range (e.g. ₹5000 - ₹10000)" onChange={handleChange} required className="w-full border p-2 rounded" />
          <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="availableDates" placeholder="Available Dates (comma-separated: YYYY-MM-DD)" onChange={handleChange} className="w-full border p-2 rounded" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Add Service</button>
        </form>
      </div>
    </div>
  );
}

export default AddServiceModal;
