

export const getAllBrands = async ()=> {
    const response = await fetch(`${process.env.API}/brands`)
    const payLoad = await response.json()

    return payLoad
}