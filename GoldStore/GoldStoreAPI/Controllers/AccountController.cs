using GoldStoreAPI.Data;
using GoldStoreAPI.DTOs;
using GoldStoreAPI.Entyties;
using GoldStoreAPI.Extensions;
using GoldStoreAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace GoldStoreAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly GSUserDbContext _gSUserDb;
        private readonly GSResourceDbContext _gSResourceDb;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<User> userManager, GSUserDbContext gSUserDb, GSResourceDbContext gSResourceDb, TokenService tokenService)
        {
            _userManager = userManager;
            _gSUserDb = gSUserDb;
            _gSResourceDb = gSResourceDb;
            _tokenService = tokenService;
        }

        private async Task<Basket?> RetriveBasket(string? buyerId)
        {
            //var buyerId = Request.Cookies["BuyerId"];
            return await _gSResourceDb.Baskets.
                Include(b => b.Items).
                    ThenInclude(i => i.Product).
                        ThenInclude(s => s.Sizes).
                Include(b => b.Items)
                    .ThenInclude(i => i.Product)
                        .ThenInclude(p => p.Images).
                FirstOrDefaultAsync(x => x.BuyerId == buyerId);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDTO>> GetCurrentUser()
        {
            var user = await _userManager.FindByNameAsync(User.Identity?.Name);
            if (user == null) return NotFound();

            return new UserDTO
            {
                Username = user.UserName,
                Email = user.Email,
                Basket = (await RetriveBasket(user.UserName))?.MapToDTO(),

            };


        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(RegisterDto registerDto)
        {
            if(ModelState.IsValid)
            {

                var user = new User
                {
                    FullName = registerDto.FullName,
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                    Birthday = registerDto.Birthday
                };

                var result = await _userManager.CreateAsync(user, registerDto.Password);

                if (!result.Succeeded)
                {
                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError(error.Code, error.Description);
                    }

                    return ValidationProblem();
                }

                await _userManager.AddToRolesAsync(user, new[] { "user" });

               return StatusCode(201);
            }

            return ValidationProblem();
        }


        [HttpPost("login")]
        public async Task<ActionResult<UserAndTokenDTO>> Login(LoginDto loginDto)
        {
            if (ModelState.IsValid)
            {
                User? user;
                if (IsEmail(loginDto.Email))
                {
                    user = await _gSUserDb.Users.Include(x => x.RefreshToken).FirstOrDefaultAsync(u => u.Email == loginDto.Email);

                }
                else
                {
                    user = await _gSUserDb.Users.Include(x => x.RefreshToken).FirstOrDefaultAsync(u => u.UserName == loginDto.Email);
                }

                if (user == null)
                {
                    return Unauthorized(new ProblemDetails { Title = "Email not found"});
                }

                if (!await _userManager.CheckPasswordAsync(user, loginDto.Password))
                {
                    return Unauthorized(new ProblemDetails { Title = "Incorrect password" });
                }

                if (user.RefreshToken != null)
                {
                    _gSUserDb.RefreshTokens.Remove(user.RefreshToken);
                }

                var refresh = new RefreshToken
                {
                    Token = _tokenService.GetRefresh(),
                    ExpireDate = DateTime.Now.AddDays(10),
                    User = user
                };
                
               
                await _gSUserDb.RefreshTokens.AddAsync(refresh);

                await _gSUserDb.SaveChangesAsync();


                var userTokenDto = new UserAndTokenDTO
                {
                    UserDTO = new UserDTO
                    {
                        Username = user.UserName,
                        Email = user.Email,
                        Basket = (await RetriveBasket(user.UserName))?.MapToDTO()
                    },
                    TokenDTO = new TokenDTO
                    {
                        AccessToken = await _tokenService.GenerateToken(user),
                        RefreshToken = refresh.Token
                    }
                };

                return Ok(userTokenDto);

            }

            return ValidationProblem();
        }

        [HttpPost("refresh")]
        public async Task<ActionResult<TokenDTO>> Refresh(string refresh)
        {
            var oldToken = await _gSUserDb.RefreshTokens.Include(t => t.User).FirstOrDefaultAsync(x => x.Token == refresh);

            if (oldToken == null || oldToken.ExpireDate < DateTime.Now)
            {
               return Unauthorized();
            }

            var freshToken = new RefreshToken
            {
                User = oldToken.User,
                Token = _tokenService.GetRefresh(),
                ExpireDate = DateTime.Now.AddDays(10)
            };
            _gSUserDb.RefreshTokens.Remove(oldToken);
            await _gSUserDb.AddAsync(freshToken);
            var result = await _gSUserDb.SaveChangesAsync() > 0;

            if (!result)
            {
                return BadRequest(new ProblemDetails { Title = "Problem occured while token update" });
            }


            return new TokenDTO
            {
                RefreshToken = freshToken.Token,
                AccessToken = await _tokenService.GenerateToken(freshToken.User)
            };

        }

        [Authorize]
        [HttpGet("test")]
        public string Test()
        {
            return "Test";
        }


        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult> Logout()
        {
            //var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var refresh = await _gSUserDb.RefreshTokens.Include(x => x.User).Where(y => y.User.UserName == User.Identity.Name).FirstOrDefaultAsync();
            if (refresh == null)
                return BadRequest(new ProblemDetails { Title = "User is alredy logged out!" });

            _gSUserDb.RefreshTokens.Remove(refresh);
            var result = await _gSUserDb.SaveChangesAsync() > 0;

            if (!result)
                return BadRequest(new ProblemDetails { Title = "Problem occured while token romove from db!" });

            return Ok();
        }

        

        private bool IsEmail(string str)
        {
            return Regex.IsMatch(str, "^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$");
        }
    }
}
