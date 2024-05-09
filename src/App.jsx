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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<ListProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user" element={<Account />}>
            <Route path="/user" element={<Profile />} />
            <Route path="/user/address" element={<Address />} />
            <Route path="/user/changepassword" element={<ChangePassword />} />
            <Route path="/user/order" element={<Order />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
