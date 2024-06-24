import AuthContext from "@/context/authContext";
import { useContext } from "react";
import { RiContactsBook3Fill } from "react-icons/ri";

const OpenContacts = (props) => {
  const { setSidebarStatus } = useContext(AuthContext);
  return (
    <div
      className="w-8 h-8 fixed top-5 left-1/2 -translate-x-1/2 z-50"
      onClick={() => setSidebarStatus(true)}
    >
      <RiContactsBook3Fill className="text-3xl text-gray-100" />
    </div>
  );
};
export default OpenContacts;
