using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ServerAPI.Models.Mappings
{
    public class ClientBranchMapping : IEntityTypeConfiguration<ClientBranch>
    {
        public void Configure(EntityTypeBuilder<ClientBranch> builder)
        {
            builder.ToTable("ClientBranch");
            builder.HasKey(c => c.ClientBranchID);
            builder.Property(c => c.ClientBranchID).HasColumnName("ClientBranchID");
            builder.Property(c => c.Country).HasColumnName("Country")
               .HasMaxLength(50)
               .IsRequired();
            builder.Property(c => c.City).HasColumnName("City")
               .HasMaxLength(50)
               .IsRequired();
            builder.Property(c => c.ClientBranchName).HasColumnName("ClientBranchName")
                .HasMaxLength(50)
                .IsRequired();

            builder.Property(c => c.Latitude).HasColumnName("Latitude")
                .HasMaxLength(6)
                .IsRequired();

            builder.Property(c => c.Longitude).HasColumnName("Longitude")
                 .HasMaxLength(6)
                .IsRequired();

            builder.Property(c => c.Altitude).HasColumnName("Altitude")
                .HasMaxLength(6)
                .IsRequired();

            builder.Property(c => c.UpdatedAt).HasColumnName("UpdatedAt")
                .IsRequired();

            builder.Property(c => c.CreatedAt).HasColumnName("CreatedAt")
                .IsRequired();
        }
    }
}
