import { Col, Row, Spin } from "antd";
import { useSelector } from "react-redux";
import ModalUpdate from "./ModalUpdate";
import { API } from "../../service/customAxios";

const Profile = () => {
  const profile = useSelector((state) => state.user.profile);

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
  if (profile.length == 0) {
    return <Spin fullscreen />;
  }
  return (
    <div className="pl-2">
      <h3 className="text-xl mb-2">Hồ sơ của tôi</h3>
      <p className="mb-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <hr />
      <Row justify="space-between">
        <Col>
          <div className="flex inline mb-2">
            <p className="mr-4 w-24 text-right">Tên đăng nhập</p>
            <span>{profile.email}</span>
          </div>
          <div className="flex inline mb-2">
            <p className="mr-4 w-24 text-right">Tên</p>
            <p>
              {profile?.information ? (
                profile?.information?.fullName
              ) : (
                <p>Hãy cập nhật thông tin</p>
              )}
            </p>
          </div>
          <div className="flex inline mb-2">
            <p className="mr-4 w-24 text-right">Email</p>
            <span>{hideEmail(profile?.email)}</span>
          </div>
          <div className="flex inline mb-2">
            <p className="mr-4 w-24 text-right">Số điện thoại</p>
            <span>
              {profile?.information ? (
                hideNumber(profile?.information?.phoneNumber)
              ) : (
                <p>Hãy cập nhật thông tin</p>
              )}
            </span>
          </div>
          <div className="flex inline mb-2">
            <p className="mr-4 w-24 text-right">Giới tính</p>
            <span>
              <p>
                {profile?.information ? (
                  profile?.information?.gender
                ) : (
                  <p>Hãy cập nhật thông tin</p>
                )}
              </p>
            </span>
          </div>
        </Col>
        <div>
          <img
            src={`${API}/${profile?.information?.avatar}`}
            className="w-20 h-20 border-solid border-2 border-black rounded"
            alt="Chưa có thông tin"
          />
        </div>
      </Row>
      <div className="mt-3">
        <ModalUpdate profile={profile} />
      </div>
    </div>
  );
};

export default Profile;
