import { Wind, Flame, Droplets, Mountain, Sparkles } from 'lucide-react';

const TridoshaSection = () => {
  const elements = [
    { icon: Sparkles, name: "ETHER", color: "bg-gray-800" },
    { icon: Wind, name: "AIR", color: "bg-teal-600" },
    { icon: Flame, name: "FIRE", color: "bg-orange-500" },
    { icon: Droplets, name: "WATER", color: "bg-cyan-500" },
    { icon: Mountain, name: "EARTH", color: "bg-green-800" }
  ];

  return (
    <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black mb-8 sm:mb-16 font-mono animate-fade-in-up transition-all duration-1000 hover:scale-105" style={{animation: 'bounce 3s infinite'}}>
          Ayurvedic Tridosha
        </h2>
        
        <div className="relative">
          {/* Dosha Labels with brackets */}
          <div className="hidden sm:flex justify-center items-start mb-12 space-x-8 animate-fade-in-up animation-delay-300">
            {/* VATA bracket over ETHER and AIR */}
            <div className="relative flex flex-col items-center animate-fade-in-up hover:scale-110 transition-all duration-500">
              <span className="text-amber-400 text-lg font-bold tracking-wider mb-2 animate-pulse hover:animate-bounce">VATA</span>
              <div className="flex items-end">
                <div className="w-8 h-8 border-l-4 border-t-4 border-amber-400 rounded-tl-lg"></div>
                <div className="w-24 border-t-4 border-amber-400"></div>
                <div className="w-8 h-8 border-r-4 border-t-4 border-amber-400 rounded-tr-lg"></div>
              </div>
            </div>
            
            {/* PITTA bracket over FIRE and WATER */}
            <div className="relative flex flex-col items-center animate-fade-in-up hover:scale-110 transition-all duration-500 animation-delay-200">
              <span className="text-amber-400 text-lg font-bold tracking-wider mb-2 animate-pulse hover:animate-bounce">PITTA</span>
              <div className="flex items-end">
                <div className="w-8 h-8 border-l-4 border-t-4 border-amber-400 rounded-tl-lg"></div>
                <div className="w-24 border-t-4 border-amber-400"></div>
                <div className="w-8 h-8 border-r-4 border-t-4 border-amber-400 rounded-tr-lg"></div>
              </div>
            </div>
            
            {/* KAPHA bracket over EARTH */}
            <div className="relative flex flex-col items-center animate-fade-in-up hover:scale-110 transition-all duration-500 animation-delay-400">
              <span className="text-amber-400 text-lg font-bold tracking-wider mb-2 animate-pulse hover:animate-bounce">KAPHA</span>
              <div className="flex items-end">
                <div className="w-6 h-6 border-l-4 border-t-4 border-amber-400 rounded-tl-lg"></div>
                <div className="w-8 border-t-4 border-amber-400"></div>
                <div className="w-6 h-6 border-r-4 border-t-4 border-amber-400 rounded-tr-lg"></div>
              </div>
            </div>
          </div>
          
          {/* Elements in a row */}
          <div className="grid grid-cols-3 sm:flex sm:justify-center sm:items-center gap-4 sm:space-x-8 sm:gap-0 mb-8 sm:mb-12 animate-fade-in-up animation-delay-600">
            {elements.map((element, index) => {
              const IconComponent = element.icon;
              return (
                <div key={index} className="text-center group animate-fade-in-up hover:scale-110 transition-all duration-500" style={{animationDelay: `${(index + 1) * 200}ms`}}>
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 ${element.color} rounded-full flex items-center justify-center mb-2 sm:mb-4 mx-auto shadow-xl group-hover:shadow-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 animate-pulse`}>
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="text-black text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 group-hover:text-green-600 group-hover:scale-105 animate-fade-in">
                    {element.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        
        <p className="text-lg sm:text-2xl font-bold text-black leading-relaxed max-w-4xl mx-auto animate-fade-in-up animation-delay-1000 transition-all duration-500 hover:scale-105 hover:text-green-700 px-4">
          Understanding the imbalance of your unique body is the basis for treatment.
        </p>
      </div>
    </section>
  );
};

export default TridoshaSection;