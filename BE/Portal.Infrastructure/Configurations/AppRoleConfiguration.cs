using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
  public class AppRoleConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.AppRole>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.AppRole> builder)
    {
      builder.ToTable("AppRoles");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Code);
      builder.Property(x => x.Status);
      builder.Property(x => x.StartDate);
      builder.Property(x => x.EndDate);
      builder.Property(x => x.Description);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);

    }
  }
}
