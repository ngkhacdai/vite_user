import { Button, Form, Input } from "antd";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

const ChatForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const onFinish = () => {
    if (message) {
      sendMessage(message);
      setMessage("");
    }
  };
  const onFinishFailed = () => {};
  return (
    <div>
      <Form
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        className="flex justify-center"
      >
        <Form.Item className="w-full mr-2">
          <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        </Form.Item>

        <Button htmlType="submit" type="primary">
          <IoMdSend />
        </Button>
      </Form>
    </div>
  );
};

export default ChatForm;
