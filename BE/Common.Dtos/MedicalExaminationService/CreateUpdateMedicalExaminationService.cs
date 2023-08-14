using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.MedicalExaminationService
{
  public class CreateUpdateMedicalExaminationService
  {
    public Guid? Id { get; set; }
    public string Code { get; set; }
    public string Name { get; set; }
    public Guid DepartmentId { get; set; }
    public decimal AmountOfMoney { get; set; }
  }
}
