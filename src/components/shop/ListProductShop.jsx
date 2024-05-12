import { NavLink } from "react-router-dom";
import { API } from "../../service/customAxios";
import { Col, Row } from "antd";

const ListProductShop = ({ shopData }) => {
  return (
    <div>
      <div className="w-3/4 m-auto mt-3">
        <Row className="bg-white p-2" gutter={[0, 10]}>
          {shopData.products.map((item, index) => {
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
                    className="w-full h-44"
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
    </div>
  );
};

export default ListProductShop;
