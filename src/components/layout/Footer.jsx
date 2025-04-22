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
    <div
      className="bg-[#101828] font-Josefin py-12 px-4 md:px-8 lg:pb-16"
      style={{
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <div
        className="flex flex-col md:flex-row items-start justify-between max-w-7xl mx-auto gap-12 md:gap-16 lg:gap-20 mb-16"
        style={{
          marginTop: "20px",
        }}
      >
        <div
          className="w-full md:w-1/3 mb-12 md:mb-0"
          style={{
            width: "90%",
            margin: "0 auto",
            paddingLeft: "70px"
          }}
        >
          <h1
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 bg-clip-text text-transparent font-bold text-2xl md:text-3xl mb-8 cursor-pointer"
            style={{
              fontSize: "24px",
            }}
          >
            SWIFT-TRAVELS
          </h1>
          <p
            className="text-gray-300 text-sm mb-8"
            style={{
              lineHeight: "1.6",
            }}
          >
            At SWIFT-TRAVELS, we make your flight booking experience seamless
            and convenient. Discover the world with just a few clicks.
          </p>
          <div className="flex gap-6 text-xl text-gray-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>

        <div
          className="w-full md:w-1/4 mb-12 md:mb-0"
          style={{
            width: "90%",
            margin: "0 auto",
          }}
        >
          <h1
            className="text-white text-base font-medium mb-6"
            style={{
              fontSize: "18px",
            }}
          >
            Helpful Links
          </h1>
          <div
            className="w-24 h-1 bg-[#691057] mb-8"
            style={{
              marginBottom: "20px",
            }}
          ></div>
          <ul className="text-gray-300 text-sm space-y-4">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">About us</li>
            <li className="hover:text-white cursor-pointer">Search Flights</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">
              Terms & Conditions
            </li>
            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
            <li className="hover:text-white cursor-pointer">Contact us</li>
          </ul>
        </div>

        <div
          className="w-full md:w-1/3"
          style={{
            width: "90%",
            margin: "0 auto",
          }}
        >
          <h1
            className="text-white text-base font-medium mb-6"
            style={{
              fontSize: "18px",
            }}
          >
            Reach Us
          </h1>
          <div
            className="w-24 h-1 bg-[#691057] mb-8"
            style={{
              marginBottom: "20px",
            }}
          ></div>
          <div className="flex flex-col gap-4 text-sm text-gray-300">
            <p className="flex items-center gap-3">
              <FaPhone className="text-gray-400" /> +234 704 468 6995
            </p>
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-gray-400" /> olaleyesalam37@gmail.com
            </p>
            <p className="flex items-center gap-3">
              <FaClock className="text-gray-400" /> Mon-Fri: 9AM - 6PM
            </p>
            <p className="flex items-center gap-3">
              <FaLocationDot className="text-gray-400" /> 123 Main St, City,
              Country
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-11/12 h-px bg-gradient-to-r from-blue-500 to-purple-800 mx-auto mt-12"
        style={{
          width: "90%",
          margin: "0 auto",
          marginTop: "20px"
        }}
      ></div>

      <div
        className="text-center md:text-left md:pl-4 lg:pl-8 pt-8 text-gray-500 text-sm"
        style={{
          paddingTop: "30px",
          paddingLeft: "90px"
        }}
      >
        © 2025 SWIFT-TRAVELS, All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
