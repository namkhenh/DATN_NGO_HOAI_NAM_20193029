using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.MedicalExaminationScheduleService
{
  public class MedicalExaminationScheduleServiceDto
  {
    public Guid Id { get; set; }
    public Guid MedicalExaminationScheduleId { get; set; }
    public Guid MedicalExaminationServiceId { get; set; }
  }
}
