import { getAllCategories } from "@/api/getAllCategories.api";
import { CategoryType } from "@/types/categoryType.types";
import Link from "next/link";
import { FaLayerGroup } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";



export default async function Categories({ isHome }: { isHome?: boolean }) {

    const { data } = await getAllCategories()
    return (
        <section id="categories" className={isHome ? 'py-10' : ""}>
            {!isHome && <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
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

                        <span className="font-medium text-white">
                            Categories
                        </span>
                    </nav>

                    {/* Title */}
                    <div className="flex items-center gap-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
                            <FaLayerGroup className="text-3xl" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                                All Categories
                            </h1>

                            <p className="mt-1 text-white/80">
                                Browse our wide range of product categories
                            </p>
                        </div>
                    </div>
                </div>
            </div>}
            <div className="container mx-auto px-4">
                {/* Header */}
                {isHome ? <div className="mb-8 flex flex-col justify-between sm:flex-row sm:items-center">
                    <div className="my-8 flex items-center gap-3">
                        <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-green-500 to-green-700" />

                        <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            Shop By{" "}
                            <span className="text-green-600">Category</span>
                        </h2>
                    </div>

                    <Link
                        href="/categories"
                        className="flex cursor-pointer items-center self-end font-medium text-green-600 transition-colors hover:text-green-700 sm:self-auto"
                    >
                        View All Categories
                        <FaArrowRight className="ml-2 text-sm" />
                    </Link>
                </div> : ""}


                {/* Categories */}
                <div className={
                    isHome
                        ? "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
                        : "grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 py-10"
                }>
                    {data.map((category: CategoryType) =>
                        !isHome ?
                            <Link
                                key={category._id}
                                href={`/categories/${category._id}`}
                                className="group rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl sm:p-6"
                            >
                                <div className="mb-4 aspect-square overflow-hidden rounded-xl bg-gray-50">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <h3 className="text-center font-bold text-gray-900 transition-colors group-hover:text-green-600">
                                    {category.name}
                                </h3>

                                <div className="mt-2 flex justify-center opacity-0 transition-opacity group-hover:opacity-100">
                                    <span className="flex items-center gap-1 text-xs text-green-600">
                                        View Subcategories
                                        <FaArrowRight className="text-[10px]" />
                                    </span>
                                </div>
                            </Link>
                            : <Link
                                key={category._id}
                                href={`/categories/${category._id}`}
                                className="group rounded-lg bg-white p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-green-50 transition-colors duration-300 group-hover:bg-green-100">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        width={300}
                                        height={300}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <h3 className="font-medium text-gray-800 transition-colors group-hover:text-green-600">
                                    {category.name}
                                </h3>
                            </Link>


                    )}
                </div>
            </div>
        </section>
    );
}