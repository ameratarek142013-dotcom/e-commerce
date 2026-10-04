
'use client'
import React, { useState } from "react";
import { Star, Heart, Share2, Zap, Plus, Minus, CheckCircle, Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";
import CardsSlider from "@/app/_components/CardsSlider/CardsSlider";
import { ProductType } from "@/types/product.types";
import ProductTabs from "@/app/_components/ProductTabs/ProductTabs";
import AddToCartBtn from "@/app/_components/AddToCartBtn/AddToCartBtn";
import AddToWishlistBtn from "@/app/_components/AddToWishlistBtn/AddToWishlistBtn";
import DetailsSwipper from "@/app/_components/DetailsSwipper/DetailsSwipper";



export default function ProductDetails({ product, relatedProducts }: { product: ProductType, relatedProducts: ProductType[] }) {

    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
        if (quantity < product.quantity) setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const activePrice = product.priceAfterDiscount && product.priceAfterDiscount < product.price
        ? product.priceAfterDiscount
        : product.price;

    const totalPrice = activePrice * quantity;

    return (
        <>
            <div className="w-[95%] mx-auto py-8">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-10 font-medium">
                    <Link href="/" className="hover:text-green-600 transition-colors">
                        Home
                    </Link>
                    <ChevronRight size={14} className="text-gray-500" />
                    <span className="font-semibold text-gray-500 hover:text-green-600 transition-colors ">{product.category.name}</span>
                    <ChevronRight size={14} className="text-gray-500" />
                    <span className="font-semibold text-gray-500 hover:text-green-600 transition-colors">{product.subcategory[0].name}</span>
                    <ChevronRight size={14} className="text-gray-500" />
                    <span className="font-semibold hover:text-green-600 transition-colors">{product.title}</span>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* قسم الصور  */}
                    <DetailsSwipper product={product} />


                    {/* تفاصيل المنتج وخيارات الشراء */}
                    <div className="lg:col-span-8 flex flex-col p-6 gap-4 rounded-2xl border border-gray-100 shadow-sm">

                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                                {product.category.name}
                            </span>
                            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                {product.brand.name}
                            </span>
                        </div>

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-2">
                            <div className="flex text-amber-400">
                                {[...Array(5)].map((_, i) => {
                                    const ratingValue = product.ratingsAverage - i;

                                    if (ratingValue >= 1) {
                                        // نجمة ممتلئة بالكامل
                                        return <Star key={i} size={16} fill="currentColor" />;
                                    } else if (ratingValue >= 0.5) {
                                        // نجمة نص (باستخدام overflow لعمل تأثير half-fill)
                                        return (
                                            <div key={i} className="relative">
                                                <Star size={16} className="text-gray-300" />
                                                <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                                                    <Star size={16} fill="currentColor" className="text-amber-400" />
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        // نجمة فاضية
                                        return <Star key={i} size={16} className="text-gray-300" />;
                                    }
                                })}
                            </div>
                            <span className="text-sm font-bold text-gray-800">{product.ratingsAverage}</span>
                            <span className="text-xs text-gray-400">({product.ratingsQuantity} reviews)</span>
                        </div>

                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-gray-900">
                                {activePrice} EGP
                            </span>
                            {product.priceAfterDiscount && product.priceAfterDiscount < product.price && (
                                <span className="text-lg text-gray-400 line-through">
                                    {product.price} EGP
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium bg-emerald-50/60 w-fit px-3 py-1 rounded-full">
                            <CheckCircle size={16} />
                            <span>In Stock</span>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed border-t border-b border-gray-100 py-3">
                            {product.description} </p>

                        <div className="flex flex-col gap-2">
                            <span className="text-xs text-gray-500 font-semibold">Quantity</span>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                                    <button
                                        type="button"
                                        onClick={handleDecrement}
                                        disabled={quantity <= 1}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                        aria-label="Decrease quantity"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-12 text-center font-bold text-gray-900 select-none">
                                        {quantity}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={handleIncrement}
                                        disabled={quantity >= product.quantity}
                                        className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                        aria-label="Increase quantity"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <span className="text-xs text-gray-400 font-medium">{product.quantity} available</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
                            <span className="text-sm font-semibold text-gray-600">Total Price:</span>
                            <span className="text-2xl font-bold text-green-600">{totalPrice} EGP</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <AddToCartBtn productId={product.id} count={quantity} isDetails />
                            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer">
                                <Zap size={18} />
                                Buy Now
                            </button>
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <AddToWishlistBtn productId={product.id} isDetails />
                            <button type="button" className="w-12 h-12 border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl flex items-center justify-center hover:text-green-500 hover:border-green-400 transition-colors cursor-pointer">
                                <Share2 size={18} />
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-2 pt-4 border-t border-gray-100 mt-2 text-center">
                            <div className="flex items-center gap-3 p-2">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center"><Truck size={20} className="text-emerald-600" /></div>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-semibold text-gray-800">Free Delivery</span>
                                    <span className="text-xs text-gray-400">Orders over 500</span>
                                </div>
                            </div>
                            <div className="flex  items-center gap-3 p-2 border-x border-gray-100">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <RotateCcw size={20} className="text-emerald-600" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-semibold text-gray-800">30 Days Return</span>
                                    <span className="text-xs text-gray-400">Money back</span>
                                </div>
                            </div>
                            <div className="flex  items-center gap-3 p-2">
                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <ShieldCheck size={20} className="text-emerald-600" />
                                </div>

                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-semibold text-gray-800">Secure Payment</span>
                                    <span className="text-xs text-gray-400">100% Protected</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <ProductTabs product={product} />

                <CardsSlider relatedProducts={relatedProducts} />


            </div>

        </>
    );
}