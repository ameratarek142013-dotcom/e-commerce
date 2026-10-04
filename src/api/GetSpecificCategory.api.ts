

export const getSpecificCategory = async (categoryId: string) => {
    const response = await fetch(`${process.env.API}/categories/${categoryId}`);
    const payLoad = await response.json();
    return payLoad;
 
}; 