import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
    //   const token = localStorage.getItem("token");

    //   if (token) {
    //     await axios.post(
    //       `${process.env.REACT_APP_API_BASE_URL}/auth/logout`,
    //       {},
    //       {
    //         headers: { Authorization: `Bearer ${token}` },
    //       }
    //     );
    //   }

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("role");
        window.location.reload();
      // Redirect to home or login page
    //   navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <span
      className="logout-button"
      onClick={handleLogout}
      style={{
        cursor: "pointer",
        color: "#ff4d4d",
        fontWeight: "bold",
        marginLeft: "20px",
        transition: "transform 0.3s ease-in-out",
      }}
      onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
      onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
    >
      Logout
    </span>
  );
};

export default LogoutButton;
