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
            builder.Property(c => c.Summary).HasColumnName("Summary")
              .HasMaxLength(50);
            builder.Property(c => c.Name).HasColumnName("Name")
               .HasMaxLength(50);
            builder.Property(c => c.Code).HasColumnName("Code");
            builder.Property(c => c.Temperature).HasColumnName("Temperature")
                .HasMaxLength(6);
            builder.Property(c => c.Temp_Max).HasColumnName("Temp_Min")
                .HasMaxLength(6);
            builder.Property(c => c.Temp_Max).HasColumnName("Temp_Max")
                .HasMaxLength(6);
            builder.Property(c => c.Latitude).HasColumnName("Latitude")
               .HasMaxLength(6);
            builder.Property(c => c.Longitude).HasColumnName("Longitude")
               .HasMaxLength(6);
            builder.Property(c => c.Humidity).HasColumnName("Humidity")
                .HasMaxLength(3);
            builder.Property(c => c.Clouds).HasColumnName("Clouds")
                .HasMaxLength(3);
            builder.Property(c => c.Pressure).HasColumnName("Pressure")
                .HasMaxLength(5);
            builder.Property(c => c.WindDirection).HasColumnName("WindDirection")
                .HasMaxLength(5);
            builder.Property(c => c.WindSpeed).HasColumnName("WindSpeed")
                .HasMaxLength(6);
        }
    }
}
