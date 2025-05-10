using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoldStoreAPI.Data.Migrations.ResourceDb
{
    /// <inheritdoc />
    public partial class SiseColumnAddedToBasket : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Size",
                table: "BasketItems",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Size",
                table: "BasketItems");
        }
    }
}
