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
    public class PatientRecordConfiguration : IEntityTypeConfiguration<PatientRecord>
    {
        public void Configure(EntityTypeBuilder<PatientRecord> builder)
        {
            builder.ToTable("PatientRecords");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Code);
            builder.Property(x => x.Name);
            builder.Property(x => x.MedicalExaminationScheduleId);
            builder.Property(x => x.Emergency);
            builder.Property(x => x.UserId);
            builder.Property(x => x.CreatedDate);
            builder.Property(x => x.LastModifiedDate);
            builder.Property(x => x.DeleteAt);
            builder.Property(x => x.CreateBy);

        }
    }
}
