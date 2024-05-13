import { Button, Form, Input } from "antd";
import { ToastContainer, toast } from "react-toastify";
import { changePassword } from "../../service/userAPI";

const ChangePassword = () => {
  const onFinish = (values) => {
    if (values.oldPassword === values.newPassword) {
      return toast.error("Mật khẩu mới phải khác mật khẩu cũ");
    } else if (values.newPassword !== values.comfirmNewPassword) {
      return toast.error("Mật khẩu mới phải giống nhập lại mật khẩu mới");
    } else {
      const form = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      changePassword(form)
        .then((res) => {
          console.log(res);
          toast.success("Đổi mật khẩu thành công");
        })
        .catch(() => {
          toast.error("Đổi mật khẩu thất bại");
        });
    }
  };
  return (
    <div>
      <p className="text-xl font-bold">Đổi mật khẩu</p>
      <br />
      <hr />
      <div className="mt-2">
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
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[
              {
                required: true,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[
              {
                required: true,
                min: 6,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Nhập lại mật khẩu mới"
            name="comfirmNewPassword"
            rules={[
              {
                required: true,
                min: 6,
                message: "Mật khẩu phải từ 6 ký tự trở lên",
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
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
