using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Portal.Domain.Entities;

namespace Portal.Infrastructure.Configurations
{
  public class PermissionActionConfiguration : IEntityTypeConfiguration<PermissionAction>
  {
    public void Configure(EntityTypeBuilder<PermissionAction> builder)
    {
      builder.ToTable("PermissionActions");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Code);
      builder.Property(x => x.PermissionId);
      builder.Property(x => x.ActionId);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);


    }
  }
}
