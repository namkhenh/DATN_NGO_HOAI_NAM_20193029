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
  public class AppUserDepartmentConfiguration : IEntityTypeConfiguration<AppUserDepartment>
  {
    public void Configure(EntityTypeBuilder<AppUserDepartment> builder)
    {
      builder.ToTable("AppUserDepartments");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.AppUserId);
      builder.Property(x => x.DepartmentId);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);

    }
  }
}
