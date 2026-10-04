"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { FaLock } from "react-icons/fa6"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import PasswordInput from "@/app/_components/PasswordInput/PasswordInput"
import { passwordSchema, passwordSchemaType } from "@/schema/passwordSchema.schema"
import { updateLoggedUserPassword } from "@/api/updateLoggedUserPassword.api"
import { signOut } from "next-auth/react"

export default function PasswordForm() {


    const form = useForm<passwordSchemaType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        },
        resolver: zodResolver(passwordSchema),
    })

    const onSubmit = async (values: passwordSchemaType) => {
        try {
            const response = await updateLoggedUserPassword(values)
            if (response.message === 'success') {
                toast.success("Password changed successfully ", { position: "top-right", closeOnClick: true })
                form.reset()
                await signOut({ callbackUrl: '/login' })
            } else {
                toast.error(response?.message ?? "something went wrong", { position: "top-right", closeOnClick: true })
            }
        } catch {
            toast.error("something went wrong", { position: "top-right", closeOnClick: true })
        }
    }

    return (
        <Card className="overflow-hidden rounded-3xl border-gray-100 p-0 shadow-sm">
            <div className="p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100">
                        <FaLock className="text-2xl text-amber-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Update your account password</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="currentPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Enter your current password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Enter your new password" {...field} />
                                    </FormControl>
                                    <p>Must be at least 6 characters</p>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="rePassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm New Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Confirm your new password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="gap-2 bg-amber-600 shadow-lg shadow-amber-600/25 hover:bg-amber-700"
                            >
                                <FaLock />
                                {form.formState.isSubmitting ? "Changing..." : "Change Password"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Card>
    )
}