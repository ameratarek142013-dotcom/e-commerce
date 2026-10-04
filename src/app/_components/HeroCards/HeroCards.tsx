"use client";

import React from "react";
import { motion } from "framer-motion";
import { Truck, ShieldCheck, RotateCcw, Headphones } from "lucide-react";

const features = [
  {
    icon: <Truck size={24} className="text-blue-600" />,
    bgIcon: "bg-blue-50",
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
  },
  {
    icon: <ShieldCheck size={24} className="text-emerald-600" />,
    bgIcon: "bg-emerald-50",
    title: "Secure Payment",
    subtitle: "100% secure transactions",
  },
  {
    icon: <RotateCcw size={24} className="text-amber-600" />,
    bgIcon: "bg-amber-50",
    title: "Easy Returns",
    subtitle: "14-day return policy",
  },
  {
    icon: <Headphones size={24} className="text-purple-600" />,
    bgIcon: "bg-purple-50",
    title: "24/7 Support",
    subtitle: "Dedicated support team",
  },
];

export default function HeroCards() {
  return (
    <div className="bg-slate-50">
        <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.5,
              delay: index * 0.15, // تأخير بسيط لكل كارت ليعملوا بتتابع رائع
              ease: "easeOut",
            }}
            className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* أيقونة الكارت بخلفية دائرية ملونة */}
            <div className={`w-12 h-12 rounded-full ${item.bgIcon} flex items-center justify-center shrink-0`}>
              {item.icon}
            </div>

            {/* النصوص */}
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
}