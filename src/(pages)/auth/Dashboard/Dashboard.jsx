import { useDashboardContext } from "../../../context/Dashboard";
import { useAuthContext } from "../../../context/AuthContext";
import { User, Plane, CreditCard, Upload } from "lucide-react";
import DashboardAnimations from "../../../assets/animations/DashboardAnimations/Animation - 1744403522281.json";
import Lottie from "lottie-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const {
    user,
    statistics,
    recentBookings,
    recentPayments,
    loading,
    uploadProfilePicture,
  } = useDashboardContext();
  const { deleteAccount, loadingAuth } = useAuthContext(); // Add loadingAuth
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    const date = new Date(isoString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(amount);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await deleteAccount(() => navigate("/"));
      } catch (error) {
        console.error("Delete account failed:", error);
      }
    }
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
        style={{ width: "95%", margin: "0 auto", marginTop: "30px" }}
      >
        <div
          className="md:col-span-1 bg-gray-800 rounded-xl p-8 border border-gray-700"
          style={{
            height: "fit-content",
            paddingLeft: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
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
                className="mx-auto mb-6 border-2"
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
            <p>
              <span className="text-gray-400">Status: </span>
              <span className="text-white">
                {user?.isActive ? "Active" : "Inactive"}
              </span>
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
                  style={{ width: "120px" }}
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
                  Upload
                </button>
              </div>
            </div>
            <div
              style={{
                marginTop: "20px",
                width: "8rem",
                textAlign: "center",
                height: "2rem",
                borderRadius: "20px",
                paddingTop: ".2rem",
              }}
            >
              <button
                onClick={handleDeleteAccount}
                disabled={loadingAuth}
                className={`w-full h-full rounded-md ${
                  loadingAuth
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                } text-white transition-colors duration-300`}
                aria-label={loadingAuth ? "Deleting account" : "Delete account"}
              >
                {loadingAuth ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 gap-8">
          <div
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            style={{
              paddingLeft: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <h2 className="text-lg font-semibold text-blue-400 flex items-center mb-4">
              <User className="mr-2 h-5 w-5" />
              Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-gray-400">
                Total Bookings:{" "}
                <span className="text-white">{statistics.totalBookings}</span>
              </p>
              <p className="text-gray-400">
                Confirmed Bookings:{" "}
                <span className="text-white">
                  {statistics.confirmedBookings}
                </span>
              </p>
              <p className="text-gray-400">
                Total Spent:{" "}
                <span className="text-white">
                  {formatCurrency(statistics.totalSpent, "USD")}
                </span>
              </p>
              <p className="text-gray-400">
                Pending Payments:{" "}
                <span className="text-white">{statistics.pendingPayments}</span>
              </p>
            </div>
          </div>

          {/* Bookings Section */}
          <div
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            style={{
              paddingLeft: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <h2 className="text-lg font-semibold text-blue-400 flex items-center mb-4">
              <Plane className="mr-2 h-5 w-5" />
              Recent Bookings
            </h2>
            {recentBookings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-200">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                      <th className="px-4 py-2">Reference</th>
                      <th className="px-4 py-2">Destination</th>
                      <th className="px-4 py-2">Departure</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr
                        key={booking.bookingReference}
                        className="border-b border-gray-700"
                      >
                        <td className="px-4 py-2">
                          {booking.bookingReference}
                        </td>
                        <td className="px-4 py-2">{booking.destination}</td>
                        <td className="px-4 py-2">
                          {formatDate(booking.departureDate)}
                        </td>
                        <td className="px-4 py-2">
                          {formatCurrency(booking.totalPrice, booking.currency)}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {booking.status}
                        </td>
                        <td className="px-4 py-2">
                          {formatDate(booking.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 mt-3 text-sm">No bookings found.</p>
            )}
          </div>

          {/* Payments Section */}
          <div
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            style={{
              paddingLeft: "20px",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <h2 className="text-lg font-semibold text-blue-400 flex items-center mb-4">
              <CreditCard className="mr-2 h-5 w-5" />
              Recent Payments
            </h2>
            {recentPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-200">
                  <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                    <tr>
                      <th className="px-4 py-2">Payment ID</th>
                      <th className="px-4 py-2">Amount</th>
                      <th className="px-4 py-2">Method</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Booking Ref</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayments.map((payment) => (
                      <tr
                        key={payment.paymentId}
                        className="border-b border-gray-700"
                      >
                        <td className="px-4 py-2">{payment.paymentId}</td>
                        <td className="px-4 py-2">
                          {formatCurrency(payment.amount, payment.currency)}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {payment.method.replace("_", " ")}
                        </td>
                        <td className="px-4 py-2 capitalize">
                          {payment.status}
                        </td>
                        <td className="px-4 py-2">
                          {formatDate(payment.paymentDate)}
                        </td>
                        <td className="px-4 py-2">
                          {payment.bookingReference || "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
