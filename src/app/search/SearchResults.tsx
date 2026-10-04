'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, LayoutGrid, List, Star } from 'lucide-react'
import { ProductType } from '@/types/product.types'
import ProductCard from '@/app/_components/ProductCard/ProductCard'
import AddToCartBtn from '@/app/_components/AddToCartBtn/AddToCartBtn'
import AddToWishlistBtn from '@/app/_components/AddToWishlistBtn/AddToWishlistBtn'

export default function SearchResults({ products, wishlistIds }: { products: ProductType[]; wishlistIds: string[] }) {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid')
  const [sort, setSort] = useState('relevance')
  const [page, setPage] = useState(1)
  const pageSize = 8
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === 'price-low') return (a.priceAfterDiscount || a.price) - (b.priceAfterDiscount || b.price)
    if (sort === 'price-high') return (b.priceAfterDiscount || b.price) - (a.priceAfterDiscount || a.price)
    if (sort === 'rating') return b.ratingsAverage - a.ratingsAverage
    if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    return 0
  })
  const pageCount = Math.ceil(sortedProducts.length / pageSize)
  const visibleProducts = sortedProducts.slice((page - 1) * pageSize, page * pageSize)

  return (
    <>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 rounded-xl border border-gray-200 bg-white p-1">
          <button type="button" onClick={() => setLayout('grid')} aria-label="Grid view" aria-pressed={layout === 'grid'} className={`rounded-lg p-2.5 transition ${layout === 'grid' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><LayoutGrid size={19} /></button>
          <button type="button" onClick={() => setLayout('list')} aria-label="List view" aria-pressed={layout === 'list'} className={`rounded-lg p-2.5 transition ${layout === 'list' ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}><List size={19} /></button>
        </div>
        <label className="flex items-center gap-3 text-sm text-gray-600">Sort by:
          <select value={sort} onChange={(event) => { setSort(event.target.value); setPage(1) }} className="min-w-48 rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-800 outline-none focus:border-green-500">
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
            <option value="rating">Top rated</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </div>
      {layout === 'grid' ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visibleProducts.map((product) => <ProductCard key={product.id} product={product} isWishListed={wishlistIds.includes(product.id)} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visibleProducts.map((product) => {
            const price = product.priceAfterDiscount || product.price
            return (
              <article key={product.id} className="flex flex-col gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center">
                <Link href={`/products/${product.id}`} className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-40 sm:w-48">
                  <Image src={product.imageCover} alt={product.title} fill sizes="(max-width: 640px) 100vw, 192px" className="object-contain p-3" />
                </Link>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-gray-400">{product.category?.name} {product.brand?.name ? `· ${product.brand.name}` : ''}</p>
                  <Link href={`/products/${product.id}`} className="mt-1 block text-lg font-semibold text-gray-800 hover:text-green-600">{product.title}</Link>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">{product.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-amber-400"><Star size={15} fill="currentColor" /><span className="text-xs text-gray-500">{product.ratingsAverage} ({product.ratingsQuantity})</span></div>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{price} EGP</p>
                    {product.priceAfterDiscount < product.price && <p className="text-sm text-gray-400 line-through">{product.price} EGP</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <AddToWishlistBtn productId={product.id} isWishListed={wishlistIds.includes(product.id)} />
                    <AddToCartBtn productId={product.id} />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
      {pageCount > 1 && <nav aria-label="Product pages" className="mt-10 flex items-center justify-center gap-2">
        <button type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1} aria-label="Previous page" className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronLeft size={18} /></button>
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => <button key={pageNumber} type="button" onClick={() => setPage(pageNumber)} aria-current={page === pageNumber ? 'page' : undefined} className={`h-10 min-w-10 rounded-lg px-3 font-medium transition ${page === pageNumber ? 'bg-green-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{pageNumber}</button>)}
        <button type="button" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount} aria-label="Next page" className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"><ChevronRight size={18} /></button>
      </nav>}
    </>
  )
}
