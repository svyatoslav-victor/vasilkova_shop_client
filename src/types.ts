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
  inStock?: boolean,
  onSale?: boolean,
  color: string,
  description: string,
  images?: FileList | null,
  quantity: number,
  specs: string
}

export type CustomerDetails = {
  name: string,
  phone: string,
  email?: string,
  company?: string,
  deliveryAddress: string
}

export type ProductsDetails = {
  productId: string,
  name: string,
  price: number,
  color: string,
  quantity: number,
  specs: string,
  image: File | null
}

export type Order = {
  orderId: number,
  orderDate: string,
  productsDetails: ProductsDetails[],
  subtotal: number,
  customerInfo: CustomerDetails,
  status: string,
}

export type ProductType = {
  name: string,
  nameUA: string,
  image: string
}

export type ProductGroup = {
  name: string,
  nameUA: string,
  types: ProductType[]
};

export type Brand = {
  value: string
};

export type Color = {
  hex: string,
  value: string,
  valueUA: string
}

export type Paginator = {
  total: number,
  perPage: number,
  page: number
}
