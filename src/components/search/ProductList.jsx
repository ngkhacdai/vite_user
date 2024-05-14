import { Col, Row, Spin } from "antd";
import { NavLink } from "react-router-dom";
import { API } from "../../service/customAxios";
import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/productAPI";
import ListProduct from "../ListProduct";

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
    const pathParts = window.location.pathname.split("/")[2].split("search=");
    const encodedSearch = pathParts[1];
    const decodedSearch = decodeURIComponent(encodedSearch).toLowerCase();
    return decodedSearch;
  };
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="w-3/4 m-auto mt-3">
      <h3 className="text-xl">
        Kết quả tìm kiếm: "
        {window.location.pathname.split("/")[2].split("search=")[1]}"
      </h3>
      {productSearch.length === 0 ? (
        <div className="text-center">Không tìm thấy sản phẩm nào</div>
      ) : (
        <div>
          <ListProduct product={productSearch} />
        </div>
      )}
    </div>
  );
};

export default ProductList;
