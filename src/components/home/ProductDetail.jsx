import { useEffect, useState } from "react";
import { getProduct } from "../../service/productAPI";
import { API } from "../../service/customAxios";
import { Button, Col, Radio, Rate, Row } from "antd";
import axios from "../../service/customAxios";
import { ToastContainer, toast } from "react-toastify";

const ProductDetail = () => {
  const [ProductDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attribute, setAttribute] = useState("");
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(1);
  useEffect(() => {
    const getData = async () => {
      setProductDetail(
        await getProduct(window.location.pathname.split("/")[2])
      );
      setIsLoading(false);
    };
    getData();
  }, []);
  const onSelectAttributed = (e) => {
    setAttribute(e.target.value);
  };
  const onSelectOption = (e) => {
    setOptions(e.target.value);
  };
  const addToCart = async () => {
    if (!attribute || !options) {
      return toast.error("Hãy chọn các thuộc tính để thêm vào giỏ hàng");
    }
    const form = {
      userId: localStorage.getItem("userID"),
      product: {
        productId: window.location.pathname.split("/")[2],
        shopId: ProductDetail.shop_id,
        quantity: count,
        name: ProductDetail.product_name,
        price: ProductDetail.product_price,
        color: attribute.color,
        size: options.size,
      },
    };
    await axios.post("/cartv2", form).then(() => {
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    });
  };
  const countIncrement = () => {
    console.log();
    if (count < options.options_quantity) {
      setCount(count + 1);
    }
  };
  const countDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <div className="bg-white mt-3 w-11/12 m-auto">
        <Row gutter={[10, 20]}>
          <Col xs={24} sm={24} md={24} lg={24} xl={11}>
            <div>
              <img
                src={`${API}/uploads/${ProductDetail.product_thumb[0]}`}
                className="h-96 w-full"
              />
              <div>
                <Row
                  gutter={[10, 24]}
                  className="mt-2"
                  justify="start"
                  style={{ width: 700 }}
                >
                  {ProductDetail.product_thumb.map((item, index) => {
                    if (index < 5) {
                      return (
                        <Col span={4} key={`product_thumb-${index}`}>
                          <img
                            src={`${API}/uploads/${item}`}
                            className="h-24 w-24"
                          />
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={18} md={16} lg={24} xl={11}>
            <div className="ml-3">
              <h2 className="text-2xl font-bold">
                {ProductDetail.product_name}
              </h2>
              <br />
              <div>
                <span>{ProductDetail.product_ratingAverage}</span>
                <span>
                  <Rate
                    allowHalf
                    defaultValue={ProductDetail.product_ratingAverage}
                    disabled
                  />
                </span>
                <span>{ProductDetail.reviews.length}</span>
                <span> Đánh giá</span>
                <span>{ProductDetail.product_sold}</span>
                <span>Đã bán</span>
              </div>
              <br />
              <h2 className="text-xl text-red-500 font-bold ">
                {ProductDetail.product_price}đ
              </h2>
              <br />
              <div>
                <Radio.Group
                  defaultValue={attribute.color}
                  onChange={onSelectAttributed}
                >
                  {ProductDetail.product_attributes.map((item, index) => {
                    return (
                      <Radio.Button key={`attribute-${index}`} value={item}>
                        {item.color}
                      </Radio.Button>
                    );
                  })}
                </Radio.Group>
              </div>
              <br />
              <div>
                <Radio.Group
                  defaultValue={options.size}
                  onChange={onSelectOption}
                >
                  {attribute &&
                    attribute.options.map((item, index) => {
                      return (
                        <Radio.Button key={`options-${index}`} value={item}>
                          {item.size}
                        </Radio.Button>
                      );
                    })}
                </Radio.Group>
              </div>
              <br />
              <div>Số lượng hàng còn lại: {options.options_quantity}</div>
            </div>
            <br />
            <div>
              <Button onClick={countDecrement}>-</Button>
              <span className="mx-5">{count}</span>
              <Button onClick={countIncrement}>+</Button>
            </div>
            <br />
            <div>
              <Button onClick={addToCart} type="primary" className="mr-3 ">
                Thêm vào giỏ hàng
              </Button>
              <Button
                className="bg-red-600 text-white hover:bg-red-700"
                type="default"
              >
                Mua ngay
              </Button>
            </div>
          </Col>
        </Row>
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
