

export const getSpecificSubategory = async (subcategoryId: string) => {
    const response = await fetch(`${process.env.API}/subcategories/${subcategoryId}`);
    const payLoad = await response.json();
    return payLoad;
 
}; 