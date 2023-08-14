using Common.Dtos.MedicalExaminationSchedule;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.PatientRecord
{
    public class CreateUpdatePatientRecord
    {
        public Guid? Id { get; set; }   
        public Guid? MedicalExaminationScheduleId { get; set; }
        public bool? Emergency { get; set; }
        public string UserId { get; set; }
    }
}
