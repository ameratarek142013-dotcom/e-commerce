import React from "react";
import { Truck, RotateCcw, ShieldCheck, Headphones } from "lucide-react";

export default function FeaturesBar() {
  const features = [
    {
      icon: <Truck size={24} className="text-emerald-600" />,
      title: "Free Shipping",
      description: "On orders over 500 EGP",
    },
    {
      icon: <RotateCcw size={24} className="text-emerald-600" />,
      title: "Easy Returns",
      description: "14-day return policy",
    },
    {
      icon: <ShieldCheck size={24} className="text-emerald-600" />,
      title: "Secure Payment",
      description: "100% secure checkout",
    },
    {
      icon: <Headphones size={24} className="text-emerald-600" />,
      title: "24/7 Support",
      description: "Contact us anytime",
    },
  ];

  return (
    <div className="w-full bg-[#EBFBF0] py-6 px-4 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        {features.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-200 shadow-sm border border-emerald-100/50 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div className="flex flex-col">
              <h4 className="font-bold text-gray-900 text-sm md:text-md">
                {item.title}
              </h4>
              <p className="text-xs  text-gray-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}