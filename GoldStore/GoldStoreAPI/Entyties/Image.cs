using GoldStoreAPI.Entyties.Products;
using GoldStoreAPI.Entyties.Products.Jewelleries;

namespace GoldStoreAPI.Entyties
{
    public class Image
    {
        public int Id { get; set; }
        public string Url { get; set; }

        public bool IsCarouselImg { get; set; }


        public int ProductId { get; set; }
        public Product? Product { get; set; }
    }
}
