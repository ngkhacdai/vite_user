import { Button } from "antd";
import { API } from "../../service/customAxios";
import { NavLink } from "react-router-dom";
const ShopInfor = ({ ProductDetail }) => {
  return (
    <div className="bg-white mt-3 pb-2 w-full flex flex-row items-center">
      <div className="ml-2">
        <img
          className="w-24 h-24 rounded-full border-black border mt-3"
          src={`${API}/${ProductDetail.shop_avatar}`}
        />
      </div>
      <div className="ml-2">
        <p>{ProductDetail.shop_name}</p>
        <span>
          <Button className="mr-2 text-orange-500 hover:bg-orange-300">
            Chat ngay
          </Button>
          <NavLink to={`/shop/${ProductDetail.shop_id}`}>
            <Button>Xem Shop</Button>
          </NavLink>
        </span>
      </div>
    </div>
  );
};

export default ShopInfor;
