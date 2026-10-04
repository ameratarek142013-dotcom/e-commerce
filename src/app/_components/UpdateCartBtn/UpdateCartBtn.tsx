'use client'
import { updateCart } from '@/api/cartapi/updateCart.api'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

export default function UpdateCartBtn({ productId, count }: { productId: string, count: number }) {

    const router = useRouter()

    const updateCartProduct = async (count: number) => {
        const response = await updateCart(productId, count)
        router.refresh()
    }
    return (
        <>
            <div className="inline-flex items-center border border-gray-200/80 rounded-xl bg-gray-50/50 p-1 w-fit">
                <button onClick={() => updateCartProduct(count - 1)}
                    disabled={count == 1}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                >
                    <FaMinus className="text-xs" />
                </button>
                <span className="w-10 text-center text-base font-bold text-gray-900 select-none">
                    {count}
                </span>
                <button onClick={() => updateCartProduct(count + 1)}
                    className="w-8 h-8 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                    aria-label="Increase quantity"
                >
                    <FaPlus className="text-xs" />
                </button>
            </div>
        </>
    )
}
