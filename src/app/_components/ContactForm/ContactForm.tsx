
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaHeadset, FaPaperPlane } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { FaCheck, FaQuestionCircle } from "react-icons/fa";
import { ContactFormType, contactSchema } from "@/schema/contactShema.shema";
import { useState } from "react";



export default function ContactForm() {

    const [sent, setSent] = useState(false)

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            subject: "",
            message: "",
        },
        resolver: zodResolver(contactSchema),
    });

    function handleSendInfo(values: ContactFormType) {
        form.reset()
        setSent(true)
        setTimeout(() => setSent(false), 3000)
    }

    return (
        <>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:p-8">
                {/* Header */}
                <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                        <FaHeadset className="text-lg text-green-600" />
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Send us a Message
                        </h2>
                        <p className="text-sm text-gray-500">
                            Fill out the form and we'll get back to you
                        </p>
                    </div>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSendInfo)}
                        className="space-y-5"
                    >
                        {sent && (
                            <div
                                role="status"
                                className="mb-6 flex items-center gap-3 rounded-xl border border-green-100 bg-green-50 p-4"
                            >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                                    <FaCheck className="text-sm text-green-600" />
                                </div>

                                <div>
                                    <p className="font-medium text-green-800">Message sent successfully!</p>
                                    <p className="text-sm text-green-600">We&apos;ll get back to you as soon as possible.</p>
                                </div>
                            </div>
                        )}
                        {/* Name & Email */}

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John Doe"
                                                className="h-12 rounded-xl border-gray-200 focus-visible:ring-green-500"
                                                {...field}
                                            />
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
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                className="h-12 rounded-xl border-gray-200 focus-visible:ring-green-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Subject */}
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="h-12 w-full rounded-xl border-gray-200 focus:ring-green-500">
                                                <SelectValue placeholder="Select a subject" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <SelectContent>
                                            <SelectItem value="general">
                                                General Inquiry
                                            </SelectItem>
                                            <SelectItem value="order">
                                                Order Support
                                            </SelectItem>
                                            <SelectItem value="shipping">
                                                Shipping Question
                                            </SelectItem>
                                            <SelectItem value="returns">
                                                Returns & Refunds
                                            </SelectItem>
                                            <SelectItem value="product">
                                                Product Information
                                            </SelectItem>
                                            <SelectItem value="feedback">
                                                Feedback & Suggestions
                                            </SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Message */}
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="How can we help you?"
                                            rows={5}
                                            className="resize-none rounded-xl border-gray-200 focus-visible:ring-green-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={form.formState.isSubmitting}
                            className="h-auto w-full gap-2 rounded-xl bg-green-600 px-8 py-3.5 font-semibold text-white shadow-sm shadow-green-600/20 transition-colors hover:bg-green-700 md:w-auto"
                        >
                            <FaPaperPlane />
                            Send Message
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-6">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <FaQuestionCircle className="text-xl text-green-600" /> </div>
                    <div>
                        <h3 className="mb-1 font-semibold text-gray-900"> Looking for quick answers? </h3>
                        <p className="mb-3 text-sm text-gray-600"> Check out our Help Center for frequently asked questions about orders, shipping, returns, and more. </p>
                        <Link href="/help" className="inline-flex items-center gap-1 text-sm font-medium text-green-600 hover:underline" > Visit Help Center → </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

