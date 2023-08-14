using Common.Dtos.CaringInfo;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.MedicalExaminationService;
using Common.Dtos.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.PatientRecord
{
    public class PatientRecordDto
    {
        public Guid Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public bool? Emergency { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public Guid? MedicalExaminationScheduleId { get; set; }
        public MedicalExaminationScheduleDto? MedicalExaminationSchedule { get; set; }
        public string UserId { get; set; }
        public UserDto User { get; set; }
        public List<MedicalExaminationServiceDto> Service { get; set; }
        public CaringInfoDto CaringInfo { get; set; }
    }
}
