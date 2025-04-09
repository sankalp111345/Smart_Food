import React from "react";
import "./../styles/Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Manage your food storage and logistics efficiently.</p>
      </header>
      
      <section className="dashboard-overview">
        <h2>Overview</h2>
        <div className="overview-cards">
          <div className="overview-card">
            <h3>Warehouses</h3>
            <p>Available: 12</p>
          </div>
          <div className="overview-card">
            <h3>Logistics</h3>
            <p>Active: 5</p>
          </div>
          <div className="overview-card">
            <h3>Requests</h3>
            <p>Pending: 8</p>
          </div>
        </div>
      </section>

      <section className="dashboard-activity">
        <h2>Recent Activity</h2>
        <ul>
          <li>Logged in at 10:00 AM</li>
          <li>Added a new warehouse in Location X</li>
          <li>Approved a logistics request from Farmer Y</li>
        </ul>
      </section>

      <section className="dashboard-links">
        <h2>Quick Links</h2>
        <div className="quick-links">
          <button className="link-button">View Warehouses</button>
          <button className="link-button">Manage Logistics</button>
          <button className="link-button">Add New Request</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
