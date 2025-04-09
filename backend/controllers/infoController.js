const User = require("../models/User");


exports.ProfileInfo = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from the verified token
        const user = await User.findById(userId).select("-password"); // Exclude password from response

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

exports.UpdateProfile = async (req, res) => {
    const { name, email, profilePicture } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Updating profile details
        if (name) user.name = name;
        if (email) user.email = email;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                createdAt: user.createdAt
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating profile. Please try again." });
    }
};

