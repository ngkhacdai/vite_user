import { NavLink } from "react-router-dom";
import { API } from "../service/customAxios";
import { Col, Row } from "antd";

const ListProduct = ({ product }) => {
  return (
    <div className="px-2">
      <Row justify="start">
        {product && product.length > 0 ? (
          product.map((item, index) => (
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={4}
              xl={4}
              key={`product-${index}`}
              className="p-2"
            >
              <div className="bg-white border border-transparent p-2 hover:drop-shadow-lg hover:border-green-500 transition">
                <NavLink
                  to={`/product/${item._id}`}
                  className="w-full hover:text-black"
                >
                  <img
                    alt={item.product_name}
                    className="w-full h-52 object-cover"
                    src={`${API}/uploads/${item.product_thumb[0]}`}
                  />
                  <div className="p-2">
                    <p
                      className="truncate"
                      style={{
                        lineHeight: "1.5em",
                        height: "2em",
                        overflow: "hidden",
                      }}
                    >
                      {item.product_name}
                    </p>
                    <Row justify="space-between">
                      <Col className="text-red-500">
                        {item.product_price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </Col>
                      <Col>Đã bán: {item.product_sold}</Col>
                    </Row>
                  </div>
                </NavLink>
              </div>
            </Col>
          ))
        ) : (
          <p className="w-full text-center mt-2 text-xl">
            Không có sản phẩm nào
          </p>
        )}
      </Row>
    </div>
  );
};

export default ListProduct;
