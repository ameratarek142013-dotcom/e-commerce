
import Link from "next/link";
import {
    FaFileContract,
    FaHandshake,
    FaUserCheck,
    FaIdCard,
    FaCreditCard,
    FaTruck,
    FaRotateLeft,
    FaScaleBalanced,
    FaEnvelope,
    FaArrowLeft,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const articles: {
    number: number;
    title: string;
    icon: IconType;
    items?: { text: string }[];
    description?: string;
    email?: string;
}[] = [
        {
            number: 1,
            title: "Acceptance of Terms",
            icon: FaHandshake,
            items: [
                {
                    text: "By accessing or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms.",
                },
                {
                    text: "If you do not agree to these Terms, you must not access or use the Service.",
                },
                {
                    text: "We reserve the right to modify these Terms at any time, and such modifications shall be effective immediately upon posting.",
                },
            ],
        },
        {
            number: 2,
            title: "User Eligibility",
            icon: FaUserCheck,
            items: [
                {
                    text: "The Service is intended for users who are at least eighteen (18) years of age.",
                },
                {
                    text: "By using the Service, you represent and warrant that you are of legal age to form a binding contract.",
                },
                {
                    text: "If you are accessing the Service on behalf of a legal entity, you represent that you have the authority to bind such entity.",
                },
            ],
        },
        {
            number: 3,
            title: "Account Registration",
            icon: FaIdCard,
            items: [
                {
                    text: "You may be required to create an account to access certain features of the Service.",
                },
                {
                    text: "You agree to provide accurate, current, and complete information during registration.",
                },
                {
                    text: "You are solely responsible for maintaining the confidentiality of your account credentials.",
                },
                {
                    text: "You agree to notify us immediately of any unauthorized use of your account.",
                },
            ],
        },
        {
            number: 4,
            title: "Orders and Payments",
            icon: FaCreditCard,
            items: [
                {
                    text: "All orders placed through the Service are subject to acceptance and availability.",
                },
                {
                    text: "Prices are subject to change without notice prior to order confirmation.",
                },
                {
                    text: "Payment must be made in full at the time of purchase through approved payment methods.",
                },
                {
                    text: "We reserve the right to refuse or cancel any order at our sole discretion.",
                },
            ],
        },
        {
            number: 5,
            title: "Shipping and Delivery",
            icon: FaTruck,
            items: [
                {
                    text: "Shipping times are estimates only and are not guaranteed.",
                },
                {
                    text: "Risk of loss and title for items purchased pass to you upon delivery to the carrier.",
                },
                {
                    text: "We are not responsible for delays caused by carriers, customs, or other factors beyond our control.",
                },
            ],
        },
        {
            number: 6,
            title: "Returns and Refunds",
            icon: FaRotateLeft,
            items: [
                {
                    text: "Our return policy allows returns within 14 days of delivery for most items.",
                },
                {
                    text: "Products must be unused and in original packaging.",
                },
                {
                    text: "Refunds will be processed within 5-7 business days after receiving the returned item.",
                },
            ],
        },
        {
            number: 7,
            title: "Limitation of Liability",
            icon: FaScaleBalanced,
            description:
                "To the maximum extent permitted by applicable law, FreshCart shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.",
        },
        {
            number: 8,
            title: "Contact Us",
            icon: FaEnvelope,
            description:
                "If you have any questions about these Terms, please contact us at",
            email: "support@freshcart.com",
        },
    ];

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
                <div className="container mx-auto px-4 py-12 sm:py-16">
                    <nav className="mb-8 flex items-center gap-2 text-sm text-white/70">
                        <Link
                            href="/"
                            className="transition-colors duration-200 hover:text-white"
                        >
                            Home
                        </Link>
                        <span className="text-white/40">/</span>
                        <span className="font-medium text-white">
                            Terms of Service
                        </span>
                    </nav>

                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 shadow-2xl shadow-green-900/30 ring-1 ring-white/30 backdrop-blur-sm">
                            <FaFileContract className="text-4xl" />
                        </div>

                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Terms of Service
                            </h1>
                            <p className="mt-2 text-lg text-white/80">
                                Last updated: February 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Important Notice */}
                <div className="mb-12 rounded-3xl border border-amber-200 bg-linear-to-r from-amber-50 to-amber-100/50 p-6 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500 shadow-lg shadow-amber-500/25">
                            <FaFileContract className="text-xl text-white" />
                        </div>

                        <div>
                            <h2 className="mb-2 text-lg font-bold text-amber-900">
                                Important Notice
                            </h2>
                            <p className="leading-relaxed text-amber-800">
                                By accessing and using FreshCart, you accept and agree to be
                                bound by the terms and provisions of this agreement. Please
                                read these terms carefully before using our services.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Articles */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                    {articles.map((article) => {
                        const Icon = article.icon;

                        return (
                            <section
                                key={article.number}
                                className="group rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-green-100 hover:shadow-lg sm:p-8"
                            >
                                <div className="mb-5 flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-green-100 to-green-50 transition-all duration-300 group-hover:from-green-500 group-hover:to-green-400">
                                        <Icon className="text-xl text-green-600 transition-colors duration-300 group-hover:text-white" />
                                    </div>

                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-green-600">
                                            Article {article.number}
                                        </span>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            {article.title}
                                        </h2>
                                    </div>
                                </div>

                                {article.items ? (
                                    <div className="space-y-3">
                                        {article.items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-3 leading-relaxed text-gray-600"
                                            >
                                                <span className="mt-0.5 shrink-0 rounded-md bg-green-50 px-2 py-0.5 text-xs font-bold text-green-500">
                                                    {article.number}.{index + 1}
                                                </span>

                                                <p className="text-sm">{item.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {article.description}{" "}
                                        {article.email && (
                                            <a
                                                href={`mailto:${article.email}`}
                                                className="font-semibold text-green-600 hover:text-green-700 hover:underline"
                                            >
                                                {article.email}
                                            </a>
                                        )}
                                    </p>
                                )}
                            </section>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-all duration-200 hover:bg-gray-200"
                        >
                            <FaArrowLeft className="text-sm" />
                            Back to Home
                        </Link>

                        <Link
                            href="/privacypolicy"
                            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-medium text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:bg-green-600"
                        >
                            View Privacy Policy
                            <span className="text-lg">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}