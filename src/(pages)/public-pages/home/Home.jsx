import React from "react";
import Hero from "../hero/hero";
import Services from "../services/services";

import Partners from "../Partners/Partners";
import FlightSearchForm from "../searchFlights/Search";
import TravelBanner from "../TravelBanner/TravelBanner";
import Connect from "../Connect/Connect";
import TravelDarkMode from "../AboutUs/AboutUs";





const Home = () => {
  return (
    <div data-scroll-section id="home-section">
      <Hero />
      <FlightSearchForm />
      <TravelDarkMode/>
      <Services />
      <Partners />
      <TravelBanner/>
      <Connect/>
  
    </div>
  );
};

export default Home;
