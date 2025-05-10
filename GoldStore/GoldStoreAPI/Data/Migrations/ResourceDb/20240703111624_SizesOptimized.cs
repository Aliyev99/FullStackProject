using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoldStoreAPI.Data.Migrations.ResourceDb
{
    /// <inheritdoc />
    public partial class SizesOptimized : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "QuantityBySize",
                table: "Products",
                newName: "Sizes");

            migrationBuilder.AddColumn<string>(
                name: "Quantities",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantities",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "Sizes",
                table: "Products",
                newName: "QuantityBySize");
        }
    }
}
