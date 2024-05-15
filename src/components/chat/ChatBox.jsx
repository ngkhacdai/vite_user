import { Col, Row } from "antd";
import { useEffect, useRef } from "react";

const ChatBox = ({ messageData }) => {
  const ref = useRef();
  useEffect(() => {
    ref.current?.lastElementChild?.scrollIntoView();
  }, [messageData]);
  return (
    <div ref={ref} className="max-h-64 overflow-y-auto ">
      {messageData.length > 0 &&
        messageData.map((item, index) => {
          return (
            <div key={`message-${index}`}>
              {item.senderID === localStorage.getItem("userID") ? (
                <Row justify="end">
                  <Col className="m-1 min-w-16 break-words bg-blue-400 rounded-lg p-2 text-white">
                    {item.message}
                  </Col>
                </Row>
              ) : (
                <Row>
                  <Col className="m-1 min-w-16 break-words bg-white border border-solid border-black rounded-lg p-2">
                    {item.message}
                  </Col>
                </Row>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ChatBox;
