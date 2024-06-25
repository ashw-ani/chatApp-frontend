// import { headers } from "next/headers";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/authContext";
import Chat from "@/components/Chat";

const userDash = (props) => {
  const router = useRouter();

  const username = router.query.username;
  const { isLoggedIn, setIsLoggedIn, userData, setUserData } =
    useContext(AuthContext);

  useEffect(() => {
    // const username = router.query.username;
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      router.push("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch("http://192.168.0.117:8080/user/getUser", {
          headers: {
            authorization: `bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("failed to fetch User Data");
        }
        const data = await response.json();

        // if (username !== data.user.username) {
        //   console.log("changed");
        //   localStorage.removeItem("jwtToken");
        // }
        setUserData(data.user);
      } catch (error) {
        console.error("error fetching user data", error);
      }
    };
    fetchUserData();

    const handleStorageChange = (event) => {
      if (event.key === "jwtToken") {
        localStorage.removeItem("jwtToken");
        setIsLoggedIn(false);
        setUserData(null);
        router.push("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router, setIsLoggedIn, setUserData, username]);

  // console.log(username);
  return (
    <div>
      <Chat></Chat>
    </div>
  );
};
export default userDash;
