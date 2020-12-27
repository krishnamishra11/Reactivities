using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Percistent
{
    public class DataContext:IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions dbContextOptions ):base(dbContextOptions)
        {
            
        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder   )
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Value>().HasData(
                 new Value{ Id=1,Name="Value 101" });
            modelBuilder.Entity<Value>().HasData(
                 new Value{ Id=2,Name="Value 102" });
            modelBuilder.Entity<Value>().HasData(
                 new Value{ Id=3,Name="Value 103" });                                  
        }

    }
}