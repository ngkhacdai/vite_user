import { SwiperSlide, Swiper } from "swiper/react";
import { API } from "../../service/customAxios";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "./home.css";
const ListCategory = ({ category }) => {
  return (
    <div className="bg-white p-2 mb-3">
      <div>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          slidesPerView={6}
          spaceBetween={20}
          onSlideChange={() => console.log("slide change")}
        >
          {category.map((item, index) => {
            return (
              <SwiperSlide key={`category-${index}`}>
                <div>
                  <img
                    className="w-10 h-10 text-center"
                    src={`${API}/${item.category_thumb}`}
                    alt=""
                  />
                  <p>{item.category_name}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default ListCategory;
