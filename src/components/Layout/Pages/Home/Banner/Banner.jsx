import BannerImage from "../../../../../assets/banner/banner-img.png";
import { HiMagnifyingGlass } from "react-icons/hi2";
import LazyImage from "../../../../UI/LazyImage/LazyImage";
import { Link } from "react-router";

const bannerData = [
  {
    id: 1,
    image: BannerImage,
    bannerColor: "bg-[#f7f0ea]",
    textColor: "text-black",
    subTitle: "In this season, find the best 🔥",
    title: "Sports equipment collection.",
    description:
      "Discover premium sports gear and accessories for every activity.",
    btnText: "Start your search",
    btnIcon: HiMagnifyingGlass,
    btnLink: "/shop",
    imageAlt: "Sports equipment collection banner",
  },
];

const Banner = () => {
  return (
    <section className="banner font-poppins">
      <div className="container mx-auto px-4 rounded-xl">
        {bannerData?.map((banner) => {
          const Icon = banner?.btnIcon;
          return (
            <div
              key={banner?.id}
              className={`banner__wrapper grid items-center grid-cols-1 md:grid-cols-2 ${banner?.bannerColor} ${banner?.textColor} dark:bg-slate-800 overflow-hidden`}
            >
              <div className="banner__content py-5 px-6 lg:pl-9">
                <div className="banner__text">
                  <h4 className="banner__subtitle text-base smLg:text-lg md:text-xl lg:text-[1.35rem] font-semibold tracking-wide dark:text-white xxl:text-[1.2rem]">
                    {banner?.subTitle}
                  </h4>
                  <h2 className="banner__title py-2 font-bold text-xl md:text-3xl lg:text-[3.2rem] lg:leading-[3.7rem] leading-tight md:leading-snug dark:text-white xxl:text-[2.8rem] xxl:py-1">
                    {banner?.title}
                  </h2>
                </div>
                <div className="banner__cta pt-3 lg:pt-7">
                  <Link to={banner?.btnLink}>
                    <button
                      type="button"
                      className=" border border-[#ccc] shadow-sm flex items-center gap-1 py-[0.6rem] px-4 rounded-[25px] bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    >
                      <span className="font-semibold lg:pb-1 tracking-wide text-[0.8rem] lg:text-[0.9rem] lg:px-2">
                        {banner?.btnText}
                      </span>
                      <Icon className="text-md lg:text-xl" />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="banner__image">
                <LazyImage
                  src={banner?.image}
                  alt={banner?.imageAlt}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Banner;
