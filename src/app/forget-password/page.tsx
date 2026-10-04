"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    FaLock,
    FaEnvelope,
    FaShieldHalved,
    FaKey,
    FaArrowLeft,
} from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { forgotPasswortSchema, forgotPasswortSchemaType } from "@/schema/forgotPasswordSchema.schema";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { verifyCodeSchemaType } from "@/schema/verifyCodeSchema.schema";
import VerifyCodeForm from "@/app/_components/VerifyCodeForm/VerifyCodeForm";
import { useRouter } from "next/navigation";
import { resetPasswordSchemaType } from "@/schema/resetPasswordSchema.shema";
import ResetPasswordForm from "@/app/_components/ResetPasswordForm/ResetPasswordForm";

const steps = [
    { id: "email", label: "Email", icon: FaEnvelope },
    { id: "code", label: "Code", icon: FaKey },
    { id: "reset", label: "Reset", icon: FaLock },
];


export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState(false)
    const [submittedEmail, setSubmittedEmail] = useState("");
    const [currentStep, setCurrentStep] = useState(0);

    const router = useRouter()

    const form = useForm({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(forgotPasswortSchema)
    });

    const handleForgetPassword = async (values: forgotPasswortSchemaType) => {
        try {
            setIsLoading(true)
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })
            const payLoad = await response.json()
            if (payLoad.statusMsg === 'success') {
                toast.success(payLoad.message, { position: 'top-right', closeOnClick: true })
                setSubmittedEmail(values.email)
                setCurrentStep(1)
            } else {
                toast.error(payLoad.message, { position: 'top-right', closeOnClick: true })
            }

        } catch (error) {
            toast.error('something went wrong', { position: 'top-right', closeOnClick: true })
        } finally {
            setIsLoading(false)
        }


    };


    const handleVerifyCode = async (values: verifyCodeSchemaType) => {
        try {
            setIsLoading(true)
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(values)
            })
            const payLoad = await response.json()
            if (payLoad.status === 'Success') {
                toast.success('Code verified!', { position: 'top-right', closeOnClick: true })
                setCurrentStep(2) // الانتقال لخطوة كلمة السر الجديدة
            } else {
                toast.error(payLoad.message || 'Invalid code', { position: 'top-right', closeOnClick: true })
            }
        } catch (error) {
            toast.error('something went wrong', { position: 'top-right', closeOnClick: true })
        } finally {
            setIsLoading(false)
        }
    };


    const handleResetPassword = async (values: resetPasswordSchemaType) => {
        try {
            setIsLoading(true)
            const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    email: submittedEmail,
                    newPassword: values.newPassword
                })
            })
            const payLoad = await response.json()
            if (payLoad.token) {
                toast.success('Password reset successfully!', { position: 'top-right', closeOnClick: true })
                router.push('/login')
            } else {
                toast.error(payLoad.message || 'Something went wrong', { position: 'top-right', closeOnClick: true })
            }
        } catch (error) {
            toast.error('something went wrong', { position: 'top-right', closeOnClick: true })
        } finally {
            setIsLoading(false)
        }
    };

    const handleResendCode = async () => {
        await handleForgetPassword({ email: submittedEmail })
    };

    return (
        <div className="container py-16 mx-auto px-4" id="forgot-password-section">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
                {/* Left: illustration */}
                <div className="hidden lg:block">
                    <div className="text-center space-y-6">
                        <div className="w-full h-96 bg-linear-to-br from-green-50 via-green-50 to-emerald-50 rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
                            <div className="absolute top-8 left-8 w-24 h-24 rounded-full bg-green-100/50" />
                            <div className="absolute bottom-12 right-10 w-32 h-32 rounded-full bg-green-100/50" />
                            <div className="absolute top-20 right-20 w-16 h-16 rounded-full bg-emerald-100/50" />

                            <div className="relative flex flex-col items-center gap-6 z-10">
                                <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-300">
                                    <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                                        <FaLock className="text-green-600 text-4xl" />
                                    </div>
                                </div>

                                <div className="absolute -left-16 top-4 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
                                    <FaEnvelope className="text-green-500 text-xl" />
                                </div>

                                <div className="absolute -right-16 top-8 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
                                    <FaShieldHalved className="text-green-500 text-xl" />
                                </div>

                                <div className="flex gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse [animation-delay:150ms]" />
                                    <div className="w-3 h-3 rounded-full bg-green-600 animate-pulse [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-800">
                                Reset Your Password
                            </h2>
                            <p className="text-lg text-gray-600">
                                Don't worry, it happens to the best of us. We'll help you get
                                back into your account in no time.
                            </p>

                            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <FaEnvelope className="text-green-600 mr-2" />
                                    Email Verification
                                </div>
                                <div className="flex items-center">
                                    <FaShieldHalved className="text-green-600 mr-2" />
                                    Secure Reset
                                </div>
                                <div className="flex items-center">
                                    <FaLock className="text-green-600 mr-2" />
                                    Encrypted
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: form */}
                <div className="w-full">
                    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
                        <div className="text-center mb-8">
                            <div className="flex items-center justify-center mb-4">
                                <span className="text-3xl font-bold text-green-600">
                                    Fresh<span className="text-gray-800">Cart</span>
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                                Forgot Password?
                            </h1>
                            <p className="text-gray-600">
                                No worries, we'll send you a reset code
                            </p>
                        </div>

                        {/* Step indicator */}
                        <div className="flex items-center justify-center mb-8">
                            {steps.map((step, i) => {
                                const StepIcon = step.icon;
                                const isCompleted = i < currentStep;
                                const isActive = i === currentStep;
                                const isLast = i === steps.length - 1;

                                return (
                                    <div key={step.id} className="flex items-center">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isCompleted || isActive
                                                ? "bg-green-600 text-white"
                                                : "bg-gray-100 text-gray-400"
                                                } ${isActive ? "ring-4 ring-green-100" : ""}`}
                                        >
                                            {isCompleted ? (
                                                <FaCheck className="text-xs" />
                                            ) : (
                                                <StepIcon className="text-xs" />
                                            )}
                                        </div>
                                        {!isLast && (
                                            <div
                                                className={`w-16 h-0.5 mx-2 transition-all duration-300 ${isCompleted ? "bg-green-500" : "bg-gray-200"
                                                    }`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {currentStep === 0 && <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleForgetPassword)}
                                className="space-y-6"
                            >
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-sm font-semibold text-gray-700">
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <div className="relative">
                                                    <Input
                                                        type="email"
                                                        placeholder="Enter your email address"
                                                        className="pl-12 py-6 border-2 rounded-xl border-gray-200 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
                                                        {...field}
                                                    />
                                                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-green-600 text-white py-6 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading
                                        ? <><FaSpinner className="animate-spin" /> Sending code...</>
                                        : "Send Reset Code"}
                                </Button>

                                <div className="text-center">
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-medium transition-colors"
                                    >
                                        <FaArrowLeft className="text-xs" />
                                        Back to Sign In
                                    </Link>
                                </div>
                            </form>
                        </Form>}

                        {currentStep === 1 && <VerifyCodeForm
                            email={submittedEmail}
                            handleVerifyCode={handleVerifyCode}
                            handleResendCode={handleResendCode}
                            onBack={() => setCurrentStep(0)}
                            isLoading={isLoading} />}

                        {currentStep === 2 && (
                            <ResetPasswordForm
                                handleResetPassword={handleResetPassword}
                                isLoading={isLoading}
                            />
                        )}



                        <div className="text-center mt-8 pt-6 border-t border-gray-100">
                            <p className="text-gray-600">
                                Remember your password?{" "}
                                <Link
                                    href="/login"
                                    className="text-green-600 hover:text-green-700 font-semibold transition-colors"
                                >
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}