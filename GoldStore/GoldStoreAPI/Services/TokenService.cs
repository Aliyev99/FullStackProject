using GoldStoreAPI.Entyties;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace GoldStoreAPI.Services
{
    public class TokenService
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;

        public TokenService(UserManager<User> userManager, IConfiguration config)
        {
            _userManager = userManager;
            _config = config;
        }

        public async Task<string> GenerateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var roles = await _userManager.GetRolesAsync(user);
            
            foreach (var role in roles) 
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var symmetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:TokenKey"]));
            var creds = new SigningCredentials(symmetricKey, SecurityAlgorithms.HmacSha512);

            var tokenOptions = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: claims,
                signingCredentials: creds,
                notBefore: DateTime.Now,
                expires: DateTime.Now.AddMinutes(1)
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        public string GetRefresh()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
