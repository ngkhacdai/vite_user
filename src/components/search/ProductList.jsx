import { Col, Row, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { API } from "../../service/customAxios";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/productAPI";

const ProductList = () => {
  const [productSearch, setProductSearch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const product = await getAllProduct();
      setIsLoading(false);
      const searchText = handleSearch();
      setProductSearch(
        product.filter((product) =>
          product.product_name.toLowerCase().includes(searchText)
        )
      );
    };
    getData();
  }, []);
  const handleSearch = () => {
    const pathParts = window.location.pathname.split("/");
    const encodedSearch = pathParts[2];
    const decodedSearch = decodeURIComponent(encodedSearch).toLowerCase();
    return decodedSearch;
  };
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="w-3/4 m-auto mt-3">
      {productSearch.length === 0 ? (
        <div className="text-center">Không tìm thấy sản phẩm nào</div>
      ) : (
        <Row className="bg-white p-2" gutter={[0, 10]}>
          {productSearch.map((item, index) => {
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
      )}
    </div>
  );
};

export default ProductList;
