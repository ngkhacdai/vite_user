import { Button, Col, ConfigProvider, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const FooterCart = () => {
  const productSelected = useSelector((state) => state.cart.selectProduct);
  const [totalCart, setTotalCart] = useState(0);
  console.log(productSelected);
  useEffect(() => {
    let tong = 0;
    productSelected.map((item) => {
      let price = item.price * item.quantity;
      tong += price;
    });
    setTotalCart(tong);
  }, [productSelected]);
  const checkoutHandler = () => {
    if (productSelected.length === 0) {
      return toast.error("Hãy chọn sản phẩm");
    }
    const form = {
      cartId: localStorage.getItem("cart"),
      userId: localStorage.getItem("userID"),
      shop_order_ids: [],
    };
  };
  return (
    <div>
      <Row
        gutter={[0, 20]}
        justify={"end"}
        className="bg-white w-full h-24 items-center p-2 "
      >
        <Col>
          <div>
            <p>Tổng thanh toán ({productSelected.length} sản phẩm): </p>
            <span className="text-red-500 font text-2xl"> đ{totalCart}</span>
          </div>
        </Col>
        <Col>
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
              onClick={checkoutHandler}
              className="w-48 h-11"
              type="primary"
            >
              Mua hàng
            </Button>
          </ConfigProvider>
        </Col>
      </Row>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default FooterCart;
