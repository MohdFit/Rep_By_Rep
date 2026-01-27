import vector from "../assets/images/allproducts/Vector.png";
import list from "../assets/images/allproducts/List.png";
import searchIcon from "../assets/images/allproducts/MagnifyingGlass.png";
import userIcon from "../assets/images/allproducts/User.png";
import shoppingCartIcon from "../assets/images/allproducts/ShoppingCart.png";
import heartIcon from "../assets/images/allproducts/heart.png";
import { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import wishlistService from "../services/wishlistService";

function Header({
  className = " mt-[36px] sm:mt-[52px] px-[17px] sm:px-[83px]  relative min-h-[36px] ",
}) {
  const [show, setShow] = useState(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        setUser(null);
      }
    }
    
    const fetchWishlistCount = async () => {
      // Only fetch if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        setWishlistCount(0);
        return;
      }
      
      try {
        const res = await wishlistService.getWishlist();
        if (res?.success) {
          setWishlistCount((res.data?.items || []).length);
        }
      } catch (_) {
        setWishlistCount(0);
      }
    };
    fetchWishlistCount();
  }, []);

  return (
    <div className={className}>
      <header
        className={`flex items-center mb-[23px] sm:mb-[80px] relative ${
          show ? "justify-center" : "justify-between"
        }`}
      >
        {!show && (
          <ul className="sm:hidden flex mr-[54px] space-x-2">
            <li className="w-[18px]">
              <button
                type="button"
                onClick={() => setShow("menu")}
                className="w-full h-full"
                aria-label="Open menu"
              >
                <img src={list} alt="" />
              </button>
            </li>
            <li className="w-[18px]">
              <button
                type="button"
                onClick={() => setShow("search")}
                className="w-full h-full"
                aria-label="Open search"
              >
                <img src={searchIcon} alt="" />
              </button>
            </li>
          </ul>
        )}

        <div className="flex flex-col items-center">
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className="h-[20px]" />
          </Link>

          {show === "menu" && (
            <ul className="mt-2">
              <li>
                <Link to="/programs" onClick={() => setShow(null)}>
                  Training Programs
                </Link>
              </li>
              <li>
                <Link to="/" onClick={() => setShow(null)}>
                  Home
                </Link>
              </li>
            </ul>
          )}

          {show === "search" && (
            <div className="p-[2px] rounded-[16px] bg-gradient-to-r from-orange-600 to-orange-500 my-4 relative">
              <input
                type="text"
                placeholder="Search For..."
                className="w-[368px] h-[32px] rounded-[14px] pl-2 bg-white placeholder-gray-400 text-black outline-none"
              />
              <img 
                src={searchIcon}
                alt=""
                className="absolute right-[9px] bottom-[9px]"
              />
            </div>
          )}
        </div>

        <ul className="justify-between items-center space-x-7 hidden sm:flex">
          <li>
            <Link to="/">HOME</Link>
          </li>
          <li>
            <Link to="/programs">TRAINING PROGRAMS</Link>
          </li>
        </ul>

        {!show && (
          <div className="flex justify-between items-center space-x-2 bg-white">
            <div className="p-[2px] rounded-[16px] bg-gradient-to-r from-orange-600 to-orange-500 hidden sm:block">
              <input
                type="text"
                placeholder="Search For..."
                className="w-[280px] h-[32px] rounded-[16px] pl-2 bg-white placeholder-gray-400 text-black outline-none"
              />
            </div>

            <Link to="/user/wishlist" aria-label="Wishlist" className="relative">
              <img src={heartIcon} alt="" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/user/cart" aria-label="Cart">
              <img src={shoppingCartIcon} alt="" />
            </Link>
            <Link to="/user/account-settings" aria-label="Account" className="flex items-center gap-2">
              <img src={userIcon} alt="" />
              {user && (
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {user.fullName || user.name || user.email?.split('@')[0]}
                </span>
              )}
            </Link>
          </div>
        )}

        {show && (
          <button
            type="button"
            className="absolute top-0 right-0"
            onClick={() => setShow(null)}
            aria-label="Close"
          >
            <img src={vector} alt="" />
          </button>
        )}
      </header>
    </div>
  );
}

export default memo(Header);

