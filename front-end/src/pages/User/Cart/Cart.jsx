// front-end/src/pages/User/Cart/Cart.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import FooterWhite from "../../../components/FooterWhite";
import box from "../../../assets/images/allproducts/box.png"; // example product image
import Payment1 from "./Payment1";
import Payment2 from "./Payment2";
import Payment3 from "./Payment3";

export default function CartPage() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "T-Shirt",
      color: "Red",
      size: "M",
      unitPrice: 20,
      quantity: 1,
      img: box,
    },
    {
      id: 2,
      name: "Hoodie",
      color: "Blue",
      size: "L",
      unitPrice: 35,
      quantity: 2,
      img: box,
    },
  ]);

  const changeQuantity = (id, delta) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // 1 = Payment1, 2 = Payment2, 3 = Payment3
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
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-300 pb-4 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4"
            >
              <div className="col-span-6 flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => removeItem(item.id)}
                  className="w-8 h-8 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center font-bold text-lg self-start sm:self-auto"
                >
                  ×
                </button>

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div className="flex flex-col">
                  <span className="font-semibold text-[20px] sm:text-[24px]">
                    {item.name}
                  </span>
                  <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mt-1 self-start">
                    {item.color} / {item.size}
                  </span>
                </div>
              </div>

              <div className="col-span-2 text-right font-medium text-lg mt-2 sm:mt-8">
                ${item.unitPrice.toFixed(2)}
              </div>

              <div className="col-span-2 flex justify-center items-center space-x-1 mt-2 sm:mt-0">
                <button
                  onClick={() => changeQuantity(item.id, -1)}
                  className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded"
                >
                  -
                </button>
                <span className="px-3 py-1 border rounded">
                  {item.quantity}
                </span>
                <button
                  onClick={() => changeQuantity(item.id, 1)}
                  className="px-2 py-1 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded"
                >
                  +
                </button>
              </div>

              <div className="col-span-2 text-right font-medium text-lg mt-2 sm:mt-8">
                ${(item.unitPrice * item.quantity).toFixed(2)}
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
                className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-400"
              />
              <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-400 text-white font-medium rounded-md hover:opacity-90 transition">
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
                  .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
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
                    (sum, item) => sum + item.unitPrice * item.quantity,
                    0
                  ) + 5
                ).toFixed(2)}
              </span>
            </div>

            <button onClick={() => setIsPaymentOpen(true)} className="w-full mt-4 py-2 bg-gradient-to-r from-red-500 to-orange-400 text-white rounded-md font-medium hover:opacity-90 transition" >
              Check Out
            </button>

            {isPaymentOpen && currentStep === 1 && (
              <Payment1
                onClose={() => setIsPaymentOpen(false)}
                onBack={() => setIsPaymentOpen(false)}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {isPaymentOpen && currentStep === 2 && (
              <Payment2
                onClose={() => setIsPaymentOpen(false)}
                onBack={() => setCurrentStep(1)}
                onConfirm={() => setCurrentStep(3)}
              />
            )}

            {isPaymentOpen && currentStep === 3 && (
              <Payment3
                onClose={() => {setIsPaymentOpen(false); setCurrentStep(1);}}
                onBack={() => setCurrentStep(2)}
                onConfirm={() => setIsPaymentOpen(false)}
                onHome={() => {setIsPaymentOpen(false); setCurrentStep(1); navigate("/");}}
                />
            )}

  
          </div>
        </div>
      </div>

      <FooterWhite />
    </>
  );
}

