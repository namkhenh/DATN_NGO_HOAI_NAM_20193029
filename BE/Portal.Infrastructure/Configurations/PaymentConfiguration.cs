using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
  public class PaymentConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.Payment>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.Payment> builder)
    {
      builder.ToTable("Payments");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.MedicalExaminationSchedulePatientRecordId);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);

    }
  }
}
