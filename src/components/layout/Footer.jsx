import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaLocationDot,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" bg-[#101828]    font-Josefin" style={{
      paddingBottom: "70px"
    }}>
      <div  className="flex bg-[#101828] items-center font-Josefin"
      style={{
        paddingLeft: "150px",
        gap: "9rem",
        alignItems: "flex-start",
        paddingTop: "60px",
        paddingBottom: "100px",
      }}>
        <div>
          <h1
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 bg-clip-text text-transparent  font-bold cursor-pointer"
            style={{
              marginBottom: "30px",
              fontSize: "30px",
            }}
          >
            SWIFT-TRAVELS
          </h1>
          <p
            style={{
              marginBottom: "30px",
              fontSize: "12px",
            }}
          >
            At SWIFT-TRAVELS, we make your flight <br /> booking experience
            seamless and <br />
            convenient. Discover the world with just <br /> a few clicks
          </p>
          <div style={{ display: "flex", gap: "10px", fontSize: "24px" }}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
        <div>
          <h1
            style={{
              marginBottom: "14px",
              fontSize: "15px",
            }}
          >
            Helpful Links
          </h1>
          <div
            style={{
              width: "180px",
              height: "3px",
              backgroundColor: "#691057",
              marginBottom: "30px",
            }}
          ></div>
          <div>
            <ul
              style={{
                fontSize: "13px",
              }}
            >
              <li>Home</li>
              <li>About us</li>
              <li>Search Flights</li>
              <li>FAQs</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Contact us</li>
            </ul>
          </div>
        </div>
        <div>
          <h1
            style={{
              marginBottom: "14px",
              fontSize: "15px",
            }}
          >
            Reach Us
          </h1>
          <div
            style={{
              width: "180px",
              height: "3px",
              backgroundColor: "#691057",
              marginBottom: "30px",
            }}
          ></div>
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
      </div>
      <div
      style={{
        width: "80%",
        height: "3px",
        background: "linear-gradient(to right, #2196F3, #3e246b)",
        margin: "auto"
      }}
      ></div>
      <p style={{
        paddingLeft: "125px",
        paddingTop: "50px",
        color: "rgb(75, 78, 82)"
      }}>© 2025 SWIFT-TRAVELS, All Rights Reserved</p>
    </div>
  );
};

export default Footer;
