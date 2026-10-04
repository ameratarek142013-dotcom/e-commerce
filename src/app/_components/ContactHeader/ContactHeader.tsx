
import Link from "next/link";
import { FaHeadset } from "react-icons/fa6";

export default function ContactHeader() {
    return (
        <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
            <div className="container mx-auto px-4 py-10 sm:py-14">
                {/* Breadcrumb */}
                <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-white/70">
                    <Link
                        href="/"
                        className="transition-colors hover:text-white"
                    >
                        Home
                    </Link>

                    <span className="text-white/40">/</span>

                    <span className="font-medium text-white">
                        Contact Us
                    </span>
                </nav>

                {/* Header Content */}
                <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
                        <FaHeadset className="text-3xl" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Contact Us
                        </h1>

                        <p className="mt-1 text-white/80">
                            We'd love to hear from you. Get in touch with our team.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

