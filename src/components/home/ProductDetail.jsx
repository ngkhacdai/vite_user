import { useEffect, useState } from "react";
import { getProduct } from "../../service/productAPI";
import { API } from "../../service/customAxios";
import { Col, Radio, Rate, Row } from "antd";

const ProductDetail = () => {
  const [ProductDetail, setProductDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [attribute, setAttribute] = useState("");
  const [options, setOptions] = useState([]);
  // console.log(ProductDetail);
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
    console.log(e.target.value);
    setOptions(e.target.value);
  };
  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <Row gutter={[10, 20]}>
        <Col xs={24} sm={20} md={18} lg={16} xl={12}>
          <div>
            <img
              src={`${API}/uploads/${ProductDetail.product_thumb[0]}`}
              style={{ width: 600, height: 500 }}
            />
            <div>
              <Row gutter={[10, 24]} justify="start" style={{ width: 700 }}>
                {ProductDetail.product_thumb.map((item, index) => {
                  if (index < 5) {
                    return (
                      <Col span={4} key={`product_thumb-${index}`}>
                        <img
                          src={`${API}/uploads/${item}`}
                          style={{ width: 100, height: 100 }}
                        />
                      </Col>
                    );
                  }
                })}
              </Row>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={20} md={18} lg={16} xl={12}>
          <div>
            <h2>{ProductDetail.product_name}</h2>
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
            <h2 style={{ color: "red" }}>{ProductDetail.product_price}đ</h2>
            <div>
              <Radio.Group onChange={onSelectAttributed}>
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
              <Radio.Group onChange={onSelectOption}>
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
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetail;
