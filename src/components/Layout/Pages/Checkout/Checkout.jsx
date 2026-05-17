import { useState } from "react";
import Breadcrumb from "../../../UI/Breadcrumb/Breadcrumb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { formData } from "../../../Data/FormData";
import { PaymentData } from "../../../Data/PaymentData";
import Input from "../../../UI/Input/Input";
import { CiCreditCard2 } from "react-icons/ci";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartData } from "../../../services/CartApi";
import { getCheckoutData, placeOrder } from "../../../services/CheckoutApi";
import { useNavigate } from "react-router";
import { getCouponsData } from "../../../services/CouponApi";

const Checkout = () => {
  const [checkoutData, setCheckoutData] = useState({
    fname: "",
    lname: "",
    address: "",
    city: "",
    country: "",
    state: "",
    postalCode: "",

    // Payment
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [formStep, setFormStep] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");

  const [error, setError] = useState({});

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCheckoutData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const {
    data: cartItems = [],
    isLoading,
    isError,
    error: cartError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getCartData,
  });

  const {
    data: checkout = [],
    isLoading: checkoutLoading,
    isError: checkoutIsError,
    error: checkoutError,
  } = useQuery({
    queryKey: ["checkout"],
    queryFn: getCheckoutData,
  });

  const { data: coupons = [] } = useQuery({
    queryKey: ["coupons"],
    queryFn: getCouponsData,
  });

  const applyCouponHandler = () => {
    setCouponError("");

    const matchedCoupon = coupons?.find(
      (coupon) => coupon.code.toLowerCase() === couponCode.toLowerCase(),
    );

    if (!matchedCoupon) {
      setAppliedCoupon(null);
      setDiscount(0);
      return setCouponError("Invalid Coupon Error");
    }

    if (!matchedCoupon.isActive) {
      return setCouponError("Coupon is inactive");
    }

    const currentDate = new Date();
    const expiryDate = new Date(matchedCoupon.expiresAt);

    if (expiryDate < currentDate) {
      return setCouponError("Coupon expired");
    }

    if (subTotal < matchedCoupon.minimumOrderAmount) {
      return setCouponError(
        `Minimum order should be $${matchedCoupon.minimumOrderAmount}`,
      );
    }

    let calculatedDiscount = 0;

    if (matchedCoupon.discountType === "percentage") {
      calculatedDiscount = (subTotal * matchedCoupon.discountValue) / 100;

      if (
        matchedCoupon.maximumDiscountAmount &&
        calculatedDiscount > matchedCoupon.maximumDiscountAmount
      ) {
        calculatedDiscount = matchedCoupon.maximumDiscountAmount;
      }
    }

    if (matchedCoupon.discountType === "fixed") {
      calculatedDiscount = matchedCoupon.discountValue;
    }

    if (matchedCoupon.discountType === "shipping") {
      calculatedDiscount = shippingFee;
    }

    setAppliedCoupon(matchedCoupon);
    setDiscount(calculatedDiscount);
  };

  const nextStep = () => {
    setFormStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setFormStep((prev) => prev - 1);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!checkoutData.fname.trim()) {
      newErrors.fname = "First name is required";
    }

    if (!checkoutData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!checkoutData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = () => {
    const isValid = validateForm();

    if (!isValid) return;
    nextStep();
    return true;
  };

  const subTotal = cartItems?.reduce(
    (total, item) => total + Number(item.quantity * item.price),
    0,
  );

  const shippingFee = 0;
  const tax = 0;

  // const grandTotal = subTotal + shippingFee + tax;
  const grandTotal = subTotal - discount + shippingFee + tax;

  const placeOrderMutation = useMutation({
    mutationFn: (newItem) => placeOrder(newItem),
    onSuccess: (newData) => {
      queryClient.setQueryData(["checkout"], (oldData = []) => {
        return [...oldData, newData];
      });
      navigate(`/thank-you/${newData.id}`);
    },
  });

  const handlePlaceOrder = () => {
    const orderPayload = {
      customerInfo: {
        fname: checkoutData.fname,
        lname: checkoutData.lname,
        address: checkoutData.address,
        city: checkoutData.city,
        country: checkoutData.country,
        state: checkoutData.state,
        postalCode: checkoutData.postalCode,
      },
      paymentInfo: {
        cardName: checkoutData.cardName,
        cardNumber: checkoutData.cardNumber,
        expiryDate: checkoutData.expiryDate,
        cvv: checkoutData.cvv,
      },
      orderedItems: cartItems,
      pricing: {
        subtotal: subTotal,
        shippingFee,
        tax,
        grandTotal,
      },
      totalItems: cartItems.reduce((total, item) => total + item.quantity, 0),
      orderStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    placeOrderMutation.mutate(orderPayload);
  };

  const handleConfirmOrder = () => {
    const isValid = validateForm();

    if (!isValid) return;

    handlePlaceOrder();
  };

  return (
    <section className="checkout section-padding">
      <div className="px-4 lg:px-6">
        <div className="checkout__wrapper">
          <div className="checkout__top-section">
            <h4 className="checkout__page-title font-medium tracking-wide capitalize text-[1.3rem] dark:text-white">
              checkout
            </h4>
            <div className="checkout__page-breadcrumb py-1">
              <Breadcrumb />
            </div>
          </div>
          <div className="checkout__bottom-section py-7">
            <div className="checkout__shipping-info border border-[#ccc] shadow-sm rounded-md py-5 px-4 space-y-2 dark:border-white/30 dark:bg-slate-900 dark:text-white">
              <div className="checkout__shipping-logo">
                <LiaShippingFastSolid className="text-[1.4rem]" />
              </div>
              <div className="checkout__shipping-content">
                <h4 className="capitalize tracking-wide font-medium text-[0.9rem]">
                  shipping address
                </h4>
                <p className="font-medium tracking-wide text-[0.85rem] pt-[0.1rem]">
                  St. Paul's Road, Norris, SD 57560, Dakota, USA
                </p>
              </div>
              <div className="checkout__shipping-cta pt-3">
                <button className="border border-slate-200 py-1 px-3 rounded-full capitalize tracking-wide font-medium text-[0.85rem] bg-slate-50 dark:text-black">
                  change
                </button>
              </div>
            </div>
            <div className="checkout__meta-info-grid grid grid-cols-1 md:grid-cols-1 lg:grid-cols-12 pt-4 lg:gap-3 lg:items-start">
              <div className="checkout__credential-form border border-[#ccc] shadow-sm rounded-md p-4 lg:col-span-8 dark:bg-slate-900 dark:border-slate-500">
                {formStep === 1 && (
                  <div className="checkout__address-details">
                    {formData.map((field) => (
                      <div key={field.id} className="checkout__form-group pb-3">
                        <span className="block pb-1 pl-1 capitalize tracking-wide font-medium text-[0.85rem] dark:text-white">
                          {field.label}:-
                        </span>
                        <label className="relative block pt-[0.1rem]">
                          <Input
                            type={field.type}
                            name={field.name}
                            id={field.id}
                            value={checkoutData[field.name]}
                            onChange={handleChange}
                            placeholder=" "
                            className={`peer w-full border text-[0.9rem] rounded-md px-3 pt-6 pb-2 outline-none transition-all duration-300 focus:border-black dark:bg-slate-600 dark:border-slate-500 dark:text-white
                              ${error[field.name] ? "border-red-500" : "border-gray-300"}`}
                          />
                          <span className="absolute left-3 top-2 text-[0.75rem] capitalize tracking-wide font-medium text-gray-500 transition-all duration-300 bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.9rem] peer-focus:top-2 peer-focus:text-[0.75rem] peer-focus:text-black dark:bg-slate-600 dark:peer-placeholder-shown:text-white dark:peer-focus:text-white">
                            {field.label}
                          </span>
                        </label>

                        {error[field.name] && (
                          <p className="text-red-500 text-[0.75rem] pt-1">
                            {error[field.name]}
                          </p>
                        )}
                      </div>
                    ))}
                    <div className="checkout__submit-cta px-2 flex items-center gap-1 pt-3 pb-1">
                      <button
                        onClick={submitHandler}
                        className="border-2 border-[#ccc] py-[0.4rem] px-4 rounded-full tracking-wide font-medium text-[0.85rem] bg-slate-900 text-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
                      >
                        Next to payment method
                      </button>
                      <button 
                      onClick={() => navigate("/shop")}
                      className="border-2 border-[#ccc] py-[0.4rem] px-4 rounded-full tracking-wide font-medium text-[0.85rem] bg-slate-900 text-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900 transition-all duration-300">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                {formStep === 2 && (
                  <div className="checkout__payment-form">
                    <div className="checkout__card-pay flex items-center gap-3">
                      <input type="radio" />
                      <div className="checkout__card-l border border-[#ccc] py-[0.2rem] px-2 rounded-lg ring-2 ring-slate-900">
                        <CiCreditCard2 className="text-[1.4rem]" />
                      </div>
                      <span className="capitalize font-medium tracking-wide text-[0.9rem]">
                        debit / credit card
                      </span>
                    </div>
                    <div className="checkout__payment-info-form py-5">
                      {PaymentData.map((field) => (
                        <div
                          key={field.id}
                          className="checkout__form-group pb-3"
                        >
                          <span className="block pb-1 pl-1 capitalize tracking-wide font-medium text-[0.85rem]">
                            {field.label}:-
                          </span>
                          <label className="relative block pt-[0.1rem]">
                            <Input
                              type={field.type}
                              name={field.name}
                              id={field.id}
                              value={checkoutData[field.name]}
                              onChange={handleChange}
                              placeholder=" "
                              className={`peer w-full border text-[0.9rem] rounded-md px-3 pt-6 pb-2 outline-none transition-all duration-300 focus:border-black
                              ${error[field.name] ? "border-red-500" : "border-gray-300"}`}
                            />
                            <span className="absolute left-3 top-2 text-[0.75rem] capitalize tracking-wide font-medium text-gray-500 transition-all duration-300 bg-white px-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.9rem] peer-focus:top-2 peer-focus:text-[0.75rem] peer-focus:text-black">
                              {field.label}
                            </span>
                          </label>

                          {error[field.name] && (
                            <p className="text-red-500 text-[0.75rem] pt-1">
                              {error[field.name]}
                            </p>
                          )}
                        </div>
                      ))}
                      <div className="checkout__submit-cta px-2 flex items-center gap-1 pt-3 pb-1">
                        <button
                          onClick={handleConfirmOrder}
                          className="border-2 border-[#ccc] py-[0.4rem] px-4 rounded-full tracking-wide font-medium text-[0.85rem] bg-slate-900 text-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
                        >
                          Confirm Order
                        </button>
                        <button
                          onClick={prevStep}
                          className="border-2 border-[#ccc] py-[0.4rem] px-4 rounded-full tracking-wide font-medium text-[0.85rem] bg-slate-900 text-white hover:bg-slate-50 hover:text-slate-900 hover:border-slate-900 transition-all duration-300"
                        >
                          Back to shipping address
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Items Added */}
              <div className="lg:col-span-4 pt-5 lg:pt-0">
                <div className="checkout__order-summary border border-[#ccc] shadow-sm rounded-md p-4 lg:sticky lg:top-5 dark:border-slate-500 dark:bg-slate-700">
                  <div className="checkout__summary-top">
                    <h4 className="capitalize tracking-wide font-medium text-[1rem] dark:text-white">
                      order summary:-
                    </h4>
                  </div>
                  <div className="checkout__summary-bottom overflow-y-auto">
                    <div className="checkout__card-item-grid grid grid-cols-1 gap-y-3">
                      {cartItems?.length === 0 ? (
                        <div className="col-span-full">
                          <p className="text-center py-8 capitalize tracking-wide font-medium text-[0.85rem] lg:text-[0.9rem] dark:text-white">
                            no cart items to show...
                          </p>
                        </div>
                      ) : (
                        cartItems?.map((item) => (
                          <div
                            key={item.id}
                            className="cart__cartItem-card cursor-pointer flex lg:items-start lg:justify-between gap-4 border border-[#e5e7eb] p-3 rounded-md shadow-sm dark:bg-slate-900 dark:border-slate-500 dark:p-4"
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
                                  <select
                                    name="qty"
                                    id="qty"
                                    value={item.quantity}
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
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                  <div className="checkout__discount-grid">
                    <div className="w-full md:col-span-4 rounded-sm p-6 sm:p-8 shadow-sm my-3 border border-[#ccc] bg-white dark:bg-slate-900 dark:border-slate-500">
                      {/* Heading */}
                      <div className="order-summary__heading">
                        <h2 className="text-[1.1rem] font-medium tracking-wide text-slate-900 dark:text-white">
                          Order Summary
                        </h2>
                      </div>
                      <div className="checkout__discount-block pt-2 pb-4">
                        <h4 className="tracking-wide font-medium text-[0.85rem]">
                          Discount code:-
                        </h4>
                        <div className="checkout__apply-input pt-2 flex items-center gap-2">
                          <label className="relative w-full">
                            <input
                              type="text"
                              name="discount"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder=" "
                              className="w-full pb-2 pt-6 px-3 placeholder:capitalize tracking-wide text-[0.9rem] focus:outline-none focus:border-b-2 peer"
                            />
                            <span className="absolute top-2 left-2 text-[0.8rem] tracking-wide bg-white text-gray-500 font-medium peer-placeholder-shown:top-4 peer-placeholder-shown:text-[0.85rem]  peer-focus:top-2 transition-all duration-300 peer-focus:text-[0.75rem] peer-focus:text-black">
                              coupon code
                            </span>
                          </label>
                          <button
                            onClick={applyCouponHandler}
                            className="border-2 border-[#ccc] shadow-sm py-1 px-3 rounded-md capitalize tracking-wide font-medium text-[0.85rem] bg-black text-white transition-all duration-300 hover:border-black hover:text-black hover:bg-slate-50"
                          >
                            apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-red-600 text-[0.85rem] mt-2">
                            {couponError}
                          </p>
                        )}
                        {appliedCoupon && (
                          <div className="mt-3">
                            <p className="text-green-600 font-medium">
                              Coupon Applied: {appliedCoupon.code}
                            </p>

                            <p className="text-[0.9rem]">
                              You saved ${discount}
                            </p>
                          </div>
                        )}
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
                          onClick={handleConfirmOrder}
                          className="w-full bg-[#0b0b14] hover:bg-black dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white transition-all duration-300 text-white py-4 lg:py-3 rounded-md text-[0.9rem] font-medium tracking-wide shadow-sm"
                        >
                          Confirm order
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
