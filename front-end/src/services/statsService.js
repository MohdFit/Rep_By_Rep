import api from "../api/axios";

// DASHBOARD STATS API SERVICES

// Get overall dashboard statistics
export const getDashboardStats = async () => {
  const response = await api.get("/stats/dashboard");
  return response.data;
};

// Get sales overview (monthly sales data)
export const getSalesOverview = async (year) => {
  const queryParam = year ? `?year=${year}` : '';
  const response = await api.get(`/stats/sales${queryParam}`);
  return response.data;
};

// Get product statistics
export const getProductStats = async () => {
  const response = await api.get("/stats/products");
  return response.data;
};

// Get user statistics
export const getUserStats = async () => {
  const response = await api.get("/stats/users");
  return response.data;
};
