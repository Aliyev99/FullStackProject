using GoldStoreAPI.DTOs;
using GoldStoreAPI.DTOs.Jewelry;
using GoldStoreAPI.Entyties.Products;
using GoldStoreAPI.Entyties.Products.Jewelleries;
using GoldStoreAPI.Helpers;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.Runtime.CompilerServices;

namespace GoldStoreAPI.Extensions
{
    public static class JewelleryExtension
    {
        public static IQueryable<Jewelry> Sort(this IQueryable<Jewelry> jewelry, string? orderBy) 
        {
            return orderBy switch
            {
                "price" => jewelry.OrderBy(x => x.Price),
                "priceDesc" => jewelry.OrderByDescending(x => x.Price),
                _ => jewelry.OrderBy(x => x.Name)

            };
        }

        public static IQueryable<Jewelry> Filter(this IQueryable<Jewelry> jewelry, ProductParams productParams)
        {
            string[] brandsList = null;
            if (!string.IsNullOrEmpty(productParams.Brands))
            {
                brandsList = productParams.Brands.Split(',');
                jewelry = jewelry.Where(x => brandsList.Contains(x.Brand.ToLower()));
            }

            string[] materialsList = null;
            if (!string.IsNullOrEmpty(productParams.Materials))
            {
                materialsList = productParams.Materials.Split(',');
                jewelry = jewelry.Where(x => x.Materials.Any(m => materialsList.Contains(m.Name.ToLower())));
            }

            string[] gemstonesList = null;
            if (!string.IsNullOrEmpty(productParams.Gemstones))
            {
                gemstonesList = productParams.Gemstones.Split(',');
                jewelry = jewelry.Where(x => x.Gemstones.Any(m => gemstonesList.Contains(m.Name.ToLower())));
            }

            //if (productParams.MinPrice != null)
            //{
            //    jewelry = jewelry.Where(x => x.Price >= productParams.MinPrice);
            //}

            //if (productParams.MaxPrice != null)
            //{
            //    jewelry = jewelry.Where(x => x.Price <= productParams.MaxPrice);
            //}



            return jewelry;
        }
        public static JewelryDTO ToDto(this Jewelry r)
        {
            return new JewelryDTO
            {
                Id = r.Id,
                Ref = r.Ref,
                Name = r.Name,
                Title = r.Title,
                Description = r.Description,
               
                Images = r.Images?.Select(i => new ImageDTO
                {
                    Url = i.Url,
                    IsCarouselImg = i.IsCarouselImg
                }).ToList(),
                //QuantityInStock = r.QuantityInStock,
                Price = r.Price,
                Brand = r.Brand,
                Weight = r.Weight,
                ForGender = r.ForGender,
                Materials = r.Materials?.Select(m => m.Name).ToList(),
                Type = r.Type,
                Sizes = r.Sizes?.Select(s => new ProductSizeDTO
                {
                    Size = s.Size,
                    Quantity = s.Quantity
                }).ToList(),
                DiamondCarat = r.DiamondCarat,
                Gemstones = r.Gemstones?.Select(g => new GemstoneDTO
                {
                    Name = g.Name,
                    PictureUrl = g.PictureUrl
                }).ToList()
            };
        }


    }
}
