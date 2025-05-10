using GoldStoreAPI.Entyties;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GoldStoreAPI.Data
{
    public class GSUserDbContext : IdentityDbContext<User, Role, int>
    {
        public GSUserDbContext(DbContextOptions<GSUserDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "user", NormalizedName = "USER" },
                new Role { Id = 2, Name = "admin", NormalizedName = "ADMIN" }
                );
        }

        
        public DbSet<RefreshToken> RefreshTokens { get; set; }


    }
}
