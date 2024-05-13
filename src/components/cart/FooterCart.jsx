import { Button, Col, ConfigProvider, Row } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const FooterCart = () => {
  const productSelected = useSelector((state) => state.cart.selectProduct);
  const [totalCart, setTotalCart] = useState(0);
  const [showNavLink, setShowNavLink] = useState(false);

  useEffect(() => {
    let tong = 0;
    productSelected.forEach((item) => {
      let price = item.price * item.quantity;
      tong += price;
    });
    setTotalCart(tong);

    // Kiểm tra xem có đủ sản phẩm được chọn hay không để hiển thị NavLink
    setShowNavLink(productSelected.length > 0);
  }, [productSelected]);

  const checkoutHandler = () => {
    if (productSelected.length === 0) {
      return toast.error("Hãy chọn sản phẩm");
    }
    window.location.href = "/checkout";
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
            {showNavLink && (
              <NavLink to="/checkout">
                <Button className="w-48 h-11" type="primary">
                  Mua hàng
                </Button>
              </NavLink>
            )}
            {!showNavLink && (
              <Button
                onClick={checkoutHandler}
                className="w-48 h-11"
                type="primary"
              >
                Mua hàng
              </Button>
            )}
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
