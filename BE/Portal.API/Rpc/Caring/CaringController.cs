using Common.Dtos.CaringInfo;
using Common.Dtos.CaringInfoDetail;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.patientrecord;
using Portal.Application.Interfaces.CaringInfo;
using Portal.Application.Interfaces.CaringInfoDetail;

namespace Portal.API.Rpc.Caring
{
  [Route("api/[controller]")]
  [ApiController]
  public class CaringController : ControllerBase
  {
    private readonly ICaringInfoDetailService _caringInfoDetailService;
    private readonly ICaringInfoService _caringInfoService;
    public CaringController(ICaringInfoDetailService caringInfoDetailService, ICaringInfoService caringInfoService)
    {
      _caringInfoDetailService = caringInfoDetailService;
      _caringInfoService = caringInfoService;
    }
    [Route(CaringRoot.Create), HttpPost]
    public async Task<IActionResult> CreateCaringInfo(CreateUpdateCaringInfo request)
    {
       if(!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var create = await _caringInfoService.Create(request);
      return Ok(create);
    }
    [Route(CaringRoot.Update), HttpPost]
    public async Task<IActionResult> UpdateCaringInfo(CreateUpdateCaringInfo request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var create = await _caringInfoService.Update(request);
      return Ok(create);
    }
    [Route(CaringRoot.CreateCaringInfo), HttpPost]
    public async Task<IActionResult> CreateCaringInfoDetail(CreateUpdateCaringInfoDetail request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var create = await _caringInfoDetailService.Update(request);
      return Ok(create);
    }
    [Route(CaringRoot.UpdateCaringInfo), HttpPost]
    public async Task<IActionResult> UpdateCaringInfoDetail(CreateUpdateCaringInfoDetail request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var create = await _caringInfoDetailService.Update(request);
      return Ok(create);
    }
  }
}
