import { useEffect, useState } from "react";

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="py-30 px-4 sm:px-6 lg:px-8 bg-fixed bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: "url(/img/bg-3.png)" }}
    >
      <div className="absolute inset-0 overflow-x-hidden"></div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto relative z-10 overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center overflow-x-hidden">
          <div className="order-1 lg:order-1">
            <div
              className={`lg:transition-all lg:duration-1500 lg:ease-out ${
                isVisible
                  ? "lg:translate-x-0 lg:opacity-100"
                  : "lg:-translate-x-full lg:opacity-0"
              }`}
            >
              <img
                src="/img/l-1.png"
                alt="Ayurveda Management"
                className="w-full h-auto rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                style={{ mixBlendMode: "overlay" }}
              />
            </div>
          </div>

          <div className="order-2 lg:order-2">
            <div
              className={`space-y-6 lg:transition-all lg:duration-1200 lg:ease-out lg:delay-500 ${
                isVisible
                  ? "lg:translate-x-0 lg:opacity-100"
                  : "lg:translate-x-full lg:opacity-0"
              }`}
            >
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight font-mono">
              <span className="text-[#23c728]">Panchakarma</span> –{" "}
              <span className="whitespace-nowrap">Ayur Essence</span>
              <br />
              {/* Digitally Reimagined */}
            </h1>

            <p className="text-lg font-bold text-gray-200 leading-relaxed">
              Panchakarma is Ayurveda’s five-step detox ritual—Vamana,
              Virechana, Basti, Nasya, and Raktamokshana—cleansing the body,
              calming the mind, and restoring balance in a modern, seamless way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-3 bg-[#3ca741] text-white rounded-lg font-medium hover:bg-[#1B5E20] transition-colors duration-200 shadow-lg hover:shadow-xl">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-[#2E7D32] text-[#ffffff] rounded-lg font-medium hover:bg-[#2E7D32] hover:text-white transition-all duration-200">
                Learn More
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
