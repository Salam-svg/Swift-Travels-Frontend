import { useState } from 'react';

export default function TravelDarkMode() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const features = [
    {
      id: 1,
      title: "Find the Best Flights",
      description: "Discover tailored options that fit your travel plans effectively with our advanced filtering system.",
      badge: "Popular",
      imageAlt: "Mobile app showing flight booking interface"
    },
    {
      id: 2,
      title: "Simple Flight Selection",
      description: "Locate flights that align with your schedule and budget effortlessly with our intuitive interface.",
      badge: null,
      imageAlt: "Person searching flights on laptop"
    },
    {
      id: 3,
      title: "Price Comparison",
      description: "Compare prices across multiple airlines and find the best deals for your travel budget.",
      badge: "New",
      imageAlt: "Price comparison chart"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 2 : prev - 1));
  };

  return (
    <div className="font-Josefin text-white p-6 min-h-screen"style={{
        marginTop: "90px"
    }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button className="bg-transparent border border-gray-600 text-gray-300 px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition-all duration-300">
            About Us
          </button>
        </div>
        
        <h1 className="text-4xl font-semibold mt-8 mb-3">
          Discover Effortless Travel Planning with{" "}
          <span className="text-blue-500 font-bold">SWIFT-TRAVELS.</span>
        </h1>
        
        <p className="text-gray-400 text-lg max-w-xl mb-8 leading-relaxed">
          Explore the world effortlessly with SWIFT-TRAVELS, your go-to destination for intuitive flight bookings. Our platform simplifies travel planning, allowing you to search, compare, and secure flights from various airlines.
        </p>
        
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold flex items-center hover:bg-blue-700 transition-all duration-300">
          Start Your Journey
          <span className="ml-2">→</span>
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {features.slice(currentSlide, currentSlide + 2).map((feature) => (
            <div 
              key={feature.id}
              className="bg-gray-800 rounded-xl p-6 relative overflow-hidden shadow-lg hover:translate-y-1 transition-transform duration-300"
            >
              {feature.badge && (
                <span className="absolute top-4 right-4 bg-blue-600 bg-opacity-80 text-white px-3 py-1 rounded text-xs font-semibold">
                  {feature.badge}
                </span>
              )}
              <div className="h-48 mb-4 rounded-lg overflow-hidden bg-gray-700">
                <img 
                  src={`/api/placeholder/400/320`} 
                  alt={feature.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-end mt-6">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 text-white flex items-center justify-center mr-3 hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
          >
            ←
          </button>
          <button 
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 text-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all duration-300"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}