"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { MdLocalShipping, MdSecurity } from "react-icons/md";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { FiEye, FiEyeOff, FiHeadphones } from "react-icons/fi";
import { FaStar, FaShoppingCart } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { loginSchema, loginSchemaType } from "@/schema/loginSchema.schema";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImSpinner3 } from "react-icons/im";
import Image from "next/image";
import loginImage from '../../../public/assets/loginimg.png'
import { signIn } from 'next-auth/react'


export default function Login() {

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: 'all'
  });

  async function handleLogin(values: loginSchemaType) {
    setIsLoading(true)

    try {
      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: '/'
      })
      if (response?.ok) {
        toast.success('Login successfully 👍', { position: "top-right", delay: 2000, autoClose: 1500 })
        form.reset()
        router.push('/')
      } else {
        toast.error(response?.error || 'something wrong', { position: "top-right", delay: 2000, autoClose: 1500 })
        router.push('/login')
      }


    } catch (error) {
      toast.error('something wrong', { position: "top-right", delay: 2000, autoClose: 1500 })

    } finally {
      setIsLoading(false)

    }

  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center items-center py-6 px-4 ">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side: Illustration & Features */}
        <div className="hidden  lg:flex flex-col gap-8 text-center">

          {/* Illustration */}
          <div className="relative w-full  aspect-16/10 bg-white rounded-3xl overflow-hidden shadow-md">
            <Image
              src={loginImage}
              alt="FreshCart Shopping"
              sizes="(max-width: 1024px) 100vw, 50vw"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight mb-3">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>
            <p className="text-gray-500 leading-relaxed text-lg">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs
            </p>
          </div>

          {/* Feature Badges */}
          <div className="flex items-center justify-center  gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <MdLocalShipping className="text-green-600" size={18} />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MdSecurity className="text-green-600" size={18} />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiHeadphones className="text-green-600" size={18} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-200/50">

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-3">
              <span className="text-green-600">Fresh</span>
              <span className="text-gray-900">Cart</span>
            </h2>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back!</h3>
            <p className=" text-gray-500">Sign in to continue your fresh shopping experience</p>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3 mb-6">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl font-medium  text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaGoogle className="text-red-500" />
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl font-medium  text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FaFacebook className="text-blue-600" />
              <span>Continue with Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <span className="relative bg-white px-4 text-sm font-medium text-gray-400 uppercase tracking-wide">
              or continue with email
            </span>
          </div>

          {/* Form Setup */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-5">

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className=" font-semibold text-gray-700">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <HiOutlineMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          {...field}
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="email"
                          className="rounded-xl h-11 pl-10 bg-gray-50/50 border-gray-200"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel htmlFor="password" className="font-semibold text-gray-700">
                        Password
                      </FormLabel>
                      <Link href="/forget-password" className="text-sm text-green-600 font-medium hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <HiOutlineLockClosed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                          {...field}
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="current-password"
                          className="rounded-xl h-11 pl-10 pr-10 bg-gray-50/50 border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                  </FormItem>
                )}
              />

              {/* Keep me signed in */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="rememberMe"
                  className="rounded-md border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
                <label htmlFor="rememberMe" className="text-ةي text-gray-600 cursor-pointer">
                  Keep me signed in
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-lg bg-green-600 hover:bg-green-700 text-white font-bold h-13 rounded-xl shadow-lg shadow-green-600/20 transition-all cursor-pointer"
              >
                {isLoading ? <ImSpinner3 className="animate-spin" /> : "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Footer Link */}
          <div className="text-center font-medium mt-6 text-gray-600">
            New to FreshCart?{" "}
            <Link href="/register" className="text-green-600 font-semibold hover:underline">
              Create an account
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-5 mt-5 pt-5 border-t border-gray-100 text-sm text-gray-400">
            <span>🔒 SSL Secured</span>
            <span>👥 50K+ Users</span>
            <span className="flex items-center gap-1">
              <FaStar className="text-amber-400" size={11} /> 4.9 Rating
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}