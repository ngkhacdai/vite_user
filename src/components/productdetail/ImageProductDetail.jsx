import { API } from "../../service/customAxios";
import { Col, Row } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
const ImageProductDetail = ({ ProductDetail }) => {
  return (
    // <div>
    //   <div>
    //     <img
    //       src={`${API}/uploads/${ProductDetail.product_thumb[0]}`}
    //       className="h-96 w-full"
    //     />
    //     <div>
    //       <Row
    //         gutter={[10, 24]}
    //         className="mt-2"
    //         justify="start"
    //         style={{ width: 700 }}
    //       >
    //         {ProductDetail.product_thumb.map((item, index) => {
    //           if (index < 5) {
    //             return (
    //               <Col span={4} key={`product_thumb-${index}`}>
    //                 <img src={`${API}/uploads/${item}`} className="h-24 w-24" />
    //               </Col>
    //             );
    //           }
    //         })}
    //       </Row>
    //     </div>
    //   </div>
    // </div>
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      onSwiper={(swiper) => console.log(swiper)}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
    >
      {ProductDetail.product_thumb.map((item, index) => {
        return (
          <SwiperSlide span={4} key={`product_thumb-${index}`}>
            <img src={`${API}/uploads/${item}`} className="h-128 w-full" />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default ImageProductDetail;
