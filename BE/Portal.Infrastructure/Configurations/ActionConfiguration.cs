using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
namespace Portal.Infrastructure.Configurations
{
  public class ActionConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.Action>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.Action> builder)
    {
      builder.ToTable("Actions");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.MenuId);
      builder.Property(x => x.Code);
      builder.Property(x => x.Path);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);
    }
  }
}
