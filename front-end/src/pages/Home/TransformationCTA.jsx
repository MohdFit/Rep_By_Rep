import CTAButton from "../../components/Button/CTAButton";
import pexels from "../../assets/images/pexels.png"
import mobileBg from "../../assets/images/pexelsMobile.png"
export default function TransformationCTA() {
  return (
    <section className="relative w-full overflow-hidden">
      
      <div className="absolute inset-0">
        <img 
          src={mobileBg}
          alt="Transformation background"
          className="w-full h-full object-cover sm:hidden"
        />
        <img 
          src={pexels}
          alt="Transformation background"
          className="w-full h-full object-cover hidden sm:block"
        />
        
        <div className="absolute inset-0 bg-[#0E1830] bg-opacity-35"></div>
      </div>
      
      
      <div className="relative z-10 flex items-center justify-center min-h-[400px] sm:min-h-[500px] px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="text-center max-w-4xl mx-auto">
          
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
            Ready To Transform Your Life?
          </h2>
          
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white mb-2 sm:mb-4 font-medium">
            No More Waiting. No More Excuses.
          </p>
          
          <p className="text-base sm:text-lg lg:text-xl text-white mb-8 sm:mb-10 font-light">
            Take The First Step Toward Your Strongest, Healthiest Self — Today.
          </p>
          
          
          <CTAButton />
          
          
          <p className="text-sm sm:text-base lg:text-lg text-gray-200 mt-8 sm:mt-12 font-light">
            You Don't Need More Motivation. You Need A System Built For You
          </p>
        </div>
      </div>
    </section>
  );
}
