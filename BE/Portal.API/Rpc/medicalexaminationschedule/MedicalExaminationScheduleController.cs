using Common.Dtos.Department;
using Common.Dtos.MedicalExaminationSchedule;
using Common.Share.Enum;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.department;
using Portal.Application.Interfaces.Department;
using Portal.Application.Interfaces.MedicalExaminationSchedule;

namespace Portal.API.Rpc.medicalexaminationschedule
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalExaminationScheduleController : RpcController
    {
        private readonly IMedicalExaminationScheduleService _medicalExaminationScheduleService;
        public MedicalExaminationScheduleController(IMedicalExaminationScheduleService medicalExaminationScheduleService)
        {
            _medicalExaminationScheduleService = medicalExaminationScheduleService;
        }
        [Route(MedicalExaminationScheduleRoot.Create), HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateUpdateMedicalExaminationSchedule request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var create = await _medicalExaminationScheduleService.Create(request);
            return Ok(create);
        }
        [Route(MedicalExaminationScheduleRoot.Update), HttpPost]
        public async Task<IActionResult> Update([FromBody] CreateUpdateMedicalExaminationSchedule request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var update = await _medicalExaminationScheduleService.Update(request);
            return Ok(update);
        }
        [Route(MedicalExaminationScheduleRoot.Delete), HttpDelete]
        public async Task<IActionResult> Delete(Guid Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var delete = await _medicalExaminationScheduleService.Delete(Id);
            return Ok(delete);
        }

        [Route(MedicalExaminationScheduleRoot.DeleteList), HttpPost]
        public async Task<IActionResult> DeleteList(List<Guid> Ids)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _medicalExaminationScheduleService.DeleteList(Ids);
            return Ok(result);
        }
        [Route(MedicalExaminationScheduleRoot.GetPaging), HttpPost]
        public async Task<IActionResult> GetAllPaging([FromBody] RequestParameters request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _medicalExaminationScheduleService.GetPaging(request);
            return Ok(result);
        }
        [Route(MedicalExaminationScheduleRoot.Get), HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _medicalExaminationScheduleService.GetAll();
            return Ok(result);
        }
        [Route(MedicalExaminationScheduleRoot.GetPagingByUserId), HttpGet]
        public async Task<IActionResult> GetPagingByUserId(string userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _medicalExaminationScheduleService.GetPagingByUserId(userId);
            return Ok(result);
        }
        [Route(MedicalExaminationScheduleRoot.UpdateStatus), HttpPost]
        public async Task<IActionResult> UpdateStatus(Guid Id, PatientReceptionStatusEnum PatientReceptionStatus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _medicalExaminationScheduleService.UpdateStatus(Id, PatientReceptionStatus);
            return Ok(result);
        }
        [Route(MedicalExaminationScheduleRoot.GetById), HttpGet]
        public async Task<IActionResult> GetById(Guid Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _medicalExaminationScheduleService.GetById(Id);
            return Ok(result);
        }
        [Route(MedicalExaminationScheduleRoot.GetByCreateBy), HttpGet]
        public async Task<IActionResult> GetByCreateBy(string Id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var result = await _medicalExaminationScheduleService.GetByCreateBy(Id);
            return Ok(result);
        }
    }
}
