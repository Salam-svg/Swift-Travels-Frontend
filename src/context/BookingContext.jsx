import { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BookingContext = createContext();

export const useBookingContext = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_BASE_URL ;

  const createBooking = async (bookingData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(`${baseUrl}/api/bookings`, {
        user: bookingData.userId,
        flightOffer: {
          ...bookingData.flight,
          id: bookingData.flightId,
          price: {
            total: parseFloat(bookingData.flight.price.total),
            currency: bookingData.flight.price.currency
          }
        },
        flightId: bookingData.flightId,
        travelers: bookingData.travelers 
      });

      setSelectedBooking(response.data.data);
      setBookings(prev => [...prev, response.data.data]);
      toast.success(response.data.message);
      return response.data;

    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Booking failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getBookings = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/api/bookings/user/${userId}`);
      setBookings(response.data);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Error fetching bookings';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/bookings/cancel/${bookingId}`);
      setBookings(prev =>
        prev.map(booking =>
          booking._id === bookingId ? response.data.updatedBooking : booking
        )
      );
      toast.success('Booking cancelled successfully');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Cancellation failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const makePayment = async (bookingId, paymentData) => {
    
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/api/payments/${bookingId}`, paymentData);
      setSelectedBooking(prev => ({
        ...prev,
        status: response.data.booking?.status,
        paymentStatus: response.data.booking?.paymentStatus
      }));
      toast.success('Payment processed successfully');
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Payment failed';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      selectedBooking,
      loading,
      error,
      createBooking,
      getBookings,
      cancelBooking,
      makePayment
    }}>
      {children}
    </BookingContext.Provider>
  );
};