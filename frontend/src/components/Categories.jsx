import './Categories.css';

function Categories() {
  return (
    <section className="categories">
      <h2 className="section-title">🚀 Event Categories</h2>
      <div className="category-cards">
        <div className="card">🗣️ Domain Expert Meetups</div>
        <div className="card">📡 Live Webinars</div>
        <div className="card">🌍 Foreign Tech Introductions</div>
        <div className="card">💡 Startups & Innovations</div>
      </div>
    </section>
  );
}

export default Categories;
