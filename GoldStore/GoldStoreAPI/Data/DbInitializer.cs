using GoldStoreAPI.Entyties;
using GoldStoreAPI.Entyties.Products;
using GoldStoreAPI.Entyties.Products.Jewelleries;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace GoldStoreAPI.Data
{
    public static class DbInitializer
    {


        public async static Task Initialize(UserManager<User> userManager, GSUserDbContext gSUserDb, GSResourceDbContext gSResourceDb)
        {
            if (!userManager.Users.Any())
            {

                var user = new User
                {
                    FullName = "Murad Aliyev",
                    UserName = "murad",
                    Email = "ma@test.com"
                };
                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRolesAsync(user, new[] { "user" });

                var admin = new User
                {
                    FullName = "Murad Aliyev",
                    UserName = "admin",
                    Email = "admin@test.com"
                };



                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] { "user", "admin" });

            }

            if (!gSResourceDb.Materials.Any())
            {
                var materials = new List<Material>
                {
                    new Material { Name = "YellowGold"},
                    new Material { Name = "RoseGold"},
                    new Material { Name = "WhiteGold"},
                    new Material { Name = "Silver"}
                };

                await gSResourceDb.Materials.AddRangeAsync(materials);
            }



            if (!gSResourceDb.Gemstones.Any())
            {
                var gemstones = new List<Gemstone>
                {
                    new Gemstone { Name = "Diamond"},
                    new Gemstone { Name = "Amethyst"},
                    new Gemstone { Name = "Emeralds"},
                    new Gemstone { Name = "Jade"},
                    new Gemstone { Name = "Rubilette"},
                    new Gemstone { Name = "PinkRubilette"},
                    new Gemstone { Name = "Carnelian"},
                    new Gemstone { Name = "Onyx"},
                    new Gemstone { Name = "PinkTourmaline"},
                    new Gemstone { Name = "Malacite"}
                };

                await gSResourceDb.Gemstones.AddRangeAsync(gemstones);
                await gSResourceDb.SaveChangesAsync();
            }

           

            if (!gSResourceDb.Jewelleries.Any())
            {

                var rings = new List<Jewelry>
                {
                new Jewelry
                {
                    Name = "BVLGARI CABOCHON RING",
                    //Price = 3000,
                    //Size = "49",
                    Brand = "Bulgary",
                    Description = "Like a drop of gold crafted into a perfect harmony of volumes and shapes, the Bulgari Cabochon ring in 18 kt yellow gold is a tactile experience that displays the art of mastering the matter and turning it into something dynamic and alive. Drawing inspiration from the smooth cabochon cut – an aesthetic Bulgari signature since the 1950s that elevates the natural charm of gemstones – the jewel enhances the precious metal that reveals the organic purity of gold.\r\nBulgari Cabochon ring in 18 kt yellow gold\r\n\r\n",
                    Ref = "361229",
                    Title = "Bulgari Cabochon 18 kt yellow gold ring",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Materials = await gSResourceDb.Materials.Where(x => x.Name == "YellowGold").ToListAsync()

                },

                new Jewelry
                {
                    Name = "B.ZERO1 RING",
                    //Price = 6900,
                    //Size = "49",
                    Brand = "Bulgary",
                    Description = "Drawing its inspiration from the world’s most renowned amphitheatre, the Colosseum, the B.zero1 three-band ring in 18 kt rose gold is a ground-breaking statement of Bulgari’s creative",
                    Ref = "359000",
                    Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "RoseGold") },
                    Title = "B.zero1 18 kt rose gold three-band ring set with full pavé diamonds along its edges",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond" ).ToListAsync(),
                    DiamondCarat = 0.04

                },
                new Jewelry
                {
                    Name = "B.ZERO1 RING",
                    //Price = 1300,
                    //Size = "50",
                    Brand = "Bulgary",
                    Description = "A contemporary statement of elegance inspired by Bulgari’s Roman roots, the B.zero1 Essential ring is crafted in 18 kt yellow gold. Focusing on the essential aesthetic codes of the line, the ring sports the famed logo of the brand, an iconic signature which has evolved into a distinctive element of design. Easy to wear and effortlessly stackable, the versatile creation offers modern yet timeless styling options to skilfully match your personality.\r\nB.zero1 Essential 18 kt yellow gold ring.\r\n\r\n",
                    Ref = "360367",
                    Title = "B.zero1 Essential 18 kt yellow gold band ring",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Materials = await gSResourceDb.Materials.Where(x => x.Name == "YellowGold").ToListAsync()

                },




                new Jewelry
                {
                    Name = "SAVE THE CHILDREN RING",
                    //Price = 600,
                    //Size = "49",
                    Brand = "Bulgary",
                    Description = "Honouring Bvlgari’s ongoing philanthropic partnership with Save the Children, the ring in sterling silver and black ceramic is inspired by the B.zero1 jewelry collection and engraved with the charity’s logo. Bulgari will donate 95€ from every sale to support the Save the Children programs worldwide. Save the Children one-band sterling silver ring with black ceramic.\r\n\r\n",
                    Ref = "346090",
                    Title = "Save the Children one-band sterling silver ring with black ceramic",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Materials = await gSResourceDb.Materials.Where(x => x.Name == "Silver").ToListAsync(),

                },

                new Jewelry
                {
                    Name = "SERPENTI RING",
                    //Price = 2000,
                    //Size = "49",
                    Brand = "Bulgary",
                    Description = "A symbol of endless metamorphosis and mesmerising seduction, the Serpenti Viper wedding band in 18 kt rose gold blends irresistible sensuality with hypnotic design. Sophisticated and glamorous, in this thicker interpretation (height 6 mm) the ring coils around the finger with the precious beauty of its scales, conjuring the distinctive sinuosity of the snake.",
                    Ref = "358764",
                    Title = "Serpenti Viper wedding band in 18 kt rose gold (6 mm thick)",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Materials = await gSResourceDb.Materials.Where(x => x.Name == "RoseGold").ToListAsync(),

                },

                new Jewelry
                {
                    Name = "B.ZERO1 RING",
                    //Price = 1300,
                    //Size = "49",
                    Brand = "Bulgary",
                    Description = "Drawing its inspiration from the most renowned amphitheatre in the world, the Colosseum, the B.zero1 one-band ring in 18 kt yellow gold is a ground-breaking statement of Bulgari’s creative vision. Challenging the very essence of jewellery aesthetics, its distinctive spiral is reimagined in an unforeseen way, featuring the iconic BULGARI logo as a bold element of design.\r\nB.zero1 one-band ring in 18 kt yellow gold.\r\n\r\nRef.: 359610\r\n Material​: Yellow gold\r\n Gemstone: No Gemstones\r\n Size: 48\r\n Resizable: Not Resizable\r\n Made In: Italy\r\n How to wear\r\n",
                    Ref = "359610",
                    Title = "B.zero1 18 kt yellow gold one-band ring with openwork logo spiral\r\nSELECT SIZE",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Materials = await gSResourceDb.Materials.Where(x => x.Name == "YellowGold").ToListAsync()

                },

                new Jewelry
                {
                    Name = "DIVAS’ DREAM RING",
                    //Price = 4500,
                    Brand = "Bulgary",
                    Description = "A refined embodiment of Italian glamour, the DIVAS' DREAM 18 kt rose gold ring pays homage to the most fascinating divas with Roman spirit. Inspired by feminine elegance, its fan-shaped motif is rendered through malachite inserts framed by pavé diamonds: an unmistakable signature conjuring the sensual pattern of Rome’s Caracalla mosaics, in a tribute to timeless beauty.\r\nDIVAS' DREAM 18 kt rose gold ring with malachite inserts and pavé diamonds.",
                    Ref = "359037",
                    Title = "DIVAS' DREAM ring in 18 kt rose gold set with malachite elements and pavé diamonds",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Materials = await gSResourceDb.Materials.Where(x => x.Name == "RoseGold").ToListAsync(),
                    Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond" || x.Name == "Malacite").ToListAsync(),
                    DiamondCarat = 0.17

                },

                new Jewelry
                {
                    Name = "DIVAS’ DREAM RING",
                    //Price = 4500,
                    //Size = "49",
                    Brand = "Bulgary",
                    Description = "A refined embodiment of Italian glamour, the DIVAS' DREAM 18 kt rose gold ring pays homage to the most fascinating divas with Roman spirit. Inspired by feminine elegance, its fan-shaped motif is rendered through malachite inserts framed by pavé diamonds: an unmistakable signature conjuring the sensual pattern of Rome’s Caracalla mosaics, in a tribute to timeless beauty.\r\nDIVAS' DREAM 18 kt rose gold ring with malachite inserts and pavé diamonds.",
                    Ref = "359037",
                    Materials = await gSResourceDb.Materials.Where(x => x.Name == "RoseGold").ToListAsync(),
                    Title = "DIVAS' DREAM ring in 18 kt rose gold set with malachite elements and pavé diamonds",
                    //QuantkityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond" || x.Name == "Malacite").ToListAsync(),
                    DiamondCarat = 0.17

                },

                new Jewelry
                {
                    Name = "SERPENTI VIPER RING",
                    //Price = 5200,
                    //Size = "49",
                    Brand = "Bulgary",
                    Description = "An ultra-modern interpretation of Bvlgari’s famed icon of glamour and seduction, Serpenti Viper enchants with its innovative and cutting-edge design. Abstracting the mythical snake through geometric and sleek shapes, the ring coils around the finger striking with the precious beauty of the scales and with the distinctive sinuosity of the Serpenti collection.\r\nSerpenti Viper two-coil ring in 18 kt rose gold with demi-pavé diamonds.\r\n\r\n",
                    Ref = "357873",
                    Materials =  await gSResourceDb.Materials.Where(x => x.Name == "RoseGold").ToListAsync(),
                    Title = "Serpenti Viper two-coil 18 kt rose gold ring set with demi-pavé diamonds\r\nSELECT SIZE",
                    //QuantityInStock = 10,
                    ForGender = ForGender.Female,
                    Type = "ring",
                    Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond").ToListAsync(),
                    DiamondCarat = 0.1
                },

                 new Jewelry
                    {
                        Name = "Color Blossom Bb Multi-Motif Bracelet",
                        //Price = 10000,
                        //Sizes = new List<ProdutSize> { ProdutSize.L },
                        Brand = "LouisVilton",
                        Description = "",
                        Ref = "Q95698",
                        Title = "Color Blossom Bb Multi-Motif Bracelet, Pink Gold, Malachite And Diamonds",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "RoseGold") },
                        Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond" || x.Name == "Malacite").ToListAsync(),
                        DiamondCarat = 0.24
                    },

                    new Jewelry
                    {
                        Name = "Les Gastons Vuitton Trunk Bracelet",
                        //Price = 15400,
                        //Sizes = new List<ProdutSize> { ProdutSize.M, ProdutSize.L },
                        Brand = "LouisVilton",
                        Description = "The distinctive design of the Trunk Bracelet is a tribute to the memory of Louis Vuitton’s grandson Gaston-Louis Vuitton, a creator, a stylish dandy and a trunk collector. Crafted in radiant white gold, it features square trunk shapes accented with diamonds and engraved with the heritage Monogram signature. This timeless, elegant bracelet combines easily with other pieces from the Les Gastons Vuitton collection.",
                        Ref = "Q05836",
                        Title = "Les Gastons Vuitton Trunk Bracelet, White Gold and Diamonds",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = await gSResourceDb.Materials.Where(x => x.Name == "WhiteGold").ToListAsync(),
                        Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond").ToListAsync(),
                        DiamondCarat = 0.9
                    },
                    new Jewelry
                    {
                        Name = "Les Gastons Vuitton Gourmette Bracelet",
                        //Price = 6700,
                        //Sizes = new List<ProdutSize> { ProdutSize.M, ProdutSize.XL },
                        Brand = "LouisVilton",
                        Description = "Featured in the new Les Gastons Vuitton collection, the Gourmette Bracelet was inspired by the unique, multifaceted personality of Gaston-Louis Vuitton, the grandson of Louis Vuitton. Its hand-polished yellow gold links are laser-cut and engraved with the iconic Monogram Flowers and Initials, enhanced by a sophisticated sanded effect on the back side. A stunning contemporary jewel, and a tribute to the House’s heritage of fine craftsmanship.",
                        Ref = "Q05804",
                        Title = "Les Gastons Vuitton Gourmette Bracelet, Yellow Gold",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "YellowGold") }
                    },




                    new Jewelry
                    {
                        Name = "Cuban Chain Bracelet",
                        //Price = 15800,
                        //Sizes = new List<ProdutSize> { ProdutSize.M, ProdutSize.L },
                        Brand = "LouisVilton",
                        Description = "The Maison’s Cuban Chain bracelet makes a strong style statement with its bold, modern design. Forged from 18-karat yellow gold, the substantial links are meticulously set with fiery white diamonds. Refined Monogram openwork and engraved House emblems make this a luxurious signature piece. The invisible clasp blends into the bracelet, for a sleek, seamless effect.",
                        Ref = "Q05816",
                        Title = "Cuban Chain Bracelet, Yellow Gold and Diamonds",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "YellowGold") },
                        Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond").ToListAsync(),
                        DiamondCarat = 1.72
                    },

                  new Jewelry
                    {
                        Name = "Ever Blossom Bracelet",
                        //Price = 19500,
                        //Sizes = new List<ProdutSize> { ProdutSize.M, ProdutSize.L },
                        Brand = "LouisVilton",
                        Description = "A dazzling jewel that emanates contemporary elegance and refinement, the Ever Blossom bracelet pays tribute to an eternal House icon. Three Monogram Flowers are joined by a finely crafted chain, all in white gold and encrusted with hand-selected diamonds. The perfectly symmetrical design is enhanced by a seamlessly integrated clasp and delicate openwork on the back of each flower.",
                        Ref = "Q05618",
                        Title = "Ever Blossom Bracelet, White Gold & Diamonds",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "WhiteGold") },
                        Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond").ToListAsync(),
                        DiamondCarat = 1.9
                    },
                    new Jewelry
                    {
                        Name = "Ever Blossom Bracelet",
                        //Price = 5000,
                        //Sizes = new List<ProdutSize> { ProdutSize.L },
                        Brand = "LouisVilton",
                        Description = "The Ever Blossom bracelet reinterprets the Maison’s iconic Monogram Flower in 18-karat yellow gold set with lustrous onyx and blazing diamonds. Stones and precious metal merge in the domed silhouette of the central motif for a modern, contrasted effect. The clasp is designed to blend into the bracelet’s distinctive chain, for a seamlessly elegant aesthetic.",
                        Ref = "Q95929",
                        Title = "Ever Blossom Bracelet, Yellow Gold, Onyx & Diamonds",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "YellowGold") },
                        Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond" || x.Name == "Onyx").ToListAsync(),
                        DiamondCarat = 0.5
                    },

                   new Jewelry
                    {
                        Name = "Empreinte Bangle",
                        //Price = 7000,
                        //Sizes = new List<ProdutSize> { ProdutSize.S, ProdutSize.L, ProdutSize.M },
                        Brand = "LouisVilton",
                        Description = "This Empreinte bracelet cast from 18-karat pink gold features a bold, double-row design. The nail-head imprints on one row – inspired by the Maison’s historic trunks – are set with brilliant diamonds. Placed at the center of the piece, the iconic LV Initials conceal the bracelet’s clasp. Striking when worn solo, the bangle may be stacked with others for a contemporary allure.",
                        Ref = "Q05344",
                        Title = "Empreinte Bangle, Pink Gold And Diamonds",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "RoseGold") },
                        Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond").ToListAsync(),
                        DiamondCarat = 0.8
                    },

                    new Jewelry
                    {
                        Name = "Empreinte Bangle",
                        //Price = 16300,
                        //Sizes = new List<ProdutSize> { ProdutSize.S, ProdutSize.L, ProdutSize.M },
                        Brand = "LouisVilton",
                        Description = "This edition of the Empreinte bangle is cast from 18-kt yellow gold, enriched with fiery diamond pavé. Trunk-nail imprints give it a modern allure, while subtly referencing House history. The LV Initials serve as the clasp of this sparkling hinged bracelet, which can be stacked with other pieces for a look that is both luxe and relaxed.",
                        Ref = "Q95783",
                        Title = "Empreinte Bangle, Yellow Gold And Pave Diamonds",
                        //QuantkityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "YellowGold") },
                        Gemstones = await gSResourceDb.Gemstones.Where(x => x.Name == "Diamond").ToListAsync(),
                        DiamondCarat = 1.8
                    },

                    new Jewelry
                    {
                        Name = "Silver Lockit Beads Bracelet",
                        //Price = 1200,
                        //Sizes = new List<ProdutSize> { ProdutSize.S, ProdutSize.L, ProdutSize.M },
                        Brand = "LouisVilton",
                        Description = "Louis Vuitton pays tribute to childhood with a fresh interpretation of the Silver Lockit bracelet in support of UNICEF. The new design features a miniature LV padlock and six beads, all cast from sterling silver, set on an adjustable cord. A stylish, unisex piece, the bracelet can be worn alone or in multiples. A most meaningful gift, with each purchase $150 is donated to UNICEF to help children in urgent need.",
                        Ref = "Q05729",
                        Title = "Silver Lockit Beads Bracelet, Silver and Black Polyester Cord",
                        //QuantityInStock = 10,
                        ForGender = ForGender.Female,
                        Type = "bracelete",
                        Materials = new List<Material> { await gSResourceDb.Materials.FirstOrDefaultAsync(x => x.Name == "Silver") }
                    }


            };
                await gSResourceDb.Jewelleries.AddRangeAsync(rings);
                var result = await gSResourceDb.SaveChangesAsync() > 0;
                //if (!result) throw new Exception("Problem save to database");

            }

            if (!gSResourceDb.Images.Any())
            {
                var images = new List<Image>
                {
                    new Image { Url = "/images/product/ring/bvlRing1.avif", ProductId = 1},
                    new Image { Url = "/images/product/ring/bvlRing2.avif", ProductId = 2},
                    new Image { Url = "/images/product/ring/bvlRing3.avif", ProductId = 3},
                    new Image { Url = "/images/product/ring/bvlRing4.avif", ProductId = 4},
                    new Image { Url = "/images/product/ring/bvlRing5.avif", ProductId = 5},
                    new Image { Url = "/images/product/ring/bvlRing6.avif", ProductId = 6},
                    new Image { Url = "/images/product/ring/bvlRing7.avif", ProductId = 7},
                    new Image { Url = "/images/product/ring/bvlRing8.avif", ProductId = 8},
                    new Image { Url = "/images/product/ring/bvlRing9.avif", ProductId = 9},
                    new Image { Url = "images/product/bracelete/louisBracelete1.avif", ProductId = 10},
                    new Image { Url = "images/product/bracelete/louisBracelete2.avif", ProductId = 11},
                    new Image { Url = "images/product/bracelete/louisBracelete3.avif", ProductId = 12},
                    new Image { Url = "images/product/bracelete/louisBracelete4.avif", ProductId = 13},
                    new Image { Url = "images/product/bracelete/louisBracelete5.avif", ProductId = 14},
                    new Image { Url = "images/product/bracelete/louisBracelete6.avif", ProductId = 15},
                    new Image { Url = "images/product/bracelete/louisBracelete7.avif", ProductId = 16},
                    new Image { Url = "images/product/bracelete/louisBracelete8.avif", ProductId = 17},
                    new Image { Url = "images/product/bracelete/louisBracelete9.avif", ProductId = 18}
                };

                await gSResourceDb.Images.AddRangeAsync(images);
                await gSResourceDb.SaveChangesAsync();
            }



            //if (!gSResourceDb.Braceletes.Any())
            //{
            //    var braceletes = new List<Bracelete>
            //    {

            //    };

            //    await gSResourceDb.Braceletes.AddRangeAsync(braceletes);





            //}
        }
    }
}


