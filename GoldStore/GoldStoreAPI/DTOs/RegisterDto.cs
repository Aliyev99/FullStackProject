using System.ComponentModel.DataAnnotations;

namespace GoldStoreAPI.DTOs
{
    public class RegisterDto
    {
        [Required]
        [MaxLength(100)]
        public string FullName { get; set; }

        [Required]
        [MaxLength(200)]
        public string Username { get; set; }


        [Required]
        [EmailAddress]
        [MaxLength(200)]
        public string Email { get; set; }
        
        [Required]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }

        [Required]
        public DateTime Birthday { get; set; }
    }
}
