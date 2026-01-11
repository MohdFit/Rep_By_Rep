import api from "../api/axios";

export const getAllProducts = async () => {
  const response = await api.get("/merch");
  return response.data;
};
