using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Share.Enum;

namespace Portal.Domain.Entities
{
    public class MedicalExaminationSchedule : EntityAuditBase<Guid>, IEntityBase<Guid>
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public DateTime? DayOfExamination { get; set; } // Khong dung
        public DateTime TimeOfExamination { get; set; }
        public string Reason { get; set; }
        public string AppUserId { get; set; }
        public PatientReceptionStatusEnum PatientReceptionStatus { get; set; }
        
    }
}
