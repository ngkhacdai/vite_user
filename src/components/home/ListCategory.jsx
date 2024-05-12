import { SwiperSlide, Swiper } from "swiper/react";
import { API } from "../../service/customAxios";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "./home.css";

const ListCategory = ({ category }) => {
  return (
    <div className="bg-white p-2 mb-3">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
            type: "bullets",
          }}
          slidesPerView={6}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
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
        <button className="swiper-button-prev"></button>
        <button className="swiper-button-next"></button>
      </div>
    </div>
  );
};

export default ListCategory;
