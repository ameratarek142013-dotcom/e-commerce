'use server'

import { getMyToken } from "@/utilities/getMyToken"

export const removeAddress = async (id: string) => {
    const token = await getMyToken()
    if (!token) return null

    const response = await fetch(`${process.env.API}/addresses/${id}`, {
        method: 'DELETE',
        headers: { token },
    })

    const payLoad = await response.json()

    return payLoad
}