import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import overlay from "../../assets/images/productPlans/Overlay.png";
import box from "../../assets/images/productPlans/men.jpg";
import FilterPills from "./FilterPills";
import FooterWhite from "../../components/FooterWhite";
import { getAllPlans } from "../../services/productService";
import { useCart } from "../../context/CartContext";
import ProductReviews from "../../components/ProductReviews";
import heart from "../../assets/images/productPlans/heart.png";
import wishlistService from "../../services/wishlistService";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function ProductPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [swiperKey, setSwiperKey] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await getAllPlans();
        if (response.success) {
          setPlans(response.data || []);
        }
      } catch (err) {
        console.error('Error fetching plans:', err);
        setError('Failed to load plans');
      } finally {
        setLoading(false);
      }
    };
    const fetchWishlist = async () => {
      // Only fetch if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        setWishlist([]);
        return;
      }
      
      try {
        const res = await wishlistService.getWishlist();
        if (res?.success) {
          // Handle both array response and object with items property
          const items = Array.isArray(res.data) ? res.data : (res.data?.items || []);
          setWishlist(items.map(it => String(it.productId || it._id)));
        }
      } catch (_) {
        setWishlist([]);
      }
    };
    fetchPlans();
    fetchWishlist();
  }, []);

  const handleAddToCart = async (plan) => {
    try {
      await addToCart(plan._id, 'Plan', 1);
      // Create a temporary success message
      const msg = document.createElement('div');
      msg.textContent = '✓ Added to cart!';
      msg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      const msg = document.createElement('div');
      msg.textContent = '✗ Failed to add to cart';
      msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }
  };

  const handleBuyNow = async (plan) => {
    try {
      // Ensure the plan is in the cart, then deep-link to checkout
      await addToCart(plan._id, 'Plan', 1);
      navigate('/user/cart?checkout=true');
    } catch (error) {
      console.error('Error processing Buy Now:', error);
      const msg = document.createElement('div');
      msg.textContent = '✗ Failed to start checkout';
      msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }
  };

  const isInWishlist = (planId) => wishlist.includes(String(planId));

  const handleAddToWishlist = async (plan) => {
    // Check if already in wishlist
    if (isInWishlist(plan._id)) {
      const msg = document.createElement('div');
      msg.textContent = 'ℹ Already in wishlist';
      msg.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
      return;
    }
    
    try {
      const res = await wishlistService.addToWishlist(plan._id);
      if (res?.success) {
        setWishlist([...wishlist, String(plan._id)]);
        const msg = document.createElement('div');
        msg.textContent = '♥ Added to wishlist';
        msg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
        document.body.appendChild(msg);
        setTimeout(() => msg.remove(), 3000);
      } else {
        throw new Error(res?.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      const msg = document.createElement('div');
      msg.textContent = '✗ ' + (error.message || 'Failed to add to wishlist');
      msg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-[9999] animate-fadeIn';
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }
  };

  const handleViewDetails = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseDetails = () => {
    setSelectedPlan(null);
  };

  return (
    <>
      <Header />
      <section className="h-[calc(40vh+60px)] sm:h-[calc(100vh-36px)] relative w-full font-poppins mb-[30px] sm:mb-[133px]">
        <img
          src={overlay}
          alt="overlay"
          className="absolute left-0 top-0 w-full h-full object-cover"
        />
      </section>
      <section className="px-2 sm:px-[83px] mb-[40px] sm:mb-[145px]">
        <FilterPills />
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
            <p className="text-white text-lg">Loading plans...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
            <p className="text-white text-lg">No plans available</p>
          </div>
        ) : (
          <div key={swiperKey}>
            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              spaceBetween={12}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
                el: ".swiper-pagination-custom",
              }}
              breakpoints={{
                480: { slidesPerView: 1.1, spaceBetween: 12 },
                640: { slidesPerView: 2, spaceBetween: 16 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
              }}
              className="pb-20"
            >
              {plans.map(plan => (
                <SwiperSlide key={plan._id}>
                  <div
                    className="relative text-white font-poppins cursor-pointer h-full group"
                    onClick={() => handleViewDetails(plan)}
                  >
                    <img src={plan.image || box} className="w-full object-cover rounded-t-lg h-[180px] sm:h-[260px] md:h-[320px] lg:h-[400px] transition-all duration-200" alt={plan.name} />
                    <div className="absolute bottom-0 left-0 w-full sm:p-4 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg">
                      <h3 className="sm:text-2xl text-base font-semibold line-clamp-1">{plan.name}</h3>
                      <p className="font-medium sm:text-sm text-xs">${plan.price}</p>
                      <div className="flex flex-wrap justify-between items-center mt-[6px] sm:mt-[18px] gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddToCart(plan); }}
                          className="block px-3 text-xs font-semibold bg-[#FBF4F24D]/30 sm:px-4 py-2 sm:w-[120px] text-center border border-customOrange1 rounded-[17px] uppercase hover:bg-customOrange1 transition"
                        >
                          add to bag
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleBuyNow(plan); }}
                          className="hidden sm:block ml-2 px-3 text-xs font-semibold bg-orange-500 sm:px-4 py-2 sm:w-[120px] text-center border border-orange-500 rounded-[17px] uppercase hover:bg-orange-600 transition"
                        >
                          buy now
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleAddToWishlist(plan); }}
                          className="transition-all duration-200 hover:scale-110"
                          aria-label={isInWishlist(plan._id) ? "Remove from wishlist" : "Add to wishlist"}
                        >
                          <img
                            src={heart}
                            className={isInWishlist(plan._id) ? 'sm:w-[30px] sm:h-[30px] w-[18px] h-[16px] brightness-125 drop-shadow-[0_0_8px_rgba(255,107,53,0.6)]' : 'sm:w-[30px] sm:h-[30px] w-[18px] h-[16px] opacity-60'}
                            alt="wishlist"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="flex justify-center gap-2 mt-8 swiper-pagination-custom"></div>
          </div>
        )}
      </section>
      <FooterWhite />

      {selectedPlan && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={handleCloseDetails}
        >
          <div
            className="bg-[#1a1a1a] rounded-lg max-w-2xl w-full max-h-[95vh] overflow-y-auto text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-orange-500 p-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold">{selectedPlan.name}</h2>
              <button
                onClick={handleCloseDetails}
                className="text-2xl font-bold hover:text-orange-500 transition"
              >
                ×
              </button>
            </div>

            <div className="p-4 sm:p-6">
              <img
                src={selectedPlan.image || box}
                alt={selectedPlan.name}
                className="w-full h-[180px] sm:h-[320px] md:h-[400px] object-cover rounded-lg mb-6"
              />

              {/* Dark filter pills for modal */}
              <div className="mb-4">
                <FilterPills dark />
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{selectedPlan.name}</h3>
                <p className="text-orange-500 text-2xl font-bold mb-4">${selectedPlan.price}</p>
                <p className="text-gray-300 mb-4">{selectedPlan.description}</p>

                <button
                  onClick={() => {
                    handleBuyNow(selectedPlan);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    handleAddToCart(selectedPlan);
                    handleCloseDetails();
                  }}
                  className="w-full mt-3 px-6 py-3 bg-white/10 border-2 border-orange-500 hover:bg-orange-500 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => handleAddToWishlist(selectedPlan)}
                  className="w-full mt-3 px-6 py-3 bg-transparent border border-gray-500 hover:border-orange-500 hover:bg-white/5 text-gray-300 hover:text-white font-semibold rounded-lg transition-all duration-300"
                >
                  {isInWishlist(selectedPlan._id) ? '❤️ In Wishlist' : 'Add to Wishlist'}
                </button>
              </div>

              <div className="border-t border-orange-500 pt-6">
                <ProductReviews productId={selectedPlan._id} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPlans;
