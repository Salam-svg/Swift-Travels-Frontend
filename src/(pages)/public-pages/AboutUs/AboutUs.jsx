import { useState } from 'react';
import "../../../styles/Abouts.css"

export default function TravelDarkMode() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const features = [
    {
      id: 1,
      title: "Find the Best Flights",
      description: "Discover tailored options that fit your travel plans effectively with our advanced filtering system.",
      badge: "Popular",
      imageAlt: "Mobile app showing flight booking interface",
      img: "https://images.pexels.com/photos/2093322/pexels-photo-2093322.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      id: 2,
      title: "Simple Flight Selection",
      description: "Locate flights that align with your schedule and budget effortlessly with our intuitive interface.",
      badge: null,
      imageAlt: "Person searching flights on laptop",
      img: "https://images.pexels.com/photos/109371/pexels-photo-109371.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 3,
      title: "Price Comparison",
      description: "Compare prices across multiple airlines and find the best deals for your travel budget.",
      badge: "New",
      imageAlt: "Price comparison chart",
      img: "https://images.pexels.com/photos/3183174/pexels-photo-3183174.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === features.length - 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? features.length - 2 : prev - 1));
  };

  return (
    <div className="font-Josefin text-white p-6 min-h-screen" style={{
      width: "86%",
      margin: "0 auto",
      marginTop: "50px",
    }}>
      <div className="left-section  max-w-6xl flex mx-auto">
        {/* Left Section */}
        <div className="flex-1">
          <button className="bg-transparent border border-gray-600 text-gray-300 px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition-all duration-300 mb-5" style={{
            border: "2px solid white",
            padding: ".3rem .5rem",
            borderRadius: "20px",
            marginBottom: "20px"        
             }}>
            About Us
          </button>
          <h6 className="text- font-semibold mb-6" style={{
            fontSize: "25px",
            marginBottom: "15px"
          }}>
            Discover Effortless <br /> Travel  Planning with <br />
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 bg-clip-text text-transparent font-bold cursor-pointer"> SWIFT-TRAVELS.</span>
          </h6>
          <p className="text-gray-400  max-w-xl mb-8 leading-relaxed" style={{
            fontSize: "12px",
            marginBottom: "15px"
          }}>
            Explore the world effortlessly with SWIFT-TRAVELS, <br />
             your go-to destination for intuitive flight bookings. <br /> Our platform simplifies travel planning, allowing you to search, <br /> compare, and secure flights from various airlines.
          </p>
          <button className="md:mt-0  md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
              style={{
                backgroundColor: "rgb(105, 16, 87)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
              }}>
            Start Your Journey
            <span className="ml-2">  →</span>
          </button>
        </div>

        {/* Right Section */}
        <div className="right-section flex-1 relative ml-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.slice(currentSlide, currentSlide + 2).map((feature, index) => (
              <div 
                key={feature.id}
                className="relative group transition-all duration-300"
              >
                {feature.badge && (
                  <span className="absolute top-4 right-4 bg-blue-600 bg-opacity-80 text-white px-3 py-1 rounded text-xs font-semibold">
                    {feature.badge}
                  </span>
                )}
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src={feature.img} 
                    alt={feature.imageAlt}
                    className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                      index === 0 ? 'h-96' : 'h-64'
                    }`}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end gap-3 mt-8">
            <button 
              onClick={prevSlide}
              className="font-Josefin md:mt-0 md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30 cursor-pointer"
              style={{
                border: "2px solid white",
                padding: ".3rem .7rem",
                borderRadius: "20px"
              }}
            >
              ←
            </button>
            <button 
              onClick={nextSlide}
              className="md:mt-0 md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30 cursor-pointer"
              style={{
                border: "2px solid white",
                padding: ".3rem .7rem",
                borderRadius: "20px"
              }}
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}