import Lottie from "lottie-react";
import loginAnimation from "../../../assets/animations/LoginAnimations/Animation - 1742899444543.json";
import { authContext, useAuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loggingIn from "../../../assets/animations/SigninupAnimations/Interwind@1x-1.0s-200px-200px.json";

const Login = () => {
  const { login, LoggingIn, loadingAuth } = useAuthContext();
  const [formDates, setFormDates] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formDates, () => {
      navigate("/");
    });
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const handleShowPass = () => {
    setPasswordShown((prev) => !prev);
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormDates((prev) => ({ ...prev, [name]: value }));
    console.log(formDates);
  };

  return (
    <div
      className="text-white flex flex-col md:flex-row justify-between "
      style={{
        width: "95%",
        maxWidth: "1200px",
        margin: "3rem auto 5rem",
        borderRadius: "25px",
        color: "white",
      }}
    >
      <div className="w-full md:w-1/2 flex items-center justify-center" style={{
        marginBottom: "150px"
      }}>
        <Lottie
          animationData={loginAnimation}
          style={{ maxWidth: "100%", borderRadius: 10 }}
        />
      </div>
      <div
        className="text-black font-bold font-Josefin px-4 md:px-6 w-full md:w-1/2 py-6 flex items-center"
        style={{
          borderRadius: "0.9rem",
        }}
      >
        <form className="text-white w-full" onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formDates.email}
              onChange={handleInput}
              className="w-full outline-none"
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
          <div className="mb-6 relative">
            <input
              className="outline-none w-full text-white"
              type={passwordShown ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formDates.password}
              onChange={handleInput}
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
                paddingRight: "50px",
                marginBottom: "50px"
              }}
            />
            <span 
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2" 
              onClick={handleShowPass}
            >
              {passwordShown ? "Hide" : "Show"}
            </span>
          </div>
          <button 
            className="cursor-pointer w-full md:w-auto" 
            type="submit" 
            disabled={loadingAuth}
          >
            {loadingAuth ? (
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
                Log In
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;