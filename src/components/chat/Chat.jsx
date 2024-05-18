import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";
import { Button } from "antd";
import { IoMdChatbubbles, IoMdClose } from "react-icons/io";

const socket = io("http://localhost:3000/", {
  transports: ["websocket"],
});

const Chat = () => {
  const [messageData, setMessageData] = useState([]);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected to socket server");
      socket.emit("joinroom");
    });

    socket.on("getallmessage", (data) => {
      setMessageData(data);
    });

    socket.on("newmessage", (message) => {
      setMessageData((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off("getallmessage");
      socket.off("newmessage");
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    const form = {
      senderID: localStorage.getItem("userID"),
      message: message,
    };
    socket.emit("chat", form);
  };

  const toggleChat = () => {
    setIsShow((prevIsShow) => !prevIsShow);
  };

  return (
    <div>
      <div
        className={`fixed bottom-0 right-0 w-full sm:w-128 min-h-120 z-1 bg-white border border-gray-300 shadow-lg transform transition-transform duration-300 ${
          isShow ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="bg-gray-200 p-2 flex justify-between items-center cursor-pointer"
          onClick={toggleChat}
        >
          <span>Chat</span>
          <IoMdClose />
        </div>
        <div className="max-h-64 overflow-y-auto">
          <ChatBox messageData={messageData} />
        </div>
        <div className="p-2 border-t border-gray-300 absolute bottom-0 w-full">
          <ChatForm sendMessage={sendMessage} />
        </div>
      </div>
      {!isShow && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 flex items-center w-16 h-10 sm:w-24 sm:h-10"
        >
          <IoMdChatbubbles className="mr-1" />
          <p className="text-lg sm:text-xl">Chat</p>
        </Button>
      )}
    </div>
  );
};

export default Chat;
