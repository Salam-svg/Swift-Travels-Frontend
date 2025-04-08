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
      navigate("/Login");
    });
  };

  return (
    <div
      className="text-white flex justify-between h-130 bg-[rgb(21, 1, 39)]"
      style={{
        // backgroundColor: "rgb(21, 1, 39)",
        width: "97%",
        margin: "0 auto",
        borderRadius: "25px",
        marginTop: "8.3rem",
        color: "white",
        marginBottom: "130px",
      }}
    >
      <Lottie animationData={signup} />
      <div>
        <p></p>
      </div>

      <div
        className="text-black font-bold font-Josefin px-6 content-center"
        style={{
          marginRight: "40px",
          lineHeight: "3rem",
          borderRadius: "0.9rem",
        }}
      >
        <div className="text-white">
          <p className="text-3xl mb-10 ">Create an account 👋</p>
          <p>Kindly Fill in your details</p>
        </div>
        <form onSubmit={handleSubmit} className="text-white">
          <div
            className=" text-white"
            style={{
              borderRadius: "20px",
              width: "100%",
            }}
          >
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-[13px]"
                htmlFor="firstName"
              >
                FirstName*
              </label>
            </div>
            <input
              className="w-80 my-20 border-none outline-none"
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

          <div>
            <div>
              <label
                htmlFor="lastName"
                className="text-[rbg(105, 111, 121)] text-[13px]"
              >
                LastName*
              </label>
            </div>
            <input
              className="outline-none  w-80 my-20 "
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

          <div>
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-[13px]"
                htmlFor="email"
              >
                Email address*
              </label>
            </div>
            <input
              className="outline-none text-sm w-80 my-20 "
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

          <div>
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-[13px]"
                htmlFor="password"
              >
                Create Password*
              </label>
            </div>
            <input
              className="outline-none text-sm w-80 my-20 "
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
              }}
            />
            <span onClick={handleShowPass} className="cursor-pointer">
              {passwordShown ? "Hide" : "Show"}
            </span>
          </div>

          <div>
            <div>
              <label
                className="text-[rbg(105, 111, 121)] text-[13px]"
                htmlFor="nationality"
              >
                Your Nationality*
              </label>
            </div>
            <input
              className="outline-none w-80 my-20 "
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
                marginBottom: "10px",
              }}
            />
          </div>
          <button className="cursor-pointer" type="submit" disabled={signingUp}>
            {signingUp ? (
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
