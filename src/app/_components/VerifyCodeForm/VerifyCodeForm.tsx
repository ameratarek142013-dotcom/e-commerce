"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaShieldHalved, FaArrowLeft } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyCodeSchema, verifyCodeSchemaType } from "@/schema/verifyCodeSchema.schema";



export default function VerifyCodeForm({ email, handleVerifyCode, handleResendCode, onBack, isLoading, }:
    {
        email: string,
        handleVerifyCode: (values: verifyCodeSchemaType) => Promise<void>,
        handleResendCode: () => Promise<void>,
        onBack: () => void,
        isLoading: boolean

    }
) {
    const form = useForm({
        defaultValues: { resetCode: "" },
        resolver: zodResolver(verifyCodeSchema),
    });

    return (
        <div className="text-center">
            <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-600">
                    Fresh<span className="text-gray-800">Cart</span>
                </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Check Your Email
            </h1>
            <p className="text-gray-600 mb-8">
                Enter the 6-digit code sent to{" "}
                <span className="font-medium text-gray-800">{email}</span>
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleVerifyCode)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-left text-sm font-semibold text-gray-700">
                                    Verification Code
                                </FormLabel>
                                <FormControl>
                                    <div className="relative flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition-all">
                                        <FaShieldHalved className="text-gray-300 mr-4 shrink-0 text-xl" />
                                        <InputOTP
                                            maxLength={6}
                                            value={field.value}
                                            onChange={field.onChange}
                                            containerClassName="justify-center flex-1"
                                        >
                                            <InputOTPGroup className="gap-2 mx-auto">
                                                {Array.from({ length: 6 }).map((_, i) => (
                                                    <InputOTPSlot
                                                        key={i}
                                                        index={i}
                                                        className="w-9 h-9 rounded-full border border-gray-200 bg-gray-50 text-lg flex items-center justify-center data-[active=true]:border-green-500 data-[active=true]:ring-2 data-[active=true]:ring-green-100"
                                                    />
                                                ))}
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-left" />
                            </FormItem>
                        )}
                    />

                    <p className="text-sm text-gray-500">
                        Didn't receive the code?{" "}
                        <button
                            type="button"
                            onClick={handleResendCode}
                            className="text-green-600 font-semibold hover:text-green-700 transition-colors"
                        >
                            Resend Code
                        </button>
                    </p>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-6 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin" /> Verifying...
                            </>
                        ) : (
                            "Verify Code"
                        )}
                    </Button>

                    <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                    >
                        <FaArrowLeft className="text-xs" />
                        Change email address
                    </button>
                </form>
            </Form>
        </div>
    );
}