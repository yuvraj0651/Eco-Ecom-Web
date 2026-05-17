import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router";
import { FaArrowUp } from "react-icons/fa6";

const ScrollTop = () => {
    const {pathname} =  useLocation();

    const [isVisible , setIsVisible] = useState(false);

    useEffect(() => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    } , [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 350){
                setIsVisible(true);
            }else{
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll" , handleScroll);

        return () => window.removeEventListener("scroll" , handleScroll);
    } , []);

    const scrollTopHandler = () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    };

  return (
    <>
              <button
        onClick={scrollTopHandler}
        className={`
          fixed bottom-16 right-3 lg:right-5 z-[999]
          flex items-center justify-center
          w-12 h-12 lg:w-12 lg:h-12
          rounded-full
          border border-white/20
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          backdrop-blur-md
          bg-slate-900 text-white
          dark:bg-white dark:text-black
          transition-all duration-500
          hover:scale-110
          hover:-translate-y-1
          active:scale-95
          ${
            isVisible
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible translate-y-10"
          }
        `}
        aria-label="Scroll to top"
      >
        <FaArrowUp className="text-[1rem] lg:text-[1.1rem]" />
      </button>
    </>
  )
}

export default ScrollTop