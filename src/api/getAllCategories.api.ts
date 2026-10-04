

export const getAllCategories = async () => {

    const response = await fetch(`${process.env.API}/categories`);
    const payLoad = await response.json();
    return payLoad;

}; 