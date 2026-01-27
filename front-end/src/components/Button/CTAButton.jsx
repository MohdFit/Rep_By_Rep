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
      className={`inline-flex items-center justify-center px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-transparent border-2 border-orange-500 text-white text-base sm:text-lg md:text-xl font-semibold rounded-full hover:bg-orange-500 hover:border-orange-500 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
