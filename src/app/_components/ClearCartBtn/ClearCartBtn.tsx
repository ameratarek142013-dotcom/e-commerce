'use client'
import { clearUserCart } from '@/api/cartapi/clearUserCart.api'
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

export default function ClearCartBtn() {

    const router = useRouter()

    const clearCart = async () => {
        const clearitems = await clearUserCart()
        router.refresh()
    }


    return (
        <>

            <AlertDialog >
                <AlertDialogTrigger
                    render={<button className="text-sm sm:text-md font-medium text-gray-400 hover:text-red-500 flex items-center gap-2 transition-colors cursor-pointer">
                        <FaRegTrashCan className="text-sm" />
                        Clear all items
                    </button>}
                />

                <AlertDialogContent>
                    <AlertDialogHeader className="flex flex-col items-center text-center sm:text-center">
                        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-2">
                            <FaRegTrashCan className="text-red-500 text-2xl" />
                        </div>
                        <AlertDialogTitle className={'text-xl font-bold'}>Clear Your Cart ?</AlertDialogTitle>
                        <AlertDialogDescription className={'w-80'}>
                            All items will be removed from your cart. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className={'p-6 text-base'}>Keep Shopping</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={clearCart}
                            className="bg-red-500 hover:bg-red-600 text-white p-6 text-base"
                        >
                            Yes, Clear All
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
