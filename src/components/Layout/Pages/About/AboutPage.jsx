import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Breadcrumb from "../../../UI/Breadcrumb/Breadcrumb";
import BannerThumb from "../../../../assets/about/about-banner-img.webp";
import { LuTreePalm } from "react-icons/lu";
import FounderThumbOne from "../../../../assets/about/about-founder-1.webp";
import FounderThumbTwo from "../../../../assets/about/about-founder-2.webp";
import FounderThumbThree from "../../../../assets/about/about-founder-3.webp";
import FounderThumbFour from "../../../../assets/about/about-founder-4.webp";
import AboutBannerLogo from "../../../../assets/logo/web-logo.png";
import AboutBannerDarkLogo from "../../../../assets/logo/dark-logo.png";
import AboutPromoThumb from "../../../../assets/about/about-promo-img.webp";
import LazyImage from "../../../UI/LazyImage/LazyImage";
import { useContext } from "react";
import ThemeContext from "../../../context/Theme/ThemeContext";
import TestimonialThumb from "../../../../assets/about/testimonial-img.webp";
import LeftQuote from "../../../../assets/about/qoute-l.webp";
import RightQuote from "../../../../assets/about/qoute-r.webp";
import TestFloatingImgOne from "../../../../assets/about/test-floting-img-1.webp";
import TestFloatingImgTwo from "../../../../assets/about/test-floating-img-2.webp";
import TestFloatingImgThree from "../../../../assets/about/test-floating-img-3.webp";
import TestFloatingImgFour from "../../../../assets/about/test-floating-img-4.webp";
import TestFloatingImgFive from "../../../../assets/about/test-floating-img-5.webp";
import TestFloatingImgSix from "../../../../assets/about/test-floating-img-6.webp";

const FounderData = [
  {
    id: 1,
    image: FounderThumbOne,
    name: "Niamh O'Shea",
    description: "Co-founder and Chief Executive",
  },
  {
    id: 2,
    image: FounderThumbTwo,
    name: "Danien Jame",
    description: "Co-founder and Chief Executive",
  },
  {
    id: 3,
    image: FounderThumbThree,
    name: "Orla Dwyer",
    description: "Co-founder, Chairman",
  },
  {
    id: 4,
    image: FounderThumbFour,
    name: "Dara Frazier",
    description: "Co-Founder, Chief Strategy Officer",
  },
];

const FactsData = [
  {
    id: 1,
    title: "10 million",
    description:
      "Articles have been public around the world (as of Sept. 30, 2025)",
  },
  {
    id: 2,
    title: "100,000",
    description:
      "Registered users account and active users (as of Sept. 30, 2025)",
  },
  {
    id: 3,
    title: "220+",
    description:
      "Countries and regions have our presence (as of Sept. 30, 2025)",
  },
];

const testimonialData = [
  {
    id: 1,
    name: "tiana abie",
    description:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
  {
    id: 2,
    name: "lenie swiffan",
    description:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
  {
    id: 3,
    name: "breta emilli",
    description:
      "Great quality products, affordable prices, fast and friendly delivery. I very recommend.",
  },
];

const aboutBannerData = {
  title: "👋 about us.",
  description:
    "We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world.",
  image: BannerThumb,
  imageAlt: "About Us Banner Thumb",
};

const floatingImages = [
  {
    id: 1,
    image: TestFloatingImgOne,
    alt: "Testimonial Floating Image One",
    className: "lg:w-[3rem] absolute top-9 left-0",
  },

  {
    id: 2,
    image: TestFloatingImgTwo,
    alt: "Testimonial Floating Image Two",
    className: "lg:w-[3rem] absolute bottom-[120px] right-[110%]",
  },

  {
    id: 3,
    image: TestFloatingImgThree,
    alt: "Testimonial Floating Image Three",
    className: "lg:w-[3rem] absolute top-full left-[140px]",
  },

  {
    id: 4,
    image: TestFloatingImgFour,
    alt: "Testimonial Floating Image Four",
    className: "lg:w-[3rem] absolute right-[140px] -bottom-3",
  },

  {
    id: 5,
    image: TestFloatingImgFive,
    alt: "Testimonial Floating Image Five",
    className: "lg:w-[3rem] absolute right-0 top-10",
  },

  {
    id: 6,
    image: TestFloatingImgSix,
    alt: "Testimonial Floating Image Six",
    className: "lg:w-[3rem] absolute left-[110%] bottom-[120px]",
  },
];

const AboutPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="about pt-5 pb-8 bg-[#f9f9f9] dark:bg-slate-700">
      <div className="container mx-auto px-6 lg:px-1">
        <div className="about__wrapper">
          <div className="about__breadcrumb">
            <Breadcrumb />
          </div>
          <div className="about__banner grid grid-cols-1 md:grid-cols-2 items-center gap-y-8 lg:gap-7 pt-5 pb-10">
            <div className="about__banner-text space-y-2 lg:space-y-4 relative overflow-visible">
              <div className="pointer-events-none absolute left-0 -top-5 lg:top-0 lg:left-0 h-[180px] w-[250px] lg:w-[300px] rounded-full bg-pink-200 dark:bg-emerald-300/40 opacity-40 lg:opacity-60 blur-[100px]" />
              <h4 className="about__banner-title tracking-wide text-center md:text-left font-semibold text-[1.5rem] lg:text-4xl capitalize relative z-30 dark:text-white">
                {aboutBannerData?.title}
              </h4>
              <p className="about__banner-description text-center md:text-left leading-relaxed tracking-wide text-[0.9rem] lg:text-[0.95rem] text-gray-700 lg:pt-1 relative z-30 dark:text-white">
                {aboutBannerData?.description}
              </p>
            </div>
            <div className="about__banner-thumb">
              <LazyImage
                src={aboutBannerData?.image}
                alt={aboutBannerData?.imageAlt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="about__founder-grid">
            <div className="about__founder-text">
              <div className="about__founder-title flex items-center gap-[0.2rem] lg:gap-[0.4rem]">
                <LuTreePalm className="text-[1.8rem] lg:text-[2.5rem] dark:text-white" />
                <span className="tracking-wide capitalize font-medium text-[1.2rem] lg:text-[1.3em] -mb-[0.5rem] dark:text-white">
                  founders
                </span>
              </div>
              <p className="about__founder-description pt-3 leading-relaxed tracking-wide font-medium text-[0.9rem] lg:text-[1rem] text-gray-700 max-w-[35rem] w-full dark:text-white">
                We’re impartial and independent, and every day we create
                distinctive, world-class programmes and content
              </p>
            </div>
            <div className="about__founder-group pt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-7">
              {FounderData.map((founder) => (
                <div
                  key={founder.id}
                  className="about__founder-card group dark:bg-slate-800 dark:border-slate-500 h-full flex flex-col border border-[#ccc] shadow-sm rounded-md bg-white p-2 cursor-pointer"
                >
                  <div className="about__founder-thumb overflow-hidden rounded-md h-[320px]">
                    <img
                      src={founder.image}
                      alt={founder.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                  </div>
                  <div className="about__founder-content flex-1 px-2 pt-2">
                    <h4 className="font-medium tracking-wide text-[1rem] dark:text-white">
                      {founder.name}
                    </h4>
                    <p className="tracking-wide leading-relaxed font-medium text-[0.9rem] text-gray-700 dark:text-white">
                      {founder.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="about__fun-facts py-6 lg:py-14">
            <div className="about__fun-facts-text">
              <div className="about__fun-facts-title flex items-center gap-[0.2rem]">
                <div className="about__fun-facts-logo text-[1.7rem] lg:text-[1.9rem] dark:text-white">
                  🚀
                </div>
                <span className="tracking-wide dark:text-white capitalize font-medium text-[1.1rem] -mb-[0.5rem] lg:text-[1.3rem]">
                  fun facts
                </span>
              </div>
              <p
                className="about__fun-facts-description pt-3 leading-relaxed tracking-wide font-medium text-[0.9rem] 
              lg:text-gray-700 lg:text-[1rem] max-w-[35rem] w-full dark:text-white"
              >
                We’re impartial and independent, and every day we create
                distinctive, world-class programmes and content
              </p>
            </div>
            <div className="about__fun-facts-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5 pt-4 lg:pt-10">
              {FactsData.map((fact) => (
                <div
                  key={fact.id}
                  className="about__fun-facts-card dark:bg-slate-900 dark:border-slate-500 mb-5 border border-slate-50 shadow-sm bg-slate-100 py-4 px-4 space-y-3"
                >
                  <h4 className="font-medium tracking-wide text-[1.1rem] dark:text-white">
                    {fact.title}
                  </h4>
                  <p className="tracking-wide font-medium leading-relaxed text-[0.85rem] text-gray-700 dark:text-white">
                    {fact.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="about__testimonial-grid pb-12 lg:pt-14 lg:pb-28">
            <div className="about__testimonial-top-section text-center">
              <div className="about__testimonial-text space-y-1">
                <h4 className="about__testimonial-title tracking-wide font-semibold text-[1.4rem] lg:text-[1.8rem] dark:text-white">
                  Good news from far away 🏅
                </h4>
                <p className="about__testimonial-subtitle tracking-wide leading-relaxed text-gray-700 text-[0.9rem] lg:text-[0.9rem] dark:text-white">
                  Let's see what people think of Ciseco
                </p>
              </div>
            </div>
            <div className="about__testimonial-bottom-section relative md:w-[35rem] lg:w-[35rem] mx-auto">
              <div className="about__testimonial-floating-images-grid hidden lg:block">
                {floatingImages?.map((item) => (
                  <div
                    key={item?.id}
                    className={`about__testimonial-image ${item.className}`}
                  >
                    <LazyImage
                      src={item?.image}
                      alt={item?.alt}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="about__testimonial-thumb w-[5rem] lg:w-[6rem] mx-auto py-5 lg:py-10">
                <LazyImage
                  src={TestimonialThumb}
                  alt="Testimonial thumb"
                  className="w-full h-auto object-cover"
                />
              </div>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                loop={true}
                speed={1000}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                grabCursor={true}
                pagination={{
                  clickable: true,
                }}
                // navigation={true}
                className="about__testimonial-slider [&_.swiper-pagination-bullet-active]:bg-slate-600 dark:[&_.swiper-pagination-bullet]:bg-slate-50 dark:[&_.swiper-pagination-bullet-active]:bg-red-600"
              >
                {testimonialData.map((test) => (
                  <SwiperSlide key={test.id}>
                    <div className="about__testimonial-text overflow-hidden space-y-1">
                      <div className="about__testimonial-quotes relative">
                        <div className="left-quote w-[2rem] lg:w-[2.5rem] absolute left-0">
                          <LazyImage
                            src={LeftQuote}
                            alt="Testimonial Left Quote"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                        <div className="right-quote w-[2rem] lg:w-[2.5rem] absolute right-0">
                          <LazyImage
                            src={RightQuote}
                            alt="Testimonial Right Quote"
                            className="w-full h-auto object-contain"
                          />
                        </div>
                      </div>
                      <h4 className="tracking-wide text-center font-medium leading-[1.7rem] lg:leading-relaxed text-[1rem] lg:text-[1.3rem] max-w-[28rem] w-full mx-auto italic dark:text-white">
                        {test.description}
                      </h4>
                      <p className="tracking-wide font-medium text-[1rem] lg:text-[1.1rem] capitalize text-center pt-1 pb-12 lg:pt-4 dark:text-white">
                        {test.name}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div className="about__footer-banner px-1 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:items-center gap-4 lg:gap-7">
            <div className="about__footer-banner-content">
              {theme === true ? (
                <div className="about__footer-banner-logo w-[7rem]">
                  <LazyImage
                    src={AboutBannerDarkLogo}
                    alt="About Footer Banner Logo"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="about__footer-banner-logo w-[7rem]">
                  <LazyImage
                    src={AboutBannerLogo}
                    alt="About Footer Banner Logo"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <div className="about__footer-banner-text pt-3 pb-4">
                <h4 className="font-semibold dark:text-white tracking-wide pb-2 text-[1.5rem] lg:text-[1.8rem] leading-8">
                  Earn free money with Ciseco.
                </h4>
                <p className="tracking-wide font-medium leading-5 text-[1rem] lg:text-[1rem] text-gray-700 lg:pt-1 lg:pb-1 dark:text-white">
                  With Ciseco you will get freeship & savings combo.
                </p>
              </div>
              <div className="about__footer-banner-cta flex items-center gap-1">
                <button className="border-2 border-[#ccc] shadow-sm py-1 px-3 rounded-full tracking-wide font-medium text-[0.9rem] lg:text-[1rem] bg-black text-white transition-colors duration-300 hover:bg-slate-50 hover:border-black hover:text-black">
                  Savings combo
                </button>
                <button className="border border-[#ccc] shadow-sm py-1 px-3 rounded-full tracking-wide font-medium text-[0.9rem] lg:text-[1rem] bg-slate-50 text-black transition-colors duration-300 hover:bg-black hover:border-white hover:text-white">
                  Discover more
                </button>
              </div>
            </div>
            <div className="about__footer-banner-thumb pt-4 lg:pt-0 lg:max-w-[28rem] w-full">
              <LazyImage
                src={AboutPromoThumb}
                alt="About Promo Banner Thumb"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
