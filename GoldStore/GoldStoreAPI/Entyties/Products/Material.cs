using GoldStoreAPI.Entyties.Products.Jewelleries;
using System.Text.Json.Serialization;

namespace GoldStoreAPI.Entyties.Products
{
    public class Material
    {
        public int Id { get; set; }

        public string Name { get; set; }


        //[JsonConverter(typeof(JsonStringEnumConverter))]
        // public ContentMaterial Content { get; set; }

        //[JsonIgnore]
        public List<Jewelry> Jewelleries { get; set; } = new();

        //public int? JewelryId { get; set; }
        //public List<Jewelry>? Jewelries { get; set; }
    }

}
