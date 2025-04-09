import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../styles/AddWarehouse.css";

const AddWarehouse = () => {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        capacity: "",
        image: null,  // New field for warehouse image
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const role = localStorage.getItem("role");

    useEffect(() => {
        if (role !== "warehouseOwner") {
            setErrorMessage("Unauthorized access. Redirecting...");
            setTimeout(() => navigate("/"), 2000);
        }
    }, [role, navigate]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });  // Image handling
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            const token = localStorage.getItem("token");
            const data = new FormData();
            data.append("name", formData.name);
            data.append("location", formData.location);
            data.append("capacity", formData.capacity);
            if (formData.image) {
                data.append("image", formData.image);
            }

            const response = await axios.post(
                "http://localhost:5000/api/warehouses/addWarehouse",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setSuccessMessage("Warehouse added successfully!");
            setFormData({ name: "", location: "", capacity: "", image: null });
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message || "Failed to add warehouse. Please try again."
            );
        }
    };

    if (role !== "warehouseOwner") {
        return <p className="error-message">Unauthorized access. Redirecting...</p>;
    }

    return (
        <div className="add-warehouse-container">
            <h1>Add Warehouse</h1>
            <form className="add-warehouse-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Capacity (in Tons):</label>
                    <input
                        type="number"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group image-upload">
                    <label>Upload Warehouse Image:</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Add Warehouse</button>
            </form>

            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
    );
};

export default AddWarehouse;
