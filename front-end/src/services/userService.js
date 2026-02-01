import api from "../api/axios";

export const getCurrentUser = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const getAllUsers = async (params = {}) => {
  const { page, limit, search, status, role } = params;
  const queryParams = new URLSearchParams();

  if (page) queryParams.append('page', page);
  if (limit) queryParams.append('limit', limit);
  if (search) queryParams.append('search', search);
  if (status && status !== 'all') queryParams.append('status', status);
  if (role && role !== 'all') queryParams.append('role', role);

  const queryString = queryParams.toString();
  const response = await api.get(`/users${queryString ? `?${queryString}` : ''}`);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId, updates) => {
  const response = await api.put(`/users/${userId}`, updates);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

