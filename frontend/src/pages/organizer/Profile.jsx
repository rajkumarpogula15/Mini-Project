import { useEffect, useState } from "react";
import axios from "axios";
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";

const OrganizerProfile = () => {
  const token = localStorage.getItem("userToken");
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <OrganizerSidebarLayout><p>Loading...</p></OrganizerSidebarLayout>;

  return (
    <OrganizerSidebarLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">👤 My Profile</h1>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={profile.photo || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{profile.name || "—"}</h2>
            <p className="text-gray-600">{profile.email || "—"}</p>
            <p className="text-gray-600">{profile.phone || "—"}</p>
          </div>
        </div>

        <div className="space-y-2 text-gray-700">
          <div>
            <strong>Bio:</strong>
            <p>{profile.bio || "No bio added."}</p>
          </div>
          <div>
            <strong>Joined on:</strong>{" "}
            {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : "—"}
          </div>
        </div>

        {/* Optional: Edit Profile button */}
        <div className="mt-6">
          <button
            onClick={() => alert("Redirect to profile edit page")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ✏️ Edit Profile
          </button>
        </div>
      </div>
    </OrganizerSidebarLayout>
  );
};

export default OrganizerProfile;
