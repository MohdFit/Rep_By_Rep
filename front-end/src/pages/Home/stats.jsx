import { useState, useEffect, useRef } from "react";

export default function StatsSection() {
  const stats = [
    {
      number: "10+",
      title: "Years Of",
      subtitle: "Experience",
    },
    {
      number: "500+",
      title: "Clients",
      subtitle: "Transformed",
    },
    {
      number: "6+",
      title: "Complete",
      subtitle: "Coaching Services",
    },
  ];

  const [counters, setCounters] = useState([0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const targetValues = stats.map(stat => parseInt(stat.number.replace(/\D/g, '')));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          targetValues.forEach((target, index) => {
            let start = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= target) {
                start = target;
                clearInterval(timer);
              }
              
              setCounters(prev => {
                const newCounters = [...prev];
                newCounters[index] = Math.floor(start);
                return newCounters;
              });
            }, 16);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatNumber = (value, originalString) => {
    const suffix = originalString.replace(/\d/g, ''); // Extract non-numeric characters
    return `${value}${suffix}`;
  };

  return (
    <section ref={sectionRef} className="bg-[#11131B] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative hover:scale-105 transition-transform duration-300"
            >
              
              <div className="relative w-full pb-[70%] sm:pb-[54%]">
                
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 380 205"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient
                      id={`borderGradient-${index}`}
                      x1="24.4744"
                      y1="14.3602"
                      x2="186.278"
                      y2="250.64"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop offset="0" stopColor="#FF5800" stopOpacity="0.46" />
                      <stop
                        offset="0.366978"
                        stopColor="#FF7100"
                        stopOpacity="0.52"
                      />
                      <stop
                        offset="0.705289"
                        stopColor="#FF8900"
                        stopOpacity="0.57"
                      />
                      <stop offset="1" stopColor="#FF9D00" stopOpacity="0.61" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M313.046 1H29.3879C13.7206 1 1.01971 13.7009 1.01971 29.3682V158.671C1.01971 165.581 3.54206 172.254 8.11325 177.437L22.8627 194.158C28.2478 200.263 35.9964 203.761 44.1373 203.761H349.881C365.548 203.761 378.249 191.06 378.249 175.393V54.6116C378.249 45.2551 373.636 36.5003 365.917 31.2111L329.082 5.96762C324.36 2.73172 318.77 1 313.046 1Z"
                    stroke={`url(#borderGradient-${index})`}
                    strokeWidth="2"
                    fill="#1A1D26"
                  />
                </svg>

                
                <div className="absolute inset-0 flex items-center justify-center px-2 sm:px-6 text-white">
                  <div className="flex items-center gap-1 sm:gap-4">
                    <h3 className="text-sm sm:text-4xl lg:text-5xl font-bold">
                      {formatNumber(counters[index], stat.number)}
                    </h3>
                    
                    <div
                      className="w-0.5 h-4 sm:h-12"
                      style={{
                        background: 'linear-gradient(180deg, rgba(255, 88, 0, 0.6) 17.79%, rgba(255, 157, 0, 0.5) 57.69%)'
                      }}
                    ></div>
                    <div className="text-xs sm:text-lg lg:text-xl font-medium text-left">
                      <p className="leading-tight text-xs sm:text-lg lg:text-xl">{stat.title}</p>
                      <p className="leading-tight text-xs sm:text-lg lg:text-xl">{stat.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
