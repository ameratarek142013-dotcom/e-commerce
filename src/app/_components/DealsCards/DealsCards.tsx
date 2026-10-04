"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

export default function DealsCards() {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-2">

                    {/* Left Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1 }}
                        className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-500 to-emerald-700 p-8 text-white"
                    >
                        <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />

                        <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10" />

                        <div className="relative z-10">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                                <span>🔥</span>
                                <span>Deal of the Day</span>
                            </div>

                            <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                                Fresh Organic Fruits
                            </h3>

                            <p className="mb-4 text-white/80">
                                Get up to 40% off on selected organic fruits
                            </p>

                            <div className="mb-6 flex items-center gap-4">
                                <div className="text-3xl font-bold">
                                    40% OFF
                                </div>

                                <div className="text-sm text-white/70">
                                    Use code:{" "}
                                    <span className="font-bold text-white">
                                        ORGANIC40
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/products"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-emerald-600 transition-colors hover:bg-gray-100"
                            >
                                Shop Now
                                <FaArrowRight />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1 }}
                        className="relative overflow-hidden rounded-2xl bg-linear-to-br from-orange-400 to-rose-500 p-8 text-white"
                    >
                        <div className="absolute right-0 top-0 h-40 w-40 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10" />

                        <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/10" />

                        <div className="relative z-10">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-sm">
                                <span>✨</span>
                                <span>New Arrivals</span>
                            </div>

                            <h3 className="mb-2 text-2xl font-bold md:text-3xl">
                                Exotic Vegetables
                            </h3>

                            <p className="mb-4 text-white/80">
                                Discover our latest collection of premium vegetables
                            </p>

                            <div className="mb-6 flex items-center gap-4">
                                <div className="text-3xl font-bold">
                                    25% OFF
                                </div>

                                <div className="text-sm text-white/70">
                                    Use code:{" "}
                                    <span className="font-bold text-white">
                                        FRESH25
                                    </span>
                                </div>
                            </div>

                            <Link
                                href="/products?sort=newest"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-orange-500 transition-colors hover:bg-gray-100"
                            >
                                Explore Now
                                <FaArrowRight />
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}