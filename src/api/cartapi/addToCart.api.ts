'use server'
import { getMyToken } from "@/utilities/getMyToken"


export const addToCart = async (productId : string)=> {

    const token = await getMyToken()
    if (!token) {
        throw new Error('login first')
    }

    const response = await fetch(`${process.env.API}/cart`,{
        method : 'POST',
        headers : {
            token : token,
            'content-type' : 'application/json'
        },
        body : JSON.stringify({productId : productId})

    })
    const payLoad = await response.json()

    return payLoad
}