namespace GoldStoreAPI.DTOs
{
    public class UserDTO
    {
        public string? Country { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public BasketDTO? Basket { get; set; }
    }
}
