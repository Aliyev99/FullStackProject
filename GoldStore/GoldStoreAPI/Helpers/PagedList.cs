using GoldStoreAPI.DTOs.Jewelry;
using Microsoft.EntityFrameworkCore;

namespace GoldStoreAPI.Helpers
{
    public class PagedList<T> : List<T>
    {
        public PagedList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                TotalItems = count,
                TotalPages = (int)Math.Ceiling((double)count / pageSize)
            };

            AddRange(items);
        }

        public MetaData MetaData { get; set; }

        public static async Task<PagedList<T>> ToPagedListAsync(IQueryable<T> query, int pageNumber, int pageSize)
        {
            int count = await query.CountAsync();
            var items = await query.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, count, pageNumber, pageSize);
        }
    }
}
