'use server'

import { profileSchemaType } from "@/schema/profileShema.shema"
import { getMyToken } from "@/utilities/getMyToken"

export const updateLoggedUserData = async (values : profileSchemaType)=>{
    const token = await getMyToken()
    if (!token) {
        return null
    }
    const response = await fetch(`${process.env.API}/users/updateMe/`,{
        method : 'PUT',
        headers : {
            token,
            'content-type' : 'application/json'
        },
        body : JSON.stringify(values)
    })
    const payLoad = await response.json()
    return payLoad
}