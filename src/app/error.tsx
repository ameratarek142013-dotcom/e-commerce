"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Home, RotateCcw } from "lucide-react";
import { FaAppleAlt, FaCarrot } from "react-icons/fa";

export default function error({error , reset} : {error: Error , reset: ()=> void}) {

  return (
    <div className="relative h-screen bg-gray-50 w-full flex flex-col items-center justify-center overflow-hidden px-4">
      
      {/* Background Animated Floating Icons */}
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

      {/* Main Content Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-md mx-auto ">
        
        {/* Central Cart Icon Box with Badge */}
        <div className="relative mb-8 ">
          <div className="w-44 h-30  bg-white rounded-3xl shadow-xl shadow-green-100/70 border border-green-50 flex items-center justify-center">
            <ShoppingCart size={64} className="text-green-500" />
          </div>

          <div className="absolute -top-3 -right-3 bg-green-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-lg shadow-green-600/35 border-2 border-white truncate max-w-35">
            {error?.message || "Error"}
          </div>

          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 text-green-500 -my-5">
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
            <div className="w-8 h-10 border-b-4 border-green-400 rounded-full"></div>
            <span className="w-2 h-2 rounded-full bg-green-400"></span>
          </div>
        </div>

        {/* Error Headings */}
        <h1 className="text-3xl font-black text-gray-900 mb-3 mt-6  tracking-tight">
          Oops! Something Went Wrong
        </h1>
        
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          An unexpected error occurred while loading this page. Don't worry, you can try again or head back home.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button 
            onClick={() => reset()}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-green-600/25 transition-all cursor-pointer"
          >
            <RotateCcw size={18} />
            <span>Try Again</span>
          </button>

          <Link 
            href="/"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-bold py-3.5 px-6 rounded-xl shadow-sm transition-all"
          >
            <Home size={18} />
            <span>Homepage</span>
          </Link>
        </div>

      </div>
    </div>
  );
}