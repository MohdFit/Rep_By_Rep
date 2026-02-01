// front-end/src/pages/User/Cart/Cart.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import Header from "../../../components/Header";
import FooterWhite from "../../../components/FooterWhite";
import box from "../../../assets/images/allproducts/box.png"; // placeholder image
import Payment1 from "./Payment1";
import Payment2 from "./Payment2";
import Payment3 from "./Payment3";

export default function CartPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, updateCartItem, removeFromCart, clearCart, loading } = useCart();

  // Use real cart items from context; fall back to empty list
  const cartItems = Array.isArray(cart?.items) ? cart.items : [];

  // Store shipping data from Payment1
  const [shippingData, setShippingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const changeQuantity = async (item, delta) => {
    const newQty = Math.max(1, (item.quantity || 1) + delta);
    try {
      await updateCartItem(item._id || item.id, newQty);
    } catch (err) {
      // Optionally show a toast
    }
  };

  const removeItem = async (item) => {
    try {
      await removeFromCart(item._id || item.id);
    } catch (err) {
      // Optionally show a toast
    }
  };

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = Payment1, 2 = Payment2, 3 = Payment3

  // Calculate totals
  const getUnitPrice = (item) => item.unitPrice ?? item.price ?? item.product?.price ?? 0;
  const subtotal = cartItems.reduce(
    (sum, item) => sum + getUnitPrice(item) * (item.quantity || 1),
    0
  );
  const shippingFee = 5;
  const total = subtotal + shippingFee;

  // Auto-open checkout when deep-linked with ?checkout=true
  useEffect(() => {
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('checkout') === 'true') {
        setIsPaymentOpen(true);
        setCurrentStep(1);
      }
    } catch (_) {
      // no-op: if URL parsing fails, ignore
    }
  }, [location.search]);
  return (
    <>
      <Header />

      <div className="px-4 sm:px-[83px] mt-12 mb-24 font-poppins">
        
        <div className="hidden sm:grid grid-cols-12 gap-4 border-b border-gray-300 pb-4 mb-4 text-gray-700 font-semibold">
          <div className="col-span-6">PRODUCT</div>
          <div className="col-span-2 text-right">UNIT PRICE</div>
          <div className="col-span-2 text-center">QTY</div>
          <div className="col-span-2 text-right">PRICE</div>
        </div>

        <div className="flex flex-col space-y-6">
          {loading && (
            <div className="text-center py-12\">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4\"></div>
              <p className="text-gray-600 text-lg\">Loading your cart...</p>
            </div>
          )}
          {!loading && cartItems.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 text-lg font-medium">Your cart is empty.</p>
              <p className="text-gray-600 mt-2 mb-4">Add a training plan from Programs to get started.</p>
              <a href="/programs" className="inline-block px-6 py-2 bg-gradient-to-r from-customOrange1 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all\">
                Browse Programs
              </a>
            </div>
          )}
          {!loading && cartItems.map((item) => (
            <div
              key={item._id || item.id}
              className="border-b border-gray-300 pb-4 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4"
            >
              <div className="col-span-6 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => removeItem(item)}
                  className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 flex items-center justify-center font-bold text-xl self-start sm:self-auto transition-all\"
                  aria-label="Remove from cart\"
                >
                  ×
                </button>

                <img
                  src={item.product?.image || item.image || box}
                  alt={item.product?.name || item.name || 'Plan'}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex flex-col">
                  <span className="font-semibold text-[20px] sm:text-[24px]">
                    {item.product?.name || item.name || 'Training Plan'}
                  </span>
                </div>
              </div>

              <div className="col-span-2 text-right font-medium text-lg mt-2 sm:mt-8">
                ${getUnitPrice(item).toFixed(2)}
              </div>

              <div className="col-span-2 flex justify-center items-center space-x-1 mt-2 sm:mt-0">
                <button
                  onClick={() => changeQuantity(item, -1)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors border border-gray-300\"
                >
                  −
                </button>
                <span className="px-4 py-2 border-2 border-gray-300 rounded-lg font-medium text-center min-w-[50px]\">
                  {item.quantity || 1}
                </span>
                <button
                  onClick={() => changeQuantity(item, 1)}
                  className="px-3 py-2 bg-gradient-to-r from-customOrange1 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-lg transition-all\"
                >
                  +
                </button>
              </div>

              <div className="col-span-2 text-right font-medium text-lg mt-2 sm:mt-8">
                ${(getUnitPrice(item) * (item.quantity || 1)).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-start md:items-start gap-8">
          <div className="w-full sm:w-[320px] rounded-lg p-4 bg-white shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-3">
              Voucher Code
            </h3>
            <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0">
              <input
                type="text"
                placeholder="Enter code"
                className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-customOrange1 focus:ring-2 focus:ring-orange-200 outline-none transition-all placeholder-gray-400 font-medium\"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-customOrange1 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-[1.02]\">
                Redeem
              </button>
            </div>
          </div>

          <div className="w-full sm:w-[360px] rounded-lg p-6 bg-white shadow-sm font-poppins space-y-3 ml-auto">
            <div className="flex justify-between text-[16px] text-gray-700">
              <span>Subtotal</span>
              <span>
                $
                {cartItems
                  .reduce((sum, item) => sum + getUnitPrice(item) * (item.quantity || 1), 0)
                  .toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-[16px] text-gray-700">
              <span>Shipping Fee</span>
              <span>$5.00</span>
            </div>
            <div className="flex justify-between text-[16px] text-gray-700">
              <span>Coupon</span>
              <span>No</span>
            </div>
            <div className="border-t border-gray-300 pt-3 flex justify-between text-[22px] font-medium text-black">
              <span>Total</span>
              <span>
                $
                {(
                  cartItems.reduce(
                    (sum, item) => sum + getUnitPrice(item) * (item.quantity || 1),
                    0
                  ) + shippingFee
                ).toFixed(2)}
              </span>
            </div>

            <button 
              onClick={() => setIsPaymentOpen(true)} 
              className="w-full mt-6 py-3 bg-gradient-to-r from-customOrange1 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]\"
            >
              Proceed to Checkout
            </button>

            {isPaymentOpen && currentStep === 1 && (
              <Payment1
                onClose={() => setIsPaymentOpen(false)}
                onBack={() => setIsPaymentOpen(false)}
                onNext={(data) => {
                  setShippingData(data);
                  setCurrentStep(2);
                }}
              />
            )}

            {isPaymentOpen && currentStep === 2 && (
              <Payment2
                onClose={() => setIsPaymentOpen(false)}
                onBack={() => setCurrentStep(1)}
                onConfirm={(method) => {
                  setPaymentMethod(method);
                  setCurrentStep(3);
                }}
              />
            )}

            {isPaymentOpen && currentStep === 3 && (
              <Payment3
                shippingData={shippingData}
                paymentMethod={paymentMethod}
                cartItems={cartItems}
                orderTotal={total}
                onClose={() => {setIsPaymentOpen(false); setCurrentStep(1);}}
                onBack={() => setCurrentStep(2)}
                onConfirm={() => setIsPaymentOpen(false)}
                onHome={() => {setIsPaymentOpen(false); setCurrentStep(1); navigate("/user/order-confirmation");}}
                />
            )}

  
          </div>
        </div>
      </div>

      <FooterWhite />
    </>
  );
}

