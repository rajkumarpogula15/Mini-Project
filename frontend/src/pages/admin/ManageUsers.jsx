import { useEffect, useState } from "react";
import axios from "axios";
import SidebarLayout from "../../components/SidebarLayout";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("userToken");

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

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchUsers();
      } catch (err) {
        console.error("Delete failed:", err.message);
      }
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

        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="w-full bg-white rounded shadow text-left">
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
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                      onClick={() => deleteUser(u._id)}
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
