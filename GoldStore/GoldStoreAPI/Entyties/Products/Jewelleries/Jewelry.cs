using System.Text.Json.Serialization;

namespace GoldStoreAPI.Entyties.Products.Jewelleries
{
    public class Jewelry : Product
    {
        public double Weight { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public ForGender ForGender { get; set; }

        public double? DiamondCarat { get; set; }

        //public string JewelryType { get; set; }

        //public float[]? AvailableSizes { get; set; }

        public List<Material>? Materials { get; set; }

        public List<Gemstone>? Gemstones { get; set; }

        //public string[] Sizes { get; set; }

        //public int[] Quantities { get; set; }
        //public override int QuantityInStock { get => Quantities[Array.FindIndex(Sizes, x => x == base.Size)]; set => Quantities[Array.FindIndex(Sizes, x => x == base.Size)] = value; }

    }


}
