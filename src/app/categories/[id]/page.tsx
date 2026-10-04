import React from 'react'
import Link from "next/link";
import {
    FaArrowLeft,
    FaArrowRight,
    FaFolderOpen,
} from "react-icons/fa6";
import { getSpecificCategory } from '@/api/GetSpecificCategory.api';
import { getAllSubcategoriesOnCategory } from '@/api/getAllSubcategoriesOnCategory.api';
import { CategoryType } from '@/types/categoryType.types';

export default async function CategoryDetails({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params


    const response = await getSpecificCategory(id)
    const responseSubCategories = await getAllSubcategoriesOnCategory(id)
    const subcategories: CategoryType[] = responseSubCategories?.data ?? []

    return (
        <div className="min-h-screen bg-gray-50/50">

            {/* Hero */}
            <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
                <div className="container mx-auto px-4 py-12 sm:py-16">

                    {/* Breadcrumb */}
                    <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
                        <Link
                            href="/"
                            className="transition-colors hover:text-white"
                        >
                            Home
                        </Link>

                        <span className="text-white/40">/</span>

                        <Link
                            href="/categories"
                            className="transition-colors hover:text-white"
                        >
                            Categories
                        </Link>

                        <span className="text-white/40">/</span>

                        <span className="font-medium text-white">
                            {response.data.name}
                        </span>
                    </nav>

                    {/* Category Info */}
                    <div className="flex items-center gap-5">

                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
                            <img
                                src={response.data.image}
                                alt={response.data.name}
                                className="h-12 w-12 object-contain"
                            />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                {response.data.name}
                            </h1>

                            <p className="mt-1 text-white/80">
                                Choose a subcategory to browse products
                            </p>
                        </div>

                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-10">

                {/* Back */}
                <Link
                    href="/categories"
                    className="mb-6 inline-flex items-center gap-2 text-gray-600 transition-colors hover:text-green-600"
                >
                    <FaArrowLeft />

                    <span>
                        Back to Categories
                    </span>
                </Link>

                {/* Title */}
                <div className="mb-6">
                    <h2 className="text-lg font-bold text-gray-900">
                        {subcategories.length} Subcategories in {response.data.name}
                    </h2>
                </div>

                {subcategories.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
                        {subcategories.map((subcategory: CategoryType) => (
                            <Link
                                key={subcategory._id}
                                href={`/products?subcategory=${subcategory._id}`}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl"
                            >
                                {/* Icon */}
                                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 transition-colors group-hover:bg-green-100">
                                    <FaFolderOpen className="text-2xl text-green-600" />
                                </div>

                                {/* Name */}
                                <h3 className="mb-2 text-lg font-bold text-gray-900 transition-colors group-hover:text-green-600">
                                    {subcategory.name}
                                </h3>

                                {/* Browse */}
                                <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 transition-opacity group-hover:opacity-100">
                                    <span>Browse Products</span>
                                    <FaArrowRight className="text-xs" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                            <FaFolderOpen className="text-3xl text-gray-400" />
                        </div>

                        <h3 className="mb-2 text-lg font-bold text-gray-900">
                            No Subcategories Found
                        </h3>

                        <p className="mb-6 text-gray-500">
                            This category doesn&apos;t have any subcategories yet.
                        </p>

                        <Link
                            href={`/products?category=${id}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                        >
                            View All Products in {response.data.name}
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}