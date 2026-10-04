

export const getAllProducts = async() => {

    const response = await fetch(`${process.env.API}/products?limit=100`); 
    const data = await response.json();
    return data;
  
}; 