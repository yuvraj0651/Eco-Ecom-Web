import React, { useContext } from "react";
import FooterLogo from "../../../assets/logo/web-logo.png";
import DarkFooterLogo from "../../../assets/logo/dark-logo.png";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { BiLogoTelegram } from "react-icons/bi";
import { RiTwitterXLine } from "react-icons/ri";
import ThemeContext from "../../context/Theme/ThemeContext";

const socialLinks = [
  {
    id: 1,
    icon: FaFacebook,
    title: "facebook",
  },

  {
    id: 2,
    icon: FaYoutube,
    title: "youtube",
  },

  {
    id: 3,
    icon: BiLogoTelegram,
    title: "telegram",
  },

  {
    id: 4,
    icon: RiTwitterXLine,
    title: "twitter",
  },
];

const footerSections = [
  {
    id: 1,
    title: "getting started",
    links: ["release notes", "upgrade guide", "browser support", "dark mode"],
  },

  {
    id: 2,
    title: "explore",
    links: ["prototyping", "designing system", "pricing", "security"],
  },

  {
    id: 3,
    title: "resources",
    links: ["best practices", "support", "developers", "learn design"],
  },

  {
    id: 4,
    title: "community",
    links: [
      "discussion forums",
      "code of conduct",
      "contributing",
      "api referencing",
    ],
  },
];

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer className="footer border-t border-slate-300 shadow-sm py-6 lg:py-8 dark:bg-slate-900 dark:border-slate-600">
      <div className="footer__wrapper px-5 grid grid-cols-2 gap-y-3 md:grid-cols-3 lg:grid-cols-6">
        {!theme ? (
          <div className="footer__logo w-[8rem]">
            <img
              src={FooterLogo}
              alt="dark-footer-logo"
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <div className="footer__logo w-[8rem]">
            <img
              src={DarkFooterLogo}
              alt="footer-logo"
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        <div className="footer__social-grid dark:text-white">
          {socialLinks.map((social) => {
            const Icon = social?.icon;
            return (
              <div
                key={social?.id}
                className="footer__social-item flex items-center gap-2"
              >
                <Icon className="text-[0.9rem]" />
                <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                  {social?.title}
                </span>
              </div>
            );
          })}
        </div>
        {footerSections?.map((section) => (
          <div key={section?.id} className="footer__features-grid">
            <h4 className="tracking-wide font-medium capitalize text-[0.95rem] text-slate-900 dark:text-white">
              {section?.title}
            </h4>
            <ul className="features-list space-y-1 pt-1 pb-3">
              {section?.links?.map((link, index) => (
                <li
                  key={index}
                  className="capitalize tracking-wide font-medium text-gray-600 text-[0.9rem] dark:text-white"
                >
                  {link}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
