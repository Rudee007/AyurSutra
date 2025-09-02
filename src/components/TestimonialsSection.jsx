import { useState, useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  const testimonials = [
    {
      quote: "The reminder alerts for my diet before Vamana were a lifesaver! I felt so much more prepared and the process was smooth.",
      author: "Priya S.",
      role: "Patient"
    },
    {
      quote: "This software understands Ayurveda. It doesn't replace my judgment but empowers me to serve my patients better.",
      author: "Dr. Ajit Kumar, BAMS",
      role: "Ayurvedic Physician"
    }
  ];



  return (
    <section ref={sectionRef} className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-amber-50 to-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
            What Our <span className="text-amber-600">Community Says</span>
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Trusted by patients and practitioners across the Ayurvedic community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className={`bg-gradient-to-br from-green-50 to-amber-50 p-6 sm:p-8 rounded-2xl border border-green-100 shadow-md sm:hover:shadow-xl transition-all duration-500 transform sm:hover:-translate-y-3 sm:hover:scale-105 sm:hover:rotate-1 group hover:animate-none ${index === 1 ? 'md:hover:-rotate-1' : ''}`}>
              <div className="mb-4 sm:mb-6">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 mb-3 sm:mb-4 transition-all duration-300 sm:group-hover:scale-150 sm:group-hover:rotate-180 sm:group-hover:text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <p className="text-green-800 text-base sm:text-lg italic leading-relaxed transition-all duration-300 sm:group-hover:text-green-900 sm:group-hover:scale-105 sm:group-hover:tracking-wide">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-200 rounded-full flex items-center justify-center mr-3 sm:mr-4 transition-all duration-300 sm:group-hover:bg-green-300 sm:group-hover:scale-125 sm:group-hover:rotate-12 sm:group-hover:shadow-lg">
                  <span className="text-green-800 font-bold text-base sm:text-lg transition-all duration-300 sm:group-hover:text-green-900 sm:group-hover:scale-110">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div className="transition-transform duration-300 sm:group-hover:translate-x-2">
                  <p className="font-semibold text-green-800 text-sm sm:text-base transition-all duration-300 sm:group-hover:text-green-900 sm:group-hover:scale-105">{testimonial.author}</p>
                  <p className="text-green-600 text-xs sm:text-sm transition-all duration-300 sm:group-hover:text-green-700 sm:group-hover:font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default TestimonialsSection;