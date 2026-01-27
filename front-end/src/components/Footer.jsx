import { useState } from "react";
import { Link } from "react-router-dom";
import r from "../assets/images/footer/r.png";
import iconInsta from "../assets/images/allproducts/instgram.png";
import iconMail from "../assets/images/allproducts/mail.png";
import iconPhone from "../assets/images/allproducts/phone.png";
import iconYoutube from "../assets/images/allproducts/youtube.png";
import iconTiktok from "../assets/images/allproducts/tiktok.png";
//bg-homepageColor
const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle email subscription
    setEmail("");
  };

  return (
    <footer className="bg-homepageColor text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-row gap-8">
          <div className="max-w-sm">
            <div className="mb-6">
              <img src={r} alt="Logo" />
            </div>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Subscribe To Our Newsletter For The Latest Updates On Features And
              Releases.
            </p>

            <form onSubmit={handleSubscribe} className="mb-4">
              <div className="flex gap-2 w-full">
                <div className="flex-1 p-0.5 bg-gradient-to-r from-customOrange1 to-customOrange2 rounded-lg\">
                  <input
                    type="email"
                    placeholder="
                    Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-homepageColor text-white placeholder-gray-400 text-sm focus:outline-none rounded-md font-medium\"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-customOrange1 to-customOrange2 hover:from-orange-700 hover:to-orange-600 text-white font-semibold text-sm transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]\"
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

          <div className="flex-1">
            <div className="flex flex-row gap-8 justify-end">
              <div className="text-right">
                <h3 className="text-white font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  <li>
                    <Link
                      to="/"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      HOME PAGE
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#about"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/#contact"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      Contact US
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/programs"
                      className="text-gray-300 hover:text-customOrange1 transition-colors duration-300"
                    >
                      Shop
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="text-right">
                <h3 className="text-white font-semibold mb-6">
                  Connect With Us
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-end gap-3 text-gray-300 text-sm">
                    <a href="mailto:Hamawisaad@Gmail.Com" className="hover:text-customOrange1 transition-colors">
                      Hamawisaad@Gmail.Com
                    </a>
                    <img src={iconMail} alt="Email" className="w-5 h-5 object-contain flex-shrink-0" />
                  </div>
                  <div className="flex items-center justify-end gap-3 text-gray-300 text-sm">
                    <a href="tel:+962796728300" className="hover:text-customOrange1 transition-colors">
                      +962796728300
                    </a>
                    <img src={iconPhone} alt="Phone" className="w-5 h-5 object-contain flex-shrink-0" />
                  </div>
                  <div className="flex items-center justify-end gap-3 text-gray-300 text-sm">
                    <a href="https://instagram.com/Assadhamawi" target="_blank" rel="noopener noreferrer" className="hover:text-customOrange1 transition-colors">
                      @Assadhamawi
                    </a>
                    <img src={iconInsta} alt="Instagram" className="w-5 h-5 object-contain flex-shrink-0" />
                  </div>
                  <div className="flex items-center justify-end gap-3 text-gray-300 text-sm">
                    <a href="https://youtube.com/@Assadhamawi" target="_blank" rel="noopener noreferrer" className="hover:text-customOrange1 transition-colors">
                      @Assadhamawi
                    </a>
                    <img src={iconYoutube} alt="YouTube" className="w-5 h-5 object-contain flex-shrink-0" />
                  </div>
                  <div className="flex items-center justify-end gap-3 text-gray-300 text-sm">
                    <a href="https://tiktok.com/@Assadhamawi" target="_blank" rel="noopener noreferrer" className="hover:text-customOrange1 transition-colors">
                      @Assadhamawi
                    </a>
                    <img src={iconTiktok} alt="TikTok" className="w-5 h-5 object-contain flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 Rep By Rep. PCM.
            </p>
            <div className="flex gap-8">
              <Link to="/terms" className="text-gray-400 text-sm hover:text-customOrange1 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="text-gray-400 text-sm hover:text-customOrange1 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

