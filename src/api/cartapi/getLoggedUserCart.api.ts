'use server'
import { getMyToken } from "@/utilities/getMyToken"


export const getLoggedUserCart = async ()=> {

    const token = await getMyToken()
    if (!token) {
        return null
    }
    const response = await fetch(`${process.env.API}/cart` , {
        method : 'GET',
        headers : {
            token : token
        },
        cache : 'no-store'
    })
    const payLoad = await response.json()
    return payLoad
}