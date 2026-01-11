import { CiDumbbell,CiApple ,CiLaptop,CiCalendar   } from "react-icons/ci";
import { FaRegLightbulb } from "react-icons/fa";
import { IoIosPodium } from "react-icons/io";

// Constants
const GRADIENT_STOPS = [
  { offset: "0", color: "#FF5800", opacity: "0.46" },
  { offset: "0.366978", color: "#FF7100", opacity: "0.515047" },
  { offset: "0.705289", color: "#FF8900", opacity: "0.565793" },
  { offset: "1", color: "#FF9D00", opacity: "0.61" }
];

const RESPONSIVE_CLASSES = {
  grid: "grid grid-cols-2 gap-3 sm:gap-6",
  content: "absolute inset-0 flex items-center px-4 sm:px-8 py-4 sm:py-0",
  titleContainer: "flex items-center gap-2 sm:gap-4 mb-1 sm:mb-2",
  icon: "text-sm sm:text-2xl text-white flex-shrink-0",
  title: "text-[10px] sm:text-lg font-semibold text-white leading-tight",
  description: "text-[10px] sm:text-sm text-gray-300 leading-relaxed"
};

// SVG Components
function MobileSVG({ index }) {
  return (
    <svg
      className="w-full h-auto sm:hidden"
      viewBox="0 0 178 103"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id={`paint0_linear_mobile_${index}`}
          x1="165.867"
          y1="7.84647"
          x2="83.1314"
          y2="120.627"
          gradientUnits="userSpaceOnUse"
        >
          {GRADIENT_STOPS.map((stop, i) => (
            <stop
              key={i}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
      </defs>
      <path
        d="M8.03467 1.16895H169.584C173.575 1.16895 176.81 4.40372 176.81 8.39403V95.2851C176.81 99.2754 173.575 102.51 169.584 102.51H8.03467C4.04436 102.51 0.80957 99.2754 0.80957 95.2851V41.8716V8.39405C0.80957 4.40373 4.04434 1.16895 8.03467 1.16895Z"
        stroke={`url(#paint0_linear_mobile_${index})`}
        strokeOpacity="0.4"
        strokeWidth="0.401394"
        fill="#11131B"
      />
    </svg>
  );
}

function DesktopSVG({ index }) {
  const isFlipped = index % 2 === 1;
  return (
    <svg
      className={`w-full h-auto hidden sm:block ${isFlipped ? 'scale-x-[-1]' : ''}`}
      viewBox="0 0 604 124"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient
          id={`paint0_linear_desktop_${index}`}
          x1="38.43"
          y1="9.03876"
          x2="88.9809"
          y2="204.825"
          gradientUnits="userSpaceOnUse"
        >
          {GRADIENT_STOPS.map((stop, i) => (
            <stop
              key={i}
              offset={stop.offset}
              stopColor={stop.color}
              stopOpacity={stop.opacity}
            />
          ))}
        </linearGradient>
      </defs>
      <path
        d="M506.888 1H24.8921C11.6969 1 1 11.6968 1 24.8921V99.1079C1 112.303 11.6969 123 24.8921 123H579.108C592.303 123 603 112.303 603 99.1079V64.1981C603 55.447 598.216 47.3961 590.529 43.2127L518.31 3.90676C514.805 1.99932 510.878 1 506.888 1Z"
        stroke={`url(#paint0_linear_desktop_${index})`}
        strokeOpacity="0.4"
        strokeWidth="1.32734"
        fill="#11131B"
      />
    </svg>
  );
}

function ServiceCard({ service, index }) {
  return (
    <div className="relative">
      <div className="relative w-full">
        <MobileSVG index={index} />
        <DesktopSVG index={index} />
        
        <div className={RESPONSIVE_CLASSES.content}>
          <div className="w-full">
            <div className={RESPONSIVE_CLASSES.titleContainer}>
              <service.icon className={RESPONSIVE_CLASSES.icon} />
              <h3 className={RESPONSIVE_CLASSES.title}>
                {service.title}
              </h3>
            </div>
            <p className={RESPONSIVE_CLASSES.description}>
              {service.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const services = [
    {
      icon: CiDumbbell,
      title: "1-On-1 Personal Training",
      description: "Tailored Sessions Focused On Your Specific Goals—Whether It's Fat Loss, Muscle Gain, Or Strength Building."
    },
    {
      icon: CiApple,
      title: "Custom Nutrition Plans",
      description: "Flexible, Realistic Meal Plans Built To Support Your Training And Lifestyle."
    },
    {
      icon: CiLaptop,
      title: "Online Coaching & Check-Ins",
      description: "Weekly Follow-Ups, Adjustments, And Full Guidance Wherever You Are In The World"
    },
    {
      icon: FaRegLightbulb,
      title: "Mindset & Lifestyle Coaching",
      description: "Build Long-Term Habits, Stay Motivated, And Overcome Mental Blocks"
    },
    {
      icon: CiCalendar,
      title: "Transformation Programs (4-12 Weeks)",
      description: "Goal-Oriented Structured Programs With Progressive Training Phases."
    },
    {
      icon: IoIosPodium,
      title: "Progress Tracking & Analytics",
      description: "Regular Assessments, Body Metrics Tracking, And Visual Progress Reviews."
    }
  ];

  return (
    <section className="bg-[#11131B] px-4 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2 sm:mb-4">
            Unlock Your Full Potential
          </h2>
          <p className="text-sm sm:text-lg text-gray-300">
            Services Designed To Transform, Empower, And Elevate You.
          </p>
        </div>

        {/* Services Grid */}
        <div className={RESPONSIVE_CLASSES.grid}>
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}