import React from "react";
import "./Connect.css";
import {
  FaPhone,
  FaEnvelope,
  FaClock,
  FaLocationDot,
} from "react-icons/fa6";

const Connect = () => {
  return (
    <div
      className="flex flex-col md:flex-row font-Josefin"
      style={{
        width: "90%",
        margin: "auto",
        marginTop: "40px",
        marginBottom: "100px",
        gap: "1.5rem",
        backgroundColor: "rgb(16, 24, 40)",
        padding: "40px 20px",
        borderRadius: "2rem",
        maxWidth: "1200px"
      }}
    >
      <div 
        className="background-contact w-full md:w-1/2 p-4 md:p-6"
        style={{
          color: "#fff"
        }}
      >
        <p className="pb-4 md:pb-5 text-white">REACH OUT TODAY</p>
        <h1 className="text-xl md:text-2xl lg:text-3xl pb-6 md:pb-8">CONTACT INFORMATION</h1>
        <div
          className="flex flex-col gap-4 text-sm md:text-base"
        >
          <p className="flex items-center gap-2">
            <FaPhone /> +234 704 468 6995
          </p>
          <p className="flex items-center gap-2">
            <FaEnvelope /> olaleyesalam37@gmail.com
          </p>
          <p className="flex items-center gap-2">
            <FaClock /> Mon-Fri: 9AM - 6PM
          </p>
          <p className="flex items-center gap-2">
            <FaLocationDot /> 123 Main St, City, Country
          </p>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 p-4">
        <form className="w-full">
          <div className="mb-4">
            <div>
              <label htmlFor="name" className="block mb-2">Your Full Name</label>
            </div>
            <input
              type="text"
              id="name"
              className="outline-none w-full"
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                color: "white"
              }}
            />
          </div>
          
          <div className="mb-4">
            <div>
              <label htmlFor="email" className="block mb-2">Your Email Address</label>
            </div>
            <input
              type="email"
              id="email"
              className="outline-none w-full"
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                color: "white"
              }}
            />
          </div>
          
          <div className="mb-4">
            <div>
              <label htmlFor="number" className="block mb-2">Contact Number</label>
            </div>
            <input
              type="number"
              id="number"
              className="outline-none w-full"
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                color: "white" 
              }}
            />
          </div>
          
          <div className="mb-6">
            <div>
              <label htmlFor="message" className="block mb-2">Your Message</label>
            </div>
            <textarea
              name="message"
              id="message"
              rows="4"
              className="outline-none w-full p-2"
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                paddingLeft: "10px",
                color: "white"
              }}
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className="px-6 py-3 hover:bg-opacity-90 transition-all"
            style={{
              backgroundColor: "rgb(105, 16, 87)",
              color: "#fff",
              borderRadius: "0.5rem",
              border: "none",
            }}
          >
            SEND INQUIRY
          </button>
        </form>
      </div>
    </div>
  );
};

export default Connect;