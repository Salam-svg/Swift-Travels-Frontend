import React from 'react';

const TravelBanner = () => {
  return (
    <div className="flex justify-center p-4 md:p-12" style={{
      width: "95%",
      maxWidth: "1200px",
      margin: "auto"
    }}>
      <div className="relative w-full h-auto min-h-64 md:h-96 bg-gray-900 overflow-hidden rounded-2xl p-6 md:p-12">
        {/* Background stars/dots - responsive positioning */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-purple-300 rounded-full"></div>
          <div className="absolute top-1/3 left-1/2 w-1 h-1 bg-purple-300 rounded-full"></div>
          <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-purple-300 rounded-full"></div>
          <div className="absolute top-2/3 left-1/4 w-1 h-1 bg-purple-300 rounded-full"></div>
          <div className="absolute top-3/4 left-2/3 w-1 h-1 bg-purple-300 rounded-full"></div>
          <div className="absolute top-1/5 left-3/4 w-1 h-1 bg-purple-300 rounded-full hidden md:block"></div>
          <div className="absolute top-2/5 left-4/5 w-1 h-1 bg-purple-300 rounded-full hidden md:block"></div>
          <div className="absolute top-1/6 left-1/6 w-1 h-1 bg-purple-300 rounded-full"></div>
          <div className="absolute top-5/6 left-5/6 w-1 h-1 bg-purple-300 rounded-full hidden md:block"></div>
        </div>

        {/* Wave at bottom - full width */}
        <div className="absolute bottom-0 w-full left-0">
          <svg viewBox="0 0 1200 200" className="w-full">
            <path d="M0,200 L0,150 L20,150 L20,130 L40,130 L40,160 L60,160 L60,140 L80,140 L80,160 L100,160 L100,120 L120,120 L120,160 L140,160 L140,130 L160,130 L160,150 L180,150 L180,100 L200,100 L200,150 L220,150 L220,170 L240,170 L240,150 L260,150 L260,130 L280,130 L280,150 L300,150 L300,120 L320,120 L320,150 L340,150 L340,100 L360,100 L360,80 L380,80 L380,60 L400,60 L400,40 L420,40 L420,60 L440,60 L440,80 L460,80 L460,70 L480,70 L480,60 L500,60 L500,40 L520,40 L520,60 L540,60 L540,80 L560,80 L560,100 L580,100 L580,150 L600,150 L600,170 L620,170 L620,150 L640,150 L640,160 L660,160 L660,170 L680,170 L680,150 L700,150 L700,130 L720,130 L720,150 L740,150 L740,130 L750,130 L750,50 L755,50 L755,40 L760,40 L760,50 L765,50 L765,130 L780,130 L780,150 L800,150 L800,160 L820,160 L820,140 L840,140 L840,160 L860,160 L860,150 L880,150 L880,130 L900,130 L900,150 L920,150 L920,160 L940,160 L940,150 L960,150 L960,140 L980,140 L980,160 L1000,160 L1000,150 L1020,150 L1020,130 L1040,130 L1040,150 L1060,150 L1060,160 L1080,160 L1080,140 L1100,140 L1100,160 L1120,160 L1120,150 L1140,150 L1140,170 L1160,170 L1160,150 L1180,150 L1180,160 L1200,160 L1200,200 Z" fill="#6B21A8" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Location pin - visible on all screens but positioned differently */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 scale-75 md:scale-100">
          <svg viewBox="0 0 100 200" width="100" height="200">
            <path d="M50,20 L50,80 L30,120 L70,120 L50,80 Z M30,80 L10,80 L10,90 L30,90 Z M70,80 L90,80 L90,90 L70,90 Z" fill="#A78BFA" fillOpacity="0.7" />
          </svg>
        </div>

        {/* Cloud - hidden on small screens */}
        <div className="absolute bottom-0 right-1/3 hidden md:block">
          <svg viewBox="0 0 150 80" width="150" height="80">
            <path d="M10,80 C10,60 140,60 140,80 L10,80 Z M20,60 L20,50 C20,50 30,40 40,50 C40,50 50,40 60,50 C60,50 70,40 80,50 C80,50 90,40 100,50 C100,50 110,40 120,50 L120,60 L20,60 Z" fill="#A78BFA" fillOpacity="0.7" />
          </svg>
        </div>

        {/* Text content - responsive sizing and placement */}
        <div className="absolute top-6 md:top-16 left-6 md:left-16 text-white z-10">
          <p className="text-sm md:text-lg italic mb-1 text-purple-300">30% offer for Tour</p>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 max-w-md">Start your Journey With a Single Click</h1>
          <button className="bg-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded font-medium hover:bg-purple-700 transition-all">
            Start Booking
          </button>
        </div>

        {/* Image circles - responsive sizes and positioning */}
        <div className="absolute top-4 right-4 md:top-10 md:right-10 scale-75 md:scale-100">
          {/* Main circular image */}
          <div className="relative w-32 h-32 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-purple-500 hidden sm:block">
            <img src="https://images.pexels.com/photos/2480554/pexels-photo-2480554.jpeg?auto=compress&cs=tinysrgb&w=600" className="w-full h-full object-cover" alt="Destination" />
          </div>

          {/* Smaller circle 1 - hidden on mobile */}
          <div className="absolute -top-10 -left-20 w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-purple-500 hidden md:block">
            <img src="https://images.pexels.com/photos/14734523/pexels-photo-14734523.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Friends traveling together" className="w-full h-full object-cover" />
          </div>

          {/* Smaller circle 2 - hidden on mobile */}
          <div className="absolute bottom-0 -left-24 w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-purple-500 hidden md:block">
            <img src="https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Hot air balloons" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Plane icons - responsive positioning */}
        <svg className="absolute top-20 right-1/4 hidden md:block" width="30" height="30" viewBox="0 0 24 24">
          <path fill="#A78BFA" d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
        </svg>
        
        <svg className="absolute bottom-32 left-1/4 w-6 h-6 md:w-8 md:h-8" width="30" height="30" viewBox="0 0 24 24">
          <path fill="#A78BFA" d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
        </svg>
        
        {/* Dotted flight path - hidden on small screens */}
        <svg className="absolute top-0 right-0 w-full h-full hidden md:block">
          <path d="M280,240 C350,180 500,160 580,100" stroke="#A78BFA" strokeWidth="2" strokeDasharray="5,5" fill="none" />
          <path d="M150,280 C220,240 250,180 280,120" stroke="#A78BFA" strokeWidth="2" strokeDasharray="5,5" fill="none" />
        </svg>
      </div>
    </div>
  );
};

export default TravelBanner;