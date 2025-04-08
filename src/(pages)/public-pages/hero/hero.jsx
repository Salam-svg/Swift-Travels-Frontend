import { Link } from "react-router-dom";
import "../../../styles/HeroSection.css";
import { useRef, useState } from "react";
import BounceCards from "../../../animations/BounceCards/BounceCards";

const Hero = () => {
  const heroStyle = {
    width: "86%",
    margin: "0 auto",
    paddingTop: "1.3rem",
    color: "white", //change to white for dark mode
    fontFamily: "MoonDance, sans-serif",
    marginTop: "3.3rem",
    height: "75vh",
    borderRadius: "0.9rem",
    paddingLeft: "1.3rem",
    position: "relative",
  };

  const images = [
    "https://images.pexels.com/photos/15463942/pexels-photo-15463942/free-photo-of-munkebu-cabin-in-moskenes-island-lofoten.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/14332493/pexels-photo-14332493.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/206359/pexels-photo-206359.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/4058519/pexels-photo-4058519.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/18294665/pexels-photo-18294665/free-photo-of-mosque-with-dome.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)",
  ];

  return (
    <div className="hero-body font-Josefin flex justify-between" style={heroStyle}>
      <div className="px-6">
        <p
          className="p-class font-Moon"
          style={{
            backgroundColor: "rgb(23, 44, 59)",
            borderRadius: "0.9rem",
            width: "25%",
            alignContent: "center",
            height: "40px ",
            marginBottom: "40px",
            paddingLeft: "1rem",
          }}
        >
          Know Before You Go
        </p>

        <p
          className="text-4xl font-Josefin font-bold bg-gradient-to-r from-purple-600 to-pink-500 hover:from-pink-500 hover:to-red-500 bg-clip-text text-transparent"
          style={{
            marginBottom: "20px",
          }}
        >
          EXPLORE THE WORLD WITH US
        </p>

        <p
          className="font-Josefin "
          style={{
            marginBottom: "90px",
          }}
        >
          Swift-Travels is your go-to platform for seamless trip planning.{" "}
          <br /> Book flights, hotels, and car rentals with ease, enjoy secure
          payments, <br /> and get 24/7 live support. Travel made simple—start
          your journey <br /> with Swift-Travels! ✈️🌍
        </p>
        <p></p>
        <button
          className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
          style={{
            backgroundColor: "rgb(105, 16, 87)",
            color: "#fff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          <Link
            className="font-Josefin  hover:from-purple-500 hover:to-blue-600 transition duration-300 ease-in-out 
            transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Discover Now
          </Link>
        </button>
      </div>
      <div className="Bounce-Cards">
        <BounceCards
          className="custom-bounceCards"
          images={images}
          containerWidth={350}
          containerHeight={250}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover={false}
        />
      </div>
    </div>
  );
};

export default Hero;
