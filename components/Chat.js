import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "@/context/authContext";
import { useMediaQuery } from "react-responsive";
import { IoMdSend } from "react-icons/io";
import Contact from "./contact";
import OpenContacts from "./OpenContacts";
import { uniqBy } from "lodash";

const Chat = () => {
  const apiRoute = process.env.NEXT_PUBLIC_CHAT_APP_BACKEND;
  const [isClient, setIsClient] = useState(false);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [webSocket, setWebSocket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const divUnderMessages = useRef();
  const isPhone = useMediaQuery({
    query: "(max-width:767px)",
  });

  const {
    sidebarStatus,
    setSidebarStatus,
    userData,
    selectedContact,
    setSelectedContact,
  } = useContext(AuthContext);

  useEffect(() => {
    setIsClient(true);
    setSelectedContact(null);
    connectToWebSocket();
  }, []);
  const connectToWebSocket = () => {
    const token = localStorage.getItem("jwtToken");
    const webSocket = new WebSocket(
      `${process.env.NEXT_PUBLIC_CHAT_APP_BACKEND_WSS}?token=${token}`
    );
    setWebSocket(webSocket);
    webSocket.addEventListener("message", handleMessage);
    webSocket.addEventListener("close", () => {
      setTimeout(() => {
        connectToWebSocket();
      }, 500);
    });
  };

  // creating an array of connected clients
  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    setOnlinePeople(people);
  };
  const handleMessage = (event) => {
    const messageData = JSON.parse(event.data);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      setMessages((prev) => [...prev, { ...messageData }]);
    }
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (newMessage.trim() === "") return;
    webSocket.send(
      JSON.stringify({
        sender: userData._id,
        recipient: selectedContact,
        text: newMessage,
      })
    );

    setNewMessage("");
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userData._id,
        recipient: selectedContact,
        _id: JSON.stringify(new Date()),
      },
    ]);
  };
  useEffect(() => {
    const scrollOnNewMessage = divUnderMessages.current;
    scrollOnNewMessage &&
      scrollOnNewMessage.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // useEffect to fetch old messages rom database on loading the conversation panel
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    const fetchOldMessages = async (recipient) => {
      try {
        const response = await fetch(
          `${apiRoute}/messages/getMessages?recipient=${recipient}`,
          {
            method: "GET",
            headers: {
              authorization: `bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("failed to fetch messages");
        }
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("error fetching messages", error);
      }
    };
    if (selectedContact) {
      fetchOldMessages(selectedContact);
    }
  }, [selectedContact]);

  const filteredMessages = uniqBy(messages, "_id");

  if (!isClient) {
    return null;
  } else {
    if (isPhone) {
      //
      //
      //
      //   mobile devices
      //
      //
      //
      return (
        <div className={`flex h-screen pt-16 md:pt-20`}>
          {/* chats */}

          {!sidebarStatus && <OpenContacts />}

          <div
            className={` ${
              !sidebarStatus && "hidden"
            }  bg-slate-900 h-screen  z-10 w-3/4 fixed p-2  flex flex-col gap-2 pb-20 no-scrollbar overflow-y-scroll`}
          >
            <div className="w-full  text-white p-2 text-center text-lg font-bungee">
              Chats
            </div>

            {userData &&
              Object.keys(onlinePeople).map((userId) =>
                userId === userData._id ? (
                  ""
                ) : (
                  <Contact
                    online={true}
                    key={userId}
                    userId={userId}
                    onlinePeople={onlinePeople}
                  />
                )
              )}
          </div>
          <div
            className="flex flex-col bg-blue-100 w-screen  "
            onClick={() => setSidebarStatus(false)}
          >
            {/* conversation */}
            <div className="flex-grow items-center h-full ">
              {selectedContact ? (
                <div className="  w-full h-full flex flex-grow flex-col  justify-start fixed overflow-y-scroll pb-40 no-scrollbar">
                  {filteredMessages.map((message) => (
                    <div key={message._id}>
                      <div
                        className={`inline-block ${
                          userData._id && message.sender === userData._id
                            ? "bg-blue-500 text-white float-right"
                            : "bg-white text-black float-left"
                        }  p-2  m-2 rounded-lg max-w-72 whitespace-pre-wrap break-words`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  <div ref={divUnderMessages}></div>
                </div>
              ) : (
                <div className="text-center font-bungee pt-10 text-gray-600/50 px-3  ">
                  select a contact to start a conversation
                </div>
              )}
            </div>
            {/* textfield and send button */}
            {selectedContact && (
              <form
                className="flex p-3 gap-2  fixed bottom-0 left-0 w-full bg-blue-100"
                onSubmit={sendMessage}
              >
                <input
                  value={newMessage}
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                  }}
                  type="text"
                  placeholder="message..."
                  className="bg-white border flex-grow p-2 w-5/6"
                ></input>
                <button
                  className="bg-slate-900 border rounded-md pl-3 text-white p-2 w-1/6 flex justify-center items-center text-3xl "
                  type="submit"
                >
                  <IoMdSend />
                </button>
              </form>
            )}
          </div>
        </div>
      );
    } else {
      //
      //
      //
      // for bigger devices
      //
      //
      //
      return (
        <div className={`flex h-screen pt-16 md:pt-20`}>
          {/* chats */}
          <div
            className={`bg-slate-900 w-1/4 p-2  flex flex-col gap-2 pb-20 overflow-y-scroll no-scrollbar`}
          >
            <div className="w-full  text-white p-2 text-center text-lg font-bungee">
              Chats
            </div>

            {/* individual people  */}
            {userData &&
              Object.keys(onlinePeople).map((userId) =>
                userId === userData._id ? (
                  ""
                ) : (
                  <Contact
                    online={true}
                    key={userId}
                    userId={userId}
                    onlinePeople={onlinePeople}
                  />
                )
              )}
          </div>
          <div
            className="flex flex-col bg-blue-100 w-screen md:w-3/4 "
            onClick={() => setSidebarStatus((prev) => !prev)}
          >
            {/* conversation */}
            <div className="flex-grow items-center h-full  ">
              {selectedContact ? (
                <div className="  w-3/4 h-full flex flex-grow flex-col no-scrollbar justify-start fixed overflow-y-scroll pb-40">
                  {filteredMessages.map((message) => (
                    <div key={message._id}>
                      <div
                        className={`inline-block ${
                          userData &&
                          (message.sender === userData._id
                            ? "bg-blue-500 text-white float-right"
                            : "bg-white text-black  float-left")
                        } p-2  m-2 rounded-lg max-w-[75%]  whitespace-pre-wrap break-words`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  <div ref={divUnderMessages}></div>
                </div>
              ) : (
                <div className="text-center font-bungee pt-10 text-gray-600/50 px-3 ">
                  select a contact to start a conversation
                </div>
              )}
            </div>
            {/* textfield and send button */}
            {selectedContact && (
              <form
                className="flex p-3 gap-2 bg-blue-100 z-10 "
                onSubmit={sendMessage}
              >
                <input
                  value={newMessage}
                  onChange={(event) => {
                    setNewMessage(event.target.value);
                  }}
                  type="text"
                  placeholder="message..."
                  className="bg-white flex-grow border rounded-md p-2 "
                ></input>
                <button
                  className="bg-slate-900 border rounded-md pl-3 text-white p-2  flex justify-center items-center text-3xl "
                  type="submit"
                >
                  <IoMdSend />
                </button>
              </form>
            )}
          </div>
        </div>
      );
    }
  }
};
export default Chat;
