

export const getAllSubcategoriesOnCategory = async (categoryId: string) => {
    const response = await fetch(`${process.env.API}/categories/${categoryId}/subcategories`);
    const payLoad = await response.json();
    return payLoad;
  
}; 