using Microsoft.AspNetCore.Identity;

namespace GoldStoreAPI.Entyties
{
    public class User : IdentityUser<int>
    {
        public string FullName { get; set; }

        public DateTime? Birthday { get; set; }

        public RefreshToken? RefreshToken { get; set; }
    }

}
