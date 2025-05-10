using GoldStoreAPI.Data;
using GoldStoreAPI.DTOs;
using GoldStoreAPI.DTOs.Jewelry;
using GoldStoreAPI.Entyties.Products;
using GoldStoreAPI.Entyties.Products.Jewelleries;
using GoldStoreAPI.Extensions;
using GoldStoreAPI.Helpers;
using GoldStoreAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;
using System.Text.Json;
using System.Text.Json.Serialization;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace GoldStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JewelryController : ControllerBase
    {
        private readonly GSResourceDbContext _gSResourceDbContext;

        public JewelryController(GSResourceDbContext gSResourceDbContext)
        {
            _gSResourceDbContext = gSResourceDbContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<JewelryDTO>>> GetJewelleries([FromQuery]ProductParams productParams)
        {
            var jewelries = await _gSResourceDbContext.Jewelleries.Include(i => i.Images).Sort(productParams.OrderBy).Filter(productParams).Select(r =>
           MapJewelryToDto(r, r.Materials, r.Gemstones)
        ).ToListAsync();

            if (jewelries == null)
            {
                return NotFound();
            }

            return jewelries;


        }


        [HttpGet("Rings")]
        public async Task<ActionResult<PagedList<JewelryDTO>>> GetRings([FromQuery]ProductParams productParams)
        {
            const string type = "Ring";
            var query = GetJewelriesByType(type, productParams);


            var rings = await PagedList<JewelryDTO>.ToPagedListAsync(query, productParams.PageNumber, productParams.PageSize);
            if (rings == null)
                return NotFound();

            Response.AddPaginationHeader(rings.MetaData);

            return rings;

        }

        [HttpGet("Braceletes")]
        public async Task<ActionResult<PagedList<JewelryDTO>>> GetBraceletes([FromQuery] ProductParams productParams)
        {
            const string type = "Bracelete";
            var query =  GetJewelriesByType(type, productParams);

            var braceletes = await PagedList<JewelryDTO>.ToPagedListAsync(query, productParams.PageNumber, productParams.PageSize);
            if (braceletes == null)
                return NotFound();

            Response.AddPaginationHeader(braceletes.MetaData);

            return braceletes;
        }


        [HttpGet("Earrings")]
        public async Task<ActionResult<PagedList<JewelryDTO>>> GetEarrings([FromQuery] ProductParams productParams)
        {
            const string type = "Earring";
            var query =  GetJewelriesByType(type, productParams);

            var earrings = await PagedList<JewelryDTO>.ToPagedListAsync(query, productParams.PageNumber, productParams.PageSize);
            if (earrings == null)
                return NotFound();

            Response.AddPaginationHeader(earrings.MetaData);

            return earrings;
        }



        [HttpGet("Necklakes")]
        public async Task<ActionResult<PagedList<JewelryDTO>>> GetNecklakes([FromQuery] ProductParams productParams)
        {
            const string type = "Necklake";
            var query =  GetJewelriesByType(type, productParams);

            var necklakes = await PagedList<JewelryDTO>.ToPagedListAsync(query, productParams.PageNumber, productParams.PageSize);
            if (necklakes == null)
                return NotFound();

            Response.AddPaginationHeader(necklakes.MetaData);

            return necklakes;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<JewelryDTO>> GetJewellery(int id)
        {
            var jewelry = await _gSResourceDbContext.Jewelleries
                .Include(x => x.Materials)
                .Include(j => j.Gemstones)
                .Include(i => i.Images)
                .Include(s => s.Sizes)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (jewelry == null)
                return NotFound();

           

            return jewelry.ToDto();
        }

        [HttpGet("recomendeds")]
        public async Task<ActionResult<List<ProductDTO>>> GetRecommendeds([FromQuery]RecomendedDTO recomended)
        {
            var recomendeds = await _gSResourceDbContext.Products.Include(p => p.Images).Where(x => x.Name == recomended.Name && x.Id != recomended.Id).ToListAsync();
            if (recomendeds == null) return NotFound();
            if (recomendeds.Count < 8)
                recomendeds.AddRange(await _gSResourceDbContext.Products.Include(x => x.Images).Where(p => p.Type == recomended.Type && p.Name != recomended.Name).Take(8 - recomendeds.Count).ToListAsync());

            return recomendeds.Select(p => new ProductDTO
            {
               Id = p.Id,
               Name = p.Name,
               Images = p.Images.Select(i => new ImageDTO
               {
                   Url = i.Url,
                   IsCarouselImg = i.IsCarouselImg
               }).ToList(),
               Price =p.Price
            }).ToList();
        }


        [HttpGet("filters")]
        public async Task<JewelryFilterDTO> GetFilters()
        {
            return new JewelryFilterDTO
            {
                Brands = await _gSResourceDbContext.Jewelleries.Select(x => x.Brand).Distinct().ToListAsync(),
                Materials = await _gSResourceDbContext.Materials.Select(x => x.Name).Distinct().ToListAsync(),
                Gemstones = await _gSResourceDbContext.Gemstones.Select(x => new GemstoneDTO
                {
                    Name = x.Name,
                    PictureUrl = x.PictureUrl
                }).Distinct().ToListAsync()
            };
        }


        private  IQueryable<JewelryDTO> GetJewelriesByType(string type, ProductParams productParams)
        {
            //return  _gSResourceDbContext.Jewelleries.Include(i => i.Images).Where(j => j.JewelryType == type).Sort(productParams.OrderBy).Filter(productParams).Select(x => MapJewelryToDto(x, x.Materials, x.Gemstones));
            return _gSResourceDbContext.Jewelleries.Include(i => i.Images).Include(x=> x.Sizes).Where(j => j.Type == type).Sort(productParams.OrderBy).Filter(productParams).Select(x => MapJewelryToDto(x, x.Materials, x.Gemstones));
        }



        private static JewelryDTO MapJewelryToDto(Jewelry r, List<Material>? materials, List<Gemstone>? gemstones)
        {
            return new JewelryDTO
            {
                Id = r.Id,
                Ref = r.Ref,
                Name = r.Name,
                Title = r.Title,
                Description = r.Description,
                Type = r.Type,
                Images = r.Images?.Select(i => new ImageDTO
                {
                     Url = i.Url,
                     IsCarouselImg = i.IsCarouselImg
                }).ToList(),
                Sizes = r.Sizes.Select(s => new ProductSizeDTO
                {
                    Size = s.Size,
                    Quantity = s.Quantity
                }).ToList(),
                Price = r.Price,
                Brand = r.Brand,
                Weight = r.Weight,
                ForGender = r.ForGender,
                Materials = materials?.Select(m => m.Name).ToList(),
                DiamondCarat = r.DiamondCarat,
                Gemstones = gemstones?.Select(g => new GemstoneDTO
                {
                    Name = g.Name,
                    PictureUrl = g.PictureUrl
                }).ToList(),
               

            };
        }

        public class RecomendedDTO
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Type { get; set; }
        }


    }
}
