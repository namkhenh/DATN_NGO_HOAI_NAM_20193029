using Common.Dtos.PatientRecord;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.permission;
using Portal.Application.Interfaces.PatientRecord;
using Portal.Application.Repositories.Interfaces.PatientRecord;

namespace Portal.API.Rpc.patientrecord
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientRecordController : ControllerBase
    {
        private readonly IPatientRecordService _patientRecordService;
        public PatientRecordController(IPatientRecordService patientRecordService)
        {
            _patientRecordService = patientRecordService;
        }
        [Route(PatientRecordRoot.Create), HttpPost]
        public async Task<IActionResult> Create([FromBody]CreateUpdatePatientRecord request)
        {
            var create = await _patientRecordService.Create(request);
            return Ok(create);
        }
        [Route(PatientRecordRoot.CreateBySchedule), HttpPost]
        public async Task<IActionResult> CreateByChedule([FromBody]CreateUpdatePatientRecord request)
        {
            var create = await _patientRecordService.Create(request);
            return Ok(create);
        }
        [Route(PatientRecordRoot.Get), HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _patientRecordService.GetAll();
            return Ok(result);
        }
        [Route(PatientRecordRoot.GetPaging), HttpPost]
        public async Task<IActionResult> GetPaging([FromBody]RequestParameters request)
        {
            var result = await _patientRecordService.GetAllPaging(request);
            return Ok(result);
        }
        [Route(PatientRecordRoot.Update), HttpPost]
        public async Task<IActionResult> Update([FromBody] CreateUpdatePatientRecord request)
        {
            var result = await _patientRecordService.Update(request);
            return Ok(result);
        }
        [Route(PatientRecordRoot.Delete), HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            var result = await _patientRecordService.Delete(Id);
            return Ok(result);
        }
        [Route(PatientRecordRoot.Detail), HttpGet]
        public async Task<IActionResult> Detail(Guid Id)
        {
            var result = await _patientRecordService.Detail(Id);
            return Ok(result);
        }
        [Route(PatientRecordRoot.UpdateEmergency), HttpPost]
        public async Task<IActionResult> UpdateEmergency(Guid Id,bool status)
        {
            var result = await _patientRecordService.UpdateEmergency(Id, status);
            return Ok(result);
        }
        [Route(PatientRecordRoot.GetPatientRecordByDepartment), HttpPost]
        public async Task<IActionResult> GetPatientRecordByDepartment(Guid Id, RequestParameters request)
        {
            var result = await _patientRecordService.GetPatientRecordByDepartment(Id, request);
            return Ok(result);
        }
    }
}
