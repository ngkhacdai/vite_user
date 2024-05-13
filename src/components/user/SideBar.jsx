import { Layout, Menu, theme } from "antd";
const { Content, Sider } = Layout;
import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import "./sidebar.css";
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={[window.location.pathname]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content
          className={`overflow-x-auto ${
            collapsed ? "w-full" : "w-full md:w-auto"
          }`}
        >
          <div
            className="p-2"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
