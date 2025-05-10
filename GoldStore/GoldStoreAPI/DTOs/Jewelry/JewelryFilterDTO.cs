using GoldStoreAPI.Entyties.Products.Jewelleries;

namespace GoldStoreAPI.DTOs.Jewelry
{
    public class JewelryFilterDTO
    {
        public List<string> Brands { get; set; }
        public List<string> Materials { get; set; }
        public List<GemstoneDTO> Gemstones { get; set; }
    }
}
