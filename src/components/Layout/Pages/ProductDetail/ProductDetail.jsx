import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getProducts } from "../../../services/ProductsApi";
import { Link, useParams } from "react-router";
import LazyImage from "../../../UI/LazyImage/LazyImage";
import Breadcrumb from "../../../UI/Breadcrumb/Breadcrumb";
import {
  addToCart,
  getCartData,
  updateCartItem,
} from "../../../services/CartApi";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const [updatedId, setUpdatedId] = useState(null);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const {
    data: cartItems = [],
    isLoading: cartIsLoading,
    isError: cartIsError,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
  });

  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const [activeImage, setActiveImage] = useState("");
  const [activeColor, setActiveColor] = useState("");
  const [activeSize, setActiveSize] = useState("");

  const queryClient = useQueryClient();

  const addCartMutation = useMutation({
    mutationFn: (newItem) => addToCart(newItem),
    onSuccess: (newData) => {
      queryClient.setQueryData(["cart"], (oldData = []) => {
        return [...oldData, newData];
      });
    },
  });

  const cartItem = {
    productId: product?.id,
    title: product?.title,
    description: product?.description,
    price: product?.price,
    image: activeImage,
    selectedColor: activeColor,
    selectedSize: activeSize,
    quantity: 1,
  };

  const addCartHandler = () => {
    const existingCartItem = cartItems.find(
      (item) =>
        item.productId === product?.id &&
        item.selectedColor === activeColor &&
        item.selectedSize === activeSize,
    );

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: Number(existingCartItem.quantity) + 1,
      };

      updateMutation.mutate({
        id: existingCartItem?.id,
        updatedItem,
      });

      toast.success("Product quantity updated");
    } else {
      addCartMutation.mutate(cartItem);

      toast.success("Product added to cart");
    }
  };

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedItem }) => updateCartItem(id, updatedItem),
    onSuccess: (updatedData) => {
      queryClient.setQueryData(["cart"], (oldData = []) => {
        return oldData.map((item) =>
          item.id === updatedData.id ? updatedData : item,
        );
      });
    },
  });

  const existingCartItem = cartItems.find(
    (item) => item.productId === product?.id,
  );

  const incrementQtyHandler = (item) => {
    setUpdatedId(item.id);

    const updatedItem = {
      ...item,
      quantity: Number(item.quantity) + 1,
    };

    updateMutation.mutate(
      {
        id: item.id,
        updatedItem,
      },
      {
        onSettled: () => {
          setUpdatedId(null);
        },
      },
    );
  };

  const decrementQtyHandler = (item) => {
    if (Number(item.quantity) <= 1) return;

    setUpdatedId(item.id);

    const updatedItem = {
      ...item,
      quantity: Number(item.quantity) - 1,
    };

    updateMutation.mutate(
      {
        id: item.id,
        updatedItem,
      },
      {
        onSettled: () => {
          setUpdatedId(null);
        },
      },
    );
  };

  useEffect(() => {
    if (product?.thumbnail) {
      setActiveImage(product.thumbnail);
    }
  }, [product]);

  useEffect(() => {
    if (product?.colors?.length) {
      setActiveColor(product?.colors?.[0]);
    }
  }, [product]);

  useEffect(() => {
    if (product?.sizes?.length) {
      setActiveSize(product?.sizes[0]);
    }
  }, [product]);

  const relatedProducts = product
    ? products
        .filter((item) => item.category === product.category)
        .filter((item) => item.id !== product.id)
        .slice(0, 4)
    : [];

  const isInCart = cartItems.some(
    (item) =>
      item.productId === product?.id &&
      item.selectedColor === activeColor &&
      item.selectedSize === activeSize,
  );

  if (isLoading) {
    return <p>Loading product data...</p>;
  }

  if (!product) {
    return <p>No product found</p>;
  }

  if (isError) {
    return <p>{error?.message || "Something went wrong"}</p>;
  }

  return (
    <section className="product-detail">
      <div className="container mx-auto">
        <div className="product-detail__wrapper px-5 py-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 lg:gap-8 items-start">
          <div className="product-detail__thumb space-y-4">
            <div className="product-detail__main border border-[#ccc] shadow-sm rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer">
              <LazyImage
                src={activeImage}
                alt={product?.title}
                className="w-full h-auto object-contain aspect-square"
              />
            </div>
            <div className="product-detail__subImages grid grid-cols-2 gap-3">
              {product?.subImages?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setActiveImage(image)}
                  className="border border-[#ccc] shadow-sm rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer p-3"
                >
                  <img
                    src={image}
                    alt={`${product?.title}-preview-${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="product-detail__content space-y-3 py-3 md:py-1 lg:py-1 lg:sticky lg:top-3">
            <div className="product-detail__breadcrumb flex items-center gap-2">
              <Breadcrumb />{" "}
              <span className="text-[0.85rem] dark:text-white">
                - {product?.title}
              </span>
            </div>
            <div className="product-detail__text">
              <h4 className="product-detail__title capitalize font-medium tracking-wide text-[1.3rem] md:text-[1.5rem] dark:text-white">
                {product?.title}
              </h4>
              <p className="product-detail__description py-2 tracking-wide font-medium text-[0.9rem] text-justify md:text-left text-gray-600 dark:text-white">
                {product?.description}
              </p>
            </div>
            <div className="product-detail__meta-data flex items-center gap-3">
              <div className="product-detail__price border-2 border-green-600 py-[0.1rem] px-3 rounded-full dark:border-white">
                <span className="text-green-600 font-[600] tracking-wide text-[0.9rem] dark:text-white">
                  ${product?.price}
                </span>
              </div>
              <div className="product-detail__reviews flex items-start lg:items-end lg:gap-2 flex-col md:flex-row">
                <span className="font-medium text-[0.9rem] dark:text-white">
                  ⭐{(product?.reviews?.[0]?.rating || 0).toFixed(1)}
                </span>
                <span className="text-[0.8rem] font-medium text-gray-600 underline dark:text-white">
                  {product?.reviews?.length || 0} reviews
                </span>
              </div>
              <div className="product-detail__inStock">
                <p className="text-[0.9rem]  capitalize tracking-wide dark:text-white">
                  ✅in stock
                </p>
              </div>
            </div>
            <div className="product-detail__color-grid my-3">
              <span className="font-medium capitalize text-[0.9rem] dark:text-white">
                color:
              </span>
              <div className="color-grid flex items-center justify-start gap-2 mt-1">
                {product?.colors?.map((color) => (
                  <button
                    key={color}
                    aria-label={`Selected ${color}`}
                    onClick={() => setActiveColor(color)}
                    className={`product-detail__color1 border border-[#ccc] rounded-full p-[0.1rem] ${activeColor === color ? "ring-2 ring-slate-900 dark:ring-white" : ""}`}
                  >
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
            <div className="product-detail__sizes py-2">
              <span className="font-medium capitalize text-[0.9rem] dark:text-white">
                size:
              </span>
              <div className="size-grid flex items-center justify-start gap-[0.4rem] mt-1 dark:text-white">
                {product?.sizes?.map((size) => (
                  <button
                    key={size}
                    aria-label={`Selected ${size}`}
                    onClick={() => setActiveSize(size)}
                    className={`border border-[#ccc] py-[0.3rem] px-2 text-center shadow-sm rounded-md uppercase font-medium tracking-wide text-[0.7rem] lg:py-1 lg:px-7 lg:text-[0.8rem] ${activeSize === size ? "border-2 border-black dark:border-white" : ""}`}
                  >
                    {size || "N/A"}
                  </button>
                ))}
              </div>
            </div>
            <div className="product-detail__cart-cta grid grid-cols-12 gap-2 items-center">
              <div className="product-detail__quantity flex items-center gap-1 px-2 border border-white/30 w-full justify-center py-2 bg-slate-100 col-span-5 rounded-sm dark:bg-slate-800">
                <button
                  disabled={updatedId === product?.id}
                  onClick={() =>
                    existingCartItem && decrementQtyHandler(existingCartItem)
                  }
                  className="border border-[#ccc] flex-1 rounded-md py-1 shadow-sm bg-slate-700 text-white dark:bg-red-600 dark:border-slate-500"
                >
                  -
                </button>
                <span className="flex-1 text-center border border-[#ccc] shadow-sm py-1 bg-white text-[0.9rem] dark:bg-slate-900 dark:text-white dark:border-slate-500">
                  {existingCartItem ? existingCartItem?.quantity : 0}
                </span>
                <button
                  onClick={() =>
                    existingCartItem && incrementQtyHandler(existingCartItem)
                  }
                  className="border border-[#ccc] flex-1 rounded-md py-1 shadow-sm bg-slate-700 text-white dark:bg-red-600 dark:border-slate-500"
                >
                  +
                </button>
              </div>
              <div className="product-detail__add-button col-span-7 w-full">
                <button
                  disabled={cartIsLoading}
                  onClick={addCartHandler}
                  className={`border-2 border-[#ccc] shadow-sm py-2 px-7 rounded-full font-medium tracking-wide text-[0.85rem] disabled:bg-slate-500 disabled:cursor-not-allowed disabled:text-black ${isInCart ? "bg-green-600 hover:text-green-600 text-white hover:bg-white hover:border-green-600" : "bg-black text-white"}`}
                >
                  {cartIsLoading
                    ? "Adding to cart"
                    : isInCart
                      ? "Added to cart"
                      : "Add to cart"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="product-detail__related-product mt-3 mb-10 px-5 lg:px-0 lg:my-14">
          <div className="product-detail__related-top">
            <h4 className="font-medium tracking-wide lg:text-[1.4rem]">
              Customers also purchased
            </h4>
          </div>
          <div className="product-detail__related-bottom mt-4">
            <div className="product-detail__related-grid grid grid-cols-1 gap-2 lg:grid-cols-4 lg:gap-4">
              {relatedProducts.map((item) => (
                <div className="product-card border border-[#ccc] group bg-white rounded-md p-1 sm:p-4 transition-all duration-500 overflow-hidden shadow-sm">
                  {/* Product Thumbnail */}
                  <div className="product-card__thumbnail relative bg-gradient-to-br from-[#f8f8f8] to-[#ececec] rounded-md overflow-hidden">
                    {/* Top CTA */}
                    <div className="absolute top-3 left-3 z-10">
                      <button className="bg-white/90 backdrop-blur-md px-3 py-[0.45rem] rounded-full flex items-center gap-2 shadow-md border border-white/50">
                        <span className="text-[0.7rem] text-slate-700">✦</span>

                        <span className="text-[0.78rem] sm:text-[0.85rem] font-semibold tracking-wide text-slate-600">
                          New in
                        </span>
                      </button>
                    </div>

                    {/* Wishlist */}
                    <div className="absolute top-3 right-3 z-10">
                      <button className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/90 backdrop-blur-md shadow-md border border-white/50 flex items-center justify-center text-[1.1rem] sm:text-[1.2rem] text-slate-700 hover:bg-black hover:text-white transition-all duration-300">
                        ♡
                      </button>
                    </div>

                    {/* Product Image */}
                    <div className="flex items-center justify-center px-5 pt-14 pb-8 sm:px-8 sm:pt-16 sm:pb-10">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full max-w-[190px] sm:max-w-[220px] md:max-w-[250px] h-auto object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="product-card__content pt-4 sm:pt-5">
                    {/* Colors */}
                    <div className="product-card__colors flex items-center gap-2">
                      {item?.colors?.map((color) => (
                        <button
                          key={color}
                          className="p-[0.15rem] rounded-full border border-slate-300 hover:scale-110 transition-all duration-300"
                        >
                          <div
                            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                            style={{ backgroundColor: color }}
                          ></div>
                        </button>
                      ))}
                    </div>

                    {/* Product Info */}
                    <div className="product-card__info mt-4 sm:mt-5">
                      <Link to={`/shop/${item.id}`}>
                        <h3 className="text-[1rem] font-bold tracking-tight text-slate-900 line-clamp-1">
                          {item?.title}
                        </h3>
                      </Link>

                      <p className="text-[0.95rem] sm:text-[1.05rem] text-slate-500 mt-1 capitalize font-medium">
                        {item?.category}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="product-card__footer mt-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {/* Price */}
                      <div className="inline-flex items-center justify-center border-2 border-emerald-500 rounded-2xl px-4 py-2 bg-emerald-50 shadow-sm w-fit">
                        <span className="text-[0.8rem] font-bold text-emerald-600 tracking-tight">
                          ${item?.price}
                        </span>
                      </div>

                      {/* Reviews */}
                      <div className="flex items-center gap-2">
                        <span className="text-[1rem] sm:text-[1.1rem]">⭐</span>

                        <span className="text-[0.9rem] sm:text-[1rem] text-slate-500">
                          <span className="font-semibold text-slate-700">
                            {(item?.reviews?.[0]?.rating || 0).toFixed(1)}
                          </span>{" "}
                          ({item?.reviews?.length || 0} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
