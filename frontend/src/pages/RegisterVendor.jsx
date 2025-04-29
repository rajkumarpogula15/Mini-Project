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
      
      const payload = {
        ...formData,
        availableDates,
      };

      const response = await axios.post('http://localhost:5000/api/vendors', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      console.log("Vendor registered:", response.data);
      navigate('/dashboard');
    } catch (err) {
      console.error("Failed to register vendor:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Vendor Registration</h2>

        <input name="name" placeholder="Name" onChange={handleChange} required
          className="w-full p-3 mb-4 border rounded" />

        <select name="category" onChange={handleChange} required
          className="w-full p-3 mb-4 border rounded">
          <option value="">Select Category</option>
          <option value="catering">Catering</option>
          <option value="decoration">Decoration</option>
          <option value="photography">Photography</option>
          <option value="music">DJ / Music</option>
        </select>

        <input name="location" placeholder="Location" onChange={handleChange} required
          className="w-full p-3 mb-4 border rounded" />

        <input name="priceRange" placeholder="Price Range (e.g. ₹5000 - ₹20000)" onChange={handleChange}
          className="w-full p-3 mb-4 border rounded" />

        <textarea name="description" placeholder="Service Details" onChange={handleChange}
          className="w-full p-3 mb-4 border rounded" />

        <input name="availableDates" placeholder="Available Dates (comma separated: YYYY-MM-DD,...)" 
          onChange={handleChange}
          className="w-full p-3 mb-6 border rounded" />

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded">
          Submit Vendor
        </button>
      </form>
    </div>
  );
}

export default RegisterVendor;
