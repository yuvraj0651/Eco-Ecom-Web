import featureImg1 from "../../../../../assets/features/feature-img-1.png";
import featureImg2 from "../../../../../assets/features/feature-img-2.png";
import featureImg3 from "../../../../../assets/features/feature-img-3.png";
import featureImg4 from "../../../../../assets/features/feature-img-4.png";
import LazyImage from "../../../../UI/LazyImage/LazyImage";

const featuresData = [
  {
    id: 1,
    image: featureImg1,
    badge: "step1",
    badgeBg: "bg-red-200",
    badgeTextColor: "text-red-800",
    title: "filter & discover",
    description: "Smart filtering and suggestions make it easy to find.",
  },
  {
    id: 2,
    image: featureImg2,
    badge: "step2",
    badgeBg: "bg-indigo-200",
    badgeTextColor: "text-indigo-800",
    title: "add to bag",
    description: "Easily select the correct items and add them to the cart.",
  },
  {
    id: 3,
    image: featureImg3,
    badge: "step3",
    badgeBg: "bg-amber-100",
    badgeTextColor: "text-amber-800",
    title: "fast shipping",
    description: "The carrier will confirm and ship quickly to you.",
  },
  {
    id: 4,
    image: featureImg4,
    badge: "step4",
    badgeBg: "bg-purple-200",
    badgeTextColor: "text-purple-800",
    title: "enjoy the product",
    description: "Have fun and enjoy your 5-star quality products.",
  },
];

const Features = () => {
  return (
    <section className="features py-5 lg:section-padding">
      <div className="container mx-auto px-2">
        <div className="features__wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-5 lg:gap-8">
          {featuresData.map((feature) => (
            <div
              key={feature?.id}
              className="features__card border border-white/20 backdrop-blur-sm p-4 rounded-md shadow-sm bg-white/10 flex flex-col flex-1 h-full transition-all duration-300 lg:hover:-translate-y-1 lg:hover:shadow-lg cursor-pointer"
            >
              <div className="features__image w-[7rem] mx-auto">
                <LazyImage
                  src={feature?.image}
                  alt={feature?.title}
                  alt="Filter and Discover Products"
                  className="w-full h-auto object-cover dark:rounded-full"
                />
              </div>
              <div className="features__content text-center pt-3 space-y-3">
                <div className="features__badge">
                  <span className={`border border-[#ccc] shadow-sm py-[0.3rem] px-3 rounded-sm capitalize font-medium tracking-wide text-[0.75rem] ${feature?.badgeBg} ${feature?.badgeTextColor}`}>
                    {feature?.badge}
                  </span>
                </div>
                <div className="features__text">
                  <h4 className="features__title mb-2 capitalize font-[500] tracking-wide text-[0.95rem] dark:text-white">
                    {feature?.title}
                  </h4>
                  <p className="features__description text-gray-600 tracking-wide text-[0.9rem] dark:text-white">
                    {feature?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
