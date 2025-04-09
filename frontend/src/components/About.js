import React from "react";
import "./../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About Smart Food Management</h1>

      <section className="introduction">
        <h2>📦 What is Smart Food Management?</h2>
        <p>
          Smart Food Management is a next-generation platform designed to bridge the gap
          between food producers (farmers), warehouse owners, and logistics providers.
          Our system empowers users to manage storage, transportation, and distribution
          of food efficiently through an intuitive and intelligent interface.
        </p>
      </section>

      <section className="problem-statement">
        <h2>🚨 The Problem</h2>
        <p>
          Every year, millions of tons of food are wasted due to improper storage,
          inefficient logistics, and lack of communication between stakeholders in
          the agricultural supply chain. This not only hurts farmers economically but
          also impacts food security and sustainability.
        </p>
      </section>

      <section className="our-solution">
        <h2>✅ Our Solution</h2>
        <p>
          Smart Food Management offers a unified platform where:
        </p>
        <ul>
          <li>👩‍🌾 <strong>Farmers</strong> can find and book nearby warehouses instantly.</li>
          <li>🏢 <strong>Warehouse Owners</strong> can list and manage their spaces easily.</li>
          <li>🚚 <strong>Logistics Providers</strong> are automatically matched with storage needs for seamless food movement.</li>
        </ul>
        <p>
          With real-time tracking, automated logistics assignment, and clear booking insights, we're making food flow smarter.
        </p>
      </section>

      <section className="core-values">
        <h2>💡 Our Core Values</h2>
        <ul>
          <li><strong>Sustainability:</strong> Promoting eco-friendly and waste-reducing practices.</li>
          <li><strong>Innovation:</strong> Leveraging technology to transform traditional systems.</li>
          <li><strong>Transparency:</strong> Ensuring clarity and trust in every transaction.</li>
          <li><strong>Empowerment:</strong> Supporting local farmers and entrepreneurs.</li>
        </ul>
      </section>

      <section className="tech-stack">
        <h2>🛠️ Technology Behind the Platform</h2>
        <ul>
          <li>React.js for responsive and dynamic UI</li>
          <li>Node.js and Express for robust backend services</li>
          <li>MongoDB for scalable data storage</li>
          <li>AI-based recommendation models for logistics assignment and prediction</li>
        </ul>
      </section>

      <section className="testimonials">
        <h2>💬 What People Say</h2>
        <blockquote>
          "Smart Food Management helped me find warehouse space for my crops within minutes! It's a game-changer." – <em>Ramesh, Farmer</em>
        </blockquote>
        <blockquote>
          "Managing my logistics has never been easier. The platform does all the matching for me!" – <em>Kavita, Warehouse Owner</em>
        </blockquote>
      </section>

      <section className="impact">
        <h2>📈 Our Impact So Far</h2>
        <ul>
          <li>✅ 10,000+ farmers onboarded</li>
          <li>✅ 2,500+ warehouses listed</li>
          <li>✅ 5,000+ successful logistics assignments</li>
          <li>✅ 25% average reduction in food spoilage for users</li>
        </ul>
      </section>

      <section className="locations">
        <h2>🌐 Where We Operate</h2>
        <p>
          We currently operate in several states across India and are expanding rapidly.
          Our platform is especially active in regions with high agricultural output like Punjab, Maharashtra, and Tamil Nadu.
        </p>
      </section>
    </div>
  );
};

export default About;
