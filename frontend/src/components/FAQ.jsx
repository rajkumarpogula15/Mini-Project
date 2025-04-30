import './FAQ.css';

export default function FAQ() {
  const faqs = [
    { q: "How do I book an event?", a: "Just register and select a vendor." },
    { q: "What is the cancellation policy?", a: "Free cancellation up to 7 days before the event." },
    { q: "Are your services available nationwide?", a: "Yes, we operate in all major cities." },
    { q: "Can I customize my event package?", a: "Absolutely! All packages are fully customizable." },
    { q: "Do you provide on-site support?", a: "Yes, our team will be present at the event venue." },
    { q: "What payment methods are accepted?", a: "We accept all major credit/debit cards and UPI." }
  ];

  return (
    <section className="faq-section">
      <h2>FAQs</h2>
      <div className="faq-grid">
        {faqs.map((item, idx) => (
          <details key={idx} className="faq-item">
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
