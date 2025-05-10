using Microsoft.EntityFrameworkCore.Metadata;

namespace GoldStoreAPI.Helpers
{
    public class MetaData
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; } 
        public int TotalItems { get; set; }
        public int TotalPages { get; set; }
    }
}
