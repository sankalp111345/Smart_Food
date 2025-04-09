import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // For better alerts
import '../styles/booking.css';

const BookingPage = () => {
    const { warehouseId } = useParams();
    const navigate = useNavigate();
    // console.log(warehouseId)
    const [warehouse, setWarehouse] = useState(null);
    const [bookedCapacity, setBookedCapacity] = useState('');
    const [error, setError] = useState("");
    const [validCapacity, setValidCapacity] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWarehouseDetails = async () => {
          const token = localStorage.getItem("token");

          if (!token) {
              setError("Unauthorized: Please log in to continue.");
              setLoading(false);
              return;
          }
            setLoading(true);
            try {
                // console.log(warehouseId);
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/warehouses/${warehouseId}`,{ headers: { Authorization: `Bearer ${token}` } } );
                // console.log(response.data);
                setWarehouse(response.data);
            } catch (error) {
                setError("Failed to load warehouse details.");
            } finally {
                setLoading(false);
            }
        };

        fetchWarehouseDetails();
    }, [warehouseId]);

    const handleCapacityChange = (e) => {
        const value = Number(e.target.value);
        setBookedCapacity(value);

        if (value > warehouse.capacity || value <= 0) {
            setValidCapacity(false);
        } else {
            setValidCapacity(true);
        }
    };

    const handleBooking = async () => {
        const capacityRequested = bookedCapacity;
        if (!validCapacity || !bookedCapacity) return;

        try {
            const token = localStorage.getItem("token");
            setLoading(true);

            await axios.post(
                `${process.env.REACT_APP_API_BASE_URL}/api/bookings/createBooking`,
                { warehouseId, capacityRequested },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            Swal.fire({
                icon: 'success',
                title: 'Booking Successful',
                text: `Your booking for ${bookedCapacity} units is confirmed!`,
                confirmButtonText: 'OK'
            });

            navigate('/warehouses');
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Booking Failed',
                text: 'Something went wrong. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p className="loading-message">Loading...</p>;
    if (!warehouse) return <p className="error-message">Warehouse details not found.</p>;

    return (
        <div className="booking-container">
            <h1>Book {warehouse.name}</h1>
            <p><strong>Available Capacity:</strong> {warehouse.capacity} units</p>

            <label>
                Enter Storage Capacity Required:
                <input
                    type="number"
                    value={bookedCapacity}
                    onChange={handleCapacityChange}
                    className={validCapacity ? '' : 'invalid-input'}
                />
            </label>

            {/* Error for Invalid Capacity */}
            {!validCapacity && (
                <p className="error-message">
                    ❌ Please enter a valid capacity (max: {warehouse.capacity})
                </p>
            )}

            <button
                onClick={handleBooking}
                disabled={!validCapacity || !bookedCapacity}
                className={validCapacity && bookedCapacity ? 'active-button' : 'disabled-button'}
            >
                {loading ? 'Booking...' : 'Confirm Booking'}
            </button>
        </div>
    );
};

export default BookingPage;
