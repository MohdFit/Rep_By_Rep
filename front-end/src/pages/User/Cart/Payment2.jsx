// Payment2.jsx
import { useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import Card from "./CreditCard.jpg";

const Payment2 = ({ onBack, onClose, onConfirm }) => {
  const [saveCard, setSaveCard] = useState(false);

  const handleSaveCard = () => {
    setSaveCard(!saveCard);
    if (!saveCard) {
      // You can add actual save-to-backend logic here later
      console.log("Card will be saved on exit");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[600px] h-[450px] p-6 relative shadow-lg font-poppins">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-4">
          <ArrowLeft
            className="w-6 h-6 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"
            onClick={onBack}
          />
          <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 font-poppins">
            Make Payment
          </h2>
          <X
            className="w-6 h-6 cursor-pointer text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400"
            onClick={onClose}
          />
        </div>

        {/* Step Circles */}
        <div className="flex justify-center gap-4 mb-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                num === 2
                  ? "bg-gradient-to-r from-red-500 to-orange-400"
                  : "bg-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-6 items-center">
          {/* Left: Card Image */}
          <img
            src={Card} // Replace with your uploaded image path
            alt="Credit Card"
            className="w-full rounded-xl shadow-md"
          />

          {/* Right: Form */}
          <div className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Card Number"
              className="border border-gray-300 rounded-xl p-2 focus:outline-none"
              maxLength={16}
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="MM/YY"
                className="border border-gray-300 rounded-xl p-2 w-1/2 focus:outline-none"
              />
              <input
                type="text"
                placeholder="CVV"
                className="border border-gray-300 rounded-xl p-2 w-1/2 focus:outline-none"
                maxLength={3}
              />
            </div>
            <label className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={handleSaveCard}
                className="accent-orange-400"
              />
              <span className="text-gray-700 font-poppins">
                Save this card
              </span>
            </label>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="flex justify-center mt-6">
          <button
            type="button"
            onClick={onConfirm}
            className="bg-gradient-to-r from-red-500 to-orange-400 text-white font-medium font-poppins py-2 px-6 rounded-xl hover:opacity-90 transition-all"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment2;
