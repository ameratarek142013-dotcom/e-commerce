'use client'
import { removeProductFromCart } from '@/api/cartapi/removeProductFromCart.api'
import { useRouter } from 'next/navigation'
import { FaRegTrashCan } from 'react-icons/fa6'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function DeleteFromCart({ productId, productTitle, setIsUpdating }: { productId: string, productTitle?: string , setIsUpdating: (value: boolean) => void }) {

  const router = useRouter()
  const [isopen, setIsOpen] = useState(false)

 const deleteProduct = async () => {
    setIsOpen(false)
    setIsUpdating(true)
    try {
      const response = await removeProductFromCart(productId)
      router.refresh()
      toast.success('Product deleted successfully' , {position:'top-right' ,delay : 2000 , closeOnClick : true , autoClose :1500})
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <AlertDialog open={isopen} onOpenChange={setIsOpen} >
       <AlertDialogTrigger
        render={<button
          className="w-11 h-11 rounded-xl bg-red-50/80 hover:bg-red-500 hover:text-white text-red-500 flex items-center justify-center transition-colors duration-300 cursor-pointer shrink-0 border border-red-100/50"
          aria-label="Delete item"
          title="Remove item"
        >
          <FaRegTrashCan className="text-base" />
        </button>}
      />

      <AlertDialogContent>
  <AlertDialogHeader className="flex flex-col items-center text-center sm:text-center">
    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
      <FaRegTrashCan className="text-red-500 text-2xl" />
    </div>
    <AlertDialogTitle className={'text-xl font-bold'}>Remove Item?</AlertDialogTitle>
    <AlertDialogDescription>
      Remove{" "}
      {productTitle ? (
        <span className="font-semibold text-gray-900">{productTitle}</span>
      ) : (
        "this item"
      )}{" "}
      from your cart?
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel className={'p-6 text-base'}>Cancel</AlertDialogCancel>
    <AlertDialogAction
      onClick={deleteProduct}
      className="bg-red-500 hover:bg-red-600 text-white p-6 text-base"
    >
      Remove
    </AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
    </AlertDialog>
  )
}