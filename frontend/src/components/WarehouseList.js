// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./../styles/Warehouses.css";

// const Warehouse = () => {
//   const [warehouses, setWarehouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const role = localStorage.getItem("role");

//   useEffect(() => {
//     const fetchWarehouses = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const endpoint =
//           role === "warehouseOwner"
//             ? "http://localhost:5000/api/warehouses/myWarehouses"
//             : "http://localhost:5000/api/warehouses/getWarehouses";

//         const response = await axios.get(endpoint, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         setWarehouses(response.data);
//       } catch (err) {
//         setError("Failed to fetch warehouses. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWarehouses();
//   }, [role]);


//   if (loading) return <div className="loading">Loading...</div>;

//   if (error) return <div className="error">{error}</div>;

//   return (
//     <div className="warehouse-container">
//       <header className="warehouse-header">
//         <h1>{warehouses.length} - Warehouses</h1>
//         <p>Manage and monitor your warehouse network efficiently.</p>
//       </header>

//       <section className="warehouse-list">
//         {warehouses.length > 0 ? (
//           warehouses.map((warehouse) => (
//             <div className="warehouse-card" key={warehouse._id}>
              
//               <div className="warehouse-image">
//               <img
//     src={
//       warehouse.image 
//         ? `http://localhost:5000${warehouse.image}` 
//         : "/default-warehouse.jpg"
//     }
//     alt={warehouse.name}
//   />
//               </div>

              
//               <div className="warehouse-info">
//                 <h3>{warehouse.name}</h3>
//                 <p><strong>Location:</strong> {warehouse.location}</p>
//                 <p><strong>Capacity:</strong> {warehouse.capacity} Tons</p>
//               </div>

              
//               {role === "warehouseOwner" && (
//                 <div className="warehouse-actions">
//                   <button className="edit-btn">Edit</button>
//                   <button className="delete-btn">Delete</button>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="no-warehouses">
//             <p>No warehouses available. Add some to get started!</p>
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Warehouse;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../styles/Warehouses.css";

const Warehouse = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(null); 
  const [editedData, setEditedData] = useState({
    name: "",
    location: "",
    capacity: "",
    image: null,
  });

  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const token = localStorage.getItem("token");
        const endpoint =
          role === "warehouseOwner"
            ? "http://localhost:5000/api/warehouses/myWarehouses"
            : "http://localhost:5000/api/warehouses/getWarehouses";

        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setWarehouses(response.data);
      } catch (err) {
        setError("Failed to fetch warehouses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchWarehouses();
  }, [role]);

  const handleEdit = (warehouse) => {
    setEditMode(warehouse._id);
    setEditedData({
      name: warehouse.name,
      location: warehouse.location,
      capacity: warehouse.capacity,
      image: null, 
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditedData({ ...editedData, image: files[0] });
    } else {
      setEditedData({ ...editedData, [name]: value });
    }
  };

  const handleUpdate = async (id) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", editedData.name);
    formData.append("location", editedData.location);
    formData.append("capacity", editedData.capacity);
    if (editedData.image) {
      formData.append("image", editedData.image);
    }
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/warehouses/edit/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
  
      const updatedWarehouse = response.data.warehouse;
  
      setWarehouses((prev) =>
        prev.map((warehouse) =>
          warehouse._id === id ? updatedWarehouse : warehouse
        )
      );
  
      setEditMode(null);
    } catch (err) {
      setError("Failed to update warehouse. Please try again.");
    }
  };

  // const handleBooking = async (warehouseId) => {
  //   const token = localStorage.getItem("token");

  //   try {
  //     const response = await axios.post(
  //       `http://localhost:5000/api/bookings/createBooking`,
  //       { warehouseId },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     alert(response.data.message); // Success message
  //   } catch (err) {
  //     setError("Failed to book warehouse. Please try again.");
  //   }
  // };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/warehouses/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setWarehouses((prev) => prev.filter((warehouse) => warehouse._id !== id));
    } catch (err) {
      setError("Failed to delete warehouse. Please try again.");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="warehouse-container">
      <header className="warehouse-header">
        <h1>{warehouses.length} - Warehouses</h1>
        <p>Manage and monitor your warehouse network efficiently.</p>
      </header>

      <section className="warehouse-list">
        {warehouses.length > 0 ? (
          warehouses.map((warehouse) => (
            <div className="warehouse-card" key={warehouse._id}>
              {editMode === warehouse._id ? (
                <div className="warehouse-edit">
                  <input
                    type="text"
                    name="name"
                    value={editedData.name}
                    onChange={handleInputChange}
                    placeholder="Warehouse Name"
                  />
                  <input
                    type="text"
                    name="location"
                    value={editedData.location}
                    onChange={handleInputChange}
                    placeholder="Location"
                  />
                  <input
                    type="number"
                    name="capacity"
                    value={editedData.capacity}
                    onChange={handleInputChange}
                    placeholder="Capacity (in Tons)"
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  <button onClick={() => handleUpdate(warehouse._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditMode(null)}>Cancel</button>
                </div>
              ) : (
                <>
                  <div className="warehouse-info">
                    <img
                      src={
                        warehouse.image
                          ? `http://localhost:5000${warehouse.image}`
                          : "/default-warehouse.jpg"
                      }
                      alt={warehouse.name}
                      className="warehouse-image"
                    />
                    <h3>{warehouse.name}</h3>
                    <p>
                      <strong>Location:</strong> {warehouse.location}
                    </p>
                    <p>
                      <strong>Capacity:</strong> {warehouse.capacity} Tons
                    </p>
                  </div>

                  {role === "warehouseOwner" && (
                    <div className="warehouse-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(warehouse)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(warehouse._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}

                  {role === "farmer" && (
                    <div className="warehouse-actions">
                     <Link to={`/booking/${warehouse._id}`}>
                            <button className="book-now-btn">Book Now</button>
                        </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        ) : (
          <div className="no-warehouses">
            <p>No warehouses available. Add some to get started!</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Warehouse;


