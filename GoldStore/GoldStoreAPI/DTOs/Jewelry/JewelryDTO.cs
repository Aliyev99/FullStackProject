using GoldStoreAPI.Entyties;
using GoldStoreAPI.Entyties.Products;
using GoldStoreAPI.Entyties.Products.Jewelleries;
using System.Text.Json.Serialization;

namespace GoldStoreAPI.DTOs.Jewelry
{
    public class JewelryDTO : ProductDTO
    {
        public double Weight { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ForGender ForGender { get; set; }

        public List<string>? Materials { get; set; }

        public List<GemstoneDTO>? Gemstones { get; set; }

        public double? DiamondCarat { get; set; }
        public string Type { get; set; }

        //public string[]? Sizes { get; set; }

        //public int[]? Quantities { get; set; }

        //public double? Price { get; set; }

        //public float DiamondCarat { get; set; }
    }
}
