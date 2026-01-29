import React, { useState, useRef } from 'react';
import { User, Mail, Phone, MapPin, Lock } from 'lucide-react';

export default function ProfilePasswordManagement() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [originalData, setOriginalData] = useState(profileData);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = () => {
    setOriginalData(profileData);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    const formData = new FormData();
    
    formData.append('fullName', profileData.fullName);
    formData.append('email', profileData.email);
    formData.append('phone', profileData.phone);
    formData.append('address', profileData.address);

    if (profileImage) {
      formData.append('profilePicture', profileImage);
    }

    console.log("Saving data:", formData);

    setOriginalData(profileData); 
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setProfileData(originalData);
  };

  const handleChangePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      const msg = document.createElement('div');
      msg.textContent = '\u26a0 New passwords do not match!';
      msg.className = 'fixed top-4 right-4 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
      return;
    }
    console.log('Password change requested');
    setPasswordData({ current: '', new: '', confirm: '' });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file); // Store the file object (for uploading)
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  return (
    <div className="min-h-screen bg-white-50 p-4 md:p-8">

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-2xl p-6 md:p-8">
        
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">Profile Information</h2>

          
          <div className="flex justify-center mb-8">
            <div className="relative">
              
              
              <input 
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />

              
              <div 
                onClick={handleImageClick}
                className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-orange-50 cursor-pointer overflow-hidden"
              >
                
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-orange-300" />
                )}
              </div>
              <p className="text-center text-sm text-gray-600 mt-2">Profile Picture</p>
            </div>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
            
            <div>
              <label className="block text-lg text-gray-700 mb-2 text-Poppins">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={profileData.fullName}
                  onChange={handleProfileChange}
                  placeholder="your name"
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-lg text-gray-700 mb-2 text-Poppins">EMAIL</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleProfileChange}
                  placeholder="your email"
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-lg text-gray-700 mb-2 text-Poppins">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleProfileChange}
                  placeholder="your phone"
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-lg text-gray-700 mb-2 text-Poppins">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  value={profileData.address}
                  onChange={handleProfileChange}
                  placeholder="City, Country"
                  disabled={!isEditing}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>


          <div className="flex items-center gap-4">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="
                text-white 
                flex items-center justify-center 
                transition-colors 
                self-start sm:self-auto
                w-[188px]
                h-10
                p-2
                gap-2.5
                rounded-lg
                border
                border-[#ff5800]
                bg-gradient-to-r from-[#ff5800] via-[#ff8800] to-[#ffb800]
                hover:from-[#e64f00] hover:via-[#e67a00] hover:to-[#e6a600]
                font-poppins font-normal text-base leading-none tracking-normal
              "
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSaveClick}
                  className="
                  text-white 
                  flex items-center justify-center 
                  transition-colors 
                  self-start sm:self-auto
                  w-[188px]
                  h-10
                  p-2
                  gap-2.5
                  rounded-lg
                  border
                  border-[#ff5800]
                  bg-gradient-to-r from-[#ff5800] via-[#ff8800] to-[#ffb800]
                  hover:from-[#e64f00] hover:via-[#e67a00] hover:to-[#e6a600]
                  font-poppins font-normal text-base leading-none tracking-normal
                "
                >
                  Save Changes
                </button>

                <button
                  onClick={handleCancelClick}
                  className="
                  flex items-center justify-center 
                  transition-colors 
                  w-[188px] 
                  h-10 
                  p-2 
                  rounded-lg
                  border 
                  border-gray-300 
                  bg-white 
                  text-gray-700 
                  hover:bg-gray-50
                  font-poppins font-normal text-base leading-none
                "
                >
                  Cancel
                </button>
              </>
            )}
          </div>

        </div>

        
        <div>
          <h2 className="text-xl font-semibold text-orange-500 border-b-2 border-orange-500 pb-1 inline-block mb-4">Change Password</h2>
          <p className="text-lg text-Poppins text-gray-600 mb-6">Keep your account secure with a strong password</p>

          
          <div className="space-y-4 mb-6">
            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="current"
                  value={passwordData.current}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="w-[388px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-sm text-gray-700 mb-2">New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="new"
                  value={passwordData.new}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  className="w-[388px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-sm text-gray-700 mb-2">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password"
                  name="confirm"
                  value={passwordData.confirm}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="w-[388px] pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            className="
  /* --- Layout & Spacing --- */
  text-white 
  flex items-center justify-center 
  transition-colors 
  self-start sm:self-auto

  /* --- NEW styles from your list --- */
  w-[188px]     /* width: 188 */
  h-10          /* height: 40 */
  p-2           /* padding: 8px */
  gap-2.5       /* gap: 10px */
  rounded-lg    /* border-radius: 8px */
  border        /* border-width: 1px */
  border-[#ff5800] /* Added a border color from your gradient */

  /* --- Gradient Background (from before) --- */
  bg-gradient-to-r from-[#ff5800] via-[#ff8800] to-[#ffb800]
  hover:from-[#e64f00] hover:via-[#e67a00] hover:to-[#e6a600]
  
  /* --- Font Styles (from before) --- */
  font-poppins font-normal text-base leading-none tracking-normal
"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
