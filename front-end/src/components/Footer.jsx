import { useState } from "react";
import r from "../assets/images/footer/r.png";
//bg-homepageColor
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-homepageColor text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row gap-8">
          {/* Left Section - Newsletter */}
          <div className="max-w-sm">
            {/* Logo */}
            <div className="mb-6">
              <img src={r} alt="Logo" />
            </div>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Subscribe To Our Newsletter For The Latest Updates On Features And
              Releases.
            </p>

            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex gap-2 w-full">
                <div className="flex-1 p-0.5 bg-gradient-to-r from-customOrange1 to-customOrange2 rounded">
                  <input
                    type="email"
                    placeholder="YOU EMAIL"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-0.5 bg-homepageColor text-white placeholder-gray-400 text-sm focus:outline-none rounded-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-0.5 bg-gradient-to-r from-customOrange1 to-customOrange2 hover:from-customOrange2 hover:to-customOrange1 text-white font-medium text-sm transition-all duration-300 rounded"
                >
                  Subscribe
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-400">
              By Subscribing, You Consent To Our Privacy Policy And Agree To
              Receive Updates.
            </p>
          </div>

          {/* Right Section - Quick Links and Connect With Us */}
          <div className="flex-1">
            <div className="flex flex-row gap-8 justify-end">
              {/* Quick Links */}
              <div className="text-right">
                <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="/"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      HOME PAGE
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      Contact US
                    </a>
                  </li>
                  <li>
                    <a
                      href="/shop"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      Shop
                    </a>
                  </li>
                </ul>
              </div>

              {/* Connect With Us */}
              <div className="text-right">
                <h3 className="text-white font-semibold mb-6">
                  Connect With Us
                </h3>
                <div className="space-y-4">
                  <div className="text-gray-300 text-sm">
                    Hamawisaad@Gmail.Com
                  </div>
                  <div className="text-gray-300 text-sm">+962796728300</div>
                  <div className="text-gray-300 text-sm">@Assadhamawi</div>
                  <div className="text-gray-300 text-sm">@Assadhamawi</div>
                  <div className="text-gray-300 text-sm">@Assadhamawi</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Relume. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <span className="text-gray-400 text-sm">Lorem Ipsum</span>
              <span className="text-gray-400 text-sm">Lorem Ipsum</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
