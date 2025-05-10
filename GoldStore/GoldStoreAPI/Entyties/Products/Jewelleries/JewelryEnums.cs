using System.Text.Json.Serialization;

namespace GoldStoreAPI.Entyties.Products.Jewelleries
{
    //public enum Brand
    //{
    //    Bulgary,
    //    TiffanyAndCo,
    //    RobertoCoin,
    //    Cartier,
    //    Botega,
    //    LouisVuitton
    //}

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ProdutSize
    {
        S, M, L, XL
    }


    public enum ForGender
    {
        Male,
        Female,
        Unisex
    }



    //public enum Stone
    //{
    //    Diamond,
    //    Amethyst,
    //    Emeralds,
    //    Jade,
    //    Rubilette,
    //    PinkRubilette,
    //    Carnelian,
    //    Onyx,
    //    PinkTourmaline,
    //    Malacite,
    //    Aquamarine
    //}





    //public enum ContentMaterial
    //{
    //    YellowGold, 
    //    RoseGold,
    //    WhiteGold,
    //    Silver,
    //    Other
    //}

}
