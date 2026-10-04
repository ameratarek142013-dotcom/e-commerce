'use server'
import { getMyToken } from "@/utilities/getMyToken"


export const addToWishlist = async (productId : string)=> {

    const token = await getMyToken()
    if (!token) {
        return null
    }

    const response = await fetch(`${process.env.API}/wishlist`,{
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