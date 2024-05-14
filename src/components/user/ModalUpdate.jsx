import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, Upload } from "antd";
import { useState } from "react";
import { updateProfile } from "../../service/userAPI";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../redux/slice/userSlice";

const ModalUpdate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Nam");
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    console.log(file);
    if (file && fullname && phoneNumber && gender) {
      const formData = new FormData();
      formData.append("avatar", file.originFileObj);
      formData.append("fullName", fullname);
      formData.append("gender", gender);
      formData.append("phoneNumber", phoneNumber);
      await updateProfile(formData);
      dispatch(fetchUserInfo());
      setIsModalOpen(false);
      clearForm();
    }
  };
  const clearForm = () => {
    setFullName("");
    setPhoneNumber("");
    setGender("Nam");
  };
  const handleCancel = () => {
    clearForm();
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Update thông tin cá nhân
      </Button>
      <Modal
        title="Update thông tin cá nhân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          className="w-full text-center"
          autoComplete="off"
        >
          <Form.Item
            label="Avatar"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Hãy chọn ảnh",
              },
            ]}
            valuePropName="fileList"
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              name="avatar"
              listType="picture-card"
              onChange={(e) => {
                setFile(e.fileList[0]);
              }}
            >
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Hãy điền họ và tên",
              },
            ]}
            label="Họ và tên"
            name="fullName"
            required={true}
          >
            <Input
              value={fullname}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            rules={[
              {
                required: true,
                min: 9,
                message: "Số điện thoại có ít nhất 9 số",
              },
            ]}
            required={true}
            name="phone"
          >
            <Input
              type="Number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Radio.Group
              defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <Radio value="Nam"> Nam </Radio>
              <Radio value="Nữ"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUpdate;
