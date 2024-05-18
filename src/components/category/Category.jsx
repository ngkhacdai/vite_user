import { useEffect, useState } from "react";
import { Spin } from "antd";
import ListProduct from "../ListProduct";
import { getProductByCategory } from "../../service/productAPI";
import { useLocation, useSearchParams } from "react-router-dom";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("id");
    console.log(category);
    setCategoryData(await getProductByCategory(searchParams.get("id")));
    setIsLoading(false);
  };
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("category"));
  const { state } = useLocation();
  console.log(state);
  useEffect(() => {
    getData();
  }, []);
  //   if (isLoading) {
  //     return <Spin fullscreen />;
  //   }
  return (
    <div className="md:w-3/4 mx-auto">
      <p>Danh mục: {searchParams.get("name")}</p>
      <ListProduct product={categoryData} />
    </div>
  );
};

export default Category;
