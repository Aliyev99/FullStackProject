namespace GoldStoreAPI.Helpers
{
    public class ProductParams : PaginationParams
    {
        public string? OrderBy { get; set; }
        public string? Brands { get; set; }
        public double? MinPrice { get; set; } = null;
        public double? MaxPrice { get; set; } = null;
        public string? Materials { get; set; }
        public string? Gemstones { get; set; }

    }
}
