import Link from "next/link";
import { useRouter } from "next/router";
import authContext from "@/context/authContext";

import { BsCupFill } from "react-icons/bs";
import { useContext } from "react";

const MainNavigation = (props) => {
  const router = useRouter();
  const currentPath = router.pathname;
  const { isLoggedIn, setIsLoggedIn, setUserData, userData } =
    useContext(authContext);

  return (
    <div className="box-border bg-navBar pr-5 h-16 md:h-20 flex flex-row justify-between items-center gap-3 md:gap-5 fixed top-0 w-screen z-50 ">
      <div className="flex flex-row justify-between items-center gap-3 md:gap-5">
        <BsCupFill className=" text-4xl md:text-6xl text-red-50 ml-4" />
        <p className="select-none font-bungee text-2xl md:text-4xl font-semibold text-gray-200">
          C-up
        </p>
      </div>
      {/* links */}
      <div className="flex flex-row justify-between items-right gap-4 md:gap-5">
        {currentPath === "/login" ||
        currentPath === "/register" ||
        currentPath === "/" ? (
          ""
        ) : (
          <Link href="/login">
            <p
              onClick={() => {
                localStorage.removeItem("jwtToken");
                setIsLoggedIn(false);
                setUserData(null);
              }}
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200`}
            >
              log out
            </p>
          </Link>
        )}

        {currentPath === "/login" || currentPath === "/register" ? (
          <Link href="/">
            <p
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200`}
            >
              Home
            </p>
          </Link>
        ) : (
          ""
        )}
        {currentPath === "/" || currentPath === "/login" ? (
          <Link href="register">
            <p
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200`}
            >
              Signup
            </p>
          </Link>
        ) : (
          ""
        )}
        {currentPath === "/" || currentPath === "/register" ? (
          <Link href="/login">
            <p
              className={` select-none font-bungee text-xs md:text-lg font-semibold text-gray-200`}
            >
              Login
            </p>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default MainNavigation;
