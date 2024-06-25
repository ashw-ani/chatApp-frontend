import { useContext } from "react";
import Avatar from "./avatar";
import AuthContext from "@/context/authContext";

const Contact = (props) => {
  const { selectedContact, setSelectedContact, setSidebarStatus } =
    useContext(AuthContext);
  return (
    <div
      onClick={() => {
        setSelectedContact(props.userId);
        setSidebarStatus(false);
      }}
      className={`${
        selectedContact === props.userId
          ? " bg-gradient-to-r from-slate-100/60 via-slate-100/50 to-blue-100  rounded-l-full translate-x-2"
          : "bg-slate-100/35 rounded-3xl"
      } w-full cursor-pointer  text-white p-1.5  flex flex-row gap-2 items-center`}
    >
      <Avatar
        online={props.online}
        username={props.onlinePeople[props.userId]}
        userId={props.userId}
      />
      <span>{props.onlinePeople[props.userId]}</span>
    </div>
  );
};
export default Contact;
