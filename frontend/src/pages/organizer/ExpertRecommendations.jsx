import React, { useState, useEffect } from 'react';
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
const ExpertRecommendations = () => {
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExperts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('http://localhost:5000/api/experts/all');
        if (!response.ok) throw new Error('Failed to fetch experts');
        const data = await response.json();
        setExperts(data);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchExperts();
  }, []);

  const handleBook = (expertId) => {
    alert(`Booked expert with ID: ${expertId}`);
    // Add actual booking logic here later
  };

  if (loading) return <p>Loading recommendations...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!experts || experts.length === 0) return <p>No experts found.</p>;

  return (
    <OrganizerSidebarLayout>
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Recommended Experts</h2>
      <ul>
        {experts.map((expert) => (
          <li
            key={expert._id || expert.id}
            className="mb-4 p-4 border rounded flex justify-between items-center shadow-sm"
          >
            <div>
              <p className="font-semibold">{expert.name || 'Unnamed Expert'}</p>
              <p className="text-sm text-gray-600">
                {expert.specialty || 'Specialty not specified'}
              </p>
              <p className="text-yellow-500 font-semibold">
                Rating:{' '}
                {typeof expert.rating === 'number'
                  ? expert.rating.toFixed(1)
                  : 'N/A'}
              </p>
            </div>
            <button
              onClick={() => handleBook(expert._id || expert.id)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Book
            </button>
          </li>
        ))}
      </ul>
    </div>
    </OrganizerSidebarLayout>
  );
};

export default ExpertRecommendations;
