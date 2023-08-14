using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace Portal.Infrastructure.Configurations
{
    public class MedicalExaminationSchedulePatientRecordConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord>
    {
        public void Configure(EntityTypeBuilder<Portal.Domain.Entities.MedicalExaminationSchedulePatientRecord> builder)
        {
            builder.ToTable("MedicalExaminationSchedulePatientRecords");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.PatientRecordId);
            builder.Property(x => x.MedicalExaminationServiceId);
            builder.Property(x => x.CreatedDate);
            builder.Property(x => x.LastModifiedDate);
            builder.Property(x => x.DeleteAt);
            builder.Property(x => x.CreateBy);
            builder.Property(x => x.PatientServiceStatus);
        }
    }
}
