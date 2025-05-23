function EventCard({ event, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-xl font-semibold text-blue-600">{event.title}</h3>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Description:</strong> {event.description}</p>

      <div className="mt-3 flex gap-4">
        <button onClick={() => onEdit(event)} className="text-blue-500">✏️ Edit</button>
        <button onClick={() => onDelete(event._id)} className="text-red-500">🗑️ Delete</button>
      </div>
    </div>
  );
}

export default EventCard;
