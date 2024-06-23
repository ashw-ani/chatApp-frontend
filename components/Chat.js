import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/authContext";
import { useMediaQuery } from "react-responsive";
import { useDrag } from "@use-gesture/react";
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const [isClient, setIsClient] = useState(false);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [webSocket, setWebSocket] = useState(null);

  const isPhone = useMediaQuery({
    query: "(max-width:767px)",
  });

  const { sidebarStatus, setSidebarStatus } = useContext(AuthContext);
  useEffect(() => {
    setIsClient(true);

    const webSocket = new WebSocket("ws://192.168.0.117:8080");
    setWebSocket(webSocket);
    webSocket.onopen = () => {
      const token = localStorage.getItem("jwtToken");
      webSocket.send(JSON.stringify({ connection: "true", token: token }));
    };

    webSocket.addEventListener("message", handleMessage);

    webSocket.onclose = () => {
      const token = localStorage.getItem("jwtToken");
      webSocket.send(JSON.stringify({ connection: "false", token: token }));
    };
  }, []);

  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    console.log(people);
    setOnlinePeople(people);
  };
  const handleMessage = (event) => {
    const messageData = JSON.parse(event.data);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    }
  };

  const bind = useDrag(
    ({ down, movement: [mx] }) => {
      if (!down && mx > 50) {
        setSidebarStatus(true); // Right swipe detected, open sidebar
      } else if (!down && mx < -50) {
        setSidebarStatus(false); // Left swipe detected, close sidebar
      }
    },
    { axis: "x" }
  );

  if (!isClient) {
    return null;
  } else {
    if (isPhone) {
      return (
        <div {...bind()} className={`flex h-screen pt-16 md:pt-20`}>
          {/* chats */}
          <div
            className={` ${
              !sidebarStatus && "hidden"
            }  bg-slate-900 h-screen absolute z-10 w-3/4 pt-16 md:pt-20`}
          >
            {Object.keys(onlinePeople).map((userId) => (
              <div>{userId}</div>
            ))}
          </div>
          <div
            className="flex flex-col bg-blue-100 w-screen "
            onClick={() => setSidebarStatus(false)}
          >
            {/* conversation */}
            <div className="flex-grow items-center">conversation</div>
            {/* textfield and send button */}
            <div className="flex p-3 gap-2  fixed bottom-0 left-0 w-full bg-blue-100">
              <input
                type="text"
                placeholder="message..."
                className="bg-white border flex-grow p-2 w-5/6"
              ></input>
              <button className="bg-slate-900 border rounded-md pl-3 text-white p-2 w-1/6 flex justify-center items-center text-3xl ">
                <IoMdSend />
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className={`flex h-screen pt-16 md:pt-20`}>
          {/* chats */}
          <div className={`bg-slate-900 w-1/4 pt-16 md:pt-20`}>
            {Object.keys(onlinePeople).map((userId) => (
              <div>{onlinePeople[userId]}</div>
            ))}
          </div>
          <div
            className="flex flex-col bg-blue-100 w-screen md:w-3/4"
            onClick={() => setSidebarStatus((prev) => !prev)}
          >
            {/* conversation */}
            <div className="flex-grow items-center">conversation</div>
            {/* textfield and send button */}
            <div className="flex p-3 gap-2   bg-blue-100">
              <input
                type="text"
                placeholder="message..."
                className="bg-white flex-grow border rounded-md p-2 "
              ></input>
              <button className="bg-slate-900 border rounded-md pl-3 text-white p-2  flex justify-center items-center text-3xl ">
                <IoMdSend />
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
};
export default Chat;
