using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoldStoreAPI.Data.Migrations.ResourceDb
{
    /// <inheritdoc />
    public partial class ProductPricePropAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "ProductSize");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Products",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Products");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "ProductSize",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }
    }
}
