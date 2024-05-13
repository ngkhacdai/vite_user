import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/productAPI";
import { Col, Row, Spin } from "antd";
import { API } from "../../service/customAxios";
import { NavLink } from "react-router-dom";
import { getAllCategory } from "../../service/category";
import ListCategory from "./ListCategory";

const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
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
    return <Spin fullscreen />;
  }
  return (
    <div className="w-3/4 m-auto mt-3">
      <ListCategory category={category} />
      <Row className="bg-white p-2" gutter={[0, 10]}>
        {product.map((item, index) => {
          return (
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={4}
              className="p-1"
              key={`product-${index}`}
            >
              <NavLink to={`/product/${item._id}`} className=" w-full">
                <img
                  alt=""
                  className="w-full"
                  src={`${API}/uploads/${item.product_thumb[0]}`}
                />
                <p
                  style={{
                    lineHeight: " 1.5em",
                    height: "3em",
                    overflow: "hidden",
                  }}
                >
                  {item.product_name}
                </p>
                <p>{`${item.product_price}`}</p>
              </NavLink>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default ListProduct;
