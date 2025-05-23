import React, { useState, useEffect } from 'react';
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";

const UploadMedia = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const newFiles = selectedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleRemove = (index) => {
    setFiles((prev) => {
      const newList = [...prev];
      // Revoke URL before removal to free memory
      URL.revokeObjectURL(newList[index].preview);
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length === 0) return alert("Please select at least one file.");

    // You can implement actual upload logic here
    console.log("Uploading files:", files.map(f => f.file.name));
    alert("Media uploaded successfully (mock)");
  };

  useEffect(() => {
    // Cleanup all object URLs on unmount
    return () => {
      files.forEach(f => URL.revokeObjectURL(f.preview));
    };
  }, [files]);

  return (
    <OrganizerSidebarLayout>
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">Upload Media</h2>
        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="mb-4"
          />

          {files.length > 0 && (
            <div className="mb-4 space-y-4">
              {files.map((item, index) => (
                <div key={index} className="border p-2 rounded shadow">
                  {item.file.type.startsWith('image/') ? (
                    <img
                      src={item.preview}
                      alt={`preview-${index}`}
                      className="w-40 mb-2 rounded"
                    />
                  ) : item.file.type.startsWith('video/') ? (
                    <video
                      src={item.preview}
                      controls
                      className="w-40 mb-2 rounded"
                    />
                  ) : null}
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{item.file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Upload All
          </button>
        </form>
      </div>
    </OrganizerSidebarLayout>
  );
};

export default UploadMedia;
