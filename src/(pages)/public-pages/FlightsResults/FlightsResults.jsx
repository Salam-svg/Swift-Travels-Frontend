import { useState, useEffect } from "react";
import { useFlightContext } from "../../../context/SearchFlights";
import loadingFlights from "../../../assets/animations/LoadingFlightsResults/Animation - 1742898042822.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const randomImages = [
  "https://images.pexels.com/photos/163792/model-planes-airplanes-miniatur-wunderland-hamburg-163792.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/3140204/pexels-photo-3140204.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/31250576/pexels-photo-31250576/free-photo-of-sunset-view-of-airplane-at-airport-runway.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1973182/pexels-photo-1973182.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/69827/aircraft-qantas-air-new-zealand-lan-chile-69827.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/20648885/pexels-photo-20648885/free-photo-of-airplane-on-tarmac-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1098745/pexels-photo-1098745.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/5394641/pexels-photo-5394641.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/27444515/pexels-photo-27444515/free-photo-of-istanbul-airport.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2555390/pexels-photo-2555390.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/10180161/pexels-photo-10180161.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/10844104/pexels-photo-10844104.jpeg?auto=compress&cs=tinysrgb&w=600",
];

const FlightResults = () => {
  const { flights, loading, error, setSelectedFlight } = useFlightContext();
  const [processedFlights, setProcessedFlights] = useState([]);

  const navigate = useNavigate();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const formatDuration = (isoDuration) => {
    const matches = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    const hours = matches[1] ? parseInt(matches[1]) : 0;
    const minutes = matches[2] ? parseInt(matches[2]) : 0;
    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  };

  const handleBooking = (processedFlight) => {
    setSelectedFlight({
      processedData: processedFlight,

      rawFlightData: processedFlight.rawFlightData,
    });
    navigate("/bookFlights");
  };

  useEffect(() => {
    if (flights && Array.isArray(flights)) {
      const flightData = flights.slice(0, 12).map((flight, index) => {
        const itineraries =
          flight.itineraries?.map((itinerary) => ({
            duration: itinerary.duration,
            segments:
              itinerary.segments?.map((segment) => ({
                departure: {
                  iataCode: segment.departure?.iataCode,
                  at: segment.departure?.at,
                  terminal: segment.departure?.terminal,
                },
                arrival: {
                  iataCode: segment.arrival?.iataCode,
                  at: segment.arrival?.at,
                  terminal: segment.arrival?.terminal,
                },
                carrierCode: segment.carrierCode,
                number: segment.number,
                aircraft: segment.aircraft?.code,
                duration: segment.duration,
                numberOfStops: segment.numberOfStops,
              })) || [],
          })) || [];

        const displaySegments = itineraries[0]?.segments || [];
        const stops = Math.max(displaySegments.length - 1, 0);

        const priceValue = parseFloat(
          flight.price?.grandTotal ||
            flight.price?.total ||
            flight.totalPrice ||
            0
        ).toFixed(2);

        return {
          id: flight.id || index,
          rawFlightData: flight,

          airline:
            flight.validatingAirlineCodes?.[0] ||
            displaySegments[0]?.carrierCode ||
            "Unknown Airline",
          flightNumber: displaySegments.map((seg) => seg.number).join(" → "),

          departureTime: displaySegments[0]?.departure?.at || "",
          departureAirport:
            displaySegments[0]?.departure?.iataCode || flight.origin || "",
          departureTerminal: displaySegments[0]?.departure?.terminal,

          arrivalTime:
            displaySegments[displaySegments.length - 1]?.arrival?.at || "",
          arrivalAirport:
            displaySegments[displaySegments.length - 1]?.arrival?.iataCode ||
            flight.destination ||
            "",
          arrivalTerminal:
            displaySegments[displaySegments.length - 1]?.arrival?.terminal,

          duration: formatDuration(
            flight.itineraries?.[0]?.duration || "PT0H0M"
          ),
          stops,
          price: priceValue,
          currency: flight.price?.currency || "USD",

          image: randomImages[index % randomImages.length],
          lastTicketingDate: flight.lastTicketingDate || "",
          numberOfBookableSeats: flight.numberOfBookableSeats || 0,
          travelerPricings:
            flight.travelerPricings?.map((pricing) => ({
              ...pricing,
              price: {
                ...pricing.price,
                total: parseFloat(pricing.price.total).toFixed(2),
              },
            })) || [],

          itineraries,
          segments: displaySegments,
        };
      });

      setProcessedFlights(flightData);
    }
  }, [flights]);

  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div>
        <Lottie
          className="items-center"
          animationData={loadingFlights}
          style={{ width: 300 }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          backgroundColor: "#7f1d1d",
          padding: "1rem",
          borderRadius: "0.5rem",
          color: "#fecaca",
        }}
      >
        <h3 style={{ fontSize: "1.125rem", fontWeight: "bold" }}>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!processedFlights || processedFlights.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          backgroundColor: "#1f2937",
          borderRadius: "0.5rem",
          color: "#e5e7eb",
        }}
      >
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          No Flights Found
        </h3>
        <p>Please try different search criteria or dates.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1rem" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#e5e7eb",
        }}
      >
        Available Flights
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {processedFlights.map((flight) => (
          <div
            key={flight.id}
            style={{
              border: "1px solid #374151",
              borderRadius: "0.5rem",
              overflow: "hidden",
              transition: "box-shadow 0.3s ease",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
              backgroundColor: "#1f2937",
            }}
          >
            <div
              style={{
                position: "relative",
                height: "12rem",
                overflow: "hidden",
              }}
            >
              <img
                src={flight.image}
                alt={`${flight.airline} flight`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "0.5rem",
                  right: "0.5rem",
                  backgroundColor: flight.stops === 0 ? "#3b82f6" : "#6b7280",
                  color: "white",
                  padding: "0.25rem 0.5rem",
                  borderRadius: "0.25rem",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                {flight.stops === 0 ? "Direct" : `${flight.stops} stops`}
              </div>
            </div>

            <div style={{ padding: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <span style={{ fontWeight: "bold", color: "#e5e7eb" }}>
                  {flight.airline} {flight.flightNumber}
                </span>
                <span
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: "bold",
                    color: "#60a5fa",
                  }}
                >
                  {flight.currency} {flight.price}
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "bold",
                      color: "#e5e7eb",
                    }}
                  >
                    {flight.departureAirport}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                    {formatTime(flight.departureTime)}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    {formatDate(flight.departureTime)}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    {flight.duration}
                  </p>
                  <div
                    style={{
                      position: "relative",
                      width: "6rem",
                      height: "1px",
                      backgroundColor: "#4b5563",
                      margin: "0.5rem 0",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "0",
                        width: "0.5rem",
                        height: "0.5rem",
                        marginTop: "-0.25rem",
                        borderRadius: "9999px",
                        backgroundColor: "#9ca3af",
                      }}
                    ></div>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    Flight Duration
                  </p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <p
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "bold",
                      color: "#e5e7eb",
                    }}
                  >
                    {flight.arrivalAirport}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>
                    {formatTime(flight.arrivalTime)}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    {formatDate(flight.arrivalTime)}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginBottom: "1rem",
                  fontSize: "0.875rem",
                  color: "#d1d5db",
                }}
              >
                <p>
                  <strong>Last Ticketing Date:</strong>{" "}
                  {flight.lastTicketingDate || "N/A"}
                </p>
                <p>
                  <strong>Bookable Seats:</strong>{" "}
                  {flight.numberOfBookableSeats || "N/A"}
                </p>
              </div>

              {flight.travelerPricings.length > 0 && (
                <div style={{ fontSize: "0.875rem", color: "#d1d5db" }}>
                  <p>
                    <strong>Traveler Pricing:</strong>
                  </p>
                  {flight.travelerPricings.map((traveler, idx) => (
                    <div key={idx} style={{ marginBottom: "0.5rem" }}>
                      <p>
                        <strong>Type:</strong> {traveler.travelerType} &nbsp;
                        <strong>Fare Option:</strong> {traveler.fareOption}
                      </p>
                      <p>
                        <strong>Price:</strong> {traveler.price.currency}{" "}
                        {traveler.price.total}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div
              style={{
                backgroundColor: "#111827",
                padding: "1rem",
                borderTop: "1px solid #374151",
              }}
            >
              <button
                className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
                style={{
                  width: "100%",
                  backgroundColor: "rgb(105, 16, 87)",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  fontWeight: "bold",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleBooking(flight)}
              >
                Book Flight
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightResults;
