import { useState, useEffect } from 'react';

export default function JourneyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const carouselItems = [
    {
      id: 1,
      alt: "Laptop showing flight booking interface",
      caption: "Easy Flight Booking",
      img: "https://images.pexels.com/photos/386000/pexels-photo-386000.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 2,
      alt: "Person searching for flights on laptop",
      caption: "Search Flights",
      img: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 3,
      alt: "Instagram promotion on laptop",
      caption: "Follow our journey on Instagram",
      img: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 4,
      alt: "Person browsing flights on desktop",
      caption: "SEARCH FLIGHTS",
      img: "https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=1200"
    },
    {
      id: 5,
      alt: "Mobile app showing flight ticket",
      caption: "Air Ticket",
      img: "https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=1200"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === carouselItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? carouselItems.length - 1 : prev - 1));
  };

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 1000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  const getVisibleIndices = () => {
    const indices = [];
    for (let i = 0; i < 5; i++) {
      indices.push((currentIndex + i) % carouselItems.length);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <div className=" py-12 px-4" style={{
        width: "86%",
        margin: "0 auto"
    }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12"
        style={{
            marginBottom: "30px"
        }}
        >
          Elevate Your Journey with SWIFT-TRAVELS
        </h2>
        
        <div className="relative">
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gray-800 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-colors duration-300"
            aria-label="Previous slide"
          >
            ←
          </button>
          
          <div className="flex overflow-x-hidden">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 20}%)` }}>
              {carouselItems.map((item, index) => (
                <div key={item.id} className="min-w-full md:min-w-1/3 lg:min-w-1/5 px-2" style={{
                    gap: "12rem"
                }}>
                  <div className="relative rounded-lg overflow-hidden border border-gray-700 h-56 md:h-64 group"
                
                  >
                    <img 
                      src={item.img} 
                      alt={item.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{
                        gap: "1rem",
                        paddingLeft:"50px"
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                    <div className="absolute bottom-0 left-19 right-0 p-4 text-white">
                      <p className="font-medium"
                      style={{
                        fontSize: "12px"
                      }}
                      >{item.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gray-800 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-colors duration-300"
            aria-label="Next slide"
          >
            →
          </button>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-6">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 mx-1 rounded-full focus:outline-none transition-colors duration-300 ${
                currentIndex === index ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}