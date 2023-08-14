using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.CaringInfo
{
  public class CreateUpdateCaringInfo
  {
    public Guid? Id { get; set; }
    public Guid PatientRecordId { get; set; }
    public decimal Circuit { get; set; }
    public decimal Temperature { get; set; }
    public decimal BloodPressure { get; set; }
    public decimal Breathing { get; set; }
    public decimal Height { get; set; }
    public decimal Weight { get; set; }
    public decimal BMI { get; set; }
    public string PersonalHistory { get; set; }
    public string FamilyHistory { get; set; }
    public string DrugAlergy { get; set; }
    public string PathologicalProcess { get; set; }
  }
}
