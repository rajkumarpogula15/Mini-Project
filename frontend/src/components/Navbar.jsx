import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css'; // Optional if you have custom styles

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle 'dark' class on <html> for Tailwind to detect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white text-black dark:bg-gray-900 dark:text-white shadow">
      <div className="text-2xl font-bold">EventEase</div>
      
      <ul className="flex items-center gap-6">
        <li><Link to="/" className="hover:text-blue-500 dark:hover:text-yellow-300">Home</Link></li>
        <li><Link to="/about" className="hover:text-blue-500 dark:hover:text-yellow-300">About</Link></li>
        <li><Link to="/login" className="hover:text-blue-500 dark:hover:text-yellow-300">Login</Link></li>
        <li><Link to="/register" className="hover:text-blue-500 dark:hover:text-yellow-300">Register</Link></li>
        <li>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {darkMode ? '🌞 ' : '🌙 '}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
