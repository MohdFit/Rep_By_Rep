// front-end/src/pages/auth/Login.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../../api/axios";

import bgLaptop from "../../assets/images/gym-background.png";
import mobileBg from "../../assets/images/mobileBg.png";
import logo from "../../assets/images/logo.png";
import logoDesktop from "../../assets/images/Group.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    window.innerWidth >= 1024 ? bgLaptop : mobileBg
  );
  const [logoUrl, setLogo] = useState(
    window.innerWidth >= 1024 ? logoDesktop : logo
  );

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      setImageUrl(window.innerWidth >= 1024 ? bgLaptop : mobileBg);
      setLogo(window.innerWidth >= 1024 ? logoDesktop : logo);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });

      if (response.data.data.tokens.accessToken) {
        Cookies.set("Bearer", response.data.data.tokens.accessToken, {
          expires: 7,
        });
      }

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (path) => {
    if (path !== currentPath) navigate(path);
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-end sm:flex-row sm:justify-end sm:items-end px-6"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* ---------------- Mobile Card (< sm) ---------------- */}
      <div className="block sm:hidden w-full max-w-md text-white flex flex-col gap-10 mb-0">
        <div className="flex justify-center mb-4">
          <img src={logoUrl} alt="Logo" className="h-10" />
        </div>

        <h2 className="text-white text-base opacity-90 text-center mb-8">
          Welcome back! Let's keep pushing your limits
        </h2>

        {/* Toggle Buttons */}
        <div className="flex bg-white rounded-full p-3 w-full">
          <button
            onClick={() => handleNavigate("/login")}
            className={`px-6 py-2 w-1/2 rounded-full text-center font-medium ${
              currentPath === "/login"
                ? "text-white bg-gradient-to-r from-customOrange1 to-customOrange2"
                : "text-customOrange1"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate("/register")}
            className={`px-6 py-2 w-1/2 rounded-full text-center font-medium ${
              currentPath === "/register"
                ? "text-white bg-gradient-to-r from-customOrange1 to-customOrange2"
                : "text-customOrange1"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-full px-6 py-4 border border-orange-400 text-gray-800 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-full px-6 py-4 border border-orange-400 text-gray-800 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between text-xs">
            <label className="flex items-center gap-1">
              <input type="checkbox" /> Remember me
            </label>
          </div>

          {error && <div className="text-red-400 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-2/3 mx-auto flex justify-center items-center bg-gradient-to-r from-customOrange1 to-customOrange2 text-white py-4 rounded-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center my-4 text-sm">or continue with</p>
        <div className="flex justify-center gap-4 mb-20">
          <img src="/facebook-icon.png" alt="Facebook" className="h-8 w-8" />
          <img src="/apple-icon.png" alt="Apple" className="h-8 w-8" />
          <img src="/google-icon.png" alt="Google" className="h-8 w-8" />
        </div>
      </div>

      {/* ---------------- Desktop / Tablet Card (sm+) ---------------- */}
      <div className="hidden sm:flex w-full max-w-2xl bg-white text-gray-800 rounded-t-2xl shadow-lg flex-col gap-10 p-12 mr-10 mt-4 mb-0">
        <div className="flex justify-center">
          <img src={logoUrl} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-center text-gray-600 text-base">
          Welcome back! Let's keep pushing your limits
        </h2>

        {/* Toggle Buttons */}
        <div className="flex bg-gray-100 rounded-full p-3 w-full">
          <button
            onClick={() => handleNavigate("/login")}
            className={`px-6 py-5 w-1/2 rounded-full text-center font-medium ${
              currentPath === "/login"
                ? "text-white bg-gradient-to-r from-customOrange1 to-customOrange2"
                : "text-customOrange1"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleNavigate("/register")}
            className={`px-6 py-5 w-1/2 rounded-full text-center font-medium ${
              currentPath === "/register"
                ? "text-white bg-gradient-to-r from-customOrange1 to-customOrange2"
                : "text-customOrange1"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-full px-6 py-3 border border-orange-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-full px-6 py-5 border border-orange-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="flex justify-between text-xs text-gray-500">
            <label className="flex items-center gap-1">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="text-customOrange1 hover:underline">
              Forgot Password?
            </a>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-customOrange1 to-customOrange2 text-white py-5 rounded-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">or continue with</p>
        <div className="flex justify-center gap-4">
          <img src="/facebook-icon.png" alt="Facebook" className="h-8 w-8" />
          <img src="/apple-icon.png" alt="Apple" className="h-8 w-8" />
          <img src="/google-icon.png" alt="Google" className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
