import { useState } from 'react';

export default function FAQAccordion() {
  const [openItems, setOpenItems] = useState([0]);
  
  const faqItems = [
    {
      question: "What steps should I take to book my flight?",
      answer: "Booking your flight is simple. Use our intuitive Flight Search tool to input your departure and destination details, select your travel dates, and apply preferences to find the best options. Once you identify your ideal flight, you can complete your booking directly through our Book Flight page."
    },
    {
      question: "Are there any hidden fees when booking?",
      answer: "We believe in transparency. The prices you see while searching include all applicable fees, so there are no surprises during checkout. This way, you can confidently manage your travel budget."
    },
    {
      question: "How can I access exclusive travel offers?",
      answer: "Stay updated on our exciting promotions by visiting our Travel Offers page regularly. We curate exclusive deals that can save you money on flights, ensuring you get the best value for your travel plans."
    },
    {
      question: "What should I do if I need assistance with my booking?",
      answer: "Our dedicated Customer Support team is here to help! Whether you have questions about your reservations or need help making changes, our knowledgeable representatives are just a click away and ready to assist you promptly."
    },
    {
      question: "Can I manage my bookings online?",
      answer: "Yes! You can easily manage your bookings through your personal account. Visit your My Account page to view your itineraries, make changes, or update your personal information at any time."
    },
    {
      question: "Is my personal information secure with SWIFT-TRAVELS?",
      answer: "Absolutely. We prioritize your privacy and follow strict protocols to protect your information. For more details, read our Privacy Policy to understand how we safeguard your data."
    }
  ];

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  return (
    <div className=" p-6 md:p-8 min-h-screen" style={{
        width: "86%",
        margin: "0 auto",
        marginTop: "90px",
        marginBottom: "50px"
      }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold  text-white mb-6"
        style={{
            textAlign: "center",
            marginBottom: "20px"
        }}
        >Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className=" rounded-lg overflow-hidden border border-gray-700"
              style={{
                width: "86%",
                margin: "0 auto",
                paddingBottom: "20px",
                marginBottom: "20px",

                boxShadow: ".2px .2px .2px .2px #eee"
              }}
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleItem(index)}
              >
                <span className="text-lg font-medium text-white">{item.question}</span>
                <svg 
                  className={`w-5 h-5 text-blue-400 transition-transform ${openItems.includes(index) ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 py-4 border-t border-gray-700">
                  <p className="text-gray-300">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-gray-400">Still have questions?</p>
          <button className="mt-3 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300"
          style={{ 
            border: "2px solid #eee",
            padding: ".2rem .5rem",
            borderRadius: "20px"
          }}
          >
            Contact Support
             <svg className="ml-2 w-4 h-4 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}