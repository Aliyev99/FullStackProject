

interface Jewelry extends Product{
    weight: number;
    forGender: number;
    diamondCarat: number;
    // sizes: string[],
    // quantities: number[];
    materials: string[];
    gemstones: Gemstone[];
}

interface JewelryParams extends ProductParams {
    forGender: number;
    materials: string[];
    gemstones: string[]; 
  }

// interface Ring extends Jewelry {
//     availableSizes: number[];
//   }