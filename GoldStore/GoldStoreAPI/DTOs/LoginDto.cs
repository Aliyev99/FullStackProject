using System.ComponentModel.DataAnnotations;

namespace GoldStoreAPI.DTOs
{
    public class LoginDto
    {
        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

    }
}
