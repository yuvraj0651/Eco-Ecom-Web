import React, { useMemo, useState } from "react";
import Breadcrumb from "../../../UI/Breadcrumb/Breadcrumb";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCartData,
  removeCartItem,
  updateCartItem,
} from "../../../services/CartApi";
import { useNavigate } from "react-router";
import LazyImage from "../../../UI/LazyImage/LazyImage";

const CartPage = () => {
  const [updatedId, setUpdatedId] = useState(null);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => removeCartItem(id),
    onSuccess: (id) => {
      queryClient.setQueryData(["cart"], (oldData = []) => {
        return oldData.filter((item) => item.id !== id);
      });
    },
  });

  const removeItemHandler = (id) => deleteMutation.mutate(id);

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

  const subTotal = useMemo(() => {
    return data?.reduce(
      (total, item) => total + Number(item.quantity * item.price),
      0,
    );
  }, [data]);

  const shippingFee = 0;
  const tax = 0;

  const grandTotal = useMemo(() => {
    return subTotal + shippingFee + tax;
  }, [subTotal]);

  return (
    <section className="cart items-center pb-14">
      <div className="container mx-auto px-4 lg:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-2">
          <div className="cart__wrapper md:col-span-8">
            <div className="cart__top-section py-8 space-y-1">
              <div className="cart__title tracking-wide font-medium capitalize text-[1.4rem] dark:text-white">
                <h4>shopping cart</h4>
              </div>
              <div className="cart__breadcrumb">
                <Breadcrumb />
              </div>
            </div>
            <div className="cart__bottom-section">
              <div className="cart__cartItem-grid grid grid-cols-1 gap-5">
                {isError ? (
                  <div className="col-span-full py-6">
                    <p className="text-center tracking-wide font-medium text-red-700 dark:text-white">
                      {error.message || "Something went wrong"}
                    </p>
                  </div>
                ) : isLoading ? (
                  <div className="col-span-full py-6">
                    <p className="text-center tracking-wide font-medium text-black dark:text-white">
                      loading all cart items...
                    </p>
                  </div>
                ) : data?.length === 0 ? (
                  <div className="col-span-full">
                    <p className="text-center py-8 capitalize tracking-wide font-medium text-[0.85rem] lg:text-[0.9rem] dark:text-white">
                      no cart items to show...
                    </p>
                  </div>
                ) : (
                  data?.map((item) => (
                    <div
                      key={item.id}
                      className="cart__cartItem-card cursor-pointer flex lg:items-start lg:justify-between gap-4 border border-[#e5e7eb] p-3 rounded-md shadow-sm dark:bg-slate-900 dark:border-slate-500 dark:p-4"
                    >
                      <div className="cart__cartItem-thumb md:w-[9rem] md:h-[9rem] lg:w-[10rem] lg:h-[10rem]">
                        <LazyImage
                          src={item?.image}
                          alt="cart-item-thumb"
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="cart__cartItem-content flex flex-col dark:text-white">
                        <h4 className="cart__item-title capitalize font-medium tracking-wide text-black dark:text-white">
                          {item?.title}
                        </h4>
                        <div className="cart__brand-size-grid flex items-center gap-14">
                          <p className="cart__item-brand capitalize font-medium tracking-wide text-[0.9rem]">
                            sienna
                          </p>
                          <span className="cart__item-size capitalize font-medium text-gray-400 text-[0.9rem]">
                            {item?.selectedSize}
                          </span>
                        </div>
                        <div className="cart__item-description py-2">
                          <p className="tracking-wide font-medium leading-relaxed text-gray-050 text-[0.78rem] line-clamp-3">
                            {item?.description}
                          </p>
                        </div>
                        <div className="cart__item-quantity-price-grid flex items-center justify-between gap-3 pt-1 pb-4">
                          <div className="hidden md:flex items-center gap-4 ">
                            <div className="product-detail__quantity flex items-center gap-1 px-3 border border-white/30 justify-center py-2 bg-slate-100 col-span-5 rounded-sm dark:bg-slate-800">
                              <button
                                onClick={() => decrementQtyHandler(item)}
                                disabled={updatedId === item.id}
                                className="border border-[#ccc] rounded-md py-[0.1rem] px-3 shadow-sm bg-slate-700 text-white dark:bg-red-600 dark:border-slate-500"
                              >
                                -
                              </button>
                              <span className="text-center border border-[#ccc] shadow-sm py-[0.2rem] px-3 bg-white text-[0.9rem] dark:bg-slate-900 dark:text-white dark:border-slate-500">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => incrementQtyHandler(item)}
                                className="border border-[#ccc] rounded-md py-[0.1rem] px-3 shadow-sm bg-slate-700 text-white dark:bg-red-600 dark:border-slate-500"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="cart__item-quantity block md:hidden ">
                            <select
                              name="qty"
                              id="qty"
                              value={item.quantity}
                              onChange={(e) => {
                                const updatedItem = {
                                  ...item,
                                  quantity: Number(e.target.value),
                                };

                                updateMutation.mutate({
                                  id: item.id,
                                  updatedItem,
                                });
                              }}
                              className="py-1 px-1 bg-white dark:bg-slate-600 border-2 border-slate-900 rounded-sm text-[0.8rem] text-center"
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                          <div className="cart__item-price">
                            <span className="border-2 border-green-600 py-1 px-2 rounded-full text-green-700 font-medium text-[0.8rem] tracking-wide">
                              ${item?.price}
                            </span>
                          </div>
                        </div>
                        <div className="cart__item-meta-grid flex items-center justify-between">
                          <div className="cart__item-stock border border-[#ccc] py-1 px-2 shadow-sm tracking-wide font-medium capitalize text-[0.8rem] bg-slate-900 text-white dark:bg-slate-600">
                            <span>✅ in stock</span>
                          </div>
                          <div className="cart__remove-button">
                            <button
                              type="button"
                              onClick={() => removeItemHandler(item.id)}
                              aria-label="Remove Cart Item"
                              className="border-2 border-[#ccc] shadow-sm py-1 px-3 rounded-sm bg-red-700 text-white tracking-wide capitalize font-medium text-[0.8rem] transition-all duration-300 hover:border-red-700 hover:bg-red-50 hover:border-2 hover:text-red-700 dark:hover:bg-slate-900"
                            >
                              remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          {/* Order Summary */}
          <div className="w-full md:col-span-4 h-fit lg:sticky lg:top-5 rounded-sm p-6 sm:p-8 shadow-sm my-10 border border-[#ccc] bg-white dark:bg-slate-900 dark:border-slate-500">
            {/* Heading */}
            <div className="order-summary__heading pb-6">
              <h2 className="text-[1.1rem] font-medium tracking-wide text-slate-900 dark:text-white">
                Order Summary
              </h2>
            </div>

            {/* Summary Details */}
            <div className="order-summary__details space-y-5">
              {/* Subtotal */}
              <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                <span className="text-[0.9rem] md:text-[1rem] text-slate-500 font-medium dark:text-white">
                  Subtotal
                </span>

                <span className="text-[0.9rem] font-semibold text-slate-900 dark:text-white">
                  ${subTotal.toFixed(2) || 0}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                <span className="text-[0.9rem] md:text-[1rem] text-slate-500 font-medium dark:text-white">
                  Shipping estimate
                </span>

                <span className="text-[0.9rem] font-semibold text-slate-900 dark:text-white">
                  ${shippingFee.toFixed(2) || 0}
                </span>
              </div>

              {/* Tax */}
              <div className="flex items-center justify-between border-b border-slate-300 pb-3">
                <span className="text-[0.9rem] md:text-[1rem] text-slate-500 font-medium dark:text-white">
                  Tax estimate
                </span>

                <span className="text-[0.9rem] font-semibold text-slate-900 dark:text-white">
                  ${tax.toFixed(2) || 0}
                </span>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-[1rem] font-medium tracking-wide text-slate-900 capitalize dark:text-white">
                  Order total
                </span>

                <span className="text-[1rem] font-bold text-slate-900 dark:text-white">
                  ${grandTotal.toFixed(2) || 0}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <div className="order-summary__button pt-5">
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="w-full bg-[#0b0b14] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300 text-white py-4 lg:py-3 rounded-md text-[0.9rem] font-medium tracking-wide shadow-sm"
              >
                Checkout
              </button>
            </div>

            {/* Footer Info */}
            <div className="order-summary__footer pt-5 flex items-start justify-center gap-2 text-center dark:text-white">
              <span className="text-slate-400 text-[0.9rem] mt-[2px] dark:text-white">
                ⓘ
              </span>

              <p className="text-slate-500 text-[0.8rem] leading-relaxed dark:text-white">
                Learn more{" "}
                <span className="underline font-medium text-slate-800 cursor-pointer dark:text-white">
                  Taxes
                </span>{" "}
                and{" "}
                <span className="underline font-medium text-slate-800 cursor-pointer dark:text-white">
                  Shipping
                </span>{" "}
                infomation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
