import { useState } from "react";
import axios from "axios"; // <-- Import axios

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "organizer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      console.log(response.data);
      setSuccess("Registration successful! 🎉");
    } catch (err) {
      console.error(err.response.data.message);
      setError(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transition-transform transform hover:scale-105"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
          Register
        </h2>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 text-red-500 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-4 text-green-500 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}

        <div className="ml-8">
          {/* Form Fields */}
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-96 p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <br />
          <br />
          <br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-96 p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <br />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-96 p-4 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />

          <br />
          <br />
          <br />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-96 p-4 mb-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          />
          <br />
          <br />
          <br />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-96 p-4 mb-8 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
            required
          >
            <option value="organizer">Organizer</option>
            <option value="vendor">Vendor</option>
            <option value="attendee">Attendee</option>
          </select>
          <br />
          <br />
          <br />
          <button
            type="submit"
            className="w-1/2 ml-20 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
