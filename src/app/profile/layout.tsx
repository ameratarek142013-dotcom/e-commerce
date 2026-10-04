import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import ProfileSidebar from '@/app/_components/ProfileSidebar/ProfileSidebar'

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <header className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
                <div className="container mx-auto px-4 py-10 sm:py-12">
                    <nav className="mb-6 flex items-center gap-2 text-sm text-white/70">
                        <Link href="/" className="transition-colors hover:text-white">Home</Link>
                        <span className="text-white/40">/</span>
                        <span className="font-medium text-white">My Account</span>
                    </nav>

                    <div className="flex items-center gap-5">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 shadow-xl ring-1 ring-white/30 backdrop-blur-sm">
                            <FaUser className="text-3xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My Account</h1>
                            <p className="mt-1 text-white/80">Manage your addresses and account settings</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                    <ProfileSidebar />
                    <main className="min-w-0 flex-1">{children}</main>
                </div>
            </div>
        </div>
    )
}