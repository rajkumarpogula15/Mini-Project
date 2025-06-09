import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // <-- Import useNavigate
import SidebarLayout from "../../components/AdminLeftbar";
import AddUserModal from "../../components/AddUserModal";
import ConfirmModal from "../../components/ConfirmModal";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, userId: null });

  const token = localStorage.getItem("userToken");
  const navigate = useNavigate();  // <-- Initialize navigate

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/admin/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users:", err.message);
    }
  };

  const fetchProfiles = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/profiles", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfiles(res.data);
    } catch (err) {
      console.error("Failed to fetch profiles:", err.message);
    }
  };

  const confirmDelete = (userId) => {
    setConfirmModal({ isOpen: true, userId });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/users/admin/users/${confirmModal.userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConfirmModal({ isOpen: false, userId: null });
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err.message);
    }
  };

  const toggleBlock = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/users/admin/users/${id}/block`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (err) {
      console.error("Block/unblock failed:", err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchProfiles();
  }, []);

  return (
    <SidebarLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Manage Users 👥</h1>

        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => setIsModalOpen(true)}
        >
          ➕ Add User
        </button>

        <AddUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUserAdded={fetchUsers}
        />

        <ConfirmModal
          isOpen={confirmModal.isOpen}
          onConfirm={handleDelete}
          onCancel={() => setConfirmModal({ isOpen: false, userId: null })}
          message="Are you sure you want to delete this user?"
        />

        {/* USER LIST */}
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="w-full bg-white rounded shadow text-left mb-10">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3 capitalize">{u.role}</td>
                  <td className="p-3">
                    {u.blocked ? (
                      <span className="text-red-500 font-semibold">Blocked</span>
                    ) : (
                      <span className="text-green-600 font-semibold">Active</span>
                    )}
                  </td>
                  <td className="p-3 space-x-2">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                      onClick={() => toggleBlock(u._id)}
                    >
                      {u.blocked ? "Unblock" : "Block"}
                    </button>

                    {/* Fix here: navigate on click */}
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      onClick={() => navigate(`${u._id}`)}
                    >
                      View Profile
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => confirmDelete(u._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

       
        
      </div>
    </SidebarLayout>
  );
}

export default ManageUsers;
