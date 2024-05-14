import { useEffect, useState } from "react";
import { getAllOrderByStatus } from "../../../service/orderAPI";
import { Button, Col, Dropdown, Menu, Row, Spin } from "antd";
import { CiCircleQuestion, CiShop } from "react-icons/ci";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { API } from "../../../service/customAxios";
import { NavLink } from "react-router-dom";

const Cancelled = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setOrderData(await getAllOrderByStatus("shipped"));
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const convertTimestamp = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      {orderData
        .sort((a, b) => {
          return new Date(b.crateDate) - new Date(a.crateDate);
        })
        .map((item, index) => {
          return (
            <div key={`order-${index}`}>
              <Row justify="space-between" className="mb-2 mt-2">
                <Col className="flex items-center">
                  <CiShop className="mr-2" />
                  <p className="mr-2  font-bold">{item.name_shop}</p>
                  <Button type="primary" className="mr-2 flex items-center">
                    <IoMdChatbubbles />
                  </Button>
                  <NavLink to={`/shop/${item.shopId}`}>
                    <Button className="flex items-center">
                      <CiShop />
                    </Button>
                  </NavLink>
                </Col>
                <Col className="flex items-center">
                  <MdOutlineLocalShipping />
                  <span className="mx-2">Chờ xác nhận</span>
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          {convertTimestamp(item.crateDate)}
                        </Menu.Item>
                      </Menu>
                    }
                    placement="bottom"
                  >
                    <CiCircleQuestion />
                  </Dropdown>
                </Col>
              </Row>
              <div className="flex justify-between mb-2">
                <div className="flex">
                  <img
                    className="w-24 h-24 mr-2"
                    src={`${API}/uploads/${item.product_thumb[0]}`}
                  />
                  <div className="">
                    <p>{item.product_name}</p>
                    <p>x{item.product_attributes.quantity}</p>
                    <p>Màu: {item.product_attributes.color}</p>
                    <p> kích cỡ: {item.product_attributes.size}</p>
                  </div>
                </div>
                <div className="text-red-500">
                  ₫
                  {item.order_checkout.totalPrice + item.order_checkout.feeShip}
                </div>
              </div>
              <NavLink to={`/product/${item.product_attributes.productId}`}>
                <div className="flex justify-end mb-2">
                  <Button className="mr-2" type="primary">
                    Mua lại
                  </Button>
                </div>
              </NavLink>
              <hr />
            </div>
          );
        })}
    </div>
  );
};

export default Cancelled;
