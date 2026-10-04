export interface CategoryType {
  _id: string
  name: string
  slug: string
  image: string
  createdAt?: string
  updatedAt?: string
}

export interface SubCategoryType {
  _id: string
  name: string
  slug: string
  category: string
  createdAt?: string
  updatedAt?: string
}