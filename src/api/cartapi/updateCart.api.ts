'use server'
import { getMyToken } from "@/utilities/getMyToken"


export const updateCart = async (productId : string , count : number)=> {

    const token = await getMyToken()
    if (!token) {
        throw new Error('something went wrong')
    }
    const response = await fetch(`${process.env.API}/cart/${productId}` , {
        method : 'PUT',
        headers : {
            token : token,
            'content-type' : 'application/json'
        },
        body : JSON.stringify({count : count})
    })
    const payLoad = await response.json()
    return payLoad
}