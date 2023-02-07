export interface IProduct {
  id: number
  brandName: string
  name: string
  articles: IArticle[]
}

export interface IArticle {
  id: number
  shortDescription: string
  price: string
  unit: number
  pricePerUnitText: string
  image: string
}

export interface ICompletedArticle {
  id: number
  shortDescription: string
  price: string
  unit: number
  priceAsNumber: number
  pricePerUnitText: string
  image: string
  brandName: string
  name: string
}
