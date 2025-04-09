import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profile/getProfile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setEditedProfile(response.data); // Initialize edit fields
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditedProfile({ ...editedProfile, profileImage: file });

    // Preview the uploaded image
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      for (let key in editedProfile) {
        formData.append(key, editedProfile[key]);
      }

      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/profile/updateProfile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProfile({ ...profile, ...editedProfile });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;
  if (error) return <div className="profile-error">{error}</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={imagePreview || profile.profileImage || "/default-profile.png"}
          alt="Profile"
          className="profile-image"
        />
        <h2>{profile.name}</h2>
        <p>{profile.role}</p>
      </div>

      <div className="profile-details">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedProfile.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="file"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button className="save-button" onClick={handleSave}>
              Save Changes
            </button>
          </>
        ) : (
          <>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
            <button className="edit-button" onClick={handleEditToggle}>
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
