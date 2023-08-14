using Common.Dtos.PermissionAction;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.permission;
using Portal.Application.Interfaces.PermissionAction;

namespace Portal.API.Rpc.permissionaction
{
  [Route("api/[controller]")]
  [ApiController]
  public class PermissionActionController : ControllerBase
  {
    private readonly IPermissionActionService _permissionActionService;
    public PermissionActionController(IPermissionActionService permissionActionService)
    {
      _permissionActionService = permissionActionService;
    }
    [Route(PermissionActionRoot.Create), HttpPost]
    public async Task<IActionResult> Create(CreateUpdatePermissionAction request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _permissionActionService.Create(request);
      return Ok(result);
    }
    [Route(PermissionActionRoot.Update), HttpPost]
    public async Task<IActionResult> Update(CreateUpdatePermissionAction request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _permissionActionService.Update(request);
      return Ok(result);
    }
    [Route(PermissionActionRoot.Delete), HttpDelete]
    public async Task<IActionResult> Delete(Guid Id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _permissionActionService.Delete(Id);
      return Ok(result);
    }
  }
}
