import AboutBannerLogo from "../../../../../assets/logo/web-logo.png";
import AboutBannerDarkLogo from "../../../../../assets/logo/dark-logo.png";
import AboutPromoThumb from "../../../../../assets/about/about-promo-img.webp";
import LazyImage from "../../../../UI/LazyImage/LazyImage";
import { useContext } from "react";
import ThemeContext from "../../../../context/Theme/ThemeContext";

const footerBannerData = [
  {
    id: 1,
    lightLogo: AboutBannerLogo,
    darkLogo: AboutBannerDarkLogo,
    title: "Earn free money with Ciseco.",
    description: "With Ciseco you will get freeship & savings combo.",
    image: AboutPromoThumb,
    imageAlt: "About Promo Banner Thumb",
    buttons: [
      {
        id: 1,
        text: "Savings combo",
        className:
          "border-2 border-[#ccc] shadow-sm py-1 px-3 rounded-full tracking-wide font-medium text-[0.9rem] lg:text-[1rem] bg-black text-white transition-colors duration-300 hover:bg-slate-50 hover:border-black hover:text-black",
      },
      {
        id: 2,
        text: "Discover more",
        className:
          "border border-[#ccc] shadow-sm py-1 px-3 rounded-full tracking-wide font-medium text-[0.9rem] lg:text-[1rem] bg-slate-50 text-black transition-colors duration-300 hover:bg-black hover:border-white hover:text-white",
      },
    ],
  },
];

const FooterBanner = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className="footer-banner">
      <div className="container mx-auto px-8 pt-10 lg:px-2">
        {footerBannerData.map((footer) => (
          <div
            key={footer?.id}
            className="about__footer-banner pb-10 lg:section-padding grid grid-cols-1 sm:grid-cols-2 lg:items-center gap-4 lg:gap-7"
          >
            <div className="about__footer-banner-content">
              {theme ? (
                <div className="about__footer-banner-logo w-[7rem]">
                  <LazyImage
                    src={footer?.darkLogo}
                    alt="About Footer Banner Logo"
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="about__footer-banner-logo w-[7rem]">
                  <LazyImage
                    src={footer?.lightLogo}
                    alt="About Footer Banner Logo"
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              <div className="about__footer-banner-text pt-3 pb-4">
                <h4 className="font-semibold dark:text-white tracking-wide pb-2 text-[1.5rem] lg:text-[1.8rem] leading-8">
                  {footer?.title}
                </h4>
                <p className="tracking-wide font-medium leading-5 text-[1rem] lg:text-[1rem] text-gray-700 lg:pt-1 lg:pb-1 dark:text-white">
                  {footer?.description}
                </p>
              </div>
              <div className="about__footer-banner-cta flex items-center gap-1">
                {footer?.buttons?.map((button, index) => (
                  <button key={index} className={button.className}>
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
            <div className="about__footer-banner-thumb pt-4 lg:pt-0 lg:max-w-[28rem] w-full">
              <LazyImage
                src={footer?.image}
                alt={footer?.imageAlt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FooterBanner;
