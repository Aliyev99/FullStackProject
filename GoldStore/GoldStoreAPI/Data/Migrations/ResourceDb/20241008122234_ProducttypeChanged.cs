using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoldStoreAPI.Data.Migrations.ResourceDb
{
    /// <inheritdoc />
    public partial class ProducttypeChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JewelryType",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Type",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "JewelryType",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
