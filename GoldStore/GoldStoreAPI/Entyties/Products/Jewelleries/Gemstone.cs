namespace GoldStoreAPI.Entyties.Products.Jewelleries
{
    public class Gemstone
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public  string? PictureUrl { get; set; }

        public List<Jewelry> Jewelleries { get; set; } = new();



        //public Jewelry? Jewelry { get; set; }

        //public int? JewelryId { get; set; }
    }
}
