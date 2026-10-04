import { getUserOrders } from "@/api/ordersapi/getUserOrders.api";
import OrderCard from "@/app/_components/OrderCard/OrderCard";
import { OrderCartType } from "@/types/orderCartType.types";
import { getMyToken } from "@/utilities/getMyToken";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { FaArrowRight, FaBoxOpen } from "react-icons/fa";
import {
  FaBox,
  FaBagShopping,
} from "react-icons/fa6";


export default async function Orders() {

  const token = await getMyToken()
  if (!token) {
    return null
  }
  const decodedToken: { id: string } = jwtDecode(token)



  const response = await getUserOrders(decodedToken.id)
  return (
    <>
      {response.length === 0 ? <main className="min-h-[65vh] flex items-center justify-center px-4 py-16 bg-white">
        <div className="max-w-md w-full text-center">
          <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 text-gray-300">
            <FaBoxOpen className="text-5xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            No orders yet
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
            When you place orders, they'll appear here
            <br />
            so you can track them.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-md active:scale-[0.98] text-sm sm:text-base"
          >
            Start Shopping
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </main> : <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb + heading */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-green-600 transition">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">My Orders</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
                <FaBox className="text-2xl text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  My Orders
                </h1>
                <p className="text-gray-500 text-sm mt-0.5">
                  Track and manage your {response.length} orders
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-50 transition-all text-sm"
            >
              <FaBagShopping className="text-xs" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Orders list */}
        <div className="space-y-4">
          {response.map((order: OrderCartType) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>}
    </>
  );
}