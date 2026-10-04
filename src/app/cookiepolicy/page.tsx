
import Link from "next/link";
import {
    FaCookieBite,
    FaShieldHalved,
    FaChartLine,
    FaGear,
    FaCircleInfo,
    FaEnvelope,
    FaArrowLeft,
} from "react-icons/fa6";
import type { IconType } from "react-icons";

const sections: {
    title: string;
    icon: IconType;
    content: string[];
}[] = [
        {
            title: "What Are Cookies?",
            icon: FaCookieBite,
            content: [
                "Cookies are small text files that are stored on your device when you visit a website. They help websites work properly, remember your preferences, and improve your browsing experience.",
                "At FreshCart, we use cookies and similar technologies to make our website easier to use, secure, and more personalized.",
            ],
        },
        {
            title: "How We Use Cookies",
            icon: FaGear,
            content: [
                "We use cookies for several purposes, including:",
                "Essential cookies: These are necessary for the website to function correctly, such as keeping your shopping cart active and allowing you to sign in securely.",
                "Preference cookies: These remember your choices, such as your preferred settings, to provide a more personalized experience.",
                "Analytics cookies: These help us understand how visitors interact with our website, so we can improve its performance and usability.",
                "Marketing cookies: These may be used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.",
            ],
        },
        {
            title: "Types of Cookies We Use",
            icon: FaChartLine,
            content: [
                "Session Cookies: Temporary cookies that are deleted when you close your browser. They help maintain your session while you navigate our website.",
                "Persistent Cookies: These remain on your device for a specified period or until you delete them. They help remember your preferences when you return to our website.",
                "First-Party Cookies: Cookies set directly by FreshCart to support website functionality and improve your experience.",
                "Third-Party Cookies: Cookies that may be set by trusted external services, such as analytics or advertising providers.",
            ],
        },
        {
            title: "Managing Your Cookie Preferences",
            icon: FaShieldHalved,
            content: [
                "You can manage or disable cookies through your browser settings. Most browsers allow you to block cookies, delete existing cookies, or receive a notification before a cookie is stored.",
                "Please note that disabling certain cookies may affect the functionality of our website. Some features, such as shopping cart functionality or account sign-in, may not work as expected.",
            ],
        },
        {
            title: "Third-Party Cookies",
            icon: FaCircleInfo,
            content: [
                "We may use third-party services to support website analytics, performance, and marketing. These services may place cookies on your device in accordance with their own privacy policies.",
                "We encourage you to review the privacy and cookie policies of any third-party services you interact with through our website.",
            ],
        },
        {
            title: "Changes to This Cookie Policy",
            icon: FaCookieBite,
            content: [
                "We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, or applicable requirements.",
                "Any updates will be posted on this page, along with the revised date. We encourage you to review this page periodically.",
            ],
        },
        {
            title: "Contact Us",
            icon: FaEnvelope,
            content: [
                "If you have any questions about our use of cookies or this Cookie Policy, please contact us:",
            ],
        },
    ];

export default function CookiePolicyPage() {
    return (
        <main className="min-h-screen bg-[#F9F7F4] pb-20">
            {/* Header */}
            <section className="bg-linear-to-br from-amber-600 via-amber-500 to-amber-400 text-white">
                <div className="container mx-auto  py-12">
                    <div className="flex items-center gap-2 text-sm  mb-5">
                        <Link href="/" className="hover:text-amber-600 transition">
                            Home
                        </Link>
                        <span>/</span>
                        <span>Cookie Policy</span>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                            <FaCookieBite size={27} />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold ">
                                Cookie Policy
                            </h1>
                            <p className="text-sm  mt-1">
                                Last updated: October 2026
                            </p>
                        </div>
                    </div>

                    <p className="max-w-3x leading-7">
                        This Cookie Policy explains how FreshCart uses cookies and similar
                        technologies when you visit our website, and how you can manage
                        your preferences.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="mx-auto container  pt-10">
                <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 md:p-6">
                    <div className="flex gap-3">
                        <FaCircleInfo className="mt-1 shrink-0 text-amber-600" size={20} />
                        <div>
                            <h2 className="font-semibold text-gray-900 mb-1">
                                Your Privacy Matters
                            </h2>
                            <p className="text-sm leading-6 text-gray-600">
                                We use cookies to provide essential website features and
                                improve your experience. You can control certain cookies
                                through your browser settings.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid xl:grid-cols-2 gap-5">
                    {sections.map((section, index) => {
                        const Icon = section.icon;

                        return (
                            <article
                                key={section.title}
                                className="rounded-2xl border border-gray-200 bg-white  p-6 md:p-8 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                        <Icon size={20} />
                                    </div>
                                    <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                        {index + 1}. {section.title}
                                    </h2>
                                </div>

                                <div className="space-y-3 pl-0 md:pl-14">
                                    {section.content.map((paragraph, i) => (
                                        <p
                                            key={i}
                                            className="text-sm md:text-base leading-7 text-gray-600"
                                        >
                                            {paragraph}
                                        </p>
                                    ))}

                                    {section.title === "Contact Us" && (
                                        <div className="pt-2">
                                            <a
                                                href="mailto:support@freshcart.com"
                                                className="font-medium text-amber-600 hover:text-amber-700 underline underline-offset-4"
                                            >
                                                support@freshcart.com
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-white border border-gray-200 p-6">
                    <p className="text-sm text-gray-500 text-center sm:text-left">
                        Thank you for choosing FreshCart.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
                        <Link
                            href="/privacypolicy"
                            className="text-gray-600 hover:text-amber-600 transition"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="/termsofservice"
                            className="text-gray-600 hover:text-amber-600 transition"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-amber-600 hover:text-amber-700 transition"
                        >
                            <FaArrowLeft size={12} />
                            Back to Home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}