import { useContext, useState } from "react";
import signup from "../../../assets/animations/signupAnimations/Animation - 1742897272457.json";
import Lottie from "lottie-react";
import loggingIn from "../../../assets/animations/SigninupAnimations/Interwind@1x-1.0s-200px-200px.json";
import { authContext, useAuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { Signup, signingUp } = useAuthContext();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);

  const navigate = useNavigate();

  const handleShowPass = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Signup(formData, () => {
      navigate("/login");
    });
  };

  return (
    <div
      className="text-white flex flex-col md:flex-row justify-between "
      style={{
        width: "95%",
        maxWidth: "1200px",
        margin: "4rem auto 5rem",
        borderRadius: "25px",
        color: "white",
      }}
    >
      <div className="w-full md:w-1/2 flex items-center justify-center" style={{
        marginBottom: "50px"
      }}>
        <Lottie animationData={signup} style={{ maxWidth: "100%" }} />
      </div>

      <div
        className="text-black font-bold font-Josefin px-4 md:px-6 w-full md:w-1/2 py-6"
        style={{
          lineHeight: "1.5rem",
          borderRadius: "0.9rem",
        }}
      >
        <div className="text-white">
          <p className="text-2xl md:text-3xl mb-4 md:mb-10">Create an account 👋</p>
          <p>Kindly Fill in your details</p>
        </div>
        <form onSubmit={handleSubmit} className="text-white">
          <div className="text-white mb-4">
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-xs md:text-[13px]"
                htmlFor="firstName"
              >
                FirstName*
              </label>
            </div>
            <input
              className="w-full border-none outline-none my-2"
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              required
              value={formData.firstName}
              onChange={handleInput}
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
              }}
            />
          </div>

          <div className="mb-4">
            <div>
              <label
                htmlFor="lastName"
                className="text-[rbg(105, 111, 121)] text-xs md:text-[13px]"
              >
                LastName*
              </label>
            </div>
            <input
              className="outline-none w-full my-2"
              type="text"
              id="lastName"
              placeholder="Doe"
              name="lastName"
              value={formData.lastName}
              required
              onChange={handleInput}
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
              }}
            />
          </div>

          <div className="mb-4">
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-xs md:text-[13px]"
                htmlFor="email"
              >
                Email address*
              </label>
            </div>
            <input
              className="outline-none text-sm w-full my-2"
              type="email"
              id="email"
              name="email"
              required
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleInput}
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
              }}
            />
          </div>

          <div className="mb-4">
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-xs md:text-[13px]"
                htmlFor="password"
              >
                Create Password*
              </label>
            </div>
            <div className="relative">
              <input
                className="outline-none text-sm w-full my-2"
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                required
                value={formData.password}
                onChange={handleInput}
                style={{
                  border: "1px solid rgb(30, 79, 137)",
                  backgroundColor: "rgb(30, 32, 37)",
                  borderRadius: "5px",
                  textAlign: "left",
                  lineHeight: "50px",
                  paddingLeft: "10px",
                  paddingRight: "50px",
                }}
              />
              <span 
                onClick={handleShowPass} 
                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {passwordShown ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-xs md:text-[13px]"
                htmlFor="nationality"
              >
                Your Nationality*
              </label>
            </div>
            <input
              className="outline-none w-full my-2"
              type="select"
              id="nationality"
              placeholder="Nigeria"
              name="nationality"
              required
              value={formData.nationality}
              onChange={handleInput}
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                marginBottom: "50px"
              }}
            />
          </div>
          <button 
            className="cursor-pointer w-full md:w-auto" 
            type="submit" 
            disabled={signingUp}
          >
            {signingUp ? (
              <span className="flex justify-center items-center">
                <Lottie animationData={loggingIn} style={{ width: 30 }} />
              </span>
            ) : (
              <span
                className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
                style={{
                  backgroundColor: "rgb(105, 16, 87)",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                }}
              >
                Register
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;