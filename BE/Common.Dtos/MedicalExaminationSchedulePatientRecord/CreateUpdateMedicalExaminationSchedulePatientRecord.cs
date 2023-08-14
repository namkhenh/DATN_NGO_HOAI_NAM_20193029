using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.MedicalExaminationSchedulePatientRecord
{
    public class CreateUpdateMedicalExaminationSchedulePatientRecord
    {
        public Guid? Id { get; set; }
        public Guid PatientRecordId { get; set; }
        public Guid MedicalExaminationServiceId { get; set; }
    }
}
