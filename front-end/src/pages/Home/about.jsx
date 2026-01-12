import coach from "../../assets/images/coach.png"

export default function Bio() {
  return (
    <section className="bg-[#11131B] text-white px-12 sm:px-16 py-16">
      <div className="mx-auto">
        
        <div className="hidden sm:grid sm:grid-cols-5 gap-12 items-center">
          
          <div className="sm:col-span-3 space-y-6">
            <h2 className="text-2xl font-bold text-center">
              From Personal Training To A Lifestyle
            </h2>
            
            <h3 className="text-2xl sm:text-2xl font-semibold text-center">
              Discover The Power Of Change With Coach Asaad
            </h3>
            
            <p className="text-2xl leading-relaxed">
              I'm Asaad Hamawi, A Transformation Coach And Founder Of Rep By Rep —
              A Highly Customized Online Coaching Platform Designed To Fit Your Lifestyle,
              Not Flip It Upside Down.<br />
              With Over 10 Years Of Experience In Training, Psychology, And Nutrition Strategy,
              I've Helped Hundreds Of Clients Build Their Dream Body, Boost Their Confidence,
              And Create Structure In Their Lives — Without Needing To Train 6x/Week Or Follow
              Boring Diets.<br />
              Rep By Rep Was Created To Give People Real, Lasting Results Through A System That's
              Built Around Science, Habit Design, And Elite-Level Customization.<br />
              This Isn't Just Fitness.<br />
              This Is Clarity, Sustainability, And Results — Tailored To
              Your Reality.<br />
            </p>
            
            <p className="font-semibold bg-gradient-to-r from-customOrange1 to-customOrange2 bg-clip-text text-transparent text-xl text-center">
              Fitness Is Not Your Whole Life. It's What Helps You Live Better
            </p>
          </div>
          
          
          <div className="sm:col-span-2 flex justify-center sm:justify-end">
            <img
              src={coach}
              alt="Coach Asaad"
              className="rounded-2xl shadow-lg w-full h-1/2 max-w-lg"
            />
          </div>
        </div>

        
        <div className="sm:hidden space-y-6">
          <h2 className="text-xl font-bold text-center">
            From Personal Training To A Lifestyle
          </h2>
          
          <h3 className="text-lg font-semibold text-center">
            Discover The Power Of Change With Coach Asaad
          </h3>
          
          <div className="relative">
            
            <img
              src={coach}
              alt="Coach Asaad"
              className="float-right ml-4 mb-4 rounded-2xl shadow-lg w-40 h-48 object-cover"
            />
            
            
            <p className="text-sm leading-relaxed text-justify">
              I'm Asaad Hamawi, A Transformation Coach And Founder Of Rep By Rep —
              A Highly Customized Online Coaching Platform Designed To Fit Your Lifestyle,
              Not Flip It Upside Down. With Over 10 Years Of Experience In Training, 
              Psychology, And Nutrition Strategy, I've Helped Hundreds Of Clients Build 
              Their Dream Body, Boost Their Confidence, And Create Structure In Their Lives — 
              Without Needing To Train 6x/Week Or Follow Boring Diets. Rep By Rep Was Created 
              To Give People Real, Lasting Results Through A System That's Built Around Science, 
              Habit Design, And Elite-Level Customization. This Isn't Just Fitness. This Is 
              Clarity, Sustainability, And Results — Tailored To Your Reality.
            </p>
          </div>
          
          <p className="font-semibold bg-gradient-to-r from-customOrange1 to-customOrange2 bg-clip-text text-transparent text-sm text-center clear-both">
            Fitness Is Not Your Whole Life. It's What Helps You Live Better
          </p>
        </div>
      </div>
    </section>
  );
}
