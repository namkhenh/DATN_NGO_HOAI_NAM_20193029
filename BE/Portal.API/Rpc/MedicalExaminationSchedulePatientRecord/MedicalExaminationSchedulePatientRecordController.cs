using Common.Dtos.MedicalExaminationSchedulePatientRecord;
using Common.Share.Enum;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Portal.API.Rpc.medicalexaminationschedule;
using Portal.API.Rpc.medicalexaminationservice;
using Portal.Application.Interfaces.MedicalExaminationSchedulePatientRecord;
using Portal.Domain.Enums;

namespace Portal.API.Rpc.MedicalExaminationSchedulePatientRecord
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalExaminationSchedulePatientRecordController : ControllerBase
    {
        private readonly IMedicalExaminationSchedulePatientRecordService _context;
        public MedicalExaminationSchedulePatientRecordController(IMedicalExaminationSchedulePatientRecordService context)
        {
            _context = context;
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.Create), HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUpdateMedicalExaminationSchedulePatientRecord request)
        {
            var result = await _context.Create(request);
            return Ok(result);
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.Delete), HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            var result = await _context.Delete(Id);
            return Ok(result);
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.DeleteList), HttpPost]
        public async Task<IActionResult> DeleteList(List<Guid> Ids)
        {
            var result = await _context.DeleteList(Ids);
            return Ok(result);
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.CreateList), HttpPost]
        public async Task<IActionResult> CreateList(KeyValuePair<Guid, List<Guid>> request)
        {
            var result = await _context.CreateList(request);
            return Ok(result);
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.Get), HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _context.GetAll();
            return Ok(result);
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.GetPaging), HttpPost]
        public async Task<IActionResult> GetPaging([FromBody] RequestParameters request)
        {
            var result = await _context.GetAllPaging(request);
            return Ok(result);
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.GetById), HttpGet]
        public async Task<IActionResult> GetDetail(Guid Id)
        {
            var result = await _context.Detail(Id);
            return Ok(result);
        }
        [Route(MedicalExaminationSchedulePatientRecordRoot.UpdateStatus), HttpPost]
        public async Task<IActionResult> UpdateStatus(Guid Id, PatientServiceEnum PatientServiceStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _context.UpdateStatus(Id, PatientServiceStatus);
            return Ok(result);
        }
    }
}
