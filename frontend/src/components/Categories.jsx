import './Categories.css';

function Categories() {
  return (
    <section className="categories">
      <h2>Event Categories</h2>
      <div className="category-cards">
        <div className="card">🎉 Weddings</div>
        <div className="card">🏢 Corporate Events</div>
        <div className="card">🎓 College Fests</div>
        <div className="card">🚀 Product Launches</div>
      </div>
    </section>
  );
}

export default Categories;
