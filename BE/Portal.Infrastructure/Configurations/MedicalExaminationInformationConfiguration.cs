using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
  public class MedicalExaminationInformationConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.MedicalExaminationInformation>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.MedicalExaminationInformation> builder)
    {
      builder.ToTable("MedicalExaminationInformations");
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);

    }
  }
}
