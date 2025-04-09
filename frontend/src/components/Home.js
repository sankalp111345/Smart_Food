import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import "./../styles/Home.css";
import LanguageSwitcher from "./LanguageSwitcher";

const Home = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">🌾 Smart Food Management</div>

        {/* Hamburger Menu Icon */}
        {token && (
          <div
            className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </div>
        )}

        {/* Navbar Links (Hidden by Default & Visible Only on Click) */}
        {token && (
          <div className={`hamburger-menu ${isMenuOpen ? 'show' : ''}`}>
            <Link to="/profile" className="navbar-link">Profile</Link>
            <LogoutButton />

            {role === "farmer" && (
              <>
                <Link to="/warehouses" className="navbar-link">Show All Warehouses</Link>
                <Link to="/mybookings" className="navbar-link">My Bookings</Link>
              </>
            )}

            {role === "warehouseOwner" && (
              <>
                <Link to="/addWarehouse" className="navbar-link">Add Warehouse</Link>
                <Link to="/warehouses" className="navbar-link">Show My Warehouses</Link>
                <Link to="/logistics" className="navbar-link">Manage Logistics</Link>
                <Link to="/notifications" className="navbar-link">Notifications</Link>
                <Link to="/addlogistics" className="navbar-link">Add Logistics</Link>
              </>
            )}
          </div>
        )}

        {!token && (
          <div className="auth-buttons">
            <Link to="/login" className="auth-button glowing-border">Login</Link>
            <Link to="/register" className="auth-button glowing-border">Register</Link>
            {/* <LanguageSwitcher /> */}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <h1>Revolutionizing Food Storage & Logistics</h1>
        <p>Connecting farmers, warehouses, and logistics for a smarter supply chain.</p>
        {/* <Link to="/warehouses" className="cta-button">Explore Warehouses</Link> */}
      </header>

      {/* About Us Section */}
      <section className="about-us">
        <h2>About Smart Food Management</h2>
        <p>
          We aim to reduce food wastage by connecting farmers with warehouses
          and logistics providers for efficient storage and transportation.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="reasons">
          <div className="reason-card">
            <h3>🌍 Eco-Friendly Solutions</h3>
            <p>Our platform minimizes food wastage through efficient storage management.</p>
          </div>
          <div className="reason-card">
            <h3>📊 Real-Time Tracking</h3>
            <p>Track your bookings, logistics, and warehouse status in real-time.</p>
          </div>
          <div className="reason-card">
            <h3>🤝 Reliable Network</h3>
            <p>Connect with trusted warehouse owners and logistics providers.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1️⃣ Register</h3>
            <p>Create your account as a farmer or warehouse owner.</p>
          </div>
          <div className="step">
            <h3>2️⃣ Browse Warehouses</h3>
            <p>Farmers can explore available warehouses for storage.</p>
          </div>
          <div className="step">
            <h3>3️⃣ Manage Logistics</h3>
            <p>Warehouse owners can efficiently handle logistics requests.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Smart Food Management | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Home;
