"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";

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
import { resetPasswordSchema, resetPasswordSchemaType } from "@/schema/resetPasswordSchema.shema";



export default function ResetPasswordForm({ handleResetPassword, isLoading }: { handleResetPassword: (values: resetPasswordSchemaType) => Promise<void> | void, isLoading: boolean }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const form = useForm({
        defaultValues: {
            newPassword: "",
            confirmPassword: ""
        },
        resolver: zodResolver(resetPasswordSchema),
    });

    return (
        <div className="text-center">
            <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-600">
                    Fresh<span className="text-gray-800">Cart</span>
                </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Create New Password
            </h1>
            <p className="text-gray-600 mb-8">
                Your new password must be different from previous passwords
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-6">
                    {/* New password */}
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-left text-sm font-semibold text-gray-700">
                                    New Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter new password"
                                            className="pl-12 pr-12 py-6 border-2 rounded-xl border-gray-200 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((v) => !v)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-left" />
                            </FormItem>
                        )}
                    />

                    {/* Confirm password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="block text-left text-sm font-semibold text-gray-700">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                        <Input
                                            type={showConfirm ? "text" : "password"}
                                            placeholder="Confirm new password"
                                            className="pl-12 pr-12 py-6 border-2 rounded-xl border-gray-200 focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-green-100"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm((v) => !v)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirm ? (
                                                <FaEyeSlash size={18} />
                                            ) : (
                                                <FaEye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage className="text-left" />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-6 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <FaSpinner className="animate-spin" /> Resetting...
                            </>
                        ) : (
                            "Reset Password"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}