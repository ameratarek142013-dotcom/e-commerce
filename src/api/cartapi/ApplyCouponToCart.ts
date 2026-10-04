'use server'

import { getMyToken } from "@/utilities/getMyToken"

export const applyCouponToCart = async (couponValue: string)=>{
    const token = await getMyToken()
    if (!token) {
        return null
    }
    const response = await fetch(`${process.env.API}/cart/applyCoupon` , {
        method : 'PUT',
        headers : {
            token,
            'content-type' : 'application/json'

        },
        body : JSON.stringify({couponName : couponValue })
    })
    const payLoad = await response.json()

    return payLoad
}
