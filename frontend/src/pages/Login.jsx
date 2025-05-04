import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
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
        "http://localhost:5000/api/users/login",
        formData
      );
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userRole", response.data.role);

      setSuccess("Login successful! 🎉");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black p-8 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>

        {error && <div className="mb-4 text-red-500">{error}</div>}
        {success && <div className="mb-4 text-green-500">{success}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-1/4 p-3 mb-4 border rounded text-white"
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
          className="w-1/4 p-3 mb-6 border rounded text-white"
          required
        />
        <br />
        <br />
        <br />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
