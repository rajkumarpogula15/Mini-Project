import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterVendor() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    priceRange: '',
    location: '',
    availableDates: '',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('userToken');
      const availableDates = formData.availableDates.split(',').map(date => new Date(date.trim()));

      const payload = { ...formData, availableDates };

      const res = await axios.post('http://localhost:5000/api/vendors', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Vendor saved:", res.data);
      navigate('/dashboard');
    } catch (err) {
      console.error("Vendor registration failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Vendor Registration</h2>

        <input
          type="text"
          name="name"
          placeholder="Vendor Name"
          onChange={handleChange}
          value={formData.name}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <select
          name="category"
          onChange={handleChange}
          value={formData.category}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        >
          <option value="">Select Category</option>
          <option value="catering">Catering</option>
          <option value="decoration">Decoration</option>
          <option value="photography">Photography</option>
          <option value="music">Music / DJ</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          value={formData.location}
          required
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="priceRange"
          placeholder="Price Range (e.g. ₹5000 - ₹20000)"
          onChange={handleChange}
          value={formData.priceRange}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <textarea
          name="description"
          placeholder="Service Description"
          onChange={handleChange}
          value={formData.description}
          className="w-full p-3 mb-4 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="availableDates"
          placeholder="Available Dates (comma-separated: YYYY-MM-DD)"
          onChange={handleChange}
          value={formData.availableDates}
          className="w-full p-3 mb-6 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-medium"
        >
          Submit Vendor
        </button>
      </form>
    </div>
  );
}

export default RegisterVendor;
