import { useEffect, useState, useRef } from "react";
import {  Routes, Route } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/layout/Navbar";
import Login from "./(pages)/auth/Login/Login";
import Signup from "./(pages)/auth/Signup/Signup";
import Home from "./(pages)/public-pages/home/Home";
import { Toaster } from "sonner";
import AuthProvider from "./context/AuthContext";
import FlightSearchForm from "./(pages)/public-pages/searchFlights/Search";
import FlightProvider from "./context/SearchFlights";
import Notfound from "./components/layout/Notfound";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./context/SmoothScroll"
import FlightResults from "./(pages)/public-pages/FlightsResults/FlightsResults";
import BookFlights from "./(pages)/public-pages/BookFlights/BookFlights";
import PaymentForm from "./(pages)/public-pages/PayForFlight/PayForFlight";
import BookingResult from "./(pages)/public-pages/BookingResult/BookingResult";
import PaymentResult from "./(pages)/public-pages/PaymentResults/PaymentResult";
import Dashboard from "./(pages)/private-pages/Profile/Profile";


gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);


  useEffect(() => {

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);


  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 bg-clip-text text-transparent text-4xl font-bold cursor-pointer">
            SWIFT-TRAVELS
          </h1>
          <div className="w-64 h-px bg-gray-800 mx-auto relative">
            <div
              className="h-px bg-purple-500 absolute top-0 left-0 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div >
        
        <AuthProvider>
          <FlightProvider>
            <Navbar />
            <Toaster
              position="top-left"
              richColors
              visibleToasts={1}
              theme="dark"
              toastOptions={{
                style: {
                  background: "#18181B",
                  color: "#E4E4E7",
                  border: "1px solid #27272A",
                  padding: "12px",
                  borderRadius: "8px",
                },
                duration: 4000,
                success: {
                  style: {
                    background: "#16A34A",
                    color: "#fff",
                  },
                },
                error: {
                  style: {
                    background: "#DC2626",
                    color: "#fff",
                  },
                },
                warning: {
                  style: {
                    background: "#D97706",
                    color: "#fff",
                  },
                },
                info: {
                  style: {
                    background: "#2563EB",
                    color: "#fff",
                  },
                },
              }}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile/dashboard" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/searchFlights" element={<FlightSearchForm />} />
              <Route path="/flightsResults" element={<FlightResults />} />
              <Route path="/bookFlights" element={<BookFlights />} />
              <Route path="/flightsPayment" element={< PaymentForm />}/>
              <Route path="/bookingResult" element={< BookingResult />}/>
              <Route path="/paymentResult" element={ < PaymentResult />}/>

              <Route path="*" element={<Notfound />} />
            </Routes>
            <Footer />
          </FlightProvider>
        </AuthProvider>


    </div>
  );
};

export default App;
