
import Link from "next/link";
import { FaTags } from "react-icons/fa6";

export default function BrandsHeader() {
    return (
        <div className="bg-linear-to-br from-violet-600 via-violet-500 to-purple-400 text-white">
            <div className="container mx-auto px-4 py-12 sm:py-16">
                <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
                    <Link
                        href="/"
                        className="transition-colors hover:text-white"
                    >
                        Home
                    </Link>

                    <span className="text-white/40">/</span>

                    <span className="font-medium text-white">Brands</span>
                </nav>

                <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
                        <FaTags className="text-3xl" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Top Brands
                        </h1>

                        <p className="mt-1 text-white/80">
                            Shop from your favorite brands
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

