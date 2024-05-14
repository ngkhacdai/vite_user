import { useEffect, useState } from "react";
import { getAllProduct } from "../../service/productAPI";
import { Col, Row, Spin } from "antd";
import { API } from "../../service/customAxios";
import { NavLink } from "react-router-dom";
import { getAllCategory } from "../../service/category";
import ListCategory from "./ListCategory";
import ListProduct1 from "../ListProduct";
const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);
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
    <div className="md:w-3/4  mx-auto">
      <ListCategory category={category} />
      <ListProduct1 product={product} />
    </div>
  );
};

export default ListProduct;
