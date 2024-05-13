import { Button, ConfigProvider, Modal, Radio, notification } from "antd";
import axios from "../../service/customAxios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onSelectIndex } from "../../redux/slice/addressSlice";

const Method = ({ address }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("Thanh toán khi nhận hàng");
  const productSelected = useSelector((state) => state.cart.selectProduct);
  console.log(productSelected);
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
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const payhandle = () => {
    showModal();
  };
  return (
    <div className="bg-white mt-2 p-2">
      {contextHolder}
      <div className="flex text-center">
        <p className="text-xl  mr-3">Phương thức thanh toán</p>
        <Radio.Group onChange={onChange} value={value}>
          <Radio.Button value="Thanh toán khi nhận hàng">
            Thanh toán khi nhận hàng
          </Radio.Button>
          <Radio.Button value="Paypal">Paypal</Radio.Button>
        </Radio.Group>
      </div>
      <div>
        <div className="flex justify-end">
          <p>Tổng tiền hàng:</p>
          <span className="w-48 text-right">₫{total}</span>
        </div>
        <div className="flex justify-end">
          <p>Phí vận chuyển:</p>
          <span className="w-48 text-right">₫{30000}</span>
        </div>
        <div className="flex justify-end">
          <p>Tổng tiền hàng:</p>
          <span className="w-48 text-right text-xl text-red-600">
            ₫{total + 30000}
          </span>
        </div>
      </div>
      <br />
      <hr />
      <div className="flex justify-between p-5 items-center">
        <p>
          Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo điều khoản
          của shop
        </p>
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
          <Button onClick={payhandle} className="w-56 h-12" type="primary">
            Đặt hàng
          </Button>
        </ConfigProvider>
        <Modal
          title="Thanh toán"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Bạn có muốn thanh toán không?</p>
        </Modal>
      </div>
    </div>
  );
};

export default Method;
