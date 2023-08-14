using Common.Dtos.MedicalExaminationSchedule;
using Common.Dtos.MedicalExaminationService;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.medicalexaminationschedule;
using Portal.Application.Interfaces.MedicalExaminationSchedule;
using Portal.Application.Interfaces.MedicalExaminationService;

namespace Portal.API.Rpc.medicalexaminationservice
{
  [Route("api/[controller]")]
  [ApiController]
  public class MedicalExaminationServiceController : ControllerBase
  {
    private readonly IMedicalExaminationServiceService _medicalExaminationServiceService;
    public MedicalExaminationServiceController(IMedicalExaminationServiceService medicalExaminationServiceService)
    {
      _medicalExaminationServiceService = medicalExaminationServiceService;
    }
    [Route(MedicalExaminationServiceRoot.Create), HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUpdateMedicalExaminationService request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var create = await _medicalExaminationServiceService.Create(request);
      return Ok(create);
    }
    [Route(MedicalExaminationServiceRoot.Update), HttpPost]
    public async Task<IActionResult> Update([FromBody] CreateUpdateMedicalExaminationService request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var update = await _medicalExaminationServiceService.Update(request);
      return Ok(update);
    }
    [Route(MedicalExaminationServiceRoot.Delete), HttpDelete]
    public async Task<IActionResult> Delete(Guid Id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var delete = await _medicalExaminationServiceService.Delete(Id);
      return Ok(delete);
    }

    [Route(MedicalExaminationServiceRoot.DeleteList), HttpPost]
    public async Task<IActionResult> DeleteList(List<Guid> Ids)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var result = await _medicalExaminationServiceService.DeleteList(Ids);
      return Ok(result);
    }
    [Route(MedicalExaminationServiceRoot.GetPaging), HttpPost]
    public async Task<IActionResult> GetAllPaging([FromBody] RequestParameters request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var result = await _medicalExaminationServiceService.GetPaging(request);
      return Ok(result);
    }
    [Route(MedicalExaminationServiceRoot.Get), HttpGet]
    public async Task<IActionResult> GetAll()
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var result = await _medicalExaminationServiceService.GetAll();
      return Ok(result);
    }
  }
}
