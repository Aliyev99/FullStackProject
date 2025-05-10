using GoldStoreAPI.Data;
using GoldStoreAPI.DTOs;
using GoldStoreAPI.Entyties;
using GoldStoreAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GoldStoreAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BasketController : ControllerBase
    {
        private readonly GSResourceDbContext _dbContext;

        public BasketController(GSResourceDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private string? GetBuyerId()
        {
            return User.Identity?.Name;
        }

        [HttpGet]
        public async Task<ActionResult<BasketDTO>?> GetBasket()
        {

            var basket = await RetriveBasket(GetBuyerId());

            if (basket == null) return null;

            return basket.MapToDTO();
        }

        
        [HttpPost]
        public async Task<ActionResult<BasketDTO>> AddItem(int productId, int quantity, string size)
        {
            var basket = await RetriveBasket(GetBuyerId());

            if (basket == null) basket = await CreateBasket(GetBuyerId());

            var product = await _dbContext.Products.Include(p => p.Images).Include(s=> s.Sizes).FirstOrDefaultAsync(x => x.Id == productId);

            if (product == null) return NotFound();

            //product.Size = size;

            basket.AddItem(product, quantity, size);
            
            await _dbContext.SaveChangesAsync();

            return basket.MapToDTO();
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveItem(int productId, int quantity,string size)
        {
            var basket = await RetriveBasket(User.Identity?.Name);

            if (basket == null) return NotFound();  
            
            var product = await _dbContext.Products.FirstOrDefaultAsync(x=> x.Id == productId);


            if (product == null) return NotFound();
            
            //product.Size = size;

            basket.RemoveItem(product, quantity, size);

            var result = await _dbContext.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Error remove item from database." });
        }


        private async Task<Basket?> RetriveBasket(string? buyerId)
        {
            //var buyerId = Request.Cookies["BuyerId"];
            return await _dbContext.Baskets.
                Include(b=> b.Items).
                    ThenInclude(i => i.Product).
                        ThenInclude(s => s.Sizes).
                Include(b => b.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.Images).
                FirstOrDefaultAsync(x => x.BuyerId == buyerId);  
        }

        private async Task<Basket> CreateBasket(string? buyerId)
        {
            //var buyerId = Guid.NewGuid().ToString();
            //var cookieOption = new CookieOptions { Expires = DateTime.Now.AddDays(30), IsEssential = true };
            //Response.Cookies.Append("BuyerId", buyerId, cookieOption);

            var basket = new Basket { BuyerId = buyerId };

            await _dbContext.Baskets.AddAsync(basket);

            return basket;
            

        }

        //private string RetriveBasket()
        //{
        //    return  Request.Cookies["buyerId"];

        //}
    }
}
