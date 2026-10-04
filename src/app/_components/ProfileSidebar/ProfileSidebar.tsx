'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronRight } from 'react-icons/fa'
import { FaGear, FaLocationDot } from 'react-icons/fa6'

const links = [
    { href: '/profile/addresses', label: 'My Addresses', icon: FaLocationDot },
    { href: '/profile/settings', label: 'Settings', icon: FaGear },
]

export default function ProfileSidebar() {
    const pathname = usePathname()

    return (
        <aside className="w-full shrink-0 lg:w-72">
            <nav className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="border-b border-gray-100 p-4">
                    <h2 className="font-bold text-gray-900">My Account</h2>
                </div>

                <ul className="p-2">
                    {links.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${active
                                            ? 'bg-green-50 text-green-700'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <div
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${active ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                            }`}
                                    >
                                        <Icon className="text-sm" />
                                    </div>
                                    <span className="flex-1 font-medium">{label}</span>
                                    <FaChevronRight className={`text-xs ${active ? 'text-green-500' : 'text-gray-400'}`} />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}