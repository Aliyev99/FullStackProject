using GoldStoreAPI.DTOs.Jewelry;
using System.ComponentModel.DataAnnotations;

namespace GoldStoreAPI.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string Ref { get; set; }

        public string Name { get; set; }

        public List<ImageDTO>? Images { get; set; }

        public string Title { get; set; }

        [MaxLength(10000)]
        public string Description { get; set; }

        //public int QuantityInStock { get; set; }

        public double Price { get; set; }

        public List<ProductSizeDTO>? Sizes { get; set; }

        public string? Brand { get; set; }
    }
}
