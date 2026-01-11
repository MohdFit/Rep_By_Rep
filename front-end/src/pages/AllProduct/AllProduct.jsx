// import hero_section_img from "../../assets/images/allproducts/hero-image.jpg";
import Header from "../../components/Header";
import women from "../../assets/images/allproducts/women.png";
import standing from "../../assets/images/allproducts/standing.png";
import running from "../../assets/images/allproducts/running.png";
import youtoubeIcon from "../../assets/images/allproducts/youtube.png";
import instgramIcon from "../../assets/images/allproducts/instgram.png";
import tiktokIcon from "../../assets/images/allproducts/tiktok.png";
import phoneIcon from "../../assets/images/allproducts/phone.png";
import mailIcon from "../../assets/images/allproducts/mail.png";
import footer from "../../assets/images/footer/r.png";
import Products from "./Products";
import { memo } from "react";
import Footer from "../../components/Footer";
import FooterWhite from "../../components/FooterWhite";

function AllProduct() {
  return (
    <>
      <Header />

      <section
        style={{ backgroundImage: `url("/images/hero-image.jpg")` }}
        className={`w-full h-[641.43px] bg-cover  relative text-white`}
      >
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] sm:translate-y-0 w-full sm:px-11 sm:border-b border-white sm:pb-9">
          <div className="text-center sm:text-left sm:flex sm:justify-between">
            <div className=" mb-3 sm:max-w-[700px]">
              <h1 className="font-semibold tracking-[2px] text-5xl mb-2">
                GEAR UP FOR GREATNESS
              </h1>
              <h2 className="text-2xl font-semibold font-normal">
                Built to perform in every rep. Designed to move through every
                day. Perfect for gym, street, and beyond.
              </h2>
            </div>
            <a
              href="#"
              className="font-semibold text-2xl bg-[#fbf4f2]/30 rounded-full p-[10px] block border border-orange-600 flex justify-center items-center sm:w-[208px] sm:h-[56px] text-black sm:relative sm:top-10"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>
      <div className="  sm:px-[83px]   px-[17px] my-[50px] sm:mt-[144px] sm:mb-[102px] relative ">
        <div className="flex justify-between mb-[17px] ">
          <div className="sm:text-3xl text-2xl font-semibold w-[241px]">
            Now In
            <span className="block text-[18px] font-light w-full">
              Fresh Drops for Every Move
            </span>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[#0E1830] sm:text-xl text-xs p-5 block bg-[#FBF4F24D] border  border-orange-600 sm:rounded-[30px] rounded-[14px] h-[25px] sm:w-[204px] sm:h-[56px] flex justify-center items-center font-semibold"
          >
            View All
          </a>
        </div>

        <Products />
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1 to-customOrange2"></div>
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1/50 to-customOrange2/50"></div>
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1/50 to-customOrange2/50 "></div>
        </div>
      </div>
      <div className="  sm:my-[80px] sm:px-[83px] px-[17px] mt-[20px] relative  ">
        <div className="flex justify-between mb-[17px] ">
          <div className="sm:text-3xl text-2xl font-semibold mb-4">
            POPULAR RIGHT NOW
          </div>
        </div>

        <Products />
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1 to-customOrange2"></div>
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1/50 to-customOrange2/50"></div>
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1/50 to-customOrange2/50 "></div>
        </div>
      </div>
      <div className="px-[17px]  sm:px-[83px] grid grid-cols-1 grid-rows-3 gap-y-4 sm:gap-y-10 gap-x-8 sm:grid-cols-2 sm:grid-rows-2">
        <div className="sm:row-span-2 relative">
          <img
            src={women}
            alt="women"
            className="abolute left-0 top-0 w-full h-[full] object-cover"
          />
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-2 text-center">
            <h2 className="text-white text-5xl  text-center font-babas">
              For Him
            </h2>
            <a
              href="#"
              className="bg-[#FBF4F24D]/30 mt-6 block rounded-[19.3px] p-[6px] font-poppins border border-customOrange1 font-semibold text-sm"
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="relative  ">
          <img
            src={standing}
            alt="standing"
            className="absolute w-full h-full"
          />
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-2 text-center">
            <h2 className="text-white text-5xl  text-center font-babas">
              For Him
            </h2>
            <a
              href="#"
              className="bg-[#FBF4F24D]/30 mt-6 block rounded-[19.3px] p-[6px] font-poppins border border-customOrange1 font-semibold text-sm"
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="relative  ">
          <img
            src={running}
            alt="standing"
            className="absolute w-full h-full"
          />
          <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-2 text-center">
            <h2 className="text-white text-5xl  text-center font-babas">
              For Him
            </h2>
            <a
              href="#"
              className="bg-[#FBF4F24D]/30 mt-6 block rounded-[19.3px] p-[6px] font-poppins border border-customOrange1 font-semibold text-sm"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
      <div></div>
      <div className=" sm:px-[83px]   px-[17px] my-[50px] sm:mt-[144px] sm:mb-[102px] relative ">
        <div className="flex justify-between mb-[17px] ">
          <div className="sm:text-3xl text-2xl font-semibold font-poppins">
            Start Your Journey
            <span className="block text-[18px] font-light w-full">
              Choose a program that matches your goal
            </span>
          </div>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-[#0E1830] sm:text-xl text-xs p-5 block bg-[#FBF4F24D] border  border-orange-600 sm:rounded-[30px] rounded-[14px] h-[25px] sm:w-[204px] sm:h-[56px] flex justify-center items-center font-semibold"
          >
            View All
          </a>
        </div>

        <Products />
        <div className="mt-12 flex justify-center space-x-2">
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1 to-customOrange2"></div>
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1/50 to-customOrange2/50"></div>
          <div className="w-[9px] h-[9px] sm:w-[13px] sm:h-[13px] rounded-full bg-gradient-to-r from-customOrange1/50 to-customOrange2/50 "></div>
        </div>
      </div>
      <FooterWhite />
    </>
  );
}
export default memo(AllProduct);
