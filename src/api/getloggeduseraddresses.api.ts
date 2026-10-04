
import { getMyToken } from "@/utilities/getMyToken"

export const getLoggedUserAddresses = async () => {
    const token = await getMyToken()
    if (!token) {
        return null
    }

    const response = await fetch(`${process.env.API}/addresses`, {
        method: 'GET',
        headers: {
            token: token,
        }
    })

    const payLoad = await response.json()
    return payLoad
}