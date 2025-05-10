using GoldStoreAPI.Entyties;
using GoldStoreAPI.Entyties.Products;
using GoldStoreAPI.Entyties.Products.Jewelleries;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace GoldStoreAPI.Data
{
    public class GSResourceDbContext : DbContext
    {
        public GSResourceDbContext(DbContextOptions<GSResourceDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Jewelry> Jewelleries { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Gemstone> Gemstones { get; set; }
        public DbSet<Material> Materials { get; set; }

        public DbSet<Basket> Baskets { get; set; }

        



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .ToTable("Products")
                .HasDiscriminator<string>("ProductType");

            //modelBuilder.Entity<Bracelete>().Property(e => e.Sizes).
            //    HasConversion(
            //        v => string.Join(",", v.Select(e => e.ToString()).ToArray()),
            //        v => v.Split(new[] { ',' })
            //        .Select(e => Enum.Parse(typeof(ProdutSize), e))
            //        .Cast<ProdutSize>()
            //        .ToList()
            //);


            //modelBuilder.Entity<Jewelry>()
            //    .Property(e => e.Sizes)
            //    .HasConversion(
            //        v => string.Join(",", v.Select(e => e)),
            //        v => v.Split(new[] { ','}).ToArray()
            //            );

            //modelBuilder.Entity<Jewelry>()
            //    .Property(e => e.Quantities)
            //    .HasConversion(v => string.Join(",", v.Select(e => e)), v => v.Split(new[] { ',' }).Select(e => int.Parse(e)).ToArray()
            //            );

            //modelBuilder.Entity<Jewelry>()
            //    .Property(e => e.PicturesUrl)
            //    .HasConversion(
            //        v => string.Join(",", v.Select(e => e.ToString()).ToArray()),
            //        v => v.Split(new[] { ',' })
            //            .Select(e => float.Parse(e))
            //            .Cast<float>()
            //            .ToArray()
            //            );


        }

        protected override void ConfigureConventions(ModelConfigurationBuilder configurationBuilder)
        {
            configurationBuilder.Properties<ProdutSize>().HaveConversion<string>();
            //configurationBuilder.Properties<ContentMaterial>().HaveConversion<string>();
            configurationBuilder.Properties<ForGender>().HaveConversion<string>();

        }

    }
}
