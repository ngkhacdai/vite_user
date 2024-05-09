import { useEffect, useState } from "react";
import { getCart } from "../../service/cartAPI";
import { Affix, Spin, Table } from "antd";
import FooterCart from "./FooterCart";
import TableProduct from "./TableProduct";
import { useDispatch } from "react-redux";
import { onSelectProduct } from "../../redux/slice/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  localStorage.setItem("cart", cart._id);
  const getData = async () => {
    setCart(await getCart());
    dispatch(onSelectProduct([]));
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="w-3/4 m-auto">
      <div className=" mt-2 bg-white">
        <TableProduct
          cart={cart}
          setIsLoading={setIsLoading}
          getData={() => getData()}
        />
      </div>
      <div>
        <Affix className="w-full mt-2" offsetBottom={0}>
          <FooterCart />
        </Affix>
      </div>
    </div>
  );
};

export default Cart;
