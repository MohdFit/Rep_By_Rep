import { useNavigate } from "react-router-dom";

export default function CTAButton({ onClick, className = "", children = "Join Now" }) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate("/register");
    }
  };
  
  return (
    <button 
      onClick={handleClick}
      className={`inline-flex items-center justify-center px-8 sm:px-10 md:px-12 py-3 sm:py-4 bg-gradient-to-r from-customOrange1 to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white text-base sm:text-lg md:text-xl font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
