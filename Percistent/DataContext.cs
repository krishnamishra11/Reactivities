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
        public DbSet<UserActivity> UserActivities { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder   )
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Value>().HasData(
                 new Value{ Id=1,Name="Value 101" });
            modelBuilder.Entity<Value>().HasData(
                 new Value{ Id=2,Name="Value 102" });
            modelBuilder.Entity<Value>().HasData(
                 new Value{ Id=3,Name="Value 103" });  

            modelBuilder.Entity<UserActivity>(x=>x.HasKey(ua=>new {ua.AppUserId,ua.ActivityId}));

            modelBuilder.Entity<UserActivity>()
            .HasOne(u=>u.AppUser)
            .WithMany(a=>a.UserActivities)
            .HasForeignKey(u=>u.AppUserId);
              modelBuilder.Entity<UserActivity>()
            .HasOne(a=>a.Activity)
            .WithMany(u=>u.UserActivities)
            .HasForeignKey(u=>u.ActivityId);                                     
        }

    }
}