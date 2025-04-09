const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            warehouseOwnerId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: "Error fetching notifications." });
    }
};

exports.markAsRead = async (req, res) => {
    const { notificationId } = req.body;

    try {
        await Notification.findByIdAndUpdate(notificationId, { isRead: true });
        res.status(200).json({ message: "Notification marked as read." });
    } catch (error) {
        res.status(500).json({ error: "Error updating notification status." });
    }
};
