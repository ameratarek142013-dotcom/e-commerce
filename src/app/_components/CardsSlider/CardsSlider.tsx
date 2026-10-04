"use client";

import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import ProductCard from "@/app/_components/ProductCard/ProductCard";
import { ProductType } from '../../../types/product.types';

export default function CardsSlider({relatedProducts} : {relatedProducts:ProductType[]}) {
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);
    return (
        <>

           
                <div className="flex flex-col gap-6">

                    {/* Header with Title and Custom Navigation Buttons */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-8 bg-emerald-600 rounded-full"></div>
                            <div className='text-2xl font-bold border-emerald-600 ps-3 mt-5 mb-3'>You may also <span className='text-emerald-600'>Like</span></div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                ref={prevRef}
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                ref={nextRef}
                                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Swiper Container */}
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={2}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={(swiper) => {
                           
                            if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
                                swiper.params.navigation.prevEl = prevRef.current;
                                swiper.params.navigation.nextEl = nextRef.current;
                                swiper.navigation.init();
                                swiper.navigation.update();
                            }
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                            1280: { slidesPerView: 5 },
                        }}
                        className="w-full pb-4">
                        {relatedProducts.map((product)=>(
                        <SwiperSlide key={product.id}>
                                <ProductCard product={product} isWishListed={false} />
                        </SwiperSlide> ))}

                    </Swiper>

                </div>
            
        </>
    )
}
