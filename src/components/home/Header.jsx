import logo from "../../assets/trustybuy.png";
import { Col, Dropdown, Input, Row, Space } from "antd";
const { Search } = Input;
import { DownOutlined } from "@ant-design/icons";
const items = [
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
    key: "0",
  },
  {
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item disabled",
    key: "3",
    disabled: true,
  },
];
const Header = () => {
  return (
    <div className="w-11/12 m-auto">
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
        <Col xs={11} sm={13} md={15} lg={16} xl={16}>
          <Search
            placeholder="input search text"
            //   onSearch={onSearch}
            style={
              {
                // width: 200,
              }
            }
          />
        </Col>
        <Col span={3}>
          <Dropdown
            menu={{
              items,
            }}
          >
            <Space>
              Hover me
              <DownOutlined />
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
