import { useEffect, useState } from "react";
import { getProduct } from "../../service/productAPI";
import { Col, Row, Spin } from "antd";
import { ToastContainer } from "react-toastify";
import ImageProductDetail from "./ImageProductDetail";
import ShopInfor from "./ShopInfor";
import Descaption from "./Descaption";
import ProductInfo from "./ProductInfo";

const ProductDetail = () => {
  const [ProductDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      setProductDetail(
        await getProduct(window.location.pathname.split("/")[2])
      );
      setIsLoading(false);
    };
    getData();
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      <div className="bg-white mt-3 w-3/4 m-auto h-128">
        <Row className="bg-white p-2">
          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
            <ImageProductDetail ProductDetail={ProductDetail} />
          </Col>
          <Col className="pl-2" xs={24} sm={18} md={16} lg={24} xl={11}>
            <ProductInfo ProductDetail={ProductDetail} />
          </Col>
        </Row>
        <div>
          <ShopInfor ProductDetail={ProductDetail} />
        </div>
        <div>
          <Descaption ProductDetail={ProductDetail} />
        </div>
      </div>
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
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
