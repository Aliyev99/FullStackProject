using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoldStoreAPI.Data.Migrations.ResourceDb
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Gemstones",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gemstones", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jewelleries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Weight = table.Column<double>(type: "float", nullable: false),
                    ForGender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DiamondCarat = table.Column<double>(type: "float", nullable: true),
                    JewelryType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AvailableSizes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ref = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: false),
                    QuantityInStock = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    Brand = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jewelleries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Materials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Materials", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GemstoneJewelry",
                columns: table => new
                {
                    GemstonesId = table.Column<int>(type: "int", nullable: false),
                    JewelleriesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GemstoneJewelry", x => new { x.GemstonesId, x.JewelleriesId });
                    table.ForeignKey(
                        name: "FK_GemstoneJewelry_Gemstones_GemstonesId",
                        column: x => x.GemstonesId,
                        principalTable: "Gemstones",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GemstoneJewelry_Jewelleries_JewelleriesId",
                        column: x => x.JewelleriesId,
                        principalTable: "Jewelleries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    JewelryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Images_Jewelleries_JewelryId",
                        column: x => x.JewelryId,
                        principalTable: "Jewelleries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JewelryMaterial",
                columns: table => new
                {
                    JewelleriesId = table.Column<int>(type: "int", nullable: false),
                    MaterialsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JewelryMaterial", x => new { x.JewelleriesId, x.MaterialsId });
                    table.ForeignKey(
                        name: "FK_JewelryMaterial_Jewelleries_JewelleriesId",
                        column: x => x.JewelleriesId,
                        principalTable: "Jewelleries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JewelryMaterial_Materials_MaterialsId",
                        column: x => x.MaterialsId,
                        principalTable: "Materials",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GemstoneJewelry_JewelleriesId",
                table: "GemstoneJewelry",
                column: "JewelleriesId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_JewelryId",
                table: "Images",
                column: "JewelryId");

            migrationBuilder.CreateIndex(
                name: "IX_JewelryMaterial_MaterialsId",
                table: "JewelryMaterial",
                column: "MaterialsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GemstoneJewelry");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "JewelryMaterial");

            migrationBuilder.DropTable(
                name: "Gemstones");

            migrationBuilder.DropTable(
                name: "Jewelleries");

            migrationBuilder.DropTable(
                name: "Materials");
        }
    }
}
