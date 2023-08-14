using Common.Common.ActionResponse;
using Common.Dtos.PermissionAction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Portal.Application.Interfaces.PermissionAction
{
  public interface IPermissionActionService
  {
    Task<ActionResponse<bool>> Update(CreateUpdatePermissionAction request);
    Task<ActionResponse<bool>> Create(CreateUpdatePermissionAction request);
    Task<ActionResponse<bool>> Delete(Guid Id);
  }
}
