using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
    public class MedicalExaminationScheduleConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.MedicalExaminationSchedule>
    {
        public void Configure(EntityTypeBuilder<Portal.Domain.Entities.MedicalExaminationSchedule> builder)
        {
            builder.ToTable("MedicalExaminationSchedules");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Code);
            builder.Property(x => x.Name);
            builder.Property(x => x.DayOfExamination);
            builder.Property(x => x.TimeOfExamination);
            builder.Property(x => x.Reason);
            builder.Property(x => x.AppUserId);
            builder.Property(x => x.PatientReceptionStatus);
            builder.Property(x => x.CreatedDate);
            builder.Property(x => x.LastModifiedDate);
            builder.Property(x => x.DeleteAt);
            builder.Property(x => x.CreateBy);

        }
    }
}
