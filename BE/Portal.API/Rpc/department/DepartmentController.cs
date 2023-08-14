using Common.Dtos.Department;
using Common.Dtos.PageSingal;
using Common.Share.SeedWorks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Portal.API.Rpc.pagesingal;
using Portal.Application.Interfaces.Department;
using Portal.Application.Interfaces.PageSingal;

namespace Portal.API.Rpc.department
{
  [Route("api/[controller]")]
  [ApiController]
  public class DepartmentController : RpcController
  {
    private readonly IDepartmentService _departmentService;
    public DepartmentController(IDepartmentService departmentService)
    {
      _departmentService = departmentService;
    }
    [Route(DepartmentRoot.Create), HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateUpdateDepartment request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var create = await _departmentService.CreateDepartment(request);
      return Ok(create);
    }
    [Route(DepartmentRoot.Update), HttpPost]
    public async Task<IActionResult> Update([FromBody] CreateUpdateDepartment request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var update = await _departmentService.UpdateDepartment(request);
      return Ok(update);
    }
    [Route(DepartmentRoot.Delete), HttpDelete]
    public async Task<IActionResult> Delete(Guid Id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var delete = await _departmentService.DeleteDepartment(Id);
      return Ok(delete);
    }
    [Route(DepartmentRoot.GetDepartmentById), HttpGet]
    public async Task<IActionResult> GetById(Guid Id)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var getById = await _departmentService.GetDepartmentById(Id);
      return Ok(getById);
    }
    [Route(DepartmentRoot.DeleteListDepartment), HttpPost]
    public async Task<IActionResult> DeleteList(List<Guid> Ids)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var result = await _departmentService.DeleteListDepartment(Ids);
      return Ok(result);
    }
    [Route(DepartmentRoot.GetDepartmentPaging), HttpPost]
    public async Task<IActionResult> GetAllPaging([FromBody] RequestParameters request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var result = await _departmentService.GetAllPaging(request);
      return Ok(result);
    }
    [Route(DepartmentRoot.Get), HttpGet]
    public async Task<IActionResult> GetAll()
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }
      var result = await _departmentService.GetAll();
      return Ok(result);
    }
  }
}
