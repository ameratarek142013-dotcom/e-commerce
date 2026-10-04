import { getAllProducts } from '@/api/getAllProducts'
import { getAllCategories } from '@/api/getAllCategories.api'
import { getAllBrands } from '@/api/getAllBrands.api'
import { getLoggedUserWishlist } from '@/api/wishlistapi/getLoggedUserWishlist.api'
import SearchFilters from '@/app/search/SearchFilters'
import SearchResults from '@/app/search/SearchResults'
import { ProductType, Brand } from '@/types/product.types'
import { CategoryType } from '@/types/categoryType.types'
import { Search } from 'lucide-react'

type SearchParams = Promise<{
  q?: string
  category?: string | string[]
  brand?: string | string[]
  minPrice?: string
  maxPrice?: string
}>

const asArray = (value?: string | string[]) => value ? (Array.isArray(value) ? value : [value]) : []

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams
  const query = params.q?.trim() ?? ''
  const selectedCategories = asArray(params.category)
  const selectedBrands = asArray(params.brand)
  const minPrice = params.minPrice ? Number(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : undefined

  const [productsResponse, categoriesResponse, brandsResponse, wishlistResponse] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllBrands(),
    getLoggedUserWishlist().catch(() => null),
  ])

  const categories: CategoryType[] = categoriesResponse?.data ?? []
  const brands: Brand[] = brandsResponse?.data ?? []
  const allProducts: ProductType[] = productsResponse?.data ?? []
  const products = allProducts.filter((product) => {
    const searchableText = `${product.title} ${product.description} ${product.brand?.name ?? ''} ${product.category?.name ?? ''}`.toLowerCase()
    const price = product.priceAfterDiscount || product.price
    return (!query || searchableText.includes(query.toLowerCase()))
      && (!selectedCategories.length || selectedCategories.includes(product.category?._id))
      && (!selectedBrands.length || selectedBrands.includes(product.brand?._id))
      && (minPrice === undefined || price >= minPrice)
      && (maxPrice === undefined || price <= maxPrice)
  })

  const wishlistIds: string[] = wishlistResponse?.data?.map((item: ProductType) => item.id) ?? []

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-5 flex items-center gap-2 text-sm text-gray-500"><a href="/" className="hover:text-green-600">Home</a><span>/</span><h1 className="font-medium text-gray-900">Search Results</h1></div>
        <form action="/search" method="get" className="relative w-full max-w-3xl">
          <input type="search" name="q" defaultValue={query} placeholder="Search for products..." className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-14 pr-5 text-lg outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100" />
          {selectedCategories.map((category) => <input key={category} type="hidden" name="category" value={category} />)}
          {selectedBrands.map((brand) => <input key={brand} type="hidden" name="brand" value={brand} />)}
          {params.minPrice && <input type="hidden" name="minPrice" value={params.minPrice} />}
          {params.maxPrice && <input type="hidden" name="maxPrice" value={params.maxPrice} />}
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
          <button type="submit" aria-label="Search products" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-700">Search</button>
        </form>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <SearchFilters
            query={query}
            selectedCategories={selectedCategories}
            selectedBrands={selectedBrands}
            minPrice={params.minPrice}
            maxPrice={params.maxPrice}
            categories={categories}
            brands={brands}
          />
        </aside>

        <section className="min-w-0 flex-1">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-bold text-gray-900">{query ? `Results for “${query}”` : 'All Products'}</h2>
            <span className="text-sm text-gray-500">{products.length} products</span>
          </div>
          {products.length ? (
            <SearchResults products={products} wishlistIds={wishlistIds} />
          ) : (
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-20 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400"><Search size={26} /></div>
              <h3 className="text-lg font-bold text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-500">Try changing your search or filters.</p>
              <a href="/search" className="mt-5 inline-block rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700">View all products</a>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
