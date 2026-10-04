import { getAllProducts } from '@/api/getAllProducts'
import { getSpecificSubategory } from '@/api/GetSpecificSubCategory.api';
import { getLoggedUserWishlist } from '@/api/wishlistapi/getLoggedUserWishlist.api';
import PageHeader from '@/app/_components/PageHeader/PageHeader';
import ProductCard from '@/app/_components/ProductCard/ProductCard';
import { ProductType } from '@/types/product.types';
import { FaBoxOpen, FaFilter, FaFolderOpen, FaTags } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import Link from 'next/link';
import { getSpecificCategory } from '@/api/GetSpecificCategory.api';
import { getSpecificBrand } from '@/api/getSpecificBrand.api';

export default async function Products({ isHome, searchParams }: { isHome: boolean, searchParams: Promise<{ subcategory?: string, category?: string, brandid?: string }> }) {

  const { subcategory, category, brandid } = await searchParams
  const response = subcategory
    ? await getSpecificSubategory(subcategory)
    : null

  const categoryResponse = category
    ? await getSpecificCategory(category)
    : null

  const brandResponse = brandid
    ? await getSpecificBrand(brandid)
    : null




  const { data } = await getAllProducts()
  let filteredProducts: ProductType[] = data ?? []

  if (category) {
    filteredProducts = filteredProducts.filter((product: ProductType) =>
      product.category._id === category
    )
  }

  if (subcategory) {
    filteredProducts = filteredProducts.filter((product: ProductType) =>
      product.subcategory?.some((sub) => sub._id === subcategory)
    )
  }

  if (brandid) {
    filteredProducts = filteredProducts.filter((product: ProductType) =>
      product.brand._id === brandid
    )
  }


  let wishlistIds: string[] = []
  try {
    const wishlistResponse = await getLoggedUserWishlist()
    wishlistIds = wishlistResponse.data.map((item: ProductType) => item.id)
  } catch (error) {
    wishlistIds = []
  }

  return (
    <>
      {!isHome && <PageHeader subcategory={response?.data} brand={brandResponse?.data} />}

      <div className='w-[95%] m-auto'>
        {!isHome ? <>
          {(response || categoryResponse || brandResponse) && <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <FaFilter />
              Active Filters:
            </span>

            <Link
              href="/products"
              className={`inline-flex items-center gap-2 rounded-full  ${brandResponse ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'} px-3 py-1.5 text-sm font-medium   transition-colors `}
            >
              {brandResponse ? <FaTags className="text-xs" /> : <FaFolderOpen className="text-xs" />}


              {(response || categoryResponse || brandResponse).data.name}

              <FaXmark className="text-xs" />
            </Link>

            <Link
              href="/products"
              className="text-sm text-gray-500 underline hover:text-gray-700"
            >
              Clear all
            </Link>
          </div>}
          <span className='text-sm font-medium text-gray-600'>showing {filteredProducts.length} products</span>
        </> : (
          <div className='text-3xl font-bold border-l-8 border-emerald-600 ps-3 rounded-md my-8'>
            Featured <span className='text-emerald-600'>Products</span>
          </div>
        )}

        <div className='grid  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-6'>
          {filteredProducts.length === 0 ? <>
            <div className="col-span-full py-20 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                <FaBoxOpen className="text-3xl text-gray-400" />
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">
                No Products Found
              </h3>

              <p className="mb-6 text-gray-500">
                No products match your current filters.
              </p>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-700"
              >
                View All Products
              </Link>
            </div> </> : filteredProducts.map((product: ProductType) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishListed={wishlistIds.includes(product.id)}
              />
            ))}
        </div>
      </div>
    </>
  )
}