import React from "react";
import Breadcrumb from "../../../UI/Breadcrumb/Breadcrumb";
import { MdArrowRightAlt } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { getCartData } from "../../../services/CartApi";
import { getCheckoutData } from "../../../services/CheckoutApi";
import { useNavigate, useParams } from "react-router";

const ThankYou = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: cartItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
  });

  const {
    data: checkout = [],
    isLoading: checkoutIsLoading,
    isError: checkoutIsError,
    error: checkoutError,
  } = useQuery({
    queryKey: ["checkout"],
    queryFn: getCheckoutData,
  });

  const checkoutData = checkout.find((item) => item.id === id);

  const subTotal = checkoutData
    ? checkoutData?.orderedItems?.reduce(
        (total, item) => total + Number(item.quantity * item.price),
        0,
      )
    : 0;

  const shippingFee = 0;
  const tax = 0;

  const grandTotal = subTotal + shippingFee + tax;

  return (
    <section className="thankyou pt-5 pb-10">
      <div className="container mx-auto px-6 lg:px-1">
        <div className="thankyou__wrapper">
          <div className="thankyou__top-section">
            <div className="thankyou__page-breadcrumb pb-4">
              <Breadcrumb />
            </div>
            <div className="thankyou__page-message space-y-1">
              <p className="thankyou__page-subtitle uppercase tracking-wide font-medium text-gray-700 text-[0.75rem] dark:text-white">
                thanks for shopping
              </p>
              <h4 className="thankyou__page-title tracking-wide font-medium text-[1.3rem] dark:text-white">
                Payment successful!
              </h4>
              <p className="thankyou__page-description tracking-wide leading-relaxed text-gray-700 text-[0.87rem] dark:text-white">
                We appreciate your order, we’re currently processing it. So hang
                tight and we’ll send you confirmation very soon!
              </p>
            </div>
          </div>
          <div className="thankyou__bottom-section">
            <div className="thankyou__tracking py-5">
              <span className="thankyou__tracking-text font-medium tracking-wide text-gray-600 text-[0.85rem] dark:text-white">
                Tracking number
              </span>
              <p className="thankyou__tracking-number flex items-center gap-1 cursor-pointer">
                <span className="tracking-wide font-medium text-[1rem] dark:text-white">
                  #{checkoutData?.id || 4658}
                </span>
                <MdArrowRightAlt className="text-[1.1rem] dark:text-white" />
              </p>
            </div>
            <div className="thankyou__ordered-items">
              {checkoutData?.orderedItems?.length === 0 ? (
                <div className="col-span-full">
                  <p className="text-center py-8 capitalize tracking-wide font-medium text-[0.85rem] lg:text-[0.9rem] dark:text-white">
                    no cart items to show...
                  </p>
                </div>
              ) : (
                checkoutData?.orderedItems?.map((item) => (
                  <div
                    key={item.id}
                    className="cart__cartItem-card mb-3 cursor-pointer flex lg:items-start lg:justify-between gap-4 border-b border-[#ccc] px-3 py-4 dark:bg-slate-900 dark:border-slate-500 dark:p-4"
                  >
                    <div className="cart__cartItem-thumb md:w-[9rem] md:h-[9rem] lg:w-[10rem] lg:h-[10rem]">
                      <img
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
                          <span className="text-[0.85rem] font-medium tracking-wide text-gray-700">
                            Qty: {item.quantity || 0}
                          </span>
                        </div>
                        <div className="cart__item-price">
                          <span className="border-2 border-green-600 py-1 px-2 rounded-full text-green-700 font-medium text-[0.8rem] tracking-wide">
                            ${item?.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="thankyou__order-summary pt-2 pb-5 px-3">
              <div className="thankyou__summary-data flex items-end justify-between pb-3">
                <span className="tracking-wide uppercase text-gray-700 text-[0.78rem] g:text-[0.83rem] dark:text-white">
                  subtotal
                </span>
                <span className="tracking-wide text-gray-700 text-[0.85rem] g:text-[0.83rem] dark:text-white">
                  ${subTotal.toFixed(2)}
                </span>
              </div>
              <div className="thankyou__summary-data flex items-end justify-between pb-3">
                <span className="tracking-wide uppercase text-gray-700 text-[0.78rem] lg:text-[0.83rem] dark:text-white">
                  shipping
                </span>
                <span className="tracking-wide text-gray-700 text-[0.85rem] g:text-[0.83rem] dark:text-white">
                  ${shippingFee.toFixed(2)}
                </span>
              </div>
              <div className="thankyou__summary-data flex items-end justify-between pb-3 border-b border-[#ccc]">
                <span className="tracking-wide uppercase text-gray-700 text-[0.78rem] g:text-[0.83rem] dark:text-white">
                  tax
                </span>
                <span className="tracking-wide text-gray-700 text-[0.85rem] g:text-[0.83rem] dark:text-white">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="thankyou__total pt-3">
                <div className="thankyou__summary-data flex items-end justify-between pb-3">
                  <span className="tracking-wide uppercase text-black text-[0.78rem] g:text-[0.83rem] dark:text-white">
                    total
                  </span>
                  <span className="tracking-wide text-black text-[0.85rem] g:text-[0.83rem] dark:text-white">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="thankyou__shipping-details flex items-center justify-between">
              <div>
                <h4 className="tracking-wide font-medium text-[0.9rem] lg:text-[0.95rem] dark:text-white">
                  Shipping address:-
                </h4>
                <p className="tracking-wide leading-relaxed text-[0.85rem] pt-1 text-gray-700 dark:text-white">
                  {checkoutData?.customerInfo?.address}
                </p>
              </div>
              <div className="thankyou__continue-shop">
                <button
                  onClick={() => navigate("/shop")}
                  className="border-2 border-[#ccc] py-1 lg:py-[0.4rem] px-4 rounded-full tracking-wide font-medium text-[0.87rem] bg-black text-white transition-all duration-300 hover:border-black hover:bg-slate-50 hover:text-black"
                >
                  Continue shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
