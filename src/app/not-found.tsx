"use client";

import React from "react";
import Link from "next/link";
import { FaShoppingCart, FaHome, FaArrowLeft, FaBox, FaThLarge, FaTags, FaEnvelope } from "react-icons/fa";
import { FaAppleAlt, FaCarrot } from "react-icons/fa";


export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-green-50/30 w-full flex flex-col items-center justify-center overflow-hidden  py-12">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute  top-20 left-20  text-green-300 animate-slow-bounce  opacity-60 rotate-12">
                <FaAppleAlt size={40} />
              </div>
      
              <div className="absolute bottom-40 left-60   text-green-200 animate-slow-bounce opacity-60">
                <FaAppleAlt size={20}/>
              </div>
              
              <div className="absolute top-30 right-20  text-green-300 animate-slow-bounce  opacity-60 ">
                <FaCarrot size={40}/>
              </div>
      
              <div className="absolute bottom-70 right-60  text-green-200 animate-slow-bounce  opacity-60 ">
                <FaCarrot size={22}/>
              </div>
      
      
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-50/40 rounded-full blur-3xl -z-10"></div>
            </div>

      {/* Background Subtle Shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-green-100/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center text-center  mx-auto">
        
        {/* Central Cart Icon Box with 404 Badge */}
        <div className="relative mb-8">
          <div className="w-60 h-44 bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-green-50 flex items-center justify-center">
            <FaShoppingCart size={72} className="text-green-500/70" />
          </div>

          <div className="absolute -top-4 -right-8 bg-green-600 text-white font-black text-xl px-4 py-5 rounded-full shadow-lg shadow-green-600/30 border-8 border-white tracking-wider">
            404
          </div>

          {/* Dots and Smile Line Graphic */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-green-500">
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
            <div className="w-10 h-12 border-b-6 border-green-400 rounded-full"></div>
            <span className="w-3 h-3 rounded-full bg-green-400"></span>
          </div>
        </div>

        {/* Text Section */}
        <h1 className="text-5xl  font-extrabold text-gray-900 mb-3 tracking-tight mt-12">
          Oops! Nothing Here
        </h1>
        
        <p className="text-lg  text-gray-500 my-8 max-w-md leading-relaxed">
          Looks like this page went out of stock! Don't worry, there's plenty more fresh content to explore.
        </p>

        {/* Action Buttons with Hover Effects */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-10">
          
          {/* Go to Homepage Button (Moves Up on Hover) */}
          <Link 
            href="/"
            className="w-full text-lg sm:w-auto flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-green-600/25 transition-all duration-300 hover:-translate-y-1"
          >
            <FaHome size={18} />
            <span>Go to Homepage</span>
          </Link>

          {/* Go Back Button (Arrow Moves Left on Hover) */}
          <button 
            onClick={() => window.history.back()}
            className="group w-full text-lg sm:w-auto flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all duration-300 cursor-pointer"
          >
            <FaArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Popular Destinations Box */}
        <div className="w-full bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <span className="block  font-bold tracking-wider text-gray-400 uppercase mb-4">
            Popular Destinations
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Link 
              href="/products" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-green-50 text-green-700  font-bold transition-colors"
            >
            
              <span>All Products</span>
            </Link>

            <Link 
              href="/categories" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-600  font-semibold transition-colors"
            >
             
              <span>Categories</span>
            </Link>

            <Link 
              href="/deals" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-600  font-semibold transition-colors"
            >
             
              <span>Today's Deals</span>
            </Link>

            <Link 
              href="/contact" 
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-100 text-gray-600  font-semibold transition-colors"
            >
             
              <span>Contact Us</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}