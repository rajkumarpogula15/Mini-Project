import { useEffect, useState } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";

function CertificatesPage() {
  const [certificates, setCertificates] = useState([]);
  const [user, setUser] = useState(null);
  const [visibleCertId, setVisibleCertId] = useState(null);

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token) fetchUserInfo();
  }, []);

  useEffect(() => {
    if (user?._id && token) fetchCompletedEvents(user._id);
  }, [user]);

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user info:", err.message);
    }
  };

  const fetchCompletedEvents = async (userId) => {
    try {
      const res = await axios.get("http://localhost:5000/api/registrations/myevent", {
        params: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });

      const now = new Date();
      const completed = (res.data.registrations || []).filter((reg) => {
        const eventDate = new Date(reg.event.date);
        return eventDate <= now;
      });

      const certData = completed.map((reg) => ({
        id: reg._id,
        event: reg.event.title,
        date: new Date(reg.event.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      }));

      setCertificates(certData);
    } catch (err) {
      console.error("Failed to fetch completed events:", err.message);
    }
  };

  const downloadCertificate = (id) => {
    const certElem = document.getElementById(`cert-${id}`);
    if (!certElem) return;
    html2canvas(certElem).then((canvas) => {
      const link = document.createElement("a");
      link.download = `certificate-${id}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <AttendeeSidebarLayout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-extrabold mb-4 text-center text-indigo-700">🎓 My Certificates</h1>
        <p className="text-gray-600 mb-6 text-center">
          View and download certificates from completed events.
        </p>

        {certificates.length === 0 ? (
          <p className="text-gray-500 text-center">No certificates available yet.</p>
        ) : (
          <div className="space-y-10">
            {certificates.map((cert) => (
              <div key={cert.id} className="border rounded-lg p-4 shadow-sm bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{cert.event}</h2>
                    <p className="text-sm text-gray-500">Completed on {cert.date}</p>
                  </div>
                  <button
                    onClick={() =>
                      setVisibleCertId((prev) => (prev === cert.id ? null : cert.id))
                    }
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                  >
                    {visibleCertId === cert.id ? "Hide Certificate" : "Show Certificate"}
                  </button>
                </div>

                {visibleCertId === cert.id && (
                  <>
                    <div
                      id={`cert-${cert.id}`}
                      className="mt-6 bg-white border-4 border-indigo-500 rounded-xl p-10 shadow-md text-center relative overflow-hidden"
                    >
                      <h3 className="text-2xl font-bold text-indigo-800 mb-2 uppercase tracking-wide">
                        Tech Event Management
                      </h3>
                      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 mt-2">
                        Certificate of Participation
                      </h2>
                      <p className="text-lg text-gray-700">
                        This certifies that{" "}
                        <span className="font-semibold decoration-indigo-500">
                          {user?.name}
                        </span>
                      </p>
                      <p className="text-lg text-gray-700">
                        has participated in the event
                      </p>
                      <p className="text-xl font-bold text-indigo-700 mt-2">{cert.event}</p>
                      <p className="text-sm text-gray-500 mt-4">Dated: {cert.date}</p>

                      <div className="absolute bottom-4 right-4 text-xs italic text-gray-300">
                        Powered by Tech Event Management
                      </div>
                    </div>

                    <div className="mt-4 text-right">
                      
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AttendeeSidebarLayout>
  );
}

export default CertificatesPage;
