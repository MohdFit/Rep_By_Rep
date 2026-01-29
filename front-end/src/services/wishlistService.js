import api from "../api/axios";

// Wishlist API services
const wishlistService = {
  // Get current user's wishlist
  getWishlist: async () => {
    try {
      const res = await api.get("/wishlist");
      return res.data;
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      throw err;
    }
  },

  // Add a product (Plan) to wishlist
  addToWishlist: async (productId) => {
    try {
      const res = await api.post("/wishlist/add", { productId, productType: "Plan" });
      return res.data;
    } catch (err) {
      console.error("Error adding to wishlist:", err);
      throw err;
    }
  },

  // Remove wishlist item by id
  removeFromWishlist: async (itemId) => {
    try {
      const res = await api.delete(`/wishlist/${itemId}`);
      return res.data;
    } catch (err) {
      console.error("Error removing from wishlist:", err);
      throw err;
    }
  }
};

export default wishlistService;
