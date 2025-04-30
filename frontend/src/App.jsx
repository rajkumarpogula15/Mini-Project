import { useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">Event Management 🎉</h1>
        <p className="homepage-subtitle">
          Your one-stop solution for managing events, booking vendors, and creating amazing experiences!
        </p>
      </header>

      <div className="button-group">
        <button onClick={() => navigate('/register-vendor')} className="action-button green">
          Register as Vendor
        </button>

        <button onClick={() => navigate('/vendors')} className="action-button blue">
          Browse Vendors
        </button>

        <button onClick={() => navigate('/dashboard')} className="action-button purple">
          Organizer Dashboard
        </button>

        <button onClick={() => navigate('/login')} className="action-button dark">
          Login
        </button>
      </div>
    </div>
  );
}

export default App;
