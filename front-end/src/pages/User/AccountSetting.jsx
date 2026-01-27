import { useState, useEffect } from "react";
import Layout from "./Layout";
import "../../assets/styles/accountSetting.css";
import userAvatar from "../../assets/images/accountSetting/UserProfile.jpg";

export default function AccountSettings() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPass: "",
    confirm: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // Load user data from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser({
          name: parsed.fullName || parsed.name || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          address: parsed.address || "",
        });
      } catch (e) {
        console.error("Failed to parse user data:", e);
      }
    }
  }, []);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    console.log("Profile Data:", user);
    alert("Profile updated!");
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Password Data:", passwords);
    alert("Password changed successfully!");
  };

  return (
    <Layout>
      <div className="account-settings-container">
        
        <div className="section">
          <h2 className="section-title">Profile Information</h2>

          <div className="profile-picture">
            <img src={userAvatar} alt="Profile" />
            <p>Profile Picture</p>
          </div>
          <hr />
          <form
            className="profile-form"
            onSubmit={isEditing ? handleSaveChanges : handleEditProfile}
          >
            <div className="row">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={user.name}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={user.email}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="row">
              <div className="input-group">
                <label>Phone Number</label>
                <input
                  name="phone"
                  type="text"
                  placeholder="Your Phone"
                  value={user.phone}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="input-group">
                <label>Address</label>
                <input
                  name="address"
                  type="text"
                  placeholder="City, Country"
                  value={user.address}
                  onChange={handleProfileChange}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {!isEditing && (
              <button type="submit" className="btn-edit">
                Edit Profile
              </button>
            )}

            {isEditing && (
              <div className="edit-buttons">
                <button type="submit" className="btn-save">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        
        <div className="section">
          <h2 className="section-title">Change Password</h2>
          <p className="desc">
            Keep your account secure with a strong password.
          </p>

          <form className="password-form" onSubmit={handleChangePassword}>
            <div className="input-group">
              <label>Current Password</label>
              <input
                name="current"
                type="password"
                placeholder="Enter current password"
                value={passwords.current}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-group">
              <label>New Password</label>
              <input
                name="newPass"
                type="password"
                placeholder="Enter new password"
                value={passwords.newPass}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input-group">
              <label>Confirm New Password</label>
              <input
                name="confirm"
                type="password"
                placeholder="Confirm new password"
                value={passwords.confirm}
                onChange={handlePasswordChange}
              />
            </div>

            <button type="submit" className="btn-change">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}

