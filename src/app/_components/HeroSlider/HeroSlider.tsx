"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from 'next/link'


// استيراد ملفات الـ CSS الخاصة بـ Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slidesData = [
  {
    id: 1,
    title: "Fresh Products Delivered to your Door",
    subtitle: "Get 20% off your first order",
    primaryBtn: "Shop Now",
    secondaryBtn: "View Deals",
    bgImage: "/assets/sliderImage.png",
    href : '/products'
  },
  {
    id: 2,
    title: "Premium Quality Guaranteed",
    subtitle: "Fresh from farm to your table",
    primaryBtn: "Shop Now",
    secondaryBtn: "Learn More",
    bgImage: "/assets/sliderImage.png",
    href : '/products'
  },
  {
    id: 3,
    title: "Fast & Free Delivery",
    subtitle: "Same day delivery available",
    primaryBtn: "Order Now",
    secondaryBtn: "Delivery Info",
    bgImage: "/assets/sliderImage.png",
    href : '/products'
  }
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full h-100  overflow-hidden shadow-sm">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative w-full h-full">
            {/* خلفية الصورة مع الفلتر الأخضر الشفاف المطابق للتصميم */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
              style={{ backgroundImage: `url(${slide.bgImage})` }}
            >
              {/* طبقة التدرج الأخضر الشفاف */}
              <div className="absolute inset-0 bg-linear-to-r from-green-600/80  to-green-400/20" />
            </div>

            {/* محتوى النصوص والأزرار مع أنيميشن الصعود من الأسفل */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-30  max-w-2xl text-white">
              {activeIndex === index && (
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {/* العنوان الرئيسي */}
                    <h1 className="text-3xl  font-bold tracking-tight mb-3  drop-shadow-sm leading-tight">
                      {slide.title}
                    </h1>

                    {/* العنوان الفرعي */}
                    <p className="text-base md:text-lg font-medium text-white mb-6">
                      {slide.subtitle}
                    </p>

                    {/* الأزرار */}
                    <div className="flex items-center gap-4">
                      <Link href={`${slide.href}`}> <button className="bg-white text-emerald-700 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold text-sm shadow-md transition-all transform hover:scale-105 cursor-pointer">
                        {slide.primaryBtn}
                      </button> </Link>
                      <button className="border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-xl font-semibold text-sm transition-all backdrop-blur-sm">
                        {slide.secondaryBtn}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* أزرار التنقل يمين ويسار (Arrows) */}
      <button className="hidden md:flex swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-emerald-800 items-center justify-center shadow-md transition-all cursor-pointer">
        <ChevronLeft size={24} />
      </button>
      <button className=" hidden md:flex swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-emerald-800  items-center justify-center shadow-md transition-all cursor-pointer">
        <ChevronRight size={24} />
      </button>

      {/* النقاط السفلية (Pagination Dots) */}
      <div className="swiper-pagination-custom absolute bottom-4 -left-100  z-20 flex gap-2 justify-center items-center"></div>

      {/* تخصيص شكل نقاط الـ Pagination عبر Tailwind/CSS */}
      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 15px;
          height: 12px;
          background: white;
          border-radius: 9999px;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 32px;
          background: #ffffff;
        }
      `}</style>
    </div>
  );
}