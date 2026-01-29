import api from "../api/axios";

// REVIEW API SERVICES

// Create a new review
export const createReview = async (reviewData) => {
  const response = await api.post("/reviews", reviewData);
  return response.data;
};

// Get all reviews for a product
export const getProductReviews = async (productId, params = {}) => {
  const { page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = params;
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', limit);
  queryParams.append('sortBy', sortBy);
  queryParams.append('sortOrder', sortOrder);

  const response = await api.get(`/reviews/product/${productId}?${queryParams.toString()}`);
  return response.data;
};

// Get all reviews by a user
export const getUserReviews = async (userId, params = {}) => {
  const { page = 1, limit = 10 } = params;
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', limit);

  const response = await api.get(`/reviews/user/${userId}?${queryParams.toString()}`);
  return response.data;
};

// Get single review by ID
export const getReviewById = async (reviewId) => {
  const response = await api.get(`/reviews/${reviewId}`);
  return response.data;
};

// Update a review
export const updateReview = async (reviewId, reviewData) => {
  const response = await api.put(`/reviews/${reviewId}`, reviewData);
  return response.data;
};

// Delete a review
export const deleteReview = async (reviewId) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};

// Admin: Get pending reviews
export const getPendingReviews = async (params = {}) => {
  const { page = 1, limit = 10 } = params;
  const queryParams = new URLSearchParams();
  queryParams.append('page', page);
  queryParams.append('limit', limit);

  const response = await api.get(`/reviews/admin/pending?${queryParams.toString()}`);
  return response.data;
};

// Admin: Update review status
export const updateReviewStatus = async (reviewId, status) => {
  const response = await api.patch(`/reviews/admin/${reviewId}/status`, { status });
  return response.data;
};
