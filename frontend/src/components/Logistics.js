import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/Logistics.css";

const Logistics = () => {
  const [logistics, setLogistics] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogistics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/logistics/getLogistics",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLogistics(response.data);
      } catch (error) {
        setError("Failed to fetch logistics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogistics();
  }, []);

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="logistics-container">
      <header className="logistics-header">
        <h1>🚚 My Logistics</h1>
        <p>Track your warehouse deliveries efficiently and easily.</p>
      </header>

      <div className="logistics-list">
        {logistics.length > 0 ? (
          logistics.map((logistic) => (
            <div key={logistic._id} className="logistics-card">
              <div className="card-header">
                <h3>{logistic.warehouseId.name}</h3>
                <span
                  className={`status-badge ${
                    logistic.status.toLowerCase() === "active"
                      ? "active"
                      : "pending"
                  }`}
                >
                  {logistic.status}
                </span>
              </div>

              <div className="card-details">
                <p>
                  <strong>Delivery Person:</strong> {logistic.deliveryPerson.name}
                </p>
                <p>
                  <strong>Phone:</strong> {logistic.deliveryPerson.phone}
                </p>
                <p>
                  <strong>Vehicle No:</strong> {logistic.deliveryPerson.vehicleNumber}
                </p>
              </div>

              <div className="card-footer">
                <button className="contact-btn">Contact Delivery Person</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-logistics">
            <p>No logistics data available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logistics;
