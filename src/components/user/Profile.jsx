import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Input, Button, Spin, Radio } from "antd";
import { useSelector } from "react-redux";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const Profile = () => {
  const profile = useSelector((state) => state.user.profile);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
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
  );
  function hideEmail(email) {
    const parts = email.split("@");
    const visiblePart = parts[0].substring(0, 2);
    const hiddenPart = "*".repeat(parts[0].length - 2);
    return visiblePart + hiddenPart + "@" + parts[1];
  }
  function hideNumber(number) {
    const visibleDigits = 2;
    const hiddenDigits = Math.max(0, String(number).length - visibleDigits);
    return "*".repeat(hiddenDigits) + String(number).slice(-visibleDigits);
  }
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  if (profile.length == 0) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      <h3 className="text-xl">Hồ sơ của tôi</h3>
      <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <br />
      <hr />
      <br />
      <div className="flex justify-between">
        <div>
          <div className="flex inline">
            <p className="mr-4 w-24 text-right">Tên đăng nhập</p>
            <span>ngkhacdai</span>
          </div>
          <br />
          <div className="flex inline">
            <p className="mr-4 w-36 text-right">Tên</p>
            <Input placeholder="" />
          </div>
          <br />
          <div className="flex inline">
            <p className="mr-4 w-24 text-right">Email</p>
            <span>{hideEmail(profile.email)}</span>
          </div>
          <br />
          <div className="flex inline">
            <p className="mr-4 w-24 text-right">Số điện thoại</p>
            <span>{hideNumber(profile.information.phoneNumber)}</span>
          </div>
          <br />
          <div className="flex inline">
            <p className="mr-4 w-24 text-right">Giới tính</p>
            <span>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
              </Radio.Group>
            </span>
          </div>
          <br />
          <Button>Lưu</Button>
        </div>
        <div>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length == 1 ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{
                display: "none",
              }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
