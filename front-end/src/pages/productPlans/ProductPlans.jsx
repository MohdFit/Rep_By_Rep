import { useState, useEffect } from "react";
import Header from "../../components/Header";
import overlay from "../../assets/images/productPlans/Overlay.png";
import heart from "../../assets/images/productPlans/heart.png";
import box from "../../assets/images/productPlans/men.jpg";
import FilterPills from "./FilterPills";
import FooterWhite from "../../components/FooterWhite";
import { getAllPlans } from "../../services/productService";
import { useCart } from "../../context/CartContext";

function ProductPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

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
    fetchPlans();
  }, []);

  const handleAddToCart = async (plan) => {
    try {
      await addToCart(plan._id, 'Plan', 1);
      alert('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  return (
    <>
      <Header />
      <section className="h-[calc(100vh-36px)] relative w-full font-poppins mb-[50px] sm:mb-[133px]">
        <img
          src={overlay}
          alt="overlay"
          className="absolute left-0 top-0 w-full h-full object-cover"
        />
      </section>
      <section className="px-[17px] sm:px-[83px] mb-[65px] sm:mb-[145px]">
        <FilterPills />
        {loading ? (
          <div className="text-center py-12 text-white">Loading plans...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : plans.length === 0 ? (
          <div className="text-center py-12 text-white">No plans available</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-y-[50px] gap-x-[20px]">
            {plans.map(plan => (
              <div key={plan._id} className="relative text-white font-poppins">
                <img src={plan.image || box} className="w-full object-cover h-[400px]" alt={plan.name} />
                <div className="absolute bottom-0 left-0 w-full sm:p-4 p-2">
                  <h3 className="sm:text-2xl text-normal font-semibold">{plan.name}</h3>
                  <p className="font-medium sm:text-sm text-[10px]">${plan.price}</p>
                  <div className="flex justify-between items-center mt-[6px] sm:mt-[18px]">
                    <button
                      onClick={() => handleAddToCart(plan)}
                      className="block px-[15px] text-xs font-semibold bg-[#FBF4F24D]/30 sm:px-[10px] p-[7px] sm:w-[180px] text-center border border-customOrange1 rounded-[17px] uppercase hover:bg-customOrange1 transition"
                    >
                      add to bag
                    </button>
                    <img
                      src={heart}
                      className="sm:w-[30px] sm:h-[30px] w-[15px] h-[14px] cursor-pointer hover:opacity-80"
                      alt="wishlist"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="sm:flex justify-center space-x-4 items-center mt-[120px] hidden">
          <span className="cursor-pointer text-white bg-gradient-to-b block from-customOrange1 to-customOrange2 rounded-full sm:w-[30px] sm:h-[30px] flex justify-center items-center">
            1
          </span>
          <span className="cursor-pointer">2</span>
          <span className="cursor-pointer">3</span>
          <span className="cursor-pointer">4</span>
          <span className="cursor-pointer">5</span>
          <span className="cursor-pointer">&rarr;</span>
        </div>
      </section>
      <FooterWhite />
    </>
  );
}

export default ProductPlans;
