import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import FeaturedMainImage from "../../../../../assets/featuredProduct/main-image.webp";
import FeaturedSubImageOne from "../../../../../assets/featuredProduct/sub-1.webp";
import FeaturedSubImageTwo from "../../../../../assets/featuredProduct/sub-2.webp";
import FeaturedSubImageThree from "../../../../../assets/featuredProduct/sub-3.webp";
import LazyImage from "../../../../UI/LazyImage/LazyImage";
import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../../../../services/FeaturedProApi";
import { Link } from "react-router";

const FeaturedProducts = () => {
  const { data = [] } = useQuery({
    queryKey: ["featuredPro"],
    queryFn: getFeaturedProducts,
  });

  return (
    <section className="featured-products pb-10 lg:section-padding">
      <div className="container mx-auto px-8 lg:px-2">
        <div className="featured-products__wrapper">
          <div className="featured-products__top-section flex lg:items-center flex-col lg:flex-row lg:justify-between">
            <div className="new-arrivals__text">
              <h4 className="new-arrivals__title font-medium tracking-wide leading-7 lg:leading-[2.5rem] text-[1.27rem] lg:text-[2rem] dark:text-white">
                Chosen by experts.{" "}
                <span className="text-gray-500 dark:text-white">Featured of the week</span>
              </h4>
            </div>
            <div className="new-arrivals__buttons-grid flex items-center justify-end gap-1">
              <div className="new-arrivals__prev-button">
                <button
                  aria-label="Previous Button"
                  className="prev-button border border-[#ccc] shadow-sm w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:bg-black hover:text-white dark:border-slate-500 dark:bg-slate-900"
                >
                  <HiOutlineArrowNarrowLeft className="text-[1.1rem] dark:text-white" />
                </button>
              </div>
              <div className="new-arrivals__next-button">
                <button
                  aria-label="Next Button"
                  className="next-button border border-[#ccc] shadow-sm w-9 h-9 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:bg-black hover:text-white dark:border-slate-500 dark:bg-slate-900"
                >
                  <HiOutlineArrowNarrowRight className="text-[1.1rem] dark:text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="featured-products__bottom-section pt-10">
            <div className="featured-products__items-grid">
              <Swiper
                modules={[Navigation]}
                spaceBetween={16}
                slidesPerView={3}
                loop={false}
                speed={800}
                grabCursor={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                navigation={{
                  prevEl: ".prev-button",
                  nextEl: ".next-button",
                }}
                breakpoints={{
                  320: {
                    slidesPerView: 1,
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
                    spaceBetween: 20,
                  },

                  1280: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
              >
                {data.map((item) => (
                  <SwiperSlide key={item?.id}>
                    <Link to={`/shop/${item.id}`}>
                      <div className="featured-products__item-card cursor-pointer border border-[#ccc] shadow-sm p-2 rounded-md bg-slate-50 dark:bg-slate-700 dark:border-slate-500">
                        <div className="featured-products__images">
                          <div className="featured-products__item-thumb border border-[#ccc] shadow-sm rounded-md p-2 bg-white">
                            <LazyImage
                              src={item?.thumbnail}
                              alt="Featured Main Image"
                              className="w-full max-h-[330px] h-full object-cover rounded-md cursor-pointer"
                            />
                          </div>
                          <div className="featured-products__sub-images-grid grid grid-cols-3 gap-2 mt-2">
                            {item?.subImages?.map((image, index) => (
                              <div
                                key={index}
                                className="featured-products__sub-image border border-[#ccc] shadow-sm p-2 rounded-md bg-white"
                              >
                                <LazyImage
                                  src={image}
                                  alt="Featured Sub Image One"
                                  className="w-full max-h-[100px] h-full object-cover rounded-md cursor-pointer"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="new-arrivals__product-content pt-5 pb-4 px-2 space-y-3">
                          <div className="new-arrival__product-text">
                            <h4 className="product-title capitalize font-medium tracking-wide text-[0.9rem] dark:text-white">
                              {item?.title}
                            </h4>
                            <div className="product-brand tracking-wide capitalize font-medium text-gray-600 text-[0.9rem] dark:text-white">
                              {item?.category}
                            </div>
                          </div>
                          <div className="new-arrival__product__product-meta flex items-center justify-between">
                            <div className="new-arrival__product-price border-2 border-green-600 dark:border-white py-[0.1rem] px-3 rounded-full">
                              <span className="text-green-700 font-medium tracking-wide text-[0.85rem] dark:text-white">
                                ${(item?.price).toFixed(2)}
                              </span>
                            </div>
                            <div className="new-arrival__product-rating flex items-center gap-1">
                              <span className="text-[0.9rem] font-medium tracking-wide dark:text-white">
                                ⭐ {(item?.rating).toFixed(1) || 0}
                              </span>
                              <span className="text-[0.9rem] font-medium tracking-wide dark:text-white">
                                ({(item?.reviews).length || 0} reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
                <SwiperSlide>
                  <div className="new-arrival__explore-more">
                    <Link to="/shop">
                      <div className="new-arrival__explore-box py-[16.3rem] border border-[#ccc] shadow-sm bg-slate-50 flex flex-col items-center justify-center transition-all duration-300 hover:bg-slate-100 cursor-pointer">
                        <h4 className="capitalize font-medium text-[1rem] tracking-wide flex items-center gap-1">
                          More Items
                          <HiOutlineArrowNarrowRight />
                        </h4>
                        <p className="capitalize tracking-wide font-medium pt-1 text-[0.9rem] text-gray-700">
                          Show me more
                        </p>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
