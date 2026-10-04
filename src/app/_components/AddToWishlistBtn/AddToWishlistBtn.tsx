'use client'
import { addToWishlist } from '@/api/wishlistapi/addToWishlist.api'
import { removeFromWishlist } from '@/api/wishlistapi/removeFromWishlist.api'
import { Heart } from 'lucide-react'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { TiHeartFullOutline } from 'react-icons/ti'
import { toast } from 'react-toastify'

export default function AddToWishlistBtn({ productId, isDetails = false, isWishListed = false }: { productId: string, isDetails?: boolean, isWishListed?: boolean }) {
    const [isLoading, setIsLoading] = useState(false)
    const [isWishListedState, setIsWishListedState] = useState(isWishListed)
    const router = useRouter()

    const addProductToWishlist = async () => {
        const session = await getSession()
        try {
            if (!session) {
                router.push('/login')
                return
            }
            setIsLoading(true)
            const response = isWishListedState ? await removeFromWishlist(productId) : await addToWishlist(productId)


            if (response.status === "success") {
                setIsWishListedState((prev) => !prev)
                toast.success(response.message, {
                    position: "top-right",
                    autoClose: 1500,
                    closeOnClick: true,
                })

                router.refresh()
            } else {
                toast.error(response.message, {
                    position: "top-right",
                    autoClose: 1500,
                    closeOnClick: true,
                })
            }
        } catch (error) {
            toast.error("Login first", {
                position: "top-right",
                autoClose: 1500,
                closeOnClick: true,
            })
        } finally {
            setIsLoading(false)
        }
    }

    if (isDetails) {
        return (
            <button
                type="button"
                onClick={addProductToWishlist}
                disabled={isLoading}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-2xl text-md font-medium hover:text-red-500 hover:border-red-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <FaSpinner className="animate-spin text-lg text-red-500" />
                ) : isWishListedState ? (
                    <TiHeartFullOutline fill="red" size={18} />
                ) : (
                    <Heart size={18} />
                )}
                {isWishListedState ? "In Wishlist" : "Add to Wishlist"}
            </button>
        )
    }

    return (
        <button
            type="button"
            onClick={addProductToWishlist}
            disabled={isLoading}
            className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
        >
            {isLoading ? (
                <FaSpinner className="animate-spin text-xs text-red-500" />
            ) : isWishListedState ? (
                <TiHeartFullOutline fill="red" size={22} />
            ) : (
                <Heart size={22} />
            )}
        </button>
    )
}