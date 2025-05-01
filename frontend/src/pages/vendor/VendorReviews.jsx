import { useEffect, useState } from "react";
import axios from "axios";
import VendorSidebarLayout from "../../components/VendorSidebarLayout";

function VendorReviews() {
  const [reviews, setReviews] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vendors/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to load reviews:", err.message);
      }
    };
    fetchReviews();
  }, []);

  return (
    <VendorSidebarLayout>
      <h1 className="text-2xl font-bold mb-4">⭐ Your Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={r._id} className="bg-white shadow p-4 rounded">
              <p><strong>From:</strong> {r.organizer?.name || "Anonymous"}</p>
              <p><strong>Rating:</strong> {r.rating}/5</p>
              <p><strong>Comment:</strong> {r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </VendorSidebarLayout>
  );
}

export default VendorReviews;
