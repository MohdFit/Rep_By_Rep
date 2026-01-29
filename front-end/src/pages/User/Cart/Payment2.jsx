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

  const handleConfirm = () => {
    // Pass payment method to parent
    onConfirm("credit");
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-[600px] max-w-[95vw] max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl font-poppins">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="hover:scale-110 transition-transform">
            <ArrowLeft className="w-6 h-6 text-orange-500" />
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-customOrange1 to-orange-500">
            Make Payment
          </h2>
          <button onClick={onClose} className="hover:scale-110 transition-transform">
            <X className="w-6 h-6 text-gray-500 hover:text-red-500" />
          </button>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all ${
                num === 2
                  ? "bg-gradient-to-r from-customOrange1 to-orange-500 shadow-lg scale-110"
                  : "bg-gray-300"
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-6 items-center">
          <img
            src={Card}
            alt="Credit Card"
            className="w-full rounded-xl shadow-md"
          />

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
            />
            <input
              type="text"
              placeholder="Card Number"
              className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
              maxLength={16}
            />
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-1/2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
              />
              <input
                type="text"
                placeholder="CVV"
                className="border-2 border-gray-300 rounded-lg px-4 py-3 w-1/2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
                maxLength={3}
              />
            </div>
            <label className="flex items-center gap-2 mt-2 cursor-pointer hover:text-orange-600 transition-colors">
              <input
                type="checkbox"
                checked={saveCard}
                onChange={handleSaveCard}
                className="w-4 h-4 accent-orange-500"
              />
              <span className="text-gray-700 font-medium">
                Save this card for future purchases
              </span>
            </label>
          </div>
        </div>

        <div className="flex justify-center mt-8 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleConfirm}
            className="bg-gradient-to-r from-customOrange1 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold py-3 px-12 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Confirm Payment →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment2;

