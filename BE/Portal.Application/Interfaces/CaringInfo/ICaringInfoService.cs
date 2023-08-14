using Common.Common.ActionResponse;
using Common.Dtos.CaringInfo;
using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Dtos.PatientRecord;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.CaringInfo
{
  public interface ICaringInfoService
  {
    Task<ActionResponse<PagedList<CaringInfoDto>>> GetPaging(RequestParameters  request);
    Task<ActionResponse<bool>> Create(CreateUpdateCaringInfo request);
    Task<ActionResponse<CaringInfoDto>> Detail(Guid Id);
    Task<ActionResponse<bool>> Update(CreateUpdateCaringInfo request);
    Task<ActionResponse<bool>> Delete(Guid Id);
    Task<ActionResponse<List<CaringInfoDto>>> GetAll();
  }
}
