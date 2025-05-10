


  interface Product{
    id: number;
    ref: number;
    name: string;
    images: Image[];
    title: string;
    description: string;
    price: number;
    brand: number;
    sizes: ProductSize[];
    type: string;
  }

  interface ProductSize{
    size: string;
    quantity: number;
  }


  interface Image{
    url: string;
    isCarouselImg: boolean;
  }

  interface ProductParams {
    orderyBy: string
    brands: string[];
    types: string[];
    minPrice: number;
    maxPrice: number;
  }

  

  
  
