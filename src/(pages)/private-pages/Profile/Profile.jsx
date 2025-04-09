import React, { useEffect } from "react";
import { useAuthContext } from "../../../context/AuthContext"; 
import { toast } from "sonner";

const Dashboard = () => {
  const { user, loadingAuth, Profile } = useAuthContext();

  useEffect(() => {
    if (!user?.bookings) {
      Profile(); 
    }
  }, [user, Profile]);

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user.username || "User"}</h1>

      
      {user.profilePicture && (
        <img src={user.profilePicture} alt="Profile" style={{ width: "100px", borderRadius: "50%" }} />
      )}

      
      <h2>Your Bookings</h2>
      {user.bookings?.length > 0 ? (
        <ul>
          {user.bookings.map((booking) => (
            <li key={booking._id}>
              Flight: {booking.flightId?.flightNumber || "N/A"} | Date: {new Date(booking.date).toLocaleDateString()} | Status: {booking.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

    
      <h2>Your Payments</h2>
      {user.payments?.length > 0 ? (
        <ul>
          {user.payments.map((payment) => (
            <li key={payment._id}>
              Amount: ${payment.amount} | Date: {new Date(payment.date).toLocaleDateString()} | Status: {payment.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No payments found.</p>
      )}
    </div>
  );
};

export default Dashboard;