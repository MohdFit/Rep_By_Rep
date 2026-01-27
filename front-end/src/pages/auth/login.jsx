import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthContext";
import authUtils from "../../utils/authUtils";
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
  const { login } = useAuth();
  const currentPath = location.pathname;
  
  // Get redirect parameter from URL or location state
  const getRedirectPath = () => {
    const params = new URLSearchParams(location.search);
    return params.get('redirect') || location.state?.from || "/";
  };

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
    
    // Validate inputs
    const errors = authUtils.getLoginErrors(email, password);
    if (Object.keys(errors).length > 0) {
      setError(Object.values(errors)[0]); // Show first error
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/login", { email, password });

      if (response.data.success && response.data.data) {
        const { tokens, user } = response.data.data;

        // Use AuthContext to store auth data
        login(tokens, user);

        // Also set cookie for optional use
        if (tokens.accessToken) {
          Cookies.set("Bearer", tokens.accessToken, {
            expires: 7,
          });
        }

        // Redirect to the page user originally wanted
        const redirectTo = getRedirectPath();
        navigate(redirectTo);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Login error:", err);
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
      
      <div className="block sm:hidden w-full max-w-md text-white flex flex-col gap-10 mb-0">
        <div className="flex justify-center mb-4">
          <img src={logoUrl} alt="Logo" className="h-10" />
        </div>

        <h2 className="text-white text-base opacity-90 text-center mb-8">
          Welcome back! Let's keep pushing your limits
        </h2>

        
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
            className="w-full rounded-full px-6 py-4 border-2 border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-full px-6 py-4 border-2 border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />

          <div className="flex justify-between text-xs">
            <label className="flex items-center gap-1">
              <input type="checkbox" /> Remember me
            </label>
          </div>

          {error && <div className="text-red-600 font-medium text-sm bg-red-50 border-2 border-red-200 rounded-lg p-3 mt-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-2/3 mx-auto flex justify-center items-center bg-gradient-to-r from-customOrange1 to-customOrange2 hover:from-orange-700 hover:to-orange-600 text-white py-3 rounded-full font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center my-4 text-sm">or continue with</p>
        <div className="flex justify-center gap-4">
          <button className="hover:opacity-80" disabled>
            <img src="/facebook-icon.png" alt="Facebook" className="h-8 w-8" />
          </button>
          <button className="hover:opacity-80" disabled>
            <img src="/apple-icon.png" alt="Apple" className="h-8 w-8" />
          </button>
          <button className="hover:opacity-80" disabled>
            <img src="/google-icon.png" alt="Google" className="h-8 w-8" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-300 mt-2 mb-20">Social login coming soon</p>
      </div>

      
      <div className="hidden sm:flex w-full max-w-2xl bg-white text-gray-800 rounded-t-2xl shadow-lg flex-col gap-10 p-12 mr-10 mt-4 mb-0">
        <div className="flex justify-center">
          <img src={logoUrl} alt="Logo" className="h-16" />
        </div>

        <h2 className="text-center text-gray-600 text-base">
          Welcome back! Let's keep pushing your limits
        </h2>

        
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
            className="w-full rounded-full px-6 py-5 border-2 border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-gray-800"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />

          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-full px-6 py-5 border-2 border-orange-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all text-gray-800"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
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

          {error && <div className="text-red-600 font-medium text-sm bg-red-50 border-2 border-red-200 rounded-lg p-3 mt-2">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-customOrange1 to-customOrange2 hover:from-orange-700 hover:to-orange-600 text-white py-5 rounded-full font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.01] active:scale-[0.99]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500">or continue with</p>
        <div className="flex justify-center gap-4">
          <button className="hover:opacity-80" disabled>
            <img src="/facebook-icon.png" alt="Facebook" className="h-8 w-8" />
          </button>
          <button className="hover:opacity-80" disabled>
            <img src="/apple-icon.png" alt="Apple" className="h-8 w-8" />
          </button>
          <button className="hover:opacity-80" disabled>
            <img src="/google-icon.png" alt="Google" className="h-8 w-8" />
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mt-2">Social login coming soon</p>
      </div>
    </div>
  );
}

