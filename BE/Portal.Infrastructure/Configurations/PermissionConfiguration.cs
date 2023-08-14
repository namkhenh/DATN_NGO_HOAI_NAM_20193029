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
  public class PermissionConfiguration : IEntityTypeConfiguration<Permission>
  {
    public void Configure(EntityTypeBuilder<Permission> builder)
    {
      builder.ToTable("Permissions");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Code);
      builder.Property(x => x.Name);
      builder.Property(x => x.Path);
      builder.Property(x => x.Status);
      builder.Property(x => x.StartDate);
      builder.Property(x => x.EndDate);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);
    }
  }
}
