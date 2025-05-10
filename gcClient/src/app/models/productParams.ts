

export interface ProductParams {
    orderBy: string;
    brands: string[];
    minPrice: number
    maxPrice: number;
    materials: string[];
    gemstones: string[];
    pageNumber: number;
    pageSize: number;
}