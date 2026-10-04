'use client'
import { removeFromWishlist } from '@/api/wishlistapi/removeFromWishlist.api'
import { useRouter } from 'next/navigation'
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

export default function RemoveFromWishlistBtn({ productId }: { productId: string }) {

    const router = useRouter()

    const removeProductWishlisted = async () => {
        try {
            const response = await removeFromWishlist(productId)
            if (response.status === 'success') {
                router.refresh()
                toast.success(response.message, { position: 'top-right', delay: 2000, closeOnClick: true, autoClose: 1500 })

            }
        } catch (error) {
            toast.error('something went wrong', { position: 'top-right', delay: 2000, closeOnClick: true, autoClose: 1500 })

        }
    }
    return (
        <>
            <button
                onClick={removeProductWishlisted}
                className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50"
                title="Remove"
            >
                <FaTrash className="text-sm" />
            </button>
        </>
    )
}
