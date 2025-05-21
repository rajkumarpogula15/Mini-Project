function ServiceCard({ service, onDelete, onEdit }) {
  return (
    <div className="bg-white p-4 rounded shadow space-y-2">
      <h3 className="text-xl font-bold text-green-600">{service.name}</h3>
      <p className="text-sm text-gray-500">{service.category}</p>
      <p>{service.description}</p>
      <p>📍 {service.location}</p>
      <p>💰 {service.priceRange}</p>
      <p>📅 Available: {service.availableDates?.length || 0} dates</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onEdit(service)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(service._id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
