
import {
    FaPhone,
    FaEnvelope,
    FaLocationDot,
    FaClock,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa6";

const contactDetails = [
    {
        title: "Phone",
        description: "Mon-Fri from 8am to 6pm",
        value: "+1 (800) 123-4567",
        href: "tel:+18001234567",
        icon: FaPhone,
    },
    {
        title: "Email",
        description: "We'll respond within 24 hours",
        value: "support@freshcart.com",
        href: "mailto:support@freshcart.com",
        icon: FaEnvelope,
    },
];

const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function ContactInfo() {
    return (
        <div className="space-y-6">
            {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                    <div
                        key={item.title}
                        className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
                    >
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                                <Icon className="text-lg text-green-600" />
                            </div>

                            <div>
                                <h3 className="mb-1 font-semibold text-gray-900">
                                    {item.title}
                                </h3>
                                <p className="mb-2 text-sm text-gray-500">
                                    {item.description}
                                </p>
                                <a
                                    href={item.href}
                                    className="font-medium text-green-600 hover:underline"
                                >
                                    {item.value}
                                </a>
                            </div>
                        </div>
                    </div>
                );
            })}

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                        <FaLocationDot className="text-lg text-green-600" />
                    </div>
                    <div>
                        <h3 className="mb-1 font-semibold text-gray-900">Office</h3>
                        <p className="text-sm text-gray-500">
                            123 Commerce Street
                            <br />
                            New York, NY 10001
                            <br />
                            United States
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50">
                        <FaClock className="text-lg text-green-600" />
                    </div>
                    <div>
                        <h3 className="mb-1 font-semibold text-gray-900">
                            Business Hours
                        </h3>
                        <p className="text-sm text-gray-500">
                            Monday - Friday: 8am - 6pm
                            <br />
                            Saturday: 9am - 4pm
                            <br />
                            Sunday: Closed
                        </p>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 font-semibold text-gray-900">Follow Us</h3>
                <div className="flex items-center gap-3">
                    {socialLinks.map(({ icon: Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors hover:bg-green-600 hover:text-white"
                        >
                            <Icon />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

