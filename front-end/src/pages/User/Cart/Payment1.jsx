// Payment1.jsx
import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react"; // icons from lucide-react
import { useEffect } from "react";

// import your icons later for the payment methods (e.g. visa, paypal, bank icons)



export default function Payment1({ onClose, onBack, onNext }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    phone: "",
    paymentMethod: "credit", // default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (method) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const validateAndNext = () => {
    const { firstName, lastName, email, address, phone } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName || !lastName || !email || !address || !phone) {
      alert("⚠️ Please fill in all required fields.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }
    if (!/^\d{9,}$/.test(phone)) {
      alert("⚠️ Phone number must be at least 9 digits and contain only numbers.");
      return;
    }

    // Pass formData to parent
    onNext(formData);
  };

  useEffect(() => {
    // Disable background scrolling
    document.body.style.overflow = "hidden";

    // Re-enable when modal unmounts
    return () => {
        document.body.style.overflow = "auto";
    };
    }, []);


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
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all ${
                n === 1
                  ? "bg-gradient-to-r from-customOrange1 to-orange-500 shadow-lg scale-110"
                  : "bg-gray-300"
              }`}
            >
              {n}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all font-medium"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all col-span-1 sm:col-span-2 font-medium"
          />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address of Delivery"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all h-[70px] col-span-1 sm:col-span-2 resize-none font-medium"
          />
          
          <div className="flex flex-col col-span-1 sm:col-span-2">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-customOrange1 to-orange-500 mb-4">
              Select Payment Method
            </h3>

            <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <label className="flex items-center space-x-3 cursor-pointer hover:bg-white p-2 rounded transition-colors">
                <input
                  type="radio"
                  checked={formData.paymentMethod === "credit"}
                  onChange={() => handlePaymentChange("credit")}
                  className="w-4 h-4 text-orange-500"
                />
                <span className="font-medium text-gray-800">Credit Card or Debit Card</span>
              </label>

              <label className="flex items-center space-x-3 opacity-50 cursor-not-allowed p-2">
                <input type="radio" disabled className="w-4 h-4" />
                <span className="font-medium text-gray-600">Paypal (Coming Soon)</span>
              </label>

              <label className="flex items-center space-x-3 opacity-50 cursor-not-allowed p-2">
                <input type="radio" disabled className="w-4 h-4" />
                <span className="font-medium text-gray-600">Bank Transfer (Coming Soon)</span>
              </label>
            </div>
          </div>
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile Phone Number"
            className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all col-span-1 sm:col-span-2 font-medium"
          />
        </div>

        <div className="flex justify-end mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={validateAndNext}
            className="px-8 py-3 rounded-lg text-white font-bold bg-gradient-to-r from-customOrange1 to-orange-500 hover:from-orange-700 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Continue to Payment →
          </button>
        </div>
      </div>
    </div>
  );
}

