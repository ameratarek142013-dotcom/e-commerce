import { getAllProducts } from '@/api/getAllProducts'
import { getProduct } from '@/api/getProduct'
import ProductDetails from '@/app/_components/ProductDetails/ProductDetails'
import { ProductType } from '@/types/product.types';
import React from 'react'
type Params = Promise<{ id: string }>;

export default async function ProductDetailsPage({params} : {params : Params}) {

    const {id} = await params

    const {data} = await getProduct(id)
    const {data : allProducts} = await getAllProducts()

    const relatedProducts = allProducts.filter((pro : ProductType)=> pro.category.name === data.category.name )


    
    
  return (
    <>
    <ProductDetails product={data} relatedProducts={relatedProducts}/>

    </>
  )
}
