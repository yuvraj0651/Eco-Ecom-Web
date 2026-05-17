import { useState } from "react";
import { RiWomenLine } from "react-icons/ri";
import { RiMenLine } from "react-icons/ri";
import { RiShieldUserLine } from "react-icons/ri";
import { PiFootprints } from "react-icons/pi";
import { GiJewelCrown } from "react-icons/gi";
import { GiLipstick } from "react-icons/gi";
import { BsArrowUpRight } from "react-icons/bs";
import WomenImageOne from "../../../../../assets/explore/Women/women-img-1.webp";
import WomenImageTwo from "../../../../../assets/explore/Women/women-img-2.webp";
import WomenImageThree from "../../../../../assets/explore/Women/women-img-3.webp";
import WomenImageFour from "../../../../../assets/explore/Women/women-img-4.webp";
import WomenImageFive from "../../../../../assets/explore/Women/women-img-5.webp";
import WomenImageSix from "../../../../../assets/explore/Women/women-img-6.webp";
import LazyImage from "../../../../UI/LazyImage/LazyImage";

const tabData = [
  {
    id: 1,
    tabIcon: RiWomenLine,
    tabName: "women",
  },
  {
    id: 2,
    tabIcon: RiMenLine,
    tabName: "men",
  },
  {
    id: 3,
    tabIcon: RiShieldUserLine,
    tabName: "accessories",
  },
  {
    id: 4,
    tabIcon: PiFootprints,
    tabName: "footwear",
  },
  {
    id: 5,
    tabIcon: GiJewelCrown,
    tabName: "jewelry",
  },
  {
    id: 6,
    tabIcon: GiLipstick,
    tabName: "beauty",
  },
];

const tabContent = {
  women: [
    {
      id: 1,
      image: WomenImageOne,
      subCategory: "newest arrivals",
      category: "jackets",
      totalProducts: 77,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 2,
      image: WomenImageTwo,
      subCategory: "best sellers",
      category: "t-shirts",
      totalProducts: 156,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 3,
      image: WomenImageThree,
      subCategory: "best sellers",
      category: "Jeans",
      totalProducts: 35,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 4,
      image: WomenImageFour,
      subCategory: "best seasonal",
      category: "coats",
      totalProducts: 87,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 5,
      image: WomenImageFive,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 6,
      image: WomenImageSix,
      subCategory: "top transparent",
      category: "accessories",
      totalProducts: 55,
      boxIcon: BsArrowUpRight,
    },
  ],
  men: [
    {
      id: 1,
      image: WomenImageSix,
      subCategory: "best seller",
      category: "t-shirt",
      totalProducts: 115,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 2,
      image: WomenImageThree,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 3,
      image: WomenImageOne,
      subCategory: "best sellers",
      category: "Jeans",
      totalProducts: 35,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 4,
      image: WomenImageTwo,
      subCategory: "newest arrival",
      category: "jacket",
      totalProducts: 77,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 5,
      image: WomenImageFive,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 6,
      image: WomenImageFour,
      subCategory: "top transparent",
      category: "accessories",
      totalProducts: 55,
      boxIcon: BsArrowUpRight,
    },
  ],
  accessories: [
    {
      id: 1,
      image: WomenImageTwo,
      subCategory: "best seller",
      category: "t-shirt",
      totalProducts: 115,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 2,
      image: WomenImageThree,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 3,
      image: WomenImageFour,
      subCategory: "best sellers",
      category: "Jeans",
      totalProducts: 35,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 4,
      image: WomenImageOne,
      subCategory: "newest arrival",
      category: "jacket",
      totalProducts: 77,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 5,
      image: WomenImageFive,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 6,
      image: WomenImageFour,
      subCategory: "top transparent",
      category: "accessories",
      totalProducts: 55,
      boxIcon: BsArrowUpRight,
    },
  ],
  footwear: [
    {
      id: 1,
      image: WomenImageOne,
      subCategory: "best seller",
      category: "t-shirt",
      totalProducts: 115,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 2,
      image: WomenImageThree,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 3,
      image: WomenImageFive,
      subCategory: "best sellers",
      category: "Jeans",
      totalProducts: 35,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 4,
      image: WomenImageTwo,
      subCategory: "newest arrival",
      category: "jacket",
      totalProducts: 77,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 5,
      image: WomenImageFour,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 6,
      image: WomenImageFour,
      subCategory: "top transparent",
      category: "accessories",
      totalProducts: 55,
      boxIcon: BsArrowUpRight,
    },
  ],
  jewelry: [
    {
      id: 1,
      image: WomenImageOne,
      subCategory: "best seller",
      category: "t-shirt",
      totalProducts: 115,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 2,
      image: WomenImageSix,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 3,
      image: WomenImageTwo,
      subCategory: "best sellers",
      category: "Jeans",
      totalProducts: 35,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 4,
      image: WomenImageFive,
      subCategory: "newest arrival",
      category: "jacket",
      totalProducts: 77,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 5,
      image: WomenImageThree,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 6,
      image: WomenImageFour,
      subCategory: "top transparent",
      category: "accessories",
      totalProducts: 55,
      boxIcon: BsArrowUpRight,
    },
  ],
  beauty: [
    {
      id: 1,
      image: WomenImageSix,
      subCategory: "best seller",
      category: "t-shirt",
      totalProducts: 115,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 2,
      image: WomenImageThree,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 3,
      image: WomenImageOne,
      subCategory: "best sellers",
      category: "Jeans",
      totalProducts: 35,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 4,
      image: WomenImageTwo,
      subCategory: "newest arrival",
      category: "jacket",
      totalProducts: 77,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 5,
      image: WomenImageFive,
      subCategory: "top rated",
      category: "shoes",
      totalProducts: 114,
      boxIcon: BsArrowUpRight,
    },
    {
      id: 6,
      image: WomenImageFour,
      subCategory: "top transparent",
      category: "accessories",
      totalProducts: 55,
      boxIcon: BsArrowUpRight,
    },
  ],
};

const Explore = () => {
  const [activeTab, setActiveTab] = useState("women");

  return (
    <section className="explore pb-7 lg:section-padding bg-neutral-100/70 dark:bg-slate-700">
      <div className="container mx-auto px-6 lg:px-1">
        <div className="explore__wrapper py-14">
          <div className="explore__text text-center">
            <h4 className="explore__title tracking-wide font-medium text-[1.1rem] lg:text-[1.6rem] dark:text-white">
              Start exploring.
            </h4>
          </div>
          <div className="explore__top-section pt-6">
            <div className="explore__tab-grid flex items-center overflow-x-auto lg:overflow-visible scrollbar-hide lg:justify-center gap-2 border border-[#ccc] shadow-md py-[0.4rem] lg:py-[0.3rem] px-2 lg:px-0 rounded-full bg-white lg:max-w-[44rem] mx-auto dark:bg-slate-600 dark:border-slate-500">
              {tabData.map((tab) => {
                const Icon = tab?.tabIcon;
                const isActive = activeTab === tab?.tabName;
                return (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.tabName)}
                    className={`explore-tab relative flex items-center gap-2 cursor-pointer py-2 px-4 rounded-full group transition-all duration-300 ease-in-out transform whitespace-nowrap shrink-0 ${isActive ? "border border-[#ccc] bg-black text-white dark:border-slate-500" : "hover:bg-black hover:text-white dark:text-white"}`}
                  >
                    <Icon />
                    <span className="capitalize font-medium text-[0.8rem] lg:text-[0.9rem]">
                      {tab?.tabName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="explore__bottom-section lg:pt-10">
            <div className="explore__women-collection">
              <div className="explore__women-grid grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-center lg:gap-3">
                {tabContent?.[activeTab]?.map((item) => {
                  const Icon = item?.boxIcon;
                  return (
                    <div
                      key={item?.id}
                      className="explore__women-card group cursor-pointer border border-[#ccc] shadow-sm bg-white rounded-md p-4 space-y-4 hover:-translate-y-1 transition-all duration-300 dark:border-slate-500 dark:bg-slate-500"
                    >
                      <div className="explore__women-meta flex items-start justify-between">
                        <div className="explore__women-card-thumb border relative border-white/30 shadow-sm w-[4.3rem] flex items-center justify-center p-4 rounded-full bg-indigo-400/20">
                          <LazyImage
                            src={item?.image}
                            alt="Women Image One"
                            className="w-full h-auto object-cover"
                          />
                        </div>
                        <div className="explore__women_logo pt-2">
                          <Icon className="group-hover:text-[1.1rem] transition-all duration-300 dark:text-white" />
                        </div>
                      </div>
                      <div className="explore__women-text py-3">
                        <span className="explore__women-subtitle tracking-wide capitalize font-medium dark:text-white">
                          {item?.subCategory}
                        </span>
                        <h4 className="explore__women-title tracking-wide capitalize font-medium text-gray-600 text-[0.9rem] dark:text-white">
                          {item?.category}
                        </h4>
                      </div>
                      <div className="explore__women-total-products">
                        <span className="tracking-wide font-medium text-gray-700 text-[0.9rem] dark:text-white">
                          {item?.totalProducts} products
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;
