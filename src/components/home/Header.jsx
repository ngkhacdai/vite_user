import logo from "../../assets/trustybuy.png";
import { Col, Dropdown, Input, Row, Space } from "antd";
const { Search } = Input;
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUserInfo } from "../../redux/slice/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      label: <NavLink to="/logout">Đăng xuất</NavLink>,
      key: "1",
    },
  ];

  const onSearch = (value) => {
    if (value === "") {
      return navigate("/");
    } else {
      window.location.href = `/search?${value}`;
    }
  };
  return (
    <div className=" md:w-3/4 mx-auto">
      <Row
        justify="space-between"
        gutter={[0, 0]}
        style={{
          alignItems: "center",
        }}
      >
        <Col span={5}>
          <NavLink to="/">
            <img src={logo} style={{ height: 100 }} />
          </NavLink>
        </Col>
        <Col xs={9} sm={11} md={13} lg={12} xl={12}>
          <Search placeholder="Tìm kiếm sản phẩm" onSearch={onSearch} />
        </Col>
        <Col span={1}>
          <NavLink to="/cart">
            <ShoppingCartOutlined
              style={{ fontSize: "20px" }}
              className="cursor-pointer"
            />
          </NavLink>
        </Col>
        <Col span={5}>
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
