import axios from "axios";
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

  const deleteAccount = async (callback) => {
    setLoadingAuth(true);
    try {
      const response = await axios.delete(`${baseUrl}/auth/deleteAccount`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
   
      if (response.data.status === "success") {
        toast.success(response.data.message); 
        
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
       
        if (callback) callback();
      }
    } catch (error) {
     
      const errorMessage =
        error.response?.data?.message || "Failed to delete account";
      toast.error(errorMessage);
      
      if (error.response?.status === 401) {

        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
      }
    } finally {
      setLoadingAuth(false);
    }
  };

  

  const value = {
    user,
    token,
    loadingAuth,
    signingUp,
    Signup,
    login,
    logout,
    deleteAccount
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthProvider;
