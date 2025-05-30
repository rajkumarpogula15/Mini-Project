import AttendeeSidebarLayout from "../../components/AttendeeSidebarLayout";
function CertificatesPage() {
  const certificates = [
    { id: 1, event: "AI Conference 2025", date: "May 12, 2025", fileUrl: "#" },
    { id: 2, event: "Design Sprint", date: "April 8, 2025", fileUrl: "#" },
  ];

  return (
    <AttendeeSidebarLayout>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">🎓 My Certificates</h1>
        <p className="text-gray-600 mb-6">View and download certificates of completed events.</p>

        {certificates.length === 0 ? (
          <p className="text-gray-500">No certificates available yet.</p>
        ) : (
          <ul className="space-y-4">
            {certificates.map((cert) => (
              <li
                key={cert.id}
                className="border rounded p-4 flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{cert.event}</h2>
                  <p className="text-sm text-gray-500">Earned on {cert.date}</p>
                </div>
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 text-sm"
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AttendeeSidebarLayout>
  );
}

export default CertificatesPage;
