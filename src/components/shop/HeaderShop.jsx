import { Button, Col, Row } from "antd";
import { API } from "../../service/customAxios";
import { CiShop } from "react-icons/ci";
import { SlUserFollow } from "react-icons/sl";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineLocalPhone } from "react-icons/md";
import { useEffect, useState } from "react";
import { followShop } from "../../service/userAPI";
import { getShop } from "../../service/shopAPI";

const HeaderShop = ({ shopData }) => {
  const [checkFollower, setCheckFollower] = useState(false);
  const [data, setData] = useState(shopData);

  useEffect(() => {
    const findFollower = data.shop.follower.find(
      (item) => item === localStorage.getItem("userID")
    );
    if (findFollower) setCheckFollower(true);
  }, [data.shop.follower]);

  const handleFollow = async () => {
    try {
      await followShop(data.shop._id);
      setCheckFollower(!checkFollower);
      setData(await getShop(window.location.pathname.split("/")[2]));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="md:w-3/4 mx-auto bg-white shadow-lg rounded-lg p-4">
      <Row gutter={[20, 20]} className="flex items-center">
        <Col>
          <img
            className="border-solid border-2 border-gray-300 rounded-full w-20 h-20"
            src={`${API}/${data.shop.avatarShop}`}
            alt={data.shop.nameShop}
          />
        </Col>
        <Col flex="auto">
          <p className="text-lg font-semibold">{data.shop.nameShop}</p>
          <div className="mt-2 space-y-1">
            <div className="flex items-center">
              <CiShop className="text-lg mr-2" />
              <p className="mr-2">Sản phẩm:</p>
              <span className="text-red-500">{data.products.length}</span>
            </div>
            <div className="flex items-center">
              <SlUserFollow className="text-lg mr-2" />
              <p className="mr-2">Người theo dõi:</p>
              <span className="text-red-500">{data.shop.follower.length}</span>
            </div>
            <div className="flex items-center">
              <MdOutlineLocalPhone className="text-lg mr-2" />
              <p className="mr-2">Số điện thoại:</p>
              <span className="text-red-500">0{data.shop.phoneNumberShop}</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt-4">
        <Col span={12}>
          <Button type="primary" className="w-full " onClick={handleFollow}>
            {checkFollower ? "Bỏ theo dõi" : "Theo dõi"}
          </Button>
        </Col>
        <Col span={12}>
          <Button className="w-full flex justify-center items-center ">
            <IoMdChatbubbles className="mr-2" />
            Chat
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderShop;
