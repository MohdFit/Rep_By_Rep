import api from "../api/axios";

// ORDER API SERVICES

// Create a new order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);
  return response.data;
};

// Get all orders (Admin only)
export const getAllOrders = async (params = {}) => {
  const { status, page, limit, sortBy, sortOrder } = params;
  const queryParams = new URLSearchParams();
  
  if (status) queryParams.append('status', status);
  if (page) queryParams.append('page', page);
  if (limit) queryParams.append('limit', limit);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);

  const response = await api.get(`/orders?${queryParams.toString()}`);
  return response.data;
};

// Get orders for a specific user
export const getUserOrders = async (userId) => {
  const response = await api.get(`/orders/user/${userId}`);
  return response.data;
};

// Get a single order by ID
export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

// Update order status (Admin only)
export const updateOrderStatus = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
};

// Delete order (Admin only)
export const deleteOrder = async (orderId) => {
  const response = await api.delete(`/orders/${orderId}`);
  return response.data;
};

// Get order statistics (Admin only)
export const getOrderStats = async () => {
  const response = await api.get("/orders/stats/dashboard");
  return response.data;
};
