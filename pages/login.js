import { useContext, useState } from "react";
import { useRouter } from "next/router";
import authContext from "@/context/authContext";
import { useEffect } from "react";

const Login = (props) => {
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, setIsLoggedIn, userData } = useContext(authContext);

  useEffect(() => {
    if (isLoggedIn && userData) {
      router.push(`/user/${userData.username}`);
    }
  }, [isLoggedIn, userData, router]);

  const loginHandler = async (event) => {
    event.preventDefault();
    const formData = { username, password };

    try {
      const response = await fetch(`${apiRoute}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "something went wrong");
      }
      setErrorMessage("");

      if (data.token) {
        localStorage.setItem("jwtToken", data.token);
        setIsLoggedIn(true);
        router.push(`/user/${data.username}`);
      } else {
        throw new Error("login failed");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 2000);
    }

    // fetching logic
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center gap-8 items-center bg-[url('../public/images/background.png')] bg-contain md:bg-cover">
      <div className="h-screen w-full flex flex-col justify-center gap-8 items-center ">
        <p className=" select-none font-bungee text-2xl md:text-4xl font-semibold text-white ">
          Login to c-up
        </p>
        <form className="w-72 md:w-96 mx-auto mb-12 " onSubmit={loginHandler}>
          <input
            required
            className="block w-full rounded-md p-2 mb-2"
            type="text"
            placeholder="username"
            autoComplete="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value.trim());
            }}
          ></input>
          <input
            type="password"
            placeholder="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-md p-2 mb-2"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value.trim());
            }}
          ></input>
          <button
            type="submit"
            className="select-none bg-blue-500 hover:bg-blue-700 text-white block w-full rounded-md p-2"
          >
            Login
          </button>
          {errorMessage && (
            <p className="text-red-500 text-lg font-bungee text-center pt-2 font-extralight">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;
