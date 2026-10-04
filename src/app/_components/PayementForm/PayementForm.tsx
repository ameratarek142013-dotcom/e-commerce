'use client'

import React, { useState } from "react";
import {
    FaHouse,
    FaCircleInfo,
    FaCity,
    FaLocationDot,
    FaPhone,
    FaWallet,
    FaMoneyBill,
    FaCheck,
    FaCreditCard,
    FaShieldHalved,
    FaBagShopping,
    FaTruck,
    FaBox,
} from "react-icons/fa6";
import { Product } from "@/types/cartType.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CartType } from './../../../types/cartType.types';
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema, paymentSchemaType } from "@/schema/paymentSchema.shema";
import { creatCashOrder } from "@/api/ordersapi/creatCashOrder.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FaSpinner } from "react-icons/fa";
import { creatCardOrder } from "@/api/ordersapi/createCardOrder.api";

export default function PayementForm({ cartresponse }: { cartresponse: CartType }) {
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)


    const totalCartPrice = cartresponse?.data?.totalCartPrice ?? 0;
    const shipping = totalCartPrice >= 500 ? 0 : 50;
    const total = totalCartPrice + shipping;

    const form = useForm({
        defaultValues: {
            city: "",
            details: "",
            phone: ""
        },
        resolver: zodResolver(paymentSchema),
        mode: 'all'
    })

    const handlePayment = async (values: paymentSchemaType) => {
        setIsLoading(true)
        if (paymentMethod === 'cash') {
            // cash payement
            try {
                const responseCash = await creatCashOrder(cartresponse.cartId, values)
                if (responseCash.status === 'success') {
                    router.push('/allorders')
                    toast.success('Order Placed Successfully!', { position: 'top-right', delay: 1500, closeOnClick: true })
                } else {
                    toast.error('something went wrong', { position: 'top-right', delay: 1500, closeOnClick: true })
                }
            } catch (error) {
                toast.error('something went wrong', { position: 'top-right', delay: 1500, closeOnClick: true })
            } finally {
                setIsLoading(false)
            }
        } else {
            // online payement
            try {
                const responsecard = await creatCardOrder(cartresponse.cartId, values)
                if (responsecard.status === 'success') {
                    window.location.href = responsecard.session.url
                    toast.success('Order Placed Successfully!', { position: 'top-right', delay: 1500, closeOnClick: true })
                } else {
                    toast.error('something went wrong', { position: 'top-right', delay: 1500, closeOnClick: true })
                }
            } catch (error) {
                toast.error('something went wrong', { position: 'top-right', delay: 1500, closeOnClick: true })
            } finally {
                setIsLoading(false)
            }
        }
    }
    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handlePayment)}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Left column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping address */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <FaHouse />
                                    Shipping Address
                                </h2>
                                <p className="text-slate-100 text-sm mt-1">
                                    Where should we deliver your order?
                                </p>
                            </div>

                            <div className="p-6 space-y-5">
                                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <FaCircleInfo className="text-blue-600 text-sm" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-blue-800 font-medium">
                                            Delivery Information
                                        </p>
                                        <p className="text-xs text-blue-600 mt-0.5">
                                            Please ensure your address is accurate for smooth delivery
                                        </p>
                                    </div>
                                </div>

                                {/* City */}
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">
                                                City <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center pointer-events-none">
                                                        <FaCity className="text-gray-500 text-sm" />
                                                    </div>
                                                    <Input
                                                        placeholder="e.g. Cairo, Alexandria, Giza"
                                                        className="pl-14 py-6 border-2 rounded-xl border-gray-200 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Street address */}
                                <FormField
                                    control={form.control}
                                    name="details"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">
                                                Street Address <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center pointer-events-none">
                                                        <FaLocationDot className="text-gray-500 text-sm" />
                                                    </div>
                                                    <Textarea
                                                        rows={3}
                                                        placeholder="Street name, building number, floor, apartment..."
                                                        className="pl-14 border-2 rounded-xl resize-none border-gray-200 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
                                                        {...field}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Phone */}
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">
                                                Phone Number <span className="text-red-500">*</span>
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center pointer-events-none">
                                                        <FaPhone className="text-gray-500 text-sm" />
                                                    </div>
                                                    <Input
                                                        type="tel"
                                                        placeholder="01xxxxxxxxx"
                                                        className="pl-14 py-6 border-2 rounded-xl border-gray-200 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
                                                        {...field}
                                                    />
                                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                                        Egyptian numbers only
                                                    </span>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Payment method */}
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                            <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <FaWallet />
                                    Payment Method
                                </h2>
                                <p className="text-slate-100 text-sm mt-1">
                                    Choose how you'd like to pay
                                </p>
                            </div>

                            <div className="p-6 space-y-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("cash")}
                                    aria-pressed={paymentMethod === "cash"}
                                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === "cash"
                                        ? "border-green-500 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm"
                                        : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "cash"
                                            ? "bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                            }`}
                                    >
                                        <FaMoneyBill className="text-xl" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3
                                            className={`font-bold ${paymentMethod === "cash" ? "text-green-700" : "text-gray-900"
                                                }`}
                                        >
                                            Cash on Delivery
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            Pay when your order arrives at your doorstep
                                        </p>
                                    </div>
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${paymentMethod === "cash"
                                            ? "bg-green-600 text-white"
                                            : "border-2 border-gray-200"
                                            }`}
                                    >
                                        {paymentMethod === "cash" && <FaCheck className="text-xs" />}
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("card")}
                                    aria-pressed={paymentMethod === "card"}
                                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${paymentMethod === "card"
                                        ? "border-green-500 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm"
                                        : "border-gray-200 hover:border-green-200 hover:bg-gray-50"
                                        }`}
                                >
                                    <div
                                        className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "card"
                                            ? "bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30"
                                            : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"
                                            }`}
                                    >
                                        <FaCreditCard className="text-xl" />
                                    </div>
                                    <div className="flex-1 text-left">
                                        <h3
                                            className={`font-bold ${paymentMethod === "card" ? "text-green-700" : "text-gray-900"
                                                }`}
                                        >
                                            Pay Online
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-0.5">
                                            Secure payment with Credit/Debit Card via Stripe
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <img alt="Visa" className="h-5" src="https://img.icons8.com/color/48/visa.png" />
                                            <img alt="Mastercard" className="h-5" src="https://img.icons8.com/color/48/mastercard.png" />
                                            <img alt="Amex" className="h-5" src="https://img.icons8.com/color/48/amex.png" />
                                        </div>
                                    </div>
                                    <div
                                        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${paymentMethod === "card"
                                            ? "bg-green-600 text-white"
                                            : "border-2 border-gray-200"
                                            }`}
                                    >
                                        {paymentMethod === "card" && <FaCheck className="text-xs" />}
                                    </div>
                                </button>

                                <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <FaShieldHalved className="text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-green-800">Secure &amp; Encrypted</p>
                                        <p className="text-xs text-green-600 mt-0.5">
                                            Your payment info is protected with 256-bit SSL encryption
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column: order summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-4">
                            <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    <FaBagShopping />
                                    Order Summary
                                </h2>
                                <p className="text-slate-100 text-sm mt-1">
                                    {cartresponse?.numOfCartItems ?? 0} items
                                </p>
                            </div>

                            <div className="p-5">
                                <div className="space-y-3 max-h-56 overflow-y-auto mb-5 pr-1">
                                    {cartresponse?.data?.products?.map((item: Product) => (
                                        <div
                                            key={item.product._id}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
                                                <img
                                                    alt={item.product.title}
                                                    className="w-full h-full object-contain"
                                                    src={item.product.imageCover}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {item.product.title}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {item.count} × {item.price} EGP
                                                </p>
                                            </div>
                                            <p className="text-sm font-bold text-gray-900 shrink-0">
                                                {(item.count * item.price).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <hr className="border-gray-100 my-4" />

                                <div className="space-y-3">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-medium">
                                            {totalCartPrice.toLocaleString()} EGP
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span className="flex items-center gap-2">
                                            <FaTruck className="text-gray-400" />
                                            Shipping
                                        </span>
                                        {shipping === 0 ? (
                                            <span className="text-green-600 font-semibold">FREE</span>
                                        ) : (
                                            <span className="font-semibold">{shipping}</span>
                                        )}
                                    </div>
                                    <hr className="border-gray-100" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <div className="text-right">
                                            <span className="text-2xl font-bold text-slate-600">
                                                {total.toLocaleString()}
                                            </span>
                                            <span className="text-sm text-gray-500 ml-1">EGP</span>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full mt-6 bg-linear-to-r from-green-600 to-green-700 text-white py-6 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                                >
                                    {isLoading ? <><FaSpinner className="animate-spin" /> Processing</> : <><FaBox />
                                        Place Order</>}

                                </Button>

                                <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <FaShieldHalved className="text-green-500" />
                                        <span>Secure</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-200" />
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <FaTruck className="text-blue-500" />
                                        <span>Fast Delivery</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-200" />
                                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                        <FaBox className="text-orange-500" />
                                        <span>Easy Returns</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    )
}
