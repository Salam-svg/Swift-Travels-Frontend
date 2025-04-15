import { useEffect, useState } from "react";
import { useFlightContext } from "../../../context/SearchFlights";
import { useAuthContext } from "../../../context/AuthContext";
import { User, PlusCircle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { className } from "@babylonjs/core";

const FlightBookingForm = () => {
  const {  bookFlights, selectedFlight, loading } =
    useFlightContext();
  const { user } = useAuthContext();

  useEffect(() => {

    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    userId: user?._id || "",
    travelers: [
      {
        firstName: "",
        lastName: "",
        email: "",
        passportNumber: "",
        travelerId: "",
        travelerType: "ADULT",
        fareOption: "STANDARD",
        cabinClass: "ECONOMY",
        fareBasis: "",
        brandedFare: "",
        checkedBags: 1,
        cabinBags: 1,
      },
    ],
  });

  const navigate = useNavigate();

  const handleChange = (e, index = 0) => {
    const { name, value } = e.target;
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [name]: value };
    setFormData({ ...formData, travelers: updatedTravelers });
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  const addTraveler = () => {
    setFormData({
      ...formData,
      travelers: [
        ...formData.travelers,
        {
          firstName: "",
          lastName: "",
          email: "",
          passportNumber: "",
          travelerId: "",
          travelerType: "ADULT",
          fareOption: "STANDARD",
          cabinClass: "ECONOMY",
          fareBasis: "",
          brandedFare: "",
          checkedBags: 1,
          cabinBags: 1,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFlight?.rawFlightData) {
      toast.error("Invalid flight data. Please search again.");
      return;
    }

    // if (!selectedFlight?.price?.total || isNaN(selectedFlight.price.total)) {
    //   toast.error("Invalid flight price");
    //   return;
    // }\

    if (!user || !user._id) {
      toast.error("User not logged in. Please sign in first.");
      return;
    }

    const bookingData = {
      user: user._id,
      flightOffer: selectedFlight.rawFlightData,
      travelers: formData.travelers,
    };

    console.log(bookingData.user._id);
    

    console.log("Final Booking Data:", JSON.stringify(bookingData, null, 2));

    try {
      await bookFlights(bookingData);
      navigate("/bookingResult");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, userId: user?._id }));
    }
  }, []);

  return (
    <div className="min-h-screen font-Josefin flex items-center justify-center p-4 group rounded-2xl overflow-hidden">
    <div
      className="bg-gray-800 shadow-2xl overflow-hidden inset-[-2px] bg-gradient-to-r from-blue-500 to-purple-500 
                  group-hover:from-purple-500 group-hover:to-pink-500 
                  animate-border-flow rounded-3xl 
                  group-hover:opacity-100"
      style={{
        width: "100%", // Adjust width for mobile
        maxWidth: "700px", // Limit max width for larger screens
        margin: "0 auto", // Center the form
        paddingTop: "20px", // Reduce padding for mobile
        paddingBottom: "20px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div
        className="p-6 flex items-center"
        style={{
          background: "linear-gradient(to right, #2196F3, #3e246b)",
          height: "50px", // Reduce height for mobile
          textAlign: "center",
          borderRadius: "5rem",
        }}
      >
        <h2
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 bg-clip-text text-transparent text-9xl"
          style={{
            textAlign: "center",
            fontSize: "20px", // Reduce font size for mobile
          }}
        >
          Flight Booking
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div className="mb-4">
          <label
            htmlFor="userId"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            <User className="inline-block mr-2 w-5 h-5 text-gray-500" />
            User ID
          </label>
          <input
            type="text"
            id="userId"
            name="userId"
            value={formData.userId}
            disabled
            className="outline-none w-full" // Make input full width
            style={{
              border: "1px solid rgb(30, 79, 137)",
              backgroundColor: "rgb(30, 32, 37)",
              borderRadius: "5px",
              textAlign: "left",
              lineHeight: "40px", // Reduce line height for mobile
              paddingLeft: "10px",
              marginBottom: "10px",
            }}
            required
          />
        </div>
        {formData.travelers.map((traveler, index) => (
          <div
            key={index}
            className="bg-gray-700 border border-gray-600 rounded-lg p-4 space-y-4 shadow-sm"
            style={{
              paddingTop: "20px", // Reduce padding for mobile
              paddingBottom: "20px",
              paddingLeft: "10px",
              paddingRight: "10px",
              marginBottom: "20px", // Reduce margin for mobile
            }}
          >
            <h3 className="text-lg font-semibold text-gray-200 mb-4">
              Traveler {index + 1}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2"> {/* Stack inputs on mobile */}
              <div>
                <label
                  htmlFor={`firstName-${index}`}
                  className="text-[rbg(105, 111, 121)] text-[13px]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id={`firstName-${index}`}
                  name="firstName"
                  placeholder="First Name"
                  value={traveler.firstName}
                  onChange={(e) => handleChange(e, index)}
                  className="outline-none w-full" // Make input full width
                  style={{
                    border: "1px solid rgb(30, 79, 137)",
                    backgroundColor: "rgb(30, 32, 37)",
                    borderRadius: "5px",
                    textAlign: "left",
                    lineHeight: "40px", // Reduce line height for mobile
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`lastName-${index}`}
                  className="text-[rbg(105, 111, 121)] text-[13px]"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id={`lastName-${index}`}
                  name="lastName"
                  placeholder="Last Name"
                  value={traveler.lastName}
                  onChange={(e) => handleChange(e, index)}
                  className="outline-none w-full" // Make input full width
                  style={{
                    border: "1px solid rgb(30, 79, 137)",
                    backgroundColor: "rgb(30, 32, 37)",
                    borderRadius: "5px",
                    textAlign: "left",
                    lineHeight: "40px", // Reduce line height for mobile
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2"> {/* Stack inputs on mobile */}
              <div>
                <label
                  htmlFor={`email-${index}`}
                  className="text-[rbg(105, 111, 121)] text-[13px]"
                >
                  Email
                </label>
                <input
                  type="email"
                  id={`email-${index}`}
                  name="email"
                  placeholder="Email Address"
                  value={traveler.email}
                  onChange={(e) => handleChange(e, index)}
                  className="outline-none w-full" // Make input full width
                  style={{
                    border: "1px solid rgb(30, 79, 137)",
                    backgroundColor: "rgb(30, 32, 37)",
                    borderRadius: "5px",
                    textAlign: "left",
                    lineHeight: "40px", // Reduce line height for mobile
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor={`passportNumber-${index}`}
                  className="text-[rbg(105, 111, 121)] text-[13px]"
                >
                  Passport Number
                </label>
                <input
                  type="text"
                  id={`passportNumber-${index}`}
                  name="passportNumber"
                  placeholder="Passport Number"
                  value={traveler.passportNumber}
                  onChange={(e) => handleChange(e, index)}
                  className="outline-none w-full" // Make input full width
                  style={{
                    border: "1px solid rgb(30, 79, 137)",
                    backgroundColor: "rgb(30, 32, 37)",
                    borderRadius: "5px",
                    textAlign: "left",
                    lineHeight: "40px", // Reduce line height for mobile
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor={`travelerType-${index}`}
                className="block text-[rbg(105, 111, 121)] text-[13px]"
              >
                Traveler Type
              </label>
              <select
                id={`travelerType-${index}`}
                name="travelerType"
                value={traveler.travelerType}
                onChange={(e) => handleChange(e, index)}
                className="outline-none w-full" // Make select full width
                style={{
                  border: "1px solid rgb(30, 79, 137)",
                  backgroundColor: "rgb(30, 32, 37)",
                  borderRadius: "5px",
                  textAlign: "left",
                  lineHeight: "40px", // Reduce line height for mobile
                  paddingLeft: "10px",
                  paddingBottom: "10px",
                  marginBottom: "5px",
                }}
              >
                <option value="ADULT" className="bg-gray-800">
                  Adult
                </option>
                <option value="CHILD" className="bg-gray-800">
                  Child
                </option>
                <option value="INFANT" className="bg-gray-800">
                  Infant
                </option>
              </select>
            </div>
          </div>
        ))}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <button
            type="button"
            onClick={addTraveler}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 w-full md:w-auto mb-4 md:mb-0"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add Another Traveler</span>
          </button>
          <button
            type="submit"
            className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
            style={{
              backgroundColor: "rgb(105, 16, 87)",
              color: "#fff",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ?  "Booking Flights..." : "Book Flight"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default FlightBookingForm;
