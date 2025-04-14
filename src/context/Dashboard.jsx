// context/DashboardContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuthContext } from "./AuthContext"; 

export const DashboardContext = createContext();

export const useDashboardContext = () => useContext(DashboardContext);

const DashboardProvider = ({ children }) => {
  const { user, token, logout } = useAuthContext();
  const [dashboardData, setDashboardData] = useState({
    user: null,
    statistics: {
      totalBookings: 0,
      confirmedBookings: 0,
      totalSpent: 0,
      pendingPayments: 0,
    },
    recentBookings: [],
    recentPayments: [],
    refunds: [], 
    reviews: [], 
  });
  const [loading, setLoading] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  
  useEffect(() => {
    if (user && token) {
      fetchDashboardData();
    }
  }, [user, token]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      
      const response = await axios.get(`${baseUrl}/user/dashboard`, config);
      const { user, statistics, recentBookings, recentPayments } = response.data.data;

      setDashboardData({
        user,
        statistics,
        recentBookings,
        recentPayments,
        refunds: [], 
        reviews: [], 
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        logout();
      } else {
        toast.error("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (file) => {
    setLoading(true);
    try {
      
const formData = new FormData();
      formData.append("profilePicture", file);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        `${baseUrl}/user/dashboard/profile-picture`,
        formData,
        config
      );

      if (response.data.success) {
        toast.success(response.data.data.message);
        setDashboardData((prev) => ({
          ...prev,
          user: {
            ...prev.user,
            profilePicture: response.data.data.profilePicture,
          },
        }));
      } else {
        toast.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error(error.response?.data?.error || "Failed to upload profile picture");
    } finally {
      setLoading(false);
    }
  };


  const value = {
    ...dashboardData,
    loading,
    fetchDashboardData,
    uploadProfilePicture,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

export default DashboardProvider;