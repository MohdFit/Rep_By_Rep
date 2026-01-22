import { useState } from "react";
import Header from "../../components/Header";
import workout from "../../assets/images/InnerPageWorkout/backworkout.png";
import star from "../../assets/images/InnerPageWorkout/Star.png";
import upload from "../../assets/images/InnerPageWorkout/upload.png";
import heart from "../../assets/images/InnerPageWorkout/heart.png";
import FooterWhite from "../../components/FooterWhite";

function InnerPageWorkout() {
  const [activePage, setActivePage] = useState(0);
  const totalPages = 3; // Static pagination for placeholder items

  return (
    <>
    <div className="px-4 sm:px-20 mt-12 sm:mt-16">
      <Header className="relative" />

      
      <div className="mt-12 sm:mt-20 grid sm:grid-cols-2 grid-cols-1 gap-12 sm:gap-x-[153px] max-w-[1122px] mx-auto">
        
        <div>
          <img src={workout} alt="workout" className="w-full rounded-xl" />
        </div>

        
        <div className="relative max-w-[350px] font-poppins flex flex-col justify-between h-full">
          <div>
            <h2 className="sm:text-[40px] text-2xl font-normal text-textColor">
              Back Workouts – Training Plan
            </h2>

            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <img key={i} src={star} alt="star" className="w-6 h-6" />
                ))}
              </div>
              <p className="sm:text-2xl">101 reviews</p>
            </div>

            <div className="mt-6">
              <p className="text-[15px] hidden sm:block">LEVEL</p>
              <h3 className="bg-[#0E18301A]/10 px-2 py-1 rounded-md">
                InterMediate - Advanced
              </h3>
              <p className="text-lg sm:text-3xl font-normal mt-2">25$</p>
            </div>
          </div>

          
          <div className="mt-6 flex flex-col items-end space-y-2">
            
            <div className="flex space-x-4">
              <button>
                <img src={upload} alt="upload" className="w-6 h-6" />
              </button>
              <button>
                <img src={heart} alt="heart" className="w-6 h-6" />
              </button>
            </div>

            
            <div className="w-[340px] h-1 flex">
              <div className="w-1/2 bg-gradient-to-r from-red-500 to-orange-400"></div>
              <div className="w-1/2 bg-gray-300"></div>
            </div>

            
            <div className="w-[340px]">
              <div className="bg-gradient-to-r from-red-500 to-orange-400 p-[2px] rounded-2xl">
                <button className="w-full py-2 bg-white rounded-2xl font-inter font-bold text-black">
                  ADD TO BAG
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <section className="mt-32 px-4 sm:px-0">
        <h2 className="text-3xl sm:text-4xl font-inter font-semibold text-center text-textColor mb-12">
          What Our Customers Are Saying
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="bg-gray-200 border border-gray-300 rounded-2xl p-6 flex flex-col items-center text-center h-[360px] sm:h-[500px] max-w-[380px]"
            >
              
              <div className="w-20 h-20 rounded-full p-[2px] bg-gradient-to-r from-red-500 to-orange-400 mb-4">
                <div className="w-full h-full bg-gray-400 rounded-full overflow-hidden"></div>
              </div>

              
              <h3 className="font-poppins font-medium text-lg mb-2">John Doe</h3>

              
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, starIdx) => (
                  <img key={starIdx} src={star} alt="star" className="w-5 h-5" />
                ))}
              </div>

              
              <p className="font-poppins text-gray-700 text-sm sm:text-base">
                "This is a sample review. Really great experience!"
              </p>
            </div>
          ))}
        </div>


        
        <div className="flex justify-center items-center mt-12 space-x-2">
          <button className="text-gray-400 hover:text-black">&#8592;</button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-inter font-bold text-white ${
                page === 1
                  ? "bg-gradient-to-r from-red-500 to-orange-400"
                  : "bg-gray-200 text-black"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="text-gray-400 hover:text-black">&#8594;</button>
        </div>
      </section>
      
      <section className="mt-24 px-4 sm:px-20 font-poppins">
        
        <h2 className="text-center font-bold text-[36px] sm:text-[48px] mb-12 text-textColor">
          YOU MIGHT ALSO LIKE
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          {[...Array(4)].map((_, idx) => (
            <div key={idx} className="relative text-white font-poppins">
              <img
                src={workout}
                alt="Training Program"
                className="w-full rounded-2xl object-cover"
              />

              <div className="absolute bottom-0 left-0 w-full sm:p-4 p-2 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-b-2xl">
                <h3 className="sm:text-2xl text-base font-semibold">Training Program</h3>
                <p className="font-medium sm:text-sm text-[10px]">$29</p>

                <div className="flex justify-between items-center mt-[6px] sm:mt-[18px]">
                  <a
                    href="/programs"
                    className="block px-[15px] text-xs font-semibold bg-[#FBF4F24D]/30 sm:px-[10px] p-[7px] sm:w-[180px] text-center border border-customOrange1 rounded-[17px] uppercase"
                  >
                    View Program
                  </a>

                  <img
                    src={heart}
                    alt="heart"
                    className="sm:w-[30px] sm:h-[30px] w-[15px] h-[14px]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        
        <div className="flex justify-center items-center mt-10 space-x-3">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActivePage(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === activePage
                  ? "bg-gradient-to-r from-red-500 to-orange-400 scale-110"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </section>
    </div>
    <FooterWhite />
    </>
  );
}

export default InnerPageWorkout;

