import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useDashboardContext } from "../../context/Dashboard";
import "../../styles/Navbar.css";
import { useEffect } from "react";

const Navbar = () => {
  const { user, logout  } = useAuthContext();
  const { user: dashboardUser } = useDashboardContext();

  useEffect(() => {
    if (user?.token) {
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

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <Link
              to="/user/dashboard"
              className="flex items-center gap-2 text-white hover:text-blue-300"
            >
              
              {dashboardUser?.profilePicture ? (
                <img
                  src={dashboardUser.profilePicture}
                  alt={`${user.lastName} ${user.firstName} ` }
                  style={{
                    width: "3rem",
                    height: "3rem",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm">
                  {user.lastName?.[0]}
                  {user.firstName?.[0]}
                </div>
              )}
              <span>
                {user.lastName} {user.firstName}
              </span>
            </Link>
            <button type="button" onClick={logout}>
              <Link
                className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
                style={{
                  backgroundColor: "rgb(105, 16, 87)",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Logout
              </Link>
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
              style={{
                backgroundColor: "rgb(105, 16, 87)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Register
            </Link>
            <Link
              to="/login"
              className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
              style={{
                backgroundColor: "rgb(105, 16, 87)",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              LogIn
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
