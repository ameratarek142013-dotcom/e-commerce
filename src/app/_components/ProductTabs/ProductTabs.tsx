"use client";

import React, { useState } from "react";
import { Package, Star, Truck, Check, ShieldCheck, RotateCcw, CheckCircle } from "lucide-react";
import { ProductType } from "@/types/product.types";

export default function ProductTabs({ product }: { product: ProductType }) {
    const [activeTab, setActiveTab] = useState("details");
    const [showAllReviews, setShowAllReviews] = useState(false);

    return (
        <div className=" py-15">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

                {/* Navigation Headers */}
                <div className="flex border-b border-gray-100 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("details")}
                        className={`flex items-center gap-2 px-6 py-4  font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === "details"
                            ? "border-green-600 text-green-600 bg-green-100/30"
                            : "border-transparent text-gray-500 hover:text-gray-800"
                            }`}
                    >
                        <Package size={18} />
                        Product Details
                    </button>

                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`flex items-center gap-2 px-6 py-4  font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === "reviews"
                            ? "border-green-600 text-green-600 bg-green-100/30"
                            : "border-transparent text-gray-500 hover:text-gray-800"
                            }`}
                    >
                        <Star size={18} />
                        Reviews ({product.ratingsQuantity})
                    </button>

                    <button
                        onClick={() => setActiveTab("shipping")}
                        className={`flex items-center gap-2 px-6 py-4  font-semibold transition-all border-b-2 whitespace-nowrap ${activeTab === "shipping"
                            ? "border-green-600 text-green-600 bg-green-100/30"
                            : "border-transparent text-gray-500 hover:text-gray-800"
                            }`}
                    >
                        <Truck size={18} />
                        Shipping & Returns
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8">

                    {/* 1. Product Details Tab */}
                    {activeTab === "details" && (
                        <div className="flex flex-col gap-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 my-3">About this Product</h3>
                                <p className=" text-gray-600">
                                    {product.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Product Information Box */}
                                <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
                                    <h4 className="font-bold text-gray-900 text-sm">Product Information</h4>
                                    <div className="flex flex-col gap-3 text-sm">
                                        <div className="flex justify-between ">
                                            <span className="text-gray-500">Category</span>
                                            <span className="font-medium text-gray-800">{product.category.name}</span>
                                        </div>
                                        <div className="flex justify-between ">
                                            <span className="text-gray-500">Subcategory</span>
                                            <span className="font-medium text-gray-800">{product.subcategory[0].name}</span>
                                        </div>
                                        <div className="flex justify-between ">
                                            <span className="text-gray-500">Brand</span>
                                            <span className="font-medium text-gray-800">{product.brand.name}</span>
                                        </div>
                                        <div className="flex justify-between pb-1">
                                            <span className="text-gray-500">Items Sold</span>
                                            <span className="font-medium text-gray-800">{product.sold}+ sold</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Features Box */}
                                <div className="bg-gray-50/60 p-6 rounded-2xl border border-gray-100 flex flex-col gap-4">
                                    <h4 className="font-bold text-gray-900 text-sm">Key Features</h4>
                                    <div className="flex flex-col gap-3.5 text-sm">
                                        <div className="flex items-center gap-2.5 text-gray-700">
                                            <Check size={16} className="text-emerald-600 shrink-0" />
                                            <span>Premium Quality Product</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-gray-700">
                                            <Check size={16} className="text-emerald-600 shrink-0" />
                                            <span>100% Authentic Guarantee</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-gray-700">
                                            <Check size={16} className="text-emerald-600 shrink-0" />
                                            <span>Fast & Secure Packaging</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 text-gray-700">
                                            <Check size={16} className="text-emerald-600 shrink-0" />
                                            <span>Quality Tested</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 2. Reviews Tab */}
                    {activeTab === "reviews" && (() => {

                        const reviewsList = product?.reviews || [];
                        const totalReviews = reviewsList.length;

                        // حساب المتوسط العام ديناميكياً
                        const averageRating = totalReviews > 0
                            ? (reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews).toFixed(1)
                            : product.ratingsAverage || 0;

                        // حساب عدد كل نجمة من 1 إلى 5
                        const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
                        reviewsList.forEach((rev) => {
                            if (starCounts[rev.rating as keyof typeof starCounts] !== undefined) {
                                starCounts[rev.rating as keyof typeof starCounts]++;
                            }
                        });

                        return (
                            <div className="flex flex-col gap-8">
                                {/* قسم احصائيات النجوم الديناميكي */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-gray-100 pb-8">
                                    <div className="lg:col-span-2 flex flex-col items-center justify-center text-center">
                                        <span className="text-5xl font-black text-gray-900">{averageRating}</span>
                                        <div className="flex text-amber-400 my-2">
                                            {[...Array(5)].map((_, i) => {
                                                const ratingNum = Math.round(Number(averageRating));
                                                return (
                                                    <Star
                                                        key={i}
                                                        size={20}
                                                        fill={i < ratingNum ? "currentColor" : "none"}
                                                        className={i < ratingNum ? "text-amber-400" : "text-gray-300"}
                                                    />
                                                );
                                            })}
                                        </div>
                                        <span className="text-sm text-gray-400 font-medium">Based on {totalReviews} reviews</span>
                                    </div>

                                    <div className="lg:col-span-10 flex flex-col gap-6">
                                        {[
                                            { star: "5 star", count: starCounts[5] },
                                            { star: "4 star", count: starCounts[4] },
                                            { star: "3 star", count: starCounts[3] },
                                            { star: "2 star", count: starCounts[2] },
                                            { star: "1 star", count: starCounts[1] },
                                        ].map((item, idx) => {
                                            const percentage = totalReviews > 0 ? Math.round((item.count / totalReviews) * 100) : 0;
                                            return (
                                                <div key={idx} className="flex items-center gap-3 text-sm text-gray-500">
                                                    <span className="w-10">{item.star}</span>
                                                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-amber-400 rounded-full transition-all duration-500"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-10 text-right">{percentage}%</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>


                                {/* قائمة التعليقات الديناميكية من product.reviews */}
                                <div className="flex flex-col gap-4">
                                    {reviewsList.length > 0 ? (
                                        (showAllReviews ? reviewsList : reviewsList.slice(0, 3)).map((rev) => (
                                            <div key={rev._id} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col gap-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-bold text-gray-900 text-sm">{rev.user?.name}</span>
                                                    <div className="flex text-amber-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={14}
                                                                fill={i < rev.rating ? "currentColor" : "none"}
                                                                className={i < rev.rating ? "text-amber-400" : "text-gray-300"}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600">{rev.review}</p>
                                                <span className="text-[10px] text-gray-400">
                                                    {new Date(rev.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                                <Star size={24} />
                                            </div>
                                            <p className="text-sm text-gray-500 font-medium">Customer reviews will be displayed here.</p>
                                        </div>
                                    )}

                                    <div className="flex justify-center items-center gap-4 pt-2">
                                        {totalReviews > 4 && (
                                            <button
                                                onClick={() => setShowAllReviews((prev) => !prev)}
                                                className="text-gray-600 hover:text-yellow-600 font-semibold text-sm transition-colors flex items-center gap-1.5"
                                            >
                                                {showAllReviews ? "Show less reviews" : `See more reviews (${totalReviews - 4})`}
                                            </button>
                                        )}

                                        <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm transition-colors">
                                            Write a Review
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })()}

                    {/* 3. Shipping & Returns Tab */}
                    {activeTab === "shipping" && (
                        <div className="flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Shipping Information Box */}
                                <div className="bg-green-50 p-6 rounded-2xl border border-green-100/60 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                                            <Truck size={20} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-base">Shipping Information</h4>
                                    </div>
                                    <div className="flex flex-col gap-3 text-md text-gray-700">
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>Free shipping on orders over $50</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>Standard delivery: 3-5 business days</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>Express delivery available (1-2 business days)</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>Track your order in real-time</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Returns & Refunds Box */}
                                <div className="bg-green-50 p-6 rounded-2xl border border-green-100/60 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                                            <RotateCcw size={20} />
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-base">Returns & Refunds</h4>
                                    </div>
                                    <div className="flex flex-col gap-3 text-md text-gray-700">
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>30-day hassle-free returns</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>Full refund or exchange available</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>Free return shipping on defective items</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Check size={16} className="text-green-600 shrink-0" />
                                            <span>Easy online return process</span>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* Buyer Protection Guarantee */}
                            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gray-200/70 text-gray-600 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h5 className="font-bold text-gray-900  mb-0.5">Buyer Protection Guarantee</h5>
                                    <p className="text-sm text-gray-500">
                                        Get a full refund if your order doesn't arrive or isn't as described. We ensure your shopping experience is safe and secure.
                                    </p>
                                </div>
                            </div>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
}