import {
  Button,
  Col,
  ConfigProvider,
  Modal,
  Radio,
  Row,
  notification,
} from "antd";
import axios from "../../service/customAxios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSelectIndex } from "../../redux/slice/addressSlice";

const Method = ({ address }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("Thanh toán khi nhận hàng");
  const productSelected = useSelector((state) => state.cart.selectProduct);
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectIndex = useSelector((state) => state.address.selectIndex);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Notification Error",
      description: content,
    });
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (address.length === 0) {
      openNotificationWithIcon("Hãy cập nhật địa chỉ trước");
      setIsModalOpen(false);
      return;
    }
    const shopOrderData = productSelected.map((item) => ({
      shopId: item.shopId,
      shop_discounts: [],
      item_products: [
        {
          price: item.price,
          quantity: item.quantity,
          productId: item.productId,
          color: item.color,
          size: item.size,
        },
      ],
    }));
    const orderData = {
      shop_order_ids: shopOrderData,
      user_address: {
        Home: address[selectIndex]?.nameAddress,
        Address: address[selectIndex]?.customAddress,

        Username: address[selectIndex]?.userinfor?.userName,

        Phonenumber: address[selectIndex]?.userinfor?.phoneNumber,
      },
      user_payment: value,
    };
    await axios
      .post("/checkout/oder", orderData)
      .then(() => {
        window.location.href = "/user/order";
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(onSelectIndex(0));
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useState(() => {
    let tong = 0;
    productSelected.map((item) => {
      tong = item.price * item.quantity + tong;
    });
    setTotal(tong);
  }, [productSelected]);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const payhandle = () => {
    showModal();
  };

  return (
    <div className="bg-white mt-2 p-2">
      {contextHolder}
      <Row gutter={[10, 10]} className="flex text-center py-2">
        <Col>
          <p className="text-xl  mr-3">Phương thức thanh toán</p>
        </Col>
        <Col>
          <Radio.Group onChange={onChange} value={value}>
            <Radio.Button value="Thanh toán khi nhận hàng">
              Thanh toán khi nhận hàng
            </Radio.Button>
            <Radio.Button value="Paypal">Paypal</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <div>
        <div className="flex justify-end">
          <p>Tổng tiền hàng:</p>
          <span className="w-48 text-right">
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <div className="flex justify-end">
          <p>Phí vận chuyển:</p>
          <span className="w-48 text-right">₫30,000</span>
        </div>
        <div className="flex justify-end">
          <p>Tổng tiền hàng:</p>
          <span className="w-48 text-right text-xl text-red-600">
            {(total + 30000).toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
      <Row gutter={[10, 10]} className="flex justify-between p-5 items-center">
        <Col>
          <p>
            Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo điều khoản
            của shop
          </p>
        </Col>
        <Col xs={24} md={12}>
          <ConfigProvider
            theme={{
              components: {
                Button: {
                  colorPrimary: "#00b96b",
                  algorithm: true,
                },
              },
            }}
          >
            <Button
              onClick={payhandle}
              className="w-full md:w-auto md:min-w-[14rem] h-12"
              type="primary"
            >
              Đặt hàng
            </Button>
          </ConfigProvider>
        </Col>
        <Modal
          title="Thanh toán"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Có"
          cancelText="Hủy"
        >
          <p>Bạn có muốn thanh toán không?</p>
        </Modal>
      </Row>
    </div>
  );
};

export default Method;
