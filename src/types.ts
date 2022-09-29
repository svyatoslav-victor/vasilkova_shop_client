export type ProductInfo = {
  _id: string,
  productId: string,
  name: string,
  brand: string,
  category: string,
  productType: string,
  inStock: boolean,
  onSale: boolean,
  price: number,
  color: string,
  description: string,
  keywords: string[],
  images: FileList
};

export type CartItem = {
  _id: string,
  productId: string,
  name: string,
  brand: string,
  price: number,
  color: string,
  description: string,
  images?: FileList | null,
  quantity: number,
  specs: string
}

export type CustomerDetails = {
  name: string,
  phone: string,
  email?: string
}

export type ProductType = {
  name: string,
  image: string
}

export type ProductGroup = {
  name: string,
  types: ProductType[]
};

export type Brand = {
  value: string
};

export type Color = {
  hex: string,
  value: string
}
