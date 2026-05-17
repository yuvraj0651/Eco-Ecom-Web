import React, { useEffect, useRef, useState } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      let entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    });

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && (
        <div className="absolute h-[350px] inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      )}
      <img
        ref={imageRef}
        alt={alt}
        src={isVisible ? src : undefined}
        onLoad={() => setIsLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};

export default LazyImage;
