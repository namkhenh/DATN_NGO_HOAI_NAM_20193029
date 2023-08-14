using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos.CaringInfoDetail
{
  public class CreateUpdateCaringInfoDetail
  {
    public  Guid? Id { get; set; }
    public string Body { get; set; }
    public string BodyPart { get; set; }
    public string PreliminaryDiagnosis { get; set; }
    public string ComorbiditiesDiagnosis { get; set; }
    public DateTime ExamStartTime { get; set; }
    public DateTime ExamEndTime { get; set; }
    public string Conclude { get; set; }
    public string ICD10 { get; set; }
    public string DiseasesInclude { get; set; }
    public string HealthCondition { get; set; }
    public Guid PatientRecordServiceId { get; set; }
    public Guid CaringInfoId { get; set; }
  }
}
