import { useEffect, useState } from "react";
import { getShop } from "../../service/shopAPI";
import { Spin } from "antd";
import HeaderShop from "./HeaderShop";
import ListProductShop from "./ListProductShop";
import { getDiscountShop } from "../../service/discountAPI";
import ListDiscount from "./ListDiscount";

const Shop = () => {
  const [shopData, setShopData] = useState([]);
  const [shopDiscount, setShopDiscount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setShopData(await getShop(window.location.pathname.split("/")[2]));
    setShopDiscount(
      await getDiscountShop(window.location.pathname.split("/")[2])
    );
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div>
      <div className="bg-white">
        <HeaderShop shopData={shopData} />
      </div>
      <div className="md:w-3/4  mx-auto mt-2">
        <ListDiscount shopDiscount={shopDiscount} />
        <ListProductShop shopData={shopData} />
      </div>
    </div>
  );
};

export default Shop;
