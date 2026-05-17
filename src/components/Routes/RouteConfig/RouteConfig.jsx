import { lazy } from "react";
const HomePage = lazy(() => import("../../Layout/Pages/Home/HomePage"));
const Products = lazy(() => import("../../Layout/Pages/Products/Products"));
const ProductDetail = lazy(
  () => import("../../Layout/Pages/ProductDetail/ProductDetail"),
);
const AuthPage = lazy(() => import("../../Layout/Pages/Auth/AuthPage"));
const CartPage = lazy(() => import("../../Layout/Pages/Cart/CartPage"));
const Checkout = lazy(() => import("../../Layout/Pages/Checkout/Checkout"));
const ThankYou = lazy(() => import("../../Layout/Pages/ThankYou/ThankYou"));
const AboutPage = lazy(() => import("../../Layout/Pages/About/AboutPage"));

export const publicRoutes = [
  {
    id: 1,
    path: "/",
    element: HomePage,
  },
  {
    id: 2,
    path: "/auth",
    element: AuthPage,
  },
];

export const protectedRoutes = [
  {
    id: 1,
    path: "/shop",
    element: Products,
    roles: ["admin", "user"],
    props: {
      needSearch: true,
    },
  },
  {
    id: 2,
    path: "/shop/:id",
    element: ProductDetail,
    roles: ["admin", "user"],
  },
  {
    id: 3,
    path: "/cart",
    element: CartPage,
    roles: ["admin", "user"],
  },
  {
    id: 4,
    path: "/about",
    element: AboutPage,
    roles: ["admin", "user"],
  },
  {
    id: 5,
    path: "/checkout",
    element: Checkout,
    roles: ["admin", "user"],
  },
  {
    id: 6,
    path: "/thank-you/:id",
    element: ThankYou,
    roles: ["admin", "user"],
  },
];
