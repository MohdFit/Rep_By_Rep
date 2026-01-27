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
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#11131B] border border-gray-600 rounded-lg shadow-lg py-2 z-50">
              {isAuthenticated && user ? (
                <>
                  <div className="px-4 py-2 text-white border-b border-gray-600">
                    <p className="text-sm text-gray-300">Welcome Back!</p>
                    <p className="font-medium">{user.fullName || user.name || user.email?.split('@')[0]}</p>
                  </div>
                  <Link 
                    to="/user/account-settings" 
                    className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Account Settings
                  </Link>
                  <Link 
                    to="/user/my-orders" 
                    className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500"
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
                    className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500 border-t border-gray-600"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="block px-4 py-2 text-white hover:bg-gray-700 hover:text-orange-500"
                    onClick={() => setUserDropdownOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
        
        <FaShoppingBag className="cursor-pointer hover:text-orange-500" />

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

