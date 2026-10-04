"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addressSchema, addressSchemaType } from "@/schema/addressSchema.schema";
import { addAddress } from "@/api/addAddress.api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AddressType } from "@/types/address.type";
import { removeAddress } from "@/api/removeAddress.api";



export default function AddAddressModal({ isOpen, setIsOpen, address }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>, address?: AddressType | null }) {

    const router = useRouter()
    const isEdit = !!address


    const form = useForm({
        defaultValues: {
            name: "",
            details: "",
            phone: "",
            city: ""
        },
        resolver: zodResolver(addressSchema),
    });

    useEffect(() => {
        if (isOpen) {
            form.reset(
                address
                    ? { name: address.name, details: address.details, phone: address.phone, city: address.city }
                    : { name: "", details: "", phone: "", city: "" }
            )
        }
    }, [isOpen, address, form])

    const handleAddAddress = async (values: addressSchemaType) => {
        try {
            const response = await addAddress(values)

            if (response?.status === 'success') {
                if (isEdit) await removeAddress(address!._id)

                toast.success(isEdit ? 'Address updated successfully' : 'Address added successfully', { position: 'top-right', closeOnClick: true })
                form.reset()
                setIsOpen(false)
                router.refresh()
            } else {
                toast.error(response?.message ?? 'Please login first', { position: 'top-right', closeOnClick: true })
            }
        } catch (error) {
            toast.error('something went wrong', { position: 'top-right', closeOnClick: true })
        }
    };

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (!open) form.reset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg rounded-3xl p-6 sm:p-8">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">
                        {isEdit ? 'Edit Address' : 'Add New Address'}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit ? 'Update your delivery address.' : 'Add a delivery address to make checkout faster.'}
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleAddAddress)} className="space-y-5">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Home, Office" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="details"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={3}
                                            placeholder="Street, building, apartment..."
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Cairo" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <DialogFooter className="gap-3 pt-4 sm:gap-3">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => handleOpenChange(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="flex-1 bg-green-600 hover:bg-green-700"
                            >
                                {form.formState.isSubmitting
                                    ? (isEdit ? "Saving..." : "Adding...")
                                    : (isEdit ? "Update" : "Add Address")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}