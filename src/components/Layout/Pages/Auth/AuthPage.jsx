import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaXTwitter } from "react-icons/fa6";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../../../API/Auth/AuthThunk";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  // Login State
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Register State
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Error State
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  // Password Visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    authData = [],
    loginLoading,
    registerLoading,
  } = useSelector((state) => state.auth);

  // Handle Login Input
  const handleLoginChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Register Input
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!loginData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!loginData.password.trim()) {
      errors.password = "Password is required";
    }

    setLoginErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(loginUser(loginData))
        .unwrap()
        .then(() => {
          toast.success("User Logged In Successfully");

          setLoginData({
            email: "",
            password: "",
          });

          setLoginErrors({});
          navigate("/");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  // Register Submit
  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!registerData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!registerData.email.trim()) {
      errors.email = "Email is required";
    }

    if (!registerData.password.trim()) {
      errors.password = "Password is required";
    }

    if (!registerData.confirmPassword.trim()) {
      errors.confirmPassword = "Confirm password is required";
    }

    if (
      registerData.password &&
      registerData.confirmPassword &&
      registerData.password !== registerData.confirmPassword
    ) {
      errors.confirmPassword = "Passwords do not match";
    }

    setRegisterErrors(errors);

    if (Object.keys(errors).length === 0) {
      dispatch(registerUser(registerData))
        .unwrap()
        .then(() => {
          toast.success("User registered successfully");

          setRegisterData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });

          setRegisterErrors({});
          setActiveTab("login");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-950 dark:via-slate-900 dark:to-black px-4 py-8 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-[1150px] bg-white dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-2xl dark:shadow-black/40 backdrop-blur-xl grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT CONTENT */}
        <div className="hidden lg:flex relative bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-10 flex-col justify-between overflow-hidden border-r border-white/10">
          {/* Background Blur */}
          <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-3xl"></div>

          <div className="absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full bg-pink-500/20 blur-3xl"></div>

          {/* Top Content */}
          <div className="relative z-10">
            <button className="px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-[0.85rem] tracking-wide shadow-lg">
              Premium Shopping Experience
            </button>

            <h2 className="text-[3.3rem] font-bold leading-tight mt-8">
              Fashion That
              <br />
              Speaks Luxury.
            </h2>

            <p className="text-slate-300 mt-6 text-[1rem] leading-8 max-w-[420px]">
              Discover exclusive collections, premium products and seamless
              shopping experiences crafted for modern lifestyles.
            </p>
          </div>

          {/* Bottom Stats */}
          <div className="relative z-10 grid grid-cols-3 gap-4 mt-10">
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
              <h4 className="text-[1.6rem] font-bold">12k+</h4>

              <p className="text-slate-300 text-[0.85rem] mt-2">Active Users</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
              <h4 className="text-[1.6rem] font-bold">4.9★</h4>

              <p className="text-slate-300 text-[0.85rem] mt-2">User Ratings</p>
            </div>

            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
              <h4 className="text-[1.6rem] font-bold">250+</h4>

              <p className="text-slate-300 text-[0.85rem] mt-2">Top Brands</p>
            </div>
          </div>
        </div>

        {/* RIGHT AUTH FORM */}
        <div className="p-5 sm:p-8 lg:p-10">
          {/* Tab Switch */}
          <div className="bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 p-1 rounded-full flex items-center backdrop-blur-md">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-3 rounded-full text-[0.9rem] font-medium transition-all duration-300 ${
                activeTab === "login"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-3 rounded-full text-[0.9rem] font-medium transition-all duration-300 ${
                activeTab === "register"
                  ? "bg-black dark:bg-white text-white dark:text-black shadow-md"
                  : "text-slate-600 dark:text-slate-300"
              }`}
            >
              Register
            </button>
          </div>

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <div className="mt-8">
              <div>
                <h2 className="text-[2rem] font-bold dark:text-white">
                  Welcome Back 👋
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2 text-[0.95rem]">
                  Login to continue your premium shopping journey.
                </p>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">
                <button className="h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 dark:text-white">
                  <FaGoogle />

                  <span className="text-[0.9rem] font-medium">Google</span>
                </button>

                <button className="h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 dark:text-white">
                  <FaFacebookF />

                  <span className="text-[0.9rem] font-medium">Facebook</span>
                </button>

                <button className="h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 dark:text-white">
                  <FaXTwitter />

                  <span className="text-[0.9rem] font-medium">Twitter</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-7">
                <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700"></div>

                <span className="text-[0.75rem] text-slate-400 tracking-[0.15rem]">
                  OR CONTINUE WITH EMAIL
                </span>

                <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-700"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="text-[0.9rem] font-medium text-slate-700 dark:text-slate-200">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="Enter your email"
                    className="w-full mt-2 h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 text-[0.9rem] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/40 transition-all duration-300"
                  />

                  {loginErrors.email && (
                    <p className="text-red-500 dark:text-red-400 text-[0.8rem] mt-2 font-medium tracking-wide">
                      {loginErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="text-[0.9rem] font-medium text-slate-700 dark:text-slate-200">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      className="w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 pr-12 text-[0.9rem] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/40 transition-all duration-300"
                    />

                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[1.1rem] text-slate-500 dark:text-slate-300"
                    >
                      {showLoginPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>

                  {loginErrors.password && (
                    <p className="text-red-500 dark:text-red-400 text-[0.8rem] mt-2 font-medium tracking-wide">
                      {loginErrors.password}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  disabled={loginLoading}
                  className={`w-full h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-medium tracking-wide hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg dark:shadow-white/10 disabled:bg-slate-500 disabled:cursor-not-allowed`}
                >
                  {loginLoading ? "Logging You In" : "Login Now"}
                </button>
              </form>
            </div>
          )}

          {/* REGISTER FORM */}
          {activeTab === "register" && (
            <div className="mt-8">
              <div>
                <h2 className="text-[2rem] font-bold dark:text-white">
                  Create Account
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2 text-[0.95rem]">
                  Join our premium shopping platform today.
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-5 mt-7">
                {/* Username */}
                <div>
                  <label className="text-[0.9rem] font-medium text-slate-700 dark:text-slate-200">
                    Username
                  </label>

                  <input
                    type="text"
                    name="username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    placeholder="Enter username"
                    className="w-full mt-2 h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 text-[0.9rem] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/40 transition-all duration-300"
                  />

                  {registerErrors.username && (
                    <p className="text-red-500 dark:text-red-400 text-[0.8rem] mt-2 font-medium tracking-wide">
                      {registerErrors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-[0.9rem] font-medium text-slate-700 dark:text-slate-200">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    placeholder="Enter your email"
                    className="w-full mt-2 h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 text-[0.9rem] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/40 transition-all duration-300"
                  />

                  {registerErrors.email && (
                    <p className="text-red-500 dark:text-red-400 text-[0.8rem] mt-2 font-medium tracking-wide">
                      {registerErrors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="text-[0.9rem] font-medium text-slate-700 dark:text-slate-200">
                    Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      name="password"
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      placeholder="Enter password"
                      className="w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 pr-12 text-[0.9rem] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/40 transition-all duration-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowRegisterPassword(!showRegisterPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[1.1rem] text-slate-500 dark:text-slate-300"
                    >
                      {showRegisterPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>

                  {registerErrors.password && (
                    <p className="text-red-500 dark:text-red-400 text-[0.8rem] mt-2 font-medium tracking-wide">
                      {registerErrors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="text-[0.9rem] font-medium text-slate-700 dark:text-slate-200">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      placeholder="Confirm password"
                      className="w-full h-12 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 px-4 pr-12 text-[0.9rem] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/40 transition-all duration-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[1.1rem] text-slate-500 dark:text-slate-300"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>

                  {registerErrors.confirmPassword && (
                    <p className="text-red-500 dark:text-red-400 text-[0.8rem] mt-2 font-medium tracking-wide">
                      {registerErrors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  disabled={registerLoading}
                  className={`w-full h-12 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-medium tracking-wide hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg dark:shadow-white/10 disabled:bg-slate-500 disabled:cursor-not-allowed`}
                >
                  {registerLoading ? "Creating Your Account" : "Create Account"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
