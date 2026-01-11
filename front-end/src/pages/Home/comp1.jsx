import hero from "../../assets/images/hero.png"
import CTAButton from "../../components/Button/CTAButton"

export default function HeroSection() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 mt-4">
      <div className="relative h-96 sm:h-[700px] overflow-hidden rounded-3xl shadow-2xl">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={hero}
            alt="Fitness training"
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-2xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-6xl  lg:text-5xl xl:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
              Your Transformation
              <br />
              Journey Starts Here
            </h1>
            
            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 md:mb-10 font-light">
              One Rep At A Time. One Life At A Time
            </p>
            
            {/* CTA Button */}
            <CTAButton />
          </div>
        </div>
      </div>
    </div>
  );
}