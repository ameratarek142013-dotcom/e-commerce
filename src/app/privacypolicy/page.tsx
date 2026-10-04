
import Link from "next/link";
import {
    FaShieldHalved,
    FaDatabase,
    FaUserShield,
    FaLock,
    FaShareNodes,
    FaUserCheck,
    FaCookieBite,
    FaClock,
    FaEnvelope,
    FaArrowLeft,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const articles: {
    number: number;
    title: string;
    icon: IconType;
    items?: {
        text: string;
        label?: string;
    }[];
    description?: string;
}[] = [
        {
            number: 1,
            title: "Information We Collect",
            icon: FaDatabase,
            items: [
                { label: "Personal Data", text: "Name, email address, phone number, and shipping address." },
                { label: "Payment Data", text: "Credit card information processed securely through our payment providers." },
                { label: "Technical Data", text: "IP address, browser type, device information, and access times." },
                { label: "Usage Data", text: "Pages viewed, products browsed, and actions taken within our platform." },
            ],
        },
        {
            number: 2,
            title: "How We Use Your Information",
            icon: FaUserShield,
            items: [
                { text: "To process and fulfill your orders." },
                { text: "To send order confirmations and shipping updates." },
                { text: "To provide customer support and respond to inquiries." },
                { text: "To improve our products, services, and user experience." },
                { text: "To send promotional communications (with your consent)." },
            ],
        },
        {
            number: 3,
            title: "Data Protection",
            icon: FaLock,
            items: [
                { text: "We implement industry-standard encryption (SSL/TLS) for all data transfers." },
                { text: "Payment information is processed by PCI-compliant payment providers." },
                { text: "We conduct regular security audits and vulnerability assessments." },
                { text: "Access to personal data is restricted to authorized personnel only." },
            ],
        },
        {
            number: 4,
            title: "Information Sharing",
            icon: FaShareNodes,
            items: [
                { text: "We do not sell, trade, or rent your personal information to third parties." },
                { text: "We may share data with trusted service providers who assist in our operations." },
                { text: "We may disclose information when required by law or to protect our rights." },
            ],
        },
        {
            number: 5,
            title: "Your Rights",
            icon: FaUserCheck,
            items: [
                { label: "Access", text: "Request a copy of your personal data." },
                { label: "Rectification", text: "Request correction of inaccurate data." },
                { label: "Erasure", text: "Request deletion of your personal data." },
                { label: "Portability", text: "Request your data in a portable format." },
                { label: "Opt-out", text: "Unsubscribe from marketing communications at any time." },
            ],
        },
        {
            number: 6,
            title: "Cookies",
            icon: FaCookieBite,
            items: [
                { text: "We use cookies to enhance your browsing experience and remember preferences." },
                { text: "You can control cookie settings through your browser preferences." },
                { text: "Disabling cookies may affect the functionality of certain features." },
            ],
        },
        {
            number: 7,
            title: "Data Retention",
            icon: FaClock,
            description:
                "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Account data is deleted within 30 days of account closure upon request.",
        },
        {
            number: 8,
            title: "Contact Us",
            icon: FaEnvelope,
            description:
                "For questions about this Privacy Policy or to exercise your rights, contact our Data Protection Officer at",
        },
    ];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
                <div className="container mx-auto px-4 py-12 sm:py-16">
                    <nav className="mb-8 flex items-center gap-2 text-sm text-white/70">
                        <Link href="/" className="transition-colors duration-200 hover:text-white">
                            Home
                        </Link>
                        <span className="text-white/40">/</span>
                        <span className="font-medium text-white">Privacy Policy</span>
                    </nav>

                    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 shadow-2xl shadow-green-900/30 ring-1 ring-white/30 backdrop-blur-sm">
                            <FaShieldHalved className="text-4xl" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                                Privacy Policy
                            </h1>
                            <p className="mt-2 text-lg text-white/80">
                                Last updated: February 2026
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Intro */}
                <div className="mb-12 rounded-3xl border border-green-200 bg-linear-to-r from-green-50 to-green-100/50 p-6 shadow-sm sm:p-8">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-500 shadow-lg shadow-green-500/25">
                            <FaShieldHalved className="text-xl text-white" />
                        </div>
                        <div>
                            <h2 className="mb-2 text-lg font-bold text-green-900">
                                Your Privacy Matters
                            </h2>
                            <p className="leading-relaxed text-green-800">
                                This Privacy Policy describes how FreshCart collects, uses, and
                                protects your personal information when you use our services.
                                We are committed to ensuring that your privacy is protected.
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
                                                <p className="text-sm">
                                                    {item.label && (
                                                        <strong className="text-gray-800">
                                                            {item.label}:{" "}
                                                        </strong>
                                                    )}
                                                    {item.text}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {article.description}{" "}
                                        {article.number === 8 && (
                                            <a
                                                href="mailto:privacy@freshcart.com"
                                                className="font-semibold text-green-600 hover:text-green-700 hover:underline"
                                            >
                                                privacy@freshcart.com
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
                            href="/termsofservice"
                            className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-medium text-white shadow-lg shadow-green-500/25 transition-all duration-200 hover:bg-green-600"
                        >
                            View Terms of Service
                            <span className="text-lg">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}