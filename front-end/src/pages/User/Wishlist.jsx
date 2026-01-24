import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import FooterWhite from "../../components/FooterWhite";
import heart from "../../assets/images/InnerPageWorkout/heart.png";
import box from "../../assets/images/allproducts/box.png";
import wishlistService from "../../services/wishlistService";
import { useCart } from "../../context/CartContext";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await wishlistService.getWishlist();
        if (res?.success) {
          setWishlistItems(res.data || []);
        } else {
          setWishlistItems([]);
        }
      } catch (_) {
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  const startIndex = (activePage - 1) * itemsPerPage;
  const displayedItems = wishlistItems.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToBag = async (item) => {
    try {
      const planId = item.product?._id || item.productId || item._id;
      await addToCart(planId, 'Plan', 1);
      // Optionally remove from wishlist after adding to cart
      // await handleRemove(item);
      alert('Added to cart!');
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  const handleRemove = async (item) => {
    try {
      const id = item._id || item.id;
      const res = await wishlistService.removeFromWishlist(id);
      if (res?.success) {
        setWishlistItems((prev) => prev.filter((w) => (w._id || w.id) !== id));
      }
    } catch (_) {
      // silently fail for now
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 sm:px-[83px] mt-[50px] mb-[100px] font-poppins">
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-textColor mb-10">
          Your Favourite Picks
        </h2>

        {loading && (
          <div className="text-center text-gray-700">Loading your wishlist...</div>
        )}
        {!loading && wishlistItems.length === 0 && (
          <div className="text-center text-gray-700 mb-8">
            Your wishlist is empty. Explore Programs and add training plans you like.
          </div>
        )}
        
        
        <div
          className="
            grid 
            grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
            gap-4 sm:gap-8
          "
        >
          {displayedItems.map((item) => (
            <div key={item.id} className="relative text-white font-poppins">
              <img
                src={item.product?.image || item.image || box}
                alt={item.product?.title || item.name || 'Training Plan'}
                className="w-full rounded-2xl object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full sm:p-4 p-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-b-2xl">
                <h3 className="sm:text-2xl text-sm font-semibold">{item.product?.title || item.name || 'Training Plan'}</h3>
                <p className="font-medium sm:text-sm text-[10px]">${(item.product?.price || item.price || 0).toFixed(2)}</p>

                <div className="flex justify-between items-center mt-[6px] sm:mt-[14px]">
                  <button
                    onClick={() => handleAddToBag(item)}
                    className="block px-[10px] sm:px-[15px] text-[9px] sm:text-xs font-semibold bg-[#FBF4F24D]/30 sm:w-[150px] text-center border border-customOrange1 rounded-[17px] uppercase"
                  >
                    add to bag
                  </button>

                  
                  <button className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-400 mask-heart" onClick={() => handleRemove(item)} aria-label="Remove from wishlist">
                    <img
                      src={heart}
                      alt="wishlist-heart"
                      className="sm:w-[16px] sm:h-[16px] w-[10px] h-[10px]"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="hidden sm:flex justify-center space-x-4 items-center mt-[100px]">
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              onClick={() => setActivePage(i + 1)}
              className={`cursor-pointer ${
                activePage === i + 1
                  ? "text-white bg-gradient-to-b from-customOrange1 to-customOrange2 rounded-full sm:w-[30px] sm:h-[30px] flex justify-center items-center"
                  : ""
              }`}
            >
              {i + 1}
            </span>
          ))}
          {activePage < totalPages && (
            <span
              onClick={() => setActivePage(activePage + 1)}
              className="cursor-pointer"
            >
              &rarr;
            </span>
          )}
        </div>

        
        <div className="flex sm:hidden justify-center space-x-2 mt-10">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setActivePage(i + 1)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activePage === i + 1
                  ? "bg-gradient-to-r from-customOrange1 to-customOrange2 scale-110"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
      <FooterWhite />
    </>
  );
}

