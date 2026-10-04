'use client'

import { useState } from "react"
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6"
import { ImSpinner3 } from "react-icons/im"
import DeleteFromCart from "@/app/_components/DeleteFromCart/DeleteFromCart"
import { Product } from "@/types/cartType.types"
import Link from "next/link"
import UpdateCartBtn from "@/app/_components/UpdateCartBtn/UpdateCartBtn"

export default function CartItemCard({ product }: { product: Product }) {

  const [isUpdating, setIsUpdating] = useState(false)

  return (
    <div
      className={` bg-white rounded-2xl p-5 border border-gray-100 shadow-sm relative hover:shadow-md duration-300 transition-all flex items-start gap-5 ${isUpdating ? "pointer-events-none" : ""
        }`}
    >
      {/* طبقة الـ Blur + Loading Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 z-10 rounded-2xl backdrop-blur-xs bg-white/40 flex items-center justify-center">
          <div className="bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium text-gray-700">
            <ImSpinner3 className="animate-spin text-[#16A34A]" />
            Updating...
          </div>
        </div>
      )}

      {/* الديف الأول: الصورة فقط + شارة In Stock */}
      <div className="flex flex-col items-end shrink-0">
        <Link href={`/products/${product.product.id}`} className="w-32 h-34 rounded-xl bg-gray-50/80 p-2.5 flex items-center justify-center shadow-sm relative overflow-hidden">
          <img
            src={product.product.imageCover}
            alt={product.product.title}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </Link>
        {product.count >= 1 && (
          <span className="inline-flex items-center gap-1.5 bg-green-500 text-white text-[10px] font-medium px-2 py-0.5 rounded-full mt-4 shadow-xs">
            <FaCheck className="text-[10px]" />
            In Stock
          </span>
        )}
      </div>

      {/* الديف الثاني: كل تفاصيل المنتج والأزرار */}
      <div className="flex-1 flex flex-col gap-4">

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-900 text-lg">
            {product.product.title}
          </h3>

          <div className="flex items-center gap-2 text-xs">
            <span className="bg-[#ECFDF5] text-[#16A34A] font-medium px-3 py-0.5 rounded-full">
              {product.product.category.name}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-gray-400 font-medium uppercase">
              SKU: {product.product.id.slice(-6)}
            </span>
          </div>

          <div className="flex items-baseline gap-1.5 my-2">
            <span className="text-lg font-bold text-[#16A34A]">
              {product.price} EGP
            </span>
            <span className="text-sm text-gray-400 font-normal">
              per unit
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5">

          <UpdateCartBtn productId={product.product.id} count={product.count} />

          <div className="flex items-center gap-5">
            <div className="text-right">
              <span className="text-xs text-gray-400 font-medium block leading-tight mb-0.5">
                Total
              </span>
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-xl font-bold text-gray-900">
                  {product.price * product.count}
                </span>
                <span className="text-xs font-semibold text-gray-500">
                  EGP
                </span>
              </div>
            </div>

            <DeleteFromCart
              productId={product.product.id}
              productTitle={product.product.title}
              setIsUpdating={setIsUpdating}
            />
          </div>

        </div>

      </div>
    </div>
  )
}