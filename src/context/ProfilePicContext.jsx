import axios from "axios";
import { Children, useState } from "react";
import { createContext, useContext } from "react";

export const ProfilePicContext = createContext();

export const useProfilePicContext = () => useContext(ProfilePicContext);

const ProfilePicProvider = ({ children }) => {
  const [profilePic, setProfilePic ] = useState({});
  const [token , setToken] = useState()

  const baseUrl = import.meta.env.VITE_BASE_URL;

  
    
  const getProfilePic = async () => {
    try {
        const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          };
    
      const response = await axios.post(`${baseUrl}/user/dashboard`, config);
      const user = response.data.data.user;
  
      setProfilePic({ user }); 
    } catch (error) {
      console.error("Failed to fetch profile picture:", error);
    }
  };
  
    

  const value = {
    token,
    profilePic,
    getProfilePic
  }
  return (
    <ProfilePicContext.Provider value={value}>
      {children}
    </ProfilePicContext.Provider>
  );
};

export default ProfilePicProvider;
