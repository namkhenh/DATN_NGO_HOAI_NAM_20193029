using Common.Common.ActionResponse;
using Common.Dtos.Role;
using Common.Share.SeedWorks;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.Role
{
  public interface IRoleService
  {
    Task<ActionResponse<List<RoleDto>>> GetAllRole();
    Task<ActionResponse<RoleDetailDto>> RoleDetail(string Id);
    Task<ActionResponse<bool>> DeleteListRole (List<string> Ids);
    Task<ActionResponse<bool>> AssignRolesToUser(string userId, List<string> roleIds);
    Task<ActionResponse<bool>> AssignUsersToRole(string roleId, List<string> userId);
    Task<ActionResponse<PagedList<RoleDto>>> GetAllRolePaging(RequestParameters request);
    Task<ActionResponse<RoleDto>> GetRoleById(string Id);
    Task<ActionResponse<RoleDto>> CreateRole(CreateUpdateRole request);
    Task<ActionResponse<RoleDto>> UpdateRole(CreateUpdateRole request);
    Task<ActionResponse<RoleDto>> DeleteRole(string Id);

  }
}
