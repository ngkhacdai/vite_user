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
    setShowNavLink(productSelected.length > 0);
  }, [productSelected]);

  const checkoutHandler = () => {
    if (productSelected.length === 0) {
      return toast.error("Hãy chọn sản phẩm");
    }
    window.location.href = "/checkout";
  };

  return (
    <div className="bg-white w-full p-2">
      <Row gutter={[0, 20]} justify={"space-between"} className="items-center">
        <Col xs={24} md={12} className="mb-2 md:mb-0">
          <div className="flex flex-col md:flex-row md:items-center">
            <p className="pr-2 mb-1 md:mb-0">
              Tổng thanh toán ({productSelected.length} sản phẩm):{" "}
            </p>
            <span className="text-red-500 font-semibold text-2xl">
              {totalCart.toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          </div>
        </Col>
        <Col xs={24} md={12} className="flex justify-end">
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
            {showNavLink ? (
              <NavLink to="/checkout" className="w-full md:w-auto">
                <Button className="w-full md:w-48 h-11" type="primary">
                  Mua hàng
                </Button>
              </NavLink>
            ) : (
              <Button
                onClick={checkoutHandler}
                className="w-full md:w-48 h-11"
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
    </div>
  );
};

export default FooterCart;
