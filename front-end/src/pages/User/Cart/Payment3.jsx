import { X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { createOrder } from "../../../services/orderService";

const Payment3 = ({ onBack, onClose, onHome, shippingData, paymentMethod, cartItems, orderTotal }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get user from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id && !user._id) {
        setError("User not authenticated");
        return;
      }

      const userId = user.id || user._id;

      // Prepare order data
      const orderData = {
        userId,
        items: (cartItems || []).map(item => ({
          productId: item._id || item.id,
          productType: item.productType || 'Plan',
          quantity: item.quantity || 1,
          unitPrice: item.price || item.unitPrice || 0
        })),
        shippingInfo: shippingData || {
          firstName: "Guest",
          lastName: "User",
          email: "",
          address: "",
          phone: ""
        },
        paymentMethod: paymentMethod || "credit",
        shippingCost: 5,
        total: orderTotal || 0
      };

      // Create order
      const response = await createOrder(orderData);
      
      if (response.success) {
        // Clear cart after successful order
        localStorage.removeItem("cart");
        return response.data;
      } else {
        setError(response.message || "Failed to create order");
        return null;
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.message || "An error occurred while creating order");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-[600px] max-w-[95vw] rounded-2xl p-8 relative flex flex-col items-center shadow-2xl">
        <div className="flex justify-between items-center w-full mb-6">
          <button 
            onClick={onBack}
            disabled={loading}
            className="hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-6 h-6 text-orange-500" />
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-customOrange1 to-orange-500">
            Make Payment
          </h2>
          <button 
            onClick={onClose}
            disabled={loading}
            className="hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="flex justify-center space-x-4 mb-8 w-full">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all ${
                num === 3
                  ? "bg-gradient-to-r from-customOrange1 to-orange-500 shadow-lg scale-110"
                  : "bg-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {error && (
          <div className="w-full mb-4 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-lg font-medium">
            ⚠️ {error}
          </div>
        )}

        <h3 className="font-bold text-2xl mb-6 text-center text-gray-800">
          {loading ? 'Processing Your Order...' : 'Thank You For Choosing Us!'}
        </h3>

        <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-r from-customOrange1 to-orange-500 text-white text-5xl shadow-lg">
          {loading ? '⏳' : '✓'}
        </div>
        <p className="text-base text-center mb-2 text-gray-700 font-medium">
          {loading ? 'Processing your order...' : "We're happy to confirm your payment"}
        </p>
        <p className="text-base text-center mb-8 text-gray-600">
          {loading ? 'Please wait...' : "You'll receive an email shortly with your order details"}
        </p>

        <button
          onClick={() => {
            handleCreateOrder().then((order) => {
              if (order) {
                onHome();
              }
            });
          }}
          disabled={loading}
          className="mt-6 bg-gradient-to-r from-customOrange1 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold text-xl py-4 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? 'Processing...' : 'Finish'}
        </button>
      </div>
    </div>
  );
};

export default Payment3;