import React from "react";
import { Link, useLocation } from "react-router";

const Breadcrumb = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((item) => item);

  return (
    <nav className="flex items-center flex-wrap gap-2 text-[0.85rem] text-gray-600 dark:text-white">
      <Link to="/" className="hover:text-black transition-all duration-200">
        Home
      </Link>

      {pathnames.map((segment, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;

        const isLast = index === pathnames.length - 1;

        return (
          <React.Fragment key={routeTo}>
            <span>/</span>

            {isLast ? (
              <span className="capitalize text-black font-medium dark:text-white">
                {decodeURIComponent(segment)}
              </span>
            ) : (
              <Link
                to={routeTo}
                className="capitalize hover:text-black transition-all duration-200"
              >
                {decodeURIComponent(segment)}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
