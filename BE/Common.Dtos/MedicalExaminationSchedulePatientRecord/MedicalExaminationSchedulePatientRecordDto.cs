using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.MedicalExaminationService;
using Common.Dtos.PatientRecord;
using Portal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.MedicalExaminationSchedulePatientRecord
{
    public class MedicalExaminationSchedulePatientRecordDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public Guid PatientRecordId { get; set; }
        public PatientRecordDto PatientRecord { get; set; }
        public Guid MedicalExaminationServiceId { get; set; }
        public MedicalExaminationServiceDto MedicalExaminationService { get; set; }
        public PatientServiceEnum PatientServiceStatus { get; set; }
    }
}
