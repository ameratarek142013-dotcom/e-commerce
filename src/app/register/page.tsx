"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FaGoogle, FaFacebook, FaStar, FaUserPlus } from "react-icons/fa";
import { MdLocalShipping, MdSecurity, MdVerifiedUser } from "react-icons/md";

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
import { registerSchema, registerSchemaType } from "@/schema/registerSchema.schema";
import { formFieldsType } from "@/types/formFieldsType";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ImSpinner3 } from "react-icons/im";


export default function Register() {

  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()


  const formFields: formFieldsType[] = [
    { name: 'name', type: 'text', placeholder: 'Ex: Amera', label: 'Name *', autoComplete: 'name' },
    { name: 'email', type: 'email', placeholder: 'Ex: amera@example.com', label: 'Email *', autoComplete: 'email' },
    { name: 'password', type: 'password', placeholder: 'Create a strong password', label: 'Password *', autoComplete: 'new-password' },
    { name: 'rePassword', type: 'password', placeholder: 'Confirm your password', label: 'Confirm Password *', autoComplete: 'new-password' },
    { name: 'phone', type: 'tel', placeholder: '+1 234 567 8900', label: 'Phone Number *', autoComplete: 'tel' },
  ]

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false
    },
    resolver: zodResolver(registerSchema),
    mode: 'all'
  });



  async function handleRegister(values: registerSchemaType) {
    setIsLoading(true)

    try {
      const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/signup`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'content-type': 'application/json'
        }
      })
      const data = await response.json()
      if (data.message === 'success') {
        toast.success(data.message || 'You are registered successfully 👍', { position: "top-right", delay: 2000, autoClose: 1500 })
        form.reset()
        router.push('/login')
      } else {
        toast.error(data.message || 'something wrong', { position: "top-right", delay: 2000, autoClose: 1500 })
      }
    } catch (error) {
      toast.error('something wrong', { position: "top-right", delay: 2000, autoClose: 1500 })
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="min-h-screen bg-gray-50/50 flex justify-center py-10 px-4 lg:px-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 ">

        {/* Left Side: Branding, Features & Testimonial */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h1>
            <p className="text-gray-600 text-xl leading-relaxed">
              Join thousands of happy customers who enjoy fresh groceries delivered right to their doorstep.
            </p>
          </div>

          {/* Features List */}
          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <MdVerifiedUser size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600 text-lg">Premium Quality</h3>
                <p className=" text-gray-500">Premium quality products sourced from trusted suppliers.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <MdLocalShipping size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600 text-lg">Fast Delivery</h3>
                <p className=" text-gray-500">Same-day delivery available in most areas</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
                <MdSecurity size={22} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-600 text-lg">Secure Shopping</h3>
                <p className=" text-gray-500">Your data and payments are completely secure</p>
              </div>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
                SJ
              </div>
              <div>
                <h4 className="font-semibold text-gray-600 ">Sarah Johnson</h4>
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={18} />
                  ))}
                </div>
              </div>
            </div>
            <p className=" text-gray-600 italic leading-relaxed">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding, and the delivery is always on time. Highly recommend!"
            </p>
          </div>
        </div>

        {/* Right Side: Shadcn Form Card */}
        <div className="lg:col-span-6 bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-200/50">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-1">Create Your Account</h2>
            <p className=" text-gray-500">Start your fresh journey with us today</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl  font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              <FaGoogle className="text-red-500" />
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-200 rounded-xl  font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
              <FaFacebook className="text-blue-600" />
              <span>Facebook</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
            <span className="relative bg-white px-4 text-xs text-gray-400 uppercase">or</span>
          </div>

          {/* Form Setup */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-7">

              {/* Loop عبر مصفوفة الحقول */}
              {formFields.map((fieldInput) => (
                <FormField
                  key={fieldInput.name}
                  control={form.control}
                  name={fieldInput.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor={fieldInput.name} className="font-semibold text-gray-700">
                        {fieldInput.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id={fieldInput.name}
                          {...field}
                          type={fieldInput.type}
                          placeholder={fieldInput.placeholder}
                          autoComplete={fieldInput.autoComplete}
                          className="rounded-xl h-11  bg-gray-50/50 border-gray-200"
                        />
                      </FormControl>
                      <FormMessage className="text-sm" />
                    </FormItem>
                  )}
                />
              ))}

              {/* شروط الاستخدام (Terms Checkbox) */}
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                    <FormControl>
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="rounded-md border-gray-300 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="terms" className=" text-gray-600 font-normal">
                        I agree to the <span className="text-green-600 font-semibold cursor-pointer">Terms of Service</span> and <span className="text-green-600 font-semibold cursor-pointer">Privacy Policy</span> *
                      </FormLabel>
                      <FormMessage className="text-sm" />
                    </div>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-green-600/20 transition-all cursor-pointer"
              >
                {isLoading ? <ImSpinner3 className='animate-spin' /> : <><FaUserPlus className="mr-2" size={16} />
                  Create My Account</>}

              </Button>
            </form>
          </Form>

          {/* Footer Link */}
          <div className="text-center mt-6 font-medium  text-gray-600 border-t py-5">
            Already have an account?{" "}
            <Link href="/login" className="text-green-600 font-semibold hover:underline">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}