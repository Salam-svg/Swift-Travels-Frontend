import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const authContext = createContext();

export const useAuthContext = () => {
  return useContext(authContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState();
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL
  
  

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);  
    }
    setLoadingAuth(false);
  }, []);
 
  const Signup = async (formData) => {
    setSigningUp(true);
    try {
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (data.status == "success") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSigningUp(false);
    }
  };

  const login = async (formDates, callback) => {
    setLoadingAuth(true)
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(formDates),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success(data.message);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        if (callback) callback();
      } else {
        toast.error(data.message);
      }
      console.log(data);
      
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAuth(false);
    }
  };
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    token,
    loadingAuth,
    signingUp,
    loggingIn,
    Signup,
    login,
    logout,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
