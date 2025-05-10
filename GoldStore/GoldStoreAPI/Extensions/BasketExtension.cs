using GoldStoreAPI.DTOs;
using GoldStoreAPI.DTOs.Jewelry;
using GoldStoreAPI.Entyties;
using GoldStoreAPI.Entyties.Products;
using System.ComponentModel.DataAnnotations;

namespace GoldStoreAPI.Extensions
{
    public static class BasketExtension
    {
        public static BasketDTO MapToDTO(this Basket basket)
        {
            return new BasketDTO
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item => new BasketItemDTO
                {
                    ProductId = item.ProductId,
                    Name = item.Product.Name,
                    Brand = item.Product.Brand,
                    Price = item.Product.Price,
                    Description = item.Product.Description,
                    Ref = item.Product.Ref,
                    Title = item.Product.Title,
                    Quantity = item.Quantity,
                    Picture = item.Product.Images[0].Url,
                    SelectedSize = item.SelectedSize,
                    Sizes = item.Product.Sizes.Select(s => new ProductSizeDTO
                    {
                        Size = s.Size,
                        Quantity = s.Quantity
                    }).ToList()
                }).ToList()
            };
        }
    }
}



