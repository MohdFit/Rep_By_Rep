import api from "../api/axios";

// MERCHANDISE (T-Shirts) API
export const getAllProducts = async () => {
  const response = await api.get("/tshirts");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/tshirt/${id}`);
  return response.data;
};

export const getActiveProducts = async () => {
  const response = await api.get("/tshirts/active");
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await api.get(`/tshirts/search?q=${query}`);
  return response.data;
};

export const addProduct = async (productData) => {
  const response = await api.post("/merch/add", productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/tshirts/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/tshirts/${id}`);
  return response.data;
};

export const toggleAllProducts = async () => {
  const response = await api.post("/toggleShirts");
  return response.data;
};

// PLANS API
export const getAllPlans = async () => {
  const response = await api.get("/plans");
  return response.data;
};

export const getPlanById = async (id) => {
  const response = await api.get(`/plans/${id}`);
  return response.data;
};

export const getPlansByLevel = async (level) => {
  const response = await api.get(`/plans/level/${level}`);
  return response.data;
};

export const createPlan = async (planData) => {
  const response = await api.post("/plans", planData);
  return response.data;
};

export const updatePlan = async (id, planData) => {
  const response = await api.put(`/plans/${id}`, planData);
  return response.data;
};

export const deletePlan = async (id) => {
  const response = await api.delete(`/plans/${id}`);
  return response.data;
};

export const togglePlanStatus = async (id) => {
  const response = await api.patch(`/plans/${id}/toggle`);
  return response.data;
};
