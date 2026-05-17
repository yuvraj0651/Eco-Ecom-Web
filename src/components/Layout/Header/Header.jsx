import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { FaBarsStaggered } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { LuUserPlus } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaFacebook } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { RiTelegram2Fill } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";
import WebLogo from "../../../assets/logo/web-logo.png";
import DarkLogo from "../../../assets/logo/dark-logo.png";
import { Link, useNavigate } from "react-router";
import ThemeContext from "../../context/Theme/ThemeContext";
import { FaUserPlus } from "react-icons/fa6";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../API/Auth/AuthThunk";
import { useQuery } from "@tanstack/react-query";
import { getCartData } from "../../services/CartApi";
import toast from "react-hot-toast";

const headerLinks = [
  {
    id: 1,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    title: "About",
    link: "/about",
  },
  {
    id: 3,
    title: "Shop",
    link: "/shop",
  },
  {
    id: 4,
    title: "Blog",
    link: "/blog",
  },
  {
    id: 5,
    title: "Contact",
    link: "/contact",
  },
];

const Header = ({ searchTerm, setSearchTerm }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false);

  const { authData = [], isAuthenticated } = useSelector((state) => state.auth);

  const { data = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
  });

  const totalItems = useMemo(() => {
    return data?.reduce((total, item) => total + Number(item?.quantity || 0), 0);
  }, [data]);

  const dropDownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const logoutHandler = useCallback(() => {
    dispatch(logout());

    toast.success("Logged you out successfully");

    navigate("/");
  }, [dispatch, navigate]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDropdownOpen]);

  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="relative">
      <div className="header__header-wrapper flex items-center justify-between border border-[#ccc] px-4 py-1 bg-white lg:py-2 dark:bg-slate-900 dark:border-slate-600 fixed top-0 inset-x-0 w-full z-50">
        <div className="header__hamburger dark:text-white lg:hidden">
          <FaBarsStaggered
            className="header__hamburger-icon cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <div className="header__logo w-[6rem]">
          {theme ? (
            <img
              src={DarkLogo}
              alt="dark-logo"
              className="w-full h-auto object-cover"
            />
          ) : (
            <div className="header__logo w-[7.6rem]">
              <img
                src={WebLogo}
                alt="web-logo"
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
        <nav
          className={`header__navigation absolute dark:bg-slate-900 dark:border-slate-600 lg:static top-0 bg-white w-[340px] h-screen lg:h-auto z-30 border border-[#ccc] shadow-sm lg:border-none lg:shadow-none duration-300 transition-all lg:transition-none ${isSidebarOpen ? "right-0" : "-right-[340px]"}`}
        >
          <div className="header__nav-top border border-[#ccc] dark:border-slate-600 shadow-b-sm flex items-center justify-between py-1 lg:hidden">
            {theme ? (
              <div className="navbar-logo w-[5.8rem]">
                <img
                  src={DarkLogo}
                  alt="navbar-logo"
                  className="w-full h-auto object-cover"
                />
              </div>
            ) : (
              <div className="navbar-logo w-[7.5rem]">
                <img
                  src={WebLogo}
                  alt="navbar-logo"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <div
              className="header__nav-close pr-4 cursor-pointer"
              onClick={toggleSidebar}
            >
              <IoMdClose className="header-cta" />
            </div>
          </div>
          <div className="p-3 lg:hidden">
            <p className="text-[0.9rem] tracking-wide font-medium leading-2 dark:text-white">
              Discover the most outstanding articles on all topics of life.
              Write your stories and share them.
            </p>
          </div>
          <div className="header__nav-socials flex items-center gap-2 px-3 lg:hidden">
            <div className="header_social-cta">
              <FaFacebook className="facebook-cta social-cta" />
            </div>
            <div className="header_social-cta">
              <FaXTwitter className="twitter-cta social-cta" />
            </div>
            <div className="header_social-cta">
              <FaYoutube className="youtube-cta social-cta" />
            </div>
            <div className="header_social-cta">
              <RiTelegram2Fill className="telegram-cta social-cta" />
            </div>
          </div>
          <div className="header__nav-search pb-4 pt-5 px-3 lg:hidden">
            <input
              type="text"
              name="search"
              id="search-bar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-box border border-[#ccc] py-[0.4rem] px-2 w-full placeholder:font-medium tracking-wide text-[0.9rem] bg-slate-50 rounded-sm focus:outline-none dark:bg-slate-200"
              placeholder="Type and press enter"
            />
          </div>
          <ul className="navigation-wrapper lg:flex dark:bg-slate-900 dark:text-white">
            {headerLinks.map((item) => (
              <li key={item?.id} className="nav-link">
                <Link to={item?.link}>{item?.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__cta-block flex items-center gap-2 lg:gap-3 lg:pr-3">
          <div
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-slate-200 shadow-sm dark:bg-amber-200 rounded-full flex items-center px-1 cursor-pointer transition-all"
          >
            <div
              className={`absolute left-1 w-5 h-5 bg-indigo-700 dark:bg-orange-600 rounded-full shadow transition-transform duration-300 ease-in-out
              ${theme ? "translate-x-7" : "translate-x-0"}`}
            ></div>

            <div className="flex justify-between w-full px-1 text-sm">
              <FiSun
                className={`${theme ? "text-gray-400 dark:text-red-600" : "text-yellow-500"}`}
              />
              <FiMoon className={`${theme ? "text-white" : "text-gray-500"}`} />
            </div>
          </div>
          <div onClick={toggleSearch} className="header__search">
            <HiMagnifyingGlass className="search-icon header-cta" />
          </div>
          <div ref={dropDownRef} className="relative">
            <div onClick={toggleDropdown} className="header__account">
              <LuUserPlus className="user-account-icon header-cta" />
            </div>
            {isDropdownOpen && (
              <div
                className={`header__account-dropdown absolute -left-[180px] top-full z-40 transition-all duration-300 ${
                  isDropdownOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >
                <div className="mt-4 border border-[#ccc] w-[190px] bg-slate-50 dark:bg-slate-900 dark:border-slate-500 rounded-sm shadow-md overflow-hidden py-1">
                  <ul className="px-1">
                    {authData && isAuthenticated ? (
                      <li
                        onClick={logoutHandler}
                        className="px-4 py-2 border-b border-slate-300 dark:border-slate-500 flex items-center gap-2 hover:bg-black cursor-pointer hover:text-white dark:text-white dark:hover:bg-slate-50 dark:hover:text-black"
                      >
                        <FaUserPlus className="text-[0.9rem]" />
                        <span className="capitalize tracking-wide font-medium text-[0.9rem] block">
                          logout
                        </span>
                      </li>
                    ) : (
                      <Link to="/auth">
                        <li className="px-4 py-2 border-b border-slate-300 dark:border-slate-500 flex items-center gap-2 hover:bg-black cursor-pointer hover:text-white dark:text-white dark:hover:bg-slate-50 dark:hover:text-black">
                          <FaUserPlus className="text-[0.9rem]" />
                          <span className="capitalize tracking-wide font-medium text-[0.9rem] block">
                            login
                          </span>
                        </li>
                      </Link>
                    )}
                    <li className="px-4 py-2 border-b border-slate-200 dark:border-slate-500 flex items-center gap-2 hover:bg-black cursor-pointer hover:text-white dark:text-white dark:border-none dark:hover:bg-slate-50 dark:hover:text-black">
                      <FaRegCircleUser className="text-[0.9rem]" />
                      <span className="capitalize tracking-wide font-medium text-[0.9rem] block">
                        account
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
          <Link to="/cart">
            <div className="header__cart relative">
              <span className="absolute -top-2 -right-2 border border-[#ccc] shadow-sx px-1 text-[0.6rem] rounded-full bg-[#0ea5e9] text-white">
                {totalItems || 0}
              </span>
              <IoCartOutline className="cart-icon header-cta" />
            </div>
          </Link>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`header__search-wrapper absolute w-full bg-white dark:bg-slate-900 top-[4rem] px-5 lg:px-1 py-2 lg:py-3 border-b transition-all duration-300 border-[#ccc] dark:border-slate-500 ${isSearchOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-4"}`}
      >
        <div className="header__search-input flex items-center justify-center gap-1 lg:gap-3">
          <HiMagnifyingGlass className="text-[1.2rem] dark:text-white" />
          <input
            type="text"
            name="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="search product here..."
            className="py-2 px-4 max-w-[400px] w-full dark:bg-slate-600 focus:outline-none placeholder:capitalize placeholder:tracking-wide placeholder:text-[0.8rem] lg:placeholder:text-[0.9rem] text-[0.8rem] lg:text-[0.9rem] dark:placeholder:text-white dark:text-white"
          />
          <IoMdClose
            className="text-[1.2rem] cursor-pointer dark:text-white"
            onClick={toggleSearch}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
