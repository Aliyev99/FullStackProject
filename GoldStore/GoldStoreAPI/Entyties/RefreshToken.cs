﻿namespace GoldStoreAPI.Entyties
{
    public class RefreshToken
    {
        public int Id { get; set; }


        public string Token { get; set; }

        public DateTime ExpireDate { get; set; }

        public User User { get; set; }
        public int UserId { get; set; }
    }
}
