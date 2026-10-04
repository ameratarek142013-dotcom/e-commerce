'use server'
import { paymentSchemaType } from "@/schema/paymentSchema.shema"
import { getMyToken } from "@/utilities/getMyToken"
import { revalidatePath } from "next/cache"


export const creatCardOrder = async (cartId : string , values : paymentSchemaType )=> {

    const token = await getMyToken()
    if (!token) {
        return null
    }

    const response = await fetch(`${process.env.API}/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,{
        method : 'POST',
        headers : {
            token : token,
            'content-type' : 'application/json'
        },
        body : JSON.stringify({shippingAddress : values})

    })
    const payLoad = await response.json()

    if (payLoad.status === 'success') {
    revalidatePath('/', 'layout')  
  }

    return payLoad
}