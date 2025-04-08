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
      className="flex font-Josefin"
      style={{
        width: "80%",
        height: "60%",
        margin: "auto",
        marginTop: "60px",
        marginBottom: "200px",
        gap: "2rem",
        backgroundColor: "rgb(16, 24, 40)",
        paddingTop: "90px",
        paddingLeft: "150px",
        paddingBottom: "110px",
        borderRadius: "5rem"
      }}
    >
      <div className="background-contact" 
      style={{
        paddingTop: "20px",
        paddingLeft: "30px",
        color: "#fff"
      }}>
        <p style={{
            paddingBottom: "20px",
            color: "#fff"
        }}>REACH OUT TODAY</p>
        <h1 style={{
            paddingBottom:"40px"
        }}>CONTACT INFORMATION</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "15px",
          }}
        >
          <p className="flex items-center">
            <FaPhone /> +234 704 468 6995
          </p>
          <p className="flex items-center">
            <FaEnvelope /> olaleyesalam37@gmail.com
          </p>
          <p className="flex items-center">
            <FaClock /> Mon-Fri: 9AM - 6PM
          </p>
          <p className="flex items-center ">
            <FaLocationDot /> 123 Main St, City, Country
          </p>
        </div>
      </div>
      <div>
        <form>
          <div className="">
            <div>
              <label htmlFor="name">Your Full Name</label>
            </div>
            <input
              type="text"
              className="outline-none w-80 my-20 "
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
            <div>
              <label htmlFor="email">Your Email Address</label>
            </div>
            <input
              type="email"
              className="outline-none w-80 my-20 "
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
            <div>
              <label htmlFor="number">Contact Number</label>
            </div>
            <input
              type="number"
              className="outline-none w-80 my-20 "
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
            <div>
              <label htmlFor="message">Your Message</label>
            </div>
            <textarea
              name="message"
              id="message"
              className="outline-none w-80 my-20 "
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                marginBottom: "10px",
              }}
            ></textarea>
          </div>
          <button type="submit" style={{
                backgroundColor: "rgb(105, 16, 87)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
            
              }}>SEND INQUIRY</button>
        </form>
      </div>
    </div>
  );
};

export default Connect;
