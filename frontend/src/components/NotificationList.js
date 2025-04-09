import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/NotificationList.css";

const NotificationList = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    "http://localhost:5000/api/notifications",
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setNotifications(response.data);
            } catch (error) {
                setError("Failed to fetch notifications.");
            }
        };

        fetchNotifications();
    }, []);

    // Mark Notification as Read
    const markAsRead = async (id) => {
        try {
            const updatedNotifications = notifications.map((notification) =>
                notification._id === id
                    ? { ...notification, isRead: true }
                    : notification
            );
            setNotifications(updatedNotifications);

            await axios.put(
                `http://localhost:5000/api/notifications/${id}/markAsRead`,
                {},
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    // Mark All as Read
    const markAllAsRead = async () => {
        try {
            const updatedNotifications = notifications.map((notification) => ({
                ...notification,
                isRead: true,
            }));
            setNotifications(updatedNotifications);

            await axios.put(
                "http://localhost:5000/api/notifications/markAllAsRead",
                {},
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
        } catch (error) {
            console.error("Error marking all notifications as read:", error);
        }
    };

    return (
        <div className="notification-container">
            <h2>🔔 Notifications</h2>

            {error && <p className="error-message">{error}</p>}

            {notifications.length === 0 ? (
                <p className="no-notifications">No new notifications.</p>
            ) : (
                <>
                    <button className="mark-all-btn" onClick={markAllAsRead}>
                        Mark All as Read
                    </button>

                    {notifications.map((notification) => (
                        <div
                            key={notification._id}
                            className={`notification-card ${notification.isRead ? "read" : "unread"}`}
                            onClick={() => markAsRead(notification._id)}
                        >
                            <div className="notification-content">
                                <p>{notification.message}</p>
                                <span className="timestamp">
                                    {new Date(notification.createdAt).toLocaleString()}
                                </span>
                            </div>

                            {!notification.isRead && (
                                <span className="unread-badge">New</span>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default NotificationList;
