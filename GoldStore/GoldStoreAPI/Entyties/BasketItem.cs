using GoldStoreAPI.Entyties.Products;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoldStoreAPI.Entyties
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }

        public int Quantity { get; set; }
        public int ProductId { get; set; }
        public string SelectedSize { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}