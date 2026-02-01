import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { updateUser } from "../../services/userService";
import api from "../../api/axios";
import Layout from "./Layout";
import "../../assets/styles/accountSetting.css";
import userAvatar from "../../assets/images/accountSetting/UserProfile.jpg";

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user: authUser, updateUser: updateAuthUser, logout } = useAuth();
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
  const [loading, setLoading] = useState(false);

  // Load user data from auth context
  useEffect(() => {
    if (authUser) {
      setUser({
        name: authUser.fullName || authUser.name || "",
        email: authUser.email || "",
        phone: authUser.phone || "",
        address: authUser.address || "",
      });
    }
  }, [authUser]);

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

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!authUser?._id) return;
    
    setLoading(true);
    try {
      const updates = {
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      };
      
      const response = await updateUser(authUser._id, updates);
      
      if (response.success) {
        // Update auth context with new user data
        updateAuthUser(response.data.user);
        
        const msg = document.createElement('div');
        msg.textContent = '\u2713 Profile updated successfully!';
        msg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      const msg = document.createElement('div');
      msg.textContent = '\u2717 ' + (error.response?.data?.message || 'Failed to update profile');
      msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (!passwords.current) {
      const msg = document.createElement('div');
      msg.textContent = '\u26a0 Please enter your current password';
      msg.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
      return;
    }
    
    if (passwords.newPass.length < 6) {
      const msg = document.createElement('div');
      msg.textContent = '\u26a0 New password must be at least 6 characters';
      msg.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
      return;
    }
    
    if (passwords.newPass !== passwords.confirm) {
      const msg = document.createElement('div');
      msg.textContent = '\u26a0 Passwords do not match!';
      msg.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/auth/change-password', {
        currentPassword: passwords.current,
        newPassword: passwords.newPass,
      });
      
      if (response.data.success) {
        const msg = document.createElement('div');
        msg.textContent = '\u2713 Password changed successfully!';
        msg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
        
        // Clear password fields
        setPasswords({ current: '', newPass: '', confirm: '' });
      }
    } catch (error) {
      console.error('Failed to change password:', error);
      const msg = document.createElement('div');
      msg.textContent = '\u2717 ' + (error.response?.data?.message || 'Failed to change password');
      msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    } finally {
      setLoading(false);
    }
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
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancelEdit}
                  disabled={loading}
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

            <button type="submit" className="btn-change" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>

        <div className="section">
          <h2 className="section-title">Account Actions</h2>
          <p className="desc">
            Sign out from your account.
          </p>
          <button 
            onClick={async () => {
              await logout();
              navigate('/');
              const msg = document.createElement('div');
              msg.textContent = '\u2713 Logged out successfully';
              msg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
              document.body.appendChild(msg);
              setTimeout(() => msg.remove(), 3000);
            }}
            className="btn-change"
            style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}

