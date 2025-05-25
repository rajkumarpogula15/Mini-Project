import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
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

      switch (response.data.role) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "organizer":
          navigate("/organizer/events");
          break;
        case "expert":
          navigate("/expert/dashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md border border-gray-200 rounded-2xl p-10 shadow-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Sign in to your account</h1>
          <p className="text-sm text-gray-500 mt-2">
            Access your dashboard and manage events
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 text-sm rounded-md text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 px-4 py-2 text-sm rounded-md text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm pr-12"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-3 rounded-xl transition duration-300"
          >
            Sign In
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register here
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
