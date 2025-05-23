import React, { useState } from 'react';
import OrganizerSidebarLayout from "../../components/OrganizerSidebarLayout";
import { Copy } from 'lucide-react';

const ShareEvent = () => {
  const [copied, setCopied] = useState(false);

  // Mock event data (replace with real data or props if needed)
  const event = {
    id: "123abc",
    title: "Tech Innovation Summit 2025",
    date: "2025-07-15",
    location: "JNTUH UCEJ Campus, Telangana",
  };

  const shareURL = `${window.location.origin}/event/${event.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <OrganizerSidebarLayout>
      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Share Event</h1>

        <div className="border p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold">{event.title}</h2>
          <p className="text-sm text-gray-600">{event.date}</p>
          <p className="text-sm text-gray-600">{event.location}</p>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Event Link</label>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <input
              type="text"
              value={shareURL}
              readOnly
              className="flex-1 px-3 py-2 outline-none bg-gray-100"
            />
            <button
              onClick={handleCopy}
              className="bg-blue-600 text-white px-3 py-2 flex items-center gap-1 hover:bg-blue-700"
            >
              <Copy size={16} />
              Copy
            </button>
          </div>
          {copied && <p className="text-green-600 text-sm mt-2">Link copied to clipboard!</p>}
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-2">Share on</h3>
          <div className="flex gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Check out this event: ${shareURL}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              WhatsApp
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareURL)}&text=Join me at this event!`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500"
            >
              Twitter
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareURL)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </OrganizerSidebarLayout>
  );
};

export default ShareEvent;
