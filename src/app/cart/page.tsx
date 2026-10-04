import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FaCartShopping,
  FaBagShopping,
  FaTruck,
  FaShieldHalved,
  FaLock,
  FaArrowLeft,
  FaArrowRight,
  FaBoxOpen,
} from "react-icons/fa6";
import { getLoggedUserCart } from "@/api/cartapi/getLoggedUserCart.api";
import { Product } from "@/types/cartType.types";
import CartItemCard from "@/app/_components/CartItemCard/CartItemCard";
import ClearCartBtn from "@/app/_components/ClearCartBtn/ClearCartBtn";
import PromoCodeBtn from "@/app/_components/PromoCodeBtn/PromoCodeBtn";

export default async function CartPage() {
  const response = await getLoggedUserCart();

  if (!response) redirect("/login");

  const items: Product[] = response?.data?.products ?? [];
  const numOfCartItems: number = response?.numOfCartItems ?? 0;
  const total: number = response?.data?.totalCartPrice ?? 0;

  const freeShippingThreshold = 500;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - total);
  const shippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);
  const shipping = total >= freeShippingThreshold ? 0 : 50;
  const grandTotal = total + shipping;

  return (
    <>
      {numOfCartItems >= 1 ? (
        <main className="min-h-screen bg-gray-50/50 py-8 lg:py-10">
          <div className="container mx-auto px-4 w-[95%]">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-5">
              <Link href="/" className="hover:text-[#16A34A] transition-colors">
                Home
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-800 font-medium">Shopping Cart</span>
            </nav>

            {/* عنوان الصفحة */}
            <div className="mb-8">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#16A34A] flex items-center justify-center text-white shadow-sm shrink-0">
                  <FaCartShopping className="text-xl sm:text-3xl" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">
                  Shopping Cart
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-500 font-medium ml-1">
                You have{" "}
                <span className="text-[#16A34A] font-semibold">
                  {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"}
                </span>{" "}
                in your cart
              </p>
            </div>

            {/* عمودين */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* المنتجات */}
              <div className="lg:col-span-8 space-y-4 relative">
                {items.map((product: Product) => (
                  <CartItemCard key={product._id} product={product} />
                ))}

                <div className="flex items-center justify-between pt-5 px-1">
                  <Link
                    href="/"
                    className="text-sm sm:text-md font-medium text-[#16A34A] hover:text-green-800 flex items-center gap-2 transition-colors"
                  >
                    <FaArrowLeft className="text-xs" />
                    Continue Shopping
                  </Link>

                  <ClearCartBtn />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-4 sticky top-24">
                <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
                  <div className="bg-linear-to-r from-green-600 to-green-700 px-5 sm:px-6 py-4 text-white">
                    <div className="flex items-center gap-2.5">
                      <FaBagShopping className="text-xl" />
                      <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                        Order Summary
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-green-100 mt-1 font-medium">
                      {numOfCartItems} {numOfCartItems === 1 ? "item" : "items"} in
                      your cart
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 space-y-5">
                    {/* الشحن المجاني */}
                    {freeShippingRemaining > 0 ? (
                      <div className="bg-[#FFFBEB] border border-amber-100 rounded-2xl p-4">
                        <div className="flex items-center gap-3">
                          <FaTruck className="text-orange-500 text-xl" />
                          <span className="text-xs sm:text-sm font-semibold text-gray-800">
                            Add {freeShippingRemaining} EGP for free shipping
                          </span>
                        </div>
                        <div className="w-full h-2 bg-orange-100 rounded-full mt-3 overflow-hidden">
                          <div
                            className="h-full bg-linear-to-r from-orange-400 to-orange-300 rounded-full transition-all duration-500"
                            style={{ width: `${shippingProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="bg-[#ECFDF5] rounded-2xl p-4 flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#D1FAE5] flex items-center justify-center shrink-0">
                          <FaTruck className="text-[#16A34A] text-lg" />
                        </div>
                        <div>
                          <p className="font-bold text-green-700 text-md">
                            Free Shipping!
                          </p>
                          <p className="text-[#16A34A] text-sm font-medium">
                            You qualify for free delivery
                          </p>
                        </div>
                      </div>
                    )}

                    {/* الحسابات */}
                    <div className="space-y-3.5 pt-1">
                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600 font-medium">Subtotal</span>
                        <span>{total} EGP</span>
                      </div>

                      <div className="flex justify-between items-center text-sm sm:text-base">
                        <span className="text-gray-600 font-medium">Shipping</span>
                        <span
                          className={
                            shipping === 0
                              ? "text-green-600 font-semibold"
                              : "text-gray-900"
                          }
                        >
                          {shipping === 0 ? "FREE" : `${shipping} EGP`}
                        </span>
                      </div>

                      <div className="border-t border-gray-100 pt-3.5 flex justify-between items-baseline">
                        <span className="text-base sm:text-lg font-semibold text-gray-900">
                          Total
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl sm:text-3xl font-semibold text-gray-900 tracking-tight">
                            {grandTotal}
                          </span>
                          <span className="text-sm font-bold text-gray-500">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    <PromoCodeBtn />

                    <Link
                      href="/checkout"
                      className="w-full bg-[#16A34A] hover:bg-[#15803D] text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] transition-all cursor-pointer"
                    >
                      <FaLock className="text-sm" />
                      Secure Checkout
                    </Link>

                    <div className="flex items-center justify-center gap-6 text-xs sm:text-sm font-medium text-gray-500 pt-1">
                      <div className="flex items-center gap-2">
                        <FaShieldHalved className="text-emerald-600 text-sm" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaTruck className="text-blue-500 text-sm" />
                        <span>Fast Delivery</span>
                      </div>
                    </div>

                    <div className="text-center pt-1">
                      <Link
                        href="/"
                        className="text-xs sm:text-sm font-medium text-[#16A34A] hover:underline inline-flex items-center gap-1.5 transition-colors"
                      >
                        <FaArrowLeft className="text-[11px]" />
                        Continue Shopping
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="min-h-[65vh] flex items-center justify-center px-4 py-16 bg-white">
          <div className="max-w-md w-full text-center">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 text-gray-300">
              <FaBoxOpen className="text-5xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
              Looks like you haven&apos;t added anything to your cart yet.
              <br />
              Start exploring our products!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-[#16A34A] hover:bg-[#15803D] text-white py-3.5 px-8 rounded-xl font-semibold transition-all shadow-md active:scale-[0.98] text-sm sm:text-base"
            >
              Start Shopping
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </main>
      )}
    </>
  );
}