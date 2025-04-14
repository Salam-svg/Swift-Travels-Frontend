import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useProfilePicContext } from "../../context/ProfilePicContext";
import "../../styles/Navbar.css";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuthContext();
  const { profilePic, getProfilePic } = useProfilePicContext();
  console.log("profilePic context:", profilePic);


  useEffect(() => {
    if (user) {
      getProfilePic();
    }
  }, [user]);
  return (
    <div
      className="navbar-Div flex justify-between items-center font-Josefin text-white shadow-lg "
      style={{
        width: "90%",
        margin: "auto",

        zIndex: 10000,
        marginTop: "20px",
      }}
    >
      <div className="text-xl font-Josefin ">
        <h1 className="logo-Tag bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 bg-clip-text text-transparent text-4xl font-bold cursor-pointer">
          <Link to="/">SWIFT-TRAVELS</Link>
        </h1>
      </div>
      <div>
        <ul className="list-Links flex gap-3.5 ">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>Tour</Link>
          </li>
          <li>
            <Link>Blog</Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-3">
        {profilePic?.user?.profilePicture && (
          <img
            src={profilePic.user.profilePicture}
            alt="Profile"
            className=" mx-auto mb-6 border-2 "
            style={{
              width: "9rem",
              height: "3rem",
              borderRadius: "30rem",
              objectFit: "cover",
            }}
          />
        )}
        {user ? (
          <div className="user-display flex items-center gap-2">
            <span
              className="user-Name flex text-center text-white"
              style={{
                alignItems: "center",
                // gap: "0.9rem"
              }}
            >
              <Link to="/user/dashboard">
                {user.lastName} {user.firstName}
              </Link>
            </span>
            <button
              className="Logout-btn  md:mt-0  md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
              style={{
                backgroundColor: "rgb(105, 16, 87)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
              }}
              onClick={logout}
            >
              <Link to="/">Logout</Link>
            </button>
          </div>
        ) : (
          <>
            <button>
              <Link to="/signup">Register</Link>
            </button>
            <button
              className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
              style={{
                backgroundColor: "rgb(105, 16, 87)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
              }}
            >
              <Link to="/login">LogIn</Link>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
