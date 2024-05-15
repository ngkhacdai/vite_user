import ChatForm from "./ChatForm";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ChatBox from "./ChatBox";
import { Button, Modal } from "antd";
import { IoMdChatbubbles } from "react-icons/io";

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
  const showModal = () => {
    setIsShow(true);
  };
  const cancelModal = () => {
    setIsShow(false);
  };
  return (
    <div className="sticky bottom-0 right-1">
      <Button onClick={showModal} className="flex items-center">
        <IoMdChatbubbles />
        <p>Chat</p>
      </Button>
      <Modal
        title="Chat"
        footer={false}
        onCancel={cancelModal}
        open={isShow}
        width={650}
      >
        <div className="md:w-128 mx-auto border-1 border-solid border-gray-300">
          <div className="border-1 border-solid border-gray-300">
            <ChatBox messageData={messageData} />
            <div className="sticky bottom-0 mt-2">
              <ChatForm sendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Chat;
