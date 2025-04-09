import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Warehouses from "./components/WarehouseList";
import Profile from "./components/Profile";
import AddWarehouse from "./components/AddWarehouse";
import Logistics from "./components/Logistics";
import AddLogistics from "./components/AddLogistics";
import BookingPage from "./components/Booking";
import FarmerBookings from "./components/FarmerBookings";
import NotificationList from "./components/NotificationList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/warehouses" element={<Warehouses />} />
        <Route path="/addWarehouse" element={<AddWarehouse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/addlogistics" element={<AddLogistics />} />
        <Route path="/booking/:warehouseId" element={<BookingPage />} />
        <Route path="/myBookings" element={<FarmerBookings />} />
        <Route path="/notifications" element={<NotificationList />} />
      </Routes>
    </Router>
  );
};

export default App;
