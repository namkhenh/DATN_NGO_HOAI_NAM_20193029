using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Infrastructure.Configurations
{
    public class CaringInfoConfiguration : IEntityTypeConfiguration<Portal.Domain.Entities.CaringInfo>
    {
        public void Configure(EntityTypeBuilder<Portal.Domain.Entities.CaringInfo> builder)
        {
            builder.ToTable("CaringInfos");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.PatientRecordId);
            builder.Property(x => x.Circuit);
            builder.Property(x => x.Temperature);
            builder.Property(x => x.BloodPressure);
            builder.Property(x => x.Breathing);
            builder.Property(x => x.Height);
            builder.Property(x => x.Weight);
            builder.Property(x => x.BMI);
            builder.Property(x => x.PersonalHistory);
            builder.Property(x => x.FamilyHistory);
            builder.Property(x => x.DrugAlergy);
            builder.Property(x => x.PathologicalProcess);
            builder.Property(x => x.CreatedDate);
            builder.Property(x => x.LastModifiedDate);
            builder.Property(x => x.DeleteAt);
            builder.Property(x => x.CreateBy);
        }
    }
}