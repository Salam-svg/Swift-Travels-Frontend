import { useFlightContext } from "../../../context/SearchFlights";
import { useEffect } from "react";

const PaymentResult = () => {
  const { selectedBooking, bookingDetails, loading, error } =
    useFlightContext();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-300">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900 bg-opacity-30 border border-red-800 text-red-300 p-4 rounded-lg my-4">
        <h3 className="text-xl font-bold mb-2">Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!selectedBooking || !bookingDetails) {
    return (
      <div className="bg-gray-900 bg-opacity-50 border border-gray-800 text-gray-300 p-6 rounded-lg my-4">
        <p className="text-lg">No booking details available.</p>
      </div>
    );
  }

  const { booking, payment, message } = bookingDetails;
  const { flightOffer, travelers, bookingReference, createdAt, status, user } =
    selectedBooking;
  const itineraries = flightOffer?.itineraries || [];
  const price = flightOffer?.price || {};
  const traveler = travelers?.[0];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-300";
    }
  };

  return (
    <div className="payment-result-container font-Josefin text-gray-200 max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-10" style={{
        marginLeft: "20rem"

      }}>
        <div
          className={`inline-block p-4 rounded-full mb-4 ${
            message?.toLowerCase().includes("successful")
              ? "bg-green-900 bg-opacity-30"
              : "bg-blue-900 bg-opacity-30"
          }`}
          
        >
          {message?.toLowerCase().includes("successful") ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </div>
        <h2 className="text-3xl font-bold text-white">
          {message || "Payment Successful"}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 bg-opacity-70 border border-gray-800 rounded-lg p-6 shadow-lg">
          <div className="booking-summary mb-6">
            <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2 mb-4">
              Booking Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-400 text-sm">Booking Reference</span>
                <span className="text-lg font-mono">
                  {bookingReference || "N/A"}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-400 text-sm">Created At</span>
                <span>
                  {createdAt ? new Date(createdAt).toLocaleString() : "N/A"}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-400 text-sm">Total Price</span>
                <span className="text-xl font-bold text-white">
                  {price.currency
                    ? `${price.currency} ${price.total || 0}`
                    : "N/A"}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-400 text-sm">Status</span>
                <span className={`font-semibold ${getStatusColor(status)}`}>
                  {status || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="payment-details">
            <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2 mb-4">
              Payment Details
            </h3>
            {payment ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Amount</span>
                  <span className="text-xl font-bold text-white">
                    {payment.currency} {payment.amount}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Card</span>
                  <span>
                    {payment.cardBrand} •••• {payment.cardLast4}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Payment ID</span>
                  <span className="font-mono text-sm">{payment.paymentId}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Method</span>
                  <span>{payment.method}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Status</span>
                  <span
                    className={`font-semibold ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Paid At</span>
                  <span>{new Date(payment.paymentDate).toLocaleString()}</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No payment details available.</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-gray-900 bg-opacity-70 border border-gray-800 rounded-lg p-6 shadow-lg">
            <div className="traveler-details">
              <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2 mb-4">
                Traveler Information
              </h3>
              {traveler ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-sm">First Name</span>
                    <span>{traveler.firstName || "N/A"}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-sm">Last Name</span>
                    <span>{traveler.lastName || "N/A"}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-sm">Email</span>
                    <span>{traveler.email || "N/A"}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-sm">
                      Passport Number
                    </span>
                    <span>{traveler.passportNumber || "N/A"}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-sm">Traveler Type</span>
                    <span>{traveler.travelerType || "N/A"}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-sm">Cabin Class</span>
                    <span>{traveler.cabinClass || "N/A"}</span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-gray-400 text-sm">Fare Option</span>
                    <span>{traveler.fareOption || "N/A"}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400">
                  No traveler information available.
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-900 bg-opacity-70 border border-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2 mb-4">
              User Information
            </h3>
            {user ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Name</span>
                  <span>
                    {`${user.firstName || ""} ${user.lastName || ""}`.trim() ||
                      "N/A"}
                  </span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Email</span>
                  <span>{user.email || "N/A"}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Nationality</span>
                  <span>{user.nationality || "N/A"}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">
                    Travel Frequency
                  </span>
                  <span>{user.travelFrequency || "N/A"}</span>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-gray-400 text-sm">Account Status</span>
                  <div className="flex gap-2">
                    <span
                      className={
                        user.isActive ? "text-green-400" : "text-red-400"
                      }
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                    <span>•</span>
                    <span
                      className={
                        user.isVerified ? "text-green-400" : "text-yellow-400"
                      }
                    >
                      {user.isVerified ? "Verified" : "Not Verified"}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No user information available.</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 bg-opacity-70 border border-gray-800 rounded-lg p-6 shadow-lg mt-6">
        <div className="flight-details">
          <h3 className="text-xl font-semibold text-blue-400 border-b border-gray-700 pb-2 mb-4">
            Flight Itinerary
          </h3>
          {itineraries.length > 0 ? (
            <div className="space-y-6">
              {itineraries.map((itinerary, index) => (
                <div key={index} className="itinerary">
                  <div className="text-sm text-gray-400 mb-2">
                    {index === 0 ? "Outbound" : "Return"} Flight
                  </div>
                  <div className="space-y-4">
                    {itinerary.segments?.map((segment, segIndex) => (
                      <div
                        key={segIndex}
                        className="segment bg-gray-800 bg-opacity-50 p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <div className="flex items-center">
                            <span className="text-lg font-semibold">
                              {segment.carrierCode || "N/A"}
                            </span>
                            <span className="text-sm text-gray-400 ml-2">
                              Flight {segment.number || "N/A"}
                            </span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-400">Duration: </span>
                            <span>{segment.duration || "N/A"}</span>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="flex-1">
                            <div className="text-2xl font-bold">
                              {segment.departure?.iataCode || "N/A"}
                            </div>
                            <div className="text-sm">
                              {segment.departure?.at
                                ? new Date(
                                    segment.departure.at
                                  ).toLocaleString()
                                : "N/A"}
                            </div>
                          </div>

                          <div className="flex-1 text-center px-4">
                            <div className="relative">
                              <div className="border-t border-gray-600 w-full absolute top-1/2"></div>
                              <div className="flex justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-6 w-6 text-blue-400 bg-gray-800 rounded-full p-1 relative z-10"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14M12 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {segment.aircraft?.code
                                ? `Aircraft: ${segment.aircraft.code}`
                                : ""}
                            </div>
                          </div>

                          <div className="flex-1 text-right">
                            <div className="text-2xl font-bold">
                              {segment.arrival?.iataCode || "N/A"}
                            </div>
                            <div className="text-sm">
                              {segment.arrival?.at
                                ? new Date(segment.arrival.at).toLocaleString()
                                : "N/A"}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No itinerary details available.</p>
          )}
        </div>
      </div>

      <div className="mt-10 text-center">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300">
          Download E-Ticket
        </button>
        <p className="mt-4 text-sm text-gray-400">
          A copy of your booking details has been sent to your email.
        </p>
      </div>
    </div>
  );
};

export default PaymentResult;
