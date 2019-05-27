using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ServerAPI.Models.Mappings
{
    public class WeatherMapping : IEntityTypeConfiguration<Weather>
    {
        public void Configure(EntityTypeBuilder<Weather> builder)
        {
            builder.ToTable("Weather");
            builder.HasKey(c => c.WeatherID);
            builder.Property(c => c.WeatherID).HasColumnName("WeatherID");

            builder.Property(c => c.Country).HasColumnName("Country")
                .HasMaxLength(30)
                .IsRequired();
            builder.Property(c => c.Temperature).HasColumnName("Temperature")
                .HasMaxLength(6)
                .IsRequired();
            builder.Property(c => c.Humidity).HasColumnName("Humidity")
                .HasMaxLength(3)
                .IsRequired();
            builder.Property(c => c.Clouds).HasColumnName("Clouds")
                .HasMaxLength(3)
                .IsRequired();
            builder.Property(c => c.Pressure).HasColumnName("Pressure")
                .HasMaxLength(5)
                .IsRequired();
            builder.Property(c => c.WindDirection).HasColumnName("WindDirection")
                .HasMaxLength(5)
                .IsRequired();
            builder.Property(c => c.WindSpeed).HasColumnName("WindSpeed")
                .HasMaxLength(6)
                .IsRequired();
        }
    }
}
