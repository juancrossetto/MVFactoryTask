using Microsoft.EntityFrameworkCore;
using ServerAPI.Models.Mappings;
using System.ComponentModel.DataAnnotations.Schema;

namespace ServerAPI.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {

        }

        public DbSet<ClientBranch> ClientBranches { get; set; }
        public DbSet<Weather> Weathers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ClientBranch>()
                        .HasOne(c => c.Weather);

            //Initialize All mappings
            modelBuilder.ApplyConfiguration(new ClientBranchMapping());
            modelBuilder.ApplyConfiguration(new WeatherMapping());
        }
    }
}
