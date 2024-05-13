import { Button, ConfigProvider, Radio, Rate } from "antd";
import axios from "../../service/customAxios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { onSelectProduct } from "../../redux/slice/cartSlice";
import { NavLink } from "react-router-dom";

const ProductInfo = ({ ProductDetail }) => {
  const dispatch = useDispatch();
  const [attribute, setAttribute] = useState("");
  const [options, setOptions] = useState([]);
  const [count, setCount] = useState(1);
  console.log(ProductDetail);
  const onSelectAttributed = (e) => {
    setCount(1);
    setAttribute(e.target.value);
  };
  const onSelectOption = (e) => {
    setCount(1);
    setOptions(e.target.value);
  };
  const payProduct = async () => {
    if (!attribute || !options) {
      return toast.error("Hãy chọn các thuộc tính để thêm vào giỏ hàng");
    }
    const form = [
      {
        productId: window.location.pathname.split("/")[2],
        shopId: ProductDetail.shop_id,
        quantity: count,
        name: ProductDetail.product_name,
        price: ProductDetail.product_price,
        color: attribute.color,
        size: options.size,
        product_thumb: ProductDetail.product_thumb[0],
        name_shop: ProductDetail.shop_name,
      },
    ];
    dispatch(onSelectProduct(form));
  };
  const addToCart = async () => {
    if (!attribute || !options) {
      return toast.error("Hãy chọn các thuộc tính để thêm vào giỏ hàng");
    }
    const form = {
      userId: localStorage.getItem("userID"),
      product: {
        productId: window.location.pathname.split("/")[2],
        shopId: ProductDetail.shop_id,
        quantity: count,
        name: ProductDetail.product_name,
        price: ProductDetail.product_price,
        color: attribute.color,
        size: options.size,
      },
    };
    await axios.post("/cartv2", form).then(() => {
      toast.success("Sản phẩm đã được thêm vào giỏ hàng");
    });
  };
  const countIncrement = () => {
    console.log();
    if (count < options.options_quantity) {
      setCount(count + 1);
    }
  };
  const countDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div>
      <div className="ml-3">
        <h2 className="text-2xl font-bold">{ProductDetail.product_name}</h2>
        <br />
        <div>
          <span>{ProductDetail.product_ratingAverage}</span>
          <span>
            <Rate
              allowHalf
              defaultValue={ProductDetail.product_ratingAverage}
              disabled
            />
          </span>
          <span>{ProductDetail.reviews.length}</span>
          <span> Đánh giá</span>
          <span>{ProductDetail.product_sold}</span>
          <span>Đã bán</span>
        </div>
        <br />
        <h2 className="text-xl text-red-500 font-bold ">
          {ProductDetail.product_price}đ
        </h2>
        <br />
        <div>
          <Radio.Group
            defaultValue={attribute.color}
            onChange={onSelectAttributed}
          >
            {ProductDetail.product_attributes.map((item, index) => {
              return (
                <Radio.Button key={`attribute-${index}`} value={item}>
                  {item.color}
                </Radio.Button>
              );
            })}
          </Radio.Group>
        </div>
        <br />
        <div>
          <Radio.Group defaultValue={options.size} onChange={onSelectOption}>
            {attribute &&
              attribute.options.map((item, index) => {
                return (
                  <Radio.Button key={`options-${index}`} value={item}>
                    {item.size}
                  </Radio.Button>
                );
              })}
          </Radio.Group>
        </div>
        <br />
        <div>Số lượng hàng còn lại: {options.options_quantity}</div>
      </div>
      <br />
      <div>
        <Button onClick={countDecrement}>-</Button>
        <span className="mx-5">{count}</span>
        <Button onClick={countIncrement}>+</Button>
      </div>
      <br />
      <div>
        <Button onClick={addToCart} type="primary" className="mr-3 ">
          Thêm vào giỏ hàng
        </Button>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "red",
                algorithm: true,
              },
            },
          }}
        >
          {!attribute || !options ? (
            <Button type="primary" onClick={payProduct}>
              Mua ngay
            </Button>
          ) : (
            <NavLink to="/checkout">
              <Button type="primary" onClick={payProduct}>
                Mua ngay
              </Button>
            </NavLink>
          )}
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ProductInfo;
