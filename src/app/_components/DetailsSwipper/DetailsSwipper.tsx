'use client'
import React, { useState } from 'react'
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { ProductType } from '@/types/product.types';


export default function DetailsSwipper({ product }: { product: ProductType }) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

    return (
        <>
            <div className="lg:col-span-4 lg:sticky top-24 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-4 min-w-0">

                {/* الصورة الكبيرة */}
                <div className="w-full min-w-0">
                    <Swiper
                        thumbs={{ swiper: thumbsSwiper ? thumbsSwiper : null }}
                        modules={[FreeMode, Thumbs]}
                        className="w-full h-87.5 md:h-100 bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center"
                    >
                        {product.images.map((img, index) => (
                            <SwiperSlide key={index} className="relative flex items-center justify-center w-full h-full">
                                <Image fill priority={index === 0} sizes="(max-width: 768px) 100vw, 500px" src={img} alt="" className="w-full h-full object-contain px-2" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* الصور المصغرة */}
                <div className="w-full shrink-0">
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="horizontal"
                        slidesPerView={4}
                        spaceBetween={10}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Thumbs]}
                        className="w-full h-30  "
                    >
                        {product.images.map((img, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    className="cursor-pointer h-full!"
                                    onClick={() => {
                                        thumbsSwiper?.slideNext();
                                    }}
                                >
                                    <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gray-200 [.swiper-slide-thumb-active]:border-emerald-600 transition-all bg-gray-50 flex items-center justify-center">
                                        <Image
                                            fill
                                            priority={index === 0} sizes="(max-width: 768px) 100vw, 500px"
                                            src={img}
                                            alt={product.title}
                                            className="object-cover "

                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>

            </div>
        </>
    )
}
