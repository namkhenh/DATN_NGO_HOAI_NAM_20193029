using Common.Common.ActionResponse;
using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Share.Enum;
using Common.Share.SeedWorks;
using Portal.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.MedicalExaminationSchedulePatientRecord
{
    public interface IMedicalExaminationSchedulePatientRecordService
    {
        Task<ActionResponse<bool>> CreateList(KeyValuePair<Guid, List<Guid>> requests);
        Task<ActionResponse<bool>> Create(CreateUpdateMedicalExaminationSchedulePatientRecord request);
        Task<ActionResponse<bool>> Delete(Guid Id);
        Task<ActionResponse<bool>> DeleteList(List<Guid> Id);
        Task<ActionResponse<MedicalExaminationSchedulePatientRecordDto>> Detail(Guid Id);
        Task<ActionResponse<List<MedicalExaminationSchedulePatientRecordDto>>> GetAll();
        Task<ActionResponse<PagedList<MedicalExaminationSchedulePatientRecordDto>>> GetAllPaging(RequestParameters request);
        Task<ActionResponse<MedicalExaminationSchedulePatientRecordDto>> UpdateStatus(Guid Id, PatientServiceEnum PatientServiceStatus);
    }
}
