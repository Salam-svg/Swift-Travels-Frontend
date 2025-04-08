import Lottie from "lottie-react";
import loginAnimation from "../../../assets/animations/LoginAnimations/Animation - 1742899444543.json";
import { authContext, useAuthContext } from "../../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loggingIn from "../../../assets/animations/SigninupAnimations/Interwind@1x-1.0s-200px-200px.json";

const Login = () => {
  const { login, LoggingIn } = useAuthContext();
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
      className="text-white flex justify-between h-130 bg-[rgb(21, 1, 39)] "
      style={{
        // backgroundColor: "rgb(21, 1, 39)",
        width: "97%",
        margin: "0 auto",
        borderRadius: "25px",
        marginTop: "5.3rem",
        color: "white",
      }}
    >
      <div>
        <Lottie
          animationData={loginAnimation}
          style={{ width: 350, borderRadius: 10 }}
        />
      </div>
      <div
        className="text-black font-bold font-Josefin px-6 content-center"
        style={{
          marginRight: "90px",
          lineHeight: "3rem",
          borderRadius: "0.9rem",
          marginTop: "-90px",
        }}
      >
        <form className="text-white" onSubmit={handleSubmit}>
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={formDates.email}
              onChange={handleInput}
              style={{
                border: "1px solid rgb(30, 79, 137)",
                backgroundColor: "rgb(30, 32, 37)",
                width: "315px",
                borderRadius: "5px",
                textAlign: "left",
                lineHeight: "50px",
                paddingLeft: "10px",
              }}
            />
          </div>
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <input
              className="outline-none w-80 my-20 text-white "
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
              }}
            />
            <span className="cursor-pointer" onClick={handleShowPass}>
              {passwordShown ? "Hide" : "Show"}
            </span>
          </div>
          <button className="cursor-pointer" type="submit" disabled={LoggingIn}>
            {LoggingIn ? (
              <span>
                <Lottie animationData={loggingIn} style={{ width: 30 }} />{" "}
              </span>
            ) : (
              <span
                className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
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
