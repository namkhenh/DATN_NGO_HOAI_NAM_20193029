using Common.Common.ActionResponse;
using Common.Dtos.MedicalExaminationScheduleService;
using Common.Dtos.MedicalExaminationService;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.MedicalExaminationService
{
  public interface IMedicalExaminationServiceService
  {
    Task<ActionResponse<PagedList<MedicalExaminationServiceDto>>> GetPaging(RequestParameters request);
    Task<ActionResponse<List<MedicalExaminationServiceDto>>> GetAll();
    Task<ActionResponse<bool>> Delete(Guid Id);
    Task<ActionResponse<bool>> DeleteList(List<Guid> Ids);
    Task<ActionResponse<MedicalExaminationServiceDto>> Create(CreateUpdateMedicalExaminationService request);
    Task<ActionResponse<MedicalExaminationServiceDto>> Update(CreateUpdateMedicalExaminationService request);

  }
}
