

export const getUserOrders = async (userId : string)=> {
    const response = await fetch(`${process.env.API}/orders/user/${userId}`)
    const payLoad = await response.json()
    

    return payLoad
}