import { Col, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/productAPI";
import ListProduct from "../ListProduct";
import Fillter from "./Fillter";

const ProductList = () => {
  const [productSearch, setProductSearch] = useState([]);
  const [product, setProduct] = useState([]);
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
      setProduct(
        product.filter((product) =>
          product.product_name.toLowerCase().includes(searchText)
        )
      );
    };
    getData();
  }, []);

  const handleSearch = () => {
    const pathParts = window.location.pathname.split("/")[1].split("search=");
    const encodedSearch = pathParts[1];
    const decodedSearch = decodeURIComponent(encodedSearch).toLowerCase();
    return decodedSearch;
  };

  const sortProduct = (sortedProducts) => {
    setProductSearch([...sortedProducts]);
  };

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <div>
      <Row
        gutter={[0, 10]}
        justify="space-between"
        className="flex items-center"
      >
        <Col className="text-xl">
          Kết quả tìm kiếm:
          {'"' +
            window.location.pathname.split("/")[1].split("search=")[1] +
            '"'}
        </Col>
        <Col>
          <Fillter productSearch={product} sortProduct={sortProduct} />
        </Col>
      </Row>
      {productSearch.length === 0 ? (
        <div className="text-center">Không tìm thấy sản phẩm nào</div>
      ) : (
        <ListProduct product={productSearch} />
      )}
    </div>
  );
};

export default ProductList;
