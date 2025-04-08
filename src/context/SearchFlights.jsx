import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { debounce } from "lodash";

export const FlightContext = createContext();

export const useFlightContext = () => useContext(FlightContext);

const FlightProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  

  useEffect(() => {
    const storedFlights = localStorage.getItem("flights");
    if (storedFlights) {
      setFlights(JSON.parse(storedFlights));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedSelectedFlight = localStorage.getItem("selectedFlight");
    if (storedSelectedFlight) {
      setSelectedFlight(JSON.parse(storedSelectedFlight));
    }
  }, []);

  useEffect(() => {
    const storedBooking = localStorage.getItem("selectedBooking");
    if (storedBooking) {
      setSelectedBooking(JSON.parse(storedBooking));
    }
  }, []);

  const searchFlights = async (searchParams) => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams({
        origin: searchParams.origin,
        destination: searchParams.destination,
        departureDate: searchParams.departureDate,
      });

      const response = await axios.get(
        `http://localhost:7500/api/flights?${queryParams}`
      );
      console.log("Raw response:", response);

      const { data } = response;

      console.log("Full API Response:", data);

      const flightData = data?.data?.result?.data;

      console.log("Flights received:", flightData);

      setFlights(Array.isArray(flightData) ? flightData : []);

      if (flightData.length > 0) {
        setFlights(flightData);
        localStorage.setItem("flights", JSON.stringify(flightData));
        toast.success(`${flightData.length} flights found`);
      } else {
        setFlights([]);
        toast.info("No flights matching your criteria");
      }
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (input, type) => {
    try {
      const response = await axios.get(
        `http://localhost:7500/api/airports?search=${input}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const bookFlights = async (bookingData) => {
    setLoading(true);
    setError(null);
    try {
      const flightOffer = {
        ...bookingData.flightOffer,
        price: {
          total: parseFloat(bookingData.flightOffer.price.total),
          currency: bookingData.flightOffer.price.currency,
        },
      };
      const response = await axios.post(
        "http://localhost:7500/flights/booking",
        {
          user: bookingData.user,
          flightOffer,
          travelers: bookingData.travelers,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSelectedBooking(response.data.data);
      console.log("THE SELECTED-BOOKING", setSelectedBooking);

      localStorage.setItem(
        "selectedBooking",
        JSON.stringify(response.data.data)
      );
      setBookingDetails(response.data);
      console.log("SET BOOKING-DETAILS", setBookingDetails);

      return response.data;
    } catch (error) {
      console.error("Booking error:", error);
      toast.error(error.response?.data?.error || "Booking failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async (paymentData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `http://localhost:7500/booking/payment`,
        paymentData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setBookingDetails(response.data);
      setSelectedBooking(response.data.booking);


      if (response.status >= 200 && response.status < 300) {
        toast.success("Payment Successful & Booking Confirmed");

        if (response.status >= 200 && response.status < 300) {
          const booking = response.data?.booking;
    
          if (booking) {
            setSelectedBooking(booking);
            localStorage.setItem("selectedBooking", JSON.stringify(booking));
          }
    
          setBookingDetails(response.data);
          
          toast.success("Payment Successful & Booking Confirmed");

          console.log("Saved booking to localStorage:", booking);
          console.log("Payment response:", response.data);
          return response.data;
        } else {
          toast.error("Payment failed");
          return null;
        }
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
      setError(err.message);
      console.log("LocalStorage selectedBooking:", localStorage.getItem("selectedBooking"));
      return null;
    } finally {
      setLoading(false);
    }
  };



  const value = {
    flights,
    loading,
    error,
    selectedFlight,
    bookingDetails,
    selectedBooking,
    setFlights,
    setSelectedFlight,
    setSelectedBooking,
    bookFlights,
    fetchSuggestions,
    searchFlights,
    makePayment,
  };

  return (
    <FlightContext.Provider value={value}>{children}</FlightContext.Provider>
  );
};

export default FlightProvider;
