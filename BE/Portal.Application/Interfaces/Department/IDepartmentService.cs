using Common.Common.ActionResponse;
using Common.Dtos.Department;
using Common.Dtos.PageSingal;
using Common.Share.SeedWorks;
using Portal.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Department
{
  public interface IDepartmentService
  {
    Task<ActionResponse<bool>> DeleteListUserToDepartment(List<string> Ids);
    Task<ActionResponse<bool>> DeleteUserToDepartment(string Id);
    Task<ActionResponse<bool>> AddListUserToDepartment(List<string> Ids);
    Task<ActionResponse<bool>> AddUserToDepartment(string Id);
    Task<ActionResponse<List<AppUser>>> GetUserByDepartmentId(Guid Id);
    Task<ActionResponse<DepartmentDto>> CreateDepartment(CreateUpdateDepartment request);
    Task<ActionResponse<DepartmentDto>> UpdateDepartment(CreateUpdateDepartment request);
    Task<ActionResponse<bool>> DeleteDepartment(Guid Id);
    Task<ActionResponse<bool>> DeleteListDepartment(List<Guid> Ids);
    Task<ActionResponse<DepartmentDto>> GetDepartmentById(Guid Id);
    Task<ActionResponse<PagedList<DepartmentDto>>> GetAllPaging(RequestParameters request);
    Task<ActionResponse<List<DepartmentDto>>> GetAll();
  }
}
