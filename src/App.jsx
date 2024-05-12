import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import ListProduct from "./components/home/ListProduct";
import ProductDetail from "./components/productdetail/ProductDetail";
import Login from "./components/login/Login";
import Cart from "./components/cart/Cart";
import Account from "./components/user/Account";
import Profile from "./components/user/Profile";
import Address from "./components/user/Address";
import ChangePassword from "./components/user/ChangePassword";
import Order from "./components/user/Order";
import CheckOut from "./components/checkout/CheckOut";
import Pending from "./components/user/order/Pending";
import Confirmed from "./components/user/order/Confirmed";
import Shipped from "./components/user/order/Shipped";
import Cancelled from "./components/user/order/Cancelled";
import Delivered from "./components/user/order/Delivered";
import Shop from "./components/shop/Shop";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!isLogin && localStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, [isLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<ListProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/user" element={<Account />}>
            <Route path="/user" element={<Profile />} />
            <Route path="/user/address" element={<Address />} />
            <Route path="/user/changepassword" element={<ChangePassword />} />
            <Route path="/user/order" element={<Order />}>
              <Route path="/user/order" element={<Pending />} />
              <Route path="/user/order/confirmed" element={<Confirmed />} />
              <Route path="/user/order/shipped" element={<Shipped />} />
              <Route path="/user/order/cancelled" element={<Cancelled />} />
              <Route path="/user/order/delivered" element={<Delivered />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
