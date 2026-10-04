"use client";

import React, { useState } from 'react';
import {
  ChevronDown,
  Gift,
  Headset,
  Heart,
  LogOut,
  Mail,
  Phone,
  Search,
  ShoppingCart,
  Truck,
  User,
  UserRound,
  Menu,
  X,
  UserPlus,
  Package,
  BookUser,
  Settings,
  LayoutGrid,
  Laptop,
  Shirt,
  UserCheck,
  Sparkles,
  CircleUserRound,
  LogOutIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import logo from '../../../../public/assets/freshcart-logo.49f1b44d.svg'
import { signOut, useSession } from 'next-auth/react';
import { CategoryType } from '@/types/categoryType.types';


export default function NavbarDetails({ numOfCartItems, numOfWishlistItems, responseCategories }: { numOfCartItems: number, numOfWishlistItems: number, responseCategories: CategoryType[] }) {

  const { data: session, status } = useSession()


  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();


  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Brands', href: '/brands' },
  ];

  const logOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <>
      {/* الناف  الأول */}
      <section className="hidden lg:block py-2 border-b border-gray-200 text-gray-600 font-medium text-sm bg-white">
        <div className="w-[95%] m-auto flex justify-between">
          <div className="left-nav flex gap-5">
            <div className="flex gap-2 items-center">
              <Truck size={14} color="#16A34A" />
              <p>Free Shipping on Orders 500 EGP</p>
            </div>
            <div className="flex gap-2 items-center">
              <Gift size={14} color="#16A34A" />
              <p>New Arrivals Daily</p>
            </div>
          </div>
          <div className="right-nav flex gap-5">
            <div className="flex gap-5 border-r-2 border-gray-300 pe-5">
              <div className="flex gap-2 items-center hover:text-green-600 transition-all">
                <Phone size={14} fill="gray" />
                <Link href={'tel:+1 (800) 123-4567'}>+1 (800) 123-4567</Link>
              </div>
              <div className="flex gap-2 items-center hover:text-green-600 transition-all">
                <Mail size={14} />
                <Link href={'mailto:support@freshcart.com'}>support@freshcart.com</Link>
              </div>
            </div>
            <div>
              <div className="flex gap-5">
                {session ? <>
                  <div className="flex gap-2 items-center hover:text-green-600 transition-all">
                    <User size={14} fill="gray" />
                    <Link href={'/profile/addresses'} className=''>{session.user.name}</Link>
                  </div>
                  <div onClick={() => logOut()} className="flex gap-2 items-center hover:text-red-400 transition-all">
                    <LogOut size={14} />
                    <Link href={'/'}>Sign Out</Link>
                  </div></> : <>
                  <div className="flex gap-2 items-center hover:text-green-600 transition-all">
                    <UserRound size={14} />
                    <Link href={'/login'}>Sign In</Link>
                  </div>
                  <div className="flex gap-2 items-center hover:text-green-600 transition-all">
                    <UserPlus size={14} />
                    <Link href={'/register'}>Sign Up</Link>
                  </div></>}


              </div>
            </div>
          </div>
        </div>
      </section>

      {/* الناف بار الرئيسي */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <nav className="w-[95%] mx-auto flex items-center justify-between gap-4 py-3">

          {/* 1. الشعار */}
          <Link href={'/'}>
            <div className="flex items-center gap-3 cursor-pointer">
              <Image
                priority
                src={logo}
                alt="FreshCart Logo"
                className="h-8 md:h-10 w-auto object-contain"
              />
            </div>
          </Link>

          {/* 2. شريط البحث (الشاشات الكبيرة) */}
          <form action="/search" method="get" className="hidden lg:block grow max-w-100 relative">
            <input
              name="q"
              type="search"
              placeholder="Search for products, brands and more..."
              className="w-full pl-5 pr-16 py-2.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] focus:ring-2 focus:ring-[#16A34A] focus:border-transparent transition duration-150 outline-none text-sm"
            />
              <button type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#16A34A] text-white p-2 rounded-full hover:bg-[#15803D] transition duration-300 cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
          </form>

          {/* 3. روابط التنقل الرئيسية (الشاشات الكبيرة) */}
          <div className="hidden xl:flex items-center gap-8 text-base font-medium text-[#334155]">
            <Link href="/" className={`hover:text-[#16A34A] transition ${pathname === '/' ? 'text-[#16A34A] font-semibold' : ''}`}>Home</Link>
            <Link href="/products" className={`hover:text-[#16A34A] transition ${pathname === '/products' ? 'text-[#16A34A] font-semibold' : ''}`}>Shop</Link>
            <Link href="/categories" className={`flex items-center gap-1 group hover:text-[#16A34A] transition ${pathname === '/categories' ? 'text-[#16A34A] font-semibold' : ''}`}>
              <DropdownMenu open={categoriesOpen} onOpenChange={setCategoriesOpen}>
                <div
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                  className="relative inline-block"
                >
                  <DropdownMenuTrigger
                    render={
                      <button className="flex items-center gap-2 font-medium text-gray-800 hover:text-[#16A34A] transition-colors focus:outline-none py-2">
                        <span className={categoriesOpen ? "text-[#16A34A]" : ""}>Categories</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-200 ${categoriesOpen ? "rotate-180 text-[#16A34A]" : "text-gray-500"}`}
                        />
                      </button>
                    }
                  />

                  <DropdownMenuContent
                    align="start"
                    className="w-64 p-2 rounded-2xl shadow-lg border-gray-100 bg-white"
                  >
                    <DropdownMenuGroup className="space-y-1">
                      <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700 hover:bg-emerald-50! transition-colors group">
                        <LayoutGrid size={20} className="text-gray-500 mr-3 group-hover:text-[#16A34A]" />
                        <Link href={'/categories'} className="font-medium group-hover:text-green-700!">All Categories</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700 hover:bg-emerald-50! transition-colors group">
                        <Laptop size={20} className="text-gray-500 mr-3 group-hover:text-[#16A34A]" />
                        <Link href={`/products?category=${responseCategories[9]._id}`} className="font-medium group-hover:text-green-700!">Electronics</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700 hover:bg-emerald-50! transition-colors group">
                        <Shirt size={20} className="text-gray-500 mr-3 group-hover:text-[#16A34A]" />
                        <Link href={`/products?category=${responseCategories[2]._id}`} className="font-medium group-hover:text-green-700!">Women's Fashion</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700 hover:bg-emerald-50! transition-colors group">
                        <UserCheck size={20} className="text-gray-500 mr-3 group-hover:text-[#16A34A]" />
                        <Link href={`/products?category=${responseCategories[1]._id}`} className="font-medium group-hover:text-green-700!">Men's Fashion</Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700 hover:bg-emerald-50! transition-colors group">
                        <Sparkles size={20} className="text-gray-500 mr-3 group-hover:text-[#16A34A]" />
                        <Link href={`/products?category=${responseCategories[7]._id}`} className="font-medium group-hover:text-green-700!">Beauty & Health</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </div>
              </DropdownMenu>
            </Link>
            <Link href="/brands" className={`hover:text-[#16A34A] transition ${pathname === '/brands' ? 'text-[#16A34A] font-semibold' : ''}`}>Brands</Link>
          </div>

          {/* 4. الأيقونات والخدمات */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">

            {/* الدعم */}
            <Link href={'/contact'} className="hidden lg:flex items-center gap-2.5 group cursor-pointer">
              <div className="p-2 rounded-full bg-[#ECFDF5]">
                <Headset className="h-5 w-5 text-[#16A34A] group-hover:text-green-500 transition-all" />
              </div>
              <div className="flex flex-col text-xs">
                <span className="text-[#64748B] font-medium leading-tight">Support</span>
                <span className="text-[#334155] font-bold">24/7 Help</span>
              </div>
            </Link>

            {/* خط فاصل */}
            <div className="hidden lg:block h-8 w-px bg-gray-200"></div>

            {/* المفضلة */}
            <Link href="/washlist" className="relative text-[#64748B] hover:text-[#16A34A] transition p-1" aria-label="Wishlist">
              <Heart className="h-6 w-6 md:h-7 md:w-7" />
              {numOfWishlistItems > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                {numOfWishlistItems}
              </span>}

            </Link>

            {/* عربة التسوق */}
            <Link href="/cart" className="relative text-[#64748B] hover:text-[#16A34A] transition p-1" aria-label="Cart">
              <ShoppingCart className="h-6 w-6 md:h-7 md:w-7" />
              {numOfCartItems > 0 && <span className="absolute -top-1 -right-2 bg-green-500 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                {numOfCartItems}
              </span>}

            </Link>

            {session ? <><DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full w-12 h-12 hover:bg-gray-100 transition hidden lg:flex items-center justify-center group duration-300"
                  >
                    <CircleUserRound

                      className="stroke-[1.5] text-gray-700 w-6! h-6! min-w-6 min-h-6 group-hover:text-green-700 transition-all duration-300"
                    />
                  </Button>
                }
              />

              <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3 px-3 py-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-100! flex items-center justify-center text-[#16A34A]">
                    <CircleUserRound size={24} className="stroke-[1.7]" />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm ">{session.user.name}</span>
                </div>

                <DropdownMenuSeparator className="mb-1" />

                <DropdownMenuGroup className="space-y-1">
                  <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700   hover:bg-emerald-50!  transition-colors group">
                    <User size={20} className="text-gray-500 mr-3" />
                    <Link href={'/profile/addresses'} className="font-medium text-slate-600 group-hover:text-green-700!">My Profile</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700  hover:bg-emerald-50! transition-colors group">
                    <Package size={20} className="text-gray-500 mr-3" />
                    <Link href={'/allorders'} className="font-medium text-slate-600 group-hover:text-green-700!">My Orders</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700  hover:bg-emerald-50! transition-colors group">
                    <Heart size={20} className="text-gray-500 mr-3" />
                    <Link href={'/washlist'} className="font-medium text-slate-600 group-hover:text-green-700!">My Wishlist</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700  hover:bg-emerald-50! transition-colors group">
                    <BookUser size={20} className="text-gray-500 mr-3" />
                    <Link href={'/profile/addresses'} className="font-medium text-slate-600 group-hover:text-green-700!">Addresses</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer rounded-xl px-3 py-2.5 text-gray-700  hover:bg-emerald-50! transition-colors group">
                    <Settings size={20} className="text-gray-500 mr-3" />
                    <Link href={'/profile/settings'} className="font-medium text-slate-600 group-hover:text-green-700!">Settings</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logOut} className="cursor-pointer rounded-xl px-3 py-2.5 text-red-600 hover:bg-red-50! transition-colors group">
                  <LogOutIcon size={20} className="text-red-500 mr-3 group-hover:text-red-600!" />
                  <Link href={'/'} className="font-medium group-hover:text-red-600! ">Sign Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu></> : <>
              {/* زر تسجيل الدخول (الشاشات الكبيرة) */}
              <Link href={'/login'} className="hidden lg:flex items-center justify-center gap-2 bg-[#16A34A] text-white px-5 py-2 rounded-full font-medium hover:bg-[#15803D] transition duration-200 shadow-sm text-sm whitespace-nowrap">
                <User className="h-5 w-5 shrink-0" />
                <span>Sign In</span>
              </Link></>}






            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open mobile menu"
              className="lg:hidden flex items-center justify-center bg-[#16A34A] text-white w-10 h-10 rounded-full hover:bg-[#15803D] transition shadow-sm"
            >
              <Menu className="h-5 w-5" />
            </button>

          </div>
        </nav>
      </header>

      {/* خلفية معتمة (Backdrop) عند فتح السايد بار */}
      <div
        className={`fixed inset-0 bg-black/40 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* السايد بار الجانبي للشاشات الصغيرة */}
      <aside
        className={`fixed top-0 right-0 h-full w-77.5 max-w-[85vw] bg-white z-50 shadow-2xl flex flex-col justify-between p-5 overflow-y-auto transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        aria-label="Mobile Navigation"
      >
        <div>
          {/* رأس السايد بار: اللوجو وزر الإغلاق X */}
          <div className="flex items-center justify-between pb-3">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                priority
                src={logo}
                alt="FreshCart Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* حقل البحث داخل السايد بار */}
          <form action="/search" method="get" onSubmit={() => setIsOpen(false)} className="relative mt-2 mb-3">
            <input
              name="q"
              type="search"
              placeholder="Search products..."
              className="w-full pl-4 pr-12 py-2.5 rounded-xl border border-gray-200 bg-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] transition"
            />
              <button type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#16A34A] text-white flex items-center justify-center hover:bg-[#15803D] transition cursor-pointer"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
          </form>

          {/* خط فاصل */}
          <div className="border-t border-gray-100 my-3" />

          {/* روابط التنقل الرئيسية */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${isActive
                    ? 'bg-[#ECFDF5] text-[#16A34A] font-semibold'
                    : 'text-[#334155] hover:bg-gray-50 hover:text-[#16A34A]'
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* خط فاصل */}
          <div className="border-t border-gray-100 my-3" />

          {/* قسم المفضلة وعربة التسوق */}
          <div className="flex flex-col gap-1">
            {/* Wishlist */}
            <Link
              href="/washlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-2xl  hover:bg-green-50 transition text-gray-700 group"
            >
              {/* الجزء الأيسر: الأيقونة والاسم */}
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform">
                  <Heart className="h-5 w-5 stroke-2" />
                </div>
                <span className="font-medium text-base text-gray-800">Wishlist</span>
              </div>

              {/* الجزء الأيمن: البادج الأحمر الذي يحتوي على الرقم */}
              <span className="bg-[#EF4444] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                1
              </span>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-2xl  hover:bg-green-50 transition text-gray-700 group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-[#16A34A] group-hover:scale-105 transition-transform">
                  <ShoppingCart className="h-5 w-5 stroke-2" />
                </div>
                <span className="font-medium text-base text-gray-800">Cart</span>
              </div>
              {numOfCartItems > 0 && <span className="bg-[#EF4444] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-sm">
                {numOfCartItems}
              </span>}

            </Link>
          </div>

          {/* خط فاصل */}
          <div className="border-t border-gray-100 my-3" />

          {session ? <div className="flex flex-col gap-2 my-2">

            {/* رابط البروفايل أو حساب المستخدم */}
            <Link
              href="/profile/addresses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50 transition text-gray-800 group"
            >
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                <User className="h-5 w-5 stroke-2" />
              </div>
              <span className="font-medium text-base ">{session.user.name}</span>
            </Link>



            {/* زر تسجيل الخروج */}
            <Link href={'/'}>
              <button
                onClick={() => {
                  logOut()
                  setIsOpen(false);
                }}
                className="flex items-center gap-3.5 px-3 py-2.5 rounded-xl hover:bg-red-50 transition text-red-600 group w-full text-left"
              >
                <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-105 transition-transform">
                  <LogOut className="h-5 w-5 stroke-2" />
                </div>
                <span className="font-medium text-base">Sign Out</span>
              </button></Link>
          </div> :
            <div className="grid grid-cols-2 gap-3 my-2">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center bg-[#16A34A] text-white py-3 px-4 rounded-xl font-semibold text-sm hover:bg-[#15803D] transition shadow-sm text-center"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center border-2 border-[#16A34A] text-[#16A34A] bg-white py-3 px-4 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition text-center"
              >
                Sign Up
              </Link>
            </div>}


        </div>





        {/* كارت المساعدة والدعم في أسفل السايد بار */}
        <div className="pt-4">
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3.5 bg-[#F8FAFC] border border-gray-100 rounded-2xl p-3.5 hover:bg-gray-100/70 transition cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#DCFCE7] flex items-center justify-center text-[#16A34A] shrink-0">
              <Headset className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 font-medium">Need Help?</span>
              <span className="text-sm font-bold text-[#16A34A]">Contact Support</span>
            </div>
          </Link>
        </div>
      </aside>


    </>
  );
}
