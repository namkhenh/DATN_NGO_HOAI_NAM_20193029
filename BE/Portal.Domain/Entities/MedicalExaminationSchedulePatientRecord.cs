using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Portal.Domain.Enums;

namespace Portal.Domain.Entities
{
    public class MedicalExaminationSchedulePatientRecord : EntityAuditBase<Guid>, IEntityBase<Guid>
    {
        public Guid PatientRecordId { get; set; }
        public Guid MedicalExaminationServiceId { get; set; }
        public Guid CaringInfoId { get; set; }
        public PatientServiceEnum PatientServiceStatus { get; set; } = PatientServiceEnum.None;
    }
}
