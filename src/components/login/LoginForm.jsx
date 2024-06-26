import { Button, Form, Input, notification } from "antd";
import axios from "axios";
const LoginForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Notification Error",
      description: content,
    });
  };
  const onFinish = async (values) => {
    const form = {
      email: values.email,
      password: values.password,
      role: "User",
    };
    await axios
      .post("https://dai.tongdaihoidap.com/v1/api/access/login", form)
      .then((res) => {
        localStorage.setItem("userID", res.data.message.userId);
        localStorage.setItem("token", res.data.message.accessToken);
        window.location.href = "/";
      })
      .catch(() => {
        openNotificationWithIcon("Sai tài khoản hoặc mật khẩu");
      });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div>
      <p className="mb-5 text-2xl font-bold">Đăng nhập</p>
      {contextHolder}
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
              min: 6,
              message: "Password must be at least 6 characters",
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
