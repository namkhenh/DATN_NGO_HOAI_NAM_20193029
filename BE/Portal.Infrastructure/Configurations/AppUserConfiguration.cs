using DnsClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
  public class AppUserConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.AppUser>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.AppUser> builder)
    {
      builder.ToTable("AppUsers");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Code);
      builder.Property(x => x.Status);
      builder.Property(x => x.FullName);
      builder.Property(x => x.Adress);
      builder.Property(x => x.ProvinceId);
      builder.Property(x => x.DistrictId);
      builder.Property(x => x.WardId);
      builder.Property(x => x.Description);
      builder.Property(x => x.Sex);
      builder.Property(x => x.Religion);
      builder.Property(x => x.Age);
      builder.Property(x => x.DateOfBirth);
      builder.Property(x => x.CMND);
      builder.Property(x => x.GuardiasName);
      builder.Property(x => x.GuardiansPhoneNumber);
      builder.Property(x => x.Relationship);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);
    }
  }
}
