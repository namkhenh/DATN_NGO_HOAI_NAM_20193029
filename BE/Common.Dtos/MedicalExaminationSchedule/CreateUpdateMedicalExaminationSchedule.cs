using Common.Share.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.MedicalExaminationSchedule
{
    public class CreateUpdateMedicalExaminationSchedule
    {
        public Guid? Id { get; set; }
        public DateTime TimeOfExamination { get; set; }
        public string Reason { get; set; }
        public string AppUserId { get; set; }
        public PatientReceptionStatusEnum PatientReceptionStatus { get; set; }
    }
}
