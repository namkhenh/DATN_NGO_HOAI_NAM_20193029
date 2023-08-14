using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
    public class PatientRecord : EntityAuditBase<Guid>, IEntityBase<Guid> // hồ sơ bệnh nhân 
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public bool? Emergency { get; set; }
        public Guid? MedicalExaminationScheduleId { get; set; }
        public string UserId { get; set; }
    }
}
