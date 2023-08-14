using Common.Common.ActionResponse;
using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Dtos.PatientRecord;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.PatientRecord
{
    public interface IPatientRecordService
    {
        Task<ActionResponse<PagedList<MedicalExaminationSchedulePatientRecordDto>>> GetPatientRecordByDepartment(Guid Id, RequestParameters request);
        Task<ActionResponse<bool>> Create(CreateUpdatePatientRecord request);
        Task<ActionResponse<PatientRecordDto>> Detail(Guid Id);
        Task<ActionResponse<bool>> CreateFromSchedule(CreateUpdatePatientRecord request);
        Task<ActionResponse<bool>> Update(CreateUpdatePatientRecord request);
        Task<ActionResponse<bool>> Delete(Guid Id);
        Task<ActionResponse<bool>> UpdateEmergency(Guid Id, bool status);
        Task<ActionResponse<PagedList<PatientRecordDto>>> GetAllPaging(RequestParameters request);
        Task<ActionResponse<List<PatientRecordDto>>> GetAll();
    }
}
