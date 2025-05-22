import { useEffect, useState } from "react";
import axios from "axios";
import AdminLeftbar from "../../components/AdminLeftbar";

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/contact/admin/messages", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err.message);
      }
    };

    fetchMessages();
  }, []);

  return (
    <AdminLeftbar>
      <h1 className="text-2xl font-bold mb-6">📬 Contact Messages</h1>

      {messages.length === 0 ? (
        <p className="text-gray-500">No contact messages yet.</p>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div key={msg._id} className="bg-white p-5 rounded shadow">
              <h2 className="text-lg font-semibold text-indigo-700 mb-1">
                {msg.subject || "No Subject"}
              </h2>
              <p><strong>From:</strong> {msg.name} ({msg.email})</p>
              <p className="mt-2 text-gray-700">{msg.message}</p>
              <p className="text-xs text-gray-400 mt-2">
                Sent on {new Date(msg.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </AdminLeftbar>
  );
}

export default AdminMessages;
