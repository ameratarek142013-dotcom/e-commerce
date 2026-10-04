'use client'
import { addToCart } from '@/api/cartapi/addToCart.api'
import { updateCart } from '@/api/cartapi/updateCart.api'
import { Check, Plus, ShoppingCart } from 'lucide-react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function AddToCartBtn({ productId, isDetails, isWishList, isInCart, count = 1 }: { productId: string, isDetails?: boolean, isWishList?: boolean, isInCart?: boolean, count?: number }) {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const addProductToCart = async () => {

        const session = await getSession()

        try {
            if (!session) {
                router.push('/login')
                return
            }
            setIsLoading(true)
            const response = await addToCart(productId)
            if (response.status === "success") {
                if (count > 1) {
                    await updateCart(productId, count)
                }
                router.refresh()

                toast.success(response.message, { position: 'top-right', delay: 2000, autoClose: 1500, closeOnClick: true })
            } else {
                toast.error(response.message, { position: 'top-right', delay: 2000, autoClose: 1500, closeOnClick: true })
            }
        } catch (error) {
            toast.error('product not added to cart 😒', { position: 'top-right', delay: 2000, autoClose: 1500, closeOnClick: true })
        } finally {
            setIsLoading(false)
        }
    }


    if (isInCart && isWishList) {
        return (
            <Link
                href="/cart"
                className={" flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-gray-100 hover:bg-gray-200 cursor-pointer"}
            >
                <Check size={18} className="stroke-[2.5] text-green-600" />
                <span className={isWishList ? "md:hidden lg:inline" : ""}>View Cart</span>
            </Link>
        )
    }

    return (
        <>
            {isDetails ? (
                <button
                    onClick={addProductToCart}
                    disabled={isLoading}
                    className={
                        isWishList
                            ? "flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            : "w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    }
                >
                    {isLoading ? (
                        <FaSpinner className='animate-spin text-xl' />
                    ) : (
                        <>
                            <ShoppingCart size={18} />
                            {isWishList ? (
                                <span className="md:hidden lg:inline">Add to Cart</span>
                            ) : (
                                "Add to Cart"
                            )}
                        </>
                    )}
                </button>
            ) : (
                <button
                    onClick={addProductToCart}
                    disabled={isLoading}
                    className="w-11 h-11 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center shadow-md transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? <FaSpinner className='animate-spin text-xl' /> : <Plus size={22} className="stroke-[2.5]" />}
                </button>
            )}
        </>
    )
}