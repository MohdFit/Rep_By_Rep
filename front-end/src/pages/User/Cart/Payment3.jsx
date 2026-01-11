// Payment3.jsx
import { X, ArrowLeft } from "lucide-react";

const Payment3 = ({ onBack, onClose, onHome }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-[600px] h-[520px] rounded-2xl p-8 relative flex flex-col items-center">
        
        {/* Top Navigation */}
        <div className="flex justify-between items-center w-full mb-4">
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

        {/* Content */}
        <h3 className="font-poppins font-medium text-[24px] mb-6 text-center">
          Thank you for choosing us.
        </h3>

        {/* Big Tick Box */}
        <div className="w-24 h-24 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-400 text-white text-5xl">
          ✓
        </div>

        {/* Confirmation Text */}
        <p className="font-poppins text-[16px] text-center mb-2">
          We're happy to confirm your payment
        </p>
        <p className="font-poppins text-[16px] text-center mb-6">
          You'll receive an email shortly with your order details
        </p>

        {/* Back to Home Button */}
        <button
        
          onClick={onHome}
          className="mt-auto bg-gradient-to-r from-red-500 to-orange-400 text-white font-poppins font-extrabold text-[24px] py-3 px-6 rounded-xl hover:opacity-90 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Payment3;
