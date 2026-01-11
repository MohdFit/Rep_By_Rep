import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaRegUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../assets/images/homelogo.png"; // Desktop logo
import logo2 from "../assets/images/test.png";    // Mobile logo

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Mock user state
  const [user, setUser] = useState(null); // null if not logged in

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-[#11131B] text-white px-6 py-4 flex items-center justify-between relative z-50">
      {/* Left - Logo */}
      <div className="flex items-center">
        {/* Mobile Logo */}
        <img
          src={logo2}
          alt="Mobile Logo"
          className="h-6 w-auto object-contain cursor-pointer sm:hidden"
          onClick={() => navigate("/")}
        />
        {/* Desktop Logo */}
        <img
          src={logo}
          alt="Desktop Logo"
          className="w-auto object-contain cursor-pointer hidden sm:block"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Middle - Links (Desktop Only) */}
      <ul className="hidden sm:flex gap-10 text-lg font-medium">
        <li className="cursor-pointer hover:text-orange-500">
          <Link to="/">Home</Link>
        </li>
        <li className="cursor-pointer hover:text-orange-500">
          <Link to="/about">About</Link>
        </li>
        <li className="cursor-pointer hover:text-orange-500">
          <Link to="/contact">Contact Us</Link>
        </li>
        <li className="cursor-pointer hover:text-orange-500">
          <Link to="/allproducts">Shop</Link>
        </li>
      </ul>

      {/* Right - Icons */}
      <div className="flex items-center gap-6 text-lg">
        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <FaRegUser 
            className="cursor-pointer hover:text-orange-500" 
            onClick={() => setUserDropdownOpen(!userDropdownOpen)}
          />
          
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#11131B] border border-gray-600 rounded-lg shadow-lg py-2 z-50">
              {user ? (
                <>
                  <div className="px-4 py-2 text-white border-b border-gray-600">
                    <p className="text-sm text-gray-300">Welcome</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                  <button 
                    onClick={() => setUser(null)} // replace with logout logic
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        
        <FaShoppingBag className="cursor-pointer hover:text-orange-500" />

        {/* Hamburger Menu (Mobile Only) */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#11131B]/90 backdrop-blur-sm text-white flex flex-col px-6 py-6 z-40 shadow-lg rounded-b-2xl animate-slideDown">
          <ul className="flex flex-col gap-6 text-lg font-medium">
            <li className="cursor-pointer hover:text-orange-500">
              <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-orange-500">
              <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            </li>
            <li className="cursor-pointer hover:text-orange-500">
              <Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </li>
            <li className="cursor-pointer hover:text-orange-500">
              <Link to="/allproducts" onClick={() => setIsOpen(false)}>Shop</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
