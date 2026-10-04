

export const getSpecificBrand = async (brandId : string)=> {
    const response = await fetch(`${process.env.API}/brands/${brandId}`)
    const payLoad = await response.json()

    return payLoad
}