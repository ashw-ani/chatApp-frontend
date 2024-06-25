import { useState } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/router";
import { useEffect } from "react";
import authContext from "@/context/authContext";
import { useContext } from "react";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const router = useRouter();
  const { isLoggedIn, userData } = useContext(authContext);

  useEffect(() => {
    if (isLoggedIn && userData) {
      router.push(`/user/${userData.username}`);
    }
  }, [isLoggedIn, userData, router]);

  const signupHandler = async (event) => {
    setCreatingUser(true);
    event.preventDefault();
    const formData = { username, password };
    try {
      const response = await fetch("http://192.168.0.117:8080/auth/signup", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to signup");
      }
      setCreatingUser(false);
      const data = await response.json();

      setSuccessMessage(data.message);
      setPassword("");
      setUsername("");

      setTimeout(() => {
        setSuccessMessage("");
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center gap-8 items-center">
      <p className=" select-none font-bungee text-2xl md:text-4xl font-semibold text-blue-900 ">
        Signup on c-up
      </p>

      {/* creating user */}
      {creatingUser && <LoadingScreen message={"creating user"} />}

      {/* user created message */}
      {successMessage && <LoadingScreen message={successMessage} />}
      <form onSubmit={signupHandler} className="w-72 md:w-96 mx-auto mb-12">
        <input
          required
          minLength={3}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value.trim());
          }}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2   "
        ></input>
        <input
          value={password}
          required
          minLength={8}
          onChange={(event) => {
            setPassword(event.target.value.trim());
          }}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 "
        ></input>
        <button
          type="submit"
          className="select-none bg-blue-500 hover:bg-blue-700 text-white block w-full rounded-sm p-2"
        >
          Register
        </button>
      </form>
    </div>
  );
};
export default Register;
