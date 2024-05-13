import { useEffect, useState } from "react";
import { getAllOrderByStatus } from "../../../service/orderAPI";
import { Button, Dropdown, Spin } from "antd";
import { CiCircleQuestion, CiShop } from "react-icons/ci";
import { MdOutlineLocalShipping } from "react-icons/md";
import { IoMdChatbubbles } from "react-icons/io";
import { API } from "../../../service/customAxios";

const Comfirmed = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(orderData);
  const getData = async () => {
    setOrderData(await getAllOrderByStatus("shipped"));
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const items = [
    {
      key: 1,
      lable: <div></div>,
    },
  ];
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      {orderData.map((item, index) => {
        return (
          <div key={`order-${index}`}>
            <div className="flex justify-between">
              <div className="flex items-center">
                <CiShop className="mr-2" />
                <p className="mr-2  font-bold">{item.name_shop}</p>
                <Button type="primary" className="mr-2 flex items-center">
                  <IoMdChatbubbles className="mr-2" />
                  Chat
                </Button>
                <Button className="flex items-center">
                  <CiShop className="mr-2" />
                  Xem shop
                </Button>
              </div>
              <div className="flex items-center">
                <MdOutlineLocalShipping />
                <span className="mx-2">Chờ xác nhận</span>
                <Dropdown
                  menu={{
                    items,
                  }}
                  placement="bottom"
                >
                  <CiCircleQuestion />
                </Dropdown>
              </div>
            </div>
            <br />
            <div className="flex justify-between">
              <div className="flex">
                <img
                  className="w-24 h-24 mr-2"
                  src={`${API}/uploads/${item.product_thumb[0]}`}
                />
                <div className="">
                  <p>{item.product_name}</p>
                  <p>x{item.product_attributes.quantity}</p>
                  <p>
                    Phân loại hàng: Màu {item.product_attributes.color} kích cỡ{" "}
                    {item.product_attributes.size}
                  </p>
                </div>
              </div>
              <div className="text-red-500">
                ₫{item.order_checkout.totalPrice + item.order_checkout.feeShip}
              </div>
            </div>
            <br />
            <div className="flex justify-end">
              <Button className="mr-2" type="primary">
                Mua lại
              </Button>
              <Button>Liên hệ người bán</Button>
            </div>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default Comfirmed;
