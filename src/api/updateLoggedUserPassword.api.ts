'use server'

import { passwordSchemaType } from "@/schema/passwordSchema.schema"
import { getMyToken } from "@/utilities/getMyToken"

export const updateLoggedUserPassword = async (values : passwordSchemaType)=>{
    const token = await getMyToken()
    if (!token) {
        return null
    }
    const response = await fetch(`${process.env.API}/users/changeMyPassword`,{
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