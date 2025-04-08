import { useEffect, useState } from "react";
import { useFlightContext } from "../../../context/SearchFlights";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const { makePayment, selectedBooking, loading } = useFlightContext();
  const location = useLocation();

  const { bookingId, amount, currency } = location.state || {};

  const navigate = useNavigate()

    useEffect(() => {
  
      window.scrollTo(0, 0);
    }, []);
  
  const [paymentData, setPaymentData] = useState({
    bookingId: bookingId || selectedBooking?._id || "",
    method: "credit_card",
    cardLast4: "",
    cardBrand: "",
    amount: amount || selectedBooking?.flightOffer?.price?.total || 0,
    currency: currency || selectedBooking?.flightOffer?.price?.currency || "USD"
  });

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };



  const handlePayment = (e) => {
    e.preventDefault();
    makePayment(paymentData);
    navigate("/paymentResult")
  };

  const isFormValid = () => {
    return (
      paymentData.bookingId &&
      paymentData.method &&
      paymentData.cardLast4.length === 4 &&
      paymentData.cardBrand.trim() !== ''
    );
  };
  return (
    <div className="min-h-screen flex items-center font-Josefin justify-center  p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl overflow-hidden" 
              style={{
                border: "2px solid red",
                width: "70%",
                height: "50%",
                paddingTop: "50px",
                paddingLeft: "50px",
                paddingBottom: "50px",
                paddingRight: "50px",
                marginTop: "90px",
                marginBottom: "100px"
              }}
      >
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-6" 
         style={{
            background: "linear-gradient(to right, #2196F3, #3e246b)",
            height: "30px",
            textAlign: "center",
            paddingTop: "5px",
            borderRadius: "5rem",
            marginBottom: "1.7rem",
          }}>
          <h2  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 bg-clip-text text-transparent text-9xl pt-10px">
            Payment Details
          </h2>
        </div>
        
        <form onSubmit={handlePayment} className="p-6 space-y-6">
          <div>
            <label 
              htmlFor="method" 
              className="text-[rbg(105, 111, 121)] text-[13px]"
            >
              Payment Method**
            </label>
            <div className="relative">
              <select 
                id="method"
                name="method" 
                onChange={handleChange} 
                value={paymentData.method}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
                style={{
                    border: "1px solid rgb(30, 79, 137)",
                    backgroundColor: "rgb(30, 32, 37)",
                    borderRadius: "5px",
                    textAlign: "left",
                    lineHeight: "50px",
                    paddingLeft: "10px",
                    marginBottom: "10px",
                  }}
              >
                <option value="credit_card" className="bg-gray-800">Credit Card</option>
                <option value="debit_card" className="bg-gray-800">Debit Card</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label 
              htmlFor="cardLast4" 
              className="text-[rbg(105, 111, 121)] text-[13px]"
            >
              Card Last 4 Digits**
            </label>
            <input
              type="text"
              id="cardLast4"
              name="cardLast4"
              maxLength="4"
              placeholder="Enter last 4 digits"
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 tracking-wider"
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                marginBottom: "10px",
              }}
            />
          </div>
          <div>
            <label 
              htmlFor="cardBrand" 
              className="text-[rbg(105, 111, 121)] text-[13px]"
            >
              Card Brand**
            </label>
            <input
              type="text"
              id="cardBrand"
              name="cardBrand"
              placeholder="Visa, Mastercard, etc."
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                marginBottom: "10px",
              }}
            />
          </div>
          <div className="bg-gray-700 p-3 rounded-lg mb-6"
          style={{
            marginTop: "10px",
            marginBottom: "10px"
          }}
          >
            <p className="text-white">
              Amount to Pay: {currency} {amount?.toFixed(2)}
            </p>
          </div>

          <button 
            type="submit" 
            disabled={!isFormValid()}
            className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
            
            style={{
                backgroundColor: "rgb(105, 16, 87)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
                marginTop : "20px",
                marginBottom: "2rem",
                marginLeft: "70px"
              }}
          >
            {loading ? "Paying For Flight..." : "Pay & Confirm Booking"}
          </button>
        </form>

        <div className="bg-gray-700 p-4 text-center">
          <p className="text-sm text-gray-400" 
            
          >
            Secure payment powered by our trusted payment gateway
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;


