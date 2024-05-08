import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/productAPI";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { API } from "../../service/customAxios";
import { NavLink } from "react-router-dom";

const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(product);
  useEffect(() => {
    const getData = async () => {
      setProduct(await getAllProduct());
      setIsLoading(false);
    };
    getData();
  }, []);
  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div>
      <Row gutter={[10, 24]}>
        {product.map((item, index) => {
          return (
            <Col span={4} key={`product-${index}`}>
              <NavLink to={`/product/${item._id}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <img
                      alt=""
                      style={{
                        width: 240,
                        height: 300,
                      }}
                      src={`${API}/uploads/${item.product_thumb[0]}`}
                    />
                  }
                >
                  <Meta
                    title="Europe Street beat"
                    description="www.instagram.com"
                  />
                </Card>
              </NavLink>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ListProduct;
