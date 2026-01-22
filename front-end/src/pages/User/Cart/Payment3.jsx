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
          productType: item.productType || 'TShirt',
          quantity: item.quantity || 1,
          unitPrice: item.price || item.unitPrice || 0,
          selectedSize: item.selectedSize,
          selectedColor: item.selectedColor
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
        
        // Show success message
      } else {
        setError(response.message || "Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError(err.message || "An error occurred while creating order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-[600px] h-[520px] rounded-2xl p-8 relative flex flex-col items-center">
        <div className="flex justify-between items-center w-full mb-4">
          <ArrowLeft
            className="w-6 h-6 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"
            onClick={onBack}
            style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
          />
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 font-poppins">
            Make Payment
          </h2>
          <X
            className="w-6 h-6 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"
            onClick={onClose}
            style={{ pointerEvents: loading ? 'none' : 'auto', opacity: loading ? 0.5 : 1 }}
          />
        </div>

        <div className="flex justify-center gap-4 mb-6 w-full">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                num === 3
                  ? "bg-gradient-to-r from-red-500 to-orange-400"
                  : "bg-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {error && (
          <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <h3 className="font-poppins font-medium text-[24px] mb-6 text-center">
          Thank you for choosing us.
        </h3>

        <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-400 text-white text-5xl">
          {loading ? '⏳' : '✓'}
        </div>
        <p className="font-poppins text-[16px] text-center mb-2">
          {loading ? 'Processing your order...' : "We're happy to confirm your payment"}
        </p>
        <p className="font-poppins text-[16px] text-center mb-6">
          {loading ? 'Please wait...' : "You'll receive an email shortly with your order details"}
        </p>

        <button
          onClick={() => {
            handleCreateOrder().then(() => {
              onHome();
            });
          }}
          disabled={loading}
          className="mt-auto bg-gradient-to-r from-red-500 to-orange-400 text-white font-poppins font-extrabold text-[24px] py-3 px-6 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Back to Home'}
        </button>
      </div>
    </div>
  );
};

export default Payment3;