using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
  public class ProvinceConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.Province>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.Province> builder)
    {
      builder.ToTable("Provinces");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Code);
      builder.Property(x => x.CodeName);
      builder.Property(x => x.Name);
      builder.Property(x => x.Division_Type);
      builder.Property(x => x.Phone_Code);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);

    }
  }
}
