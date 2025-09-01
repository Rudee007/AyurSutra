import { Search, MapPin, Stethoscope, TrendingUp, Heart } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Know Your Diseases",
      description:
        "Understand your health conditions through comprehensive Ayurvedic assessment and diagnosis.",
    },
    {
      icon: MapPin,
      title: "Find Nearby Centers",
      description:
        "Locate certified Ayurved health centers and practitioners in your area.",
    },
    {
      icon: Stethoscope,
      title: "Consult & Plan",
      description:
        "Vaidya diagnoses and creates a personalized digital Panchakarma plan.",
    },
    {
      icon: TrendingUp,
      title: "Track & Heal",
      description:
        "Log your daily progress, track milestones, and communicate with your therapist easily.",
    },
    {
      icon: Heart,
      title: "Recover & Thrive",
      description:
        "Receive post-therapy guidance and see your holistic improvement over time.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16 animate-fade-in-up">
          <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-black mb-4 sm:mb-6 font-mono transition-all duration-1000 hover:scale-105 px-2">
            Your Journey to Wellness,{" "}
            <span className="text-[#2E7D32] animate-pulse hover:animate-ping">Streamlined</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 animate-fade-in-up animation-delay-300 px-2 sm:px-0">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center group hover:drop-shadow-2xl animate-fade-in-up" style={{perspective: '1000px', animationDelay: `${index * 200}ms`}} onClick={() => {}}>
                <div className="relative h-64 sm:h-72 lg:h-80 w-full transition-all duration-700 md:group-hover:rotate-y-180 md:group-hover:scale-105 md:group-hover:-translate-y-2 group-active:scale-105 group-active:-translate-y-2" style={{transformStyle: 'preserve-3d'}}>
                  {/* Front of card */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 to-green-100/60 backdrop-blur-lg border border-green-300/50 rounded-lg sm:rounded-xl p-4 sm:p-6 flex flex-col justify-center items-center shadow-lg group-hover:shadow-green-400/50 group-hover:shadow-2xl group-active:shadow-green-400/50 group-active:shadow-2xl transition-shadow duration-300" style={{backfaceVisibility: 'hidden'}}>
                    <div className="relative mb-4 sm:mb-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#2E7D32] rounded-full flex items-center justify-center mx-auto transition-all duration-500 shadow-lg hover:rotate-12 hover:bg-[#4CAF50] animate-spin-slow">
                        <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white transition-transform duration-300 hover:scale-110" />
                      </div>
                      <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-[#4CAF50] rounded-full flex items-center justify-center text-white font-bold text-sm hover:animate-spin">
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-green-800 mb-2 sm:mb-4 font-mono text-center transition-all duration-300 hover:text-[#2E7D32] hover:scale-110 animate-fade-in leading-tight px-2">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-green-700 font-medium text-center md:hidden px-2">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Back of card - desktop only */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2E7D32]/30 to-[#4CAF50]/20 backdrop-blur-lg border border-green-400/50 rounded-xl p-4 sm:p-6 flex-col justify-center shadow-lg group-hover:shadow-green-500/60 group-hover:shadow-2xl transition-shadow duration-300 hidden md:flex" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                    <p className="text-sm sm:text-base text-green-900 font-semibold leading-relaxed text-center">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
