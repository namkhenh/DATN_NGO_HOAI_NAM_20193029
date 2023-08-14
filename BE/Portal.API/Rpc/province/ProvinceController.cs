using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.permissionaction;
using Portal.Application.Interfaces.Province;

namespace Portal.API.Rpc.province
{
  [Route("api/[controller]")]
  [ApiController]
  public class ProvinceController : ControllerBase
  {
    private readonly IProvinceService _provinceService;
    public ProvinceController(IProvinceService provinceService)
    {
      _provinceService = provinceService;
    }
    [Route(ProvinceRoot.Get), HttpGet]
    public async Task<IActionResult> GetAllProvince()
    {
      var result = await _provinceService.GetAll();
      return Ok(result);  
    }
    [Route(ProvinceRoot.GetDistrictByProvinceId), HttpGet]
    public async Task<IActionResult> GetDistrictByProvinceId(Guid Id)
    {
      var result = await _provinceService.GetDistrictByProvinceId(Id);
      return Ok(result);
    }
    [Route(ProvinceRoot.GetWardByDistrictId), HttpGet]
    public async Task<IActionResult> GetWardsByDistrictId(Guid Id)
    {
      var result = await _provinceService.GetWardByDistrictId(Id);
      return Ok(result);
    }
  }
}
