
import { RefreshCw, Eye, Star } from "lucide-react";
import Link from "next/link";
import { ProductType } from "@/types/product.types";
import Image from "next/image";
import AddToCartBtn from "@/app/_components/AddToCartBtn/AddToCartBtn";
import AddToWishlistBtn from "@/app/_components/AddToWishlistBtn/AddToWishlistBtn";

export default function ProductCard({ product, isWishListed }: { product: ProductType, isWishListed: boolean }) {


    const hasDiscount = product.priceAfterDiscount < product.price;

    const discountPercent = Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100);

    return (
        <div className="group relative bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            {/* قسم الصورة والأزرار الجانبية */}
            <div className="relative w-full h-64 bg-gray-50 rounded-2xl flex items-center justify-center overflow-hidden mb-4">

                {/* شارة الخصم */}
                {hasDiscount && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-sm z-10">
                        -{discountPercent}%
                    </span>
                )}

                <Image
                    src={product.imageCover}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                />

                {/* الأزرار العائمة على اليمين (Wishlist, Compare, Quick View) */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-95">
                    <AddToWishlistBtn productId={product.id} isWishListed={isWishListed} />
                    <Link href={`/products/${product.id}`} className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-green-600  transition-colors">
                        <Eye size={18} />
                    </Link>
                </div>
            </div>

            {/* تفاصيل المنتج */}
            <div className="flex flex-col gap-1">
                {/* الفئة */}
                <span className="text-xs text-gray-400 font-medium">{product.category.name}</span>

                {/* اسم المنتج */}
                <h3 className="font-medium text-gray-800  line-clamp-2 group-hover:text-green-600 transition-colors">
                    {product.title}
                </h3>

                {/* التقييم والنجوم */}
                <div className="flex items-center gap-1.5 my-1">
                    <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => {
                            const ratingValue = product.ratingsAverage - i;

                            if (ratingValue >= 1) {
                                // نجمة ممتلئة بالكامل
                                return <Star key={i} size={16} fill="currentColor" />;
                            } else if (ratingValue >= 0.5) {
                                // نجمة نص (باستخدام overflow لعمل تأثير half-fill)
                                return (
                                    <div key={i} className="relative">
                                        <Star size={16} className="text-gray-300" />
                                        <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                                            <Star size={16} fill="currentColor" className="text-amber-400" />
                                        </div>
                                    </div>
                                );
                            } else {
                                // نجمة فاضية
                                return <Star key={i} size={16} className="text-gray-300" />;
                            }
                        })}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                        {product.ratingsAverage} ({product.ratingsQuantity})
                    </span>
                </div>

                {/* السعر وزر الإضافة للسلة */}
                <div className="flex items-center justify-between mt-2">
                    <div className={`flex items-baseline gap-1.5 ${hasDiscount ? 'flex-col xl:flex-row' : 'flex-row'} `}>
                        {hasDiscount ? (
                            <>
                                <span className="text-xl font-bold text-green-600 ">{product.priceAfterDiscount} EGP</span>
                                <span className="text-sm text-gray-400 line-through ml-1">{product.price} EGP</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xl font-bold text-gray-900">{product.price}</span>
                                <span className="text-sm font-bold text-gray-900">EGP</span>
                            </>
                        )}
                    </div>

                    {/* زر الإضافة الدائري الأخضر */}
                    <AddToCartBtn productId={product.id} />
                </div>
            </div>

        </div>
    );
}