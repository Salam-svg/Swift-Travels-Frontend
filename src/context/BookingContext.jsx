import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/bookings', {
        user: bookingData.userId,
        flightOffer: {
          ...bookingData.flight,
          id: bookingData.flightId,
          price: {
            total: parseFloat(bookingData.flight.price.total),
            currency: bookingData.flight.price.currency
          }
        },
        flightId: bookingData.flightId
      });

      setCurrentBooking(response.data.data);
      setBookings(prev => [...prev, response.data.data]);
      return response.data;

    } catch (err) {
      setError(err.response?.data?.error || 'Booking failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/bookings/user/${userId}`);
      setBookings(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching bookings');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      const response = await axios.post(`/api/bookings/cancel/${bookingId}`);
      setBookings(prev => 
        prev.map(booking => 
          booking._id === bookingId ? response.data.updatedBooking : booking
        )
      );
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Cancellation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      currentBooking,
      loading,
      error,
      createBooking,
      getBookings,
      cancelBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};