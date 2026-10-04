'use client'
import { applyCouponToCart } from '@/api/cartapi/ApplyCouponToCart';
import React, { useState } from 'react'
import { FaTag } from 'react-icons/fa'
import { toast } from 'react-toastify';

export default function PromoCodeBtn() {
    const [showPromoInput, setShowPromoInput] = useState(false);
    const [promoCode, setPromoCode] = useState("");

    const handleApplyPromo = async () => {
        if (!promoCode.trim()) return
        try {
            const response = await applyCouponToCart(promoCode)
            if (response.statusMsg === 'success') {
                toast.success(response.message, { position: 'top-right', delay: 1500, closeOnClick: true, hideProgressBar: true })
            } else {
                toast.error(response.message, { position: 'top-right', delay: 2000, closeOnClick: true, hideProgressBar: true })


            }

        } catch (error) {
            toast.error('Coupon is invalid', { position: 'top-center', delay: 2000, closeOnClick: true, hideProgressBar: true })

        }

    }

    return (
        <div className="pt-1">
            {showPromoInput ? (
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter Promo Code"
                        className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#16A34A] transition-colors"
                    />
                    <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2.5 bg-green-800 hover:bg-green-900 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                    >
                        Apply
                    </button>
                </div>
            ) : (
                <button
                    onClick={() => setShowPromoInput(true)}
                    className="w-full border border-dashed border-gray-300 hover:border-[#16A34A] rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-gray-600 hover:text-[#16A34A] transition-colors cursor-pointer"
                >
                    <FaTag className="text-xs" />
                    Apply Promo Code
                </button>
            )}
        </div>
    )
}