import React from "react";
import { Phone, Mail, MapPin, CreditCard } from "lucide-react";
import { TiSocialFacebook, TiSocialTwitter } from "react-icons/ti";
import { SlSocialInstagram, SlSocialYoutube } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import logo from '../../../../public/assets/freshcart-logo.49f1b44d.svg'

export default function Footer() {
  return (
    <footer className="bg-[#0D1527] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-gray-800/60">

        {/* Column 1: Brand Info & Contact */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Logo Box */}
          <div className="bg-white px-4 py-2.5 rounded-xl inline-flex items-center gap-2 w-fit shadow-sm">
            <span className="text-emerald-600 font-bold text-xl flex items-center gap-1">
              <Link href={'/'}>
                <div className="flex items-center gap-3 cursor-pointer">
                  <Image
                    priority
                    src={logo}
                    alt="FreshCart Logo"
                    className="h-8  w-auto object-contain"
                  />
                </div>
              </Link>
            </span>
          </div>

          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            FreshCart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.
          </p>

          <div className="flex flex-col gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-3">
              <Phone size={16} className="text-green-500 shrink-0" />
              <Link className="hover:text-green-400 transition-all" href={'tel:+1 (800) 123-4567'}>+1 (800) 123-4567</Link>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-green-500 shrink-0" />
              <Link className="hover:text-green-400 transition-all" href={'mail:support@freshcart.com'}>support@freshcart.com</Link>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-green-500 shrink-0" />
              <span>123 Commerce Street, New York, NY 10001</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 pt-2">
            <Link href="#" className="w-10 h-10 rounded-full bg-gray-600/90 hover:bg-green-600 flex items-center justify-center text-white transition-colors">
              <TiSocialFacebook className="text-lg" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-gray-600/90 hover:bg-green-600 flex items-center justify-center text-white transition-colors">
              <TiSocialTwitter className="text-lg" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-gray-600/90 hover:bg-green-600 flex items-center justify-center text-white transition-colors">
              <SlSocialInstagram className="text-lg" />
            </Link>
            <Link href="#" className="w-10 h-10 rounded-full bg-gray-600/90 hover:bg-green-600 flex items-center justify-center text-white transition-colors">
              <SlSocialYoutube className="text-lg" />
            </Link>
          </div>
        </div>

        {/* Column 2: Shop */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg">Shop</h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium space-y-2">
            <li><Link href="/products" className="hover:text-green-400 transition-colors">All Products</Link></li>
            <li><Link href="/categories" className="hover:text-green-400 transition-colors">Categories</Link></li>
            <li><Link href="/brands" className="hover:text-green-400 transition-colors">Brands</Link></li>
            <li><Link href="/products?category=6439d2d167d9aa4ca970649f" className="hover:text-green-400 transition-colors">Electronics</Link></li>
            <li><Link href="/products?category=6439d5b90049ad0b52b90048" className="hover:text-green-400 transition-colors">Men's Fashion</Link></li>
            <li><Link href="/products?category=6439d58a0049ad0b52b9003f" className="hover:text-green-400 transition-colors">Women's Fashion</Link></li>
          </ul>
        </div>

        {/* Column 3: Account */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg">Account</h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium space-y-2">
            <li><Link href="/profile/addresses" className="hover:text-green-400 transition-colors">My Account</Link></li>
            <li><Link href="/allorders" className="hover:text-green-400 transition-colors">Order History</Link></li>
            <li><Link href="/washlist" className="hover:text-green-400 transition-colors">Wishlist</Link></li>
            <li><Link href="/cart" className="hover:text-green-400 transition-colors">Shopping Cart</Link></li>
            <li><Link href="/login" className="hover:text-green-400 transition-colors">Sign In</Link></li>
            <li><Link href="/register" className="hover:text-green-400 transition-colors">Create Account</Link></li>
          </ul>
        </div>

        {/* Column 4: Support */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg">Support</h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium space-y-2">
            <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact Us</Link></li>
            <li><Link href="#" className="hover:text-green-400 transition-colors">Help Center</Link></li>
            <li><Link href="#" className="hover:text-green-400 transition-colors">Shipping Info</Link></li>
            <li><Link href="#" className="hover:text-green-400 transition-colors">Returns & Refunds</Link></li>
            <li><Link href="#" className="hover:text-green-400 transition-colors">Track Order</Link></li>
          </ul>
        </div>

        {/* Column 5: Legal */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-white font-bold text-lg">Legal</h4>
          <ul className="flex flex-col gap-2.5 text-sm font-medium space-y-2">
            <li><Link href="/privacypolicy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="/termsofservice" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
            <li><Link href="/cookiepolicy" className="hover:text-green-400 transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Copyright & Payment Methods */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p>© 2026 FreshCart. All rights reserved.</p>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors cursor-pointer">
            <CreditCard size={16} />
            <span>Visa</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors cursor-pointer">
            <CreditCard size={16} />
            <span>Mastercard</span>
          </div>
          <div className="flex items-center gap-1.5 hover:text-gray-300 transition-colors cursor-pointer">
            <CreditCard size={16} />
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}