import logo from "../../assets/trustybuy.png";
import { Col, Dropdown, Input, Row, Space } from "antd";
const { Search } = Input;
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../redux/slice/userSlice";

const Header = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.user.profile);
  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);
  const items = [
    {
      label: <NavLink to="/user">Tài khoản của tôi</NavLink>,
      key: "0",
    },
    {
      label: <NavLink to="/logout">Logout</NavLink>,
      key: "1",
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);
  return (
    <div className=" w-3/4 m-auto">
      <Row
        justify="space-between"
        gutter={[0, 0]}
        style={{
          alignItems: "center",
        }}
      >
        <Col span={3}>
          <a href="/">
            <img src={logo} style={{ width: 100, height: 100 }} />
          </a>
        </Col>
        <Col xs={11} sm={13} md={15} lg={14} xl={14}>
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={
              {
                // width: 200,
              }
            }
          />
        </Col>
        <Col span={2}>
          <a href="/cart">
            <ShoppingCartOutlined className="size-10 cursor-pointer	" />
          </a>
        </Col>
        <Col span={3}>
          <Dropdown
            menu={{
              items,
            }}
          >
            <Space className="cursor-pointer">
              {profile.length === 0 ? (
                <div></div>
              ) : (
                profile?.information?.fullName
              )}
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
