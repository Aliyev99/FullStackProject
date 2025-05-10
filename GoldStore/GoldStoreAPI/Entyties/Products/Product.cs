using AutoMapper.Configuration.Annotations;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GoldStoreAPI.Entyties.Products
{
    public abstract class Product
    {
        public int Id { get; set; }

        public string Ref { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }

        public List<Image> Images { get; set; }

        public string Title { get; set; }

        [MaxLength(10000)]
        public string Description { get; set; }

        public string? Brand { get; set; }
        public double Price { get; set; }

        public List<ProductSize> Sizes { get; set; }

    }


    public class ProductSize
    {
        public int Id { get; set; }
        public string Size { get; set; }

        public int Quantity { get; set; }

        private int ProductId;
        public Product Product { get; set; }
    }


}
