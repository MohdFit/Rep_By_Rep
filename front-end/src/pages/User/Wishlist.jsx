import React, { useState } from "react";
import Header from "../../components/Header";
import FooterWhite from "../../components/FooterWhite";
import heart from "../../assets/images/InnerPageWorkout/heart.png";
import box from "../../assets/images/allproducts/box.png";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "T-Shirt", price: 20, img: box },
    { id: 2, name: "Hoodie", price: 35, img: box },
    { id: 3, name: "Sneakers", price: 60, img: box },
    { id: 4, name: "Shorts", price: 25, img: box },
    { id: 5, name: "Cap", price: 15, img: box },
    { id: 6, name: "Socks", price: 8, img: box },
    { id: 7, name: "Leggings", price: 30, img: box },
    { id: 8, name: "Tank Top", price: 18, img: box },
    { id: 9, name: "Jacket", price: 75, img: box },
    { id: 10, name: "Sports Bra", price: 35, img: box },
    { id: 11, name: "Water Bottle", price: 10, img: box },
    { id: 12, name: "Gym Bag", price: 50, img: box },
  ]);

  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);

  const startIndex = (activePage - 1) * itemsPerPage;
  const displayedItems = wishlistItems.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <Header />
      <div className="px-4 sm:px-[83px] mt-[50px] mb-[100px] font-poppins">
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-textColor mb-10">
          Your Favourite Picks
        </h2>

        
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
                src={item.img}
                alt={item.name}
                className="w-full rounded-2xl object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full sm:p-4 p-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-b-2xl">
                <h3 className="sm:text-2xl text-sm font-semibold">{item.name}</h3>
                <p className="font-medium sm:text-sm text-[10px]">${item.price}</p>

                <div className="flex justify-between items-center mt-[6px] sm:mt-[14px]">
                  <a
                    href="#"
                    className="block px-[10px] sm:px-[15px] text-[9px] sm:text-xs font-semibold bg-[#FBF4F24D]/30 sm:w-[150px] text-center border border-customOrange1 rounded-[17px] uppercase"
                  >
                    add to bag
                  </a>

                  
                  <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-400 mask-heart">
                  <img
                      src={heart}
                      alt="wishlist-heart"
                      className="sm:w-[16px] sm:h-[16px] w-[10px] h-[10px]"
                    />
                  </div>
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

