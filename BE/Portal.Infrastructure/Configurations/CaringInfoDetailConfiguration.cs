using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
  public class CaringInfoDetailConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.CaringInfoDetail>
  {
    public void Configure(EntityTypeBuilder<Portal.Domain.Entities.CaringInfoDetail> builder)
    {
      builder.ToTable("CaringInfoDetails");
      builder.HasKey(x => x.Id);
      builder.Property(x => x.Body);
      builder.Property(x => x.BodyPart);
      builder.Property(x => x.CaringInfoId);
      builder.Property(x => x.PatientRecordServiceId);
      builder.Property(x => x.PreliminaryDiagnosis);
      builder.Property(x => x.ComorbiditiesDiagnosis);
      builder.Property(x => x.ExamStartTime);
      builder.Property(x => x.ExamEndTime);
      builder.Property(x => x.Conclude);
      builder.Property(x => x.ICD10);
      builder.Property(x => x.DiseasesInclude);
      builder.Property(x => x.HealthCondition);
      builder.Property(x => x.CreatedDate);
      builder.Property(x => x.LastModifiedDate);
      builder.Property(x => x.DeleteAt);
      builder.Property(x => x.CreateBy);
    }
  }
}
