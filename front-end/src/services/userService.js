import api from "../api/axios"; // Axios instance using REACT_APP_API_URL

// Get current logged-in user
export const getCurrentUser = async () => {
  const response = await api.get("/user");
  return response.data;
};

// Get all users (admin)
export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Get a single user by ID (admin)
export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Update a user (admin)
export const updateUser = async (userId, updates) => {
  const response = await api.put(`/users/${userId}`, updates);
  return response.data;
};

// Delete a user (admin)
export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
