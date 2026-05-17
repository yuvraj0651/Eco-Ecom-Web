import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../../services/ProductsApi";
import { IoFilter } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlineZoomOutMap } from "react-icons/md";
import LazyImage from "../../../UI/LazyImage/LazyImage";
import { Link, useNavigate } from "react-router";
import Breadcrumb from "../../../UI/Breadcrumb/Breadcrumb";
import {
  addToCart,
  getCartData,
  updateCartItem,
} from "../../../services/CartApi";
import toast from "react-hot-toast";

const colorMap = {
  "#f472b6": "Pink",
  "#000000": "Black",
  "#eab308": "Yellow",
  "#3b82f6": "Blue",
  "#22c55e": "Green",
  "#ffffff": "White",
  "#a855f7": "Purple",

  "#374151": "Dark Gray",
  "#1e3a8a": "Indigo",
  "#166534": "Forest Green",
  "#78350f": "Brown",
  "#2563eb": "Royal Blue",
  "#d1d5db": "Light Gray",
  "#111827": "Charcoal Black",
  "#dc2626": "Red",
  "#9ca3af": "Silver",
  "#92400e": "Mocha Brown",
  "#84cc16": "Lime Green",
  "#3f6212": "Army Green",
  "#6b7280": "Slate Gray",
  "#d6d3d1": "Beige",
  "#fef3c7": "Cream",
  "#451a03": "Chocolate Brown",

  "#f9fafb": "Vintage White",
  "#60a5fa": "Sky Blue",
  "#9ca3af": "Heather Gray",
  "#4d7c0f": "Olive Green",
  "#1e3a8a": "Navy Blue",
  "#374151": "Graphite Black",
  "#1f2937": "Charcoal Gray",
};

const Products = ({ debouncedSearch }) => {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [selectedSort, setSelectedSort] = useState("");

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen((prev) => !prev);
  };

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: cartItems = [],
    isLoading: cartIsLoading,
    isError: cartIsError,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
    staleTime: 1000 * 60 * 5,
  });

  const addMutation = useMutation({
    mutationFn: (newItem) => addToCart(newItem),
    onSuccess: (newData) => {
      queryClient.setQueryData(["cart"], (oldData = []) => {
        return [...oldData, newData];
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) => updateCartItem(id, updatedData),

    onSuccess: (updatedItem) => {
      queryClient.setQueryData(["cart"], (oldData = []) => {
        return oldData.map((item) =>
          item.id === updatedItem.id ? updatedItem : item,
        );
      });
    },
  });

  const addCartHandler = (product) => {
    const existingItem = cartItems?.find(
      (item) =>
        item.id === product.id &&
        item.selectedColor === product.selectedColor &&
        item.selectedSize === product.selectedSize,
    );

    // If Product Already Exists
    if (existingItem) {
      updateMutation.mutate({
        id: existingItem.id,
        updatedData: {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        },
      });

      toast.success("Cart quantity updated");
    }

    else {
      addMutation.mutate(product);

      toast.success("Product added to cart");
    }
  };

  const maxPrice =
    products.length > 0
      ? Math.max(...products.map((item) => item.price || 0))
      : 0;

  useEffect(() => {
    if (isFilterPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isFilterPanelOpen]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedColor,
    selectedSize,
    priceRange,
    selectedSort,
    debouncedSearch,
  ]);

  // Categories Group
  const groupByCategory = (arr) => {
    return arr.reduce((acc, curr) => {
      const category = curr.category;

      if (!acc[category]) {
        acc[category] = [];
      }

      acc[category].push(curr);
      return acc;
    }, {});
  };

  const groupedCategory = useMemo(() => groupByCategory(products), [products]);

  // Colors Group
  const groupByColors = (arr) => {
    return arr.reduce((acc, curr) => {
      curr.colors?.forEach((color) => {
        if (!acc[color]) {
          acc[color] = [];
        }

        acc[color].push(curr);
      });

      return acc;
    }, {});
  };

  const groupedColors = useMemo(() => groupByColors(products), [products]);

  // Sizes Group
  const groupBySize = (arr) => {
    return arr.reduce((acc, curr) => {
      curr.sizes?.forEach((size) => {
        if (!acc[size]) {
          acc[size] = [];
        }

        acc[size].push(curr);
      });

      return acc;
    }, {});
  };

  const groupedSizes = useMemo(() => groupBySize(products), [products]);

  const toggleCategory = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const toggleColor = (color) => {
    setSelectedColor((prev) =>
      prev.includes(color)
        ? prev.filter((item) => item !== color)
        : [...prev, color],
    );
  };

  const toggleSize = (size) => {
    setSelectedSize((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size],
    );
  };

  const handleSort = (value) => {
    setSelectedSort(value);
  };

  const filteredProducts = useMemo(() => {
    let filteredData = [...products];

    if (selectedCategory.length > 0) {
      filteredData = filteredData.filter((item) =>
        selectedCategory.includes(item.category),
      );
    }

    if (selectedColor.length > 0) {
      filteredData = filteredData.filter((item) =>
        item?.colors?.some((color) => selectedColor.includes(color)),
      );
    }

    if (selectedSize.length > 0) {
      filteredData = filteredData.filter((item) =>
        item?.sizes?.some((size) => selectedSize.includes(size)),
      );
    }

    if (priceRange > 0) {
      filteredData = filteredData.filter((item) => item.price <= priceRange);
    }

    if (selectedSort === "low-high") {
      filteredData.sort((a, b) => a.price - b.price);
    }

    if (selectedSort === "high-low") {
      filteredData.sort((a, b) => b.price - a.price);
    }

    if (selectedSort === "rating") {
      filteredData.sort(
        (a, b) =>
          (b?.reviews?.[0]?.rating || 0) - (a?.reviews?.[0]?.rating || 0),
      );
    }

    if (selectedSort === "newest") {
      filteredData.sort((a, b) => b.id - a.id);
    }

    if (selectedSort === "popular") {
      filteredData.sort((a, b) => (b.orders || 0) - (a.orders || 0));
    }

    if (debouncedSearch.trim()) {
      filteredData = filteredData.filter(
        (item) =>
          item?.title?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.brand?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          item.description
            ?.toLowerCase()
            .includes(debouncedSearch.toLowerCase()),
      );
    }

    return filteredData;
  }, [
    products,
    selectedCategory,
    selectedColor,
    selectedSize,
    priceRange,
    selectedSort,
    debouncedSearch,
  ]);

  // Pagination
  const itemsPerPage = 9;

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(firstItemIndex, lastItemIndex);
  }, [filteredProducts, firstItemIndex, lastItemIndex]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="shop font-sans overflow-x-hidden">
      <div className="pt-4 px-5">
        <Breadcrumb />
      </div>
      <div className="shop__wrapper">
        <div className="shop__top-section py-5 lg:py-5 px-5 space-y-2 lg:space-y-1">
          <h4 className="shop__title font-semibold tracking-wide text-[1.3rem] lg:text-[1.5rem] dark:text-white">
            All products
          </h4>
          <p className="shop__description tracking-wide font-medium text-gray-700 text-[0.9rem] lg:text-[1rem] dark:text-white">
            Explore our entire collection of products, from clothing to
            accessories.
          </p>
        </div>
        <div className="shop__filter-sidebar px-5 pb-5">
          <button
            onClick={toggleFilterPanel}
            aria-label="Open Filters"
            className="border-2 border-black flex items-center gap-1 py-1 px-3 rounded-full bg-slate-50 text-black transition-colors hover:bg-black duration-300 hover:text-white lg:hidden"
          >
            <IoFilter className="text-[0.9rem]" />
            <span className="capitalize font-medium tracking-wide text-[0.8rem]">
              all filters
            </span>
          </button>
        </div>
        <div className="shop__bottom-section">
          <div className="px-4 dark:px-3">
            <div className="shop__product-listing grid grid-cols-1 lg:grid-cols-12 gap-4">
              <aside className="shop__filters lg:col-span-3">
                <div
                  className={`shop__filter-panel flex flex-col border border-[#ccc] dark:bg-slate-900 dark:border-slate-500 dark:text-white dark:px-3 dark:py-4 shadow-sm py-3 lg:py-0 transition-all duration-300 fixed h-screen lg:static bg-white top-0 w-[310px] lg:h-auto lg:w-auto lg:border-none z-40 ${isFilterPanelOpen ? "left-0" : "-left-[310px]"}`}
                >
                  {(selectedCategory.length > 0 ||
                    selectedColor.length > 0 ||
                    selectedSize.length > 0 ||
                    priceRange > 0 ||
                    selectedSort.length > 0) && (
                    <div className="shop__clear-filters lg:flex lg:justify-end">
                      <button
                        onClick={() => {
                          setSelectedCategory([]);
                          setSelectedColor([]);
                          setSelectedSize([]);
                          setPriceRange(0);
                          setSelectedSort("");
                        }}
                        className={`shop__clear-button absolute lg:static bottom-2 right-2 border border-[#ccc] shadow-sm py-1 px-4 rounded-full bg-black text-white transition-all duration-300 hover:bg-gray-800 hover:text-white hover:scale-105 cursor-pointer capitalize tracking-wide font-medium text-[0.8rem]`}
                      >
                        clear filters
                      </button>
                    </div>
                  )}
                  <div className="shop__filter-header lg:hidden flex items-center justify-between mb-3 border-b border-[#ccc] px-3 pb-3 shadow-sm">
                    <h4 className="capitalize font-medium tracking-wide text-[0.9rem] flex items-center gap-1">
                      {" "}
                      <IoFilter className="text-[0.9rem]" />
                      filters
                    </h4>
                    <div
                      onClick={toggleFilterPanel}
                      aria-label="Close Filters"
                      className="shop__sidebar-close cursor-pointer lg:hidden"
                    >
                      <IoClose />
                    </div>
                  </div>
                  <div className="shop__filter-body space-y-3 px-4 pb-6 pt-2 overflow-y-auto flex-1">
                    {/* Categories Filter */}
                    <div className="shop__filter-title mb-2">
                      <h3 className="capitalize font-semibold tracking-wide">
                        categories
                      </h3>
                    </div>
                    <ul className="shop__filters-list space-y-2">
                      {Object.keys(groupedCategory).map((category) => (
                        <li key={category} className="shop__filters-item">
                          <label className="shop__filters-label flex items-center gap-2">
                            <input
                              onChange={() => toggleCategory(category)}
                              checked={selectedCategory.includes(category)}
                              type="checkbox"
                              className="accent-black"
                            />
                            <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                              {category}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>

                    {/* Colors Filter */}
                    <div className="shop__filter-title mb-2">
                      <h3 className="capitalize font-semibold tracking-wide">
                        colors
                      </h3>
                    </div>
                    <ul className="shop__filters-list space-y-2">
                      {Object.keys(groupedColors).map((color) => (
                        <li key={color} className="shop__filters-item">
                          <label className="shop__filters-label flex items-center gap-2">
                            <input
                              onChange={() => toggleColor(color)}
                              checked={selectedColor.includes(color)}
                              type="checkbox"
                              className="accent-black"
                            />
                            <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                              {colorMap[color] || color}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>

                    {/* Sizes Filter */}
                    <div className="shop__filter-title mb-2">
                      <h3 className="capitalize font-semibold tracking-wide">
                        sizes
                      </h3>
                    </div>
                    <ul className="shop__filters-list space-y-2">
                      {Object.keys(groupedSizes).map((size) => (
                        <li key={size} className="shop__filters-item">
                          <label className="shop__filters-label flex items-center gap-2">
                            <input
                              onChange={() => toggleSize(size)}
                              checked={selectedSize.includes(size)}
                              type="checkbox"
                              className="accent-black"
                            />
                            <span className="tracking-wide font-medium text-[0.9rem]">
                              {size}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>

                    {/* Price Filter */}
                    <div className="shop__filter-title mb-2">
                      <h3 className="capitalize font-semibold tracking-wide">
                        price
                      </h3>
                      <div className="shop__price-range mb-2">
                        <input
                          type="range"
                          min={0}
                          max={maxPrice}
                          value={priceRange}
                          onChange={(e) =>
                            setPriceRange(Number(e.target.value))
                          }
                          name="price-range"
                          className="w-full shop__range-slider"
                        />
                      </div>
                      <div className="shop__price-intervals flex items-center gap-2">
                        <div className="label shop__min-price-label flex-1 space-y-1">
                          <span className="tracking-wide font-medium text-[0.9rem]">
                            Min price
                          </span>
                          <input
                            type="text"
                            name="min-price"
                            readOnly
                            className="w-full border border-[#ccc] py-[0.2rem] px-2 rounded-sm bg-slate-100 dark:bg-slate-700 dark:border-slate-500"
                            value={0}
                          />
                        </div>
                        <div className="label shop__max-price-label flex-1 space-y-1">
                          <span className="tracking-wide font-medium text-[0.9rem]">
                            Max price
                          </span>
                          <input
                            type="text"
                            name="max-price"
                            readOnly
                            className="w-full border border-[#ccc] py-[0.2rem] px-2 rounded-sm bg-slate-100 dark:bg-slate-700 dark:border-slate-500"
                            value={Math.round(maxPrice)}
                          />
                        </div>
                      </div>
                    </div>

                    {/* SortBy Filter */}
                    <div className="shop__filter-title mb-2">
                      <h3 className="capitalize font-semibold tracking-wide">
                        sort by
                      </h3>
                    </div>
                    <ul className="shop__filters-list space-y-2">
                      <li className="shop__filters-item">
                        <label className="shop__filters-label flex items-center gap-2">
                          <input
                            name="popular"
                            checked={selectedSort === "popular"}
                            onChange={() => handleSort("popular")}
                            type="radio"
                            className="accent-black"
                          />
                          <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                            most popular
                          </span>
                        </label>
                      </li>
                      <li className="shop__filters-item">
                        <label className="shop__filters-label flex items-center gap-2">
                          <input
                            name="rating"
                            checked={selectedSort === "rating"}
                            onChange={() => handleSort("rating")}
                            type="radio"
                            className="accent-black"
                          />
                          <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                            best rating
                          </span>
                        </label>
                      </li>
                      <li className="shop__filters-item">
                        <label className="shop__filters-label flex items-center gap-2">
                          <input
                            name="newest"
                            checked={selectedSort === "newest"}
                            onChange={() => handleSort("newest")}
                            type="radio"
                            className="accent-black"
                          />
                          <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                            newest
                          </span>
                        </label>
                      </li>
                      <li className="shop__filters-item">
                        <label className="shop__filters-label flex items-center gap-2">
                          <input
                            name="low-high"
                            checked={selectedSort === "low-high"}
                            onChange={() => handleSort("low-high")}
                            type="radio"
                            className="accent-black"
                          />
                          <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                            price low-high
                          </span>
                        </label>
                      </li>
                      <li className="shop__filters-item">
                        <label className="shop__filters-label flex items-center gap-2">
                          <input
                            name="high-low"
                            checked={selectedSort === "high-low"}
                            onChange={() => handleSort("high-low")}
                            type="radio"
                            className="accent-black"
                          />
                          <span className="capitalize tracking-wide font-medium text-[0.9rem]">
                            price high-low
                          </span>
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
              <div className="shop__products-grid lg:col-span-9">
                <div className="shop__product-group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 dark:lg:gap-3">
                  {isError ? (
                    <div className="col-span-full">
                      <p className="text-center tracking-wide font-medium dark:text-white flex flex-1 h-screen mt-10 justify-center text-[0.8rem] lg:text-[1rem]">
                        {error?.message || "Something went wrong"}
                      </p>
                    </div>
                  ) : isLoading ? (
                    <div className="col-span-full">
                      <p className="text-center tracking-wide font-medium dark:text-white flex flex-1 h-screen mt-10 justify-center text-[0.8rem] lg:text-[1rem]">
                        loading all products...
                      </p>
                    </div>
                  ) : paginatedProducts?.length === 0 ? (
                    <div className="col-span-full">
                      <p className="text-center tracking-wide font-medium dark:text-white flex flex-1 h-screen mt-10 justify-center text-[0.8rem] lg:text-[1rem]">
                        No products matched your search result...
                      </p>
                    </div>
                  ) : (
                    paginatedProducts?.map((product) => {
                      const isInCart = cartItems.some(
                        (item) => item.id === product.id,
                      );
                      const cartItem = {
                        id: product?.id,
                        title: product?.title,
                        description: product?.description,
                        price: product?.price,
                        image: product?.thumbnail,
                        selectedColor: product?.colors[0],
                        selectedSize: product?.sizes[0],
                        quantity: 1,
                      };
                      return (
                        <div
                          key={product.id}
                          className="shop__product-card flex flex-col relative cursor-pointer group dark:bg-slate-800 dark:p-3 dark:rounded-md"
                        >
                          <div className="shop__product-badge absolute top-2 dark:top-5 left-2 -right-2 dark:left-5 flex items-center justify-between w-[calc(100% - 1rem)] z-30">
                            <div className="shop__product-validity border border-[#ccc] dark:bg-slate-800 dark:border-slate-500 dark:text-white flex items-center w-[5.5rem] lg:w-[6.5rem] justify-center rounded-full gap-1 bg-white py-[0.2rem]">
                              <CiStar className="text-[0.9rem]" />
                              <span className="text-[0.9rem]">
                                {product?.badge}
                              </span>
                            </div>
                            <div className="shop__product-wishlist border border-[#ccc] py-[0.4rem] px-2 bg-white rounded-full absolute right-4 dark:right-10 lg:right-10 cursor-pointer dark:bg-slate-800 dark:border-slate-500 dark:text-white  ">
                              <IoMdHeartEmpty className="text-[1.1rem]" />
                            </div>
                          </div>
                          <div className="shop__product-thumb overflow-hidden rounded-xl p-5 group-hover:scale-105 transition-all duration-300 dark:border dark:border-white/30 dark:bg-white/10 dark:backdrop-blur-sm">
                            <LazyImage
                              src={product?.thumbnail}
                              alt={product?.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="shop__product-content pt-4 space-y-3 px-1 dark:text-white">
                            <div className="shop__product-color-group flex items-center gap-2 mb-2">
                              {product?.colors?.map((color, index) => (
                                <div
                                  key={index}
                                  className={`w-4 h-4 rounded-full border border-gray-300`}
                                  style={{ backgroundColor: color }}
                                ></div>
                              ))}
                            </div>
                            <div className="shop__product-text">
                              <Link to={`/shop/${product.id}`}>
                                <h4 className="shop__product-title capitalize tracking-wide font-semibold">
                                  {product?.title}
                                </h4>
                              </Link>
                              <p className="shop__product-desc tracking-wide line-clamp-3 pt-1 text-gray-600 text-[0.9rem] dark:text-white">
                                {product?.description}
                              </p>
                              <p className="shop__product-description capitalize pt-[0.2rem] tracking-wide font-semibold text-red-600 text-[0.9rem] dark:text-amber-500">
                                {product?.brand}
                              </p>
                            </div>
                            <div className="shop__product-meta flex items-center justify-between">
                              <div className="shop__product-price border-2 border-green-600 py-[0.2rem] px-3 text-green-600 font-semibold rounded-full text-[0.9rem] cursor-pointer">
                                <span>${product?.price}</span>
                              </div>
                              <div className="shop__product-reviews font-medium text-gray-500 text-[0.9rem] dark:text-white">
                                {(product?.reviews?.[0]?.rating || 0).toFixed(
                                  1,
                                )}{" "}
                                (87 reviews)
                              </div>
                            </div>
                            <div className="shop__product-cta flex items-center gap-1 pt-2">
                              <button
                                onClick={() => {
                                  addCartHandler(cartItem);
                                  toast.success(
                                    "Product Added To Cart Successfully",
                                  );
                                }}
                                disabled={addMutation.isPending}
                                className={`shop__product-add-cart flex items-center justify-center gap-1 border-2 border-black py-[0.3rem] px-4 rounded-full shadow-sm flex-1 transition-colors duration-300 hover:bg-white hover:text-black ${
                                  isInCart
                                    ? "bg-green-600 text-white border-green-600 hover:text-green-600"
                                    : "bg-black text-white"
                                }`}
                              >
                                <span className="font-medium tracking-wide text-[0.9rem] dark:text-[0.8rem]">
                                  {addMutation.isPending
                                    ? "Adding To Cart"
                                    : isInCart
                                      ? "Added to cart"
                                      : "Add to cart"}
                                </span>
                              </button>
                              <button
                                onClick={() => navigate(`/shop/${product.id}`)}
                                className="shop__product-add-cart flex items-center justify-center gap-1 border-2 border-black py-[0.3rem] px-4 rounded-full shadow-sm flex-1 transition-colors duration-300 hover:bg-black hover:text-white"
                              >
                                <MdOutlineZoomOutMap />
                                <span className="font-medium tracking-wide text-[0.9rem] dark:text-[0.8rem]">
                                  Quick view
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
                {filteredProducts.length > 0 && (
                  <div className="shop__pagination py-8 flex items-center justify-center gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      className="border border-[#ccc] py-1 px-3 capitalize rounded-sm shadow-sm tracking-wide font-medium text-[0.9rem] hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:text-black transition-colors duration-300 cursor-pointer dark:disabled:bg-red-700 dark:disabled:border-slate-500 dark:disabled:text-white dark:border-slate-500 dark:bg-slate-800 dark:text-white"
                    >
                      prev
                    </button>
                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`border border-[#ccc] py-1 px-3 capitalize rounded-sm shadow-sm tracking-wide font-medium text-[0.9rem] hover:bg-black cursor-pointer hover:text-white transition-colors duration-300 dark:border-slate-500 dark:bg-slate-900 dark:text-white ${currentPage === page ? "bg-black dark:bg-indigo-600 text-white" : ""}`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      className="border border-[#ccc] py-1 px-3 capitalize rounded-sm shadow-sm tracking-wide font-medium text-[0.9rem] hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:hover:text-black  transition-colors duration-300 cursor-pointer dark:disabled:bg-red-700 dark:disabled:border-slate-500 dark:disabled:text-white dark:border-slate-500 dark:bg-slate-800 dark:text-white"
                    >
                      next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isFilterPanelOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={toggleFilterPanel}
        ></div>
      )}
    </section>
  );
};

export default Products;
