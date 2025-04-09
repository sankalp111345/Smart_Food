import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/MyBooking.css"; // Updated CSS file

const FarmerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/bookings/myBookings",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBookings(response.data);
      } catch (error) {
        setError("Error fetching bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="my-bookings-container">
      <h1>📋 My Bookings</h1>

      <div className="bookings-list">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <h3>🏠 {booking.warehouseId?.name || "Unknown Warehouse"}</h3>
              <p>
                <strong>📦 Capacity Booked:</strong> {booking.capacityRequested} Tons
              </p>
              <p>
                <strong>📅 Booking Date:</strong>{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>
              <p className={`status ${booking.status}`}>
                {booking.status}
              </p>
            </div>
          ))
        ) : (
          <div className="no-warehouses">
            <img
              src="/assets/no-bookings.png"
              alt="No bookings"
              className="no-bookings-image"
            />
            <p>No bookings found. Start exploring now! 🚜</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerBookings;
