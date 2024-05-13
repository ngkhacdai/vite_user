import { Button, Col, Row } from "antd";
import { API } from "../../service/customAxios";
import { PiPlusThin } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { SlUserFollow } from "react-icons/sl";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useEffect, useState } from "react";

const HeaderShop = ({ shopData }) => {
  const [checkFollower, setCheckFollower] = useState(false);
  useEffect(() => {
    const findFollower = shopData.shop.follower.find(
      (item) => item === localStorage.getItem("userID")
    );
    console.log(findFollower);
    if (findFollower) return setCheckFollower(true);
  }, []);
  return (
    <div className="w-3/4 m-auto py-2 flex justify-between">
      <div className="w-1/3 bg-slate-400 p-2">
        <div>
          <Row className="flex items-center">
            <Col>
              <img
                className="border-solid border-2 border-black rounded-full w-24 h-24 mr-2"
                src={`${API}/${shopData.shop.avatarShop}`}
              />
            </Col>
            <Col>
              <p>{shopData.shop.nameShop}</p>
            </Col>
          </Row>
        </div>
        <Row className="flex justify-between mt-2 ">
          <Col span={11} className="">
            <Button className="flex justify-center text-center items-center w-full">
              <PiPlusThin className="mr-1" />
              {checkFollower ? <p>Đã theo dõi</p> : <p>Theo dõi</p>}
            </Button>
          </Col>
          <Col span={11}>
            <Button className="flex justify-center text-center items-center w-full">
              <IoMdChatbubbles className="mr-2" />
              <p>Chat</p>
            </Button>
          </Col>
        </Row>
      </div>
      <div className="w-2/3 ml-14">
        <div>
          <div className="flex items-center">
            <CiShop />
            <p className="mx-2">Sản phẩm: </p>
            <span className="text-red-500">{shopData.products.length}</span>
          </div>
          <br />
          <div className="flex items-center">
            <SlUserFollow />
            <p className="mx-2">Người theo dõi: </p>
            <span className="text-red-500">
              {shopData.shop.follower.length}
            </span>
          </div>
          <br />
        </div>
        <div className="flex items-center">
          <MdOutlineLocalPhone />
          <p className="mx-2">Số điện thoại: </p>
          <span className="text-red-500">0{shopData.shop.phoneNumberShop}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderShop;
