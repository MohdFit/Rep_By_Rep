import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaRegUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/homelogo.png"; // Desktop logo
import logo2 from "../assets/images/test.png";    // Mobile logo

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navLinks = useMemo(
    () => [
      { label: "Home", path: "/" },
      { label: "Training Programs", path: "/programs" },
    ],
    []
  );

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

  const toggleUserDropdown = useCallback(() => {
    setUserDropdownOpen((open) => !open);
  }, []);
  
  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleNavigate = useCallback(
    (path) => {
      closeMenu();
      navigate(path);
    },
    [closeMenu, navigate]
  );

  return (
    <nav className="w-full bg-[#11131B] text-white px-6 py-4 flex items-center justify-between relative z-50">
      <div className="flex items-center">
        <img
          src={logo2}
          alt="Mobile Logo"
          className="h-6 w-auto object-contain cursor-pointer sm:hidden"
          onClick={() => handleNavigate("/")}
        />
        <img
          src={logo}
          alt="Desktop Logo"
          className="w-auto object-contain cursor-pointer hidden sm:block"
          onClick={() => handleNavigate("/")}
        />
      </div>

      <ul className="hidden sm:flex gap-10 text-lg font-medium">
        {navLinks.map((item) => (
          <li key={item.path} className="cursor-pointer hover:text-orange-500">
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-6 text-lg">
        <div className="relative" ref={dropdownRef}>
          <FaRegUser
            className="cursor-pointer hover:text-orange-500"
            onClick={toggleUserDropdown}
          />
          
          {userDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#11131B] border-2 border-gray-600 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-3 text-white border-b border-gray-600 bg-gradient-to-r from-orange-500/10 to-orange-600/10">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Welcome Back!</p>
                    <p className="font-semibold text-lg mt-1">{user.fullName || user.name || user.email?.split('@')[0]}</p>
                  </div>
                  <Link 
                    to="/user/account-settings" 
                    className="block px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 hover:text-orange-400 transition-all font-medium"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                     Account Settings
                  </Link>
                  <Link 
                    to="/user/my-orders" 
                    className="block px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 hover:text-orange-400 transition-all font-medium"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                     My Orders
                  </Link>
                  <button 
                    onClick={async () => {
                      await logout();
                      setUserDropdownOpen(false);
                      navigate('/');
                    }}
                    className="w-full text-left px-4 py-3 text-white hover:bg-red-500/20 hover:text-red-400 transition-all border-t border-gray-600 font-medium"
                  >
                     Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 hover:text-orange-400 transition-all font-medium"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                     Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-3 text-white hover:bg-gradient-to-r hover:from-orange-500/20 hover:to-orange-600/20 hover:text-orange-400 transition-all font-medium"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                     Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        
        <Link to="/user/cart" className="hover:text-orange-500 transition-colors">
          <FaShoppingBag className="cursor-pointer" />
        </Link>

        <button
          className="sm:hidden text-2xl"
          onClick={toggleMenu}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#11131B]/90 backdrop-blur-sm text-white flex flex-col px-6 py-6 z-40 shadow-lg rounded-b-2xl animate-slideDown">
          <ul className="flex flex-col gap-6 text-lg font-medium">
            {navLinks.map((item) => (
              <li key={item.path} className="cursor-pointer hover:text-orange-500">
                <button
                  type="button"
                  onClick={() => handleNavigate(item.path)}
                  className="w-full text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

