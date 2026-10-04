'use server'
import { getMyToken } from "@/utilities/getMyToken"


export const removeProductFromCart = async (productId : string)=> {

    const token = await getMyToken()
    if (!token) {
        throw new Error('something went wrong')
    }
    const response = await fetch(`${process.env.API}/cart/${productId}` , {
        method : 'DELETE',
        headers : {
            token : token
        }
    })
    const payLoad = await response.json()
    return payLoad
}