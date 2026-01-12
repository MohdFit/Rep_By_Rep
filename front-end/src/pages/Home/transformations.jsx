import after from "../../assets/images/after.png"
import before from "../../assets/images/before.png"


export default function TransformationsSection() {
  const transformations = [
    {
      id: 1,
      name: "Ahmad",
      result: "Lost 13 Kg",
      beforeImage: before,
      afterImage: after,
      testimonial: `"Before I Started This Program, I Struggled For Years Trying To Lose Fat And Gain Muscle. I Would Jump From One Routine To Another, Never Seeing Real Results.
But Once I Committed To Jeff's Science-Based Approach — Combining Structured Training With A Personalized Nutrition Plan — Everything Changed.
In Less Than Three Months, I Lost 13 Kg Of Fat, Increased My Muscle Definition, And Felt Stronger And More Energized Than Ever Before.
What Really Made The Difference Was How Simple And Sustainable The Plan Was.
No Guesswork, No Extreme Dieting — Just Smart, Proven Methods That Actually Work.
Now I Look In The Mirror And See A Completely Different Person — More Confident, Healthier, And Proud Of The Progress I've Made."`
    }
  ];

  return (
    <section className="bg-[#11131B] px-4 py-8 sm:py-16">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-4 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
            TRANSFORMATIONS
          </h2>
        </div>

        
        <div className="grid grid-cols-1 gap-8 sm:gap-12">
          {transformations.map((transformation) => (
            <div key={transformation.id} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 items-start">
              
              <div className="relative overflow-hidden">
                {transformation.beforeImage && transformation.afterImage ? (
                  <div className="relative bg-[#11131B] flex justify-center">
                    
                    <div className="relative">
                      <img
                        src={transformation.beforeImage}
                        alt="Before transformation"
                        className="rounded-lg"
                      />
                      
                      <div className="absolute inset-x-0 top-2/3 text-center">
                        <span className="text-white text-4xl font-bold">
                          BEFORE
                        </span>
                      </div>
                    </div>
                    
                    
                    <div className="relative -ml-24 mt-40">
                      <img
                        src={transformation.afterImage}
                        alt="After transformation"
                        className="rounded-lg"
                      />
                      
                      <div className="absolute inset-x-0 bottom-12 text-center">
                        <span className="text-white text-4xl font-bold">
                          AFTER
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#11131B] rounded-lg aspect-[4/5] flex items-center justify-center">
                    <div className="text-gray-500 text-center">
                      <p className="text-lg">Before/After Images</p>
                      <p className="text-sm">Will be added</p>
                    </div>
                  </div>
                )}
              </div>

              
              <div className="flex flex-col justify-center sm:mt-8">
                <div className="text-white">
                  <blockquote className="text-sm sm:text-2xl leading-relaxed mb-6 sm:mb-8 whitespace-pre-line">
                    {transformation.testimonial}
                  </blockquote>
                  
                  <div className="border-t border-gray-600 pt-4">
                    <p className="text-lg sm:text-xl font-semibold text-white mb-1">
                      {transformation.name}
                    </p>
                    <p className="text-orange-500 text-base sm:text-lg font-medium">
                      {transformation.result}
                    </p>
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
