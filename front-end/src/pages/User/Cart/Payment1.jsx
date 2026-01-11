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
      alert("Please fill in all fields.");
      return;
    }
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!/^\d{9,}$/.test(phone)) {
      alert("Phone number must be at least 9 digits and contain only numbers.");
      return;
    }

    onNext();
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
      <div className="bg-white rounded-2xl w-[600px] h-[600px] p-6 relative shadow-lg font-poppins">
        {/* Top section */}
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack}>
            <ArrowLeft className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400" />
          </button>
          <h2 className="text-[32px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
            Make Payment
          </h2>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="flex justify-center space-x-3 mb-8">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-medium ${
                n === 1
                  ? "bg-gradient-to-r from-red-500 to-orange-400"
                  : "bg-gray-300"
              }`}
            >
              {n}
            </div>
          ))}
        </div>

        {/* Form grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* First Name */}
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {/* Last Name */}
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          {/* Email */}
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 col-span-1 sm:col-span-2"
          />
          {/* Address */}
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address of Delivery"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 h-[70px] col-span-1 sm:col-span-2"
          />
          
          {/* Payment Section */}
          <div className="flex flex-col">
            <h3 className="text-[20px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 mb-2">
              Select Payment Method
            </h3>

            <div className="space-y-2">
              {/* Credit/Debit */}
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  checked={formData.paymentMethod === "credit"}
                  onChange={() => handlePaymentChange("credit")}
                />
                <span>Credit Card or Debit Card</span>
              </label>

              {/* Paypal */}
              <label className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                <input type="radio" disabled />
                <span>Paypal</span>
              </label>

              {/* Bank Transfer */}
              <label className="flex items-center space-x-2 opacity-50 cursor-not-allowed">
                <input type="radio" disabled />
                <span>Bank Transfer</span>
              </label>
            </div>
          </div>
          {/* Mobile */}
          <input
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Mobile Phone Number"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 max-h-[0px]"
          />
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={validateAndNext}
            className="px-6 py-2 rounded-md text-white font-medium bg-gradient-to-r from-red-500 to-orange-400 hover:opacity-90 transition"
          >
            Go to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
