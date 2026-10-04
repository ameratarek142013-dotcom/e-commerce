'use client'

import { ChangeEvent } from 'react'
import { Brand } from '@/types/product.types'
import { CategoryType } from '@/types/categoryType.types'
import { SlidersHorizontal } from 'lucide-react'

type SearchFiltersProps = {
  query: string
  selectedCategories: string[]
  selectedBrands: string[]
  minPrice?: string
  maxPrice?: string
  categories: CategoryType[]
  brands: Brand[]
}

export default function SearchFilters({
  query,
  selectedCategories,
  selectedBrands,
  minPrice,
  maxPrice,
  categories,
  brands,
}: SearchFiltersProps) {
  const submitOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.currentTarget.form?.requestSubmit()
  }

  return (
    <form action="/search" method="get" className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      {query && <input type="hidden" name="q" value={query} />}
      <div className="mb-5 flex items-center gap-2 text-gray-900">
        <SlidersHorizontal size={18} className="text-green-600" />
        <h2 className="font-bold">Filters</h2>
      </div>

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold text-gray-900">Categories</h3>
        <div className="max-h-52 space-y-2 overflow-y-auto">
          {categories.map((category) => (
            <label key={category._id} className="group flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="category" value={category._id} defaultChecked={selectedCategories.includes(category._id)} onChange={submitOnChange} className="h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500" />
              <span className="text-sm text-gray-600 transition-colors group-hover:text-gray-900">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="mb-6 border-gray-100" />

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold text-gray-900">Price Range</h3>
        <div className="mb-3 grid grid-cols-2 gap-3">
          <label className="block text-xs text-gray-500">Min (EGP)<input name="minPrice" type="number" min="0" defaultValue={minPrice ?? ''} placeholder="0" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-500" /></label>
          <label className="block text-xs text-gray-500">Max (EGP)<input name="maxPrice" type="number" min="0" defaultValue={maxPrice ?? ''} placeholder="No limit" className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 outline-none focus:border-green-500" /></label>
        </div>
        <div className="flex flex-wrap gap-2">
          {[500, 1000, 5000, 10000].map((price) => (
            <button key={price} type="button" onClick={(event) => {
              const form = event.currentTarget.form
              const maxPriceInput = form?.elements.namedItem('maxPrice')
              if (maxPriceInput instanceof HTMLInputElement) maxPriceInput.value = String(price)
              form?.requestSubmit()
            }} className="rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-200">Under {price >= 1000 ? `${price / 1000}K` : price}</button>
          ))}
        </div>
      </div>

      <hr className="mb-6 border-gray-100" />

      <div className="mb-6">
        <h3 className="mb-4 text-sm font-bold text-gray-900">Brands</h3>
        <div className="max-h-52 space-y-2 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand._id} className="group flex cursor-pointer items-center gap-3">
              <input type="checkbox" name="brand" value={brand._id} defaultChecked={selectedBrands.includes(brand._id)} onChange={submitOnChange} className="h-4 w-4 rounded border-gray-300 accent-green-600 focus:ring-green-500" />
              <span className="text-sm text-gray-600 transition-colors group-hover:text-gray-900">{brand.name}</span>
            </label>
          ))}
        </div>
      </div>

      <button type="submit" className="w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700">Search products</button>
      {(query || selectedCategories.length > 0 || selectedBrands.length > 0 || minPrice || maxPrice) && <a href="/search" className="mt-3 block text-center text-sm text-gray-500 underline hover:text-gray-800">Clear filters</a>}
    </form>
  )
}
