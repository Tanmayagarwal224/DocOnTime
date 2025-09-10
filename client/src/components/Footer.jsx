import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-gray-500 text-gray-300 pt-12 px-6 md:px-20 rounded-2xl">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-700">
        {/* Logo & Paragraph */}
        <div>
          <img src={assets.logo} alt="logo" className="w-32 mb-4" />
          <p className="text-sm leading-relaxed">
            Find trusted doctors and book appointments with ease. Your health is
            our priority, and we’re here to connect you with the right care at the
            right time.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-lg font-semibold text-white mb-4">COMPANY</p>
          <ul className="space-y-2 text-sm cursor-pointer">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-lg font-semibold text-white mb-4">GET IN TOUCH</p>
          <ul className="space-y-2 text-sm">
            <li>+0-141-5555580</li>
            <li>projectbuild@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center py-6 text-sm text-gray-400">
        <hr className="border-gray-700 mb-4" />
        <p>Copyright © 2025 Doctor — All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
