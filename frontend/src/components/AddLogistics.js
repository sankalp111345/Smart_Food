import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../styles/AddLogistics.css";

const AddLogistics = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [warehouseId, setWarehouseId] = useState("");
  const [deliveryPerson, setDeliveryPerson] = useState({
    name: "",
    phone: "",
    vehicleNumber: "",
  });
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/warehouses/myWarehouses`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setWarehouses(response.data);
      } catch (err) {
        console.error("Error fetching warehouses:", err);
        setError("Failed to load warehouses. Please try again.");
      }
    };

    fetchWarehouses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!warehouseId || !deliveryPerson.name || !deliveryPerson.phone || !deliveryPerson.vehicleNumber) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/logistics/create",
        { warehouseId, deliveryPerson, status },
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      setSuccessMessage("Logistics added successfully!");
      setError("");
      setTimeout(() => navigate("/logistics"), 2000);
    } catch (err) {
      console.error("Error adding logistics:", err);
      setError("Failed to add logistics. Please try again.");
    }
  };

  return (
    <div className="enhanced-logistics-container">
      <h2>Add Logistics</h2>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="enhanced-logistics-form">
        <label>Warehouse:</label>
        <select
          value={warehouseId}
          onChange={(e) => setWarehouseId(e.target.value)}
          required
        >
          <option value="">Select Warehouse</option>
          {warehouses.map((warehouse) => (
            <option key={warehouse._id} value={warehouse._id}>
              {warehouse.name}
            </option>
          ))}
        </select>

        <label>Delivery Person Name:</label>
        <input
          type="text"
          value={deliveryPerson.name}
          onChange={(e) => setDeliveryPerson({ ...deliveryPerson, name: e.target.value })}
          required
        />

        <label>Phone:</label>
        <input
          type="tel"
          value={deliveryPerson.phone}
          onChange={(e) => setDeliveryPerson({ ...deliveryPerson, phone: e.target.value })}
          required
        />

        <label>Vehicle Number:</label>
        <input
          type="text"
          value={deliveryPerson.vehicleNumber}
          onChange={(e) => setDeliveryPerson({ ...deliveryPerson, vehicleNumber: e.target.value })}
          required
        />

        <label>Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
        </select>

        <button type="submit" className="btn-ripple">Add Logistics</button>
      </form>
    </div>
  );
};

export default AddLogistics;
