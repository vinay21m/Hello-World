﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace ServiceModel.Models
{
    public class UserModel
    {
        public long UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string UserType { get; set; }
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Zip { get; set; }
    }
}
