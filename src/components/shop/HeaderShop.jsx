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
  console.log(shopData);
  useEffect(() => {
    const findFollower = data.shop.follower.find(
      (item) => item === localStorage.getItem("userID")
    );
    if (findFollower) return setCheckFollower(true);
  }, []);
  const handleFollow = async () => {
    await followShop(data.shop._id)
      .then(async () => {
        setCheckFollower(!checkFollower);
        setData(await getShop(window.location.pathname.split("/")[2]));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-3/4 m-auto py-2 flex justify-between">
      <div className="w-1/3 bg-slate-400 p-2">
        <div>
          <Row className="flex items-center">
            <Col>
              <img
                className="border-solid border-2 border-black rounded-full w-24 h-24 mr-2"
                src={`${API}/${data.shop.avatarShop}`}
              />
            </Col>
            <Col>
              <p>{data.shop.nameShop}</p>
            </Col>
          </Row>
        </div>
        <Row justify="space-between">
          <Col
            xs={{
              flex: 24,
            }}
            sm={{
              flex: 10,
            }}
            md={{
              flex: 10,
            }}
            lg={{
              flex: 10,
            }}
            xl={{
              flex: 10,
            }}
          >
            <Button className="w-full" onClick={() => handleFollow()}>
              {checkFollower ? <p>Bỏ theo dõi</p> : <p>Theo dõi</p>}
            </Button>
          </Col>
          <Col
            xs={{
              flex: 24,
            }}
            sm={{
              flex: 10,
            }}
            md={{
              flex: 10,
            }}
            lg={{
              flex: 10,
            }}
            xl={{
              flex: 10,
            }}
          >
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
            <span className="text-red-500">{data.products.length}</span>
          </div>
          <br />
          <div className="flex items-center">
            <SlUserFollow />
            <p className="mx-2">Người theo dõi: </p>
            <span className="text-red-500">{data.shop.follower.length}</span>
          </div>
          <br />
        </div>
        <div className="flex items-center">
          <MdOutlineLocalPhone />
          <p className="mx-2">Số điện thoại: </p>
          <span className="text-red-500">0{data.shop.phoneNumberShop}</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderShop;
