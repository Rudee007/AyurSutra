const CentersSection = () => {
  const centers = [
    {
      name: " Carnoustie Ayurveda & Wellness Resort",
      location: "Kerla",
      rating: "4.8",
      image: "/img/center1.jpg",
    },
    {
      name: "Kairali - The Ayurvedic Healing Village",
      location: "Kerala",
      rating: "4.9",
      image: "/img/center2.jpg",
    },
    {
      name: "Vanat",
      location: "Uttarakhand",
      rating: "4.7",
      image: "/img/center3.jpg",
    },
    {
      name: "Atmantan Wellness Resort",
      location: "Maharashtra",
      rating: "4.6",
      image: "/img/center4.jpg",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-amber-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-green-800 mb-4">
            Popular <span className="text-amber-600">Panchakarma Centers</span>
          </h2>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Discover trusted Ayurvedic centers offering authentic Panchakarma treatments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {centers.map((center, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-green-100 flex flex-col transform hover:-translate-y-2 hover:scale-105 group">
              <div className="h-52 relative overflow-hidden">
                <img 
                  src={center.image} 
                  alt={center.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent transition-opacity duration-500 group-hover:from-green-900/60"></div>
                <div className="absolute top-3 right-3 bg-amber-100 px-3 py-1 rounded-full text-sm font-semibold text-green-800 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-200">
                  ⭐ {center.rating}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-green-800 mb-2 leading-tight transition-colors duration-300 group-hover:text-green-900">
                  {center.name}
                </h3>
                <p className="text-green-600 mb-4 text-sm flex items-center transition-colors duration-300 group-hover:text-green-700">
                  📍 {center.location}
                </p>
                
                <button className="w-full bg-green-700 text-white py-2.5 px-4 rounded-xl font-medium hover:bg-green-800 transition-all duration-300 mt-auto transform hover:scale-105 hover:shadow-lg">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CentersSection;