import React from "react";
import Link from "next/link";
import { Package, ChevronRight, FolderOpen } from "lucide-react";
import { CategoryType } from "@/types/categoryType.types";
import { Brand } from "@/types/cartType.types";

export default function PageHeader({ subcategory, brand }: { subcategory: CategoryType, brand: Brand }) {
  return (
    <div className={`w-full bg-linear-to-r from-green-600/90  to-green-400 py-13 mb-6 px-6 md:px-16 text-white shadow-sm `}>

      {/* مسار التنقل (Breadcrumb) */}
      <div className="flex items-center gap-2 text-sm text-emerald-100 mb-6 font-medium">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>

        {(subcategory || brand) &&
          <>
            <ChevronRight size={14} className="text-emerald-200" />
            <Link href={`${subcategory ? 'categories' : 'brands'}`} className="hover:text-white transition-colors">
              {subcategory ? 'Categories' : 'Brands'}

            </Link>
          </>}
        <ChevronRight size={14} className="text-emerald-200" />
        <span className="text-white font-semibold "> {(subcategory || brand) ? (subcategory || brand).name : 'All Products'}</span>
      </div>

      {/* المحتوى الرئيسي (الأيقونة والعنوان والوصف) */}
      <div className="flex items-center gap-5">
        {/* مربع الأيقونة ذو الحواف المنحنية والخلفية الشفافة */}
        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner shrink-0">
          {brand?.image ? (
            <img src={brand.image} alt={brand.name} className="h-full w-10 object-contain" />
          ) : subcategory ? (
            <FolderOpen size={34} className="stroke-[1.7]" />
          ) : (
            <Package size={34} className="stroke-[1.7]" />
          )}
        </div>

        {/* النصوص */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {(subcategory || brand) ? (subcategory || brand).name : 'All Products'}
          </h1>
          <p className="text-sm md:text-base text-emerald-100 mt-1 font-normal">
            {(subcategory || brand) ? ` ${subcategory ? 'Browse' : 'Shop'} ${(subcategory || brand).name} products` : "Explore our complete product collection"}

          </p>
        </div>
      </div>

    </div>
  );
}