using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
  public class PageSingalConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.PageSingal>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.PageSingal> builder)
    {
      builder.ToTable("PageSingals");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Code);
      builder.Property(x => x.Name);
      builder.Property(x => x.Title);
      builder.Property(x => x.Content);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);

    }
  }
}
