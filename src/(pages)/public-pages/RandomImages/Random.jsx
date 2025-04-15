import { useState, useEffect, useRef } from 'react';

export default function JourneyCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const carouselItems = [
    {
      id: 1,
      alt: "Laptop showing flight booking interface",
      caption: "Easy Flight Booking",
      img: "https://images.pexels.com/photos/3225528/pexels-photo-3225528.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 2,
      alt: "Person searching for flights on laptop",
      caption: "Search Flights",
      img: "https://images.pexels.com/photos/1028225/pexels-photo-1028225.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 3,
      alt: "Instagram promotion on laptop",
      caption: "Follow our journey on Instagram",
      img: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 4,
      alt: "Person browsing flights on desktop",
      caption: "SEARCH FLIGHTS",
      img: "https://images.pexels.com/photos/753339/pexels-photo-753339.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
    {
      id: 5,
      alt: "Mobile app showing flight ticket",
      caption: "Air Ticket",
      img: "https://images.pexels.com/photos/586687/pexels-photo-586687.jpeg?auto=compress&cs=tinysrgb&w=1200",
    },
  ];

  // Duplicate items for infinite scrolling
  const extendedItems = [...carouselItems, ...carouselItems, ...carouselItems];
  const totalItems = carouselItems.length;
  const initialOffset = totalItems; // Start in the middle set of duplicated items

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000); // Increased to 3s for better visibility

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // When reaching the end of the extended items, reset to the middle set
    if (currentIndex >= totalItems * 2) {
      setCurrentIndex(initialOffset);
      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = `translateX(-${initialOffset * 100}%)`;
      setTimeout(() => {
        carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      }, 0);
    } else if (currentIndex < initialOffset) {
      setCurrentIndex(totalItems + currentIndex);
      carouselRef.current.style.transition = 'none';
      carouselRef.current.style.transform = `translateX(-${(totalItems + currentIndex) * 100}%)`;
      setTimeout(() => {
        carouselRef.current.style.transition = 'transform 0.5s ease-in-out';
      }, 0);
    }
  }, [currentIndex, totalItems, initialOffset]);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(initialOffset + index);
  };

  return (
    <div
      className="py-12"
      style={{
        width: "86%",
        margin: "0 auto",
        marginBottom: "50px",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl font-bold text-white text-center mb-12"
          style={{ marginBottom: "30px" }}
        >
          Elevate Your Journey with SWIFT-TRAVELS
        </h2>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-gray-800 hover:bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-900/30 cursor-pointer"
            aria-label="Previous slide"
          >
            ←
          </button>

          <div className="overflow-hidden">
            <div
              ref={carouselRef}
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {extendedItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="min-w-full px-2">
                  <div className="relative rounded-lg overflow-hidden border h-96 w-96 group">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className=" object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="font-medium text-sm">{item.caption}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-blue-900/30 cursor-pointer"
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
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full focus:outline-none transition-colors duration-300 ${
                currentIndex % totalItems === index ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}