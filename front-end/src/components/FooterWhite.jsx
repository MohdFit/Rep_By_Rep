// src/components/FooterWhite.jsx
import React from "react";

import footer from "../assets/images/footer/r.png";
import iconInsta from "../assets/images/allproducts/instgram.png";
import iconMail from "../assets/images/allproducts/mail.png";
import iconPhone from "../assets/images/allproducts/phone.png";
import iconYoutube from "../assets/images/allproducts/youtube.png";
import iconTiktok from "../assets/images/allproducts/tiktok.png";

export default function FooterWhite() {
  return (
    <footer className="bg-[#FBF4F2] text-[#0E1830]">
      <div className="mx-auto max-w-[1274px] px-[17px] sm:px-[83px] py-12 sm:py-16">
        <div
          className="
            grid grid-cols-1 sm:grid-cols-12
            gap-y-10 sm:gap-y-0 sm:gap-x-6
            items-center sm:items-start
            justify-items-center sm:justify-items-start
            text-center sm:text-left
          "
        >
          <div className="w-full sm:col-span-6">
            <div className="mb-6">
              <img
                src={footer}
                alt="Brand"
                className="h-10 w-auto select-none pointer-events-none mx-auto sm:mx-0"
              />
            </div>

            <h3 className="text-[16px] sm:text-[18px] font-medium leading-relaxed">
              Subscribe to our newsletter for the latest updates on
              <br className="hidden sm:block" />
              features and releases.
            </h3>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-5 flex w-full max-w-[420px] gap-2 mx-auto sm:mx-0"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 h-9 rounded-md border border-orange-400 bg-white px-3 text-sm outline-none placeholder:text-[#A9A9A9] focus:ring-2 focus:ring-orange-300"
              />
              <button
                type="submit"
                className="h-9 whitespace-nowrap rounded-md bg-orange-500 px-4 text-sm font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                Subscribe
              </button>
            </form>

            <p className="mt-2 max-w-[420px] text-[12px] leading-relaxed text-[#6B7280] mx-auto sm:mx-0">
              By subscribing, you consent to our privacy policy and agree to
              receive updates.
            </p>
          </div>

          <div className="hidden sm:block sm:col-span-1" />

          <div className="w-full sm:col-span-2">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-[15px]">
              <li>
                <a href="#" className="hover:text-orange-600">
                  HOME PAGE
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-600">
                  Shop
                </a>
              </li>
            </ul>
          </div>

          <div className="w-full sm:col-span-3">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <ul className="space-y-3 text-[15px]">
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <img src={iconMail} alt="" className="w-4 h-4 object-contain" />
                <a
                  href="mailto:Hamawiasaad@gmail.com"
                  className="hover:text-orange-600"
                >
                  Hamawiasaad@Gmail.com
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <img
                  src={iconPhone}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
                <a href="tel:+962796728300" className="hover:text-orange-600">
                  +962 796 728 300
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <img
                  src={iconInsta}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
                <a href="#" className="hover:text-orange-600">
                  @Assadhamawi
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <img
                  src={iconYoutube}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
                <a href="#" className="hover:text-orange-600">
                  @Assadhamawi
                </a>
              </li>
              <li className="flex items-center justify-center sm:justify-start gap-3">
                <img
                  src={iconTiktok}
                  alt=""
                  className="w-4 h-4 object-contain"
                />
                <a href="#" className="hover:text-orange-600">
                  @Assadhamawi
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-8 h-px bg-black/5" />

        <div
          className="
           
            flex  sm:flex-row
            items-center sm:items-center
            justify-between sm:justify-between
            gap-3
            text-[12px] text-[#6B7280]
            text-center sm:text-left
 
                    "
        >
          <p>© 2025 Relume. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-orange-600">
              Lorem ipsum
            </a>
            <a href="#" className="hover:text-orange-600">
              Lorem ipsum
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

