using GoldStoreAPI.DTOs.Jewelry;
using System.ComponentModel.DataAnnotations;

namespace GoldStoreAPI.DTOs
{
    public class BasketItemDTO
    {
        public int ProductId { get; set; }
        public string Ref { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; } 
        public string Title { get; set; }

        [MaxLength(10000)]
        public string Description { get; set; }

        public double Price { get; set; }
        public string? Brand { get; set; }
        public int Quantity { get; set; }
        public string SelectedSize { get; set; }

        public List<ProductSizeDTO> Sizes { get; set; }
    }
}
