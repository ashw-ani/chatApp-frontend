import Link from "next/link";
import { BsCupFill } from "react-icons/bs";

const MainNavigation = (props) => {
  return (
    <div className="box-border bg-navBar pr-5 h-16 md:h-20 flex flex-row justify-between items-center gap-3 md:gap-5 fixed top-0 w-screen ">
      <div className="flex flex-row justify-left items-center gap-3 md:gap-5">
        <BsCupFill className=" text-4xl md:text-6xl text-red-50 ml-4" />
        <p className="select-none font-bungee text-2xl md:text-4xl font-semibold text-gray-200">
          C-up
        </p>
      </div>
      {/* links */}
      <div className="flex flex-row justify-around items-center gap-5 md:gap-7">
        <Link href="/">
          <p className="select-none font-bungee text-xs md:text-lg font-semibold text-gray-200">
            Home
          </p>
        </Link>
        <Link href="register">
          <p className="select-none font-bungee text-xs md:text-lg font-semibold text-gray-200">
            Signup
          </p>
        </Link>
        <Link href="/login">
          <p className="select-none font-bungee text-xs md:text-lg font-semibold text-gray-200">
            Login
          </p>
        </Link>
      </div>
    </div>
  );
};
export default MainNavigation;
