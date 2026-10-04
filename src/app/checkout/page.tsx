import Link from "next/link";
import {
  FaReceipt,
  FaArrowLeft,
} from "react-icons/fa6";
import { getLoggedUserCart } from "@/api/cartapi/getLoggedUserCart.api";
import PayementForm from "@/app/_components/PayementForm/PayementForm";




export default async function CheckOut() {

  const cartresponse = await getLoggedUserCart()

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb + heading */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-slate-600 transition">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/cart" className="hover:text-slate-600 transition">
              Cart
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                  <FaReceipt className="text-xl" />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>

            <Link
              href="/cart"
              className="text-green-600 hover:text-slate-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
            >
              <FaArrowLeft />
              Back to Cart
            </Link>
          </div>
        </div>

        <PayementForm cartresponse={cartresponse} />


      </div>
    </div>
  );
}