// components/Dashboard.jsx
import { useAuthContext } from "../../../context/AuthContext";
import { useDashboardContext } from "../../../context/Dashboard";
import {
  
  User,
  Plane,
  CreditCard,
  Upload,
} from "lucide-react";
import DashboardAnimations from "../../../assets/animations/DashboardAnimations/Animation - 1744403522281.json";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useState } from "react";

const Dashboard = () => {
  const {
    user,
    statistics,
    recentBookings,
    recentPayments,
    loading,
    uploadProfilePicture,
  } = useDashboardContext();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    await uploadProfilePicture(selectedFile);
    setSelectedFile(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Lottie animationData={DashboardAnimations} />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-200 font-Josefin w-full max-w-screen-2xl mx-auto">
      <div
        className="p-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8"
        style={{
          width: "95%",
          margin: "0 auto",
          marginTop: "30px",
        }}
      >
        <div
          className="md:col-span-1 bg-gray-800 rounded-xl p-8 border border-gray-700 "
          style={{
            height: "300px",
            paddingLeft: "20px",
            paddingTop: "20px",
          }}
        >
          <h2 className="text-lg font-semibold text-blue-400 flex items-center mb-4">
            <User className="mr-2 h-5 w-5" />
            Profile
          </h2>
          <div className="space-y-3">
            {user?.profilePicture && (
              <img
                src={user.profilePicture}
                alt="Profile"
                className=" mx-auto mb-6 border-2 "
                style={{
                  width: "7rem",
                  height: "7rem",
                  borderRadius: "30rem",
                  objectFit: "cover",
                  
                }}
              />
            )}
            <p>
              <span className="text-gray-400">Username: </span>
              <span className="text-white">{user?.name || "N/A"}</span>
            </p>
            <p>
              <span className="text-gray-400">Email: </span>
              <span className="text-white">{user?.email || "N/A"}</span>
            </p>
            <div className="mt-4">
              <label
                htmlFor="profilePicture"
                className="block text-gray-400 text-sm mb-2"
              >
                Update Profile Picture
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="profilePicture"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  style={{
                    width: "120px"
                  }}
                />
                <button
                  onClick={handleUpload}
                  disabled={!selectedFile}
                  className={`p-2 rounded-md flex items-center cursor-pointer ${
                    selectedFile
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-600 cursor-not-allowed"
                  } text-white transition-colors duration-300`}
                 
                >
                  <Upload className="h-5 w-5 mr-2" />
                  
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 h-full">
            <h2 className="text-lg font-semibold text-blue-400 flex items-center mb-4">
              <Plane className="mr-2 h-5 w-5" />
              Bookings
            </h2>
            <p className="text-gray-400">
              Total Bookings:{" "}
              <span className="text-white">{statistics.totalBookings}</span>
            </p>
            {recentBookings.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {recentBookings.map((booking) => (
                  <li
                    key={booking.bookingReference}
                    className="text-white text-sm"
                  >
                    {booking.destination} - {formatDate(booking.departureDate)}{" "}
                    - {booking.currency} {booking.totalPrice} ({booking.status})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-3 text-sm">No bookings found.</p>
            )}
          </div>

          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 h-full">
            <h2 className="text-lg font-semibold text-blue-400 flex items-center mb-4">
              <CreditCard className="mr-2 h-5 w-5" />
              Payments
            </h2>
            <p className="text-gray-400">
              Total Payments:{" "}
              <span className="text-white">{recentPayments.length}</span>
            </p>
            {recentPayments.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {recentPayments.map((payment) => (
                  <li key={payment.paymentId} className="text-white text-sm">
                    {payment.currency} {payment.amount} -{" "}
                    {formatDate(payment.paymentDate)} - {payment.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 mt-3 text-sm">No payments found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
