export interface Basket {
    id: number
    buyerId: string
    items: BasketItem[]
  }
  
  export interface BasketItem {
    productId: number
    ref: string
    name: string
    picture: string
    title: string
    description: string
    price: number
    brand: string
    quantity: number
    selectedSize: string
    sizes: ProductSize[]
    productType: string;
  }