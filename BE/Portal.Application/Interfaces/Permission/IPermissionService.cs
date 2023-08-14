using Common.Common.ActionResponse;
using Common.Dtos.Action;
using Common.Dtos.Permission;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Permission
{
  public interface IPermissionService
  {
    Task<ActionResponse<PermissionDto>> GetPermissionById(Guid Id);
    Task<ActionResponse<List<PermissionDto>>> GetPermissionByRoleId(string roleId);
    Task<ActionResponse<PagedList<PermissionDto>>> GetAllPermissionPaging(RequestParameters request);
    Task<ActionResponse<PermissionDto>> UpdatePermission(CreateUpdatePermission request);
    Task<ActionResponse<PermissionDto>> DeletePermission(Guid Id);
    Task<ActionResponse<PermissionDto>> CreatePermission(CreateUpdatePermission request);
    Task<bool> CheckPermissionByUserIdAndUrl(string userId, string url);
  }
}
