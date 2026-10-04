'use client'

import AddAddressModal from "@/app/_components/AddressesModal/AddressesModal";
import { AddressType } from "@/types/address.type";
import { removeAddress } from "@/api/removeAddress.api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaCity, FaPen, FaPhone, FaPlus, FaTrash } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function AddressesInfo({ data }: { data: AddressType[] }) {

    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null)

    const openAdd = () => {
        setSelectedAddress(null)
        setIsOpen(true)
    }

    const openEdit = (address: AddressType) => {
        setSelectedAddress(address)
        setIsOpen(true)
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await removeAddress(id)
            if (response?.status === 'success') {
                toast.success('Address deleted', { position: 'top-right', closeOnClick: true })
                router.refresh()
            } else {
                toast.error(response?.message ?? 'Failed to delete', { position: 'top-right', closeOnClick: true })
            }
        } catch {
            toast.error('something went wrong', { position: 'top-right', closeOnClick: true })
        }
    }

    return (
        <>
            <div className="min-w-0 flex-1">
                <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage your saved delivery addresses
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openAdd}
                        className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-700"
                    >
                        <FaPlus className="text-sm" />
                        <span className="hidden sm:inline">Add Address</span>
                    </button>
                </div>

                {data?.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {data.map((address) => (
                            <div
                                key={address._id}
                                className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:border-green-100 hover:shadow-md"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex min-w-0 flex-1 items-start gap-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600 transition-colors group-hover:bg-green-100">
                                            <FaLocationDot className="text-lg" />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="mb-1 font-bold text-gray-900">{address.name}</h3>
                                            <p className="mb-3 line-clamp-2 text-sm text-gray-600">{address.details}</p>

                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                                <span className="flex items-center gap-1.5">
                                                    <FaPhone className="text-xs" />
                                                    {address.phone}
                                                </span>
                                                <span className="flex items-center gap-1.5">
                                                    <FaCity className="text-xs" />
                                                    {address.city}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            title="Edit address"
                                            aria-label="Edit address"
                                            onClick={() => openEdit(address)}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-green-100 hover:text-green-600"
                                        >
                                            <FaPen className="text-sm" />
                                        </button>

                                        <button
                                            type="button"
                                            title="Delete address"
                                            aria-label="Delete address"

                                            onClick={() => handleDelete(address._id)}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition-colors hover:bg-red-100 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            <FaTrash className="text-sm" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-gray-100 bg-white p-8 text-center sm:p-12">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                            <FaLocationDot className="text-3xl text-gray-400" />
                        </div>

                        <h3 className="mb-2 text-lg font-bold text-gray-900">No Addresses Yet</h3>

                        <p className="mx-auto mb-6 max-w-sm text-gray-500">
                            Add your first delivery address to make checkout faster and easier.
                        </p>

                        <button
                            type="button"
                            onClick={openAdd}
                            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-lg shadow-green-600/25 transition-colors hover:bg-green-700"
                        >
                            <FaPlus />
                            Add Your First Address
                        </button>
                    </div>
                )}
            </div>

            <AddAddressModal isOpen={isOpen} setIsOpen={setIsOpen} address={selectedAddress} />
        </>
    )
}