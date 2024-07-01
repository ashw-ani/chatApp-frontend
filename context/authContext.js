import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [sidebarStatus, setSidebarStatus] = useState(true);
  const [selectedContact, setSelectedContact] = useState(true);
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`${apiRoute}/user/getUser`, {
            headers: {
              authorization: `bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          const data = await response.json();
          setUserData(data.user);
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Error fetching user data", error);
          setIsLoggedIn(false);
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
        selectedContact,
        setSelectedContact,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
