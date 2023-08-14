using Common.Dtos.User;
using Common.Share.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.MedicalExaminationSchedule
{
  public class MedicalExaminationScheduleDto
  {
    public Guid Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public DateTime TimeOfExamination { get; set; }
    public string Reason { get; set; }
    public string AppUserId { get; set; }
    public string CreateBy { get; set; }
    public UserDto User { get; set; }
    public UserDto? UserCreateBy { get; set; }
    public PatientReceptionStatusEnum PatientReceptionStatus { get; set; }
  }
}
