import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/productAPI";
import { Card, Col, Row } from "antd";
import Meta from "antd/es/card/Meta";
import { API } from "../../service/customAxios";
import { NavLink } from "react-router-dom";
import { getAllCategory } from "../../service/category";
import ListCategory from "./ListCategory";

const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
  console.log(category);
  console.log(product);
  useEffect(() => {
    const getData = async () => {
      setProduct(await getAllProduct());
      setCategory(await getAllCategory());
      setIsLoading(false);
    };
    getData();
  }, []);
  if (isLoading) {
    return <div>...Loading</div>;
  }
  return (
    <div className="w-3/4 m-auto mt-3">
      <ListCategory category={category} />
      <Row className="bg-white p-2" gutter={[0, 10]}>
        {product.map((item, index) => {
          return (
            <Col span={5} className="m-2" key={`product-${index}`}>
              <NavLink to={`/product/${item._id}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt=""
                      style={{
                        width: 240,
                        height: 200,
                      }}
                      src={`${API}/uploads/${item.product_thumb[0]}`}
                    />
                  }
                >
                  <Meta
                    title={item.product_name}
                    description={`${item.product_price}đ`}
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
