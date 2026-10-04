import { getLoggedUserCart } from "@/api/cartapi/getLoggedUserCart.api";
import { getLoggedUserWishlist } from "@/api/wishlistapi/getLoggedUserWishlist.api";
import AddToCartBtn from "@/app/_components/AddToCartBtn/AddToCartBtn";
import RemoveFromWishlistBtn from "@/app/_components/RemoveFromWishlistBtn/RemoveFromWishlistBtn";
import { Product } from "@/types/cartType.types";
import { ProductType } from "@/types/product.types";
import Link from "next/link";
import { FaHeart, FaCartShopping, FaTrash, FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default async function Wishlist() {

  const wishlistResponse = await getLoggedUserWishlist()
  const cartResponse = await getLoggedUserCart()
  const wishlistCount = wishlistResponse?.data?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* رأس الصفحة (موحّد لكل الحالات) */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-[#16A34A] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                <FaHeart className="text-lg text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  My Wishlist
                </h1>
                <p className="text-gray-500 text-sm">
                  {wishlistCount}{" "}
                  {wishlistCount === 1 ? "item" : "items"} saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {wishlistResponse?.data?.length >= 1 ? (
        /* حالة وجود منتجات */
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

            {/* رأس الجدول (يظهر من md وفوق بس) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Actions</div>
            </div>

            <div className="divide-y divide-gray-100">
              {wishlistResponse?.data?.map((item: ProductType) => {


                const isInCart = cartResponse?.data?.products?.some(
                  (cartItem: Product) => cartItem.product.id === item.id
                ) || false;

                return (
                  <div
                    key={item.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                  >
                    {/* الصورة + الاسم + الفئة */}
                    <div className="md:col-span-6 flex items-center gap-4">
                      <Link
                        href={`/products/${item.id}`}
                        className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                      >
                        <img
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                          src={item.imageCover}
                        />
                      </Link>

                      <div className="min-w-0">
                        <Link
                          href={`/products/${item.id}`}
                          className="font-medium text-gray-900 hover:text-[#16A34A] transition-colors line-clamp-2"
                        >
                          {item.title}
                        </Link>

                        <p className="text-sm text-gray-400 mt-1">
                          {item.category.name}
                        </p>
                      </div>
                    </div>

                    {/* السعر */}
                    <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                      <span className="md:hidden text-sm text-gray-500">
                        Price:
                      </span>

                      <div className="text-right md:text-center">
                        {item.priceAfterDiscount ? <>
                          <div className="font-semibold text-gray-900">
                            {item.priceAfterDiscount} EGP
                          </div>
                          <div className="text-sm text-gray-400 line-through">
                            {item.price} EGP
                          </div>
                        </> : <div className="font-semibold text-gray-900">
                          {item.price} EGP
                        </div>
                        }

                      </div>
                    </div>

                    {/* الحالة */}
                    <div className="md:col-span-2 flex md:justify-center">
                      <span className="md:hidden text-sm text-gray-500 mr-2">
                        Status:
                      </span>


                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        {isInCart ? <FaCartShopping /> : <span className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                        {isInCart ? 'In Cart' : "In Stock"}
                      </span>
                    </div>

                    {/* الأزرار */}
                    <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                      <AddToCartBtn
                        productId={item.id}
                        isWishList
                        isDetails
                        isInCart={isInCart}
                      />

                      <RemoveFromWishlistBtn productId={item.id} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <Link
              href="/products"
              className="text-gray-500 hover:text-[#16A34A] text-sm font-medium transition-colors"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        /* حالة الـ Wishlist الفاضية */
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
          <div className="max-w-md w-full text-center">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6 text-gray-300">
              <FaHeart className="text-5xl" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-8 leading-relaxed">
              Save items you love by tapping the heart icon.
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
        </div>
      )}
    </div>
  );
}