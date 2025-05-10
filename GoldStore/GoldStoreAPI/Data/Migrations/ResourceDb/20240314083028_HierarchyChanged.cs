using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GoldStoreAPI.Data.Migrations.ResourceDb
{
    /// <inheritdoc />
    public partial class HierarchyChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GemstoneJewelry_Jewelleries_JewelleriesId",
                table: "GemstoneJewelry");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Jewelleries_JewelryId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_JewelryMaterial_Jewelleries_JewelleriesId",
                table: "JewelryMaterial");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Jewelleries",
                table: "Jewelleries");

            migrationBuilder.RenameTable(
                name: "Jewelleries",
                newName: "Products");

            migrationBuilder.RenameColumn(
                name: "JewelryId",
                table: "Images",
                newName: "ProductId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_JewelryId",
                table: "Images",
                newName: "IX_Images_ProductId");

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "Products",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<string>(
                name: "JewelryType",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "ForGender",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ProductType",
                table: "Products",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Products",
                table: "Products",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GemstoneJewelry_Products_JewelleriesId",
                table: "GemstoneJewelry",
                column: "JewelleriesId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Products_ProductId",
                table: "Images",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JewelryMaterial_Products_JewelleriesId",
                table: "JewelryMaterial",
                column: "JewelleriesId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_GemstoneJewelry_Products_JewelleriesId",
                table: "GemstoneJewelry");

            migrationBuilder.DropForeignKey(
                name: "FK_Images_Products_ProductId",
                table: "Images");

            migrationBuilder.DropForeignKey(
                name: "FK_JewelryMaterial_Products_JewelleriesId",
                table: "JewelryMaterial");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Products",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductType",
                table: "Products");

            migrationBuilder.RenameTable(
                name: "Products",
                newName: "Jewelleries");

            migrationBuilder.RenameColumn(
                name: "ProductId",
                table: "Images",
                newName: "JewelryId");

            migrationBuilder.RenameIndex(
                name: "IX_Images_ProductId",
                table: "Images",
                newName: "IX_Images_JewelryId");

            migrationBuilder.AlterColumn<double>(
                name: "Weight",
                table: "Jewelleries",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "JewelryType",
                table: "Jewelleries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ForGender",
                table: "Jewelleries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Jewelleries",
                table: "Jewelleries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_GemstoneJewelry_Jewelleries_JewelleriesId",
                table: "GemstoneJewelry",
                column: "JewelleriesId",
                principalTable: "Jewelleries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Images_Jewelleries_JewelryId",
                table: "Images",
                column: "JewelryId",
                principalTable: "Jewelleries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_JewelryMaterial_Jewelleries_JewelleriesId",
                table: "JewelryMaterial",
                column: "JewelleriesId",
                principalTable: "Jewelleries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
