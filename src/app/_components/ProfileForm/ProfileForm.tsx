"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { FaFloppyDisk, FaUser } from "react-icons/fa6"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { profileSchema, profileSchemaType } from "@/schema/profileShema.shema"
import { User } from "@/types/product.types"
import { updateLoggedUserData } from "@/api/updateLoggedUserData.api"

export default function ProfileForm({ user }: { user: User }) {



    const form = useForm<profileSchemaType>({
        defaultValues: {
            name: user.name ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
        },
        resolver: zodResolver(profileSchema),
    })

    const onSubmit = async (values: profileSchemaType) => {
        try {
            const response = await updateLoggedUserData(values)
            if (response?.message === 'success') {
                form.reset(values)
                toast.success("Profile updated", { position: "top-right", closeOnClick: true })
            } else {
                toast.error(response?.message ?? "Profile not updated", { position: "top-right", closeOnClick: true })
            }
        } catch {
            toast.error("something went wrong", { position: "top-right", closeOnClick: true })
        }
    }

    return (
        <Card className="overflow-hidden rounded-3xl border-gray-100 p-0 shadow-sm">
            <div className="border-b border-gray-100 p-6 sm:p-8">
                <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                        <FaUser className="text-2xl text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900">Profile Information</h3>
                        <p className="text-sm text-gray-500">Update your personal details</p>
                    </div>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="01xxxxxxxxx" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="gap-2 bg-green-600 shadow-lg shadow-green-600/25 hover:bg-green-700"
                            >
                                <FaFloppyDisk />
                                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="bg-gray-50 p-6 sm:p-8">
                <h3 className="mb-4 font-bold text-gray-900">Account Information</h3>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">User ID</span>
                        <span className="font-mono text-gray-700">{user.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">Role</span>
                        <Badge className="bg-green-100 capitalize text-green-700 hover:bg-green-100">
                            {user.role}
                        </Badge>
                    </div>
                </div>
            </div>
        </Card>
    )
}