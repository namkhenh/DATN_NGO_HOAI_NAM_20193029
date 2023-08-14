using Common.Contract.Domain.Interfaces;
using Common.Contract.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Domain.Entities
{
    public class Payment: EntityAuditBase<Guid>, IEntityBase<Guid>
    {
        public Guid MedicalExaminationSchedulePatientRecordId { get; set; }
    }
}
