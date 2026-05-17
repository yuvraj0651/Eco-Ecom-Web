import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NewArrivalProThumb from "../../../../../assets/new-arrivals/product-img.webp";
import NewArrivalProThumbTwo from "../../../../../assets/new-arrivals/product-img-2.webp";
import NewArrivalProThumbThree from "../../../../../assets/new-arrivals/product-img-3.webp";
import NewArrivalProThumbFour from "../../../../../assets/new-arrivals/product-img-4.webp";
import NewArrivalProThumbFive from "../../../../../assets/new-arrivals/product-img-5.webp";
import LazyImage from "../../../../UI/LazyImage/LazyImage";

const newArrivalData = [
  {
    id: 1,
    image: NewArrivalProThumb,
    title: "Cashmere Sweater",
    colors: ["bg-slate-700", "bg-pink-600", "bg-red-700"],
    brand: "cream",
    price: 150,
    rating: 4.5,
    reviews: 75,
  },

  {
    id: 2,
    image: NewArrivalProThumbTwo,
    title: "Linen Blazer",
    colors: ["bg-stone-400", "bg-neutral-800", "bg-amber-700"],
    brand: "beige",
    price: 95,
    rating: 4.4,
    reviews: 60,
  },

  {
    id: 3,
    image: NewArrivalProThumbThree,
    title: "Velvet Skirt",
    colors: ["bg-red-900", "bg-rose-500", "bg-black"],
    brand: "wine red",
    price: 55,
    rating: 4.2,
    reviews: 45,
  },

  {
    id: 4,
    image: NewArrivalProThumbFour,
    title: "Wool Trench Coat",
    colors: ["bg-yellow-700", "bg-stone-600", "bg-zinc-900"],
    brand: "camel",
    price: 180,
    rating: 4.6,
    reviews: 80,
  },

  {
    id: 5,
    image: NewArrivalProThumbFive,
    title: "Transparent Sea Polish",
    colors: ["bg-cyan-400", "bg-blue-500", "bg-white"],
    brand: "white",
    price: 45,
    rating: 4.1,
    reviews: 110,
  },
];

const NewArrivals = () => {
  return (
    <section className="new-arrivals pt-5 pb-10 lg:section-padding">
      <div className="container mx-auto px-8 lg:px-2">
        <div className="new-arrivals__wrapper">
          <div className="new-arrivals__top-section flex lg:items-center flex-col lg:flex-row lg:justify-between">
            <div className="new-arrivals__text">
              <h4 className="new-arrivals__title font-medium tracking-wide leading-7 lg:leading-[2.5rem] text-[1.27rem] lg:text-[2rem] dark:text-white">
                New Arrivals.{" "}
                <span className="text-gray-500 dark:text-white">New Sports equipments</span>
              </h4>
            </div>
            <div className="new-arrivals__buttons-grid flex items-center justify-end gap-1">
              <div className="new-arrivals__prev-button">
                <button aria-label="Previous Button" className="prev-btn border border-[#ccc] shadow-sm w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:bg-black hover:text-white dark:bg-slate-900 dark:border-slate-500">
                  <HiOutlineArrowNarrowLeft className="text-[1.1rem] dark:text-white" />
                </button>
              </div>
              <div className="new-arrivals__next-button">
                <button aria-label="Next Button" className="next-btn border border-[#ccc] shadow-sm w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:bg-black hover:text-white dark:bg-slate-900 dark:border-slate-500">
                  <HiOutlineArrowNarrowRight className="text-[1.1rem] dark:text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="new-arrivals__bottom-section pt-10 pb-5">
            <div className="new-arrivals__products-grid">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={4}
                loop={false}
                speed={800}
                grabCursor={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: ".prev-btn",
                  nextEl: ".next-btn",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1.2,
                    spaceBetween: 12,
                  },
                  480: {
                    slidesPerView: 1.5,
                    spaceBetween: 14,
                  },

                  640: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },

                  768: {
                    slidesPerView: 2.5,
                    spaceBetween: 18,
                  },

                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 16,
                  },

                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
              >
                {newArrivalData.map((product) => (
                  <SwiperSlide key={product?.id}>
                    <div className="new-arrivals__product-card border border-[#ccc] shadow-sm p-1 rounded-md dark:bg-slate-700 dark:border-slate-500">
                      <div className="new-arrivals__product-thumb">
                        <LazyImage
                          src={product?.image}
                          alt="New Arrival Product Thumb"
                          className="w-full h-auto object-cover"
                        />
                      </div>
                      <div className="new-arrivals__product-content p-4 space-y-3">
                        <div className="new-arrivals__product-color-grid flex items-center gap-2">
                          {product?.colors?.map((color, index) => (
                            <div key={index} className={`new-arrival__color-block cursor-pointer rounded-full p-[0.1rem] 
                            ${index === 0 ? "ring-2 ring-slate-900 dark:ring-white" : ""}`}>
                              <div className={`product-color border border-[#ccc] w-[1.4rem] h-[1.4rem] rounded-full shadow-sm ${color}`}></div>
                            </div>
                          ))}
                        </div>
                        <div className="new-arrival__product-text py-2">
                          <h4 className="product-title capitalize font-medium tracking-wide text-[0.9rem] lg:text-[1rem] dark:text-white">
                            {product?.title}
                          </h4>
                          <div className="product-brand capitalize py-1 tracking-wide font-medium text-gray-600 text-[0.9rem] dark:text-amber-500">
                            {product?.brand}
                          </div>
                        </div>
                        <div className="new-arrival__product__product-meta flex items-center justify-between">
                          <div className="new-arrival__product-price border-2 border-green-600 dark:border-white py-[0.1rem] px-3 rounded-full">
                            <span className="text-green-700 font-medium tracking-wide text-[0.85rem] dark:text-white">
                              ${(product?.price).toFixed(2)}
                            </span>
                          </div>
                          <div className="new-arrival__product-rating flex items-center gap-1">
                            <span className="text-[0.9rem] font-medium tracking-wide dark:text-white">
                              ⭐ {product?.rating}
                            </span>
                            <span className="text-[0.9rem] font-medium tracking-wide dark:text-white">
                              ({product?.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
