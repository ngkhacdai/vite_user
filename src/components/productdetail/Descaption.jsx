import React from "react";
import { API } from "../../service/customAxios";

const Descaption = ({ ProductDetail }) => {
  return (
    <div className="bg-white mt-3 ">
      <div className="p-5">
        <h3 className="text-2xl mb-2">Chi tiết sản phẩm</h3>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {ProductDetail.product_description}
        </div>
        {ProductDetail.product_thumb.map((item, index) => {
          return (
            <div key={`descaption-${index}`}>
              <img src={`${API}/uploads/${item}`} className="mt-2 w-full" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Descaption;
