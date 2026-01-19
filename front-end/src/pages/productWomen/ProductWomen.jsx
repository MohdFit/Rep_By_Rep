import { useState, useEffect } from "react";
import Header from "../../components/Header";
import overlay from "../../assets/images/productWomen/Overlay.png";
import heart from "../../assets/images/productWomen/heart.png";
import box from "../../assets/images/allproducts/box.png";
import FilterPills from "./FilterPills";
import FooterWhite from "../../components/FooterWhite";
import { getAllProducts } from "../../services/productService";
import { useCart } from "../../context/CartContext";

function ProductWomen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getAllProducts();
        if (response.success) {
          setProducts(response.data || []);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product._id, 'TShirt', 1);
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
        <div className="absolute top-[50%] -translate-y-[50%] sm:left-[123px] left-[50%] -translate-x-[50%] sm:translate-x-0 max-w-[550px] text-white">
          <h1 className="font-semibold text-4xl sm:text-5xl mb-6">
            New arrivals for your next move.
          </h1>
          <p className="text-lg sm:text-2xl">
            Built for performance.
            <br />
            Designed for comfort.
            <br />
            Styled for every day.
          </p>
        </div>
      </section>
      <section className="px-[17px] sm:px-[83px] mb-[65px] sm:mb-[145px]">
        <FilterPills />
        {loading ? (
          <div className="text-center py-12 text-white">Loading products...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-white">No products available</div>
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-y-[50px] gap-x-[20px]">
            {products.map(product => (
              <div key={product._id} className="relative text-white font-poppins">
                <img src={product.image || box} className="w-full object-cover h-[400px]" alt={product.title} />
                <div className="absolute bottom-0 left-0 w-full sm:p-4 p-2">
                  <h3 className="sm:text-2xl text-normal font-semibold">{product.title}</h3>
                  <p className="font-medium sm:text-sm text-[10px]">${product.price}</p>
                  <div className="flex justify-between items-center mt-[6px] sm:mt-[18px]">
                    <button
                      onClick={() => handleAddToCart(product)}
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

export default ProductWomen;
