using Common.Dtos.Role;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portal.API.Rpc.permission;
using Portal.Application.Interfaces.Role;
using Portal.Domain.Entities;

namespace Portal.API.Rpc.role
{
  [Route("api/[controller]")]
  [ApiController]
  public class RoleController : ControllerBase
  {

    private readonly IRoleService _roleService;
    public RoleController(IRoleService roleService)
    {
      _roleService = roleService;
    }
    [Route(RoleRoot.Get), HttpGet]
    public async Task<IActionResult> GetAllRole()
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.GetAllRole();
      return Ok(result);
    }
    [Route(RoleRoot.GetAllPaging), HttpPost]
    public async Task<IActionResult> GetAllRolePaging([FromBody] RequestParameters request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.GetAllRolePaging(request);
      return Ok(result);
    }
    [Route(RoleRoot.Create), HttpPost]
    public async Task<IActionResult> CreateRole([FromBody] CreateUpdateRole request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.CreateRole(request);
      return Ok(result);
    }
    [Route(RoleRoot.Update), HttpPost]
    public async Task<IActionResult> UpdateRole([FromBody] CreateUpdateRole request)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.UpdateRole(request);
      return Ok(result);
    }
    [Route(RoleRoot.Delete), HttpDelete]
    public async Task<IActionResult> DeleteRole(string Id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.DeleteRole(Id);
      return Ok(result);
    }
    [Route(RoleRoot.DeleteListRole), HttpPost]
    public async Task<IActionResult> DeleteListRole(List<string> Ids)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.DeleteListRole(Ids);
      return Ok(result);
    }
    [Route(RoleRoot.Detail), HttpGet]
    public async Task<IActionResult> Detail(string Id)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.RoleDetail(Id);
      return Ok(result);
    }
    [Route(RoleRoot.AssignRolesToUser), HttpPost]
    public async Task<IActionResult> AssignRolesToUser(string userId,List<string> roleIds)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.AssignRolesToUser(userId, roleIds);
      return Ok(result);
    }
    [Route(RoleRoot.AssignUsersToRole), HttpPost]
    public async Task<IActionResult> AssignUsersToRole(string roleId, List<string> userIds)
    {
      if (!ModelState.IsValid)
        return BadRequest(ModelState);
      var result = await _roleService.AssignUsersToRole(roleId, userIds);
      return Ok(result);
    }
  }
}
