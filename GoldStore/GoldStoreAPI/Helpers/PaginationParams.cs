namespace GoldStoreAPI.Helpers
{
    public class PaginationParams
    {
        private int _maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize { get; set; } = 6;
        public int PageSize 
        { 
            get => _pageSize;  
            set => _pageSize = value > _maxPageSize ? _maxPageSize : value;
        }
    }
}
