import { useFlightContext } from '../../../context/SearchFlights';
import { useNavigate } from 'react-router-dom';
import { Loader2, Plane, User, Calendar, Clock, CreditCard } from 'lucide-react';
import { useEffect } from 'react';

const BookingResult = () => {
  const { selectedBooking, loading,makePayment } = useFlightContext();
  const navigate = useNavigate();

  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);

  const formatDateTime = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    });
  };

  const handleProceedToPayment = () => {

    navigate('/flightsPayment', { 
      state: { 
        bookingId: selectedBooking?._id,
        amount: selectedBooking?.flightOffer?.price?.total,
        currency: selectedBooking?.flightOffer?.price?.currency
      }
    });
  };

  

  const formatDuration = (duration) => {
    if (!duration) return 'N/A';
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <Loader2 className="animate-spin h-12 w-12 text-blue-400" />
      </div>
    );
  }

  if (!selectedBooking) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
          <p className="text-xl font-semibold text-gray-200">No booking found. Please make a booking first.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            Return to Search
          </button>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen font-Josefin text-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto" style={{
        marginTop: "50px",
        marginLeft: "190px",
      }}>
        <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700" style={{
          width: "90%",
          height: "100%",
          paddingLeft: "50px",
          paddingTop: "50px",
          paddingBottom: "50px",
          paddingRight: "50px",
          marginBottom: "100px" 
        }}>
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 border-b border-gray-700" style={{
             paddingLeft: "220px",
             paddingTop: "9px",
             paddingBottom: "9px",
             borderRadius: "5rem",
             alignItems: "center"
          }}>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Plane className="mr-3 h-8 w-8" /> 
              Booking Confirmation
            </h1>
            <p className="mt-2 text-blue-200">Thank you for choosing our service</p>
          </div>
          
          {/* Flight Information */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center" style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              textDecoration: "underline"
            }}>
              <Calendar className="mr-2 h-5 w-5" />
              Flight Information
            </h2>
            
            <div className="bg-gray-850 rounded-lg p-4 border border-gray-700">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-[13px]">Flight Number**</p>
                  <p className="font-medium text-white text-lg">
                    {selectedBooking?.flightOffer?.itineraries?.[0]?.segments?.[0]?.carrierCode}
                    {selectedBooking?.flightOffer?.itineraries?.[0]?.segments?.[0]?.number}
                  </p>
                </div>
                
                <div>
                  <p className="text-gray-400 text-[13px]">Duration**</p>
                  <p className="font-medium text-white text-lg flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-blue-400" />
                    {selectedBooking?.flightOffer?.itineraries?.[0]?.duration}
                  </p>
                </div>
                
                <div className="md:col-span-2 mt-2">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-4 md:mb-0">
                      <p className="text-gray-400 text-[13px]">Departure**</p>
                      <p className="font-medium text-white">
                        {formatDateTime(selectedBooking?.flightOffer?.itineraries?.[0]?.segments?.[0]?.departure?.at)}
                      </p>
                    </div>
                    
                    <div className="hidden md:block flex-1 px-6">
                      <div className="relative flex items-center justify-center">
                        <div className="border-t-2 border-dashed border-gray-600 w-full"></div>
                        <div className="absolute">
                          <Plane className="text-blue-400 transform rotate-90" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-[13px]">Arrival**</p>
                      <p className="font-medium text-white">
                        {formatDateTime(selectedBooking?.flightOffer?.itineraries?.[0]?.segments?.[0]?.arrival?.at)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Traveler Information */}
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center" style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              textDecoration: "underline"
            }}>
              <User className="mr-2 h-5 w-5" />
              Traveler Details
            </h2>
            
            <div className="space-y-4">
              {selectedBooking?.travelers?.map((traveler, index) => (
                <div key={index} className="bg-gray-750 rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors duration-300">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <p className="text-gray-400 text-[13px]">FullName**</p>
                      <p className="font-medium text-lg text-white pb-10" style={{
                        paddingBottom: "10px"
                      }}>{traveler.firstName} {traveler.lastName}</p>
                      <p className="text-gray-400 text-[13px]">Email Address**</p>
                      <p className="text-gray-300 mt-1" style={{
                        paddingBottom: "10px"
                      }}>{traveler.email}</p>
                    </div>
                    <div className="mt-3 md:mt-0">
                      <span className="px-3 py-1 bg-blue-900 text-blue-200 rounded-full text-sm" style={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        marginRight: "10px"
                      }}>{traveler.travelerType}</span>
                      <span className="px-3 py-1 bg-purple-900 text-purple-200 rounded-full text-sm ml-2" style={{
                        paddingLeft: "10px",
                        paddingRight: "10px",
                      }}>{traveler.cabinClass}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-700">
                    <p className="text-gray-400 text-[13px]">Passport Details**</p>
                    <p className=" text-gray-400">Passport: <span className="text-gray-300">{traveler.passportNumber}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400 flex items-center" style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              textDecoration: "underline"
            }}>
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Summary
            </h2>
            
            <div className="bg-gray-750 rounded-lg p-4 border border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-gray-400 t">Total Amount**</p>
                  <p className="font-bold text-2xl text-white">
                    {selectedBooking?.flightOffer?.price?.currency}{" "}
                    {selectedBooking?.flightOffer?.price?.total?.toFixed(2)}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-gray-400">Status: </span>
                    <span className={`font-medium ${selectedBooking?.status === 'CONFIRMED' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {selectedBooking?.status}
                    </span>
                  </p>
                </div>
                
                <button 
                  className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
                  onClick={handleProceedToPayment}
                  disabled={selectedBooking?.status === 'CONFIRMED'}
                  style={{
                    backgroundColor: "rgb(105, 16, 87)",
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {selectedBooking?.status === 'CONFIRMED' ? 'Payment Completed' : 'Proceed to Payment'}
                </button>
              </div>
            </div>
          </div>

          
          <div className="bg-gray-850 p-4 text-center text-gray-400 text-sm" style={{
            marginTop: "30px"
          }}>
            <p>For assistance with your booking, please contact customer support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingResult;