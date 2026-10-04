'use server'
import { getMyToken } from "@/utilities/getMyToken"


export const getLoggedUserWishlist = async ()=> {

    const token = await getMyToken()
    if (!token) {
        return null
    }
    const response = await fetch(`${process.env.API}/wishlist` , {
        method : 'GET',
        headers : {
            token : token
        },
        cache : 'no-store'
    })
    const payLoad = await response.json()
    return payLoad
}