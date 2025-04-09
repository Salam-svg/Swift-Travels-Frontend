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
    <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard" style={{ padding: "20px" }}>
      <h1>
        Welcome, {user.firstName} {user.lastName}
      </h1>
      <p>Email: {user.email}</p>
      <p>Nationality: {user.nationality}</p>
      <p>Travel Frequency: {user.travelFrequency}</p>

      {/* Profile Picture */}
      {user.profilePicture && (
        <img
          src={user.profilePicture}
          alt="Profile"
          style={{ width: "100px", borderRadius: "50%", margin: "10px 0" }}
        />
      )}

      {/* Bookings Section */}
      <h2>Your Flight Bookings</h2>
      {user.bookings?.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {user.bookings.map((booking) => (
            <li
              key={booking._id}
              style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0" }}
            >
              {/* Adjust fields based on your flightbookings model */}
              Flight ID: {booking.flightId?._id || "N/A"} | Booking Date:{" "}
              {booking.bookingDate
                ? new Date(booking.bookingDate).toLocaleDateString()
                : "N/A"}{" "}
              | Status: {booking.status || "Unknown"}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}

      {/* Payments Section */}
      <h2>Your Payments</h2>
      {user.payments?.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {user.payments.map((payment) => (
            <li
              key={payment._id}
              style={{ border: "1px solid #ccc", padding: "10px", margin: "5px 0" }}
            >
              {/* Adjust fields based on your payments model */}
              Amount: ${payment.amount || "N/A"} | Date:{" "}
              {payment.paymentDate
                ? new Date(payment.paymentDate).toLocaleDateString()
                : "N/A"}{" "}
              | Status: {payment.status || "Unknown"}
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
