using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.User;
using Common.Share.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.PatientRecord
{
    public class PatientRecordDetailDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
        public Guid? MedicalExaminationScheduleId { get; set; }
        public bool? Emergency { get; set; }
        public MedicalExaminationScheduleDto? MedicalExaminationSchedule { get; set; }
        public string UserId { get; set; }
        public PatientRecordServiceStatus PatientRecordServiceStatus { get; set; }
        public UserDto User { get; set; }
    }
}
