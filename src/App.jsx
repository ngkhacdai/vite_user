import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import ListProduct from "./components/home/ListProduct";
import ProductDetail from "./components/home/ProductDetail";
import Login from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<ListProduct />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
