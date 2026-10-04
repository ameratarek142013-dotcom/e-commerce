"use client"

import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import { Input } from "@/components/ui/input"

export default function PasswordInput(props: React.ComponentProps<"input">) {
    const [show, setShow] = useState(false)

    return (
        <div className="relative">
            <Input {...props} type={show ? "text" : "password"} className="pr-12" />
            <button
                type="button"
                onClick={() => setShow((prev) => !prev)}
                aria-label={show ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
                {show ? <FaEyeSlash /> : <FaEye />}
            </button>
        </div>
    )
}