using Common.Common.ActionResponse;
using Common.Dtos.Department;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Share.Enum;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.MedicalExaminationSchedule
{
    public interface IMedicalExaminationScheduleService
    {
        Task<ActionResponse<PagedList<MedicalExaminationScheduleDto>>> GetPaging(RequestParameters request);
        Task<ActionResponse<List<MedicalExaminationScheduleDto>>> GetPagingByUserId(string userId);
        Task<ActionResponse<List<MedicalExaminationScheduleDto>>> GetAll();
        Task<ActionResponse<List<MedicalExaminationScheduleDto>>> GetByCreateBy(string Id);
        Task<ActionResponse<MedicalExaminationScheduleDto>> Create(CreateUpdateMedicalExaminationSchedule request);
        Task<ActionResponse<MedicalExaminationScheduleDto>> UpdateStatus(Guid Id, PatientReceptionStatusEnum PatientReceptionStatus);
        Task<ActionResponse<MedicalExaminationScheduleDto>> GetById(Guid Id);

        Task<ActionResponse<bool>> Delete(Guid Id);
        Task<ActionResponse<bool>> DeleteList(List<Guid> Ids);
        Task<ActionResponse<MedicalExaminationScheduleDto>> Update(CreateUpdateMedicalExaminationSchedule request);
    }
}
