'use server'
import { addressSchemaType } from "@/schema/addressSchema.schema"
import { getMyToken } from "@/utilities/getMyToken"

export const addAddress = async (values: addressSchemaType) => {
    const token = await getMyToken()
    if (!token) {
        return null
    }

    const response = await fetch(`${process.env.API}/addresses`, {
        method: 'POST',
        headers: {
            token: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })

    const payLoad = await response.json()
    return payLoad
}