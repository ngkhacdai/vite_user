import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet } from "react-router-dom";
const { Header, Content } = Layout;
// const items = new Array(15).fill(null).map((_, index) => ({
//   key: index + 1,
//   label: `nav ${index + 1}`,
// }));

const Order = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const items = [
    {
      key: "1",
      label: <NavLink to={"/user/order"}>Chờ xác nhận</NavLink>,
    },
    {
      key: "2",
      label: <NavLink to={"/user/order/confirmed"}>Xác nhận</NavLink>,
    },
    {
      key: "3",
      label: <NavLink to={"/user/order/shipped"}>Đang giao</NavLink>,
    },
    {
      key: "4",
      label: <NavLink to={"/user/order/cancelled"}>Đã hủy</NavLink>,
    },
    {
      key: "5",
      label: <NavLink to={"/user/order/delivered"}>Đã nhận</NavLink>,
    },
  ];
  return (
    <div>
      <div>
        <Layout>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
            }}
          >
            <div className="demo-logo" />
            <Menu
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={items}
              style={{ flex: 1, minWidth: 0 }}
            />
          </Header>
          <Content
          // style={{
          //   padding: "0 48px",
          // }}
          >
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                padding: 24,
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
};

export default Order;
