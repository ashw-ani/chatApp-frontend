import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [sidebarStatus, setSidebarStatus] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            "http://192.168.0.117:8080/user/getUser",
            {
              headers: {
                authorization: `bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUserData(data.user);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data", error);
          setIsLoggedIn(false);
          setUserData(null);
        }
      };
      fetchUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        sidebarStatus,
        setSidebarStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
