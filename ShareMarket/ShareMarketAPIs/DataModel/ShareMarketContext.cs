using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ShareMarketAPIs.DataModel
{
    public class ShareMarketContext : DbContext
    {
        public ShareMarketContext(DbContextOptions<ShareMarketContext> options) : base(options)
        {

        }
        public DbSet<Users> Users { get; set; }

        
    }
}
