import { Layout, Menu, theme } from "antd";
const { Content, Sider } = Layout;
import { useSelector } from "react-redux";
import { FileTextOutlined, UserOutlined } from "@ant-design/icons";
import { NavLink, Outlet } from "react-router-dom";

const SideBar = () => {
  const profile = useSelector((state) => state.user.profile);
  console.log(profile);
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
      getItem(<NavLink to={"/user"}>Hồ sơ</NavLink>, "1"),
      getItem(<NavLink to={"/user/address"}>Địa chỉ</NavLink>, "2"),
      getItem(<NavLink to={"/user/changepassword"}>Đổi mật khẩu</NavLink>, "3"),
    ]),

    getItem(
      <NavLink to={"/user/order"}>Đơn mua</NavLink>,
      "4",
      <FileTextOutlined />
    ),
  ];
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout className="h-128">
        <Sider>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "10px 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: "98%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default SideBar;
