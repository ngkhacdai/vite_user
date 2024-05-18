import { Col, Row } from "antd";
import { useEffect, useRef } from "react";

const ChatBox = ({ messageData }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView();
  }, [messageData]);
  return (
    <div ref={ref} className="max-h-64 overflow-y-auto">
      {messageData.length > 0 &&
        messageData.map((item, index) => {
          return (
            <div key={`message-${index}`} className="p-2">
              {item.senderID === localStorage.getItem("userID") ? (
                <div className="flex justify-end">
                  <div className="bg-blue-400 text-white rounded-lg p-2 max-w-xs break-words">
                    {item.message}
                  </div>
                </div>
              ) : (
                <div className="flex justify-start">
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-2 max-w-xs break-words">
                    {item.message}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ChatBox;
