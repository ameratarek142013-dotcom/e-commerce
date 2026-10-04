'use server'
import { getMyToken } from "@/utilities/getMyToken"


export const clearUserCart = async ()=> {

    const token = await getMyToken()
    if (!token) {
        throw new Error('something went wrong')
    }
    const response = await fetch(`${process.env.API}/cart` , {
        method : 'DELETE',
        headers : {
            token : token
        }
    })
    const payLoad = await response.json()
    return payLoad
}