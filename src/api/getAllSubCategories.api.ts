

export const getAllSubcategories = async () => {
  
    const response = await fetch(`${process.env.API}/subcategories`);
    const payLoad = await response.json();
    return payLoad;
  
}; 