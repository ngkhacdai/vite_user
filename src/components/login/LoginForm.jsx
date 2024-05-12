import { Button, Form, Input } from "antd";
import axios from "axios";
const LoginForm = () => {
  const onFinish = async (values) => {
    const form = {
      email: values.email,
      password: values.password,
      role: "User",
    };
    await axios
      .post("https://dai.tongdaihoidap.com/v1/api/access/login", form)
      .then((res) => {
        console.log(res);
        localStorage.setItem("userID", res.data.message.userId);
        localStorage.setItem("token", res.data.message.accessToken);
        window.location.href = "/";
      });

    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 8,
        }}
        className="w-full"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 8,
          }}
        >
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
