using Common.Dtos.Page;
using Common.Dtos.Permission;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.menu;
using Portal.Application.Interfaces.Permission;

namespace Portal.API.Rpc.permission
{
  [Route("api/[controller]")]
  [ApiController]
  public class PermissionController : ControllerBase
  {
    private readonly IPermissionService _permissionService;
    public PermissionController(IPermissionService permissionService)
    {
      _permissionService = permissionService;
    }
    [Route(PermissionRoot.GetAllPermissionPaging), HttpPost]
    public async Task<IActionResult> GetAllPermissionPaging([FromBody] RequestParameters request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var permissions = await _permissionService.GetAllPermissionPaging(request);
      return Ok(permissions);
    }
    [Route(PermissionRoot.GetPermissionByRoleId), HttpPost]
    public async Task<IActionResult> GetPermissionByRoleId(string roleId)
    {
      var permissions = await _permissionService.GetPermissionByRoleId(roleId);
      return Ok(permissions);
    }
    [Route(PermissionRoot.Create), HttpPost]
    public async Task<IActionResult> CreatePermission([FromBody] CreateUpdatePermission request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var permissions = await _permissionService.CreatePermission(request);
      return Ok(permissions);
    }
    [Route(PermissionRoot.Update), HttpPost]
    public async Task<IActionResult> UpdatePermission([FromBody] CreateUpdatePermission request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var permissions = await _permissionService.UpdatePermission(request);
      return Ok(permissions);
    }
    [Route(PermissionRoot.Delete), HttpDelete]
    public async Task<IActionResult> DeletePermission(Guid Id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var permissions = await _permissionService.DeletePermission(Id);
      return Ok(permissions);
    }
    [Route(PermissionRoot.GetById), HttpGet]
    public async Task<IActionResult> GetById(Guid Id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var permissions = await _permissionService.GetPermissionById(Id);
      return Ok(permissions);
    }
  }
}
