'use client'
import {
    FaBox,
    FaClock,
    FaHashtag,
    FaMoneyBill,
    FaCalendarDays,
    FaLocationDot,
    FaChevronDown,
    FaPhone,
    FaReceipt,
    FaTruck,
    FaCreditCard,
} from "react-icons/fa6";
import { useState } from "react";
import { OrderCartType } from "@/types/orderCartType.types";



export default function OrderCard({ order }: { order: OrderCartType }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <div
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${expanded
                    ? "border-green-200 shadow-lg shadow-green-100/50"
                    : "border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200"
                    }`}
            >
                <div className="p-5 sm:p-6">
                    <div className="flex gap-5">
                        <div className="relative shrink-0">
                            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
                                <img
                                    alt=""
                                    className="w-full h-full object-contain"
                                    src={order.cartItems[0].product.imageCover}
                                />
                            </div>
                            {order.cartItems.length > 1 && (
                                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                                    +{order.cartItems.length - 1}
                                </div>
                            )}
                        </div>


                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-3">
                                <div>
                                    <div
                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-2 ${order.paymentMethodType === 'cash' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}
                                    >
                                        {order.paymentMethodType === 'cash' ? <FaClock className="text-xs" /> : <FaTruck className="text-xs" />}

                                        <span className="text-xs font-semibold">{order.paymentMethodType === 'cash' ? "Processing" : "On the way"}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                                        <FaHashtag className="text-xs text-gray-400" />
                                        {order.id}
                                    </h3>
                                </div>
                                <div
                                    className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${order.paymentMethodType === 'cash' ? "bg-gray-100 text-gray-600" : "bg-purple-100 text-purple-600"}`}
                                >
                                    {order.paymentMethodType === 'cash' ? <FaMoneyBill /> : <FaCreditCard />}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                                <span className="flex items-center gap-1.5">
                                    <FaCalendarDays className="text-xs text-gray-400" />
                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5">
                                    <FaBox className="text-xs text-gray-400" />
                                    {order.cartItems.length} {order.cartItems.length === 1 ? "item" : "items"}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span className="flex items-center gap-1.5">
                                    <FaLocationDot className="text-xs text-gray-400" />
                                    {order.shippingAddress.city}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <span className="text-2xl font-bold text-gray-900">
                                        {order.totalOrderPrice >= 500 ? order.totalOrderPrice : order.totalOrderPrice + 50}
                                    </span>
                                    <span className="text-sm font-medium text-gray-400 ml-1">
                                        EGP
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setExpanded((prev) => !prev)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${expanded
                                        ? "bg-green-600 text-white shadow-lg shadow-green-600/25"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        } `}
                                >
                                    {expanded ? "Hide" : "Details"}
                                    <FaChevronDown
                                        className={`text-xs transition-transform duration-300 ${expanded ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Expanded details */}
                {expanded && (
                    <div className="border-t border-gray-100 bg-gray-50/50">
                        <div className="p-5 sm:p-6">
                            <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-4">
                                <div className="w-6 h-6 rounded-lg bg-green-100 flex items-center justify-center">
                                    <FaReceipt className="text-xs text-green-600" />
                                </div>
                                Order Items
                            </h4>
                            <div className="space-y-3">
                                {order.cartItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-gray-50 p-2 shrink-0">
                                            <img
                                                alt={item.product.title}
                                                className="w-full h-full object-contain"
                                                src={item.product.imageCover}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-gray-900 truncate">
                                                {item.product.title}
                                            </p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                <span className="font-medium text-gray-700">
                                                    {item.count}
                                                </span>{" "}
                                                × {item.price} EGP
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-lg font-bold text-gray-900">
                                                {item.count * item.price}
                                            </p>
                                            <p className="text-xs text-gray-400">EGP</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
                            {/* Delivery address */}
                            <div className="p-4 bg-white rounded-xl border border-gray-100">
                                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                    <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <FaLocationDot className="text-xs text-blue-600" />
                                    </div>
                                    Delivery Address
                                </h4>
                                <div className="space-y-2">
                                    <p className="font-medium text-gray-900">
                                        {order.shippingAddress.city}
                                    </p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {order.shippingAddress.details}
                                    </p>
                                    <p className="text-sm text-gray-600 flex items-center gap-2 pt-1">
                                        <FaPhone className="text-xs text-gray-400" />
                                        {order.shippingAddress.phone}
                                    </p>
                                </div>
                            </div>

                            {/* Order summary */}
                            <div
                                className={`p-4 rounded-xl border ${order.paymentMethodType === "card"
                                    ? "bg-blue-100 border-blue-200"
                                    : "bg-amber-100 border-amber-200"
                                    }`}
                            >
                                <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
                                    <div
                                        className={`w-6 h-6 rounded-lg flex items-center justify-center ${order.paymentMethodType === "card" ? "bg-blue-500" : "bg-amber-500"
                                            }`}
                                    >
                                        {order.paymentMethodType === 'cash' ? <FaClock className="text-xs text-white" /> : <FaTruck className="text-xs text-white" />}

                                    </div>
                                    Order Summary
                                </h4>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">
                                            {order.totalOrderPrice} EGP
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-medium">
                                            {order.totalOrderPrice >= 500 ? 'Free' : 50}
                                        </span>
                                    </div>
                                    <hr className="border-gray-200/50 my-2" />
                                    <div className="flex justify-between pt-1">
                                        <span className="font-semibold text-gray-900">Total</span>
                                        <span className="font-bold text-lg text-gray-900">
                                            {order.totalOrderPrice >= 500 ? order.totalOrderPrice : order.totalOrderPrice + 50} EGP
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </>
    )
}
