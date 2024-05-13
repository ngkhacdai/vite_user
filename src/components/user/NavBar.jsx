import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { NavLink, Outlet } from "react-router-dom";
const { Header, Content } = Layout;
const NavBar = () => {
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Thông tin cá nhân", "sub1", <UserOutlined />, [
      getItem(<NavLink to={"/user"}>Hồ sơ</NavLink>, "/user"),
      getItem(<NavLink to={"/user/address"}>Địa chỉ</NavLink>, "/user/address"),
      getItem(
        <NavLink to={"/user/changepassword"}>Đổi mật khẩu</NavLink>,
        "/user/changepassword"
      ),
    ]),

    getItem(
      <NavLink to={"/user/order"}>Đơn mua</NavLink>,
      "/user/order",
      <FileTextOutlined />
    ),
  ];
  return (
    <Layout className="w-full bg-white">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        ></Menu>
      </Header>
      <Content className="p-2">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default NavBar;
